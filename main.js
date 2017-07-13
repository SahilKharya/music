$('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();
/* to allow limited access to the website, we use if property of providing name to enter the site
    If the length of characters is more than 2, then allow access to site else don't allow */
    if(name.length > 2) {
        var message = "Welcome " + name;
        $('.main .user-name').text(message);
        /* to find the class 'user-name' inside the 'main' class and add the value of variable- 'message' */
        //adding and removing 'hidden' class
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    }
    else {
        $('#name-input').addClass('error');
    }
});
/*defined a function 'togglesong' to be executed to play/pause song*/
function toggleSong() {
    var song = document.querySelector('audio');
    if(song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        // playing song
        song.play();
    }
    else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        // pausing song
        song.pause();
    }
} 

/* selected the play icon and added click function to select the audio*/
$('.play-icon').on('click',function() {
    // func. togglesong used to play/pause song.
    toggleSong();
}); 
$('body').on('keypress',function(event) {
    // keycode = 32 for spacebar, used so that it works only for spacebar
    if (event.keyCode == 32) {
        toggleSong();
    }
}); 
//convert time in 'seconds' to good format i.e hr:min:sec
function fancyTimeFormat(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


function updateCurrentTime() {
    var song = document.querySelector('audio');
    // 'math.floor' used to convert the decimal number to a proper number
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);// show the currentTime in FancyTimeFormat
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration)// duration infancyTimeFormat
    $('.time-elapsed').text(currentTime);// show current time
    $('.song-duration').text(duration); //show duration
}

// given the song names and other list in a array instead of defining a variable for each
var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
var artistList = ['Artist #1', 'Artist #2', 'Artist #3', 'Artist #4'];
var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
var durationList = ['2:56','3:15','2:34','2:29'];

function addSongNameClickEvent(songName,position) {
    var id = '#song' + position;
    $(id).click(function() {
        var audio = document.querySelector('audio');
        var currentSong = audio.src;
        /* 'if' - we first serch the song which is playing(.search)
        (!= -1) means that the song.paused if not equal to -1(i.e false) i.e. we check whether the song.paused property is true, if it is not false (!= -1) then 'if' will get executed */
        if(currentSong.search(songName) != -1) {
            toggleSong();
        }
        /* 'else' will execute when the 'if' function don't work */
        else {
            audio.src = songName;
            toggleSong();
        }
    });
}
/*for loop - to add the function 'addSongNameClickEvent' to work on the list of all songs present in the library*/
for (var i = 0; i < fileNames.length ; i++) {
    addSongNameClickEvent(fileNames[i],i+1)
} 

//Arrays
/*we use arrays for multiple list of songs so that we do not write the same code for each and every song repeatedly */
var songList = ['Badri Ki Dulhania (Title Track)',
                'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song']; 

/* window.onload is a function which tells our script inside it to work when the window if completely loaded(including all the things)*/
window.onload = function() {

    /* "For Loop"
    (1) first we give the value from where it needs to start i.e. i=0
    (2) after that we give condition/ compare it , i.e. i < length of songlist(i < songList.length)
    (3) the it will run the complete function
    (4) At last it will increment the value after running thw complete function
    */
    for(var i =0; i < songList.length;i++) {
        var name = '#song' + (i+1);// giving name string+ value 
        var song = $(name); //variable song now gets the value of name we need (first is song1)
        //now we have searched the var song once in the html file and will find the given classes inside the "var song"
        song.find('.song-name').text(songList[i]);
        song.find('.song-artist').text(artistList[i]);
        song.find('.song-album').text(albumList[i]); 
        song.find('.song-length').text(durationList[i]); 
    }
    
    updateCurrentTime();// start updating time from the beginning 
    // set interval to update the time of the playing song
    setInterval(function() {
        updateCurrentTime();//update time in regular intervals
    },1000);
}   
