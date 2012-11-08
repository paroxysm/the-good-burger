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

    var lastFetchTime = null;

    function internalfetchmenus() {

    }

    function internalfetchmenu(tablenumber, menuType ) {

    }
    /* callback for when we have our menus */
    function onMenusReceived(data) {

    }
    /* callback for when we have our menu */
    function onMenuReceived(data ) {

    }
    /* generic error handler for our ajax calls */
    function onError(xhr, textStatus, exceptionObj ) {
        console.log("MenuMgr::onError with textStatus %s",textStatus);
        if( exceptionObj != null )
            throw exceptionObj;
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
        fetchMenus : function() { internalfetchmenus.apply(this, arguments); },
        /* Fetch a specific menu from the back end */
        fetchMenu : function() { internalfetchmenu.apply(this, arguments); }
    }
}();
