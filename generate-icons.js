// Quick icon generator for PWA
const fs = require('fs');

// Create SVG template
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)"/>
  <text x="${size/2}" y="${size*0.625}" font-family="Arial, sans-serif" font-size="${size*0.35}" font-weight="bold" fill="white" text-anchor="middle">GH</text>
</svg>
`;

// Save SVG files
fs.writeFileSync('public/icon-192.svg', createSVG(192));
fs.writeFileSync('public/icon-512.svg', createSVG(512));

console.log('✅ Created icon-192.svg and icon-512.svg');
console.log('');
console.log('NEXT STEPS:');
console.log('1. Convert SVGs to PNGs using one of these methods:');
console.log('   - Online: https://cloudconvert.com/svg-to-png');
console.log('   - Mac: Open SVG in Preview, Export as PNG');
console.log('   - Or use the create-icons.html file in your browser');
console.log('');
console.log('2. Save as icon-192.png and icon-512.png in public/ folder');
