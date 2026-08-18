import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "    const evaluator = new Function(",
  `    console.log("EVAL JS:", js);\n    const evaluator = new Function(`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
