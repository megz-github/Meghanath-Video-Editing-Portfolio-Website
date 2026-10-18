const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artDir = 'C:\\Users\\mdmeg\\.gemini\\antigravity\\brain\\a9d9a474-c8f2-4ced-8213-b3e67bdd2022';

async function capture() {
  console.log('Launching Edge via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop (1440x900)
  console.log('Capturing Desktop (1440x900)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Click on the preloader to skip it immediately and trigger hero reveal
  try {
    const preloader = await page.$('[role="progressbar"]');
    if (preloader) {
      await preloader.click();
      console.log('Skipped preloader.');
    }
  } catch (e) {}

  // Wait 1.5s for Hero animations to settle
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(artDir, 'desktop-hero.png'),
  });
  console.log('Saved desktop-hero.png');

  // Scroll down to Showreel section
  await page.evaluate(() => {
    const el = document.getElementById('showreel');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(artDir, 'desktop-showreel.png'),
  });
  console.log('Saved desktop-showreel.png');

  // Scroll down to Project Index & About
  await page.evaluate(() => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(artDir, 'desktop-index.png'),
  });
  console.log('Saved desktop-index.png');

  // Scroll down to Short Form Content section
  await page.evaluate(() => {
    const el = document.getElementById('shorts');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(artDir, 'desktop-shorts.png'),
  });
  console.log('Saved desktop-shorts.png');

  // Test Shorts Reel Modal
  try {
    const reelCard = await page.$('#shorts [role="button"]');
    if (reelCard) {
      await reelCard.click();
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({
        path: path.join(artDir, 'desktop-shorts-modal.png'),
      });
      console.log('Saved desktop-shorts-modal.png');
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 600));
    }
  } catch (e) {
    console.error('Shorts modal capture error:', e);
  }

  // Scroll down to Photography & Stills section
  await page.evaluate(() => {
    const el = document.getElementById('stills');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(artDir, 'desktop-stills.png'),
  });
  console.log('Saved desktop-stills.png');

  // Test Photography Lightbox
  try {
    const photoCard = await page.$('#stills [role="button"]');
    if (photoCard) {
      await photoCard.click();
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({
        path: path.join(artDir, 'desktop-stills-lightbox.png'),
      });
      console.log('Saved desktop-stills-lightbox.png');
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 600));
    }
  } catch (e) {
    console.error('Photo lightbox capture error:', e);
  }

  // Scroll to About section
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artDir, 'desktop-about.png'),
  });
  console.log('Saved desktop-about.png');

  // Scroll to Contact section
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artDir, 'desktop-contact.png'),
  });
  console.log('Saved desktop-contact.png');

  // Test Modal Player by clicking a project row
  try {
    const projectRow = await page.$('#work [role="button"]');
    if (projectRow) {
      await projectRow.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(artDir, 'desktop-modal.png'),
      });
      console.log('Saved desktop-modal.png');
      // Press Escape to close modal
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (e) {
    console.error('Modal test error:', e);
  }

  // 2. Tablet (768x1024)
  console.log('Capturing Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  try {
    const preloader = await page.$('[role="progressbar"]');
    if (preloader) await preloader.click();
  } catch (e) {}
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(artDir, 'tablet-hero.png'),
  });
  console.log('Saved tablet-hero.png');

  // 3. Mobile (375x812)
  console.log('Capturing Mobile (375x812)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  try {
    const preloader = await page.$('[role="progressbar"]');
    if (preloader) await preloader.click();
  } catch (e) {}
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(artDir, 'mobile-hero.png'),
  });
  console.log('Saved mobile-hero.png');

  // Scroll on mobile to show vertical card stack
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artDir, 'mobile-work.png'),
  });
  console.log('Saved mobile-work.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
