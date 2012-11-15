/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 10/31/12
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */

var TableStatusMgr = function() {
    var tables = new Array();

    return {
        addTableStatus : function(tablestatus) {
            tables.push(tablestatus);
            return this;
        },

        findTableStatus : function(tablenumber) {
            var foundStatus = null;
            for( var i in tables ) {
                if( tables[i].getTableNumber() == tablenumber ) {
                    foundStatus = tables[i];
                    break;
                }
            }
            return foundStatus;
        },

        removeTableStatus : function(tablenumber) {
            var foundStatus = null;
            for( var i in tables ) {
                if( tables[i].getTableNumber() == tablenumber ) {
                    foundStatus = tables[i];
                    tables.splice(i, 1);
                    break;
                }
            }
            return foundStatus;
        },
        update : function(data ) {
            for(var i in data ) {
                var tableStatus = this.findTableStatus( data[i].tablenumber );
                if( tableStatus ) {
                    tableStatus.update( data[i] ); //update the status w/ new ajax data
                }
            }
        },

        getTables : function() { return tables; }

    }
}();