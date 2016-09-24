var currentMood;
// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0];
// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var catSelector = $("#cat-selection")[0];
var dogSelector = $("#dog-selection")[0];
var refreshbtn = $("#refreshbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].
//react to cats being selected
catSelector.addEventListener("click", function () {
    pageheader.innerHTML = "Loading Cat facts...";
    //load wikipedia page on cats
    getCatFacts();
});
//react to dogs being selected
dogSelector.addEventListener("click", function () {
    pageheader.innerHTML = "Loading Dog facts...";
    //load wikipedia page on dogs
    getDogFacts();
});
function getCatFacts() {
    /* $.ajax({
        type: "GET",
        url: "http://catfacts-api.appspot.com/api/facts&number=2",
        processData: false
    })*/
    $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=cat&prop=text&format=json&callback=?', function (json) {
        $('#animalInfo').html(json.parse.text['*']);
        $("#animalInfo").find("a:not(.references a)").attr("href", function () { return "http://www.wikipedia.org" + $(this).attr("href"); });
        $("#animalInfo").find("a").attr("target", "_blank");
    });
    pageheader.innerHTML = "Scroll Down!";
    /*.done(function (data) {
        if (data.length != 0) { // facts are found
            var facts = data[0].facts;
            callback(facts);
        } else {
            pageheader.innerHTML = "We're having trouble finding your facts!";
        }
    })
    .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });*/
}
function getDogFacts() {
    /* $.ajax({
        type: "GET",
        url: "http://catfacts-api.appspot.com/api/facts&number=2",
        processData: false
    })*/
    $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=dog&prop=text&format=json&callback=?', function (json) {
        $('#animalInfo').html(json.parse.text['*']);
        $("#animalInfo").find("a:not(.references a)").attr("href", function () { return "http://www.wikipedia.org" + $(this).attr("href"); });
        $("#animalInfo").find("a").attr("target", "_blank");
    });
    pageheader.innerHTML = "Scroll Down!";
    /*.done(function (data) {
        if (data.length != 0) { // facts are found
            var facts = data[0].facts;
            callback(facts);
        } else {
            pageheader.innerHTML = "We're having trouble finding your facts!";
        }
    })
    .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
    });*/
}
// Initialise
init();
