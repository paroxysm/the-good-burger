/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/12/12
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */

/* Functionality for #configure-settings screen.
    and text and password fields are used to change table number and server location.
 */
PECR.registerCallback("configure-settings", "pagecreate", function(event) {

    //create our view model

    function SettingsViewModel() {
        var self = this;
        //The url of the backend server, it's where we send our ajax calls to.
        self.url = ko.observable( SETTINGS.getControllerURL() );
        //an observable that becomes false when the entered url is invalid.
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
    $.mobile.loading('show', { text : "Fetching menus...", textVisible : true} );
    MenuMgr.fetchMenus( function() {
        $.mobile.loading('hide');
        $.mobile.changePage("menu.html");
    });
});

PECR.registerCallback("home", "pagecreate", function(event) {

    var AuthenticateUserVM;
    var Context = $(event.target);
    var settingsPage;

    PECR.registerCallback("home", "pageshow", function()
    {
        settingsPage = $("#configure-settings");
        if( !settingsPage.length) throw new Error("#configure-settings is missing!");

        if( !AuthenticateUserVM ) {

            function AuthenticateUserViewModel() {
                var MASTER_USER = "master";
                var MASTER_PASSWORD = "winning";

                var self = this;
                self.username = ko.observable('');
                self.password = ko.observable('');
                self.isInvalid = ko.observable(false);
                self.loginAttempts = ko.observable(3);

                self.authenticate = function() {
                    if( self.username() != MASTER_USER || self.password() != MASTER_PASSWORD )
                    {
                        self.isInvalid(true);
                        window.setTimeout( self.resetIsInvalid, 3000);
                        self.loginAttempts( self.loginAttempts() - 1);
                        if( !self.loginAttempts() ) {
                            console.log("You're out of tries!");
                            $.mobile.changePage(Context);
                            window.setTimeout( self.resetLoginAttempts, 180000); //reset attempts in 3mins
                        }
                    }
                    else {
                        $.mobile.changePage(  settingsPage );
                        //clear user/pass fields
                        self.username('');
                        self.password('');
                    }
                }

                self.resetIsInvalid = function() {
                    self.isInvalid(false);
                }
                self.resetLoginAttempts = function() {
                    self.loginAttempts(3);
                    console.log("Resetted login attempts!");
                }
            }


            //Bind authenticate popup to the VM
            var authenticatePopup = $("#log-in", Context);
            if( !authenticatePopup.length ) throw new Error("Our authenticate popup is missing!");
            AuthenticateUserVM = new AuthenticateUserViewModel();
            ko.applyBindings( AuthenticateUserVM, authenticatePopup[0] );
        }

    });


});