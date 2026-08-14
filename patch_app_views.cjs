const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add lazy imports
const importTarget = `const CertamenesView = lazy(() => import('./components/CertamenesView').then(m => ({ default: m.CertamenesView })));`;
const importReplacement = `${importTarget}
const LaboratoriesView = lazy(() => import('./components/LaboratoriesView').then(m => ({ default: m.LaboratoriesView })));
const FlashcardsView = lazy(() => import('./components/FlashcardsView').then(m => ({ default: m.FlashcardsView })));`;

if (code.includes(importTarget)) {
    code = code.replace(importTarget, importReplacement);
} else {
    console.error("Could not find importTarget");
    process.exit(1);
}

// 2. Add conditions in render block
const renderTarget = `              ) : viewMode === 'c_course' ? (`;
const renderReplacement = `              ) : viewMode === 'laboratories' ? (
                <LaboratoriesView />
              ) : viewMode === 'flashcards' ? (
                <FlashcardsView />
              ) : viewMode === 'c_course' ? (`;

if (code.includes(renderTarget)) {
    code = code.replace(renderTarget, renderReplacement);
} else {
    console.error("Could not find renderTarget");
    process.exit(1);
}

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log("App patched successfully");
