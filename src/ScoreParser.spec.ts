import {Note, parseScore} from './ScoreParser';

describe('ScoreParser', () => {
    it('empty string returns empty array', () => {
        const input = '';

        const result = parseScore(input);

        expect(result).toEqual([]);
    });

    it('check default values', () => {
        const input = 'a';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 9, length: 500, octav: 4, start: 0}
        ]);
    });

    it('change tempo', () => {
        const input = 't60 a';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 9, length: 1000, octav: 4, start: 0}
        ]);
    });

    it('change octav', () => {
        const input = 'o3 a o4 a o0 a >a <a';
        
        const result = parseScore(input);

        expect(result).toEqual([
            {note: 9, length: 500, octav: 3, start: 0},
            {note: 9, length: 500, octav: 4, start: 500},
            {note: 9, length: 500, octav: 0, start: 1000},
            {note: 9, length: 500, octav: 1, start: 1500},
            {note: 9, length: 500, octav: 0, start: 2000},
        ]);
    });

    it('change length', () => {
        const input = 'l8 a l4 a l16 a';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 9, length: 250, octav: 4, start: 0},
            {note: 9, length: 500, octav: 4, start: 250},
            {note: 9, length: 125, octav: 4, start: 750},
        ]);
    });

    it('dots', () => {
        const input = 'a. a.. a... a8. a16.';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 9, length: 500 + 250, octav: 4, start: 0},
            {note: 9, length: 500 + 250 + 125, octav: 4, start: 750},
            {note: 9, length: 500 + 250 + 125 + 62.5, octav: 4, start: 750 + 875},
            {note: 9, length: 250 + 125, octav: 4, start: 750 + 875 + 937.5},
            {note: 9, length: 125 + 62.5, octav: 4, start: 750 + 875 + 937.5 + 375},
        ])
    });

    it('plus', () => {
        const input = 'a+ a++ a+++';
        
        const result = parseScore(input);

        expect(result).toEqual([
            {note: 10, length: 500, octav: 4, start: 0},
            {note: 11, length: 500, octav: 4, start: 500},
            {note: 0, length: 500, octav: 5, start: 1000},
        ])
    });

    it('minus', () => {
        const input = 'd- d-- d---';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 1, length: 500, octav: 4, start: 0},
            {note: 0, length: 500, octav: 4, start: 500},
            {note: 11, length: 500, octav: 3, start: 1000},
        ]);
    });

    it('number length', () => {
        const input = 'c1 c2 c3 c4 c8 c16 c32 c64';

        const result = parseScore(input);

        let start = 0;
        function makeNote(length: number): Note {
            const note = {note: 0, length, octav: 4, start};
            start += length;
            return note;
        }

        expect(result).toEqual([
            makeNote(2000),
            makeNote(1000),
            makeNote(2000 / 3),
            makeNote(500),
            makeNote(250),
            makeNote(125),
            makeNote(62.5),
            makeNote(31.25),
        ]);
    });

    it('ignore illegal characters', () => {
        const input = 'hi? c안녕하세요';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 0, length: 500, octav: 4, start: 0}
        ]);
    });

    it('legato makes two same note to one', () => {
        const input = 'c&c8';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 0, length: 750, octav: 4, start: 0}
        ]);
    });
    it('legato does not make two different note to one', () => {
        const input = 'c&d8';

        const result = parseScore(input);

        expect(result).toEqual([
            {note: 0, length: 500, octav: 4, start: 0},
            {note: 2, length: 250, octav: 4, start: 500},
        ]);
    });

});