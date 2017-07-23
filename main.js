var currentSongNumber = 1;
var willLoop = 0; // ' = 0' means off, '=1' means on
var willShuffle = 0;


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
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        // playing song
        song.play();
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        // pausing song
        song.pause();
    }
} 
// function for togging the mute/unmute button
function muteSong() {
    var sound = document.querySelector('audio');
    if(sound.muted) {
        sound.muted = false;
        $('.volume').removeClass('fa-volume-off').addClass('fa-volume-up');
    }
    else { 
        sound.muted = true;
        $('.volume').removeClass('fa-volume-up').addClass('fa-volume-off');
    }
}
// calling the function muteSong to work on icon with class = 'volume'
$('.volume').on('click',function() {
    muteSong();
});

$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled') // toggle class 'disabled
    willLoop = 1 - willLoop; /*it change the value of 0 to 1 and from 1 to 0 [ in {line2} willLoop = 0, so 1-0 = 1(changed 0 to 1), now willLoop= 1,so 1-1 =0(change 1 to 0) ] */
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle; // for shuffle fontawesome
});
/* function used to jump at the last 5 sec of the song (used at console)*/
function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}

/* selected the play icon and added click function to select the audio*/
$('.play-icon').on('click',function() {
    // func. togglesong used to play/pause song.
    toggleSong();
}); 

// below code for sliding controls not working
/*
var seeking = false; //defined var = seeking
function seek(event) {    //defining seek function with event parameter
    if(seeking) {
        // we r changing seekslider's value = wherever the mouse is over the slider, clientx means where the mouse is , we subtract slider.offsetLeft to get exact position of mouse over the slider 
        seekslider.value = event.clientX - seekslider.offsetLeft;
        // seek the slider, change the pointer in the slider on mouse
        var seekTo = audio.duration * (seekslider.value / 100);
        //change the pointer and changing the current duration
        audio.currentTime = seekTo;
    }
}
$('#seekslider').mousedown(function(event) {     //mousedown event on function
    seeking = true;
    seek(event);
});
$('#seekslider').mousemove(function(event) {
    seek(event);
});
$('#seekslider').mouseup(function(event) {
    seeking = false;
});
*/

volumeslider = document.getElementById("volumeslider");
volumeslider.addEventListener("mousemove", setvolume);
function setvolume(){
	    audio.volume = volumeslider.value / 100;
}




$('body').on('keypress',function(event) {
    // keycode = 32 for spacebar, used so that it works only for spacebar
    var target = event.target; //Saved the target of the event in a variable
     /* This condition first checks if the spacebar key is pressed ,then it checks if the place where the event occurred had an input tag or not (target.tagName !='INPUT'), if input tag is there,we don't toggle the Song('if' does not get executed)
        This is done to stop the spacebar to toggleSong(play/pause) if we r writing something inside the search("INPUT") box
    */
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {console.log(event)
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
    duration = fancyTimeFormat(duration)// duration in fancyTimeFormat
    $('.time-elapsed').text(currentTime);// show current time
    $('.song-duration').text(duration); //show duration
}


//Arrays and objects
/*we use arrays for multiple list of songs so that we do not write the same code for each and every song repeatedly
 a var 'song' having array[] which contains objects(object are put inside {curly braces})
    objects cnsists of 'key':'value' pairs, there can be many key value pairs inside an object
    here we have 5 pairs*/
var songs = [{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    }, //objects are seperated by a comma
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    },    
    {
        'name': 'I Want it that Way',
        'artist': 'Backstreet Boys',
        'album': 'Millenium',
        'duration': '3:39',
        'fileName': 'song5.mp3',
        'image': 'song5.jpg'
    },
    {
        'name': 'Viva La Vida',
        'artist': 'Coldplay',
        'album': 'Viva La Vida',
        'duration': '4:02',
        'fileName': 'song6.mp3',
        'image': 'song6.jpg'
    },{
        'name': 'Hero',
        'artist': 'Enrique Iglesias',
        'album': 'Escape',
        'duration': '4:29',
        'fileName': 'song7.mp3',
        'image': 'song7.jpg'
    }];

function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}

// we have taken the whole object(songObj) as a parameter inside our function
function addSongNameClickEvent(songObj,position) {
    var songName = songObj.fileName; // New Variable selecting fileName from the objects
    var id = '#song' + position; 
    $(id).click(function() {
        var audio = document.querySelector('audio'); //'selected audio' tag
        var currentSong = audio.src;
        
        /* 'if' - we first serch the song which is playing(.search)
        (!= -1) means that the song.paused if not equal to -1(i.e false) i.e. we check whether the song.paused property is true, if it is not false (!= -1) then 'if' will get executed 
            i.e. 'if' will get executed if clicked on the same song which is being played or is in paused state*/
        if(currentSong.search(songName) != -1) {
            toggleSong();
        }
        /* 'else' will execute when the 'if' function don't work 
            i.e. it will be executed on changing a song*/
        else {
            audio.src = songName; //
            toggleSong();
            changeCurrentSongDetails(songObj); // Function Call
        }
    });
}

var lastSongNumber = songs.length;

//function for including all the songs but excluding the currentSongNumber(song which is currently playing) for the song to be played next
function randomExcluded(min,max,currentSongNumber) {
    var n = Math.floor(Math.random() * (max-min) + min); // to obtain a random number b/w max and min
    if (n >= currentSongNumber) n++;
    return n;
}
//calling audio when it is ended
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) { //whwn shuffle btn is on
        var nextSongNumber = randomExcluded(1,lastSongNumber,currentSongNumber); //var nextSongNumber will obtain a random number from the given function
        var nextSongObj = songs[nextSongNumber-1]; //nextSongObj will depend on the nextSongNumber Obtained
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < lastSongNumber) {
        var nextSongObj = songs[currentSongNumber]; //this line actually stores the second song's object in the variable 'nextSongObj', currentSongNumber is '1' for the first song so we get nextSongObj as songs[1] which is second song
        audio.src = nextSongObj.fileName; // Change Soure
        toggleSong(); // Play Next Song
        changeCurrentSongDetails(nextSongObj); // Update Image as for nextSongObj
        currentSongNumber = currentSongNumber + 1; // Change State acc. to currentSongNumber
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0]; // start playing first song
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play'); // if loop is off after the last song the pause icon will change to play icon
        audio.currentTime = 0; // audio time will reset to 0
    }
});

$('.fa-step-forward').on('click',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < lastSongNumber) {
        console.log('if next')
        var nextSongObj = songs[currentSongNumber]; //this line actually stores the second song's object in the variable 'nextSongObj', currentSongNumber is '1' for the first song so we get nextSongObj as songs[1] which is second song
        audio.src = nextSongObj.fileName; // Change Soure
        toggleSong(); // Play Next Song
        changeCurrentSongDetails(nextSongObj); // Update Image as for nextSongObj
        currentSongNumber = currentSongNumber + 1; // Change State acc. to currentSongNumber
    }
    // first song starts playing again after the last song
    else {
        console.log('else next')
        var nextSongObj = songs[0]; //play the first song after the last song
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj); // Update Image as for nextSongObj
        currentSongNumber = 1; //first song
    }
});

$('.fa-step-backward').on('click',function() {
    var audio = document.querySelector('audio');
    
    if(currentSongNumber > 1) {
        console.log('if p')
        var previousSongObj = songs[currentSongNumber - 2]; //this line
        audio.src = previousSongObj.fileName; // Change Soure
        toggleSong(); // Play Previous Song
        changeCurrentSongDetails(previousSongObj); // Update Image as for previousSongObj
        currentSongNumber = currentSongNumber - 1; // Change State acc. to currentSongNumber
    }
    // last song starts playing after the first song
   /* else {
        console.log('else p')
        var previousSongObj = songs[lastSongNumber - 1]; //play the last song before the first song //songs[3]
        audio.src = previousSongObj.fileName; //songs[3]
        toggleSong();
        changeCurrentSongDetails(previousSongObj); // Update Image as for previousSongObj
        currentSongNumber = lastSongNumber - 1; //first song
    } */
});


/* window.onload is a function which tells our script inside it to work when the window if completely loaded(including all the things)*/
window.onload = function() {
    changeCurrentSongDetails(songs[0]); //make first song (song[0]) as the default song whose details are to be shown when website is loaded 
    
    /* "For Loop"
    (1) first we give the value from where it needs to start i.e. i=0
    (2) after that we give condition/ compare it , i.e. i < length of songlist(i < songList.length)
    (3) the it will run the complete function
    (4) At last it will increment the value after running thw complete function
    */
    for(var i =0; i < songs.length;i++) {
        var obj = songs[i];  // we Saved the song object in variable 'obj' ,  (songs is a var defined for array containing objects {line 80})
        var name = '#song' + (i+1); // name of the song with its id number
        var song = $(name);
        // we selected the relevant object property from the object we have given above as - ".text(obj.property)", hum ise use karke property select/apply karte hai idhar par from the object
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1)   //passed a whole object as parameter of the function and also position of song  (Added a click event on each song)
    }
     updateCurrentTime();// start updating time from the beginning 
    // set interval to update the time of the playing song
    setInterval(function() {
        updateCurrentTime();//update time in regular intervals
    },1000);
    
    $('#songs').DataTable({
        paging: false
    });
}   
