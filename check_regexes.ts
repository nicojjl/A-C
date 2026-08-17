const typeRegexPart = '(?:int|double|float|char|bool|long\\\\s+long|long|short|size_t|void|unsigned|struct\\\\s+[a-zA-Z0-9_]+)';

// Using raw string equivalents to what would be written in the file:
const r1 = new RegExp(`\\\\b(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}\\\\s+([a-zA-Z0-9_$]+)\\\\s*\\\\\\[([0-9]*)\\\\\\]\\\\s*,\\\\s*([a-zA-Z0-9_$]+)\\\\s*\\\\\\[([0-9]*)\\\\\\]\\\\s*;`, 'g');
console.log("1. multi:\n" + r1.source);

const r2 = new RegExp(`\\\\b(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s+([a-zA-Z0-9_$]+)\\\\s*\\\\\\[([^\\\\]]*)\\\\\\]\\\\s*\\\\\\[([^\\\\]]*)\\\\\\]\\\\s*(?:=[^;]+)?;`, 'g');
console.log("\n2. array2D:\n" + r2.source);

const r3 = new RegExp(`\\\\b(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s+([a-zA-Z0-9_$]+)\\\\s*\\\\\\[([^\\\\]]*)\\\\\\]\\\\s*(?:=[^;]+)?;`, 'g');
console.log("\n3. array1D:\n" + r3.source);

const r4 = new RegExp(`\\\\b(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s*([a-zA-Z0-9_$]+)\\\\s*=`, 'g');
console.log("\n4. declAssign:\n" + r4.source);

const r5 = new RegExp(`\\\\b(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s*([a-zA-Z0-9_$]+)\\\\s*;`, 'g');
console.log("\n5. declSemi:\n" + r5.source);

const r6 = new RegExp(`^(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s*([a-zA-Z0-9_$]+)\\\\s*\\\\(([^)]*)\\\\)\\\\s*\\\\{`, 'gm');
console.log("\n6. funcSigRegex:\n" + r6.source);

const r7 = new RegExp(`^(?:const\\\\s+)?(?:unsigned\\\\s+|signed\\\\s+)?${typeRegexPart}(?:\\\\s*\\\\*)*\\\\s*`, '');
console.log("\n7. cleanParamsRegex:\n" + r7.source);

