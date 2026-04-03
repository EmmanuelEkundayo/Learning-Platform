const fs = require('fs');
const path = require('path');
const dir = 'src/data/cheatsheets';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(f => {
    const p = path.join(dir, f);
    const content = fs.readFileSync(p, 'utf8');
    
    // Replace ${ with \${ but NOT if it's already \${
    // Simple way: first replace all \${ with ${ then replace all ${ with \${
    // Or use a lookbehind if supported, but let's be safe:
    let updated = content;
    // Step 1: Normalize (all \${ becomes ${)
    updated = updated.split('\\${').join('${');
    // Step 2: Escape all ${ to \${
    updated = updated.split('${').join('\\${');
    
    if (content !== updated) {
        fs.writeFileSync(p, updated, 'utf8');
        console.log(`Fixed ${f}`);
    }
});
console.log('Done.');
