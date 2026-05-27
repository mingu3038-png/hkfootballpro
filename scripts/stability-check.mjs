const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:3005';
const TG_EXPECT = 'https://t.me/mingzaiwc';

const routes = [
  { name: 'home', path: '/' },
  { name: 'analysis', path: '/analysis/man-united-vs-liverpool-2026-05-25' },
];

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log('OK:', msg);
}

async function fetchText(url) {
  const res = await fetch(url);
  return { res, text: await res.text() };
}

async function checkCss(html, baseUrl, routeName) {
  const linkMatch = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/i);
  if (!linkMatch) {
    fail('no stylesheet link in HTML');
    return null;
  }
  const hrefMatch = linkMatch[0].match(/href=["']([^"']+)["']/i);
  if (!hrefMatch) {
    fail('stylesheet href missing');
    return null;
  }
  const cssUrl = new URL(hrefMatch[1], baseUrl).href;
  const { res, text } = await fetchText(cssUrl);
  if (!res.ok) {
    fail(`CSS ${res.status} ${cssUrl}`);
    return null;
  }
  if (!res.headers.get('content-type')?.includes('text/css')) {
    fail(`CSS wrong content-type: ${res.headers.get('content-type')}`);
  }
  if (text.length < 50000) {
    fail(`CSS too small (${text.length} bytes), likely broken bundle`);
  }
  const checks = [
    ['--bg', 'theme variables'],
    ['.home-hero', 'home hero styles'],
    ['.home-page', 'home page class styles'],
    ['max-width:768px', 'mobile media query'],
    ['.site-header', 'header styles'],
  ];
  for (const [needle, label] of checks) {
    if (!text.includes(needle)) fail(`CSS missing ${label} (${needle})`);
    else ok(`CSS contains ${label}`);
  }
  ok(`CSS bundle ${text.length} bytes, ${res.status}`);
  return text;
}

async function checkPage(route) {
  const url = `${BASE}${route.path}`;
  const { res, text: html } = await fetchText(url);
  if (!res.ok) {
    fail(`${route.name} HTTP ${res.status}`);
    return;
  }
  ok(`${route.name} HTTP ${res.status}`);

  if (route.name === 'home') {
    if (!html.includes('class="home-page"') && !html.includes("class='home-page'")) {
      fail('home missing .home-page wrapper');
    } else ok('home has .home-page');
    if (!html.includes('home-hero')) fail('home missing home-hero');
    else ok('home has home-hero markup');
    if (!html.includes('today-free-focus')) fail('home missing today-free-focus');
    else ok('home has today-free-focus');
    if (!html.includes('mobile-tg-bar')) fail('home missing mobile-tg-bar');
    else ok('home has mobile-tg-bar');
  }

  if (route.name === 'analysis') {
    if (!html.includes('analysis-detail')) fail('analysis missing analysis-detail');
    else ok('analysis has analysis-detail markup');
  }

  const tgLinks = [...html.matchAll(/href=["'](https:\/\/t\.me\/[^"']+)["']/gi)];
  if (tgLinks.length === 0) {
    fail(`${route.name} no t.me links found`);
  } else {
    const urls = [...new Set(tgLinks.map((m) => m[1]))];
    for (const u of urls) {
      if (!u.startsWith('https://t.me/')) fail(`invalid TG url: ${u}`);
    }
    ok(`${route.name} TG links (${tgLinks.length}x): ${urls.join(', ')}`);
    if (!urls.some((u) => u === TG_EXPECT || u.startsWith('https://t.me/'))) {
      fail('TG url pattern unexpected');
    }
  }

  await checkCss(html, url, route.name);

  if (route.name === 'analysis') {
    const chunkLinks = [
      ...html.matchAll(/href=["'](\/_next\/static\/css\/[^"']+)["']/gi),
    ].map((m) => m[1]);
    let foundAnalysisCss = html.includes('.analysis-detail');
    for (const chunk of chunkLinks) {
      const { res, text } = await fetchText(new URL(chunk, url).href);
      if (res.ok && text.includes('.analysis-detail')) {
        foundAnalysisCss = true;
        ok(`analysis CSS chunk loaded (${text.length} bytes)`);
        break;
      }
    }
    if (!foundAnalysisCss) fail('analysis-detail styles not in any CSS chunk');
  }
}

console.log('Stability check @', BASE);
for (const route of routes) {
  console.log('\n---', route.name, '---');
  await checkPage(route);
}

if (process.exitCode) {
  console.log('\nSome checks failed.');
} else {
  console.log('\nAll stability checks passed.');
}
