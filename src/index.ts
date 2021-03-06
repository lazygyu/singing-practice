import {App} from './App';
import './style.scss';

export function noteFromPitch(frequency: number): number  {
	var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

const app = new App(document.querySelector('#app'));
