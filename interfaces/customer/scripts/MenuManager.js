/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 10/31/12
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */

var MenuMgr = function() {

    var menus = new Array(); //stores our menus objects
//    var menus = [ sampleMenu, sampleMenu2, sampleMenu3, sampleMenu4, sampleMenu5 ];
    var onMenusFetchedCB;
    var onMenuFetchedCB;

    var lastFetchTime = null;

    function internalfetchmenus() {
        ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_MENUS, null, onMenusReceived);
    }

    function internalfetchmenu( menuType ) {
        ajaxDriver.call( ajaxDriver.REQUESTS.REQUEST_MENU, { tablenumber : SETTINGS.getTableNumber(), menutype : menuType }, onMenuReceived );
    }
    /* callback for when we have our menus */
    function onMenusReceived(data) {
        console.log("Menus have been received");
        for(var i in data) {
            //Serialize the json objects into menu objects
            var retrievedMenu = new Menu( data[i] );
            menus.push( retrievedMenu );
            console.log("onMenusReceived, added menu %s", retrievedMenu.getName() );
        }
        if( onMenusFetchedCB ) {
            onMenusFetchedCB.call(null);
        }
    }
    /* callback for when we have our menu */
    function onMenuReceived(data ) {
        if( onMenuFetchedCB ) {
            onMenuFetchedCB.call(null);
        }
    }

    return {
        /* Retrieve the menu objects we currently have */
        getMenus : function() { return menus; },
        findMenu : function(menuname) {
            var foundmenu = null;
            for( var i in menus ) {
                if( menus[i].getName() === menuname ) {
                    foundmenu = menus[i];
                    break;
                }
            }
            return foundmenu;
        },
        /* Fetches our menus from back end */
        fetchMenus : function( onFetchedCb ) { internalfetchmenus.apply(this, arguments); onMenusFetchedCB = onFetchedCb; },
        /* Fetch a specific menu from the back end */
        fetchMenu : function( onFetchCb) { internalfetchmenu.apply(this, arguments); onMenuFetchedCB = onFetchCb; }
    }
}();
