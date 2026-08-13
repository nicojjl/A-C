const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const strToReplace1 = `isLaboratoriesActive={viewMode === 'laboratories'}`;
const strToReplace1Repl = `isLaboratoriesActive={false}`;

const strToReplace2 = `isFlashcardsActive={viewMode === 'flashcards'}`;
const strToReplace2Repl = `isFlashcardsActive={false}`;

code = code.replace(strToReplace1, strToReplace1Repl);
code = code.replace(strToReplace2, strToReplace2Repl);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App patched types successfully.');
