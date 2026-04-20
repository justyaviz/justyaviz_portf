const https = require('https');

function fetchAndExtractColors(url) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      const colors = data.match(/#[a-fA-F0-9]{3,6}/g);
      if (colors) {
        const unique = [...new Set(colors.map(c => c.toLowerCase()))];
        console.log("Colors in", url, ":", unique);
      }
    });
  });
}

fetchAndExtractColors('https://www.applar.uz/_next/static/css/0b8971e16d3de30e.css');
fetchAndExtractColors('https://www.applar.uz/_next/static/css/11663eb5ca3c6d95.css');
