import {Note} from './ScoreParser';
const noteTop =   [  0,  0.5,   1,  1.5,   2,  3,   3.5,   4,  4.5,   5,  5.5,  6];

export class ScoreDrawer {
    private _canvas: HTMLCanvasElement;
    private _notes: number[];
    private _oct: number = 0;
    private _elapsed = 0;
    private _lastTime = 0;

    private _playScore: Note[] = [];

    constructor() {
        this._canvas = document.createElement('canvas');
        this._canvas.width = 600;
        this._canvas.height = 400;

        this._notes = new Array(300).fill(-1);
        document.body.insertBefore(this._canvas, document.body.children[0]);
        document.addEventListener('keydown', this._keydown.bind(this));
    }

    start(notes: Note[]): void {
        this._playScore = notes.slice();
        console.log(this._playScore);
        this._elapsed = 0;
    }

    stop(): void {
        this._playScore = [];
    }

    private _keydown(e: KeyboardEvent) {
        switch (e.code) {
            case 'ArrowDown':
                this._oct--;
                break;
            case 'ArrowUp':
                this._oct++;
                break;
            case 'Num0':
                this._oct = 0;
                break;
            case 'ArrowLeft':
                this._elapsed -= 100;
                break;
            case 'ArrowRight':
                this._elapsed += 100;
                break;
        }
    }

    private _renderNotes(ctx: CanvasRenderingContext2D): void {
        const fps = (1000/60);
        const screenLength = 600;
        const screenTime = screenLength * fps;

        this._playScore.forEach(note => {
            // if (note.start - this._elapsed > screenTime) return;
            // if (note.start + note.length < this._elapsed) return;
            if (note.note === -1) return;

            const x = (note.start - this._elapsed) / fps + screenLength;
            const y = (noteTop[note.note] * 5) + ((note.octav - 3) * 35) + 150 + (this._oct * 5) - 2.5;
            const width = (note.length) / fps - 1;
            ctx.fillRect(x, y, width, 5);
            if (note.lylic) {
                ctx.save();
                ctx.fillStyle = 'black';
                ctx.translate(x, y);
                ctx.scale(1, -1);
                ctx.fillText(note.lylic, 0, 5);
                ctx.restore();
            }
        });
    }

    pushNote(note: number) {
        this._notes.push(note);
        this._notes.shift();
    }

    update(timestamp: number) {
        if (this._lastTime === 0) {
            this._lastTime = timestamp;
        }
        const delta = timestamp - this._lastTime;
        this._lastTime = timestamp;
        this._elapsed += delta;
        const ctx = this._canvas.getContext('2d');
        ctx.save();
        ctx.font = '14px monospace';
        ctx.textBaseline = 'top';
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const colors = ['#eee', '#ddd'];
        ctx.strokeStyle = 'black';
        ctx.scale(1, -1);
        ctx.translate(0, -250);

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.moveTo(0, i * 10 + 160)
            ctx.lineTo(600, i * 10 + 160);
        }
        ctx.stroke();
        ctx.strokeStyle = '#ddd';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.moveTo(0, i * 10 + 210);
            ctx.lineTo(600, i * 10 + 210);
            ctx.moveTo(0, i * 10 + 110);
            ctx.lineTo(600, i * 10 + 110);
        }
        ctx.stroke()
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'blue';
        this._renderNotes(ctx);

        ctx.fillStyle = 'red';
        this._notes.forEach((note, x) => {
            if (note !== -1) {
                const octav = Math.floor(note / 12) - 4;
                const n = note % 12;
                ctx.fillRect(x, (noteTop[n] * 5) + (this._oct * 5) + 150 + (octav * 35) - 2.5, 1, 5);
            }
        });

        ctx.strokeStyle = 'yellowgreen';
        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);
        ctx.stroke();


        ctx.restore();
        ctx.font = '30px monospace';
        ctx.fillText(this._oct.toString(), 0, 20);
    }

}

