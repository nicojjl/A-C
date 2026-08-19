const fs = require('fs');
let file = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

// Remove my previous bad s=t regex
file = file.replace(/js = js\.replace\(\/\(\[a-zA-Z0-9_\$\]\+\)\\\\s\\\*\\\\\\+\\\\s\\\*=\\\\s\\\*\(\[a-zA-Z0-9_\$\]\+\)\\\\s\\\*\\\\\\+\/g, "\\$1 = \\$2"\);/g, '');

// Add the generic string copy loop replacement
const newRegex = `
    // Generic replacement for string copy loop: while ((*s++ = *t++) != '\\0');
    js = js.replace(/while\\s*\\(\\(\\s*\\*?\\s*([a-zA-Z0-9_$]+)\\s*\\+\\+\\s*=\\s*\\*?\\s*([a-zA-Z0-9_$]+)\\s*\\+\\+\\s*\\)\\s*!=\\s*'\\\\0'\\s*\\)\\s*;/g, "$1.splice(0, $1.length, ...(typeof $2 === 'string' ? $2.split('') : $2));");
`;
file = file.replace(/\/\/ Replace arrow operator/, newRegex + "\n    // Replace arrow operator");

fs.writeFileSync('src/components/ExercisePlayground.tsx', file);
