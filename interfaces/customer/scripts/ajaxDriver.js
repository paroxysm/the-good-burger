/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/8/12
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */

var IS_MOCKING = true;

/* This class is responsible for making ajax calls and dispatching the data that comes back to registered handlers
    It revolves around the convention of any json data follow the form { request_type : <type>, payload : <datatosend> }
    when posting/getting to the server. It relies on jQuery's ajax api
 */
var ajaxDriver = function($) {
    if( !SETTINGS.getControllerURL() )
        console.warn("ajaxDriver, controller Url is not valid!");

    var DEFAULT_TIMEOUT = 5000;
    var METHOD_TYPE = { POST : "POST", GET : "GET"};


    var defaultMethod = METHOD_TYPE.POST;

    /* Wraps the callback w/ a function that logs the error and passes the text status to the error handler */
    function errorWrapper(callback ) {
        return function(XHR, textStatus, thrownException) {
            console.log("ajaxDriver::genericErrorHandler status : %s Exception : %s", textStatus, (thrownException ? thrownException.toString() : "unknown" ) );
            if( callback )
                callback.call(null, textStatus);
        }
    }
    /* Wraps the specified callback in a function that logs the success and calls the callback w/ just the data parameter */
    function successWrapper( callback ) {
        return function(data, textStatus, XHR ) {
            console.log("ajaxDriver::successWrapper textStatus :%s", textStatus);
            callback.call(null, data);
        }
    }

    function realAjaxCall(requestType, payload, successCallback, method, errorHandler, timeout)  {
        if( !requestType || !payload || !successCallback )
            throw new Error("ajaxDriver::call first 3 arguments must be valid/non-null!");
        if( !SETTINGS.getControllerURL() )
            throw new Error("ajaxDriver::call, controller Url is invalid/null!");
        //convention
        var dataSent = { request_type : requestType, payload : payload };
        //place the ajax call
        $.ajax(SETTINGS.getControllerURL(), {
            type : (method ? method : defaultMethod ),
            data : dataSent,
            dataType : "json",
            success : successWrapper( successCallback ),
            error : errorWrapper( errorHandler ),
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
            if( registeredMockCallbacks[i].type == requestType ) {
                console.log("mockAjaxCall dispatched mock for request type : %s", requestType );
                registeredMockCallbacks[i].cb.call(null, payload, successCallback );
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
            REQUEST_ORDER_STATUS : "request_order_status"
        },
        registerMockCallbackForType : function( requestType, mockCallback ) {
            registeredMockCallbacks.push( new MockEntry(requestType, mockCallback) );
        },
        clearMocks : function() { registeredMockCallbacks.splice(0, registeredMockCallbacks.length); }
    }
}(jQuery );

/* Create some mock callbacks */

//mock for request_menus
ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.REQUEST_MENUS, function(payload, success ) {
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
    success.call(null, sampleMenu,sampleMenu2,sampleMenu3,sampleMenu4,sampleMenu5 );
});

ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.REQUEST_MENU, function(payload, success) {

});