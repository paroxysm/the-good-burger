/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/6/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */
( function($) {
    // ENUMERATIONS
    var STATUS = {
        WAITER_STATUS_SERVED : 'serviced',
        WAITER_STATUS_PENDING : 'pending'
    }
    var MainContext = null; //Stores the page ( div[date-role='page'] when the page is first created
    var RefillScreen = null;
    var PaymentScreen = null;
    var GameScreen = null;

    //cache the MainContext when post order page is first created
    PECR.registerCallback("post-order", "pagecreate", function(evt) {
        MainContext = $(evt.target);

        //Bind 'request waiter' button to VM
        var waiterButton = $("#request-waiter-button", MainContext );
        ko.applyBindings( new RequestWaiterViewModel() , waiterButton[0] );

        //Bind the order status wrapper div to VM
        var orderStatusWrapper = $("#order-status-wrapper", MainContext );
        if( !orderStatusWrapper.length ) throw new Error("#order-status-wrapper is non existent!");
        ko.applyBindings( new OrderStatusViewModel(), orderStatusWrapper[0] );

        displayConfirmedOrder();
    });

    //Payment screen initialization
    PECR.registerCallback("payment-screen", "pageinit", function(event) {
        // Add functionality for our #payment-screen dialog by applying bindings
        PaymentScreen = $(event.target);
        if( !PaymentScreen.length ) throw new Error("#payment-screen dialog is missing!");
        //Create a new payment view model as bind it to payment screen
        var paymentViewModel = new PaymentViewModel();
        //use ko.applyBinding's 2nd parameter to limit where we want the bindings to be applied
        ko.applyBindings(paymentViewModel, PaymentScreen[0] );
//        paymentScreenDialog.trigger('create');
    });

    PECR.registerCallback("refill-screen", "pagecreate", function(event) {
        RefillScreen = $(event.target);
        if( ! RefillScreen.length) throw new Error("refill-screen is missing!");
        ko.applyBindings( new RefillScreenViewModel(), RefillScreen[0]);

    });

    /*//functionality for displaying the confirmed ordered items once they have placed the order
    PECR.registerCallback("post-order", "pagebeforeshow", displayConfirmedOrder);*/



    /* Called to create markup for showing the confirmed ordered items in a 'ul' with an id of 'confirmed-cart' */
    function displayConfirmedOrder( ) {
        var confirmedcardUl = $("#confirmed-cart", MainContext );
        //apply ko bindings to only confirmed cart ul element
        ko.applyBindings( new ConfirmedCartViewModel(), confirmedcardUl[0]);
        //make jqm apply bindings
//        confirmedcardUl.listview('refresh');
    }


    /* CONFIRMED ITEMS  VIEW MODEL
     * Responsible for displaying the list of ordered items in an uneditable list
     * It also displays the total and number of calories in the order
    */
    function ConfirmedCartViewModel() {
        var self = this;

        self.order = OrderManager.getOrder();
        self.recipes = self.order.getRecipes();
        self.totalCalories = function() {
            var calories = 0;
            for( var i in self.recipes ) {
                calories += parseInt( self.recipes[i].getCalories() );
            }
            return calories;
        }();

        self.total = self.order.getTotal().toFixed(2);
    }
    /* ORDER STATUS VIEW MODEL
    * Responsible for updating our order status and also placing the ajax calls that fetch the status
    *
    * */
    function OrderStatusViewModel() {
        var self = this;

        self.order = OrderManager.getOrder();
        self.order.setStatus('placed');
        self.orderStatus = ko.observable( self.order.getStatus() ); //Stores the status of our order
        /* Returns the css class that corresponds to our order status */
        self.orderStatusMarkup = ko.computed( function() {
            var status = self.orderStatus();
            if( status == 'placed')
                return "pending";
            else if( status == 'ready' || status == 'paid')
                return "approved";
        });

        //Register our ajax poll event
        var pollEvent;
        function periodicPoll() {
            //clear the payload
            var payload = {
                orderid : self.order.getID()
            };
            //make the ajax call
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_ORDER_STATUS, payload, function(data) {
                var status = data.status;
                self.orderStatus( status );
                self.order.setStatus(status);
                console.log("REQUEST_ORDER_STATUS yielded [%s]", status);
                if( status == 'paid' ) {
                    console.log("Order has been paid!");
                    window.clearInterval(pollEvent );
                }
            });
        }
        pollEvent = window.setInterval( periodicPoll, 5000);
    }

    /* Our payment view model, contains data that is linked to bindings on the payment screen */
    function PaymentViewModel() {
        var self = this;
        self.currentId = 1;
        //holds all the payments that have been added by the user( it's an array to support split ticket )
        self.myPayments = ko.observableArray([]);
        //Allow types of payment a user can select
        self.allowedTypes = ko.observableArray(["CREDIT CARD", "E-CHECK", "CHECK/CASH"]);


        //Only add allow coupon type if have it
        self.ourOrder = OrderManager.getOrder();
        if( self.ourOrder.hasCoupon() )
            self.allowedTypes.push("COUPON");

        self.canPay = self.ourOrder.getTotal() > 0.0;

        //Total amount left, computed by taking into account all the posted payments and subtracting what our order cost */
        self.getTotalAmountLeft = function() {
            var totalPosted = 0.0;
            var myPaymentsAsValue = self.myPayments();
            for( var i in myPaymentsAsValue) {
                totalPosted += parseFloat(myPaymentsAsValue[i].amount );
            }
            var whatsLeft = self.ourOrder.getTotal() - totalPosted;
            whatsLeft = whatsLeft < 0 ? 0 : whatsLeft;
            return whatsLeft.toFixed(2);
        }
        self.totalAmountLeft = ko.computed( self.getTotalAmountLeft );

        self.tipAmount = ko.observable('0.0');
        self.tipChart = [5,10,15, 20, 25, 30];

        /* Holds the total amount including the tip amount */

        self.getTippedTotal = function() {
            var total = parseFloat( self.getTotalAmountLeft() );
            var tipAmount = parseFloat( self.tipAmount() );
            tipAmount = isNaN(tipAmount) ? 0 : tipAmount;
            return total + tipAmount * total /100;
        }
        self.tippedTotal = ko.computed( self.getTippedTotal );

        /* Used to compute the select drop down text for the different tip percentages */
        self.computeTipChartText = function(percentage) {
            var total = parseFloat( self.totalAmountLeft() );
            var pct = parseFloat( percentage );
            var tippedTotal = total + (total * pct /100 );
            return pct+"% - $"+tippedTotal.toFixed(2);
        }

        self.removePayment = function(payment) {
            self.myPayments.remove(payment);
        }

        //What type of payment the user has selected
        self.selectedType = ko.observable(null);
        self.isCardSelected = ko.computed( function() { return self.selectedType() == "CREDIT CARD"; } );
        self.isECheckSelected = ko.computed( function() { return self.selectedType() == "E-CHECK"; } );
        self.isCouponSelected = ko.computed( function() { return self.selectedType() == "COUPON"; } );
        self.paymentAmount = ko.observable( self.totalAmountLeft() );
        //Observable that contains logic to prevent negative numbers or numbers greater than the amount owed
        self.guardedPaymentAmount = ko.computed( {
            read : function() {
                return self.paymentAmount();
            },
            write : function(value) {
                var asNumber = parseFloat(value);
                var tippedTotal = self.getTippedTotal();
                var amountLeftAsNumber = parseFloat( tippedTotal );
                if( isNaN(asNumber) || asNumber <= 0 || asNumber >  amountLeftAsNumber )
                    asNumber = amountLeftAsNumber;
                self.paymentAmount(0); //Force a value change so that 'read' will get invoked
                self.paymentAmount( asNumber.toFixed(2) );
            }
        } );

        /* Called when the user adds a new payment */
        self.addPayment = function() {
            var payment = {
                id : self.currentId++,
                type : self.selectedType(),
                amount : parseFloat( self.paymentAmount()).toFixed(2)
            };
            //if we use a credit card, then apply those fields
            if( payment.type == "CREDIT CARD") {
                payment.cardNumber = self.creditCardViewModel.cardNumber(),
                payment.cvvNumber = self.creditCardViewModel.cvvNumber(),
                payment.cardExpiration = self.creditCardViewModel.expirationDate()
            } else if( payment.type == "E-CHECK") { //e-check required information
                payment.bankName = self.eCheckViewModel.bankName();
                payment.bankRouting = self.eCheckViewModel.bankRouting();
                payment.bankAccount = self.eCheckViewModel.bankAccount();
            }
            // TO-DO : Add logic for how much coupon should take away for only the menu items that it applies to.
            //add to the list of payments
            self.myPayments.push(payment );
            //increment payment id
            self.currentId = this.currentId++;
            //update self.paymentAmount() with total amount left
            self.guardedPaymentAmount( self.getTippedTotal() );
            if( self.getTotalAmountLeft() <= 0 ) {
                self.selectedType(null);
                self.tipAmount(null);
            }
        }

        /* Invoked when submit payment button is clicked */
        self.submitPayment = function() {
            //create our JSON object and send our payment to the backend
            var payload  = {
                    orderid : self.ourOrder.getID(),
                    payments : ko.utils.unwrapObservable( self.myPayments )
            };
            ajaxDriver.call( ajaxDriver.REQUESTS.CHARGE_ORDER, payload, function() {});
            //mark it as submitted
            self.submitted(true);
            var pollId;

            function periodicChargeOrderStatus() {
                ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_CHARGE_STATUS, { orderid: self.ourOrder.getID() }, function(data) {
                    console.log("REQUEST_CHARGE_STATUS yielded '%s'", data.status);
                    self.paymentStatus( data.status );
                    if( data.status  == 'paid') {
                        console.log("REQUEST_CHARGE_STATUS order has been paid!");
                        window.clearInterval(pollId );
                    }
                });
            }
            pollId = window.setInterval( periodicChargeOrderStatus, 5000);
        }
        /* True when the order has been submitted */
        self.submitted = ko.observable(false);
        /* Holds the last payment status */
        self.paymentStatus = ko.observable('Pending');
        self.paymentMarkupClass = ko.computed(function() {
            var paymentstatus = self.paymentStatus().toLowerCase();
            var paymentClass = "payment-"+paymentstatus;
            return paymentClass;
        });

        /* This holds the fields required when paying by credit card */
        self.creditCardViewModel = function() {
            return {
                cardNumber : ko.observable(''),
                cvvNumber : ko.observable(''),
                expirationDate : ko.observable('')
            };
        }();
        /* This holds eCheck field information */
        self.eCheckViewModel = function() {
            return {
                bankName : ko.observable(''),
                bankRouting : ko.observable(''),
                bankAccount : ko.observable('')
            };
        }();
    };

    /* VIEW MODEL FOR request waiter function, responsible for functionality of the 'request assistance' button
        Handles status updates and also placing ajax calls when the button is pressed.
     */
    function RequestWaiterViewModel() {
        var self = this;

        self.requestStatus = ko.observable();
        self.requestStatusMarkupClass = ko.computed( function() {
            var status = self.requestStatus();
            if( status == STATUS.WAITER_STATUS_SERVED )
                return 'waiter-request-serviced';
            else if ( status == STATUS.WAITER_STATUS_PENDING )
                return 'waiter-request-pending';
            else
                return null;
        });

        self.requestWaiter = function() {
            console.log("requesting Waiter....");
            //make the status pending
            self.requestStatus( STATUS.WAITER_STATUS_PENDING );
            var tableNumber = SETTINGS.getTableNumber();
            //place ajax call w/ our payload
            var data = {
                request_type : ajaxDriver.REQUESTS.REQUEST_WAITER,
                payload : {
                    tablenumber : tableNumber
                }
            };
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_WAITER, data, function(payload) {
                for( var i in payload ) {
                    var menuAsJson = payload[i];
                    var recipesInMenu = menuAsJson['recipes'];
                    for( var j in recipesInMenu ) {
                        var recipeAsJson = recipesInMenu[j];

                        var ingredientsInRecipe = recipesInMenu[i]
                    }
                }
                console.log("Waiter has been requested!");
                ///Register the interval event
                var pollEvent = window.setInterval( periodicStatusPoll, 10000);
                function periodicStatusPoll() {
                    //request the status of the waiter
                    var data = {
                        request_type : ajaxDriver.REQUESTS.REQUEST_WAITER_STATUS,
                        payload : {
                            tablenumber : tableNumber
                        }
                    };
                    ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_WAITER_STATUS, data, function(data) {
                        var status = data.status;
                        self.requestStatus( status );
                        console.log("Request Waiter Status has yieled [%s]",status);
                        if( status == STATUS.WAITER_STATUS_SERVED )
                            window.clearInterval( pollEvent );
                    });
                }
            });
        }
    }

    /* REFILL SCREEN VIEW MODEL */
    function RefillScreenViewModel() {
        var self = this;

        self.order = OrderManager.getOrder(); //Order instance

        self.refillables = new Array(); //Stores list of the recipes that are refillable, used by VM
        //insert refillable recipes in our array
        var recipes = self.order.getRecipes();
        for( var i in recipes ) {
            if( recipes[i].isRefillable() )
                self.refillables.push(  recipes[i] );
        }

        self.refillStatus = ko.observable("not requested");
        self.refillStatusMarkupClass = ko.computed( function() {
            if( self.refillStatus() == 'pending' )
                return "pending";
            else if( self.refillStatus() == "served")
                return "approved";
        });

        self.resetStatus = function() { self.refillStatus('not requested'); }
        self.pendingStatus = function() { self.refillStatus('pending'); }

        self.requested = ko.observable('false');

        self.submitRequest = function() {
            self.pendingStatus(); //mark status as pending
            //get a list of recipes that we have selected
            var selectedRecipes = $("input:checked", RefillScreen );
            var checkedRecipes = new Array();
            function addToCheckedRecipes(idx, element) {
                var recipeId = $(element).attr('recipe-id');
                for(var i in self.refillables ) {
                    if( self.refillables[i].getID() == recipeId) {
                        var refillable = self.refillables[i];
                        checkedRecipes.push( refillable );
                        break;
                    }
                }
            }
            selectedRecipes.each( function(idx, element) {
                return function() { addToCheckedRecipes(idx, element); };
            }()  );
            //create our payload
            var payload = {
                orderid : self.order.getID(),
                recipes : checkedRecipes
            };

            function createPollingEvent() {
                console.log("createPollingEvent has been called!");
                var pollEvent;

                function periodicRefillStatusPoll() {

                    var payload =  {
                        orderid : self.order.getID()
                    }
                    ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_REFILL_STATUS, payload, function(data) {
                        console.log("Refill Status for orderid : %s is %s", data.status);
                        self.refillStatus( data.status );
                        if( data.status == 'served') {
                            console.log("Refill status has been serviced, event has been removed!");
                            window.clearInterval( pollEvent );
                        }
                    });
                }
                //Register the periodic poll event
                pollEvent = window.setInterval( periodicRefillStatusPoll, 5000 );
            }
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_REFILL, payload, createPollingEvent  );
        }
    }

    PECR.registerCallback("place-another-order-confirmation", "pagecreate", function(event) {
        ko.applyBindings( new PlaceNewOrderViewModel(), event.target);
    });

    function PlaceNewOrderViewModel() {

        var self = this;
        //The user has confirmed that they want to start over, clear the food cart
        self.Confirm = function() {
            FOODCART.clear();
            console.log("User has confirmed, clearing food cart!");
            return true;
        }
    }

})(jQuery);

/* AJAX TESTS */
ajaxDriver.registerMockCallbackForType(ajaxDriver.REQUESTS.REQUEST_WAITER, function(data) {
    console.log("REQUEST_WAITER call has been intercepted with table number %s", data.payload.tablenumber);
});
ajaxDriver.registerMockCallbackForType(ajaxDriver.REQUESTS.REQUEST_WAITER_STATUS, function(data) {
    console.log("REQUEST_WAITER call has been intercepted with table number %s", data.payload.tablenumber);
    var status = ["Pending", "Served", "Acknowledged!"];
    var randomStatusIdx = Math.floor( Math.random() * 2 );
    console.log("REQUEST_WATER returning status %s", status[randomStatusIdx]);
    return { status : status[randomStatusIdx] };
});
ajaxDriver.registerMockCallbackForType(ajaxDriver.REQUESTS.CHARGE_ORDER, function(data) {
    console.log("CHARGE_ORDER has been intercepted");
    var payments = data.payload.payments;
    var tableNumber = data.payload.tableNumber;
    console.log("Received payments :");
    for(var i in payments ) {
        console.log("Payment %d Type %s Amount %s", payments[i].id, payments[i].type, payments[i].amount);
    }
    return {};
})