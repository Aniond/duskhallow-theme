// The Duskhallow night: a moon over the mountains (now and then a Blood Moon),
// the gothic chapel and lamp-lit houses of the town on the left, the graveyard
// and its ghostly guardian, a witch's stilt cottage, pumpkins and the Moonwell's
// rune stones on the right, with drifting fog, bats and fireflies.
// The middle and the foot stay quiet, because words and the message box sit there.

const STARS: Array<[number, number, number, number]> = [
  [80, 60, 1.4, 0], [190, 140, 1, 1.3], [300, 50, 1.6, 2.1], [420, 180, 1, 0.6], [520, 90, 1.3, 3.2],
  [640, 40, 1, 1.9], [700, 200, 1.5, 4.1], [820, 110, 1, 2.6], [930, 60, 1.7, 0.3], [1010, 170, 1, 3.7],
  [1100, 70, 1.2, 1.1], [1180, 330, 1, 2.9], [1460, 80, 1.5, 0.9], [1540, 190, 1, 3.4], [1580, 330, 1.3, 1.6],
  [140, 280, 1, 4.4], [260, 360, 1.3, 2.3], [480, 300, 1, 0.2], [600, 380, 1.1, 3.9], [760, 320, 1, 1.4],
  [880, 270, 1.4, 2.7], [990, 350, 1, 0.8], [1080, 260, 1.2, 4.6], [350, 250, 1, 3.1], [40, 400, 1.2, 1.8],
  [1520, 420, 1, 2.2], [560, 220, 1, 4.9], [1140, 420, 1, 0.5], [230, 450, 1, 3.6], [720, 460, 1, 2.0],
]

const FIREFLIES: Array<[number, number, number, number]> = [
  [120, 780, 0, 11], [250, 700, 2.5, 13], [430, 830, 5, 12], [560, 760, 1.2, 15], [1050, 790, 3.7, 14],
  [1160, 720, 0.6, 12], [1330, 800, 4.4, 13], [1460, 700, 2.1, 16], [1560, 820, 6, 12], [330, 900, 3, 14],
  [1240, 900, 1.8, 11], [80, 620, 4.9, 15], [1520, 600, 3.3, 13], [680, 860, 5.6, 16],
]

const stars = STARS.map(
  ([x, y, r, d]) => `<circle class="star" cx="${x}" cy="${y}" r="${r}" style="animation-delay:-${d}s;animation-duration:${3 + (d % 3)}s"/>`,
).join('')

const fireflies = FIREFLIES.map(
  ([x, y, d, t], i) =>
    `<g class="ff ff${i % 3}" style="animation-delay:-${d}s;animation-duration:${t}s"><circle cx="${x}" cy="${y}" r="9" fill="url(#ffG)" class="blink" style="animation-delay:-${d * 1.7}s"/><circle cx="${x}" cy="${y}" r="2" class="ffcore"/></g>`,
).join('')

const BAT =
  'M0 0C-6-8-16-8-22-2C-16-3-14 2-12 5C-9 2-5 2-3 6L0 3L3 6C5 2 9 2 12 5C14 2 16-3 22-2C16-8 6-8 0 0Z'

const bats = [0, 9, 17]
  .map(
    (d, i) =>
      `<g class="bat bat${i}" style="animation-delay:-${d}s"><path class="wing sil" d="${BAT}" transform="scale(${1 - i * 0.18})"/></g>`,
  )
  .join('')

// Gravestones and crosses, [x, kind]
const graves = [
  [370, 0], [410, 1], [452, 0], [492, 2], [530, 0], [565, 1],
]
  .map(([x, k]) => {
    const y = 930 + ((x * 7) % 14)
    if (k === 1) {
      return `<path class="sil" d="M${x - 3} ${y}v-34h-10v-6h10v-10h6v10h10v6h-10v34z"/>`
    }
    if (k === 2) {
      return `<path class="sil" d="M${x - 14} ${y}v-30l14-12l14 12v30z"/>`
    }
    return `<path class="sil" d="M${x - 11} ${y}v-26a11 11 0 0 1 22 0v26z"/>`
  })
  .join('')

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" class="s0"/><stop offset=".45" class="s1"/><stop offset=".78" class="s2"/><stop offset="1" class="s3"/>
</linearGradient>
<radialGradient id="halo"><stop offset="0" stop-color="#f3e9c8" stop-opacity=".55"/><stop offset=".35" stop-color="#cdbfe6" stop-opacity=".18"/><stop offset="1" stop-color="#cdbfe6" stop-opacity="0"/></radialGradient>
<radialGradient id="moonB" cx=".4" cy=".38"><stop offset="0" stop-color="#fffaea"/><stop offset=".7" stop-color="#ece0bf"/><stop offset="1" stop-color="#d5c49c"/></radialGradient>
<radialGradient id="blood" cx=".4" cy=".38"><stop offset="0" stop-color="#ff7a6a"/><stop offset=".7" stop-color="#b8242f"/><stop offset="1" stop-color="#6e1020"/></radialGradient>
<radialGradient id="bloodHalo"><stop offset="0" stop-color="#d4303c" stop-opacity=".45"/><stop offset="1" stop-color="#d4303c" stop-opacity="0"/></radialGradient>
<radialGradient id="well"><stop offset="0" stop-color="#5ff0c0" stop-opacity=".55"/><stop offset="1" stop-color="#5ff0c0" stop-opacity="0"/></radialGradient>
<radialGradient id="lamp"><stop offset="0" stop-color="#ffc766" stop-opacity=".85"/><stop offset=".3" stop-color="#ff9d3a" stop-opacity=".3"/><stop offset="1" stop-color="#ff9d3a" stop-opacity="0"/></radialGradient>
<radialGradient id="ffG"><stop offset="0" stop-color="#f6ffb0" stop-opacity=".95"/><stop offset=".35" stop-color="#c6ee62" stop-opacity=".45"/><stop offset="1" stop-color="#c6ee62" stop-opacity="0"/></radialGradient>
<radialGradient id="ghostG" cx=".5" cy=".35"><stop offset="0" stop-color="#e8fff6" stop-opacity=".9"/><stop offset="1" stop-color="#9fe8d0" stop-opacity="0"/></radialGradient>
<filter id="fog" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<style>
svg{--sil:#07050c;--far:#1b132b;--snow:#2f2545;--mid:#110b1c;--fogc:#8a78b0;--fogo:.16;--win:#ffb84d}
.s0{stop-color:#05040b}.s1{stop-color:#120c22}.s2{stop-color:#271740}.s3{stop-color:#3a2148}
.sil{fill:var(--sil)}.far{fill:var(--far)}.snow{fill:var(--snow)}.mid{fill:var(--mid)}
.fogband{fill:var(--fogc);opacity:var(--fogo);filter:url(#fog)}
.win{fill:var(--win)}
.star{fill:#f4f0ff;animation:tw 4s ease-in-out infinite}
@keyframes tw{0%,100%{opacity:.25}50%{opacity:1}}
.halo{transform-box:fill-box;transform-origin:center;animation:pulse 9s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.75;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
.bloodmoon{opacity:0;animation:blood 75s ease-in-out infinite}
@keyframes blood{0%,62%{opacity:0}70%,84%{opacity:.92}92%,100%{opacity:0}}
.cloud{animation:drift 110s linear infinite}
.cloud2{animation:drift 150s linear infinite;animation-delay:-70s}
@keyframes drift{from{transform:translateX(-700px)}to{transform:translateX(2100px)}}
.fogA{animation:fogslide 60s ease-in-out infinite alternate}
.fogB{animation:fogslide 80s ease-in-out infinite alternate-reverse}
@keyframes fogslide{from{transform:translateX(-160px)}to{transform:translateX(160px)}}
.flick{animation:flick 3.2s steps(1) infinite}
.flick2{animation:flick 4.7s steps(1) infinite;animation-delay:-1.3s}
@keyframes flick{0%,100%{opacity:1}12%{opacity:.7}14%{opacity:1}47%{opacity:.82}50%{opacity:1}78%{opacity:.6}80%{opacity:1}}
.glow{animation:glow 5s ease-in-out infinite}
@keyframes glow{0%,100%{opacity:.55}50%{opacity:1}}
.rune{fill:#6ff5c8;animation:glow 6s ease-in-out infinite}
.smoke{fill:#5b4d72;opacity:0;animation:smoke 9s ease-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes smoke{0%{opacity:0;transform:translate(0,0) scale(.6)}20%{opacity:.35}100%{opacity:0;transform:translate(40px,-140px) scale(2.4)}}
.ghost{opacity:0;animation:ghost 28s ease-in-out infinite}
@keyframes ghost{0%,30%{opacity:0;transform:translate(0,0)}45%{opacity:.5;transform:translate(14px,-18px)}60%{opacity:.35;transform:translate(30px,-6px)}75%,100%{opacity:0;transform:translate(46px,-26px)}}
.ghost .bob{animation:bob 4s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.bat{animation:fly 26s linear infinite}
.bat1{animation-duration:31s}.bat2{animation-duration:37s}
@keyframes fly{0%{transform:translate(1720px,330px)}20%{transform:translate(1420px,250px)}40%{transform:translate(1120px,300px)}60%{transform:translate(820px,190px)}80%{transform:translate(400px,240px)}100%{transform:translate(-120px,150px)}}
.wing{animation:flap .28s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
@keyframes flap{from{transform:scaleY(1)}to{transform:scaleY(.35)}}
.ff{animation:wander 13s ease-in-out infinite alternate}
.ff1{animation-name:wander2}.ff2{animation-name:wander3}
@keyframes wander{0%{transform:translate(0,0)}33%{transform:translate(26px,-30px)}66%{transform:translate(-18px,-12px)}100%{transform:translate(12px,-46px)}}
@keyframes wander2{0%{transform:translate(0,0)}50%{transform:translate(-34px,-22px)}100%{transform:translate(20px,-38px)}}
@keyframes wander3{0%{transform:translate(0,0)}40%{transform:translate(18px,24px)}100%{transform:translate(-26px,-30px)}}
.blink{animation:blink 3.4s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:0}20%,55%{opacity:1}75%{opacity:.15}}
.ffcore{fill:#fbffd6;opacity:.9}
@media (max-aspect-ratio:1/1){.moon{transform:translate(-240px,30px)}.left{transform:translate(120px,0) scale(.85);transform-origin:0 1000px}.right{transform:translate(-120px,0) scale(.85);transform-origin:1600px 1000px}}
@media (min-aspect-ratio:2/1){.moon{transform:translate(0,190px)}}
@media (prefers-color-scheme:light){
svg{--sil:#2a2136;--far:#7a6e91;--snow:#a59bb8;--mid:#4e4363;--fogc:#ffffff;--fogo:.32;--win:#ffc25e}
.s0{stop-color:#6f6690}.s1{stop-color:#a79bbd}.s2{stop-color:#d7c2c9}.s3{stop-color:#ecc9b4}
.star{display:none}.halo{opacity:.5}.ffcore{opacity:.5}
.cloud ellipse,.cloud2 ellipse{fill:#e6dcea}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.bloodmoon,.ghost,.smoke{opacity:0}.blink{opacity:.8}}
</style>
<rect width="1600" height="1000" fill="url(#sky)"/>
<g>${stars}</g>
<g transform="translate(-230,50)"><g class="moon">
<circle class="halo" cx="1290" cy="200" r="250" fill="url(#halo)"/>
<circle cx="1290" cy="200" r="82" fill="url(#moonB)"/>
<g fill="#cbb98f" opacity=".45"><circle cx="1262" cy="178" r="15"/><circle cx="1312" cy="226" r="11"/><circle cx="1318" cy="170" r="7"/><circle cx="1270" cy="236" r="6"/><circle cx="1296" cy="196" r="4"/></g>
<g class="bloodmoon"><circle cx="1290" cy="200" r="230" fill="url(#bloodHalo)"/><circle cx="1290" cy="200" r="82" fill="url(#blood)"/><g fill="#5a0c18" opacity=".35"><circle cx="1262" cy="178" r="15"/><circle cx="1312" cy="226" r="11"/><circle cx="1318" cy="170" r="7"/></g></g>
</g>
</g>
<g class="cloud"><ellipse cx="1100" cy="210" rx="190" ry="20" fill="#2a1f3c" opacity=".75" filter="url(#soft)"/><ellipse cx="1180" cy="196" rx="110" ry="14" fill="#352a4a" opacity=".6" filter="url(#soft)"/></g>
<g class="cloud2"><ellipse cx="700" cy="120" rx="240" ry="16" fill="#241a35" opacity=".6" filter="url(#soft)"/></g>
<g>${bats}</g>
<path class="far" d="M0 640L90 560L170 600L260 470L330 540L420 440L520 560L600 510L700 590L800 500L880 560L960 450L1040 530L1130 470L1230 560L1320 480L1420 570L1500 520L1600 590V1000H0Z"/>
<path class="snow" d="M260 470L240 495L262 488L280 500L292 486ZM420 440L396 470L420 462L438 476L452 465ZM960 450L938 478L960 470L976 483L990 470ZM1130 470L1110 494L1131 488L1146 498L1158 488ZM1320 480L1300 504L1322 498L1336 508L1348 497Z"/>
<path class="mid" d="M0 760Q160 690 330 730T690 720T1030 740T1360 700T1600 730V1000H0Z"/>
<path class="sil" d="M0 1000V962Q400 948 800 958T1600 955V1000Z"/>
<g class="fogA"><ellipse class="fogband" cx="500" cy="770" rx="560" ry="46"/><ellipse class="fogband" cx="1250" cy="760" rx="480" ry="40"/></g>
<g transform="translate(330,0)"><g class="left">
<path class="sil" d="M-20 1000V640L-6 660L4 600L14 640L30 610L40 655L50 1000Z"/>
<path class="sil" d="M60 940C70 860 56 800 80 740C66 720 40 712 28 690C50 700 70 712 86 726C92 690 84 660 98 630C104 664 104 700 100 730C120 712 140 704 162 708C140 716 118 730 106 752C96 820 112 880 106 940Z"/>
<path class="sil" d="M150 940V820L190 780L230 820V940ZM180 820V700L196 640L212 700V820Z"/>
<path class="sil" d="M196 640V600"/>
<rect class="sil" x="194.5" y="610" width="3" height="34"/><rect class="sil" x="186" y="620" width="20" height="3"/>
<circle class="win flick" cx="196" cy="742" r="10"/>
<path class="win flick2" d="M184 880V856a6 6 0 0 1 12 0V880ZM200 880V856a6 6 0 0 1 12 0V880Z"/>
<path class="sil" d="M230 940V860L262 832L294 860V940Z"/>
<rect class="win flick2" x="252" y="872" width="9" height="13"/><rect class="win flick" x="268" y="872" width="9" height="13"/>
<rect class="sil" x="276" y="824" width="10" height="26"/><circle class="smoke" cx="281" cy="818" r="9"/><circle class="smoke" cx="281" cy="818" r="9" style="animation-delay:-4.5s"/>
<path class="sil" d="M296 940V880L320 862L344 880V940Z"/><rect class="win flick" x="315" y="890" width="10" height="14"/>
<g><rect class="sil" x="348" y="860" width="4" height="80"/><path class="sil" d="M342 862h16l-3-10h-10z"/><circle class="glow" cx="350" cy="866" r="34" fill="url(#lamp)"/><circle cx="350" cy="866" r="3" fill="#ffd27a"/></g>
${graves}
<path class="sil" d="M0 1000V930Q200 910 400 935T640 950V1000Z"/>
<g class="ghost"><g class="bob"><path d="M470 860c-14 0-22 12-22 26v32l7-6l7 7l8-7l8 7l7-7l7 6v-32c0-14-8-26-22-26z" fill="url(#ghostG)"/><circle cx="464" cy="884" r="2.2" fill="#1a1426"/><circle cx="476" cy="884" r="2.2" fill="#1a1426"/></g></g>
</g>
</g>
<g transform="translate(-260,0)"><g class="right">
<circle class="glow" cx="1520" cy="930" r="110" fill="url(#well)"/>
<g class="sil"><path d="M1462 950l4-40h12l3 40z"/><path d="M1500 945l3-52h13l4 52z"/><path d="M1546 948l3-44h12l3 44z"/><path d="M1584 952l3-36h11l3 36z"/></g>
<g><rect class="rune" x="1469" y="922" width="4" height="9" rx="1"/><rect class="rune" x="1508" y="910" width="4" height="10" rx="1" style="animation-delay:-2s"/><rect class="rune" x="1553" y="918" width="4" height="9" rx="1" style="animation-delay:-4s"/></g>
<path class="sil" d="M1370 950C1376 860 1352 800 1330 760C1350 770 1366 790 1372 806C1378 760 1360 720 1340 690C1366 704 1384 740 1388 770C1400 730 1420 700 1450 684C1430 712 1404 744 1398 790C1394 840 1404 900 1410 950Z"/>
<path class="sil" d="M1206 870h6v80h-6zM1290 870h6v80h-6zM1246 874h5v76h-5zM1200 866h102v10h-102z"/>
<path class="sil" d="M1212 866V800L1196 804L1252 728L1310 806L1294 802V866Z"/>
<path class="sil" d="M1270 760V722h12v52z"/><circle class="smoke" cx="1276" cy="716" r="8"/><circle class="smoke" cx="1276" cy="716" r="8" style="animation-delay:-3s"/><circle class="smoke" cx="1276" cy="716" r="8" style="animation-delay:-6s"/>
<path class="win flick" d="M1232 830h18v20h-18z"/><path class="win flick2" d="M1262 812a8 8 0 0 1 16 0v14h-16z"/>
<path class="sil" d="M1236 830v20M1241 830v20" stroke="var(--sil)" stroke-width="2"/>
<circle class="glow" cx="1255" cy="836" r="60" fill="url(#lamp)" opacity=".6"/>
<g><ellipse cx="1150" cy="944" rx="20" ry="15" fill="#c8641c"/><path d="M1150 930v-8" stroke="#2c3a16" stroke-width="3"/><path class="win flick" d="M1141 940l4-5l4 5zM1151 940l4-5l4 5zM1140 948q10 6 20 0l-4 4h-12z"/><circle class="glow" cx="1150" cy="944" r="40" fill="url(#lamp)" opacity=".5"/></g>
<g><ellipse cx="1102" cy="956" rx="13" ry="10" fill="#a14f17"/><ellipse cx="1190" cy="958" rx="11" ry="8" fill="#a14f17"/></g>
<path class="sil" d="M1000 1000V958Q1200 935 1400 955T1600 948V1000Z"/>
</g>
</g>
<g class="fogB"><ellipse class="fogband" cx="300" cy="960" rx="520" ry="50"/><ellipse class="fogband" cx="1350" cy="975" rx="560" ry="46"/></g>
<g>${fireflies}</g>
</svg>`
