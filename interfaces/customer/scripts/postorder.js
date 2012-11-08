/**
 * Created with JetBrains PhpStorm.
 * User: CMKAMAU
 * Date: 11/6/12
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */
( function($) {
    var MainContext = null; //Stores the page ( div[date-role='page'] when the page is first created

    //cache the MainContext when post order page is first created
    PECR.registerCallback("post-order", "pagecreate", function(evt) {
        MainContext = $(evt.target);
    })
    //functionality for displaying the confirmed ordered items once they have placed the order
    PECR.registerCallback("post-order", "pagebeforeshow", displayConfirmedOrder);


    /* Called to create markup for showing the confirmed ordered items in a 'ul' with an id of 'confirmed-cart' */
    function displayConfirmedOrder( ) {
        console.log("displaying confirmed cart!");
        //grab the ul that we'll populate w/ our food cart items
        var confirmedcardUl = $("#confirmed-cart", MainContext );
        if( confirmedcardUl.length == 0 ) throw new Error("displayConfirmedOrder::confirmed-cart ul element is missing!");
        //clear out all elements first
        confirmedcardUl.empty();

        var orderedRecipes = FOODCART.getRecipes();
        var totalPrice = 0;
        for( var i in orderedRecipes ) {
            var recipe = orderedRecipes[i].getRecipe();
            //update total
            totalPrice += recipe.getPrice();
            //create markup for the recipes
            var liElement = $(document.createElement('li') );
            var priceSpan = $(document.createElement('li') );
            liElement.text( recipe.getName() );
            priceSpan.text( recipe.getPrice() );
            //prices appear on the right of the recipe name
            priceSpan.addClass("ui-li-aside foodcartprice");
            //add to to the listing
            confirmedcardUl.append( liElement.append( priceSpan) );
        }
        //add the total price to the end of the list
        var totalLiElement = $(document.createElement('li') );
        var totalSpanElement = $(document.createElement('span') )
        totalLiElement.text("Total:");
        totalSpanElement.addClass('ui-li-aside foodcartprice');
        totalSpanElement.text( totalPrice.toFixed(2) );
        confirmedcardUl.append( totalLiElement.append(totalSpanElement) );
        //make jqm apply enhancement
        confirmedcardUl.listview('refresh');
    }

})(jQuery);