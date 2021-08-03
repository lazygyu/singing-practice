import autobind from 'autobind-decorator';
import {EventEmitter} from './EventEmitter';
import {FileModel, Model} from './model';
import {SongArticle} from './SongArticle';
import {SongList} from './SongList';

export class Sharer extends EventEmitter {
    private _searchInput: HTMLInputElement;
    private _wrapper: HTMLDivElement;
    private _list: SongList = new SongList();

    private model: Model = new FileModel();

    constructor() {
        super();

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('sharer');

        this._searchInput = document.createElement('input');
        this._searchInput.type = 'search';
        this._searchInput.placeholder = '검색어를 입력하세요';

        this._wrapper.appendChild(this._searchInput);
        this._wrapper.appendChild(this._list.render());

        this._list.on('click', this._listClick);
        
        this._list.list = this.model.getLatest();
    }

    render(): HTMLElement {
        return this._wrapper;
    }

    @autobind
    private _listClick(target: SongArticle): void {
        this.emit('song-select', target);
    }
}

