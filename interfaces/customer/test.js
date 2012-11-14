/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/1/12
 * Time: 10:06 PM
 * To change this template use File | Settings | File Templates.
 */

test( "test Menu Class", function() {
    var menu = new Menu();

    //create fake recipe
    var fakeRecipe = new Recipe().setName("fake-rep-1").setID(1);
    var fakeRecipe2 = new Recipe().setName("fake-rep-2").setID(2);
    menu.addRecipe(fakeRecipe).addRecipe(fakeRecipe2);
    //Test find && add recipe

    ok( menu.findRecipe("fake-rep-1") && menu.findRecipe("fake-rep-2"), "menu.findRecipe passed!");
    //Test remove recipe
    menu.removeRecipe("fake-rep-1");
    menu.removeRecipe("fake-rep0-2");
    ok( menu.getRecipes().length == 0, "menu.removeRecipe passed!");

});

test("test Recipe Class", function() {

    var recipe = new Recipe();

    var ingredient1 = new Ingredient().setName("burger").setCalories(250);
    var ingredient2 = new Ingredient().setName("cheese").setCalories(200);
    var ingredient3 = new Ingredient().setName("lettuce").setCalories(60);
    var ingredient4 = new Ingredient().setName("buns").setCalories(200);
    recipe.addIngredient(ingredient1).addIngredient(ingredient2).addIngredient(ingredient3).addIngredient(ingredient4);
    ok( recipe.listIngredients().length == 4, "recipe.addIngredient passed!");
    ok( recipe.getCalories() == 710, "recipe.getCalories passed!");
    ok( recipe.isRefillable() == false, "recipe.isRefillable passed!");
});

test("test Order Class", function() {
    var newOrder = new Order();
    var recipe = new Recipe();
    var recipe2 = new Recipe();
    var recipe3 = new Recipe();
    newOrder.add
});