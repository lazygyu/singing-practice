export interface Note {
    note: number;
    octav: number;
    length: number;
    start: number;
    lylic?: string;
}

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function parseScore(txt: string): any {
    let octav = 4;
    let len = txt.length;
    let ch: string;
    let tempo = 120;
    let timeDelta = (60 * 1000) / tempo;
    let defaultLength: number = timeDelta;
    let i = 0;
    txt = txt.toUpperCase().replace(/\b/g, '');

    let curTime: number = 0;

    let tmp: string = '';

    const results: Note[] = [];

    function next() {
        i++;
        ch = txt[i];
    }

    function parseNote() {
        const note: Note = {
            note: 0,
            octav: octav,
            length: defaultLength,
            start: curTime
        };

        note.note = noteStrings.indexOf(ch);
        next();
        if (ch === '+' || ch === '-') {
            note.note += ((ch === '+') ? 1 : -1);
            if (note.note < 0) {
                note.octav--;
                note.note += 12;
            } else if (note.note > 11) {
                note.octav++;
                note.note -= 12;
            }
            next();
        }

        tmp = '';
        while (/[0-9]/.test(ch)) {
            tmp += ch;
            next();
        }
        if (tmp.length > 0) {
            note.length = (timeDelta * 4) / parseInt(tmp, 10);
        }
        tmp = '';

        if (ch === '.') {
            note.length *= 1.5;
            next();
        }

        ch = txt[i];
        tmp = '';
        if (ch === '"' || ch ==="'") {
            next();
            while(ch !== '"' && ch !== "'"){
                tmp += ch;
                next();
            }
            next();
            note.lylic = tmp;
        }
        curTime += note.length;
        results.push(note);
    }

    function parseTempo() {
        i++;
        tmp = '';
        ch = txt[i];
        while(/[0-9]/.test(ch)) {
            tmp += ch;
            i++;
            ch = txt[i];
        }
        tempo = parseInt(tmp);
        timeDelta = (60 * 1000) / tempo;
        tmp = '';
    }

    function parseDefaultLength() {
        i++;
        tmp = '';
        while(/[0-9]/.test(txt[i])) {
            tmp += txt[i];
            i++;
        }
        defaultLength = (timeDelta * 4) / parseInt(tmp, 10);
    }

    while(i < len) {
        ch = txt[i];
        switch(ch) {
            case 'T':
                parseTempo();
                break;
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'A':
            case 'B':
            case 'R':
                parseNote();
                break;
            case '>':
                octav = Math.min(8, octav + 1);
                i++;
                break;
            case '<':
                octav = Math.max(0, octav - 1);
                i++;
                break;
            case 'O':
                i++;
                ch = txt[i];
                octav = parseInt(ch);
                break;
            case 'L':
                parseDefaultLength();
                break;
            default:
                i++;
                break;
        }
    }
    return results;
}
