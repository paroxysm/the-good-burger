/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 10/31/12
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */

var MenuMgr = function() {
    var items = [ new MenuItem().setName("burger 1").setPrice(4.99),
        new MenuItem().setName("burger 2").setPrice(5.99),
        new MenuItem().setName("burger 3").setPrice(6.99)
    ];
    var items2 = [ new MenuItem().setName("burger 4").setPrice(2.99),
    new MenuItem().setName("burger 5").setPrice(3.99),
    new MenuItem().setName("burger 6").setPrice(4.50) ];

    var sampleMenu = new Menu().setName("Burger Test Menu");
    var sampleMenu2 = new Menu().setName("Burger Test Menu 2");
    var sampleMenu3 = new Menu().setName("Burger Test Menu 3");
    var sampleMenu4 = new Menu().setName("Burger Test Menu 4");
    var sampleMenu5 = new Menu().setName("Burger Test Menu 5");
    for( var i in items ) {
        sampleMenu.addItem( items[i] );

        sampleMenu3.addItem( items[i] );

        sampleMenu5.addItem( items[i] );
    }
    for( var i in items2 ) {
        sampleMenu2.addItem( items2[i] );
        sampleMenu4.addItem( items2[i] );
    }
//    var menus = new Array(); //stores our menus objects
    var menus = [ sampleMenu, sampleMenu2, sampleMenu3, sampleMenu4, sampleMenu5 ];

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
