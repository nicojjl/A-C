const fs = require('fs');
let code = fs.readFileSync('src/data/coursesData.ts', 'utf8');

// The block has:
// **Ejemplo: Bucle con salto (Logarítmico)**
// ```c

code = code.replace("```c", "\\`\\`\\`c");
code = code.replace("```\nEn cada paso", "\\`\\`\\`\nEn cada paso");

fs.writeFileSync('src/data/coursesData.ts', code);
console.log("Syntax fixed!");
