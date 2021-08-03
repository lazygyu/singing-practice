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

    let lastNote: Note | null = null;

    const results: Note[] = [];

    function next() {
        i++;
        ch = txt[i];
    }

    function parseNote() {
        let note: Note = {
            note: 0,
            octav: octav,
            length: defaultLength,
            start: curTime
        };

        let dots = [1];
        let curState = 0;
        let legato = false;
        note.note = noteStrings.indexOf(ch);
        next();

        while(i < len) {
            if (['+', '#', '-'].includes(ch)) {
                note.note += ((ch !== '-') ? 1 : -1);
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
                while (!/['"]/.test(ch)) {
                    tmp += ch;
                    next();
                }
                note.lylic = tmp;
                tmp = '';
                next();
            } else if (ch === '&') {
                legato = true;
                next();
            } else {
                break;
            }
        }
        let notelen = 0;
        dots.forEach(l => {
            notelen += l * note.length;
        });
        note.length = notelen;

        if (lastNote && lastNote.note === note.note && lastNote.octav === note.octav) {
            lastNote.length += note.length;
            note = lastNote;
        } else {
            results.push(note);
        }
        lastNote = null;

        if (legato) {
            lastNote = note;
        }

        curTime += notelen;
    }

    function parseStringLylic() {
        tmp = '';
        next();
        while (']' !== ch) {
            tmp += ch;
            next();
        }
        const len = tmp.length;
        if (len === 0) return;
        let cnt = 0;
        let start = 0;
        for (let i = results.length - 1; i >= 0; i--) {
            if (results[i].note !== -1) {
                cnt++;
            }
            if (cnt === len || i === 0) {
                start = i;
                break;
            }
        }
        for (let i = 0, cur = 0; cur < len && start + i < results.length; i++) {
            if (results[i].note === -1) continue;
            results[start + i].lylic = tmp[cur];
            cur++;
        }
        tmp = '';
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
            case '[':
                parseStringLylic();
                break;
            default:
                i++;
                break;
        }
    }
    return results;
}
