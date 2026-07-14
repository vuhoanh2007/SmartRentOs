// test_tenant.js
const fs = require('fs');
const vm = require('vm');

// Mock localStorage
const store = {};
const localStorageMock = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; }
};

// Mock DOM elements
const documentMock = {
    getElementById: (id) => {
        return {
            innerText: '',
            value: '',
            classList: {
                add: () => {},
                remove: () => {},
                replace: () => {}
            },
            getContext: () => ({})
        };
    }
};

const windowMock = {
    location: { href: '' }
};

const context = {
    localStorage: localStorageMock,
    document: documentMock,
    window: windowMock,
    console: console,
    setTimeout: setTimeout,
    Chart: function() { return { destroy: () => {} }; }
};
context.window.localStorage = localStorageMock;
context.window.document = documentMock;

vm.createContext(context);

// 1. Load db.js
const dbCode = fs.readFileSync('/home/hoanh/development/HTML/SmartRent/db.js', 'utf8');
vm.runInContext(dbCode, context);

// 2. Load tenant.html scripts
const html = fs.readFileSync('/home/hoanh/development/HTML/SmartRent/tenant.html', 'utf8');
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g) || html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
scripts.forEach((s, idx) => {
    // Only run inline script (skip external scripts with src attribute)
    if (/^<script\s+src=/i.test(s.trim())) return;
    const code = s.replace(/<script[^>]*>|<\/script>/g, '');
    try {
        console.log(`Running script block ${idx}...`);
        vm.runInContext(code, context);
        console.log(`Script block ${idx} executed successfully`);
    } catch (e) {
        console.error(`Runtime error in script block ${idx}:`, e);
        process.exit(1);
    }
});

console.log('All tests completed successfully!');
