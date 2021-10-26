const media = document.querySelector('video');
const player = document.querySelector('.player');
const controls = document.querySelector('.controls');
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const volumeControl = document.querySelector('.volumeControl');
const volumeControlBar = document.querySelector('#volumeControlBar');
const playbackSpeed = document.querySelector('#speeds');
const fullscreen = document.querySelector('.fullscreenToggle');
const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timePassed');
const timeTotal = document.querySelector('.timeTotal');
const timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

let timeout = null;
player.addEventListener('mousemove', (e) => {
    stopHide();
    startHide();
});

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
media.addEventListener('timeupdate', setTime);
media.defaultPlaybackRate = 1;
volumeControl.childNodes[1].addEventListener('click', mute);
fullscreen.addEventListener('click', toggleFullscreen);
playbackSpeed.addEventListener('change', changePlaybackSpeed);

timerWrapper.addEventListener('click', (e) => {
    clickToTime(e);
});

function clickToTime(event) {
    const progressTime =
        (event.offsetX / timerWrapper.offsetWidth) * media.duration;
    console.log(progressTime);
    media.currentTime = progressTime;
}

function playPauseMedia() {
    if (media.paused) {
        play.childNodes[1].classList.replace('fa-play', 'fa-pause');
        media.play();
    } else {
        play.childNodes[1].classList.replace('fa-pause', 'fa-play');
        media.pause();
    }
    setMaxTime();
}

function stopMedia() {
    play.childNodes[1].classList.replace('fa-pause', 'fa-play');
    media.pause();
    media.currentTime = 0;
}

function volume() {
    if (media.volume < 0.5 && media.vole !== 0) {
        volumeControl.childNodes[1].classList.replace(
            'fa-volume-mute',
            'fa-volume-down'
        );
        volumeControl.childNodes[1].classList.replace(
            'fa-volume-up',
            'fa-volume-down'
        );
    } else if (media.volume >= 0.5) {
        volumeControl.childNodes[1].classList.replace(
            'fa-volume-down',
            'fa-volume-up'
        );
    }

    media.volume = volumeControlBar.value / 100;
}

function mute() {
    media.volume = 0;
    volumeControl.childNodes[1].classList.replace(
        'fa-volume-up',
        'fa-volume-mute'
    );
    volumeControl.childNodes[1].classList.replace(
        'fa-volume-down',
        'fa-volume-mute'
    );
    volumeControlBar.value = 0;
}

function setTime() {
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;
    let barLength;

    timer.textContent = mediaTime;
    barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = barLength + 'px';
}

function setMaxTime() {
    let minutes = Math.floor(media.duration / 60);
    let seconds = Math.floor(media.duration - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes < 10) {
        minuteValue = '0' + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds < 10) {
        secondValue = '0' + seconds;
    } else {
        secondValue = seconds;
    }

    let mediaTime = minuteValue + ':' + secondValue;
    timeTotal.textContent = mediaTime;
}

function changePlaybackSpeed() {
    switch (playbackSpeed.value) {
        case 'superSlow':
            console.log('superSlow');
            media.playbackRate = 0.5;
            break;
        case 'slow':
            media.playbackRate = 0.75;
            console.log('slow');
            break;
        case 'normal':
            media.playbackRate = 1;
            console.log('normal');
            break;
        case 'fast':
            media.playbackRate = 1.5;
            console.log('fast');
            break;
        case 'superFast':
            media.playbackRate = 2;
            console.log('superFast');
            break;
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document
            .exitFullscreen()
            .then(() => {
                console.log('Document Exited from Full screen mode');
                fullscreen.childNodes[1].classList.replace(
                    'fa-compress',
                    'fa-expand'
                );
            })
            .catch((err) => console.error(err));
    } else {
        player.requestFullscreen();
        fullscreen.childNodes[1].classList.replace('fa-expand', 'fa-compress');
    }
}

function startHide() {
    timeout = setTimeout(function () {
        controls.style.visibility = 'hidden';
        timerWrapper.style.visibility = 'hidden';
    }, 3000);
}

function stopHide() {
    clearTimeout(timeout);
    controls.style.visibility = 'visible';
    timerWrapper.style.visibility = 'visible';
}
