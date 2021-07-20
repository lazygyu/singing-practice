import {ScoreDrawer} from './ScoreDrawer';
import {parseScore} from './ScoreParser';

class ToneDetector {
    private ctx: AudioContext;
    private analyser: AnalyserNode;
    private update: (time: number) => void;

    private buf: Float32Array = new Float32Array(2048);

    public pitch: number = -1;
    public note: number = 0;
    public octav: number = 0;
    public noteName: string = '';

    public drawer = new ScoreDrawer();

    constructor() {
        const audioCtx = new window.AudioContext();
        const analyser = audioCtx.createAnalyser();

        this.ctx = audioCtx;
        this.analyser = analyser;
        this.update = this._update.bind(this);
    }

    public start() {
        this.getUserMedia();
    }

    private getUserMedia() {
        try {
            navigator.getUserMedia({
                'audio': {
                    'echoCancellation': false,
                    'autoGainControl': false,
                    'noiseSuppression': false,
                }
            }, this._gotUserMedia.bind(this), () => {
                alert('no media founded');
            });
        } catch(e) {
            alert('getUserMedia failed : ' + e);
        }
    }

    private _gotUserMedia(stream): void {
        const source = this.ctx.createMediaStreamSource(stream);

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 2048;
        source.connect(this.analyser);
        this.update(0);
    }

    private _update(time: number): void {
        const cycles = [];
        this.analyser.getFloatTimeDomainData(this.buf);
        const ac = this.correlate(this.buf, this.ctx.sampleRate);

        this.pitch = ac;
        if (ac === -1) {
            this.note = -1;
        } else {
            this.note = noteFromPitch(ac);
            this.octav = Math.floor(this.note / 12) - 1;
        }
        this.drawer.pushNote(this.note);
        this.drawer.update(time);
        requestAnimationFrame(this.update);
    }

    private correlate(buf: Float32Array, sampleRate: number): number {
        let size = buf.length;
        let rms = 0;
        for (let i = 0; i < size; i++) {
            const val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / size);
        if (rms < 0.01) {
            return -1;
        }

        let r1 = 0, r2 = size - 1, thres = 0.2;
        for (let i = 0; i < size / 2; i++) {
            if (Math.abs(buf[i]) < thres) {
                r1 = i;
                break;
            }
        }
        for (let i = 1; i < size / 2; i++) {
            if (Math.abs(buf[size - i]) < thres) {
                r2 = size - i;
                break;
            }
        }
        buf = buf.slice(r1, r2);
        size = buf.length;

        let c = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size - i; j++) {
                c[i] = c[i] + buf[j] * buf[j + i];
            }
        }

        let d = 0;
        while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;

        for (let i = d; i < size; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }

        let T0 = maxpos;
        const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);

        return sampleRate / T0;
    }
}

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch(frequency: number): number  {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

const tone = new ToneDetector();
tone.start();

document.querySelector('#btnStart').addEventListener('click', _ => {
    const txt = (document.querySelector('#inScore') as HTMLTextAreaElement).value;
    const notes = parseScore(txt);
    tone.drawer.start(notes);
});

