/**
 * Created with JetBrains PhpStorm.
 * User: C.Kamau
 * Date: 10/31/12
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
/* This class is at the low level that makes up menu items */
function Ingredient( asJSON ) {

    this.count = null;
    this.id = null;
    this.calories = null;
    this.unitSize = null;
    this.name = null

    /* Handle incoming data from json */
    if( asJSON ) {
        this.count = asJSON.count;
        this.calories = asJSON.calories;
        this.unitSize = asJSON.unitSize;
        this.name = asJSON.name;
        this.id = asJSON.id;
//        this.expiringDate = asJSON.expiringDate
    }

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

    this.getID = function() { return this.id; }
    this.setID = function(id) { this.id = id; return this; }
}

/* These classes represent items that can be sold/displayed on the menu */
function Recipe( asJSON ) {
    this.price = null;
    this.name = null;
    this.ingredients = new Array();
    this.description = null;
    this.refillable = null;
    this.id = null;
    this.picture = null;

    /* Handle data coming in from JSON */
    if( asJSON ) {
        this.price = asJSON.price;
        this.name = asJSON.name;
        this.description = asJSON.description;
        this.refillable = asJSON.refillable;
        this.id = asJSON.id;
        this.picture = asJSON.picture;

        for(var i in asJSON.ingredients ) {
            this.ingredients.push( new Ingredient( asJSON.ingredients[i] ) );
        }
    }

    this.getID = function() { return this.id; }
    this.setID = function(id) { this.id = id; }

    this.getPrice = function() { return this.price; }
    this.getName = function() { return this.name; }

    this.setPrice = function(price) { this.price = price; return this; }
    this.setName = function(name) { this.name = name; return this; }

    this.getDescription = function() { return this.description; }
    this.setDescription = function(descr ) { this.description = descr; return this; }

    /* How we add ingredients */
    this.addIngredient = function(ingredient) {
        this.ingredients.push( ingredient ); return this;
    }

    /* Remove an ingredient given it's name */
    this.removeIngredient = function(ingredientname ) {
        var foundIngredient = null; // return the ingredient object or a null if not found
        for(var i  in this.ingredients ) {
            if( this.ingredients[i].getName() == ingredientname ) {
                foundIngredient = this.ingredients[i];
                this.ingredients.splice(i, 1);
                break;
            }
        }
        return foundIngredient;
    }

    this.findIngredient = function( ingredientname ) {
        var foundIngredient = null;
        for( var i in this.ingredients ) {
            if( this.ingredients[i].getName() == ingredientname ) {
                foundIngredient = this.ingredients[i];
                break;
            }
        }
        return foundIngredient;
    }

    this.getCalories = function() {
        var totalCalories = 0.0;
        for(var i in this.ingredients ) {
            totalCalories += parseFloat( this.ingredients[i].getCalories() );
        }
        return totalCalories;
    }

    this.isRefillable = function() { return this.refillable == 'true'; }
    this.setRefillable = function() { this.refillable = 'true'; return this; }
    this.setNotRefillable = function() { this.refillable = 'false'; return this; }

    this.listIngredients = function() { return this.ingredients; }
}

function Menu(asJSON) {
    this.name = null;
    this.recipes = new Array();

    /* Handle menus coming in JSON form */
    if( asJSON ) {
        this.name = asJSON.name;
        if( asJSON.recipes ) {
            for( var i in asJSON.recipes ) {
                this.recipes.push( new Recipe( asJSON.recipes[i] ) );
            }
        }
        else
            console.warn("No recipes were loaded for menu %s", this.name);
    }

    this.getName = function() { return this.name; }
    this.setName = function(name) { this.name = name; return this; }

    /* Methods for adding or removing menu items */
    this.addRecipe = function(recipe) { this.recipes.push(recipe); return this; }
    this.removeRecipe = function(recipename) {
        var foundItem = null;
        for( var i in this.recipes ) {
            if( this.recipes[i].getName() === recipename ) {
                foundItem = this.recipes[i];
                this.recipes.splice( i, 1);
                break;
            }
        }
        return foundItem;
    }

    this.getRecipes = function() { return this.recipes; }

    this.findRecipe = function(menuitemname) {
        var foundItem = null;
        for( var i in this.recipes ) {
            if( this.recipes[i].getName() === menuitemname ) {
                foundItem = this.recipes[i];
                break;
            }
        }
        return foundItem;
    }

}

function Order() {
    this.id = null;
    this.recipes = new Array();
    this.total = 0;
    this.coupon = false;
    this.status = null;
    this.isToGo = false;

    this.getID = function() { return this.id; }
    this.setID = function(id) { this.id = id; return this; }
    this.addRecipe = function(recipe) { this.recipes.push( recipe ); return this; }
    this.removeRecipe =  function(recipeName) {
        var foundRecipe = null; // return the ingredient object or a null if not found
        for(var i  in recipes ) {
            if( this.recipes[i].getName() === recipeName ) {
                foundRecipe = this.recipes[i];
                this.recipes.splice(i, 1);
                break;
            }
        }
        return foundRecipe;
    }
    this.clear = function() { this.recipes.splice(0, this.recipes.length); }
    this.addCoupon = function() { this.coupon = true }
    this.removeCoupon = function() { this.coupon = false; }
    this.hasCoupon = function() { return this.coupon; }
    this.getTotal = function() { return this.total; }
    this.setTotal = function(total) { this.total = total; }

    this.getRecipes = function() { return this.recipes; }

    this.getStatus = function() { return this.status; }
    this.setStatus = function(status) { this.status = status; }

    this.isPending = function() { return this.status == 'placed'; }
    this.isPaid = function() { return this.status == 'paid'; }
    this.isReady = function() { return this.status == 'ready'; }

    this.isPickup = function() { return this.isToGo; }
    this.setIsPickup = function() { this.isToGo = true; }

};


