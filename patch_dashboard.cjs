const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const propsInterface = `  onOpenCertamenes?: () => void;`;
const propsInterfaceRepl = `  onOpenCertamenes?: () => void;
  onOpenLaboratories?: () => void;`;

const destruct = `  onOpenCertamenes,`;
const destructRepl = `  onOpenCertamenes,
  onOpenLaboratories,`;

const gridStr = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">`;
const gridStrRepl = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">`;

const tileEnd = `          {/* TILE 5: LEADERBOARD */}`;
const tileEndRepl = `          {/* TILE 5: LABORATORIOS */}
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

          {/* TILE 6: LEADERBOARD */}`;

code = code.replace(propsInterface, propsInterfaceRepl);
code = code.replace(destruct, destructRepl);
code = code.replace(gridStr, gridStrRepl);
code = code.replace(tileEnd, tileEndRepl);

fs.writeFileSync('src/components/DashboardView.tsx', code, 'utf8');
console.log('Dashboard patched successfully.');
