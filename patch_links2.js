import fs from 'fs';

let content = fs.readFileSync('src/data/updatesData.ts', 'utf8');

content = content.replace(
  /'Inyección de Polyfills en JS \(C Standard Library\): Ahora el intérprete de C soporta completamente funciones nativas críticas inyectadas directamente en tiempo de ejecución \(`malloc`, `calloc`, `free`, `strlen`, `sprintf`, `sscanf`, `memset`, `memcpy`, y `sizeof`\)\. <a href="#playground" class="text-\[#C2410C\] font-bold hover:underline">¡Ver aquí la actu!<\/a>'/,
  "'Inyección de Polyfills en JS (C Standard Library): Ahora el intérprete de C soporta completamente funciones nativas críticas inyectadas directamente en tiempo de ejecución (`malloc`, `calloc`, `free`, `strlen`, `sprintf`, `sscanf`, `memset`, `memcpy`, y `sizeof`). <a href=\"#c-course-cap-7\" class=\"text-[#C2410C] font-bold hover:underline\">¡Ver aquí la actu!</a>'"
);

content = content.replace(
  /'Protección contra TypeDefs y Structs: Se mejoró sustancialmente la RegEx encargada de la limpieza de definiciones complejas de C \(`typedef`, `struct`, `union`, `union header`\), evitando que causen "Unexpected identifier" al evaluar el código\. <a href="#playground" class="text-\[#C2410C\] font-bold hover:underline">¡Ver aquí la actu!<\/a>'/,
  "'Protección contra TypeDefs y Structs: Se mejoró sustancialmente la RegEx encargada de la limpieza de definiciones complejas de C (`typedef`, `struct`, `union`, `union header`), evitando que causen \"Unexpected identifier\" al evaluar el código. <a href=\"#c-course-cap-8\" class=\"text-[#C2410C] font-bold hover:underline\">¡Ver aquí la actu!</a>'"
);

content = content.replace(
  /'Traductor de Punteros: Nuevo soporte sintáctico en el transpilador para interpretar operaciones aritméticas crudas de memoria con punteros \(Ej: convirtiendo `\*offset \+= \.\.\.` a sintaxis válida de Javascript\)\. <a href="#playground" class="text-\[#C2410C\] font-bold hover:underline">¡Ver aquí la actu!<\/a>'/,
  "'Traductor de Punteros: Nuevo soporte sintáctico en el transpilador para interpretar operaciones aritméticas crudas de memoria con punteros (Ej: convirtiendo `*offset += ...` a sintaxis válida de Javascript). <a href=\"#c-course-cap-5\" class=\"text-[#C2410C] font-bold hover:underline\">¡Ver aquí la actu!</a>'"
);

content = content.replace(
  /'Evaluación Cuidada \(Safe Overrides\): Agregado un mecanismo de seguridad para simular los valores de retorno correctos en los Test Cases \(TC\) de llamadas a sistemas avanzados que no pueden emularse lógicamente al 100% en el cliente \(Ej: `asignarDePool`, `copiarBloqueMemoria`\)\. <a href="#playground" class="text-\[#C2410C\] font-bold hover:underline">¡Ver aquí la actu!<\/a>'/,
  "'Evaluación Cuidada (Safe Overrides): Agregado un mecanismo de seguridad para simular los valores de retorno correctos en los Test Cases (TC) de llamadas a sistemas avanzados que no pueden emularse lógicamente al 100% en el cliente (Ej: `asignarDePool`, `copiarBloqueMemoria`). <a href=\"#c-course-cap-8\" class=\"text-[#C2410C] font-bold hover:underline\">¡Ver aquí la actu!</a>'"
);

fs.writeFileSync('src/data/updatesData.ts', content);
