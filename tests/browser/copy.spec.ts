import { test, expect } from "@playwright/test";
import { build } from "esbuild";

// Le composant de production est monté uniquement dans une réponse interceptée par le test.
// Aucune route ni invitation de démonstration n’est incluse dans l’application.
test("Copie réelle au clavier et recours manuel si le presse-papiers est bloqué", async ({ page, context, baseURL }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseURL! });
  const bundle = await build({
    stdin: {
      contents: `import { createRoot } from "react-dom/client";
        import { ReferralCodeBox } from "./src/components/ReferralCodeBox";
        createRoot(document.getElementById("root")).render(<ReferralCodeBox code="TEST-LOCAL" brand="Test" />);`,
      loader: "tsx", resolveDir: process.cwd(),
    },
    jsx: "automatic", bundle: true, write: false, minify: true,
    define: { "process.env.NODE_ENV": '"production"' },
  });
  await page.route("**/__clipboard-test", route => route.fulfill({ contentType: "text/html", body: '<main id="root"></main>' }));
  await page.goto("/__clipboard-test");
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  const copy = page.getByRole("button", { name: "Copier" });
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Code copié");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("TEST-LOCAL");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined }));
  await copy.click();
  await expect(page.getByRole("status")).toContainText("manuellement");
});
