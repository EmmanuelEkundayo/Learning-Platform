const fs = require('fs');
const path = require('path');
const dir = 'src/data/cheatsheets';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(f => {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace unescaped ${ with \${
    // We target ${ that is not preceded by \
    // We also avoid replacing already escaped \${
    const updated = content.replace(/(?<!\\)\$\{/g, '\\${');
    
    if (content !== updated) {
        console.log(`Fixing ${f}...`);
        fs.writeFileSync(filePath, updated, 'utf8');
    }
});
console.log('Done.');
