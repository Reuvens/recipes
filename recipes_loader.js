// Instructions taken from:
// https://gist.github.com/terrywbrady/a03b25fe42959b304b1e
// published page: https://docs.google.com/spreadsheets/d/e/2PACX-1vT3FLCR7TAN-0JBpuVEW0MXtCA6TAWdBjEKKXjfzqvFhK259ymNKyHxh3Xc2D5P5dGY5HEfeprZDWGY/pubhtml
// rss feed: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values
// JSON feed: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values?alt=json-in-script
// JS do data: https://spreadsheets.google.com/feeds/cells/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/1/public/values?alt=json-in-script&callback=doData

class Recipe {
  constructor(timestamp, name, category, ingredients, directions, origin) {
	this.timestamp = timestamp;
    this.name = name;
    this.category = category;
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

  // data per column:
  // 0. name
  // 1. category
  // 2. ingredients 
  // 3. directions
  // 4. where this recipe came from
  // 5. timestamp

  var numColumns = 6;
  // skipping row 1 which is the titles
  for (var rowStart = numColumns; rowStart < data.length; rowStart += numColumns) {
    var name = data[rowStart + 0]["gs$cell"]["$t"];
    var category = data[rowStart + 1]["gs$cell"]["$t"];
    var ingredients = data[rowStart + 2]["gs$cell"]["$t"];
    var directions = data[rowStart + 3]["gs$cell"]["$t"];
    var recipeOrigin = data[rowStart + 4]["gs$cell"]["$t"];
    var timestamp = data[rowStart + 5]["gs$cell"]["$t"];


    if (! recipes_dict[category]) {
      recipes_dict[category] = [];
    }
	
    var recipe_timestamp = Date.parse(timestamp).getTime()/1000;
	
    recipes_dict[category].push(new Recipe(recipe_timestamp, name, category, ingredients, directions, recipeOrigin));
  }

  return recipes_dict;
}

