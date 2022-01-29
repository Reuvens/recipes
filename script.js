var recipes_dict = null;


function showRecipe(recipe_ts) {

  for (category in recipes_dict) {
    var recipes_for_category = recipes_dict[category];
    for (item in recipes_for_category) {
      var recipe = recipes_for_category[item];
      if (recipe.timestamp == recipe_ts) {
        $("#r_name").html(recipe.name);
        $("#r_ingredients").html(recipe.ingredients);
        $("#r_directions").html(recipe.directions);
        $("#r_origin").html(recipe.origin);
      }
    }
  }
}

function showRecipeList(recipes_dict) {
  for (category in recipes_dict) {
    var category_html = "<li><span class='caret'>" + category + "</span>";
    category_html += "<ul class='nested'>";
    for (item in recipes_dict[category]) {
		var recipe_ts = recipes_dict[category][item].timestamp;
      var recipe_link = "<li id='" + recipe_ts + "'><a href=#?recipe_id=" + recipe_ts + " onclick='showRecipe(\"" + recipe_ts + "\")'>" + recipes_dict[category][item].name + "</a></li>";
	  
      category_html += recipe_link;
    }
    category_html += "</ul></li>"
    $('#recipe_list').append(category_html);

  }
}

function setupTogglers() {
  	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function() {
	    this.parentElement.querySelector(".nested").classList.toggle("active");
	    this.classList.toggle("caret-down");
	  });
	}	
}

function getRecipeIdFromURL() {
	var str = window.location.href;
	str = str.substring(str.indexOf("#") + 1);
	var urlParams = new URLSearchParams(str);
	console.log(urlParams);
	var recipe_id = urlParams.get('recipe_id');
	if (recipe_id == null) { 
		recipe_id = 1601313407;  // Kobe recipe timestamp: 9/26/2020 16:46:57 in epoc
	}
	return recipe_id;
}

$(document).ready(function () {
	var url = "https://sheets.googleapis.com/v4/spreadsheets/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/values/Form%20Responses%201?alt=json&key=AIzaSyCLfNf36x5vVb3l19oKSw5RpDsKPwCoMnw"
	$.getJSON(url, function(data) {
		recipes_dict = loadRecipes(data);
		showRecipeList(recipes_dict);
		var recipe_id = getRecipeIdFromURL();
		showRecipe(recipe_id);  
 		setupTogglers();
		
	});
});
