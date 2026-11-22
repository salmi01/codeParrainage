import { test, expect } from "@playwright/test";

test("Accueil, recherche, filtre de résidence et navigation mobile", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", err => errors.push(err.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".hero-art img")).toBeVisible();
  await page.getByRole("searchbox").fill("conditions");
  await page.getByRole("button", { name: "Rechercher", exact: true }).click();
  await expect(page).toHaveURL(/recherche\?q=conditions/);
  await expect(page.getByRole("link", { name: /Notre méthode de vérification/ })).toBeVisible();
  await expect(page.locator('meta[name=robots]')).toHaveAttribute("content", /noindex/);
  await page.goto("/pays");
  await page.getByRole("button", { name: /Choisir mon pays de résidence/ }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("searchbox").fill("senegal");
  await dialog.getByRole("button", { name: "Sénégal" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator(".filter-summary")).toContainText("Sénégal");
  await page.reload();
  await expect(page.locator(".filter-summary")).toContainText("Sénégal");
  await page.getByRole("button", { name: "Voir tous les pays" }).click();
  await expect(page.locator(".filter-summary")).toHaveCount(0);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.locator(".hero-art img")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel("Menu principal").click();
  await page.getByRole("navigation", { name: "Navigation mobile" }).getByRole("link", { name: "Guides", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Les guides du parrainage");
  await page.locator(".article-link").first().click();
  await expect(page.locator(".prose h2").first()).toBeVisible();
  expect(errors).toEqual([]);
});

test("Pages canoniques, robots, sitemap et vraies 404", async ({ request, page }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const [,url] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const response = await request.get(new URL(url).pathname);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical && new URL(canonical).href).toBe(url);
    expect(html).not.toMatch(/name="robots" content="noindex/);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain("https://codeparrainage.co/sitemap.xml");
  for (const path of ["/page-inconnue-xyz", "/guides/absent-xyz", "/comparatifs/absent-xyz", "/pays/absent-xyz", "/annonces/x"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  await page.goto("/recherche?q=aucunresultatxyz");
  await expect(page.getByText("Aucune page correspondante")).toBeVisible();
});
