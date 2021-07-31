import {ScoreDrawer} from './ScoreDrawer';
import {noteFromPitch} from './index';
import {EventEmitter} from './EventEmitter';

export class ToneDetector extends EventEmitter {
    private ctx: AudioContext;
    private analyser: AnalyserNode;

    private buf: Float32Array = new Float32Array(2048);

    private pitch: number = -1;
    private note: number = 0;
    private octav: number = 0;
    private inited = false;

    constructor(ctx: AudioContext) {
        super();
        this.ctx = ctx;
    }

    public start() {
        if (!this.inited) {
            const analyser = this.ctx.createAnalyser();
            this.analyser = analyser;
            this.analyser.fftSize = 2048;
            this.getUserMedia();
        }
    }

    private getUserMedia() {
        const n = navigator as any;
        if (n.mediaDevices === undefined) {
            n.mediaDevices = {};
        }

        if (n.mediaDevices.getUserMedia === undefined) {
            n.mediaDevices.getUserMedia = function (constraints) {
                const getUserMedia = (n.getUserMedia || n.webkitGetUesrmedia || n.mozGetUserMedia || n.msGetUserMedia);

                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not supported'));
                }

                return new Promise(function (rs, rj) {
                    getUserMedia.call(navigator, constraints, rs, rj);
                });
            }
        }
        
        const constraints = {audio: true};
        n.mediaDevices.getUserMedia(constraints).then(stream => {
            const source = this.ctx.createMediaStreamSource(stream);
            source.connect(this.analyser);
            this.inited = true;
            this.emit('inited');
        });
    }

    public update(delta: number): void {
        if (!this.inited) return;

        this.analyser.getFloatTimeDomainData(this.buf);
        const ac = this.correlate(this.buf, this.ctx.sampleRate);

        this.pitch = ac;
        if (ac === -1) {
            this.note = -1;
        } else {
            this.note = noteFromPitch(ac);
            this.octav = Math.floor(this.note / 12) - 1;
        }

        this.emit('note', this.note);
    }

    private correlate(buf: Float32Array, sampleRate: number): number {
        let size = buf.length;
        let rms = 0;
        for (let i = 0; i < size; i++) {
            rms += (buf[i] * buf[i]);
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
        while (c[d] > c[d + 1])
            d++;
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
        if (a)
            T0 = T0 - b / (2 * a);

        return sampleRate / T0;
    }
}
