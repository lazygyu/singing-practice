import {ScoreDrawer} from './ScoreDrawer';
import {ToneDetector} from './ToneDetector';
import {ToneGenerator} from './ToneGanerator';
import autobind from 'autobind-decorator';
import {Note} from './ScoreParser';
import {Sharer} from './Sharer';
import {SongArticle} from "./SongArticle";

const UPDATE_INTERVAL = 1000 / 60;

export class App {
    private detector: ToneDetector;
    private drawer: ScoreDrawer;
    private player: ToneGenerator;
    private wrapper: HTMLElement;

    private lastTime: number = 0;
    private elapsed: number = 0;

    private audio: AudioContext;
    private inited: boolean = false;

    private key: number = 0;
    private playMusic: boolean = true;

    private sharer: Sharer = new Sharer();

    constructor(appContainer: HTMLElement) {
        
        this.drawer = new ScoreDrawer();
        this.createElements();
        appContainer.appendChild(this.wrapper);
        requestAnimationFrame(this._loop);
    }

    private createElements(): void {
        const wrapper = document.createElement('div');

        const canvasContainer = document.createElement('container');
        const canvas = this.drawer.renderElement();
        canvasContainer.appendChild(canvas);
        this.drawer.start([]);

        wrapper.appendChild(canvasContainer);

        wrapper.appendChild(this.sharer.render());
        this.wrapper = wrapper;
        this.bindEvents();
    }

    private bindEvents(): void {
        this.sharer.on('song-select', this._songSelected);
    }

    private _songSelected(song: SongArticle) {
        (<HTMLTextAreaElement>document.querySelector('#inScore')).value = song.score;
    }

    public init(): void {
        this.audio = new AudioContext();
        this.detector = new ToneDetector(this.audio);
        this.player = new ToneGenerator(this.audio);

        this.detector.on('note', this._onNote);
        this.detector.on('inited', this._detectorInited);

        this.detector.start();
        this.drawer.start([]);
    }

    @autobind
    private _detectorInited(): void {
        this.drawer.inited();
        this.inited = true;
    }

    public playSong(notes: Note[]): void {
        this.drawer.start(notes);
    }

    public stopSong(): void {
        this.drawer.start([]);
    }

    @autobind
    private _onNote(note: number): void {
        this.drawer.pushNote(note);
    }

    @autobind
    private _loop(time: number): void {
        if (this.lastTime === 0) {
            this.lastTime = time;
        }
        const delta = time - this.lastTime;
        this.elapsed += delta;
        this.lastTime = time;

        while (this.elapsed > UPDATE_INTERVAL) {
            this._update(UPDATE_INTERVAL);
            this.elapsed -= UPDATE_INTERVAL;
        }

        this._render();
        requestAnimationFrame(this._loop);
    }

    private _update(delta: number): void {
        if (!this.inited) return;

        this.detector.update(delta);
        this.drawer.update(delta);
        if (this.playMusic) {
            const note = this.drawer.getCurrentNote();
            this.player.playNote(note, this.key);
        }
    }

    private _render(): void {
        this.drawer.render();
    }

    public setVolume(v: number): void {
        this.player.setVolume(v);
    }

    public toggleSound(force?: boolean): void {
        if (force === undefined) {
            this.playMusic = !this.playMusic;
        } else {
            this.playMusic = force;
        }
        if (!this.playMusic) {
            this.player.playTone(0);
        }
    }

    public keyUp(): void {
        this.setKey(this.key + 1);
    }

    public keyDown(): void {
        this.setKey(this.key - 1);
    }

    public setKey(key: number): void {
        this.key = key;
        this.drawer.octav = this.key;
    }
}
