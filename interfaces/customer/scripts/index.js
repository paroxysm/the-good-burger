/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/12/12
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */


PECR.registerCallback("configure-settings", "pagecreate", function(event) {

    //create our view model

    function SettingsViewModel() {
        var self = this;

        self.url = ko.observable( SETTINGS.getControllerURL() );
        self.urlIsValid = ko.observable(true);
        self.tablenumber = ko.observable( SETTINGS.getTableNumber() );
        self.tablenumberIsValid = ko.observable(true);

        self.Save = function() {
            SETTINGS.setControllerURL( self.url() );
            SETTINGS.setTableNumber( self.tablenumber() );
        }
        self.Reset = function() {
            self.url = ko.observable( SETTINGS.getControllerURL() );
            self.tablenumber = ko.observable( SETTINGS.getTableNumber() );
        }
    }

    //apply the bindings
    ko.applyBindings( new SettingsViewModel(), event.target);
});

PECR.registerCallback("wait-for-menus", "pageshow", function(event) {
    $.mobile.loading('show', { text : "Please wait, menus are being fetched..." } );
    MenuMgr.fetchMenus( function() {
        $.mobile.loading('hide');
        $.mobile.changePage("menu.html");
    });
})