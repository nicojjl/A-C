import { executeCCodeInBrowser } from './src/components/ExercisePlayground.tsx';
import fs from 'fs';

let capturedJs = "";
// Hack to capture the JS before it crashes if we could
// Actually let's just copy the logic manually here to see what it generates.

const code = `
int mi_strlen_ptr(const char *str) {
    const char *ptr = str;
    while (*ptr) {
        ptr++;
    }
    return ptr - str;
}
`;

// It returns { error: ... } let's see why "Unexpected identifier 'mi_strlen_ptr'"
const res = executeCCodeInBrowser(code, []);
console.log(res);


