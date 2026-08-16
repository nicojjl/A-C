const fs = require('fs');
let code = fs.readFileSync('src/data/cCourseData.ts', 'utf8');

const cap8Idx = code.indexOf("id: 'cap-8'");
const theoryStart = code.indexOf("theoryContent: `", cap8Idx) + "theoryContent: `".length;
const theoryEnd = code.indexOf("`,\n    codeExamples:", theoryStart);

let theoryContent = code.substring(theoryStart, theoryEnd);

// Find all backticks in the theoryContent and escape them if they aren't already
// Since we generated them with ` it is literal ` in the file right now.
theoryContent = theoryContent.replace(/`/g, "\\`");

const prefix = code.substring(0, theoryStart);
const suffix = code.substring(theoryEnd);

fs.writeFileSync('src/data/cCourseData.ts', prefix + theoryContent + suffix);
console.log("Syntax fixed in cCourseData!");
