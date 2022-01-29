// Instructions taken from:
// https://dev.to/marcusatlocalhost/request-google-sheets-json-api-v4-with-php-12ji
// Full URL:
// https://sheets.googleapis.com/v4/spreadsheets/1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo/values/Form%20Responses%201?key=AIzaSyCLfNf36x5vVb3l19oKSw5RpDsKPwCoMnw
//
// Form Responses 1
// 1VsPOSuFgW747FhMscNVQVB0rwO7_U4jNH9v-0VAPDgo
// Control API keys and scopes:
// https://console.cloud.google.com/apis/credentials
// Privous instructions from: https://gist.github.com/terrywbrady/a03b25fe42959b304b1e

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

function loadRecipes(json) {
  var data = json.values;
  var recipes_dict = [];
  // data per column:
  // 1. timestamp
  // 1. name
  // 2. category
  // 3. ingredients 
  // 4. directions
  // 5. where this recipe came from

  // skipping first row (titles)
  data.shift();
  
  data.forEach((element, index) => {
    // if (index == 0) {
    //   continue;
    // }
    var timestamp = element[0];
    var name = element[1];
    var category = element[2];
    var ingredients = element[3];
    var directions = element[4];
    var recipeOrigin = element[5];

    if (! recipes_dict[category]) {
      recipes_dict[category] = [];
    }
  
    var recipe_timestamp = new Date(timestamp).getTime()/1000;
  
    recipes_dict[category].push(new Recipe(recipe_timestamp, name, category, ingredients, directions, recipeOrigin));    

    });
  return recipes_dict;
}
