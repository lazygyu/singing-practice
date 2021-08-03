import autobind from 'autobind-decorator';
import {EventEmitter} from './EventEmitter';
import {SongArticle} from './SongArticle';


export class SongList extends EventEmitter {
    private _list: SongArticle[] = [];

    private _element: HTMLElement;

    constructor() {
        super();
        this._element = document.createElement('div');
        this._element.classList.add('song-list');
        this._element.addEventListener('click', this._clickHandler);
    }

    set list(v: SongArticle[]) {
        this._list = v.slice();
        this._update();
    }

    @autobind
    private _clickHandler(e: MouseEvent): void {
        let t = e.target as HTMLElement;
        while (t && t.dataset['index'] === undefined) {
            t = t.parentElement;
        }
        if (!t) {
            return;
        }
        const item = this._list[parseInt(t.dataset['index'], 10)];
        this.emit('click', item);
    }

    render(): HTMLElement {
        return this._element;
    }

    private _update(): void {
        this._element.innerHTML = '';
        this._list.map((item, index) => {
            const el = document.createElement('div');
            el.dataset.index = index.toString();
            el.innerHTML = `<h2>${item.title} - ${item.singer}<small>(${item.author})</small></h2>`;
            return el;
        }).forEach(el => this._element.appendChild(el));
    }
}
