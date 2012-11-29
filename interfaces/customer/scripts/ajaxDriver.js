/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/8/12
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */

var IS_MOCKING = false;
/* This class is responsible for making ajax calls and dispatching the data that comes back to registered handlers
    It revolves around the convention of any json data follow the form { request_type : <type>, payload : <datatosend> }
    when posting/getting to the server. It relies on jQuery's ajax api
 */
console.log("loading ajaxDriver.js");
var ajaxDriver = function($) {
    if( !SETTINGS.getControllerURL() )
        console.warn("ajaxDriver, controller Url is not valid!");

    var DEFAULT_TIMEOUT = 15000;
    var METHOD_TYPE = { POST : "POST", GET : "GET"};


    var defaultMethod = METHOD_TYPE.POST;

    /* Wraps the callback w/ a function that logs the error and passes the text status to the error handler */
    function errorWrapper(callback, requestType, payload) {
        return function(XHR, textStatus, thrownException) {
            console.log("ajaxDriver::genericErrorHandler status : %s Exception : %s for request type %s", textStatus, (thrownException ? thrownException.toString() : "unknown" ), requestType );

            if( callback )
                callback.call(null, textStatus);
        }
    }
    /* Wraps the specified callback in a function that logs the success and calls the callback w/ just the data parameter */
    function successWrapper( callback , requestType, payload) {
        return function(data, textStatus, XHR ) {
            console.log("ajaxDriver::successWrapper textStatus :%s", textStatus);
            try {
             callback.call(null, data);
            }
            catch(e) {
                console.log("success Wrapper caught exception "+e);
            }
        }
    }

    function realAjaxCall(requestType, payload, successCallback, errorHandler, method, timeout)  {
        if( !requestType || !successCallback )
            throw new Error("ajaxDriver::call first 3 arguments must be valid/non-null!");
        if( !SETTINGS.getControllerURL() )
            throw new Error("ajaxDriver::call, controller Url is invalid/null!");
        //convention
        var dataSent = { request_type : requestType, payload : payload };
        //place the ajax call
        console.log("Placed ajax call for request type '%s'",requestType);
        jQuery.ajax(SETTINGS.getControllerURL(), {
            type : (method ? method : defaultMethod ),
            data : dataSent,
            dataType : "json",
            crossDomain : true,
            success : successWrapper( successCallback , requestType, payload),
            error : errorWrapper( errorHandler, requestType, payload),
            timeout : (timeout ? timeout : DEFAULT_TIMEOUT)
        } );
    }


    /* Mock stuff */
    function MockEntry(type, cb ) {
        this.type = type;
        this.cb = cb;
    }

    var registeredMockCallbacks = new Array();

    function mockAjaxCall( requestType, payload, successCallback, method, errorHandler, timeout ) {
        for( var i in registeredMockCallbacks ) {
            var mockEntry = registeredMockCallbacks[i];
            if( mockEntry.type == requestType ) {
                //follow convention style
                var data = {
                    request_type : requestType,
                    payload : payload
                };
                console.log("mockAjaxCall dispatched mock for request type : %s", requestType );
                try {
                    var returnedData = mockEntry.cb.call(null, data );
                    successCallback.call(null, returnedData);
                }
                catch(e) {
                    throw e;
                }
            }
        }
    }

    return {
        /* Main method that handles mock calls */
        call : (IS_MOCKING ? mockAjaxCall : realAjaxCall),
        /* The request types the customer interface utilizes */
        REQUESTS : {
            REQUEST_MENUS : "request_menus",
            REQUEST_MENU : "request_menu",
            UPDATE_MENU : "update_menu",
            PLACE_ORDER : "place_order",
            CHARGE_ORDER : "charge_order",
            REQUEST_CHARGE_STATUS : "request_charge_status",
            REQUEST_REFILL : "request_refill",
            REQUEST_REFILL_STATUS : "request_refill_status",
            REQUEST_WAITER : "request_waiter",
            REQUEST_WAITER_STATUS : "request_waiter_status",
            REQUEST_ORDER_STATUS : "request_order_status",
            REQUEST_NEWSFEED : "request_newsfeed"
        },
        registerMockCallbackForType : function( requestType, mockCallback ) {
            registeredMockCallbacks.push( new MockEntry(requestType, mockCallback) );
        },
        clearMocks : function() { registeredMockCallbacks.splice(0, registeredMockCallbacks.length); }
    };
}(jQuery );

/* Create some mock callbacks */

//mock for request_menus
ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.REQUEST_MENUS, function(payload ) {

    var ingredients1 = [ new Ingredient().setName("ingredient 1"),
        new Ingredient().setName("ingredient 2"),
        new Ingredient().setName("ingredient 3") ,
        new Ingredient().setName("ingredient 10")];
    var ingredients2 = [ new Ingredient().setName("ingredient 4"),
        new Ingredient().setName("ingredient 5"),
        new Ingredient().setName("ingredient 6") ];
    var ingredients2 = [ new Ingredient().setName("ingredient 7"),
        new Ingredient().setName("ingredient 8"),
        new Ingredient().setName("ingredient 9") ];

    var items = [ new Recipe().setName("burger 1").setPrice(4.99),
        new Recipe().setName("burger 2").setPrice(5.99),
        new Recipe().setName("burger 3").setPrice(6.99)
    ];
    var items2 = [ new Recipe().setName("burger 4").setPrice(2.99),
        new Recipe().setName("burger 5").setPrice(3.99),
        new Recipe().setName("burger 6").setPrice(4.50) ];

    for( var i in ingredients1 ) {
        items[0].addIngredient( ingredients1[i] );
        items2[0].addIngredient(ingredients1[i] );
        items[2].addIngredient( ingredients1[i] );
        items2[2].addIngredient( ingredients1[i] );
    }
    for( var i in ingredients2 ) {
        items[1].addIngredient( ingredients2[i] );
        items2[1].addIngredient( ingredients2[i] );
    }


    var sampleMenu = new Menu().setName("Burger Test Menu");
    var sampleMenu2 = new Menu().setName("Burger Test Menu 2");
    var sampleMenu3 = new Menu().setName("Burger Test Menu 3");
    var sampleMenu4 = new Menu().setName("Burger Test Menu 4");
    var sampleMenu5 = new Menu().setName("Burger Test Menu 5");
    for( var i in items ) {
        sampleMenu.addRecipe( items[i] );

        sampleMenu3.addRecipe( items[i] );

        sampleMenu5.addRecipe( items[i] );
    }
    for( var i in items2 ) {
        sampleMenu2.addRecipe( items2[i] );
        sampleMenu4.addRecipe( items2[i] );
    }
    //pass our fake menu objects to the callback
    return [sampleMenu,sampleMenu2,sampleMenu3,sampleMenu4,sampleMenu5];
});

ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.REQUEST_MENU, function(data) {

});

var OrderStatuses = new Array();
var statuses = [ "Placed", "Ready", "Paid"];
ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.PLACE_ORDER, function(data) {
    console.log("PLACE_ORDER mock invoked with %d recipes!", data.payload.recipes.length);
    var orderid = Math.floor( (Math.random() * 100) +1 );
    OrderStatuses[orderid] = statuses[ Math.floor( Math.random() * 2) ];
    return {
        orderid : orderid //Order between 1-100
    };
});

ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.REQUEST_ORDER_STATUS, function(data) {
    console.log("REQUEST_ORDER_STATUS mock invoked with order id %s", data.payload.orderid);
    return {
        status : statuses[ Math.floor( Math.random() * 2) ]
    };
});