/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 10/31/12
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */

var OrderManager = function() {
    var refills = null;
    var Order = null; /* Singleton order since we can only have one order at a time */

    return {
        getOrder : function() { return Order; },
        setOrder : function(order) { Order = order; return this; }
    }
}();