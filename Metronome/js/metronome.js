class Metronome{
    constructor(tempo=60,ticks=1000){
        this.playing = false;
        this.tempo = tempo;
        this.audioCtx = null;
        this.tick = null;
        this.tickVolume = null;
        this.soundHz = 1000;
        this.scheduledTicks = ticks;
    }

    initAudio() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.tick = this.audioCtx.createOscillator();
        this.tickVolume = this.audioCtx.createGain();
    
        this.tick.type = 'sine'; 
        this.tick.frequency.value = this.soundHz;
        this.tickVolume.gain.value = 0;
        
        this.tick.connect(this.tickVolume);
        this.tickVolume.connect(this.audioCtx.destination);
        this.tick.start(0);  
    }
      
    click(callbackFn) {
        const time = this.audioCtx.currentTime;
        this.clickAtTime(time);
        
        if (callbackFn) {
          callbackFn(time);
        }
    }
      
    clickAtTime(time) {
        this.tickVolume.gain.cancelScheduledValues(time);
        this.tickVolume.gain.setValueAtTime(0, time);
    
        
        this.tickVolume.gain.linearRampToValueAtTime(1, time + .001);
        this.tickVolume.gain.linearRampToValueAtTime(0, time + .001 + .01);
    }
      
    start(callbackFn) {
        if(this.playing === true){
            return;
        }
        this.playing = true;
        this.initAudio();
        const timeoutDuration = (60/this.tempo);
        let now = this.audioCtx.currentTime;

        for(let i = 0; i<this.scheduledTicks;i++){
            this.clickAtTime(now);
            const x = now;
            setTimeout(() => callbackFn,now*100);
            now+=timeoutDuration;
        }
    }
      
    stop(callbackFn) {
        this.tick.stop(this.audioCtx.currentTime);
    }
    
}