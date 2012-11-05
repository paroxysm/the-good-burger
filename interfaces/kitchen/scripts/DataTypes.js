/**
 * Created with JetBrains PhpStorm.
 * User: C.Kamau
 * Date: 10/31/12
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
/* This class is at the low level that makes up menu items */
function Ingredient() {
    this.count = null;
    this.calories = null;
    this.unitSize = null;
    this.expiringDate = null;
    this.name = null

    this.getCount = function() { return this.count; }
    this.getCalories = function() { return this.calories; }
    this.getUnitSize = function() { return this.unitSize; }
    this.getExpiringDate = function() { return this.expiringDate; }
    this.getName = function() { return this.name; }

    this.setCount = function(count) { this.count = count; return this; }
    this.setCalories = function(calories) { this.calories = calories;  return this;  }
    this.setUnitSize = function(unitsize) { this.unitSize = unitsize; return this; }
    this.setName = function(name) { this.name = name; return this; }
    this.setExpiringDate = function(date) { this.expiringDate = date; return this; }
}

/* These classes represent items that can be sold/displayed on the menu */
function MenuItem() {
    this.price = null;
    this.name = null;
    this.ingredients = new Array();

    this.getPrice = function() { return this.price; }
    this.getName = function() { return this.name; }

    this.setPrice = function(price) { this.price = price; return this; }
    this.setName = function(name) { this.name = name; return this; }

    /* How we add ingredients */
    this.addIngredient = function(ingredient) { this.ingredients.push( ingredient ); return this; }

    /* Remove an ingredient given it's name */
    this.removeIngredient = function(ingredientname ) {
        var foundIngredient = null; // return the ingredient object or a null if not found
        for(var i  in this.ingredients ) {
            if( this.ingredients[i].getName() === ingredientname ) {
                foundIngredient = this.ingredients[i];
                this.ingredients.splice(i, 1);
                break;
            }
        }
        return foundIngredient;
    }
}

function Menu() {
    this.name = null;
    this.items = new Array();

    this.getName = function() { return this.name; }
    this.setName = function(name) { this.name = name; return this; }

    this.addRecipe = function(item) { return this.items.push(item); return this; }
    this.removeRecipe = function(itemname) {
        var foundItem = null;
        for(var i in this.items) {
            if( this.items[i].getName() === itemname) {
                foundItem = itemname;
                this.items.splice(i,1);
                break;
            }
        }
        return foundItem;
    }
}

function Order() {
    this.orderNumber = null
    this.timeStamp = null;
    this.recipes = new Array();

    this.getOrderNumber = function() { return this.orderNumber; }
    this.getTimestamp = function() { return this.timeStamp; }
    this.setOrderNumber = function(number) { this.orderNumber = number; return this; }
    this.setTimestamp = function(time) { this.timeStamp = time; }
    /* How we add ingredients */
    this.addRecipe = function(menuitem) { this.ingredients.push( menuitem ); return this; }

    /* Remove an ingredient given it's name */
    this.removeRecipe = function(menuitemname ) {
        var founditem = null; // return the ingredient object or a null if not found
        for(var i  in this.recipes ) {
            if( this.recipes[i].getName() === menuitemname ) {
                founditem = this.recipes[i];
                this.recipes.splice(i, 1);
                break;
            }
        }
        return founditem;
    }
}

function InhouseOrder() {
    this.tablenumber = null;

    this.getTableNumber = function() { return this.tablenumber; }
    this.setTableNumber = function(number) { this.tablenumber = number; return this; }
}
InhouseOrder.prototype = Order;

function WebOrder() {
    this.customerName = null;
    this.phonenumer = null;

    this.getCustomerName = function() { return this.customerName; }
    this.getPhoneNumber = function() { return this.phonenumer; }

}


