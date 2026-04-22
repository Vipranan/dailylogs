const fs = require('fs');
const { LoroDoc, LORO_VERSION } = require('loro-crdt');

console.log('Loro version:', LORO_VERSION);

async function decodeLoro(binPath, outPath) {
  console.log(`\nDecoding ${binPath}...`);
  
  const data = fs.readFileSync(binPath);
  console.log(`Read ${data.length} bytes`);
  
  const doc = new LoroDoc();
  
  try {
    doc.import(data);
    console.log('Imported successfully');
    
    // Try to get JSON
    const json = doc.toJSON();
    console.log('JSON keys:', Object.keys(json || {}));
    
    if (json) {
      const jsonStr = JSON.stringify(json, null, 2);
      fs.writeFileSync(outPath, jsonStr);
      console.log(`Saved ${jsonStr.length} bytes JSON to ${outPath}`);
      console.log('Preview:', jsonStr.slice(0, 1000));
    }
  } catch (e) {
    console.error('Import error:', e.message);
    
    // Try checking version compatibility
    try {
      const { decodeImportBlobMeta } = require('loro-crdt');
      const meta = decodeImportBlobMeta(data, false);
      console.log('Blob meta:', JSON.stringify(meta, null, 2));
    } catch (e2) {
      console.error('Meta decode error:', e2.message);
    }
  }
}

(async () => {
  await decodeLoro(
    '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/project-3155964-realtime.bin',
    '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/template-3155964-decoded.json'
  );
  await decodeLoro(
    '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/project-3155963-realtime.bin',
    '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/template-3155963-decoded.json'
  );
})();
