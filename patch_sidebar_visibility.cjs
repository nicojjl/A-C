const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target1 = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && viewMode !== 'laboratories' && viewMode !== 'flashcards' && (`;
const replacement1 = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && (`;

const target2 = `            isLaboratoriesActive={false}
            onOpenLaboratories={() => setViewMode('laboratories')}
            isFlashcardsActive={false}
            onOpenFlashcards={() => setViewMode('flashcards')}`;
const replacement2 = `            isLaboratoriesActive={viewMode === 'laboratories'}
            onOpenLaboratories={() => setViewMode('laboratories')}
            isFlashcardsActive={viewMode === 'flashcards'}
            onOpenFlashcards={() => setViewMode('flashcards')}`;

if(code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replacement1);
    code = code.replace(target2, replacement2);
    fs.writeFileSync('src/App.tsx', code, 'utf8');
    console.log('App.tsx sidebar visibility patched successfully.');
} else {
    console.log('Targets not found!');
}
