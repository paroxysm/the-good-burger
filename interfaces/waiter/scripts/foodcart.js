/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/3/12
 * Time: 7:58 PM
 * To change this template use File | Settings | File Templates.
 */
var FOODCART = function() {

    var currentid = 1;
    var recipes = new Array();

    function FoodCartEntry() {
        this.recipe = null;
        this.entryid = currentid;
        currentid++;

        this.getRecipe = function() { return this.recipe; }
        this.setRecipe = function(recipe) { this.recipe = recipe; return this; }

        this.getId = function() { return this.entryid; }
    }

    return {

        addRecipe : function (recipe ) {
            var record = new FoodCartEntry().setRecipe( recipe);
            recipes.push ( record );
            return record.getId();
        },
        removeRecipe : function(id) {
            var foundrecipe = null;
            for( var i in recipes ) {
                if( recipes[i].getId() == id ) {
                    foundEntry = recipes[i];
                    recipes.splice(i,1);
                    break;
                }
            }
            return foundrecipe;
        },
        getRecipe : function(id) {
            var foundEntry = null;
            for( var i in recipes ) {
                if( recipes[i].getId() === id ) {
                    foundEntry = recipes[i];
                    break;
                }
            }

        },
        hasRecipe : function(id) {
            return this.getRecipe(id) !== null;
        },

        getRecipes : function() { return recipes; },
        clear : function() { recipes.splice(0, recipes.length); currentid = 1;}
    }
}();

/*
FOODCART.addItem("menu1", "item1");
FOODCART.addItem("menu1", "item2");
FOODCART.addItem("menu1", "item3");
FOODCART.addItem("menu2", "item1");
FOODCART.addItem("menu2", "item4");*/
