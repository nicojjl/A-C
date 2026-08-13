const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const propsInterface = `  isCertamenesActive?: boolean;
}`;
const propsInterfaceRepl = `  isCertamenesActive?: boolean;
  isLaboratoriesActive?: boolean;
  onOpenLaboratories?: () => void;
  isFlashcardsActive?: boolean;
  onOpenFlashcards?: () => void;
}`;

code = code.replace(propsInterface, propsInterfaceRepl);

fs.writeFileSync('src/components/Header.tsx', code, 'utf8');
console.log('Header patched successfully.');
