const fs = require('fs');
let file = fs.readFileSync('src/components/ExercisePlayground.tsx', 'utf8');

const newRegexes = `
    js = js.replace(/\\*+\\s*([a-zA-Z0-9_$]+)/g, (match, p1, offset, string) => {
        let prevChar = string.substring(0, offset).trim().slice(-1);
        if (/^[a-zA-Z0-9_)$\\]]$/.test(prevChar)) {
            return match;
        }
        return p1;
    });
    js = js.replace(/([a-zA-Z0-9_$]+)\\s*\\+\\+\\s*=\\s*([a-zA-Z0-9_$]+)\\s*\\+\\+/g, '$1 = $2');
`;

// Insert the new regexes right before "Replace arrow operator"
file = file.replace(/\/\/ Replace arrow operator/, newRegexes + "\n    // Replace arrow operator");

fs.writeFileSync('src/components/ExercisePlayground.tsx', file);
