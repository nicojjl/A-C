const fs = require('fs');
let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

const propsInterface = `  isCertamenesActive?: boolean;
  onOpenCertamenes?: () => void;`;
const propsInterfaceRepl = `  isCertamenesActive?: boolean;
  onOpenCertamenes?: () => void;
  isLaboratoriesActive?: boolean;
  onOpenLaboratories?: () => void;`;

const destruct = `  isCertamenesActive = false,
  onOpenCertamenes,`;
const destructRepl = `  isCertamenesActive = false,
  onOpenCertamenes,
  isLaboratoriesActive = false,
  onOpenLaboratories,`;

const button = `        </button>
      </div>

      {/* Course / Visualizer Title Header */}`;
const buttonRepl = `        </button>
        <button
          onClick={() => {
            if (onOpenLaboratories) {
              onOpenLaboratories();
            }
          }}
          className={\`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 \${
            isLaboratoriesActive
              ? 'border-[#10B981] bg-[#10B981] text-white shadow-xs'
              : 'border-[#34D399] bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#059669]'
          }\`}
        >
          <div className="flex items-center gap-2.5">
            <div className={\`p-1.5 rounded-lg \${isLaboratoriesActive ? 'bg-white text-[#10B981]' : 'bg-[#10B981] text-white'}\`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Laboratorios (Proyectos)
              </span>
              <span className={\`text-[10px] font-mono block \${isLaboratoriesActive ? 'text-white/80' : 'text-[#059669]'}\`}>
                Desafíos guiados paso a paso
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>
      </div>

      {/* Course / Visualizer Title Header */}`;

code = code.replace(propsInterface, propsInterfaceRepl);
code = code.replace(destruct, destructRepl);
code = code.replace(button, buttonRepl);

fs.writeFileSync('src/components/Sidebar.tsx', code, 'utf8');
console.log('Sidebar patched successfully.');
