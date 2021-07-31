import autobind from 'autobind-decorator';
import {EventEmitter} from './EventEmitter';
import {SongArticle} from './SongArticle';

const articles = [
    {
        title: '애국가',
        singer: '',
        author: 'nobody',
        score: `t60 o3 l4
d'동'g.'해'f+8'물'e'과' g'백'd'두'c-'산'd'이' g'마'a8'르'b8'고'b+.'닳'b8'도' a2'록'.r
>d.'하'c8'느'<b'님'a'이' g'보'f+8'우'e8d'하'c-'사' d'우'g'리'a8'나'a8'라'b'만' g2.'세'r
f+.'무'g8a'궁'f+'화' b.'삼'>c8d'천'<b'리' a'화'g'려'f+'강'g a2.'산'r
>d.'대'c8'한'<b'사'a'람' g'대'f+8'한'e8d'으'c-'로' d'길'g'이'a8'보'a8'전'b'하'g2.'세'r`
    },
    {
        title: '안녕(sample)',
        singer: '박혜경',
        author: 'nobody',
        score: `t80 l8 o4
>c#'외'<e'로'e'운'e'날'e16'들'f#16'이'&f#16e.'여'
d#'모'd#16'두'd#16'다'&d#16>c#'안'<b16'녕'&b4rb'내'
>c#'머'<d16'리'd16'속'&d16 d.'에'd'눈'd16'물'e'들'd.'도'
c#'이'c#16'제'c#16'는'&c#16b'안'a16'녕'&a4rb'오'
r>c#'어'<f#'제'f#'의'f#'너'f#16'는'g#'바'a'람'b16'을'&
b>c#16'타'<b16&'고'b>c#16'멀'<b16'리'&b16a16f#rf#'후'
>d'회'c#'도'<b16'없'a'이'a16'미'&af#'련'g#16'없'a'이'a16'날'&
a4.>c'아'<b4.'가'a'굿'
a2.'바이' f#16'오'a'오'a16'오'&
a2. f#'영'a'원'
a2.'히' f#16'워'a'오'a16'오'&a2.r4`
    },
    {
        title: '응급실',
        singer: 'Izi',
        author: 'nobody',
        score: `t72 o3 l8
<b-'후'>
g4'회'r4 b-'하'a-16'고'g16'있'&gf'어'&
fd'요'&d4r4. <g'우'>
g'리'r4a-'다'g16'투'f16'던'&fe-'그'
>cc'날'&c4r4.<b-'괜'
>c4'한'r c'자'd'존'<b-'심'g'때'a-16'문'b-16'에'&
b-4r>d-'끝'c'내'<g'자'f'고'g16'말'a-16'을'&
a-4r4a-'해'b-16'버'>c16'린'&c<b-'거'&
b-f'야'&f4r4.<b-'금'>

g4'방'r4b-'볼'a-16'줄'g16'알'&gf'았'&
fd'어'&d4r2
g4'날'r4a-'찾'g16'길'f16'바'&fe-'랬'
>cc'어'&c4r4.<b-'허'
>c4'나'r c'며'd'칠'<b-'이'g'지'a-16'나'b-16'도'&
b-4 r>d-'아'c'무'<g'소'f'식'g'조'
b-'차'a-r g16'없'f16 f4'어' r4

r e-'항'f'상'e-16'내'f16'게'&fe- r. <b-16'너'>
a-'무'g'잘'f'해'e-'줘'&e-<b-'서'&b-4>
r4 l16f'쉽'gf'게'f'생'& l8 f f'각'g'했'a-16'나'a-16'봐'&
a-g&g4r2
r e-'이'f'젠'e-16'알'f16'아'&fe- r. <b-16'내'>
g'고'b-'집'b-'때'>c'문'&c<g'에'&g4
b-'힘'a-'들'g'었'a-'던'&a-4 >g'너'g'를'&
gf&f2r4

<b-'이'>l16e-'바'e-'보'&e-8f'야'f'진'&f8g'짜'g'아'&g<b-b-'니'>c'야'&
c<b-8.&b-4r2
l8>c'아'e-'직'e-'도'f16'나'e-16'를'&e-4r a-'그'&
a-g'렇'f16'게'e-16e-'몰'&e-<b-'라'&b-4

>c'너'<b16'를'>c16'가'&ce-'진'f.'사'e-16e-4'랑'
<b-'나'a16'밖'b-16'엔'&b->d'없'f.'는'e-16e-4'데'
r2c'제'd16'발'e-16'나'&e-16f.'를'
g.'떠'f16f4'나'e-.'가'd16d.'지'e-16e-2'마'r2

r< e-'언'f'제'e-16'라'f16'도'&fe- r. <b-16'내'>
a-'편'g'이'f'돼'e-'준'&e-<b-'너'&b-4>
r4 l16f'고'gf'마'f'운'& l8 f f'준'g'모'a-16'르'a-16'고'&
a-g&g4r2
r e-'철'f'없'e-16'이'f16'나'&fe- r. r16
g'멋'b-'대'b-'로'>c'한'&c<g'거'&g4
b-'용'a-'서'g'할'a-'수'&a-4 >g'없'g'니'&
gf&f2r4

<b-'이'>l16e-'바'e-'보'&e-8f'야'f'진'&f8g'짜'g'아'&g<b-b-'니'>c'야'&
c<b-8.&b-4r2
l8>c'아'e-'직'e-'도'f16'나'e-16'를'&e-4r a-'그'&
a-g'렇'f16'게'e-16e-'몰'&e-<b-'라'&b-4

>c'너'<b-16'를'>c16'가'&ce-'진'f.'사'e-16e-4'랑'
<b-'나'a-16'밖'b-16'엔'&b->d'없'f.'는'e-16e-4'데'
r2c'제'd16'발'e-16'떠'&e-f'나'

g4'가'a-'지'f'마'&f4r4
<b-'너'>e-16'하'e-16'나'&e- f16'만'f16'사'&fg16'랑'g16'하'&g16<b-16b-16'는'>c16'데'&
c16<b-.&b-4r2
>c'이'e-'대'e-'로'f16'나'e-16'를'&e-4r a-'두'&
l16a-gg'고'f f'가'e-e-'지'g'마'&gf+g8&g4
l8 c'나'<b16'를'>c16'버'&cd'리'f.'지'e-16e-4'마'
<b-'그'a16'냥'b-16'날'&b-16>b-'안'a-16 a-'아'g16g16'줘'&g4
r2 c'다'd16'시'e-16'사'&e-16f.'랑'
g.'하'f16 f4'게' e-.'돌'd16 d4'아'
f'와'e-&e-4`
    },
    {
        title: '애인있어요(1절)',
        singer: '이은미',
        author: 'sample',
        score: `t70 o4 l8
r <b'아'b'직'b'도'>d4.'넌' d'혼'
<g4.'잔'g16'거'b16'니'&b4r b'물'
e4'어're16'오'a16'네'g4'요' d.'난'g16'그'
g4'저' f#.'웃'g16'어'a4'요'
rb'사'b'랑'b'하'>d4.'고'd'있'
g2'죠'r.g16'사'f#.'랑'g16'하'
e4'는'ra'사'g4'람'f#4'있'g16'어'g.'요'&g4&g4rd16'그'd16'대'
e'는'e16'내'e16'가'&e4 r f#'안'g16'쓰'f#'러'e16'운'
e'건'd16'가'd16'봐'&d4 r e16'좋'f#16-'은'&f#-16e'사'd16'람'
l12d'있'c'다'c'며'&l8c c16'한'd16'번'&d16e'만'e16'나'&ed16'보'<a16'라'>
c'말'<b16'하'b16'죠'&b4r4 r >d16'그'd16'댄'
e-'모'e16-'르'e16-'죠'&e4- r16 g'내'g16'게'l12g'도'a'멋'g'진'l8
b'애'a16'인'a16'이'&a16g.'있' f#'다'e16'는'e16'걸'&e4
e'너'e16'무'e16'소'&e16f#'중'g16'해'&g.e16'꼭'&l12ef#'숨'g'겨'l8
g4'두'&g16a'었'a16'죠'&a4 g'그'a'사'
b2'람'>c'나'c16'만'<b16'볼'&ba16'수'a16'있'&
ag16'어'g16'요'&g4 >c'내'c16'눈'<b.'에'a16'만'a16'보'&
l12ag'여'g'요'&l16gg'내'g'입'g'술'g4'에'rg'영'f##'원'g'히'l8
g.'담'a.'아'b'둘'b'거'a16a.'야' g16'가'a16'끔'&
a16b.'씩'r l16b'차'b'오'>c8'르'c'는'd'눈'&d<b-'물'a8l8
a16'만'g. g'알'a16'고'b16'있'&b16>e.'죠'&e4
<r4e'그'f#16'사'g16'람'&g16g'그'f#16'대'&f#.e16'라'
f#'는'g4.'걸'&g2`
    },
    {
        title: '가시(1절)',
        singer: '버즈',
        author: 'sample',
        score: `t72 l8 o3
g#'너'b'없'b'는'g#16'지'>c#.'금'<b'도'&b.>d#16'눈'
e.'부'd#16'신'c#'하'<g#16'늘'>c#16&'과'c#4r4
<g#'눈'b'부'b'시'b16'게'>c#16'웃'&c#<b'는'g#'사'f#16'람'g#16'들'&g#2r2

g#'나'b'의'b'헤'g#16'어'>c#16'짐'&c#<b'을'&b.>d#16'모'
e'르'd#'는'c#'세'<g#16'상'>c#16'은'&c#4r4
<g#'슬'b16'프'b16'도'&bb'록'>c#'그'<b'대'g#'로'f#16'인'g#16'데'&g#2r2

r4>c#'시'e'간'd#'마'd#16'저'e16'데'&ef#'려'
<b'가'g#'지'b'못'b16'하'>c#16'게'&c#4r4
c#16'나'e16'만'e'은' e'널'e16'보'd#16'내'&d#e'지'd#'못'<b'했'
b16'나'>c#16<b'봐'&b2r4
r4>c#'가'e'시'd#'처'd#16'럼'e16'깊'&ef#'게'
g#'박'g#16'힌'f#16 f#'기'g#16'억'g#16'은'e4<r4

a'아'a16'파'a16'도'&a4 b'아'b16'픈'b16'줄'&b16g#'모'b16'르'>c#2'고'<r2

b.'그'b16'대'>e16'기'f#16'억'g#'이'&g#4r4
<b#.'지'b16'난'>e16'사'f#16'랑'g#'이'&g#4rf#'내'
f#'안'e'을'&e d#16'파'e16'고'f#'드'e'는'rf#'가'
g#4'시'&g#16f#16f#16'가'e16'되'f#4'어'<r4

b.'제'b16'발'>e16'가'f#16'라'g#'고'&g#4r4
<b#.'아'b16'주'>e16'가'f#16'라'g#'고'&g#4rf#'애'
f#'써'e16e16'도'&e d#16'나'e16'를'f#'괴'e'롭'd#'히'd#16'는'd#16'데'e2.r4
`
    },
];


export class SongList extends EventEmitter {
    private _list: SongArticle[] = [];

    private _element: HTMLElement;

    constructor() {
        super();
        this._element = document.createElement('div');
        this._element.classList.add('song-list');
        this._element.addEventListener('click', this._clickHandler);
        this.list = articles;
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
