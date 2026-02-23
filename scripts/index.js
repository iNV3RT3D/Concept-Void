//Background Music, a lot this stuff is based on https://artifyber.xyz/ BGM logic, adjusted for web audio
let bgmInitialized = false;

const audioContext = new AudioContext();

//TODO: I could probably compress these three dictionaries into one.
const bgmPaths = {
    all: "assets/audio/music/CONCEPT VOID - PERSISTANT.mp3",
    primary: "assets/audio/music/CONCEPT VOID - PRIMARY.mp3",
    voidCity: "assets/audio/music/CONCEPT VOID - VOID CITY.mp3",
    drifters: "assets/audio/music/CONCEPT VOID - DRIFTERS.mp3",
}

const bgmTracks = {
    all: audioContext.createBufferSource(),
    primary: audioContext.createBufferSource(),
    voidCity: audioContext.createBufferSource(),
    drifters: audioContext.createBufferSource(),
}

const bgmGains = {
    all: audioContext.createGain(),
    primary: audioContext.createGain(),
    voidCity: audioContext.createGain(),
    drifters: audioContext.createGain(),
}

async function getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

async function setupTracks() {
    let loaded = 0;
    for (let bgmKey in bgmTracks) {
        const filePath = bgmPaths[bgmKey];
        getFile(audioContext, filePath).then(r => {
            console.log(filePath);
            const source = bgmTracks[bgmKey];
            const gain = bgmGains[bgmKey];
            source.loop = true;
            source.buffer = r;
            source.connect(gain).connect(audioContext.destination);
            loaded+=1;
        })
    }

    await new Promise(resolve => {
        setInterval(() => {
            if (loaded === Object.keys(bgmTracks).length) {
                resolve();
            }
        }, 1000);
    });
}

//Presets of audios to play together
const bgmPresets = {
    primary: ["all", "primary"],
    voidCity: ["all", "voidCity"],
    drifters: ["all", "drifters"],
}

//Start playing all music silently, active tracks will fade to max volume when ready
async function prepareBgm(){
    await setupTracks();

    console.log("Loaded BGM music");
    for (let bgmKey in bgmTracks) {
        bgmTracks[bgmKey].start();
        bgmGains[bgmKey].gain.value = 0.0;
    }
    bgmInitialized = true;
}

//Fade audio in preset to max, and all others to zero
function playBgmPreset(preset){
    for (let bgmKey in bgmGains) {
        const gainNode = bgmGains[bgmKey];
        //Fade out audio to zero, applied to all tracks
        fadeGain(gainNode, 0, 0.005);
    }

    preset.forEach(function(key) {
        //Fade preset tracks to max. Instantly overrides previous fade done on all tracks.
        //Therefore, as far as I can tell, no check needed above.
        console.log(key);
        fadeGain(bgmGains[key], 1, 0.005);
    });
}

//Cooler than setting volume directly.
function fadeGain(gainNode, t, rate){
    clearInterval(gainNode._fadeInterval);

    const targ = t;

    gainNode._fadeInterval = setInterval(() => {
        const current = gainNode.gain.value;
        const diff = current - targ;

        if(Math.abs(diff) < 0.01){
            gainNode.gain.value = targ;
            clearInterval(gainNode._fadeInterval);
        }

        gainNode.gain.value = Math.min(Math.max(targ, current-rate), current+rate);
    })
}

//Starts audio after first interaction, since some browsers block audio until then.
function interactInitialize(){
    {
        if(!bgmInitialized){
            document.removeEventListener('mousedown', interactInitialize);
            prepareBgm().then(() => {

            });
        }
    }
}
document.addEventListener('mousedown', interactInitialize)
