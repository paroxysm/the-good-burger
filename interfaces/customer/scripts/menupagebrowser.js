/**
 * Created with JetBrains PhpStorm.
 * User: CMK
 * Date: 11/3/12
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
( function($) {
    /* A jQuery Object that presents the our menu div w/ data-role='page' */
    var MenuPageContext = null;

    /* Listen for pagecreate to initialize our dynamic menus */
    PECR.registerCallback("menu", "pagecreate", initialize);

    var currentVisibleMenu = null;
    var currentVisibleRecipe = null;

    /* Initializes controls(ie, binding events) for this page */
    function initialize(evt, page) {
        //Set our page context
        MenuPageContext = $(evt.target );
        populateMenuNavList(evt, page);

        //Add functionality for the clear food cart button at the footer section
        var clearFoodCartPopup = $("#confirm-cart-clear", MenuPageContext );
        if( !clearFoodCartPopup.length ) throw new Error("[STRUCTURE ERROR] initialize 'clear food cart' popup object is missing!");
        //Get the food cart button and add tap functionality
        var clearcartButton = $("#clear-cart", clearFoodCartPopup );
        if( !clearcartButton.length ) throw new Error("[STRUCTURE ERROR] initialize 'clear-cart' button is missing from the clear food cart popup!");
        clearcartButton.unbind('tap').bind('tap', function() {
            //simply clear the food cart and refresh the food cart listing
            FOODCART.clear();
            refreshFoodCart( MenuPageContext );
            console.log("[DEBUG] clearing food cart");
        })

    }

    /* This is responsible for creating the menu markup at the top of the toolbar */
    function populateMenuNavList(evt, page ) {
        if( !MenuPageContext.length ) throw new Error("populateMenuNavList arg#1(evt) is invalid");

        //Get the menu tool bar
        var menuNavToolbar = $('#menu-nav-list', MenuPageContext);
        if( !menuNavToolbar.length ) throw new Error("populateMenuNavList #menu-nav-list is non existent!");
        //our li and anchor template objects that we insert into the nav toolbar
        var liTemplate = $(document.createElement('li') );
        var anchorTemplate = $(document.createElement('a') );

        //retrieve our menus from menumgr
        var fetchedMenus = MenuMgr.getMenus();
        if( fetchedMenus.length == 0 )
            console.log("populateMenuNavList, we have no menus to display!");
        //clear list of menu items first
        menuNavToolbar.empty();

        //for each menu object, create a toolbar link for it
        for(var i in fetchedMenus) {
            var currentIterable = fetchedMenus[i];
            var liClone = liTemplate.clone();
            var anchorClone = anchorTemplate.clone();
            //set the toolbar text to the menu name
            anchorClone.text(currentIterable.getName() );
            anchorClone.attr('href', '#');
            //bind 'tap' jqm handler
            anchorClone.unbind('tap').bind('tap', onMenuToolbarClick);
            //append anchor to li, and li to ul
            liClone.append(anchorClone);
            menuNavToolbar.append(liClone);
            //if we aren't already viewing a menu, set the first menu as the current visible one
            if( currentVisibleMenu === null ) {
                showMenuDOM( currentIterable.getName(), MenuPageContext );
                //add navbar styling
                anchorClone.addClass("ui-btn-active ui-state-persist");
            }
        }
        /* Handler for when one of the menus at the top is clicked, it methods to show that menu */
        function onMenuToolbarClick(evt) {
            //retrieve the clicked anchor object, with the context being our 'ul' toolbar
            var clickedAnchor = $(evt.target, menuNavToolbar);
            console.log("MenuToolbar, menu '%s' has been clicked", clickedAnchor.length ? clickedAnchor.text() : "unknown");
            //remove all style highlighting
            menuNavToolbar.find('.ui-btn-active').removeClass("ui-btn-active ui-state-persist");
            //clear all our currently selected items

            showMenuDOM(clickedAnchor.text(), MenuPageContext);
            showFoodCart( MenuPageContext );
        }
    }

    /* Responsible for displaying the specified menu, from the recipes to the recipe content
    *   Params :
    *       menuName - the name of the menu to show
    *       pageContext - object that contains the template elements
    *       Returns : nothing
    */
    function showMenuDOM(menuname, pageContext) {
        //we are already visible
        if( currentVisibleMenu === menuname )
            return;
        //Always clear the current selected item when showing a new menu
        currentVisibleRecipe = null;
        //get the menu object
        var menuObject = MenuMgr.findMenu(menuname);
        if( !menuObject ) throw new Error("populateMenuDOM, a menu name of '%s' was not found!",menuname);

        // if we have a currently visible menu, remove & hide it.
        if( currentVisibleMenu ) {
            //find it's menuview and delete it
            var oldmenuView = $("[menu-name=\""+currentVisibleMenu+"\"]", pageContext);
            if( !oldmenuView.length )
                throw new Error("populateMenuDOM, oh o, oldmenuView wasn't found yet currentVisibleMenu is non null");
            else {
                oldmenuView.remove(); //gc it
                currentVisibleMenu = null;
            }
        }
        currentVisibleMenu = menuname;
        //check to see if we have the menu DOM, otherwise create it via 'populateMenuDOM'
        var menuToshow = $("[menu-name=\""+menuname+"\"]", pageContext);
        if( !menuToshow.length )
            menuToshow  = populateMenuDOM(menuObject, pageContext );

        //make the new menu visible
        menuToshow.show();
    }

    /* Responsible for creating the markup for the menu object specified.
        Params :
            menuObject - the menu object to create markup for
            pageContext - where to search for the template elements( for performance improvement )
        Returns : a markup element as a jQuery collection.
     */
    function populateMenuDOM(menuObject, pageContext) {
        //get our menu template object
        var menuTemplate = $('.menu-template', pageContext);
        if( !menuTemplate.length ) throw new Error("populateMenuDOM, our .menu-template object is non existent!");

        //now we create a clone of our template
        var menuView = menuTemplate.clone();
        //remove .menu-template attr
        menuView.removeClass('menu-template');
        //add our custom attribute menu-name to track it
        menuView.attr('menu-name', menuObject.getName() );
        //populate our menu list
        populateMenuItemNavList(menuView, menuObject );
        //place it right after our header element
        pageContext.find('header').after( menuView );
        //make jqm enhance it
        menuView.trigger('create');

        return menuView;
    }
    /* Responsible for creating the markup to list the recipes for the menu object
    *   Params:
    *       context - Where to search for the required markup
    *       menuObject - the menu object to list recipes for.
    *   Returns : nothing
    */
    function populateMenuItemNavList(context, menuObject ) {
        //our li and a template objects that we insert into the nav list
        var liTemplate = $(document.createElement('li') );
        var anchorTemplate = $(document.createElement('a') );

        //retrieve the ul object of type 'menuitem-nav'
        var itemList = $('.menuitem-nav', context);
        if( !itemList || !itemList.is('ul' ) ) throw new Error("populateMenuNavlist, itemList object is nonexistent or isn't a ul element!");
        //first clear the list
        itemList.empty();
        //for menu item, we create a list entry for it and bind the needed events
        var menuItems = menuObject.getRecipes();
        for( var i = 0; i < menuItems.length; ++i) {
            var liClone = liTemplate.clone();
            var anchorClone = anchorTemplate.clone();
            anchorClone.text( menuItems[i].getName() );
            //If we have no previously selected object, select the first menu item to be populated and apply 'selected' styles
            if( i == 0 && currentVisibleRecipe == null ) {
                anchorClone.addClass('ui-btn-active').addClass('ui-state-persist');
                showRecipe(menuItems[i].getName(), context);
            }
            anchorClone.attr('href', '#');
            //bind on 'tap' jqm evt handler
            anchorClone.unbind('tap').bind('tap', onNavItemClick);
            //add the anchor element to the li
            liClone.append(anchorClone );
            //add li to ul
            itemList.append(liClone);
        }

        //Inner on 'tap' handler
        function onNavItemClick(evt) {
            var anchorElement = $(evt.target);
            if( !anchorElement.is('a') ) throw new Error("onNavItemClick, evt.target is not an anchor object!");
            //retrieve the menu item name of the clicked anchor stored in it's text node
            var clickedMenuItemName = anchorElement.text();
            //first find the current selected item and clear it's 'selected' styles
            itemList.find('a.ui-btn-active').removeClass('ui-btn-active').removeClass('ui-state-persist');
            //apply 'selected' style
            anchorElement.addClass('ui-btn-active').addClass('ui-state-persist');
            //show/create menu item view for the clicked menu item
            showRecipe( clickedMenuItemName, context);

        }
    }

    /* Responsible for showing the content of the specified recipe name
    *  Params:
    *       recipename - the name of the recipe to show
    *       context - where to search for template elements
*       Returns: nothing
*       */
    function showRecipe(recipename, context) {
        if( currentVisibleRecipe === recipename ) return;

        //get the menu item object using the currentVisibleMenu
        var menuItem = MenuMgr.findMenu(currentVisibleMenu).findRecipe(recipename);
        if( !menuItem ) throw new Error("showRecipe, clicked menu item could not be found!");

        //get our canvas object
        var menuitemcanvas = $('.menuitem-canvas', context);
        if( !menuitemcanvas.length ) throw new Error("showMenuItem, menuitemcanvas is non existent!");

        //check to see if we already have the dom created
        var menucontent = $("[menuitem-name=\""+recipename+"\"]", menuitemcanvas);
        if( !menucontent.length )
            menucontent = populateRecipeContent(menuitemcanvas, menuItem );
        //check to see if we are already displaying another menu item
        if( currentVisibleRecipe ) {
            var currentvieweditem = $("[menuitem-name=\""+currentVisibleRecipe+"\"]", menuitemcanvas);
            if(!currentvieweditem.length )
                throw new Error("showMenuItem, oh o, currentviewditem is non existent yet currentVisibleMenuItem is non null");
            else
                currentvieweditem.remove();
        }
        //now show the new menu item
        menuitemcanvas.append( menucontent );
        menucontent.show();
        menucontent.trigger("create");
        currentVisibleRecipe = recipename;

        /************** INNER FUNCTIONS *****************************/

        /* Called to create the mark up for the specified menuitem object
        *   Params :
        *       context - where to search for template elements
        *       recipe - the recipe to show information about
    *       Returns :
    *           a jQuery collection contained a markup element that has been formatted and has data injected to. */
        function populateRecipeContent(context, recipe) {
            var menuitem_content_template = $('.menuitem-content-template', context );
            if( !menuitem_content_template.length ) throw new Error("populateMenuItemContent, menuitem_content_template is non existent!");

            //create a clone
            var contentClone = menuitem_content_template.clone();
            //remove template class
            contentClone.removeClass("menuitem-content-template");
            //mark it w/ an attribute of our menu items name
            contentClone.attr('menuitem-name', recipe.getName() );
            //set the banner
            var banner = $('.menuitem-banner', contentClone);
            banner.text(recipe.getName() );
            //set the image
            var imgSpace = $('.menuitem-image', contentClone);
            imgSpace.addClass("loading");
//            imgSpace.css("content :\""+recipe.getName()+"\"");
            //set the description
            var descriptionSpace = $('.menuitem-description', contentClone);
            descriptionSpace.text("This is a description for menu item "+recipe.getName() );
            //add the extra configurable options
            var controlsSpace = $('.menuitem-controls', contentClone );
            //bind our add to cart button
            var addToCartButton = $('.add-to-cart', contentClone );
            addToCartButton.unbind('tap').bind('tap', onAddtoCartClick );

            //grab recipe's ingredients and create a checkbox that's already checked for it
            //Use 3 column grid to display the ingredient's
            var GRID_COLUMNS = 3;
            var ingredients = recipe.listIngredients();
            var gridBlocks = [ "a", "b", "c" ];
            for(var i in ingredients ) {
                var blockDivElement = $( document.createElement('div') ); //div object
                var labelElement = $( document.createElement('label') );
                var checkBoxElement = $( document.createElement('input') );
                checkBoxElement.attr('type','checkbox');
                //Apply the appropriate block type based on the index
                blockDivElement.addClass("ui-block-"+gridBlocks[i % GRID_COLUMNS]);
                //ingredient name as label text
                labelElement.text( ingredients[i].getName() );
                //make the checkbox checked
                checkBoxElement.attr('checked',true);
                //use 'ingredient-name' attribute for future retrieval
                checkBoxElement.attr('ingredient-name', ingredients[i].getName() );
                //Now append the elements to each other and to controlspace div
                controlsSpace.append( blockDivElement.append(labelElement.append( checkBoxElement) ) );

            }

//        controlsSpace.trigger("create");
            return contentClone;
//

            function onAddtoCartClick(evt) {
                var clicked = $( evt.target, contentClone );
                if( !clicked.length ) throw new Error("onAddToCartClick with non existent evt.target!");
                //Create a new recipe object and add the checked ingredients by using the clicked recipe
                var oldRecipe = MenuMgr.findMenu( currentVisibleMenu ).findRecipe( currentVisibleRecipe );
                if( !oldRecipe ) throw new Error("onAddtoCartClick oldRecipe of name "+currentVisibleRecipe+" was not found!");
                var newRecipe = new Recipe().setName( oldRecipe.getName()).setPrice( oldRecipe.getPrice() );
                var checkedIngredients = $('input:checked', controlsSpace );
                checkedIngredients.each( function(index) {
                    var ingredientName = $(this).attr('ingredient-name'); //we've selected input type, but we're interested parent label
                    if( !ingredientName.length ) throw new Error("onAddToCart ingredientName is nonexistent!");
                    var ingredient = oldRecipe.findIngredient( ingredientName );
                    if( !ingredient ) throw new Error("onAddToCart ingredient("+this.text()+") was not found!");
                    newRecipe.addIngredient( ingredient );
                });
                //Now add the new recipe to the food cart
                FOODCART.addRecipe( newRecipe );
                //refresh the food cart
                refreshFoodCart( MenuPageContext );
            }
        }
    }


    /* Update the food cart whenever we're about show our menu page */
    PECR.registerCallback("menu", "pagebeforeshow", showFoodCart);

    function showFoodCart(evt) {
        refreshFoodCart( MenuPageContext );
//        console.log("Food cart is being shown!");
    }
    function refreshFoodCart(context ) {
        var ulElement = $('.foodcart ul',context);
        var listDivider = $('li[data-role="list-divider"]', context);
        //clear all elements below it.
        listDivider.nextAll().remove();

        //populate the food list w/ entries from our food cart
        var recipes = FOODCART.getRecipes();
        for( var i in recipes ) {
            var recipe = recipes[i].getRecipe();
            var liElement = $( document.createElement('li') );

            //inject the price into span element
            var spanPriceElement = $( document.createElement('span') );
            spanPriceElement.text( recipe.getPrice() );

            //add markup for price element
            spanPriceElement.addClass("ui-li-aside foodcartprice");
            // use the menu item name as the text for li
            liElement.text( recipe.getName() );
            //create the delete graphic button for it
            var removeControl = $( document.createElement('span') );
            //add the foodcart-id attribute
            removeControl.attr('foodcart-id', recipes[i].getId() );
            removeControl.addClass('removecontrol');

            //add tap handler
            removeControl.unbind('tap').bind('tap', onRemove);

            liElement.append(removeControl);
            //add the price
            liElement.append( spanPriceElement );
            //add it behind the list divider
            listDivider.after( liElement );
        }
        //refresh the food cart
        ulElement.listview('refresh');

        //tap handler for clicking the 'X' button
        function onRemove(evt) {
            var clickedEntry = $(evt.target, ulElement);
            var clickedId = clickedEntry.attr('foodcart-id');
            // remove from the food cart
            FOODCART.removeRecipe(clickedId);
            //remove li parent
            clickedEntry.parent().remove();
            //refresh the food cart visually
//            ulElement.trigger('create');
            ulElement.listview('refresh');
        }
    }


    /* Used to list the food cart entries when on the confirm order screen */
    PECR.registerCallback("confirm-order", "pagebeforeshow", function(evt, obj) {
        var foodcartdivider =  $('#orderconfirmation-listdivider', evt.target);
        var foodcartListing = foodcartdivider.parent();
        var totalPrice = 0;
        //remove all entries and re-populate them
        foodcartdivider.nextAll().remove();
        //populate the list of our food cart entries
        var foodcartRecipes = FOODCART.getRecipes();
        for( var i in foodcartRecipes ) {
            var recipe = foodcartRecipes[i].getRecipe();
            if( !recipe ) continue; //skip non-existant entries

            var liElement = $(document.createElement('li') );
            var spanElement = $(document.createElement('span') );

            liElement.text( recipe.getName() );
            spanElement.text( recipe.getPrice() );
            totalPrice += recipe.getPrice();
            spanElement.addClass("ui-li-aside foodcartprice");
            liElement.append( spanElement );
            foodcartdivider.after( liElement );
        }
        //create li for total amount
        var liTotal = $(document.createElement('li') );
        var spanTotalPrice = $(document.createElement('span') );
        spanTotalPrice.addClass("ui-li-aside foodcartprice");
        //2 decimal places max
        totalPrice.toFixed(2);
        spanTotalPrice.text( totalPrice );
        liTotal.text( "Total :");
        liTotal.append( spanTotalPrice );
        //make it a list divider
        liTotal.attr('data-role','list-divider');
        //append total element at the bottom of the ul
        foodcartListing.append( liTotal );
        //force jqm to enhance it
        foodcartListing.listview('refresh');
    });
})(jQuery);