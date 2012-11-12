/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/6/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */
( function($) {
    var MainContext = null; //Stores the page ( div[date-role='page'] when the page is first created
    var RefillScreen = null;
    var PaymentScreen = null;

    //cache the MainContext when post order page is first created
    PECR.registerCallback("post-order", "pagecreate", function(evt) {
        MainContext = $(evt.target);
        //request waiter button
        var waiterButton = $("#request-waiter-button", MainContext );
        ko.applyBindings( { requestWaiter : requestWaiter }, waiterButton[0] );

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
    //functionality for displaying the confirmed ordered items once they have placed the order
    PECR.registerCallback("post-order", "pagebeforeshow", displayConfirmedOrder);


    /* Called to create markup for showing the confirmed ordered items in a 'ul' with an id of 'confirmed-cart' */
    function displayConfirmedOrder( ) {
        var order = OrderManager.getOrder();
        var confirmedcardUl = $("#confirmed-cart", MainContext );
        //apply ko bindings to only confirmed cart ul element
        ko.applyBindings( order, confirmedcardUl[0]);
        //make jqm apply bindings
        confirmedcardUl.listview('refresh');
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
        self.totalAmountLeft = ko.computed( function() {
            var totalPosted = 0.0;
            var myPaymentsAsValue = self.myPayments();
            for( var i in myPaymentsAsValue) {
                totalPosted += parseFloat(myPaymentsAsValue[i].amount );
            }
            return (self.ourOrder.getTotal() - totalPosted  ).toFixed(2);
        });
        //What type of payment the user has selected
        self.selectedType = ko.observable();
        self.isCardSelected = ko.computed( function() { return self.selectedType() == "CREDIT CARD"; } );
        self.isECheckSelected = ko.computed( function() { return self.selectedType() == "E-CHECK"; } );
        self.isCouponSelected = ko.computed( function() { return self.selectedType() == "COUPON"; } );
        self.paymentAmount = ko.observable( self.ourOrder.getTotal().toFixed(2) );
        //Observable that contains logic to prevent negative numbers or numbers greater than the amount owed
        self.guardedPaymentAmount = ko.computed( {
            read : function() {
                return self.paymentAmount();
            },
            write : function(value) {
                var asNumber = parseFloat(value);
                var amountLeftAsNumber = parseFloat(self.totalAmountLeft() );
                if( asNumber <= 0 || asNumber >  amountLeftAsNumber )
                    asNumber = amountLeftAsNumber;
                self.paymentAmount(0); //Force a value change so that 'read' will get invoked
                self.paymentAmount( asNumber );
            }
        } );

        /* Called when the user adds a new payment */
        self.addPayment = function() {
            var payment = {
                id : self.currentId++,
                type : self.selectedType(),
                amount : self.paymentAmount()
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
            self.paymentAmount( self.totalAmountLeft() );
            //update the selected type to undefined to clear all the fields
            self.selectedType(undefined);
        }
        /* Invoked when submit payment is clicked */
        self.submitPayment = function() {
            //create our JSON object and send our payment to the back end
            var payload  = {
                    orderid : self.ourOrder.getID(),
                    payments : ko.utils.unwrapObservable( self.myPayments )
            };
            ajaxDriver.call( ajaxDriver.REQUESTS.CHARGE_ORDER, payload, function() {});
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

    /* REQUEST WAITER FUNCTIONS */
    function requestWaiter() {
        console.log("requesting Waiter....");
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
        });

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
                console.log("Request Waiter Status has yieled %s",status);
            });
        }

        var periodicStatus = window.setInterval( periodicStatusPoll, 10000);
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

        self.refillStatus = ko.observable("Not Requested");

        self.requested = ko.observable('false');

        self.submitRequest = function() {
            //get a list of recipes that we have selected
            var selectedRecipes = $("input:checked", RefillScreen );
            var checkedRecipes = new Array();
            selectedRecipes.each( function(idx, element) {
                var recipeId = $(this).attr('recipe-id');
                for(var i in self.refillables ) {
                    if( self.refillables[i].getID() == recipeId) {
                        checkedRecipes.push( self.refillables[i] );
                        break;
                    }
                }
            });
            //create our payload
            var payload = {
                orderid : self.order.getID(),
                recipes : checkedRecipes
            };

            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_REFILL, payload, function() {

            });
            var pollEvent;

            function periodicRefillStatusPoll() {

                var payload =  {
                    orderid : self.order.getID()
                }
                ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_REFILL_STATUS, payload, function(data) {
                    console.log("Refill Status for orderid : %s is %s", data.status);
                    self.refillStatus( data.status );
                });
            }
            //Register the periodic poll event
            pollEvent = window.setInterval( periodicRefillStatusPoll, 5000 );
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