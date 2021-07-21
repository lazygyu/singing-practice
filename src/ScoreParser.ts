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
    let ch: string;
    let tempo = 120;
    let timeDelta = (60 * 1000) / tempo;
    let defaultBit = 4;
    let defaultLength: number = timeDelta;
    let i = 0;
    txt = txt.toUpperCase().replace(/\b/g, '');
    let len = txt.length;

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

        let dots = [1];

        let curState = 0;
        note.note = noteStrings.indexOf(ch);
        next();

        while(i < len) {
            if (['+', '-'].includes(ch)) {
                    note.note += ((ch==='+') ? 1 : -1);
                    if (note.note < 0) {
                        note.octav--;
                        note.note += 12;
                    } else if (note.note > 11) {
                        note.octav++;
                        note.note -= 12;
                    }
                    next();
            } else if (/[0-9]/.test(ch)) {
                tmp = '';
                while (/[0-9]/.test(ch)) {
                    tmp += ch;
                    next();
                }
                if (tmp.length > 0) {
                    note.length = (timeDelta * 4) / parseInt(tmp, 10);
                }
            } else if (ch === '.') {
                dots.push(dots[dots.length - 1] / 2);
                next();
            } else if (/['"]/.test(ch)) {
                next();
                tmp = '';
                while(!/['"]/.test(ch)) {
                    tmp += ch;
                    next();
                }
                note.lylic = tmp;
                console.log(tmp);
                tmp = '';
                next();
            } else {
                break;
            }
        }
        note.length *= dots.reduce((p, v) => p + v, 0);

        curTime += note.length;
        results.push(note);
    }

    function parseTempo() {
        tmp = '';
        next();
        while(/[0-9]/.test(ch)) {
            tmp += ch;
            i++;
            ch = txt[i];
        }
        tempo = parseInt(tmp);
        timeDelta = (60 * 1000) / tempo;
        defaultLength = (timeDelta * 4) / defaultBit;
        tmp = '';
    }

    function parseDefaultLength() {
        i++;
        tmp = '';
        while(/[0-9]/.test(txt[i])) {
            tmp += txt[i];
            i++;
        }
        defaultBit = parseInt(tmp, 10);
        defaultLength = (timeDelta * 4) / defaultBit;
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
