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
function Recipe() {
    this.price = null;
    this.name = null;
    this.ingredients = new Array();
    this.description = null;

    this.getPrice = function() { return this.price; }
    this.getName = function() { return this.name; }

    this.setPrice = function(price) { this.price = price; return this; }
    this.setName = function(name) { this.name = name; return this; }

    this.getDescription = function() { return this.description; }
    this.setDescription = function(descr ) { this.description = descr; return this; }

    /* How we add ingredients */
    this.addIngredient = function(ingredient) { this.ingredients.push( ingredient ); return this; }

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
        var totalCalories = 0;
        for(var i in this.ingredients ) {
            totalCalories += this.ingredients[i].getCalories();
        }
        return totalCalories;
    }

    this.listIngredients = function() { return this.ingredients; }
}

function Menu() {
    this.name = null;
//    this.comprehensiveIngredients = new Array();
    this.recipes = new Array();

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

//    this.listIngredients  = function() { return this.ingredients; }
}

var ORDER = function() {
    var recipes = new Array();
    return {
        addRecipe : function(recipe) { recipes.push( recipe ); return this; },
        removeRecipe : function(recipeName) {
            var foundRecipe = null; // return the ingredient object or a null if not found
            for(var i  in recipes ) {
                if( recipes[i].getName() === recipeName ) {
                    foundRecipe = recipes[i];
                    recipes.splice(i, 1);
                    break;
                }
            }
            return foundRecipe;
        },
        clear : function() { recipes.splice(0, recipes.length); }
    }
}();


