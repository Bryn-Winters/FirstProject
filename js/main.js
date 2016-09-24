var currentMood;
// Get elements from DOM
var pageheader = $("#page-header")[0]; //note the [0], jQuery returns an object, so to get the html DOM object we need the first item in the object
var pagecontainer = $("#page-container")[0];
// The html DOM object has been casted to a input element (as defined in index.html) as later we want to get specific fields that are only avaliable from an input element object
var factSelector = $("#my-file-selector")[0];
var refreshbtn = $("#refreshbtn")[0]; //You dont have to use [0], however this just means whenever you use the object you need to refer to it with [0].
// Register button listeners
factSelector.addEventListener("click", function () {
    pageheader.innerHTML = "Loading Cat facts...";
    //processImage(function (file) { //this checks the extension and file
    // Get emotions based on image
    //getCatFacts(function () { //here we send the API request and get the response
    getCatFacts();
    // Find out most dominant emotion
    //currentMood = getCurrMood(emotionScores); //this is where we send out scores to find out the predominant emotion
    //changeCatUI(infacts); //time to update the web app, with their emotion!
    //loadSong(currentMood); // Load random song based on mood
    //Done!!
    //});
    //});
});
refreshbtn.addEventListener("click", function () {
    // Load random song based on mood
    //loadSong(currentMood);
});
function changeCatUI(catFacts) {
    //Show mood emoji
    pageheader.innerHTML = "Your facts are:" + catFacts;
    //var img : HTMLImageElement = <HTMLImageElement>  $("#selected-img")[0];//getting a predefined area on our webpage to show the emoji
    //img.src = currentMood.emoji; //link that area to the emoji of our currentMood.
    //img.style.display = "block"; //just some formating of the emoji's location
    //Display song refresh button
    refreshbtn.style.display = "inline";
    //Remove offset at the top
    pagecontainer.style.marginTop = "20px";
}
// Refer to http://stackoverflow.com/questions/35565732/implementing-microsofts-project-oxford-emotion-api-and-file-upload
// and code snippet in emotion API documentation
function getCatFacts() {
    /* $.ajax({
        type: "GET",
        url: "http://catfacts-api.appspot.com/api/facts&number=2",
        processData: false
    })*/
    $.ajax('http://en.wikipedia.org/w/api.php?action=parse&page=cat&prop=text&format=json&callback=?', function (json) {
        $('#catInfo').html(json.parse.text['*']);
        $("#catInfo").find("a:not(.references a)").attr("href", function () { return "http://www.wikipedia.org" + $(this).attr("href"); });
        $("#catInfo").find("a").attr("target", "_blank");
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
// Section of code that handles the mood
//A Mood class which has the mood as a string and its corresponding emoji
var Mood = (function () {
    function Mood(mood, emojiurl) {
        this.mood = mood;
        this.emojiurl = emojiurl;
        this.name = mood;
        this.emoji = emojiurl;
    }
    return Mood;
}());
//var happy : Mood = new Mood("happy", "http://emojipedia-us.s3.amazonaws.com/cache/a0/38/a038e6d3f342253c5ea3c057fe37b41f.png");
//var sad : Mood  = new Mood("sad", "https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214");
//var angry : Mood = new Mood("angry", "https://cdn.shopify.com/s/files/1/1061/1924/files/Very_Angry_Emoji.png?9898922749706957214");
//var neutral : Mood  = new Mood("neutral", "https://cdn.shopify.com/s/files/1/1061/1924/files/Neutral_Face_Emoji.png?9898922749706957214");
// any type as the scores values is from the project oxford api request (so we dont know the type)
/*function getCurrMood(scores : any) : Mood {
    // In a practical sense, you would find the max emotion out of all the emotions provided. However we'll do the below just for simplicity's sake :P
    if (scores.happiness > 0.4) {
        currentMood = happy;
    } else if (scores.sadness > 0.4) {
        currentMood = sad;
    } else if (scores.anger > 0.4) {
        currentMood = angry;
    } else {
        currentMood = neutral;
    }
    return currentMood;
}*/
// Section of code that handles the music and soundcloud
/*
//A Song class which has the song's name and URL on soundcloud
class Song {
    title: string;
    url: string;
    constructor(songtitle : string, songurl : string) {
        this.title = songtitle;
        this.url = songurl;
    }
}

//A Playlist class which holds various amount of songs for each different mood
class Playlist {
    happy: Song[];
    sad: Song[];
    angry: Song[];

    constructor() {
        this.happy = [];
        this.sad = [];
        this.angry = [];
    }

    addSong(mood : string, song : Song) : void {
        // depending on the mood we want to add it to its corresponding list in our playlist
        if (mood === "happy") {
            this.happy.push(song); // this means the value of happy of the playlist object that got invoked the method "addSong"
        } else if (mood === "sad") {
            this.sad.push(song);
        } else if (mood === "angry") {
            this.angry.push(song);
        } // do a default one as well
    }

    getRandSong(mood : string) : Song {
        if (mood === "happy" || mood === "neutral") { // we have happy and neutral as getting songs from happy
            return this.happy[Math.floor(Math.random() * this.happy.length)];
        } else if (mood === "sad") {
            return this.sad[Math.floor(Math.random() * this.sad.length)];
        } else if (mood === "angry") {
            return this.angry[Math.floor(Math.random() * this.angry.length)];
        }
    }
}

var myPlaylist : Playlist;

function init() : void {
    // init playlist
    myPlaylist = new Playlist();

    myPlaylist.addSong("happy", new Song("Animals", "https://soundcloud.com/martingarrix/martin-garrix-animals-original")); // Song name and the url of the song on SoundCloud
    myPlaylist.addSong("happy", new Song("Good feeling", "https://soundcloud.com/anderia/flo-rida-good-feeling"));
    myPlaylist.addSong("happy", new Song("Megalovania", "https://soundcloud.com/angrysausage/toby-fox-undertale"));
    myPlaylist.addSong("happy", new Song("On top of the world", "https://soundcloud.com/interscope/imagine-dragons-on-top-of-the"));
    myPlaylist.addSong("sad", new Song("How to save a life", "https://soundcloud.com/jelenab-1/the-fray-how-to-save-a-life-7"));
    myPlaylist.addSong("sad", new Song("Divenire", "https://soundcloud.com/djsmil/ludovico-einaudi-divenire"));
    myPlaylist.addSong("sad", new Song("Stay High", "https://soundcloud.com/musaradian/our-last-night-habitsstay-hightove-lo"));
    myPlaylist.addSong("angry", new Song("When they come for me", "https://soundcloud.com/heoborus/when-they-come-for-me-linkin-park"));
    myPlaylist.addSong("angry", new Song("One Step Closer", "https://soundcloud.com/user1512165/linkin-park-one-step-closer"));
    myPlaylist.addSong("angry", new Song("Somewhere I belong", "https://soundcloud.com/mandylinkinparkmusic2xd/somewhere-i-belong"));

    // init soundcloud
    initSC();
}

function loadSong(currentMood : Mood) : void {
    var songSelected : Song = myPlaylist.getRandSong(currentMood.name); // gets a random song based on the moodd
    var track_url : string = songSelected.url;

    $("#track-name")[0].innerHTML = "Have a listen to: " + songSelected.title; // display the song being played
    $("#track-name")[0].style.display = "block"; // changing this style to block makes it appear (before was set to none so it wasnt seen)
    $("#musicplayer")[0].style.display = "block";

    loadPlayer(track_url); // load soundcloud player to play this song
}

//var myClientId = "8f2bba4a309b295e1f74ee38b8a5017b";
var myClientId = "8926a124d1220b80b74ea9ef17893225";

function initSC() : void {
    // init SoundCloud
    SC.initialize({
        client_id: myClientId
    });
}

function loadPlayer(trackurl : string) : void {
    SC.oEmbed(trackurl, { auto_play: true }).then(function (oEmbed) {
        var div = $("#musicplayer")[0];
        div.innerHTML = oEmbed.html; // puts the soundcloud player inside the musicplayer div
    });
}*/
// Initialise playlist and soundcloud
init();
