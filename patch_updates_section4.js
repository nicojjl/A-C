import fs from 'fs';

let content = fs.readFileSync('src/data/updatesData.ts', 'utf8');

content = content.replace(
  "'Entorno Restaurado: El entorno de previsualización (Preview) vuelve a compilar y servir de manera estable sin errores 503 o caídas de contenedores. <a href=\"/\" class=\"text-[#C2410C] font-bold hover:underline\">¡Ver aquí la actu!</a>',",
  "'Entorno Restaurado: El entorno de previsualización (Preview) vuelve a compilar y servir de manera estable sin errores 503 o caídas de contenedores.',"
);

fs.writeFileSync('src/data/updatesData.ts', content);
