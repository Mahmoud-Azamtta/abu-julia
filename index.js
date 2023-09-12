var httpRequest = new XMLHttpRequest();

function getNews(category) {
    httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${category}`);
    httpRequest.send();
    var result = [];
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4) {
            result = JSON.parse(httpRequest.response).recipes;
            displayData(result);
        }
    }
}

function displayData(dishes) {
    var data = "";
    for (var i = 0; i < dishes.length; i++) {
        data += `
            <div class="col-md-6 p-5 border">
                    <img id="article-image" src="${dishes[i].image_url}" class="w-100">  
                    <div class="">
                        <h3>${dishes[i].title}</h3>
                        <p class="text-danger-emphasis fw-bold">By: ${dishes[i].publisher}</p>
                        <a href="details.html?recipeId=${dishes[i].recipe_id}" class="read-more" id="${dishes[i].recipe_id}" target="blank_">Read More...</a>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("dataHolder").innerHTML = data;
}

var tabs = document.querySelectorAll(".navbar .nav-link")
for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        var category = event.target.innerHTML.toLowerCase();
        getNews(category);
    });
}

