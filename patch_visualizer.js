const fs = require('fs');
let code = fs.readFileSync('src/components/CCourseView.tsx', 'utf8');

const startMarker = '{/* Inspector 1: Punteros y Memoria Stack */}';
const endMarker = '{/* Inspector 2: Interactive Bitwise Operator Switchboard */}';

const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newCode = code.slice(0, startIndex) +
    `{/* Inspector 1: Punteros y Memoria Stack interactivo */}
            <InteractiveMemoryVisualizer />

            ` +
    code.slice(endIndex);
  
  fs.writeFileSync('src/components/CCourseView.tsx', newCode, 'utf8');
  console.log('Patched CCourseView.tsx successfully.');
} else {
  console.log('Failed to find markers.');
}
