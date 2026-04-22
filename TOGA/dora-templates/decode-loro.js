const fs = require('fs');
const path = require('path');

async function decodeLoro(binPath, outPath) {
  console.log(`Decoding ${binPath}...`);
  
  try {
    const { Loro } = require('loro-crdt');
    
    const data = fs.readFileSync(binPath);
    console.log(`Read ${data.length} bytes, magic: ${data.slice(0,4).toString()}`);
    
    const doc = new Loro();
    doc.import(data);
    
    // Get all the data
    const exported = doc.exportSnapshot();
    console.log(`Exported snapshot: ${exported.length} bytes`);
    
    // Try to get the JSON representation
    const jsonStr = doc.toJSON ? doc.toJSON() : null;
    if (jsonStr) {
      console.log('Got JSON!');
      const preview = typeof jsonStr === 'string' ? jsonStr.slice(0, 500) : JSON.stringify(jsonStr).slice(0, 500);
      console.log(preview);
      fs.writeFileSync(outPath, typeof jsonStr === 'string' ? jsonStr : JSON.stringify(jsonStr, null, 2));
      return;
    }
    
    // Try to get keys/containers
    console.log('Doc type:', typeof doc);
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(doc));
    console.log('Methods:', keys.slice(0, 30));
    
  } catch (e) {
    console.error(`Error: ${e.message}`);
    // Try different loro-crdt API
    try {
      const loro = require('loro-crdt');
      console.log('loro-crdt exports:', Object.keys(loro));
    } catch (e2) {
      console.error(`Import error: ${e2.message}`);
    }
  }
}

const files = [
  ['/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/project-3155964-realtime.bin',
   '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/template-3155964-decoded.json'],
  ['/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/project-3155963-realtime.bin',
   '/Users/nancypravin/kact/dailylogs/TOGA/dora-templates/template-3155963-decoded.json'],
];

(async () => {
  for (const [bin, out] of files) {
    await decodeLoro(bin, out);
    console.log('---');
  }
})();
