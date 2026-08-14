const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const target = `          {/* TILE 5: LEADERBOARD & XP LOGROS */}`;
const replacement = `          {/* TILE 5: LABORATORIOS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenLaboratories && onOpenLaboratories()}
            className="group relative bg-white border-2 border-[#E5E2DE] hover:border-[#10B981] rounded-2xl p-6 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center h-full"
          >
            <div className="absolute inset-0 bg-[#ECFDF5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Terminal className="w-8 h-8 text-[#10B981]" />
            </div>
            <h3 className="font-serif font-bold text-[#1A1A1A] text-lg mb-2 relative z-10">
              Laboratorios
            </h3>
            <p className="text-[#8C8882] text-xs font-mono relative z-10 leading-relaxed line-clamp-3">
              Proyectos guiados paso a paso para aplicar tus conocimientos.
            </p>
          </motion.div>

          {/* TILE 6: FLASHCARDS */}
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
              Tarjetas de memoria para repasar conceptos.
            </p>
          </motion.div>

          {/* TILE 7: LEADERBOARD & XP LOGROS */}`;

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/DashboardView.tsx', code, 'utf8');
    console.log('Successfully added tiles.');
} else {
    console.log('Target not found!');
}
