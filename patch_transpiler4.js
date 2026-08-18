import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "    // Construct evaluator Function",
  `    js = js.replace(/sizeof\\s*\\([^)]*\\)/g, '1');\n    // Construct evaluator Function`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
