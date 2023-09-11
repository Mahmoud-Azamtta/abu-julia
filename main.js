var httpRequest = new XMLHttpRequest();

function getNews(category) {
    httpRequest.open("GET", `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=0aff22ba20214b8d9bbd6a9a7f94c182`);
    httpRequest.send();
    var result = [];
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4) {
            result = JSON.parse(httpRequest.response).articles;
            displayData(result);
        }
    }
}

function displayData(news) {
    var data = "";
    for (var i = 0; i < news.length; i++) {
        if (news[i].title == "[Removed]") {
            continue;
        }
        checkData(news[i]);
        data += `
            <div class="col-md-6 p-5 border">
                    <img id="article-image" src="${news[i].urlToImage}" class="w-100">  
                    <div class="">
                        <h3>${news[i].title}</h3>
                        <p class="text-danger-emphasis fw-bold">By: ${news[i].author}</p>
                        <p>${news[i].description}</p>
                        <a href="${news[i].url}" target="blank_">Continue Reading...</a>
                    </div>
                </div>
            </div>
        `;
    }
    handleImageErrors();
    var dataHolder = document.getElementById("dataHolder").innerHTML = data;
}

function checkData(newsObject) {
    if (newsObject.urlToImage == null) {
        newsObject.urlToImage = "image_not_available.png";
    }
    if (newsObject.author == null || newsObject.author == "") {
        newsObject.author = "Uknown"
    }
    if (newsObject.description == null) {
        newsObject.description = "No description was provided."
    }
}

function handleImageErrors() {
    var images = document.querySelectorAll("#article-image");
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("error", function() {
            images[i].src = "image_not_available.png"; 
        });
    }
}

var tabs = document.querySelectorAll(".navbar .nav-link")
for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        var category = event.target.innerHTML.toLowerCase();
        getNews(category);
    });
}