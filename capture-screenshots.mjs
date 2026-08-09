import playwright from "@playwright/test";

const outputDir = "./screenshots";
import fs from "fs";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function captureScreenshots() {
  const browser = await playwright.chromium.launch({
    executablePath: "/opt/pw-browsers/chromium",
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    console.log("📸 Capturing Hero Section...");
    await page.screenshot({ path: `${outputDir}/01-hero-initial.png`, fullPage: false });

    console.log("📸 Capturing Hero After Scroll...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.5);
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outputDir}/02-hero-scroll.png`, fullPage: false });

    console.log("📸 Capturing Transformation Section (Start)...");
    await page.evaluate(() => {
      window.scrollTo(0, document.querySelector("#transformation").offsetTop);
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${outputDir}/03-transformation-start.png`, fullPage: false });

    console.log("📸 Capturing Transformation Section (Mid)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outputDir}/04-transformation-mid.png`, fullPage: false });

    console.log("📸 Capturing Transformation Section (End)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.8);
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${outputDir}/05-transformation-end.png`, fullPage: false });

    console.log("📸 Capturing Product Reveal Section (Mug)...");
    await page.evaluate(() => {
      window.scrollTo(0, document.querySelector("#product-reveal").offsetTop);
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${outputDir}/06-product-mug.png`, fullPage: false });

    console.log("📸 Capturing Product Reveal Section (T-shirt)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outputDir}/07-product-tshirt.png`, fullPage: false });

    console.log("📸 Capturing Product Reveal Section (Print)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outputDir}/08-product-print.png`, fullPage: false });

    console.log("📸 Capturing Product Reveal Section (Tote)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outputDir}/09-product-tote.png`, fullPage: false });

    console.log("📸 Capturing Product Reveal Section (Final)...");
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 0.6);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outputDir}/10-product-final.png`, fullPage: false });

    await page.close();

    // Mobile screenshots
    console.log("\n📱 Capturing Mobile Views...");
    const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });

    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    console.log("📸 Capturing Hero Mobile...");
    await mobilePage.screenshot({ path: `${outputDir}/11-mobile-hero.png`, fullPage: false });

    console.log("📸 Capturing Transformation Mobile...");
    await mobilePage.evaluate(() => {
      window.scrollTo(0, document.querySelector("#transformation").offsetTop);
    });
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: `${outputDir}/12-mobile-transformation.png`, fullPage: false });

    console.log("📸 Capturing Product Mobile...");
    await mobilePage.evaluate(() => {
      window.scrollTo(0, document.querySelector("#product-reveal").offsetTop);
    });
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: `${outputDir}/13-mobile-product.png`, fullPage: false });

    await mobilePage.close();

    console.log("\n✅ Screenshots captured successfully!");
    console.log(`📁 All screenshots saved to ${outputDir}/`);
  } catch (error) {
    console.error("❌ Error capturing screenshots:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

captureScreenshots();
