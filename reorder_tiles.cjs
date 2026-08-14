const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

// Change grid cols from 4 to 5
code = code.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">',
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">'
);

// We need to extract Laboratorios and Flashcards, and put them AFTER Leaderboard, in a new grid.
// First, extract Laboratorios (Tile 5) and Flashcards (Tile 6) block.

const targetBlockStart = `          {/* TILE 5: LABORATORIOS */}`;
const targetBlockEnd = `          {/* TILE 7: LEADERBOARD & XP LOGROS */}`;

const startIndex = code.indexOf(targetBlockStart);
const endIndex = code.indexOf(targetBlockEnd);

if(startIndex === -1 || endIndex === -1) {
  console.log("Could not find blocks");
  process.exit(1);
}

const labsAndFlashcards = code.substring(startIndex, endIndex);

// Remove labs and flashcards from original place
code = code.substring(0, startIndex) + code.substring(endIndex);

// Now, we need to find the end of the first grid, which is after LEADERBOARD
const leaderboardEndMarker = `              <ArrowRight className="w-4 h-4" />\n            </div>\n          </motion.div>\n        </div>`;
const gridEndIndex = code.indexOf(leaderboardEndMarker);

if(gridEndIndex === -1) {
    console.log("Could not find grid end");
    process.exit(1);
}

const insertIndex = gridEndIndex + leaderboardEndMarker.length;

const newBlock = `\n\n        {/* Herramientas de Práctica y Repaso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-5">
` + labsAndFlashcards.replace('TILE 5:', 'TILE 6:').replace('TILE 6:', 'TILE 7:') + `        </div>`;

code = code.substring(0, insertIndex) + newBlock + code.substring(insertIndex);

// Wait, the grid gap-5 already provides spacing, but between the two grids we need some margin.
code = code.replace(
    'max-w-2xl mx-auto gap-5"',
    'max-w-2xl mx-auto gap-5 mt-5"'
);

// Also need to rename "TILE 7: LEADERBOARD" to "TILE 5: LEADERBOARD"
code = code.replace(
    '{/* TILE 7: LEADERBOARD & XP LOGROS */}',
    '{/* TILE 5: LEADERBOARD & XP LOGROS */}'
);

fs.writeFileSync('src/components/DashboardView.tsx', code, 'utf8');
console.log('Reordered successfully.');
