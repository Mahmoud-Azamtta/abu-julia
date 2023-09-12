var httpRequest = new XMLHttpRequest();
var urlParams = new URLSearchParams(window.location.search);
var recipeId = urlParams.get("recipeId");
var ingredients = [];
httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
httpRequest.send();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
        var result = JSON.parse(httpRequest.response);
        showRecipe(result.recipe);
    }
}

function showRecipe(recipe) {
    var recipeIngredients = "";
    console.log(recipe);
    console.log(recipe.ingredients);
    ingredients = recipe.ingredients;
    for (var i = 0; i < ingredients.length; i++) {
        console.log(i);
        recipeIngredients += `<li>${ingredients[i]}</li>`
    }
    document.querySelector(".recipe .container").innerHTML = `
        <div class="w-50">
            <img src="${recipe.image_url}">
        </div>
        <h3 class="pt-5">${recipe.title}</h3>
        <p class="text-danger-emphasis fw-bold">By: ${recipe.publisher}</p>
        <ul class="text-start">
            ${recipeIngredients}
        </ul>
    `;
}