const playlist = [
    { src: "adhd.mp3" },
    { src: "gow-shanty.mp3" },
    { src: "healthy.mp3" },
    { src: "holy-mission.mp3" },
    { src: "minecraft-speedrun.mp3" },
    { src: "power-hour.mp3" },
    { src: "seasonal-disappointment.mp3" },
    { src: "the-bones-of-the-body.mp3" },
    { src: "we-didn’t-start-the-rl-deck.mp3" },
    { src: "welcome-to-exam-week.mp3" },
];

let player, muteBtn, audioIcon;

const soundOnIcon = `<path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
const soundOffIcon = `<path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;

function updateUI(isMuted) {
    if (!audioIcon || !muteBtn) return;
    if (isMuted) {
        audioIcon.innerHTML = soundOffIcon;
        muteBtn.title = "Unmute";
    } else {
        audioIcon.innerHTML = soundOnIcon;
        muteBtn.title = "Mute";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    player = document.getElementById('musicplayer');
    muteBtn = document.getElementById('muteButton');
    audioIcon = document.getElementById('audioIcon');

    if (!player) return;

    let currentTrackIndex = parseInt(localStorage.getItem('music_trackIndex')) || 0;
    let savedTime = parseFloat(localStorage.getItem('music_currentTime')) || 0;
    let isMuted = localStorage.getItem('music_muted') !== 'false';

    player.src = playlist[currentTrackIndex].src;
    player.currentTime = savedTime;
    player.muted = isMuted;

    updateUI(isMuted);

    player.play().catch(() => {
        console.log("Autoplay waiting for active user interaction.");
    });

    player.addEventListener('timeupdate', () => {
        localStorage.setItem('music_currentTime', player.currentTime);
    });

    player.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        localStorage.setItem('music_trackIndex', currentTrackIndex);
        localStorage.setItem('music_currentTime', 0);
        player.src = playlist[currentTrackIndex].src;
        player.play();
    });

    muteBtn.addEventListener('click', () => {
        player.muted = !player.muted;
        localStorage.setItem('music_muted', player.muted);

        updateUI(player.muted);

        if (!player.muted && player.paused) {
            player.play();
        }
    });

    window.addEventListener('storage', (event) => {
        if (event.key === 'music_muted') {
            const newMuteState = event.newValue === 'true';
            player.muted = newMuteState;
            updateUI(newMuteState);

            if (!newMuteState && player.paused) {
                player.play();
            }
        }
    });
});
