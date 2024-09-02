const fs = require('fs');
const path = require('path');

async function comandos() {
    const functionsDir = path.join(__dirname, 'functions');

    fs.readdirSync(functionsDir).forEach(file => {
    
        if (!file.endsWith('.js')) return;

        const module = require(path.join(functionsDir, file));
        if (typeof module === 'function') {
            module();
        }
    });
}

module.exports = comandos;