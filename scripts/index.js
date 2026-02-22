//Background Music, most this stuff is based on https://artifyber.xyz/ BGM logic
let bgmInitialized = false;

//Easy reference to all audio background music audio elements
const bgm = {
    all: document.getElementById('bgmPersistent'),
    primary: document.getElementById('bgmPrimary'),
    voidCity: document.getElementById('bgmVoidCity'),
    drifters: document.getElementById('bgmDrifters'),
}

//Presets of audios to play together
const bgmPresets = {
    primary: [bgm.all, bgm.primary],
    voidCity: [bgm.all, bgm.voidCity],
    drifters: [bgm.all, bgm.drifters],
}

//Start playing all music silently, active tracks will fade to max volume when ready
function prepareBgm(){
    for (let bgmKey in bgm) {
        bgm[bgmKey].volume = 0.0;
        bgm[bgmKey].play();
        bgm[bgmKey].currentTime = 0.0;
    }
    bgmInitialized = true;
}

//Fade audio in preset to max, and all others to zero
function playBgmPreset(preset){
    //Sometimes silent audio drifts? Also, setting current time pauses audio temporarily.
    //Set the constant drum loop to its own time to perform that short pause, so that
    //when we sync other audios it doesn't run away.
    bgm.all.currentTime = bgm.all.currentTime;
    for (let bgmKey in bgm) {
        const aud = bgm[bgmKey];
        //Fade out audio to zero, applied to all tracks
        fadeAudio(aud, 0, 0.005);
        //Match audio time with drum loop time.
        aud.currentTime = bgm.all.currentTime;
    }
    for (let presetKey in preset) {
        //Fade preset tracks to max. Instantly overrides previous fade done on all tracks.
        //Therefore, as far as I can tell, no check needed above.
        fadeAudio(preset[presetKey], 1, 0.005);
    }
}

//Cooler than setting volume directly.
function fadeAudio(audio, t, rate){
    clearInterval(audio._fadeInterval);

    const targ = t;

    audio._fadeInterval = setInterval(() => {
        const current = audio.volume;
        const diff = current - targ;

        if(Math.abs(diff) < 0.01){
            audio.volume = targ;
            clearInterval(audio._fadeInterval);
        }

        audio.volume = Math.min(Math.max(targ, current-rate), current+rate);
    })
}

//Starts audio after first interaction, since some browsers block audio until then.
function interactInitialize(){
    {
        if(!bgmInitialized){
            prepareBgm();
            playBgmPreset(bgmPresets.primary);
            document.removeEventListener('mousedown', interactInitialize);
        }
    }
}
document.addEventListener('mousedown', interactInitialize)
