const fs = require('fs');
let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

const propsInterface = `  isLaboratoriesActive?: boolean;
  onOpenLaboratories?: () => void;`;
const propsInterfaceRepl = `  isLaboratoriesActive?: boolean;
  onOpenLaboratories?: () => void;
  isFlashcardsActive?: boolean;
  onOpenFlashcards?: () => void;`;

const destruct = `  isLaboratoriesActive = false,
  onOpenLaboratories,`;
const destructRepl = `  isLaboratoriesActive = false,
  onOpenLaboratories,
  isFlashcardsActive = false,
  onOpenFlashcards,`;

const button = `        </button>
      </div>

      {/* Course / Visualizer Title Header */}`;
const buttonRepl = `        </button>
        <button
          onClick={() => {
            if (onOpenFlashcards) {
              onOpenFlashcards();
            }
          }}
          className={\`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 \${
            isFlashcardsActive
              ? 'border-[#C2410C] bg-[#C2410C] text-white shadow-xs'
              : 'border-[#FDBA74] bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C]'
          }\`}
        >
          <div className="flex items-center gap-2.5">
            <div className={\`p-1.5 rounded-lg \${isFlashcardsActive ? 'bg-white text-[#C2410C]' : 'bg-[#C2410C] text-white'}\`}>
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Tarjetas de Memoria
              </span>
              <span className={\`text-[10px] font-mono block \${isFlashcardsActive ? 'text-white/80' : 'text-[#C2410C]'}\`}>
                Repaso espaciado rápido
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>
      </div>

      {/* Course / Visualizer Title Header */}`;

// Add Layers import
code = code.replace("  X,\n  Filter", "  X,\n  Filter,\n  Layers");
code = code.replace(propsInterface, propsInterfaceRepl);
code = code.replace(destruct, destructRepl);
code = code.replace(button, buttonRepl);

fs.writeFileSync('src/components/Sidebar.tsx', code, 'utf8');
console.log('Sidebar patched successfully.');
