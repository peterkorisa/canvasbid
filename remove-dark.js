import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Regex to remove dark:classes
            // This regex matches dark: followed by word characters, dashes, slashes, or brackets.
            // It also eats a trailing space to prevent double spaces.
            const newContent = content.replace(/\bdark:[\w\-\/\[\]#]+\s?/g, '');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

walkDir(path.join(__dirname, 'src'));
