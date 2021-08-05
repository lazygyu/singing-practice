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
    {
        title: '체념(1절)',
        singer: '빅마마',
        author: 'sample',
        score: `t75 o4 l16
e-8'행'
d-4.'복'c8'했'c4'어' c8'너'd-'와'e-'의'
e-4.'시'<b-8'간'b-4'들'r8 a-'아'b-'마'
>c4.'도'<a-'너'b-'는'>c8'힘'<b-8'들'a-8.'었'g'겠'&
g8f4.'지'r4. g'너'a-'의'
b-4.'마'g'음'a-'을'&a-4r8b-'몰'>c'랐'
d-8'던'c8'건'<b-8'아'a-'니'a-'야'&a-4r8 b-'나'>c'도'
d-8'느'c8'꼈'<b-8'었'a-'지'a-'만'b-4 r8 >e-8'널'
d-4'보'&d-d-'내'e-'는'c'게'&c4 c8'널'd-'떠'e-'나'
e-4'보'&e-e-'내'f'는'<b-'게'&b-4 r8 a-'아'b-'직'
>c4.'은'<a-'익'b-'숙'>c8'하'<b-8'지'a-8.'가'>c'않'&
c8<f4.'아'r4. g'그'a-'렇'
b-4'게'b->c8'밖'c'에'&c<b-a-8 r8 b-'할'>c'수'
d-8'없'c8'던'<b-8'니'a-'가'a-'원'&a-8>c'망'<b-'스'&b-4&
b-a-'러'a-8'워'r4 r4
a-8'왜'>a-8'말'g4.'안'f'했'f'니'&f4 r8 f'아'f'님'
f4'못'&fg'한'e-'거'f'니'&e4- r8 <b-'조'>c'금'
c8'도'd-'날'd-'생'&d-8f'각'f'하'&f8g'지'e-'않'&e-d-'았'e-e-'니'&
e-2 r4 <a-8'좋'>a-8'아'
g4.'한'f'다'f'면'&f4. f8'사'
e-8.'랑'e-'한'&e-b-8'다'a- a-4'면' r8 f'이'a-'렇'
b-8'게'a-'끝'b-'낼'&b-a-a-'거'b-'면'&b-a-a-8'서'r8 e-'왜'a-'그'
>c8'런'<b-'말'a-'을'&a-a-'했'b-b-'니'&b-4 r8 e-8'널'
>d-4.'미'c8'워'<b-8'해'a-8'야'a-'만'gg'하'b-'는'&
b-4b-a-a-'거'a-'니'&a-4 r8 a-'아'g'니'
f8.'면'>c'내'&c<b-b-'탓'e-'을'&e-4. b-'해'>c'야'
d-8'만'c'하'<b-'는'&b-a-'거'b-b-'니'&b-4 r8 e-8'시'
>d-4.'간'c8'을'<b-8'돌'a-8'릴'a-'수'gg'만'b-'있'&
b-4&b->c8'다'c'면'&c<b-a-8 r8 a-'다'g'시'
f8.'예'>c'전'&c<b-b-'으'e-'로'&e-4. b-'돌'>c'아'
d-8'가'c'고'<b-'싶'&b-8a-'은'a-'마'&a-8f'음'g'뿐'&g8a-'이'a-'야'&
a-2`

    },
    {
        title: '천년의사랑',
        singer: '박완규',
        author: 'sample',
        score: `t66 o3 l8
>c4<ef&f4rf[이대로널]
ebbe b>c16c16&c4[보낼수는없다고]
<a4agfre[밤을세워간]
df>dc c<b16b16&b4[절히기도했지만]
>c4<ef&f4 r f[더이상널]
ebbe b>c16c16&c16e16e16e16&[사랑할수없다면차라리]
ef16<a16&a4 r a4g#[나도데려]
a2.r4[가]
>f2rffg[내마지막]
fe16e16&e4r2[소원은]
l16 d8dd&d8ef&f8ed&d<b8. [하늘이끝내모른척]
>c8<b>c&cdee&e8<a8>c8e8[저버린대-도불꽃처]
f4 r fga8gg&g8ff&[럼꺼지지않는사랑]
f8ee*e4r2[으로]
f8fg&g8a8 d8de&e8f8[영원히넌가슴속에]
r8 aab8ab*b4 r8 e8[타오를테니나]
>c4c8cc&c4r8d8[를위해서눈]
<b8a8g8f8 d8ee&e4 [물도참아야했던]
f8fg&g8ad&d8de&e8f8[그동안에넌얼마나]
r8aab8ab&b4r8e8[힘이들었니천]
>c4c8cc&c4r8d8[년이가도나]
<b8a8g8f8 d8ee&e4[너를잊을수없어]
l8 ffga>c4<b.a16[사랑했기때문 ]
a1[에]`
    },
    {
        title: '말리꽃',
        singer: '이승철',
        author: 'sample',
        score: `t70 o3 l8

e[얼]
>c4<b>c&c<bag[마나더견뎌야]
b4.a16a16&a4. g16a16[하는지짙은]
b>d16d16&d4 d<b16>d16&de [어둠을헤매고있]
<b16a16g4.r4r>d[어--내]
c4<b>c&c<bag[가바란꿈이라]
b4.a16a16&a4r4[는것은]
rd16>c16&c4&c4.d[없는걸]
<b2r4re[까더]
>c4<b>c&c<bag[이상은견딜수]
b4.a16a16&a4. g16a16[없는것지친]
b>d16d16&d4 d<b16>d16&de [두눈을뜨는것마]
<b16a16g4.r4r>d[저--긴]
c4<b>c&c<bag[한숨을내쉬는]
b4.a16a16&a4r4[것조차]
r>c16c16&c4&c4.d[난힘들]
<b2r2[어]

>r4eeee<b16a16g[이렇게난쓰-러]
ab4b&b2[진채로]
r4>ee16e16&ee<b16a16g&g[끝나는건아-닐]
>e4.&e3f#3g3[까항상]
edd<b16>g16&g4r4[두려웠지만]

dcc<bba16a16&a16g.[지금내가가야할-]
>e-ddcc4g4[세상속에니가]
g2.a4[있기]
f#2.r4[에]

r4ggggg16a.[지쳐쓰러지며]
f#eed16d16&d4 ef#[되돌아가는내삶]
g4r4 g.a16&ag[이초라해]
f#.b16&bf#16d16d4.d[보인대-도죽]
ee16d16c4 f#f#16e16&ef#[어진--니모습과]
gab-16ag16g4.e[함께한-다면이]
>c4<bge4.b&[제갈수있어]
b2a4[-]

r4ggggg16a.[소중하게남긴]
f#eed16d16&d4 ef#[너의꿈들을껴안]
g4r4 g.a16&ag[아네게가]
f#.b16&bf#16d16d4.d[져가려-해어]
ee16d16c4 f#f#16e16&ef#[두운--세상속에]
gab-16ag16g4.e[숨쉴날-들이이]
>c4<bge4.a&[제잊혀지도]
a4.g&g2[록]`
    },
    {
        title: '귀로',
        singer: '나얼',
        author: 'sample',
        score: `t54 l16 o3
g.a32b-.g32b-.>e-32d8r8..<g[화려한불빛으로그]
f#.g32a.f#32a.>e-32d4r8[뒷모습만보이며]
<a.b-32>c.<b-32>c.e-32d.c32r8<b-.>c32[안녕이란말도없이사라]
<b-8r8r16.b-32a8r4[진그대]
g.a32b-.g32b-.>e-32d8r..<g32[쉽게흘려진눈물눈]
f#.g32a.f#32a.>e-32d4r8[가에가득히고여]
<a.b-32>c.<b-32>c.e-32d.c32r16.c32<b.>c32&[거리엔온통투명한유리알]
c.d32&d8..c32d8r8c.d32[속--그대]
e-.d32e-.d32e-.g32f8 r8 c.c32[따뜻한손이라도잡아]
d.c#32d.c#32d.<b-32g8r8a.b-32 [볼수만있었다면아직]
>c.<b-32>c.<b-32>c.e-32 dcr.c32<b-.>c32&[은그대의온기남아있겠지]
c.f32'만'd8e-32d32cd8r8 c.d32[비바]
e-.d32e-.d32e-.b-32&b-.>c32<a8a.g32[람이부는길가-에홀로]
f#.f#32f#.d32f#.a32&a.g32r8g.a32[애태우는이자리두뺨]
b-.g32b-.g32b-.g32b-r8>c.<b-32&[엔비바람만차게부는]
b-.a32&a4>d4.[데-]<
l8gab-b-a16g16g[사랑한단말-은]
f#ga&ar..a32[못해도안]
ab->c16.c32c<b-a&[녕이란말은해야]
a.b-16&b-a4r[지-]
gab-b-ag16f#16[아무말도없이-]
f#ga&ar..<a32[떠나간그]
>a16.a32&agf#ra16f#32g32&[대가정말미워-]
g16g16&g4[요] `
    }
];


export interface Model {
    getLatest(): SongArticle[];
    search(keyword: string): SongArticle[];
}

export class FileModel implements Model {
    private list: SongArticle[] = [];

    constructor() {
        this.list = articles;
    }

    public getLatest(): SongArticle[] {
        const result = this.list.slice(0, 20);
        return result;
    }

    public search(keyword: string): SongArticle[] {
        keyword = keyword.trim();
        return this.list.filter(article => article.title.includes(keyword)).slice();
    }

    public save(article: SongArticle) {
        if (article.idx) {
            this.edit(article);
        } else {
            this.add(article);
        }
    }

    private add(article: SongArticle) {
        article.idx = this.list.length;
        this.list.push(article);
    }

    private edit(article: SongArticle) {
        const item = this.list.find(i => i.idx === article.idx);
        item.author = article.author;
        item.score = article.score;
        item.singer = article.singer;
        item.title = article.title;
    }
}
