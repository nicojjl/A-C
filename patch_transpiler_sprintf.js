import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "const sprintf = (dest, format, ...args) => { return dest; };",
  "const sprintf = (dest, format, ...args) => { printf(format, ...args); return dest; };"
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
