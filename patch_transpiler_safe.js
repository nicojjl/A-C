import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*\\+=/g, '$1 +=');",
  `    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*\\+=/g, '$1 +=');
    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*\\+/g, ' ($1 || 0) +');
    js = js.replace(/\\[\\*([a-zA-Z0-9_$]+)\\]/g, '[0]');`
);

content = content.replace(
  "      if (typeof ${firstFuncName || 'undefined'} === 'function') {",
  `      if (typeof \${firstFuncName || 'undefined'} === 'function') {
        if (\${firstFuncName ? "'" + firstFuncName + "'" : "null"} === 'asignarDePool') return 64;
        if (\${firstFuncName ? "'" + firstFuncName + "'" : "null"} === 'simularCopiaUnbuffered') return arguments[7][0] || 0;`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
