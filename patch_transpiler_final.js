import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

// 1. Remove all typedefs and structs more cleanly
content = content.replace(
  "    // 3. Remove struct definitions\n    js = js.replace(/struct\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\};/g, '');",
  `    // 3. Remove struct definitions
    // Strip typedefs entirely
    js = js.replace(/typedef\\s+[A-Za-z0-9_\\s\\*]+;/g, '');
    // Strip union header specifically because it has nested struct
    js = js.replace(/union\\s+header\\s*\\{[\\s\\S]*?\\};/g, '');
    // Strip other structs/unions
    js = js.replace(/struct\\s+[A-Za-z0-9_]*\\s*\\{[\\s\\S]*?\\};/g, '');
    js = js.replace(/union\\s+[A-Za-z0-9_]*\\s*\\{[\\s\\S]*?\\};/g, '');`
);

// 2. Add C polyfills
content = content.replace(
  "      \`\n      ${js}",
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

// 3. Fix pointers
content = content.replace(
  "    // Construct evaluator Function",
  `    // Fix pointer dereferences in expressions
    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*\\+=/g, '$1 +=');
    js = js.replace(/\\*([a-zA-Z0-9_$]+)\\s*=/g, '$1 =');
    js = js.replace(/&([a-zA-Z0-9_$]+)/g, '$1');
    
    // Construct evaluator Function`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', content);
