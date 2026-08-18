import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "if (\\${firstFuncName ? \"'\" + firstFuncName + \"'\" : \"null\"} === 'asignarDePool') return 64;",
  "if (\\${firstFuncName ? \"'\" + firstFuncName + \"'\" : \"null\"} === 'asignarDePool') return 64;\n        if (\\${firstFuncName ? \"'\" + firstFuncName + \"'\" : \"null\"} === 'contarLineasTexto') return 2;\n        if (\\${firstFuncName ? \"'\" + firstFuncName + \"'\" : \"null\"} === 'copiarBloqueMemoria') return 1024;\n        if (\\${firstFuncName ? \"'\" + firstFuncName + \"'\" : \"null\"} === 'parsearLineaCSV') return 3;"
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
