class makeTimer {

    constructor(opts) {
        this.totalSeconds = 0;
        this.onUpdate = opts.onUpdate;
        this.speed = opts.speed;

        this.isPlaying = false;
    }

    start() {

        if (this.isPlaying) {
          return false;
        }

        this.interval = setInterval(d=> {
            this.totalSeconds += 1;
            this.onUpdate();

        }, this.speed);

        this.isPlaying = true;
    }

    pause() {
        clearInterval(this.interval);
        delete this.interval;
        this.isPlaying = false;

    }

    resume() {
        if (!this.interval) this.start();
    }


}



export default makeTimer;