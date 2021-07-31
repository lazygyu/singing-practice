import {App} from './App';
import {parseScore} from './ScoreParser';
import './style.scss';

export function noteFromPitch(frequency: number): number  {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

const app = new App(document.querySelector('#app'));
(window as any).app = app;

let inited = false;
document.querySelector('#btnStart').addEventListener('click', _ => {
    if (!inited) {
        app.init();
        inited = true;
    }
    const txt = (document.querySelector('#inScore') as HTMLTextAreaElement).value;
    const notes = parseScore(txt);
    app.playSong(notes);
});

document.querySelector('#btnStop').addEventListener('click', () => {
    if (!inited) return;
    app.stopSong();
});

const volume = document.querySelector('#inVolume') as HTMLInputElement;
const chkPlay = document.querySelector('#chkTone') as HTMLInputElement;
const inKey = document.querySelector('#inKey') as HTMLInputElement;

volume.addEventListener('input', () => {
    const v = parseInt(volume.value, 10) / 100;
    app.setVolume(v);
});

chkPlay.addEventListener('input', () => {
    const chk = chkPlay.checked;
    app.toggleSound(chk);
});

inKey.addEventListener('input', () => {
    const k = parseInt(inKey.value, 10);
    app.setKey(k);
});