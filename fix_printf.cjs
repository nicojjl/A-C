const fs = require('fs');
let file = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

file = file.replace(/} else if \(type === 's'\) \{\s*const str = String\(val\);\s*if \(width\)/,
  `} else if (type === 's') {\n          const str = Array.isArray(val) ? val.join('') : String(val);\n          if (width)`
);

fs.writeFileSync('src/components/ExercisePlayground.tsx', file);
