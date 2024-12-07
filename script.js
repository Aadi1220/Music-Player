audioElement = new Audio('Espresso.mp3');

let songIndex = 0;
let masterPlay = document.querySelector('#masterPlay');
let myProgressBar = document.querySelector('#myProgressBar');
let songItems = document.querySelector('.songItem');
let itemList = document.querySelectorAll('.listSong');
let time = document.querySelector('.time');
let time1 = document.querySelector('.time1');

let songs = [{
    songName: 'Espresso',
    filePath: 'Espresso.mp3',
}, {
    songName: 'Big Dawgs',
    filePath: 'songs/Big Dawgs - PagalHits.mp3',
}, {
    songName: 'Bye Bye Bye',
    filePath: 'songs/Bye Bye Bye Deadpool - PagalHits.mp3',
}, {
    songName: 'Aaj Ki Raat',
    filePath: 'songs/Aaj Ki Raat(PagalWorld.com.sb).mp3',
}, {
    songName: 'Tere Ho Ke',
    filePath: 'songs/Tere Ho Ke(PagalWorld.com.sb).mp3',
}, {
    songName: 'Masha Ultrafunk',
    filePath: 'songs/Masha Ultrafunk - PagalHits.mp3',
}, {
    songName: 'Millionaire',
    filePath: 'songs/Millionaire(PagalWorld.com.sb).mp3',
}];

let gif = document.querySelector('.gif img');

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.className = "fa-solid fa-pause";
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.className = "fa-solid fa-play";
        gif.style.opacity = 0;
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audioElement.addEventListener('loadedmetadata', () => {
    // Update duration when metadata is loaded
    time1.innerText = formatTime(audioElement.duration);
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    myProgressBar.style.background = `linear-gradient(to right, #1bd760 ${progress}%, #ddd ${progress}%)`;

    time.innerText = formatTime(audioElement.currentTime);
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    let progress = myProgressBar.value;
    myProgressBar.style.background = `linear-gradient(to right, #1bd760 ${progress}%, #ddd ${progress}%)`;
});

const makeAllPlays = () => {
    for (const item of itemList) {
        item.classList = 'fa-solid fa-play';
    }
}

let title = document.querySelector('.gif div');
let ind;

for (const item of itemList) {
    item.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.className = 'fa-solid fa-music';
        songIndex = Array.from(itemList).indexOf(e.target);  // Correctly set songIndex
        audioElement.currentTime = 0;
        audioElement.src = songs[songIndex].filePath;
        audioElement.load();  // Important to reload the audio file
        masterPlay.className = "fa-solid fa-pause";
        audioElement.play();
        gif.style.opacity = 1;
        title.innerText = songs[songIndex].songName;
    });
}


let previous = document.querySelector('#previous');
previous.addEventListener('click', () => {
    makeAllPlays();
    songIndex = songIndex == 0 ? 6 : songIndex - 1;
    itemList[songIndex].className = 'fa-solid fa-music';
    audioElement.currentTime = 0;
    audioElement.src = songs[songIndex].filePath;
    audioElement.load();  // Important to reload the audio file
    masterPlay.className = "fa-solid fa-pause";
    audioElement.play();
    gif.style.opacity = 1;
    title.innerText = songs[songIndex].songName;
});

let next = document.querySelector('#next');
next.addEventListener('click', () => {
    makeAllPlays();
    songIndex = songIndex == 6 ? 0 : songIndex + 1;
    itemList[songIndex].className = 'fa-solid fa-music';
    audioElement.currentTime = 0;
    audioElement.src = songs[songIndex].filePath;
    audioElement.load();  // Important to reload the audio file
    masterPlay.className = "fa-solid fa-pause";
    audioElement.play();
    gif.style.opacity = 1;
    title.innerText = songs[songIndex].songName;
});
