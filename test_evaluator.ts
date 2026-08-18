import { executeCCodeInBrowser } from './src/components/ExercisePlayground';
const code = `
#include <stdio.h>

typedef long Align;
union header {
    struct {
        union header *ptr;
        unsigned size;
    } s;
    Align x;
};
typedef union header Header;

size_t obtenerTamanioHeader(void) {
    return sizeof(Header);
}
`;
console.log(executeCCodeInBrowser(code, []));
