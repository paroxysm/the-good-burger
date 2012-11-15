/**
 * Created with JetBrains PhpStorm.
 * User: C.Kamau
 * Date: 10/22/12
 * Time: 1:57 PM
 * To change this template use File | Settings | File Templates.
 */
// Global object that41
var PECR = function($) {
    console.log("PECR( Page Event Callback Registrar has been initialized!");
    var evtTypes = [ "pagebeforeshow",
        "pagebeforehide",
        "pageshow",
        "pagehide",
        "pagebeforechange",
        "pagechange",
        "pagechangefailed",
        "pagebeforecreate",
        "pagecreate",
        "pageinit",
        "pageremove"
      ];

    /* Stores our callbacks */
    var callbacks = new Array();

    /* Used to register new callbacks, requires the page id, type, and cb object.
    To register for all types, specify null for pageid.
     */
    function REG_CB(pageId, type, cb) {
        if(pageId == undefined )
            throw new TypeError("REG_CB() arg 1 is null/undefined");
        if(!cb || typeof(cb) !== 'function' )
            throw new TypeError("REG_CB() arg 3 must be a function, instead got :"+typeof(cb) );

        if(callbacks.length == callbacks.push( new CallBack().setPageID(pageId).setType(type).setCallback(cb) ) )
            throw new Error("REG_CB failed to insert new callback!");
    }

    /* Used to delete callbacks, takes the callback object */
    function DEL_CB(cb) {
        for( var idx in callbacks ) {
            if( callbacks[idx].getCallback() === cb) {
                callbacks.splice(idx, 1);
            }
        }
    }
    for( var idx in evtTypes ) { //register callbacks for each evt type that calls 'apply' w/ all our registered callbacks
        $(document).bind( evtTypes[idx], function(event, prevPage) {
            if( event.target instanceof  HTMLDivElement && $(event.target).attr('data-role') === 'page' ) { //
                console.log("callbackregistrar dispatched event :"+event.type +" for page :"+event.target.id);
                var pageId = event.target.id;
                for( var idx in callbacks) {
                    if( callbacks[idx].getType() === event.type && callbacks[idx].getPageID() == pageId )
                        callbacks[idx].getCallback().apply(null, arguments );
                }
            }
            else {}
                //console.log("What the what?!");
        });
    }

    function CallBack() {
        this.type = null;
        this.pageId = null;
        this.callback = null;

        this.setType = function(type ) { this.type = type; return this; }
        this.getType = function() { return this.type; }

        this.setPageID = function(id) { this.pageId = id; return this;}
        this.getPageID = function() { return this.pageId; }

        this.setCallback = function(callback) { this.callback = callback; return this;}
        this.getCallback = function() { return this.callback; }
    }

    return {
        registerCallback : REG_CB,
        removeCallback : DEL_CB
    };
}(jQuery);