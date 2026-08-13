import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'sintaxis',
    front: '¿Cuál es el formato para imprimir un puntero (dirección de memoria) con printf?',
    backMarkdown: 'Se utiliza el especificador `%p`.\n\nEs una buena práctica castear el puntero a `(void *)` al usar `%p` para garantizar una impresión correcta en todos los sistemas.',
    codeSnippet: 'int x = 10;\nint *ptr = &x;\nprintf("Dirección: %p\\n", (void *)ptr);'
  },
  {
    id: 'fc-2',
    category: 'sintaxis',
    front: '¿Cuál es la diferencia entre los especificadores %d y %u en printf/scanf?',
    backMarkdown: '`%d` se usa para imprimir enteros **con signo** (signed integers), es decir, que pueden ser negativos.\n\n`%u` se usa para enteros **sin signo** (unsigned integers), que solo pueden ser positivos.',
    codeSnippet: 'int a = -5;\nunsigned int b = 5;\nprintf("%d, %u", a, b);'
  },
  {
    id: 'fc-3',
    category: 'memoria',
    front: '¿Qué función devuelve memoria al sistema operativo después de haber sido reservada dinámicamente?',
    backMarkdown: 'La función `free(puntero)`.\n\nEs crucial llamarla cuando la memoria reservada con `malloc`, `calloc` o `realloc` ya no se necesita, para evitar *memory leaks* (fugas de memoria).',
    codeSnippet: 'int *arr = malloc(10 * sizeof(int));\n// usar arr...\nfree(arr);\narr = NULL; // Buena práctica'
  },
  {
    id: 'fc-4',
    category: 'archivos',
    front: 'Diferencia principal entre `fread` y `fseek`.',
    backMarkdown: '`fread` **lee** un bloque de datos binarios desde un archivo hacia la memoria (array o buffer).\n\n`fseek` **mueve** el cursor/puntero de posición del archivo a una ubicación específica sin leer datos.',
    codeSnippet: 'FILE *f = fopen("data.bin", "rb");\n// Mover cursor 10 bytes desde el inicio\nfseek(f, 10, SEEK_SET);\n// Leer 5 enteros\nfread(buffer, sizeof(int), 5, f);'
  },
  {
    id: 'fc-5',
    category: 'conceptos',
    front: '¿Qué es una Violación de Segmento (Segmentation Fault / Segfault)?',
    backMarkdown: 'Es un error de ejecución que ocurre cuando el programa intenta acceder a una dirección de memoria que **no le pertenece** o a la que **no tiene permisos** (ej. memoria de sólo lectura o desreferenciar un puntero `NULL` o no inicializado).'
  },
  {
    id: 'fc-6',
    category: 'punteros',
    front: '¿Qué hace el operador `*` cuando se aplica a una variable puntero?',
    backMarkdown: 'Realiza una **desreferenciación**. Esto significa que accede al valor que está almacenado en la dirección de memoria a la que apunta el puntero.',
    codeSnippet: 'int x = 42;\nint *p = &x;\n*p = 100; // Ahora x vale 100'
  },
  {
    id: 'fc-7',
    category: 'memoria',
    front: 'Diferencia entre `malloc` y `calloc`.',
    backMarkdown: '`malloc` reserva un bloque de memoria con tamaño especificado pero **no inicializa** los bits (contiene "basura").\n\n`calloc` reserva memoria para un arreglo de elementos e **inicializa todos los bits a cero**.',
    codeSnippet: 'int *m = malloc(5 * sizeof(int)); // Valores indeterminados\nint *c = calloc(5, sizeof(int));  // Valores inicializados en 0'
  }
];
