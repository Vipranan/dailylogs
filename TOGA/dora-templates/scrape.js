const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates';

const urls = [
  {
    url: 'https://www.dora.run/e/3155964?copykey=b2337d86-0ca2-4340-a063-ac018558b090',
    id: '3155964'
  },
  {
    url: 'https://www.dora.run/e/3155963?copykey=94f130ba-c47a-4ca1-b10f-3284bc415ede',
    id: '3155963'
  }
];

async function scrapeTemplate(browser, config) {
  const { url, id } = config;
  console.log(`\n=== Scraping template ${id} ===`);
  
  const page = await browser.newPage();
  const captured = {
    requests: [],
    responses: [],
    projectData: null,
    windowVars: null
  };
  
  // Intercept all network requests
  await page.setRequestInterception(true);
  
  page.on('request', (req) => {
    const reqUrl = req.url();
    if (reqUrl.includes('project') || reqUrl.includes('api') || reqUrl.includes('dora.run')) {
      captured.requests.push({
        url: reqUrl,
        method: req.method(),
        headers: req.headers(),
        postData: req.postData()
      });
    }
    req.continue();
  });
  
  page.on('response', async (resp) => {
    const respUrl = resp.url();
    if (respUrl.includes('project') || respUrl.includes('api') || respUrl.includes('dora.run')) {
      try {
        const contentType = resp.headers()['content-type'] || '';
        if (contentType.includes('json') || contentType.includes('javascript')) {
          const text = await resp.text().catch(() => '');
          if (text && text.length > 0 && text.length < 5000000) {
            captured.responses.push({
              url: respUrl,
              status: resp.status(),
              contentType,
              body: text.substring(0, 100000)
            });
          }
        }
      } catch (e) {}
    }
  });
  
  try {
    console.log(`  Navigating to ${url}...`);
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });
    
    // Wait additional time for Flutter to initialize
    await new Promise(r => setTimeout(r, 10000));
    
    // Extract window variables
    captured.windowVars = await page.evaluate(() => {
      const vars = {};
      if (window.__ENV) vars.__ENV = window.__ENV;
      if (window.DORA_PROJECT_PREPARATION) {
        try { vars.DORA_PROJECT_PREPARATION = JSON.parse(window.DORA_PROJECT_PREPARATION); }
        catch(e) { vars.DORA_PROJECT_PREPARATION_raw = window.DORA_PROJECT_PREPARATION; }
      }
      if (window.FLUTTER_PRE_ASSET_BUNDLE) vars.FLUTTER_PRE_ASSET_BUNDLE = window.FLUTTER_PRE_ASSET_BUNDLE;
      // Look for any project data stored in window
      for (const key of Object.keys(window)) {
        if (key.toLowerCase().includes('project') || key.toLowerCase().includes('dora') || key.toLowerCase().includes('template')) {
          try {
            const val = window[key];
            if (typeof val !== 'function' && typeof val !== 'undefined') {
              vars[key] = typeof val === 'object' ? JSON.stringify(val).substring(0, 1000) : String(val).substring(0, 1000);
            }
          } catch(e) {}
        }
      }
      return vars;
    });
    
    // Get page content / innerHTML
    const html = await page.content();
    fs.writeFileSync(path.join(OUTPUT_DIR, `rendered-${id}.html`), html);
    console.log(`  Saved rendered HTML (${html.length} bytes)`);
    
  } catch (err) {
    console.error(`  Error: ${err.message}`);
  }
  
  // Save captured data
  const output = {
    id,
    url,
    capturedAt: new Date().toISOString(),
    windowVars: captured.windowVars,
    networkRequests: captured.requests.slice(0, 50),
    networkResponses: captured.responses.slice(0, 20)
  };
  
  const outPath = path.join(OUTPUT_DIR, `template-${id}-network.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`  Saved network capture to ${outPath}`);
  
  await page.close();
  return output;
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    timeout: 30000
  });
  
  try {
    for (const config of urls) {
      await scrapeTemplate(browser, config);
    }
  } finally {
    await browser.close();
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
