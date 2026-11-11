#!/usr/bin/env node
// saintz-frontend screenshots: full-page captures at true device widths using an installed Chrome/Edge/Chromium.
// Usage: node shoot.mjs <file-or-url> [--widths 375,768,1440] [--out ./shots] [--wait 1500] [--dark]
// Uses DevTools device emulation, so 375px really is 375px (plain --window-size is clamped to ~500px on Windows).
// No dependencies (Node 22+ for the built-in WebSocket). Uses a throwaway browser profile.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const target = argv.find((a, i) => !a.startsWith('--') && !['--widths', '--out', '--wait'].includes(argv[i - 1]));
if (!target) { console.log('Usage: node shoot.mjs <file-or-url> [--widths 375,1440] [--out ./shots] [--wait 1500] [--dark]'); process.exit(2); }
const widths = opt('--widths', '375,1440').split(',').map(Number);
const outDir = path.resolve(opt('--out', 'shots'));
const wait = Number(opt('--wait', 1500));
const dark = argv.includes('--dark');
const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(path.resolve(target)).href;
if (typeof WebSocket === 'undefined') { console.error('Needs Node 22+ (built-in WebSocket).'); process.exit(2); }

const candidates = process.env.CHROME_PATH ? [process.env.CHROME_PATH] : {
  win32: [`${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`, `${process.env.ProgramFiles}\\BraveSoftware\\Brave-Browser\\Application\\brave.exe`],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium', '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge'],
}[process.platform] || [];
const browser = candidates.find(p => p && fs.existsSync(p));
if (!browser) { console.error('No Chrome/Edge/Chromium found. Set CHROME_PATH.'); process.exit(2); }

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shoot-'));
const proc = spawn(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  `--user-data-dir=${profile}`, '--remote-debugging-port=0', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });

const wsUrl = await new Promise((res, rej) => {
  let buf = ''; const t = setTimeout(() => rej(new Error('Browser did not start')), 20000);
  proc.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); res(m[1]); } });
});
const port = new URL(wsUrl).port;
const page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(), waiters = [];
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) waiters.filter(w => w.method === m.method).forEach(w => { w.res(m.params); waiters.splice(waiters.indexOf(w), 1); });
});
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, m => m.error ? rej(new Error(m.error.message)) : res(m.result)); ws.send(JSON.stringify({ id: i, method, params })); });
const once = (method, ms = 15000) => new Promise(res => { waiters.push({ method, res }); setTimeout(res, ms); });

fs.mkdirSync(outDir, { recursive: true });
await send('Page.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }] });
const base = path.basename(target).replace(/\.[a-z]+$/i, '').replace(/[^\w.-]+/g, '-') || 'page';
for (const w of widths) {
  const mobile = w < 768;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: mobile ? 812 : 900, deviceScaleFactor: 1, mobile });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await new Promise(r => setTimeout(r, wait));
  const { result } = await send('Runtime.evaluate', { expression: 'JSON.stringify({w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, vw: innerWidth})', returnByValue: true });
  const m = JSON.parse(result.value);
  const height = Math.min(m.h, 16000);
  await send('Emulation.setDeviceMetricsOverride', { width: w, height, deviceScaleFactor: 1, mobile });
  await new Promise(r => setTimeout(r, 300));
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const file = path.join(outDir, `${base}-${w}.png`);
  fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  const overflow = m.w > w ? `  OVERFLOW: page is ${m.w}px wide at ${w}px (horizontal scroll). Find it with: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > ${w})` : '';
  if (overflow) process.exitCode = 1;
  console.log(`${w}px  ${file}  (${m.w}x${m.h})${overflow}`);
}
ws.close(); proc.kill();
setTimeout(() => { try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} process.exit(0); }, 500);
