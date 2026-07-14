// validate_all.js
const fs = require('fs');
const vm = require('vm');

const files = [
    '/home/hoanh/development/HTML/SmartRent/db.js',
    '/home/hoanh/development/HTML/SmartRent/index.html',
    '/home/hoanh/development/HTML/SmartRent/tenant.html',
    '/home/hoanh/development/HTML/SmartRent/landlord.html'
];

files.forEach(file => {
    console.log(`Checking file: ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    
    if (file.endsWith('.js')) {
        try {
            new vm.Script(content);
            console.log(`  --> JS Syntax OK`);
        } catch (e) {
            console.error(`  --> JS Syntax ERROR:`, e);
            process.exit(1);
        }
    } else {
        // Extract script tags and check syntax
        const scripts = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || [];
        scripts.forEach((s, idx) => {
            if (/^<script\s+[^>]*\bsrc\s*=/i.test(s.trim())) return; // Skip external src scripts
            const code = s.replace(/<script[^>]*>|<\/script>/g, '');
            try {
                new vm.Script(code);
                console.log(`  --> Script tag ${idx} Syntax OK`);
            } catch (e) {
                console.error(`  --> Script tag ${idx} Syntax ERROR:`, e);
                console.error(`Code snippet:\n${code.slice(0, 300)}...`);
                process.exit(1);
            }
        });
    }
});

console.log('All files verified successfully!');
