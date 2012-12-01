/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/6/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */
( function($) {
    var self = this;
    var SUPERVM = this;
    // Status ENUMERATIONS as numbers in the form of Strings.
    var STATUS = {
        PLACED : 3,
        READY  : 4,
        PAID : 5,
        OPEN  : 6,
        OCCUPIED : 7,
        PENDING : 8,
        SERVED : 9
    }
    var STATUS_TEXT = {
        3 : "Order is Cooking",
        4 : "Order is Ready",
        5 : "Paid",
        6  : "Open",
        7  : "Occupied",
        8 : "Pending",
        9  : "Served",
        0 : "Closed"
    }

    /* Our element workspaces*/
    self.MainContext = null; //Stores the page ( div[date-role='page'] when the page is first created
    self.RefillScreen = null;
    self.PaymentScreen = null;
    self.newsFeedPanel = null;

    /* Our view models */
    self.newsFeedViewModel;
    self.confirmedCartViewModel;
    self.placeNewOrderViewModel;
    self.paymentViewModel;
    self.refillViewModel;
    self.requestWaiterViewModel;
    self.orderViewModel;

    /* We bind most of the elements to view models here */
    PECR.registerCallback("post-order", "pagecreate", function(evt) {
        /* instantiate our view models here since some of the constructors expect
        data such as 'order's already existing.
        This is acceptable behavior as these view models are put to work
        when 'post-order' page is loaded anyway and not before
        */
        self.orderViewModel = new OrderViewModel();
        self.refillViewModel = new RefillViewModel();
        self.requestWaiterViewModel = new RequestWaiterViewModel();
        self.paymentViewModel = new PaymentViewModel();
        self.newsFeedViewModel = new NewsFeedViewModel();
        self.confirmedCartViewModel = new ConfirmedCartViewModel();
        self.placeNewOrderViewModel = new PlaceNewOrderViewModel();

        //cache this
        self.MainContext = $(evt.target);
        self.newsFeedPanel = $(".newsfeed-panel", self.MainContext);

        /*//Bind 'request waiter' button to VM
        var waiterButton = $("#request-waiter-button", self.MainContext );
        console.log("Applying request waiter view model");
        ko.applyBindings( self.requestWaiterViewModel, waiterButton[0] );

        //Bind the order status wrapper div to VM
        var orderStatusWrapper = $("#order-status-wrapper", self.MainContext );
        if( !orderStatusWrapper.length ) throw new Error("#order-status-wrapper is non existent!");
        console.log("Applying order view model");
        ko.applyBindings( self.orderViewModel, orderStatusWrapper[0] );

        //Bind news feed to VM

        if( !self.newsFeedPanel.length) throw new Error(".newsfeed-panel is missing!");
        console.log("Applying news feed view model");
        ko.applyBindings( self.newsFeedViewModel, self.newsFeedPanel[0] );

        //Apply bindings to 'Pay Order' button
        var openPaymentsButton = $("#payment-screen" );
        if( !openPaymentsButton.length ) throw new Error("Pay Order(#payment-screen) button is missing!");
        //we apply to this buttons since the button gets a check/pending badge when payments are being processed.
        console.log("Applying payment view model");
        ko.applyBindings( self.paymentViewModel, openPaymentsButton[0]);

        //apply bindings for listing the ordered items, total calories and price.
        var confirmedcardUl = $("#confirmed-cart", self.MainContext );
        //apply ko bindings to only confirmed cart ul element
        console.log("Applying confirmed cart view model");
        ko.applyBindings( self.confirmedCartViewModel , confirmedcardUl[0]);*/
        ko.applyBindings( SUPERVM, MainContext[0] );
    });

   /* PECR.registerCallback("post-order", "pagebeforeshow", function(evt) {
        ko.applyBindings( SUPERVM , MainContext[0] );
    });*/

    //Payment screen initialization
    PECR.registerCallback("payment-screen", "pageinit", function(event) {
        // Add functionality for our #payment-screen dialog by applying bindings
        self.PaymentScreen = $(event.target);
        if( !self.PaymentScreen.length ) throw new Error("#payment-screen dialog is missing!");
        //bindings applied here actually apply to the payments workspace.
        console.log("Applying payment view model again");
        ko.applyBindings( self, self.PaymentScreen[0] );

    });

    /* Refill Screen initialization */
    PECR.registerCallback("refill-screen", "pagecreate", function(event) {
        self.RefillScreen = $(event.target);
        if( ! self.RefillScreen.length) throw new Error("refill-screen is missing!");
//        ko.cleanNode( SUPERVM.RefillScreen[0] );
        ko.applyBindings(  self , self.RefillScreen[0]);

    });

    /* Place new order screen & button initialization */
    PECR.registerCallback("place-another-order-confirmation", "pagecreate", function(event) {
//        ko.cleanNode( event.target);
        ko.applyBindings( self , event.target);
    });


    /* CONFIRMED ITEMS  VIEW MODEL
     * Responsible for displaying the list of ordered items in an uneditable list
     * It also displays the total and number of calories in the order
    */
    function ConfirmedCartViewModel() {
        var self = this;

        self.order = OrderManager.getOrder();
        self.recipes = ko.observableArray( self.order.getRecipes() );
        self.totalCalories = function() {
            var recipes = self.recipes();
            var calories = 0;
            for( var i in recipes ) {
                calories += parseInt( recipes[i].getCalories() );
            }
            return calories;
        }();

        self.total = self.order.getTotal().toFixed(2);
    }
    /* ORDER STATUS VIEW MODEL
    * Responsible for updating our order status and also placing the ajax calls that fetch the status
    *
    * */
    function OrderViewModel() {
        var self = this;

        self.order = OrderManager.getOrder();
        self.order.setStatus( STATUS.PLACED );
        self.orderStatus = ko.observable( self.order.getStatus() ); //Stores the status of our order
        /* Returns the css class that corresponds to our order status */
        self.orderStatusMarkup = ko.computed( function() {
            var status = self.orderStatus();
            if( status == STATUS.PLACED)
                return "pending";
            else if( status == STATUS.READY || status == STATUS.PAID )
                return "approved";
        });
        //what to show to the user
        self.orderStatusText = ko.computed( function() {
            return STATUS_TEXT[ self.orderStatus() ];
        });
        //set when the order is paid
        self.isPaid = ko.computed( function() {
            return self.orderStatus() == STATUS.PAID;
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
                var status = data.status; //retrieve status from payload
                if( status != STATUS.PAID ) //ignore paid status as it does nothing important for this view model
                    self.orderStatus( status );

                self.order.setStatus(status); //update our order object's status
                console.log("REQUEST_ORDER_STATUS yielded [%s]", STATUS_TEXT[status]);
                //remove the polling event once our order is ready.
                if( status == STATUS.READY ) {
                    console.log("Order is ready!");
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
            self.paymentAmount.valueHasMutated(); //trigger a read operation
            //if it's a coupon payment, re-add coupon to list of allowable types
            if( payment.type == "COUPON" ) {
                self.allowedTypes.push( "COUPON");
            }
        }

        //What type of payment the user has selected
        self.selectedType = ko.observable(null);
        self.selectedTypeListener = ko.computed( {
            read : function() { return self.selectedType(); },
            write:  function(value) {

                self.selectedType(value);
                //If the selected type is coupon, check which recipes support coupon and use the highest cost dessert
                if( value == "COUPON") {
                    var recipes = self.ourOrder.getRecipes();
                    var maxPrice = 0.0;
                    for( var i in  recipes ) {
                        if( recipes[i].supportsCoupon() ) {
                            maxPrice = Math.max( maxPrice, parseFloat(recipes[i].getPrice() ) );
                        }
                    }
                    //update the payment amount to 'maxPrice'
                    self.paymentAmount(maxPrice );
                }
                else
                    self.paymentAmount( self.totalAmountLeft() );
            }
        })
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
            // TO-DO : Add logic xfor how much coupon should take away for only the menu items that it applies to.
            //add to the list of payments
            self.myPayments.push(payment );
            //increment payment id
            self.currentId = this.currentId++;
            //update self.paymentAmount() with total amount left
            self.guardedPaymentAmount( self.getTippedTotal() );
            self.selectedType(null);
            //if it's a coupon payment, remove coupon from list
            if( payment.type == "COUPON" )
                self.allowedTypes.splice( self.allowedTypes.indexOf("COUPON"), 1);
            //clear the type so they can re-select
            self.selectedType(null);
            if( self.getTotalAmountLeft() <= 0 ) {
                self.tipAmount(null);
            }
        }

        /* Invoked when submit payment button is clicked */
        self.submitPayment = function() {
            //set payment status to pending
            self.paymentStatus( STATUS.PENDING );

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
                    if( data.status  == STATUS.PAID ) {
                        console.log("REQUEST_CHARGE_STATUS order has been paid!");
                        window.clearInterval(pollId );
                    }
                });
            }
            pollId = window.setInterval( periodicChargeOrderStatus, 1000);
        }
        /* True when the order has been submitted */
        self.submitted = ko.observable(false);
        /* Holds the last payment status */
        self.paymentStatus = ko.observable();
        //What is shown to the user
        self.paymentStatusText = ko.computed( function() {
            return STATUS_TEXT[ self.paymentStatus() ];
        })
        self.paymentMarkupClass = ko.computed(function() {
            var paymentstatus = self.paymentStatus();
            var paymentClass = null;
            if( paymentstatus == STATUS.PENDING )
                paymentClass = "payment-pending";
            else if( paymentstatus == STATUS.PAID )
                paymentClass = "payment-paid";
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
        self.requestStatusText = ko.computed( function() {
            return STATUS_TEXT[ self.requestStatus() ];
        })
        self.requestStatusMarkupClass = ko.computed( function() {
            var status = self.requestStatus();
            if( status == STATUS.SERVED )
                return 'waiter-request-serviced';
            else if ( status == STATUS.PENDING )
                return 'waiter-request-pending';
            else
                return null;
        });

        self.requestWaiter = function() {
            console.log("requesting Waiter....");
            //make the status pending
            self.requestStatus( STATUS.PENDING );
            var tableNumber = SETTINGS.getTableNumber();
            //place ajax call w/ our payload
            var payload = {
                    tablenumber : tableNumber,
                    orderid : OrderManager.getOrder().getID()
            };
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_WAITER, payload, function(payload) {

                console.log("Waiter has been requested!");
                ///Register the interval event
                var pollEvent = window.setInterval( periodicStatusPoll, 1000);
                function periodicStatusPoll() {
                    //request the status of the waiter
                    var payload = {
                            tablenumber : tableNumber,
                            orderid : OrderManager.getOrder().getID()
                    };
                    ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_WAITER_STATUS, payload, function(data) {
                        var status = data.status;
                        self.requestStatus( status );
                        console.log("Request Waiter Status has yielded [%s]",status);
                        if( status == STATUS.SERVED )
                            window.clearInterval( pollEvent );
                    });
                }
            });
        }
    }

    /* REFILL SCREEN VIEW MODEL */
    function RefillViewModel() {
        var self = this;

        self.order = OrderManager.getOrder(); //Order instance

        self.refillables = new Array(); //Stores list of the recipes that are refillable, used by VM
        //insert refillable recipes in our array
        var recipes = self.order.getRecipes();
        for( var i in recipes ) {
            if( recipes[i].isRefillable() )
                self.refillables.push(  recipes[i] );
        }

        self.refillStatus = ko.observable();
        self.refillStatusText = ko.computed( function (){
            if( !self.refillStatus() )
                return "Not Requested";
            else
                return STATUS_TEXT[ self.refillStatus() ];
        });
        self.refillStatusMarkupClass = ko.computed( function() {
            if( self.refillStatus() == STATUS.PENDING )
                return "pending";
            else if( self.refillStatus() == STATUS.SERVED )
                return "approved";
        });

        self.requested = ko.observable('false');

        self.submitRequest = function() {
            self.refillStatus( STATUS.PENDING ); //mark status as pending
            //get a list of recipes that we have selected
            var selectedRecipes = $("input:checked", self.RefillScreen );
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
            }() );
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
                        if( data.status == STATUS.SERVED ) {
                            console.log("Refill status has been serviced, event has been removed!");
                            window.clearInterval( pollEvent );
                        }
                    });
                }
                //Register the periodic poll event
                pollEvent = window.setInterval( periodicRefillStatusPoll, 1000 );
            }
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_REFILL, payload, createPollingEvent  );
        }
    }

    function PlaceNewOrderViewModel() {
        var self = this;

        //The user has confirmed that they want to start over, clear the food cart
        self.Confirm = function() {
            FOODCART.clear();
            MenuMgr.clearMenus();
            PECR.unloadPage( "post-order");
            console.log("User has confirmed, clearing food cart!");
            return true;
        }
    }

    //News feed View Model
    function NewsFeedViewModel() {
        var self = this;

        self.selectedHeadline = ko.observable();
        self.categories = ko.observableArray();

        //request news feed when created.
        ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_NEWSFEED, null, function( payload ) {
            console.log("Receiving news feed");
            populateHeadlines(payload );
        }, Retry );

        function Retry() {
            console.log("RE-Requesting newsfeed!");
            ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_NEWSFEED, null, populateHeadlines, Retry);
        }
        function populateHeadlines ( payload ) {
            //add each category to the observable array
            for(var i in payload ) {
                self.categories.push( payload[i] );
            }
            //refresh listview
            if( SUPERVM.newsFeedPanel ) {
                SUPERVM.newsFeedPanel.trigger('create');
                $("ul", SUPERVM.newsFeedPanel).listview("refresh");
            }
            console.log("Feed has been received, populating!");
        }
        self.openHeadline = function( headline ) {
            self.selectedHeadline( headline );
        };
        self.clearHeadline = function() {
            self.selectedHeadline(null);
        }
    }

})(jQuery);

/* AJAX TESTS */
ajaxDriver.registerMockCallbackForType(ajaxDriver.REQUESTS.REQUEST_WAITER, function(data) {
    console.log("REQUEST_WAITER call has been intercepted with table number %s", data.payload.tablenumber);
});
ajaxDriver.registerMockCallbackForType(ajaxDriver.REQUESTS.REQUEST_WAITER_STATUS, function(data) {
    console.log("REQUEST_WAITER call has been intercepted with table number %s", data.payload.tablenumber);
    var status = [STATUS.PENDING, STATUS.SERVED ];
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