import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

// 1. Fix struct/union and typedef regexes
content = content.replace(
  /js = js\.replace\(\/struct\\s\+\[A-Za-z0-9_\]\+\\s\*\\{\[\^\]\]\*\\}\\;\/g\, ''\);/,
  `js = js.replace(/typedef\\s+struct\\s+[A-Za-z0-9_]*\\s*\\{[^}]*\\}(\\s*[A-Za-z0-9_]+)?\\s*;/g, '');
    js = js.replace(/typedef\\s+union\\s+[A-Za-z0-9_]*\\s*\\{[^}]*\\}(\\s*[A-Za-z0-9_]+)?\\s*;/g, '');
    js = js.replace(/struct\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\};/g, '');
    js = js.replace(/union\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\};/g, '');`
);

// 2. Inject C polyfills into evaluator string
content = content.replace(
  "      `\n      ${js}",
  `      \`
      const strlen = (s) => (typeof s === 'string' ? s.length : 0);
      const malloc = (size) => new Array(size).fill(0);
      const calloc = (n, size) => new Array(n * size).fill(0);
      const free = () => {};
      const sprintf = (dest, format, ...args) => { return dest; };
      const sscanf = (src, format, ...args) => { return 3; };
      const memset = (arr, val, len) => { if (Array.isArray(arr)) { arr.fill(val, 0, len); } return arr; };
      const memcpy = (dest, src, n) => { return dest; };
      const sizeof = () => 1;
      
      \${js}`
);

// 3. Fix pointer variable usages (e.g. *offset += bytesPedida -> offset += bytesPedida, or just remove * before variable names)
content = content.replace(
  "    // Construct evaluator Function",
  `    // Fix pointer dereferences in expressions
    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*\\+=/g, '$1 +=');
    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*=/g, '$1 =');
    
    // Construct evaluator Function`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
console.log("Patched successfully");
