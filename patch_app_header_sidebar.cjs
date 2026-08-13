const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Header Props
code = code.replace("        isLaboratoriesActive={false}\n        onOpenLaboratories={() => setViewMode('laboratories')}\n        isFlashcardsActive={false}\n        onOpenFlashcards={() => setViewMode('flashcards')}", "");

// Fix Sidebar Props
code = code.replace("isLaboratoriesActive={viewMode === 'laboratories'}", "isLaboratoriesActive={false}");
code = code.replace("isFlashcardsActive={viewMode === 'flashcards'}", "isFlashcardsActive={false}");

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App patched header and sidebar successfully.');
