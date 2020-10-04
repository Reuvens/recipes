

function pAddRecipeLayout(div, i) {
	var html_to_append = "";
	html_to_append += "<div class=\"category\" id=\"category-" + i + "\"></div>";
	html_to_append += "<div class=\"recipe_name\" id=\"recipe_name-" + i + "\"></div>";
    html_to_append += "<div class=\"recipe_contributor\" id=\"recipe_origin-" + i + "\"></div>";
    html_to_append += "<div class=\"recipe_content\">";
    html_to_append += "<div class=\"recipe_ingredients\" id=\"recipe_ingredients-" + i + "\"></div>";
    html_to_append += "<div class=\"recipe_directions\" id=\"recipe_directions-" + i + "\"></div>";
    html_to_append += "</div>";
  	console.log(html_to_append);
	div.append(html_to_append);
}

function pAddRecipe(recipe, div, i) {
	$("#category-" + i).html(recipe.category);
	$("#recipe_name-" + i).html("<h1>" + recipe.name + "</h1>");
	$("#recipe_origin-" + i).html(recipe.origin);
	$("#recipe_ingredients-" + i).html("<p><strong>מצרכים </strong></p>" + recipe.ingredients);
	$("#recipe_directions-" + i).html("<p>הוראות הכנה: </p>" + recipe.directions);
	// $("#recipe_directions-" + i).html("<p><strong>הוראות הכנה: </strong></p>" + recipe.directions);
}

function showPrintLayoutRecipes(recipes_dict) {
	var div = $("#recipes");
	
	for (category in recipes_dict) {
	  var recipes_for_category = recipes_dict[category];
	  for (item in recipes_for_category) {
	    var recipe = recipes_for_category[item];
		var ts = recipe.timestamp;
	  	pAddRecipeLayout(div, ts);
		pAddRecipe(recipe, div, ts);
	  }
	}	
}


$(document).ready(function () {
	recipes_dict = loadRecipes();
	// var recipes_dict = loadRecipes();

	showPrintLayoutRecipes(recipes_dict);
  	console.log("Hi");
});
