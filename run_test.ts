const typeRegexPart = '(?:int|double|float|char|bool|long\\s+long|long|short|size_t|void|unsigned|struct\\s+[a-zA-Z0-9_]+)';

function executeCCodeInBrowser(cCode: string, args: any[]) {
    let js = cCode;

    // multi
    js = js.replace(new RegExp(`\\b(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}\\s+([a-zA-Z0-9_$]+)\\s*\\[([0-9]*)\\]\\s*,\\s*([a-zA-Z0-9_$]+)\\s*\\[([0-9]*)\\]\\s*;`, 'g'), (match, v1, d1, v2, d2) => {
        return `let ${v1} = Array(${d1||'10'}).fill(0), ${v2} = Array(${d2||'10'}).fill(0);`;
    });

    // array2D
    const array2DRegex = new RegExp(`\\b(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s+([a-zA-Z0-9_$]+)\\s*\\[([^\\]]*)\\]\\s*\\[([^\\]]*)\\]\\s*(?:=[^;]+)?;`, 'g');
    js = js.replace(array2DRegex, (match, varName, d1, d2) => {
        const size1 = d1.trim() || '10';
        const size2 = d2.trim() || '10';
        return `let ${varName} = Array.from({length: ${size1}}, () => Array(${size2}).fill(0));`;
    });

    // array1D
    const array1DRegex = new RegExp(`\\b(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s+([a-zA-Z0-9_$]+)\\s*\\[([^\\]]*)\\]\\s*(?:=[^;]+)?;`, 'g');
    js = js.replace(array1DRegex, (match, varName, d1) => {
        const size1 = d1.trim() || '10';
        return `let ${varName} = Array(${size1}).fill(0);`;
    });

    // declAssign
    const declAssign = new RegExp(`\\b(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s*([a-zA-Z0-9_$]+)\\s*=`, 'g');
    js = js.replace(declAssign, 'let $1 =');

    // declSemi
    const declSemi = new RegExp(`\\b(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s*([a-zA-Z0-9_$]+)\\s*;`, 'g');
    js = js.replace(declSemi, 'let $1;');

    // funcSig
    let mainFuncName = '';
    let firstFuncName = '';
    const funcSigRegex = new RegExp(`^(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s*([a-zA-Z0-9_$]+)\\s*\\(([^)]*)\\)\\s*\\{`, 'gm');
    js = js.replace(funcSigRegex, (match, fnName, params) => {
        if (fnName === 'main') mainFuncName = 'main';
        if (!firstFuncName) firstFuncName = fnName;
        
        const cleanParamsRegex = new RegExp(`^(?:const\\s+)?(?:unsigned\\s+|signed\\s+)?${typeRegexPart}(?:\\s*\\*)*\\s*`, '');
        const cleanParams = params.split(',').map((p) => {
            let param = p.trim();
            if (!param) return '';
            param = param.replace(cleanParamsRegex, '');
            param = param.replace(/\[\]/g, '');
            param = param.replace(/\[[0-9]*\]/g, '');
            return param.trim();
        }).filter(Boolean).join(', ');
        
        return `function ${fnName}(${cleanParams}) {`;
    });

    // Remove pointer dereferences
    js = js.replace(/(^|[^\w\)])(?:[*&]+)([a-zA-Z_]\w*)/g, '$1$2');

    // Build evaluator
    try {
        const evaluator = new Function(`
            ${js}
            if (typeof ${mainFuncName || 'undefined'} === 'function') {
                return main();
            }
            if (typeof ${firstFuncName || 'undefined'} === 'function') {
                return ${firstFuncName}(...arguments[0]);
            }
            return undefined;
        `);
        const result = evaluator(args);
        return { success: true, returnValue: result };
    } catch(err) {
        return { success: false, error: err.message };
    }
}

console.log("Testing sumar...");
const sumCode = `int sumar(int a, int b) { return a + b; }`;
console.log(executeCCodeInBrowser(sumCode, [5, 7]));

console.log("\nTesting mi_strlen_ptr...");
const ptrCode = `
int mi_strlen_ptr(const char *str) {
    const char *ptr = str;
    while (*ptr) {
        ptr++;
    }
    return ptr - str;
}
`;
console.log(executeCCodeInBrowser(ptrCode, ["Punteros"]));

