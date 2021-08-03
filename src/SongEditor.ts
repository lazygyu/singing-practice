import autobind from 'autobind-decorator';
import {cEl} from './DOMUtil';
import {EventEmitter} from './EventEmitter';

export class SongEditor extends EventEmitter {
    private btnPlay: HTMLButtonElement;
    private btnStop: HTMLButtonElement;
    private btnSave: HTMLButtonElement;
    private btnUpload: HTMLButtonElement;
    private chkMelody: HTMLInputElement;
    private inVolume: HTMLInputElement;
    private inScore: HTMLTextAreaElement;
    private btnKeyUp: HTMLButtonElement;
    private btnKeyDown: HTMLButtonElement;
    private inKey: HTMLInputElement;

    private element: HTMLDivElement;

    constructor() {
        super();
        this.initElements();
    }

    private initElements(): void {
        this.btnPlay = cBtn('Play');
        this.btnStop = cBtn('Stop');
        this.btnSave = cBtn('Save');
        this.btnUpload = cBtn('Upload');
        this.btnKeyUp = cBtn('Key Up');
        this.btnKeyDown = cBtn('Key Down');



        this.inKey = cEl('input', {type: 'number', value: '0'});

        this.chkMelody = cEl('input', {type: 'checkbox', checked: true});
        const chkLabel = cEl('label', {}, 'play melody');
        chkLabel.appendChild(this.chkMelody);

        this.inVolume = cEl('input', {type: 'range', min: 0, max: 100, value: 30, step: 1});

        this.inScore = cEl('textarea', {class: 'inScore'});

        this.element = cEl('div', {class: 'song-editor'}, [
            chkLabel,
            this.inVolume,
            this.btnKeyDown,
            this.inKey,
            this.btnKeyUp,
            this.inScore,
            this.btnPlay,
            this.btnStop,
            this.btnSave,
            this.btnUpload,
        ]);

        this.btnPlay.addEventListener('click', e => { this._clickHandler('play'); });
        this.btnStop.addEventListener('click', e => { this._clickHandler('stop'); });
        this.btnKeyDown.addEventListener('click', e => { this._clickHandler('key-down'); });
        this.btnKeyUp.addEventListener('click', e => { this._clickHandler('key-up'); });

        this.chkMelody.addEventListener('input', e => {
            this.emit('change', 'melody', this.chkMelody.checked);
        });
        this.inVolume.addEventListener('input', e => {
            this.emit('change', 'volume', parseInt(this.inVolume.value, 10) / 100);
        });
    }

    public set key(v: number) {
        this.inKey.value = v.toString();
    }

    public get key(): number {
        return parseInt(this.inKey.value, 10);
    }

    @autobind
    private _clickHandler(type: string): void {
        this.emit(type);
    }

    public render(): HTMLElement {
        return this.element;
    }

    public get score(): string {
        return this.inScore.value;
    }

    public set score(v: string) {
        this.inScore.value = v;
    }
}

function cBtn(text: string): HTMLButtonElement {
    return cEl<HTMLButtonElement>('button', {}, text);
}