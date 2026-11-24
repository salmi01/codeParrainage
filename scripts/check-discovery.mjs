import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

// Accepte également l’origine publique après déploiement.
const origin = new URL(process.argv[2] || "http://127.0.0.1:3000").origin;
const domain = "https://codeparrainage.co";
const icon = "/favicon-96x96.png";
const forbidden = /\b(?:noindex|none|nosnippet)\b/i;

async function get(path, type, agent) {
  const response = await fetch(new URL(path, origin), {
    redirect: "error", signal: AbortSignal.timeout(15000),
    headers: agent ? { "User-Agent": agent } : {},
  });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") || "", type, path);
  assert.doesNotMatch(response.headers.get("x-robots-tag") || "", forbidden, path);
  return response;
}

const robots = await (await get("/robots.txt", /text\/plain/)).text();
assert.match(robots, /^Sitemap: https:\/\/codeparrainage\.co\/sitemap\.xml\s*$/mi);
// Politique actuelle du projet. Toute modification volontaire doit entraîner une revue du contrôle.
const directives = robots.split(/\r?\n/).map(line => line.split("#")[0].trim().toLowerCase())
  .filter(line => line && !line.startsWith("sitemap:"));
assert.deepEqual(directives, ["user-agent: *", "allow: /"]);
for (const agent of ["Googlebot", "bingbot", "OAI-SearchBot"]) {
  for (const path of ["/", "/transfert-argent", "/code-parrainage-ria"]) {
    const html = await (await get(path, /text\/html/, agent)).text();
    assert.match(html, /<main\b/);
    assert.match(html, /<h1\b/);
  }
}

for (const [path, size] of [[icon, 96], ["/apple-touch-icon.png", 180]]) {
  const bytes = Buffer.from(await (await get(path, /image\/png/, "Googlebot-Image")).arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [size, size]);
}
const ico = Buffer.from(await (await get("/favicon.ico", /image\/(?:x-icon|vnd\.microsoft\.icon)/)).arrayBuffer());
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
assert.deepEqual([6, 22, 38].map(i => [ico[i], ico[i + 1]]), [[16, 16], [32, 32], [48, 48]]);
await get("/icon.svg", /image\/svg\+xml/);

const sitemap = await (await get("/sitemap.xml", /xml/)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.includes(domain + "/"));
assert.equal(new Set(urls).size, urls.length);
const indexResponse = await get("/llms.txt", /text\/plain;\s*charset=utf-8/i, "OAI-SearchBot");
const index = new TextDecoder("utf-8", { fatal: true }).decode(await indexResponse.arrayBuffer());
assert.match(index, /^# CodeParrainage\.co\n\n> .+\n\n## /);
const links = [...index.matchAll(/^- \[[^\]]+\]\(([^)]+)\): \S.+$/gm)].map(match => match[1]);
assert.equal(links.length, index.split("\n").filter(line => line.startsWith("- ")).length);
assert.ok(links.includes(domain + "/"));
assert.equal(new Set(links).size, links.length);
for (const link of links) assert.ok(urls.includes(link), "Lien absent du sitemap : " + link);
for (const url of urls.filter(url => /\/(?:code-parrainage-|parrainage-)/.test(new URL(url).pathname))) {
  assert.ok(links.includes(url), "Fiche absente de llms.txt : " + url);
}

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || "chrome" });
try {
  const page = await browser.newPage({ javaScriptEnabled: false });
  const titles = new Set();
  const descriptions = new Set();
  const internal = new Set();
  for (const url of urls) {
    const { pathname, origin: canonicalOrigin } = new URL(url);
    assert.equal(canonicalOrigin, domain);
    const response = await page.goto(origin + pathname);
    assert.equal(response.status(), 200, url);
    assert.equal(page.url(), origin + pathname);
    assert.doesNotMatch(response.headers()["x-robots-tag"] || "", forbidden, url);
    assert.equal(await page.locator("html").getAttribute("lang"), "fr");
    assert.equal(await page.locator("main h1").count(), 1, url);
    assert.deepEqual(await page.locator('link[rel="icon"]').evaluateAll(nodes => nodes.map(node => node.getAttribute("href"))), [icon]);
    assert.equal(await page.locator('link[rel="apple-touch-icon"]').getAttribute("href"), "/apple-touch-icon.png");
    assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).href, url);
    assert.equal(new URL(await page.locator('meta[property="og:url"]').getAttribute("content")).href, url);
    assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute("content"), forbidden);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    assert.ok(title && !titles.has(title), url);
    assert.ok(description && !descriptions.has(description), url);
    titles.add(title);
    descriptions.add(description);
    const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(value => JSON.parse(value));
    const article = data.find(item => item["@type"] === "Article");
    if (article) {
      assert.equal(article.mainEntityOfPage, url);
      assert.equal(article.headline, await page.locator("h1").innerText());
      assert.ok(await page.locator(`main time[datetime="${article.dateModified}"]`).count(), url);
    }
    for (const href of await page.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.pathname))) {
      internal.add(href);
    }
  }
  for (const path of internal) {
    if (!urls.includes(domain + path)) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/i, path);
    }
  }
  console.log(`OK · ${urls.length} pages canoniques, ${links.length} liens dans llms.txt, ${internal.size} chemins internes. Origine : ${origin}`);
} finally {
  await browser.close();
}
