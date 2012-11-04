/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/3/12
 * Time: 7:58 PM
 * To change this template use File | Settings | File Templates.
 */
var FOODCART = function() {

    var currentid = 1;
    var entries = new Array();

    function FoodCartEntry() {
        this.menuName = null;
        this.menuItemName = null;
        this.entryid = currentid;
        currentid++;

        this.getMenuName = function() { return this.menuName; }
        this.setMenuName = function(name) { this.menuName = name; return this; }

        this.getMenuItemName = function() { return this.menuItemName;  }
        this.setMenuItemName = function(name) { this.menuItemName = name; return this; }

        this.getId = function() { return this.entryid; }
    }

    return {
        addItem : function(menuname, menuitemname ) {
            var entry = new FoodCartEntry().setMenuName(menuname).setMenuItemName(menuitemname)
            entries.push(  entry);
            return entry.getId();
        },
        removeItem : function(id) {
            var foundEntry = null;
            for( var i in entries ) {
                if( entries[i].getId() == id ) {
                    foundEntry = entries[i];
                    entries.splice(i,1);
                    break;
                }
            }
            return foundEntry;
        },
        getItem : function(id) {
            var foundEntry = null;
            for( var i in entries ) {
                if( entries[i].getId() === id ) {
                    foundEntry = entries[i];
                    break;
                }
            }

        },
        getItemWithNames : function(menuname, menuitemname ) {
            var foundEntry = null;
            for(var i in entries ) {
                if( entries[i].getMenuName() === menuname  && entries[i].getMenuItemName() === menuitemname ) {
                    foundEntry = entries[i];
                    break;
                }
            }
            return foundEntry;
        },
        hasItem : function(id) {
            return this.getItem(id) !== null;
        },
        hasItemWithNames : function( menuname, menuitemname) {
            return this.getItemWithNames(menuname, menuitemname ) != null;
        },

        getMenus : function() { return entries; },
        clear : function() { entries.splice(0, entries.length); currentid = 1;}
    }
}();

/*
FOODCART.addItem("menu1", "item1");
FOODCART.addItem("menu1", "item2");
FOODCART.addItem("menu1", "item3");
FOODCART.addItem("menu2", "item1");
FOODCART.addItem("menu2", "item4");*/
