// Couch League test data + pass chart renderer (shared by both test pages).
const TEAMS = {
  HK: { name: 'Harbor Kings', color: '#D7263D', w: 9, l: 1, diff: 142 },
  AA: { name: 'Armadillos', color: '#D99A00', w: 8, l: 2, diff: 96 },
  NO: { name: 'Night Owls', color: '#6A4FD8', w: 7, l: 3, diff: 61 },
  PI: { name: 'Pioneers', color: '#2F6FDB', w: 7, l: 3, diff: 38 },
  BI: { name: 'Bison', color: '#9A6634', w: 6, l: 4, diff: 12 },
  CY: { name: 'Coyotes', color: '#E07A1F', w: 4, l: 6, diff: -22 },
  IC: { name: 'Ironclads', color: '#6B7A8A', w: 3, l: 7, diff: -58 },
  TH: { name: 'Thunder', color: '#1FA39A', w: 1, l: 9, diff: -169 },
};

const GAMES = [
  { a: 'AA', b: 'NO', as: 31, bs: 24, status: 'Final' },
  { a: 'CY', b: 'IC', as: 20, bs: 17, status: 'Final, overtime' },
  { a: 'HK', b: 'TH', as: 38, bs: 10, status: 'Final' },
  { a: 'PI', b: 'BI', status: 'Tonight, 9:00 PM' },
];

const QBS = {
  deshawn: { name: 'Deshawn', team: 'AA', handle: '@dshawn_plays', comp: 22, att: 31, yds: 318, td: 4, int: 0, seed: 11 },
  tyler: { name: 'Tyler', team: 'NO', handle: '@tylerOwlz', comp: 19, att: 34, yds: 241, td: 2, int: 2, seed: 29 },
};

const CHAT = [
  { who: '@tylerOwlz', team: 'NO', at: '10:42 PM', text: 'fourth and six. who throws deep on fourth and six' },
  { who: '@dshawn_plays', team: 'AA', at: '10:42 PM', text: 'someone who knew you were sending the house' },
  { who: '@kev_trades', team: 'HK', at: '10:44 PM', text: 'streak lasted six weeks. respectable. still 9 and 1 over here' },
  { who: '@tylerOwlz', team: 'NO', at: '10:47 PM', text: 'rematch week 14. clear your schedule' },
];

function rng(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function attempts(q) {
  const r = rng(q.seed), out = [];
  const add = (n, type, dmin, dmax, bias = 1.5) => {
    for (let i = 0; i < n; i++) out.push({ type, x: 4 + r() * 45.3, y: dmin + Math.pow(r(), bias) * (dmax - dmin) });
  };
  add(q.comp - q.td, 'complete', -3, 30);
  add(q.att - q.comp - q.int, 'incomplete', 0, 40, 1.1);
  add(q.td, 'td', 10, 42, 0.8);
  add(q.int, 'int', 12, 36, 1);
  return out.sort(() => r() - 0.5);
}

// c = { line, label, ink, muted, team, danger, labelSize }
function passChart(q, c) {
  const W = 533, H = 550, Y = (y) => (45 - y) * 10, qbX = 266.5, qbY = Y(-7);
  const team = TEAMS[q.team];
  const list = attempts(q);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${q.name}: ${q.att} pass attempts plotted where the ball arrived. ${q.comp} complete, ${q.td} touchdowns, ${q.int} interceptions.">`;
  for (let y = -5; y <= 45; y += 5) {
    s += `<line x1="0" x2="${W}" y1="${Y(y)}" y2="${Y(y)}" stroke="${c.line}" stroke-width="${y % 10 === 0 ? 1.6 : 0.8}"/>`;
    if (y > 0 && y % 10 === 0) s += `<text x="14" y="${Y(y) - 9}" fill="${c.label}" font-size="${c.labelSize || 22}" font-weight="600">${y}</text>`;
  }
  s += `<line x1="0" x2="${W}" y1="${Y(0)}" y2="${Y(0)}" stroke="${team.color}" stroke-width="3.5"/>`;
  list.forEach((p, i) => {
    const x = p.x * 10, y = Y(p.y), d = `style="--i:${i}"`;
    if (p.type === 'td') s += `<line class="pc-trail" ${d} x1="${qbX}" y1="${qbY}" x2="${x}" y2="${y}" stroke="${team.color}" stroke-width="2.5" stroke-linecap="round"/>`;
    if (p.type === 'complete') s += `<circle class="pc-dot" ${d} cx="${x}" cy="${y}" r="8" fill="${c.ink}"/>`;
    if (p.type === 'incomplete') s += `<circle class="pc-dot" ${d} cx="${x}" cy="${y}" r="7.5" fill="none" stroke="${c.muted}" stroke-width="2.5"/>`;
    if (p.type === 'td') s += `<circle class="pc-dot" ${d} cx="${x}" cy="${y}" r="12" fill="${team.color}" stroke="${c.ink}" stroke-width="2.5"/>`;
    if (p.type === 'int') s += `<g class="pc-dot" ${d} stroke="${c.danger}" stroke-width="4" stroke-linecap="round"><line x1="${x - 9}" y1="${y - 9}" x2="${x + 9}" y2="${y + 9}"/><line x1="${x + 9}" y1="${y - 9}" x2="${x - 9}" y2="${y + 9}"/></g>`;
  });
  s += `<circle cx="${qbX}" cy="${qbY}" r="7" fill="${c.muted}"/></svg>`;
  return s;
}

const fmtDiff = (d) => (d > 0 ? '+' + d : '−' + Math.abs(d));
