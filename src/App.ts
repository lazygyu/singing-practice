import {ScoreDrawer} from './ScoreDrawer';
import {ToneDetector} from './ToneDetector';
import {ToneGenerator} from './ToneGanerator';
import autobind from 'autobind-decorator';
import {Note, parseScore} from './ScoreParser';
import {Sharer} from './Sharer';
import {SongArticle} from "./SongArticle";
import {SongEditor} from './SongEditor';
import {createElem} from './DOMUtil';

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

    private songEditor: SongEditor = new SongEditor();

    private blind: HTMLDivElement;

    constructor(appContainer: HTMLElement) {
        
        this.drawer = new ScoreDrawer();
        this.createElements();
        appContainer.appendChild(this.wrapper);
        requestAnimationFrame(this.loop);
    }

    private createElements(): void {
        this.blind = createElem('div', {class: 'blind'}, 'Click to start app');
        const wrapper = createElem('div', {});

        const canvasContainer = createElem('div', {});
        const canvas = this.drawer.renderElement();
        canvasContainer.appendChild(canvas);
        this.drawer.start([]);

        wrapper.appendChild(canvasContainer);

        wrapper.appendChild(this.songEditor.render());
        wrapper.appendChild(this.sharer.render());
        this.wrapper = wrapper;
        this.bindEvents();
        document.body.appendChild(this.blind);
    }

    private bindEvents(): void {
        this.sharer.on('song-select', this.songSelected);

        this.songEditor.on('play', async _ => {
            if (!this.inited) return;
            this.playSong(parseScore(this.songEditor.score));
        });
        this.songEditor.on('stop', this.stopSong);
        this.songEditor.on('key-up', this.keyUp);
        this.songEditor.on('key-down', this.keyDown);
        this.songEditor.on('change', (prop, value) => {
            switch (prop) {
                case 'melody':
                    this.toggleSound(value);
                    break;
                case 'volume':
                    this.setVolume(value);
                    break;
            }
        });

        this.blind.addEventListener('click', async _ => {
            await this.init();
            this.blind.style.display = 'none';
        });
    }

    @autobind
    private songSelected(song: SongArticle) {
        this.songEditor.score = song.score;
    }

    public init(): Promise<void> {
        return new Promise((rs) => {
            this.audio = new AudioContext();
            this.detector = new ToneDetector(this.audio);
            this.player = new ToneGenerator(this.audio);

            this.detector.on('note', this.onNote);
            this.detector.on('inited', () => {
                this.inited = true;
                this.drawer.inited();
                rs();
            });
            this.detector.start();
            this.drawer.start([]);
        });
    }

    public playSong(notes: Note[]): void {
        this.drawer.start(notes);
    }

    @autobind
    public stopSong(): void {
        this.drawer.start([]);
    }

    @autobind
    private onNote(note: number): void {
        this.drawer.pushNote(note);
    }

    @autobind
    private loop(time: number): void {
        if (this.lastTime === 0) {
            this.lastTime = time;
        }
        const delta = time - this.lastTime;
        this.elapsed += delta;
        this.lastTime = time;

        while (this.elapsed > UPDATE_INTERVAL) {
            this.update(UPDATE_INTERVAL);
            this.elapsed -= UPDATE_INTERVAL;
        }

        this.render();
        requestAnimationFrame(this.loop);
    }

    private update(delta: number): void {
        if (!this.inited) return;

        this.detector.update(delta);
        this.drawer.update(delta);
        if (this.playMusic) {
            const note = this.drawer.getCurrentNote();
            this.player.playNote(note, this.key);
        }
    }

    private render(): void {
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

    @autobind
    public keyUp(): void {
        this.setKey(this.key + 1);
    }

    @autobind
    public keyDown(): void {
        this.setKey(this.key - 1);
    }

    public setKey(key: number): void {
        this.key = key;
        this.songEditor.key = key;
        this.drawer.octav = this.key;
    }
}
