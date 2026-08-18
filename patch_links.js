import fs from 'fs';

// 1. Update UpdatesData to use specific #c-course?chapter=cap-X
let content = fs.readFileSync('src/data/updatesData.ts', 'utf8');
content = content.replace(
  /'Entorno Restaurado: El entorno de previsualización \\(Preview\\) vuelve a compilar y servir de manera estable sin errores 503 o caídas de contenedores\\.',/,
  "'Entorno Restaurado: El entorno de previsualización (Preview) vuelve a compilar y servir de manera estable sin errores 503 o caídas de contenedores.',"
);
content = content.replace(
  /href="#playground"/g,
  (match, offset, str) => {
    // Let's manually replace the 4 occurrences with specific chapters
    return `href="#playground"`; // Wait, I'll do it manually.
  }
);
fs.writeFileSync('src/data/updatesData.ts', content);
