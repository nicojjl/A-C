const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const propsInterface = `  onOpenLaboratories?: () => void;`;
const propsInterfaceRepl = `  onOpenLaboratories?: () => void;
  onOpenFlashcards?: () => void;`;

const destruct = `  onOpenLaboratories,`;
const destructRepl = `  onOpenLaboratories,
  onOpenFlashcards,`;

const tileEnd = `          {/* TILE 6: LEADERBOARD */}`;
const tileEndRepl = `          {/* TILE 6: FLASHCARDS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenFlashcards && onOpenFlashcards()}
            className="group relative bg-white border-2 border-[#E5E2DE] hover:border-[#F59E0B] rounded-2xl p-6 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center h-full"
          >
            <div className="absolute inset-0 bg-[#FFFBEB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-[#FFFBEB] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h3 className="font-serif font-bold text-[#1A1A1A] text-lg mb-2 relative z-10">
              Flashcards
            </h3>
            <p className="text-[#8C8882] text-xs font-mono relative z-10 leading-relaxed line-clamp-3">
              Tarjetas de memoria para repasar conceptos rápidamente.
            </p>
          </motion.div>

          {/* TILE 7: LEADERBOARD */}`;

const gridStr = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">`;
const gridStrRepl = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-5">`;

// add import 
code = code.replace("  Code,\n  BrainCircuit,", "  Code,\n  BrainCircuit,\n  Layers,");

code = code.replace(propsInterface, propsInterfaceRepl);
code = code.replace(destruct, destructRepl);
code = code.replace(gridStr, gridStrRepl);
code = code.replace(tileEnd, tileEndRepl);

fs.writeFileSync('src/components/DashboardView.tsx', code, 'utf8');
console.log('Dashboard patched successfully.');
