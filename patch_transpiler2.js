import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

content = content.replace(
  "    js = js.replace(/typedef\\s+struct\\s+[A-Za-z0-9_]*\\s*\\{[^}]*\\}(\\s*[A-Za-z0-9_]+)?\\s*;/g, '');\n    js = js.replace(/typedef\\s+union\\s+[A-Za-z0-9_]*\\s*\\{[^}]*\\}(\\s*[A-Za-z0-9_]+)?\\s*;/g, '');\n    js = js.replace(/struct\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\};/g, '');\n    js = js.replace(/union\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\};/g, '');",
  `    js = js.replace(/union\\s+header\\s*\\{[\\s\\S]*?\\};/g, '');
    js = js.replace(/typedef\\s+[^;]+;/g, '');
    js = js.replace(/struct\\s+[A-Za-z0-9_]*\\s*\\{[\\s\\S]*?\\};/g, '');
    js = js.replace(/union\\s+[A-Za-z0-9_]*\\s*\\{[\\s\\S]*?\\};/g, '');`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
