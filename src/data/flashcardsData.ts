import { Flashcard } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Sintaxis y Variables',
    front: '¿Cuál es el formato para imprimir un puntero (dirección de memoria) con printf?',
    backMarkdown: 'Se utiliza el especificador `%p`.\n\nEs una buena práctica castear el puntero a `(void *)` al usar `%p` para garantizar una impresión correcta en todos los sistemas.',
    codeSnippet: 'int x = 10;\nint *ptr = &x;\nprintf("Dirección: %p\\n", (void *)ptr);'
  },
  {
    id: 'fc-2',
    category: 'Sintaxis y Variables',
    front: '¿Cuál es la diferencia entre los especificadores %d y %u en printf/scanf?',
    backMarkdown: '`%d` se usa para imprimir enteros **con signo** (signed integers), es decir, que pueden ser negativos.\n\n`%u` se usa para enteros **sin signo** (unsigned integers), que solo pueden ser positivos.',
    codeSnippet: 'int a = -5;\nunsigned int b = 5;\nprintf("%d, %u", a, b);'
  },
  {
    id: 'fc-v1',
    category: 'Sintaxis y Variables',
    front: '¿Qué es una variable global vs una variable local en C?',
    backMarkdown: 'Una **variable local** se declara dentro de una función o bloque y solo es accesible allí. Se destruye al salir del bloque.\n\nUna **variable global** se declara fuera de cualquier función, existe durante toda la ejecución del programa y es accesible desde cualquier parte del código.',
    codeSnippet: 'int global_var = 10; // Global\n\nvoid func() {\n  int local_var = 5; // Local\n}'
  },
  {
    id: 'fc-3',
    category: 'Punteros y Memoria',
    front: '¿Qué función devuelve memoria al sistema operativo después de haber sido reservada dinámicamente?',
    backMarkdown: 'La función `free(puntero)`.\n\nEs crucial llamarla cuando la memoria reservada con `malloc`, `calloc` o `realloc` ya no se necesita, para evitar *memory leaks* (fugas de memoria).',
    codeSnippet: 'int *arr = malloc(10 * sizeof(int));\n// usar arr...\nfree(arr);\narr = NULL; // Buena práctica'
  },
  {
    id: 'fc-6',
    category: 'Punteros y Memoria',
    front: '¿Qué hace el operador `*` cuando se aplica a una variable puntero?',
    backMarkdown: 'Realiza una **desreferenciación**. Esto significa que accede al valor que está almacenado en la dirección de memoria a la que apunta el puntero.',
    codeSnippet: 'int x = 42;\nint *p = &x;\n*p = 100; // Ahora x vale 100'
  },
  {
    id: 'fc-7',
    category: 'Punteros y Memoria',
    front: 'Diferencia entre `malloc` y `calloc`.',
    backMarkdown: '`malloc` reserva un bloque de memoria con tamaño especificado pero **no inicializa** los bits (contiene "basura").\n\n`calloc` reserva memoria para un arreglo de elementos e **inicializa todos los bits a cero**.',
    codeSnippet: 'int *m = malloc(5 * sizeof(int)); // Valores indeterminados\nint *c = calloc(5, sizeof(int));  // Valores inicializados en 0'
  },
  {
    id: 'fc-p1',
    category: 'Punteros y Memoria',
    front: '¿Qué es un puntero a puntero (ej. int **p)?',
    backMarkdown: 'Es una variable que almacena la **dirección de memoria de otro puntero**.\n\nSe utiliza comúnmente para modificar punteros pasados por referencia a funciones, o para matrices dinámicas 2D (arreglos de punteros).',
    codeSnippet: 'int x = 10;\nint *p = &x;\nint **pp = &p;'
  },
  {
    id: 'fc-4',
    category: 'Archivos',
    front: 'Diferencia principal entre `fread` y `fseek`.',
    backMarkdown: '`fread` **lee** un bloque de datos binarios desde un archivo hacia la memoria (array o buffer).\n\n`fseek` **mueve** el cursor/puntero de posición del archivo a una ubicación específica sin leer datos.',
    codeSnippet: 'FILE *f = fopen("data.bin", "rb");\n// Mover cursor 10 bytes desde el inicio\nfseek(f, 10, SEEK_SET);\n// Leer 5 enteros\nfread(buffer, sizeof(int), 5, f);'
  },
  {
    id: 'fc-5',
    category: 'Conceptos Generales',
    front: '¿Qué es una Violación de Segmento (Segmentation Fault / Segfault)?',
    backMarkdown: 'Es un error de ejecución que ocurre cuando el programa intenta acceder a una dirección de memoria que **no le pertenece** o a la que **no tiene permisos** (ej. memoria de sólo lectura o desreferenciar un puntero `NULL` o no inicializado).'
  },
  {
    id: 'fc-a1',
    category: 'Algoritmos y Complejidad',
    front: '¿Cuál es la complejidad temporal (Big-O) de Búsqueda Binaria y Búsqueda Lineal?',
    backMarkdown: '**Búsqueda Lineal**: O(n), ya que en el peor caso debe revisar todos los elementos.\n\n**Búsqueda Binaria**: O(log n), ya que divide el espacio de búsqueda a la mitad en cada paso. Requiere que el arreglo esté ordenado.'
  },
  {
    id: 'fc-a2',
    category: 'Algoritmos y Complejidad',
    front: 'Menciona la complejidad promedio de QuickSort y MergeSort.',
    backMarkdown: '**QuickSort**: O(n log n) en promedio, pero O(n²) en el peor caso.\n\n**MergeSort**: O(n log n) siempre (mejor, promedio y peor caso), pero requiere O(n) memoria extra espacial.'
  },
  {
    id: 'fc-e1',
    category: 'Estructuras de Datos',
    front: '¿Cuál es la diferencia entre un struct y un array en C?',
    backMarkdown: 'Un **array** almacena múltiples elementos del **mismo tipo** de datos contiguos en memoria.\n\nUn **struct** puede almacenar múltiples elementos de **diferentes tipos** bajo un mismo nombre, agrupándolos como un registro lógico.',
    codeSnippet: 'struct Persona {\n  char nombre[50];\n  int edad;\n  float altura;\n};'
  }
];
