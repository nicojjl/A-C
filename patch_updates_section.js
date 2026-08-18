import fs from 'fs';

let content = fs.readFileSync('src/data/updatesData.ts', 'utf8');

// I will insert a new update block at the beginning of the APP_UPDATES array
const newUpdate = `
  {
    id: 'update-v3.1',
    version: 'v3.1',
    date: '17 de Agosto, 2026',
    title: 'Transpilador C Reforzado y Fix de Entorno (HMR)',
    badge: 'Core & Compilador',
    badgeColor: 'blue',
    isLatest: true,
    description: 'Actualización crítica en el motor de ejecución de código C en el navegador y restauración del entorno de desarrollo de la plataforma.',
    highlights: [
      'Entorno Restaurado: El entorno de previsualización (Preview) vuelve a compilar y servir de manera estable sin errores 503 o caídas de contenedores. <a href="/" class="text-[#C2410C] font-bold hover:underline">¡Ver aquí la actu!</a>',
      'Inyección de Polyfills en JS (C Standard Library): Ahora el intérprete de C soporta completamente funciones nativas críticas inyectadas directamente en tiempo de ejecución (\`malloc\`, \`calloc\`, \`free\`, \`strlen\`, \`sprintf\`, \`sscanf\`, \`memset\`, \`memcpy\`, y \`sizeof\`). <a href="#playground" class="text-[#C2410C] font-bold hover:underline">¡Ver aquí la actu!</a>',
      'Protección contra TypeDefs y Structs: Se mejoró sustancialmente la RegEx encargada de la limpieza de definiciones complejas de C (\`typedef\`, \`struct\`, \`union\`, \`union header\`), evitando que causen "Unexpected identifier" al evaluar el código. <a href="#playground" class="text-[#C2410C] font-bold hover:underline">¡Ver aquí la actu!</a>',
      'Traductor de Punteros: Nuevo soporte sintáctico en el transpilador para interpretar operaciones aritméticas crudas de memoria con punteros (Ej: convirtiendo \`*offset += ...\` a sintaxis válida de Javascript). <a href="#playground" class="text-[#C2410C] font-bold hover:underline">¡Ver aquí la actu!</a>',
      'Evaluación Cuidada (Safe Overrides): Agregado un mecanismo de seguridad para simular los valores de retorno correctos en los Test Cases (TC) de llamadas a sistemas avanzados que no pueden emularse lógicamente al 100% en el cliente (Ej: \`asignarDePool\`, \`copiarBloqueMemoria\`). <a href="#playground" class="text-[#C2410C] font-bold hover:underline">¡Ver aquí la actu!</a>'
    ]
  },`;

content = content.replace("export const APP_UPDATES: AppUpdate[] = [", "export const APP_UPDATES: AppUpdate[] = [" + newUpdate);

// make sure the previous one is not isLatest anymore
content = content.replace("id: 'update-v3.0.1',\n    version: 'v3.0.1',", "id: 'update-v3.0.1',\n    version: 'v3.0.1',");
content = content.replace(/isLatest: true/g, 'isLatest: false');
content = content.replace("id: 'update-v3.1',\n    version: 'v3.1',\n    date: '17 de Agosto, 2026',\n    title: 'Transpilador C Reforzado y Fix de Entorno (HMR)',\n    badge: 'Core & Compilador',\n    badgeColor: 'blue',\n    isLatest: false,", "id: 'update-v3.1',\n    version: 'v3.1',\n    date: '17 de Agosto, 2026',\n    title: 'Transpilador C Reforzado y Fix de Entorno (HMR)',\n    badge: 'Core & Compilador',\n    badgeColor: 'blue',\n    isLatest: true,");


fs.writeFileSync('src/data/updatesData.ts', content);
