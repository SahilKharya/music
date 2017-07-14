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
