/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/14/12
 * Time: 2:47 PM
 * To change this template use File | Settings | File Templates.
 */


function HomeViewModel($) {
    var self = this;
    var HOMEPAGE;
    var AUTHENTICATE_POPUP;
    var RESET_TRIES_TIME = 60000;

    //Cache our 'HOMEPAGE' variable
    PECR.registerCallback("home", "pagecreate", function(event) {
        HOMEPAGE = $(event.target);
        AUTHENTICATE_POPUP = $("#authenticate", HOMEPAGE );
        if( !AUTHENTICATE_POPUP.length ) throw new Error("#authenticate popup is missing!");

        //Make sure they can't navigate away from the popup by binding popupafterclose to re-open the popup
        AUTHENTICATE_POPUP.bind("popupafterclose", function() {
            if( !self.authenticated )
            AUTHENTICATE_POPUP.popup('open');
        });

        //Apply ko bindings to the page
        ko.applyBindings(self, HOMEPAGE[0] );
    });

    //Open the login popup when we show the home page
    PECR.registerCallback("home","pageshow", function(event) {
        if( !self.authenticated )
            AUTHENTICATE_POPUP.popup('open');
    });

//    Authentication VM stuff, related to authenticating the waiter into the system.
    var MASTER_USER = "master";
    var MASTER_PASSWORD = "winning";

    self.username = ko.observable('');
    self.password = ko.observable('');
    self.isInvalid = ko.observable(false);
    self.authenticated = false;
    self.loginAttempts = ko.observable(3);
    self.countDownTimer = ko.observable(RESET_TRIES_TIME/1000); //in seconds
    self.countDownText = ko.computed( function() {
        return self.countDownTimer()+"secs";
    })
    self.countDownEvent = null; //stores the event id for the count down timer

    self.authenticate = function() {
        if( self.username() != MASTER_USER || self.password() != MASTER_PASSWORD )
        {
            self.isInvalid(true);
            window.setTimeout( self.resetIsInvalid, 3000);
            self.loginAttempts( self.loginAttempts() - 1);
            if( !self.loginAttempts() ) {
                console.log("You're out of tries!");
                window.setTimeout( self.resetLoginAttempts, RESET_TRIES_TIME); //reset attempts in 3mins
                self.countDownEvent = window.setInterval( self.countdown, 1000); //decrement timer by 1 sec
            }
        }
        else {
            $.mobile.changePage( $("#table-view") );
            self.authenticated = true;
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
        self.countDownTimer(RESET_TRIES_TIME/1000); //reset count down timer
        console.log("Resetted login attempts!");
    }
    self.countdown = function() {
        var value = self.countDownTimer() -1;
        if( value == 0 )
            window.clearInterval( self.countDownEvent ); //clear the event
        else
            self.countDownTimer( self.countDownTimer() -1 );
    }
};
//Insantiate our HomeViewModel
new HomeViewModel(jQuery);