// Instructions taken from:
// https://gist.github.com/terrywbrady/a03b25fe42959b304b1e
// published page: https://docs.google.com/spreadsheets/d/e/2PACX-1vT3FLCR7TAN-0JBpuVEW0MXtCA6TAWdBjEKKXjfzqvFhK259ymNKyHxh3Xc2D5P5dGY5HEfeprZDWGY/pubhtml
// rss feed: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values
// JSON feed: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values?alt=json-in-script
// JS do data: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values?alt=json-in-script&callback=doData

class Recipe {
  constructor(id, name, categrory, ingredients, directions, origin) {
	this.id = id;
    this.name = name;
    this.categrory = categrory;
    this.ingredients = ingredients;
    this.directions = directions;
    this.origin = origin;
  }
}

var spData = null;
function doData(json) {
  spData = json.feed.entry;
}

function loadRecipes() {
  var data = spData;
  var recipes_dict = {};
  var recipe_id = 1;

  // data per column:
  // 0. timestamp (ignored)
  // 1. name
  // 2. category
  // 3. ingredients 
  // 4. directions
  // 5. where this recipe came from
  var numColumns = 6;
  // skipping row 1 which is the titles
  for (var rowStart = numColumns; rowStart < data.length; rowStart += numColumns) {
    var name = data[rowStart + 1]["gs$cell"]["$t"];
    var categrory = data[rowStart + 2]["gs$cell"]["$t"];
    var ingredients = data[rowStart + 3]["gs$cell"]["$t"];
    var directions = data[rowStart + 4]["gs$cell"]["$t"];
    var recipeOrigin = data[rowStart + 5]["gs$cell"]["$t"];

    if (! recipes_dict[categrory]) {
      recipes_dict[categrory] = [];
    }
    recipes_dict[categrory].push(new Recipe(recipe_id++, name, categrory, ingredients, directions, recipeOrigin));
  }

  return recipes_dict;
}

function showRecipe(recipe_id) {

  for (category in recipes_dict) {
    var recipes_for_category = recipes_dict[category];
    for (item in recipes_for_category) {
      var recipe = recipes_for_category[item];
      if (recipe.id == recipe_id) {
        // console.log(recipe);
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
      var recipe_id = recipes_dict[category][item].id;
      var recipe_link = "<li id='" + recipe_id + "'><a href=# onclick='showRecipe(\"" + recipe_id + "\")'>" + recipes_dict[category][item].name + "</a></li>";
	  
      category_html += recipe_link;
    }
    category_html += "</ul></li>"
    $('#recipe_list').append(category_html);
    console.log(category_html);

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

$(document).ready(function () {
  // readData($('#data'));
  recipes_dict = loadRecipes();
  showRecipeList(recipes_dict);
  showRecipe(2);
  setupTogglers();
});
