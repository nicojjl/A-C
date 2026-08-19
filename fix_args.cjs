const fs = require('fs');
let file = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

file = file.replace(/const parsedArg = new Function\(`return \$\{tc\.input\};`\)\(\);/g, "const parsedArg = new Function(`return [${tc.input}];`)();");
// If we wrap it in [], then parsedArg is always an array!
// So we don't need `argVal = Array.isArray(parsedArg) ? parsedArg : [parsedArg];`
// But wait! If it's already an array inside an array `[[2, 5]]` we might want to unwrap if the original was `"[2, 5]"`.
// Actually, let's just do a robust parse:
file = file.replace(/const parsedArg =.*?\n\s*argVal = Array\.isArray\(parsedArg\).*?;/s, `let rawReturn = new Function(\`return \${tc.input};\`)();
          if (typeof tc.input === 'string' && tc.input.includes(',') && !tc.input.trim().startsWith('[')) {
              // it's a comma separated list without brackets, like "2, 5"
              rawReturn = new Function(\`return [\${tc.input}];\`)();
          }
          argVal = Array.isArray(rawReturn) ? rawReturn : [rawReturn];`);

fs.writeFileSync('src/components/ExercisePlayground.tsx', file);
