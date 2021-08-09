import autobind from 'autobind-decorator';
import {Note} from './ScoreParser';
const noteTop = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];

export class ScoreDrawer {
    private _canvas: HTMLCanvasElement;
    private _notes: number[];
    private _oct: number = 0;
    private _elapsed = 0;
    private _lastTime = 0;

    private _screenWidth: number = 600;
    private _screenTime: number = 600 * (1000 / 60);

    private _playScore: Note[] = [];

    private _volumeElem: HTMLInputElement;
    private _toneElem: HTMLInputElement;
    private _inited: boolean = false;

    private _currentNote: Note | null = null;

    public get octav(): number {
        return this._oct;
    }

    public set octav(v: number) {
        this._oct = v;
    }

    public get screenWidth(): number {
        return this._screenWidth;
    }

    public set screenWidth(v: number) {
        this._screenWidth = v;
        this._screenTime = this._screenWidth * (1000 / 60);
    }

    constructor() {
        this._canvas = document.createElement('canvas');
        this._canvas.width = this._screenWidth;
        this._canvas.height = 250;
        this._canvas.style.width = '100%';

        this._notes = new Array(300).fill(-1);
        const resizeObserver = new ResizeObserver(this._resizeCallback);
        resizeObserver.observe(this._canvas);
    }

    public renderElement(): HTMLElement {
        return this._canvas;
    }

    @autobind
    private _resizeCallback() {
        this._fitToContainer();
    }

    private _fitToContainer(): void {
        const {offsetWidth, offsetHeight} = this._canvas;
        this._canvas.width = offsetWidth;
        this._screenWidth = offsetWidth;
        const len = Math.floor(offsetWidth / 2);
        if (this._notes.length < len) {
            this._notes.unshift(...(new Array(len - this._notes.length).fill(-1)));
        } else if (this._notes.length > len) {
            this._notes.splice(0, (this._notes.length - len));
        }
    }

    start(notes: Note[]): void {
        this._playScore = notes.slice();
        this._elapsed = -1000;
    }

    stop(): void {
        this._playScore = [];
    }

    public get currentTime(): number {
        return this._elapsed;
    }

    private _renderNotes(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        const fps = (1000/60);
        const screenLength = this._screenWidth;
        const halfLength = screenLength / 2;
        ctx.translate(halfLength, 0);
        const screenTime = screenLength * fps;
        const half = screenTime / 2;
        const latency = 40 / fps;

        let current: Note | null = null;

        this._playScore.forEach(note => {
            if (note.note === -1) return;

            const x = (note.start - this._elapsed) / fps;
            if (x > halfLength) return;

            const width = (note.length) / fps - 1;
            if (x + width < -halfLength) return;

            const y = (noteTop[note.note] * 5) + ((note.octav - 3) * 35) + 150 + (this._oct * 5) - 2.5;
            if (note.start <= this._elapsed && note.start + note.length - fps >= this._elapsed) {
                current = note;
                ctx.fillStyle = 'orange';
            } else {
                ctx.fillStyle = 'blue';
            }
            ctx.fillRect(x + latency, y, width, 5);
            if (note.lylic) {
                ctx.save();
                ctx.fillStyle = 'black';
                ctx.translate(x + latency, y);
                ctx.scale(1, -1);
                ctx.fillText(note.lylic, 0, 5);
                ctx.restore();
            }
        });
        ctx.restore();
        this._currentNote = current;
    }

    public getCurrentNote(): Note | null {
        return this._currentNote;
    }

    pushNote(note: number) {
        this._notes.push(note);
        this._notes.shift();
    }

    update(delta: number) {
        this._elapsed += delta;
    }

    render() {
        const ctx = this._canvas.getContext('2d');
        ctx.save();
        ctx.font = '14px monospace';
        ctx.textBaseline = 'top';
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const colors = ['#eee', '#ddd'];
        ctx.scale(1, -1);
        ctx.translate(0, -300);

        this._renderLines(ctx);

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'blue';
        this._renderNotes(ctx);

        this._renderVoice(ctx);

        
        ctx.strokeStyle = 'yellowgreen';
        ctx.beginPath();
        ctx.moveTo(this._screenWidth / 2, 0);
        ctx.lineTo(this._screenWidth / 2, 400);
        ctx.stroke();

        ctx.restore();
        ctx.font = '30px monospace';
        ctx.fillText(this._oct.toString(), 0, 20);
    }

    private _renderVoice(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red';
        this._notes.forEach((note, x) => {
            if (note !== -1) {
                const octav = Math.floor(note / 12) - 4;
                const n = note % 12;
                ctx.fillRect(x, (noteTop[n] * 5) + 150 + (octav * 35) - 2.5, 1, 5);
            }
        });

    }

    public inited(): void {
        this._inited = true;
    }

    private _renderLines(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.moveTo(0, i * 10 + 160)
            ctx.lineTo(this._screenWidth, i * 10 + 160);
        }
        ctx.stroke();
        ctx.strokeStyle = '#ddd';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.moveTo(0, i * 10 + 210);
            ctx.lineTo(this._screenWidth, i * 10 + 210);
            ctx.moveTo(0, i * 10 + 110);
            ctx.lineTo(this._screenWidth, i * 10 + 110);
        }
        ctx.stroke()
    }
}

