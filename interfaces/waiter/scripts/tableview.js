/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/14/12
 * Time: 3:46 PM
 * To change this template use File | Settings | File Templates.
 */

function TableViewViewModel($) {
    var self = this, viewMODEL = this;
    var TABLEVIEW_PAGE;
    var TABLEVIEW_CANVAS;
    var VIEWORDER_DIALOG;
    var viewModelVM = new ViewOrderVM();

    /* first time table status fetch, it prevents table view from being shown until we have initial fetch completed.
        Set to true when the ajax calback that requests statuses is executed
     */
    self.firstTimeFetch = ko.observable(false);


    function StatusColumn() {

        var column = this;
        column.name = ko.observable(); //the name of the column, could just be the range of tables it covers
        column.tables = ko.observableArray([]); //stores the table statuses for this column
        column.block;

        column.refillServed = function( tablestatus ) {
            //place an ajax call to make the refill as serviced
            var orderid = tablestatus.getOrder().getID();
            var payload = {
                orderid : orderid,
                newstatus : STATUS.SERVED
            }
            tablestatus.refillstatus('served');
            ajaxDriver.call(ajaxDriver.REQUESTS.UPDATE_REFILLREQUEST, payload, function () {
                console.log("Waiter has serviced refill!");
            })
        }
        column.acknowledge = function( tablestatus ) {
            //place an ajax call to mark customer as assisted
            var orderid = tablestatus.getOrder().getID();
            var payload = {
                orderid : orderid,
                newstatus : 'acknowledged'
            }
            ajaxDriver.call(ajaxDriver.REQUESTS.UPDATE_WAITERREQUEST, payload, function() {
                console.log("Waiter has assisted!");
            });
        }
        column.assisted = function( tablestatus ) {
            //place an ajax call to mark customer as assisted
            var orderid = tablestatus.getOrder().getID();
            var payload = {
                orderid : orderid,
                newstatus : STATUS.SERVED
            }
            tablestatus.waiterstatus('serviced');
            ajaxDriver.call(ajaxDriver.REQUESTS.UPDATE_WAITERREQUEST, payload, function() {
                console.log("Waiter has assisted!");
            });

        }
        column.orderOnRoute = function( tablestatus ) {
            var orderid = tablestatus.getOrder().getID();
            var payload = {
                orderid : orderid,
                newstatus : STATUS.READY
            }
            ajaxDriver.call( ajaxDriver.REQUESTS.ORDER_RETRIEVED, payload, function(data) {
                console.log("Order was retrieved!");
            });

        }
        column.vieworder = function( tablestatus ) {
            viewModelVM.setTableStatus( tablestatus );
            $.mobile.changePage( VIEWORDER_DIALOG );
            VIEWORDER_DIALOG.trigger('create');
            $("ul", VIEWORDER_DIALOG).listview('refresh'); //this is required
        }

        column.clearTable = function( tablestatus ) {
            console.log("Clearing table %s", tablestatus.tablenumber );
            var payload  = {
                id : tablestatus.order.id
            }
            ajaxDriver.call( ajaxDriver.REQUESTS.CLEAR_TABLE, payload, function() {
                console.log("Table %s has been cleared!", tablestatus.tablenumber);

            });
        }
    };

    /* Stores all the columns we have, 1-4. It's also responsible for notifying the UI to draw them as collapsibles */
    self.columns = ko.observableArray();

    /* Called after fetch our menus */
    function initializeColumns(data) {
        for(var i in data) {
            TableStatusMgr.addTableStatus( new TableStatus(data[i] ) );
        }
        console.log("Initializing columns");
        self.firstTimeFetch(true); //update this so we can view our grid

        //Split our tables in columns of 4, 6 tables in each column
        //start off w/ the first column
        var currentColumn;
        var columnCounter=1 ;
        var blocks = [ "ui-block-a", "ui-block-b", "ui-block-c"];
        for(var i = 1; i <= 24; ++i) {
            if( i % 8 == 1 ) { //After we process every 6th table, we create a column to store the next 6 tables, and add it to our list of columns
                currentColumn = new StatusColumn();
                currentColumn.name = "Sector"+columnCounter;
                currentColumn.block = blocks [ self.columns().length ]; //assign a block depending on the size of already cached columns
                columnCounter+=1;
                self.columns.push( currentColumn ); //push it our master list of columns
            }
            //grab it's status
            var tableStatus = TableStatusMgr.findTableStatus(i);
            if( !tableStatus ) {
                tableStatus = new TableStatus().setTableNumber(i);
                TableStatusMgr.addTableStatus(tableStatus ); //add it to the list
            }

             currentColumn.tables.push( tableStatus );
        }
        console.log("Created %d columns!", self.columns().length );

        $.mobile.loading('hide'); //hide page loading widget
        //Form jqm to enhance our now new markup
        TABLEVIEW_PAGE.trigger('create');

        //Start the normal table update process
        startTableUpdateProcess();
    }
    /* Called to update the progress on our tables */
    function startTableUpdateProcess() {

        var pollEvent = window.setInterval( function() {
            ajaxDriver.call( ajaxDriver.REQUESTS.TABLES_STATUS, null, onSuccess, onError );
        }, 2000); //Update tables every 5 seconds.

        /* Once we have our new tables statuses, call update on each status */
        function onSuccess( tables ) {
            TableStatusMgr.update( tables ); //delegate responsibility to TableStatusMgr
            TABLEVIEW_PAGE.trigger('refresh');
        }

        function onError() {
            console.log("TABLES_STATUS errored out!");
        }
    }

    PECR.registerCallback("table-view", "pagecreate", function(event) {
        TABLEVIEW_PAGE = $(event.target); //cache our main page.
        VIEWORDER_DIALOG = $("#view-order");
        TABLEVIEW_CANVAS = $("#table-view-canvas");
        //do our initial menu fetch, show loading widget while doing so.

        /* We error'd out, retry again in 2 secs; */
        function retryOnError() {
            console.log("Attempting to refetch tables....");
//            $.mobile.loading('hide'); //hide page loading widget
            window.setTimeout(fetch, 2000); //re-fetch tables in 2secs
        }
        /* Fetch our menus, retry every 2 secs on error, otherwise we initialize our columns */
        function fetch() {
            $.mobile.loading('show', { text:"Fetching tables...", textVisible : true} );
            ajaxDriver.call( ajaxDriver.REQUESTS.TABLES_STATUS, null, initializeColumns );
        }
        window.setTimeout(fetch, 1); //fetch tables, timeout required to show the visual
        //Apply our bindings
        ko.applyBindings( viewMODEL, TABLEVIEW_CANVAS[0] );
        ko.applyBindings( viewModelVM, VIEWORDER_DIALOG[0] );

    });


    /* View Order VM */
    function ViewOrderVM() {
        var self = this;

        self.tableStatus = null;
        self.setTableStatus = function(tableStatus) {
            self.tableStatus = tableStatus;
            self.recipes( tableStatus.order.getRecipes() );
            self.selectedRecipe( self.recipes()[0] );
        }

        self.selectedRecipe = ko.observable(null);

        self.recipes = ko.observableArray();

        self.selectRecipe = function( recipe ) {
            self.selectedRecipe( recipe );
            console.log("Recipe selected");
        }

        self.removeRecipe = function( recipe ) {
            self.recipes.remove( recipe );
        }
        self.submit = function() {
            //create a new order based of the current recipes
            var order = new Order();
            order.setID( self.tableStatus.order.getID() );
            var editedRecipes = self.recipes();
            for( var i in editedRecipes ) {
                order.addRecipe( editedRecipes[i] );
            }
            //place ajax call now
            ajaxDriver.call(ajaxDriver.REQUESTS.UPDATE_ORDER, JSON.parse( JSON.stringify( order ) ), function() {
                console.log("Order successfully edited!");
            });
            //Replace the current order w/ this one given to us
            self.tableStatus.order = order;
        }

    }
};
new TableViewViewModel(jQuery );

//Mock testing
ajaxDriver.registerMockCallbackForType( ajaxDriver.REQUESTS.TABLES_STATUS, function(data) {
    var status1 = ko.toJS( new TableStatus().setID(1).setTableNumber(1).setStatus('open') );
    var status2 = ko.toJS( new TableStatus().setID(2).setTableNumber(2).setStatus('occupied') );
    var status3 = ko.toJS(new TableStatus().setID(3).setTableNumber(3).setStatus('open') );
    var status4 =  ko.toJS(new TableStatus().setID(4).setTableNumber(4).setStatus('occupied') );
    var status5 =  ko.toJS(new TableStatus().setID(5).setTableNumber(5).setStatus('open') );
    var status6 =  ko.toJS(new TableStatus().setID(6).setTableNumber(6).setStatus('open') );
    var status7 =  ko.toJS(new TableStatus().setID(7).setTableNumber(7).setStatus('open') );
    var status8 =  ko.toJS(new TableStatus().setID(8).setTableNumber(8).setStatus('open') );
    var status9 =  ko.toJS(new TableStatus().setID(9).setTableNumber(9).setStatus('open') );
    var status10 =  ko.toJS(new TableStatus().setID(10).setTableNumber(10).setStatus('open') );
    var status11 =  ko.toJS(new TableStatus().setID(11).setTableNumber(11).setStatus('open') );
    var status12 =  ko.toJS(new TableStatus().setID(5).setTableNumber(12).setStatus('open') );
    var status13 =  ko.toJS(new TableStatus().setID(5).setTableNumber(13).setStatus('open') );
    var status14 =  ko.toJS(new TableStatus().setID(5).setTableNumber(14).setStatus('open') );
    var status15 =  ko.toJS(new TableStatus().setID(5).setTableNumber(15).setStatus('open') );
    var status16 =  ko.toJS(new TableStatus().setID(5).setTableNumber(16).setStatus('open') );
    return [status1, status2, status3, status4, status5, status6, status7, status8, status9, status10, status11, status12, status13, status14, status15, status16 ];
});