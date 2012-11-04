/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/1/12
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

var Settings = function($) {
    var tableNumber = null;
    var phase = null; //Stores the phase that the customer is currently.
    //perform jqm customization here
    $(document).bind("mobileinit", function() {
        console.log("[DEBUG] configuring jqm!");
        //allow ajax calls to fetch outside our domain
        $.mobile.allowCrossDomainPages = true;
    })

    return {
        getTableNumber : function() { return tableNumber; },
        setTableNumber : function(number) { tableNumber = number; },
        getPhase : function() { return phase; },
        setPhase : function(newphase) { phase = newphase; }
    };
}(jQuery);