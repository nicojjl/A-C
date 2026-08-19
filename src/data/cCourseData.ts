import { CChapter } from '../types';

export const C_COURSE_DATA: CChapter[] = [
  {
    id: 'cap-1',
    chapterNumber: 1,
    title: 'Capítulo 1: Introducción General (El Tutorial K&R)',
    subtitle: 'Fundamentos esenciales del Lenguaje C: Sintaxis, Memoria, Estructuras de Control, Tipos y Rangos',
    icon: '📘',
    description: 'Aprende la arquitectura básica de un programa en C, el flujo de compilación, la tabla completa de rangos de tipos primitivos, el fenómeno de integer overflow y el modelo de I/O de caracteres.',
    summary: 'En una frase: C compila directamente a máquina, otorgando velocidad cruda, pero delegando a ti toda la responsabilidad de los rangos de memoria y los ciclos de ejecución.',
    keyConcepts: [
      '#include y stdio.h',
      'Función main() y código de salida',
      'Tabla de Rangos de Tipos Primitivos',
      'Integer Overflow y Complemento a Dos',
      'División Entera vs Flotante',
      'Ciclos while y for',
      'Constantes simbólicas (#define)',
      'getchar(), putchar() y EOF (-1)',
      'Arreglos y carácter nulo \\0',
      'Paso por valor (Pass-by-value)'
    ],
    analogies: [
      {
        title: 'El Programa C como una Receta de Cocina Industrial',
        concept: 'Estructura general de main() e inclusión de cabeceras',
        analogy: 'Las cabeceras (#include <stdio.h>) son la caja de utensilios importada a la cocina. La función main() es la receta principal que el chef (la CPU) ejecuta paso a paso desde la primera línea hasta colocar la bandeja terminada (return 0).',
        whyItWorks: 'Ayuda a visualizar que C no ejecuta nada por arte de magia: todo inicia formalmente en main() y requiere herramientas explícitas.'
      },
      {
        title: 'Entrada y Salida como una Cinta Transportadora de Bytes',
        concept: 'Flujos E/S con getchar() y putchar()',
        analogy: 'Un flujo de entrada (stdin) es como una cinta transportadora que entrega una caja (carácter) a la vez. getchar() toma la caja de la cinta y putchar() la coloca en la caja de despacho.',
        whyItWorks: 'Explica por qué C lee el texto carácter a carácter y por qué getchar() retorna un entero para reconocer la señal especial de cinta vacía (EOF).'
      }
    ],
    theoryContent: `# Capítulo 1: Introducción General (El Tutorial K&R)

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

El lenguaje **C** no es simplemente un lenguaje de programación más; es la infraestructura monolítica e invisible sobre la cual opera el mundo digital moderno. Fue diseñado entre 1969 y 1973 por **Dennis Ritchie** en los Laboratorios Bell de AT&T con un único objetivo pragmático: reescribir el sistema operativo UNIX (que estaba en Ensamblador) para hacerlo portable.

C logró una hazaña inédita en la historia de la computación: combinar la velocidad extrema y el acceso quirúrgico directo a la memoria física (RAM, Registros) que ofrecía el lenguaje Ensamblador, con la abstracción matemática y estructurada de lenguajes de alto nivel como ALGOL.

A diferencia de Python o Java, C no posee un recolector de basura (*Garbage Collector*) ni corre sobre una máquina virtual de intérpretes. Se compila crudo, directo al metal. Eres el piloto y no hay piloto automático.

**Conexión:**
Al comprender C, comprenderás cómo funcionan por debajo los intérpretes de otros lenguajes. Si dominas los rangos, los bucles y los bytes en este capítulo, dominarás el modelo mental de toda la computación.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 La Anatomía de un Programa C y el Flujo de Compilación
Escribir código C es solo el primer paso. El código texto (\`.c\`) debe someterse a 4 etapas violentas de compilación:
1. **Preprocesamiento (\`cpp\`)**: Resuelve las directivas \`#\`. Si escribes \`#include <stdio.h>\`, el preprocesador copia y pega todo el archivo \`stdio.h\` literalmente ahí antes de seguir.
2. **Compilación (\`gcc -S\`)**: Traduce el texto fusionado a **Lenguaje Ensamblador** específico de la placa madre del usuario (ej. ARM para Apple Silicon, x86_64 para Intel).
3. **Ensamblado (\`as\`)**: Mapea el ensamblador a puro código binario (archivo objeto \`.o\`).
4. **Enlazado (*Linking*, \`ld\`)**: Conecta los cables entre tu programa y las rutinas del Sistema Operativo (\`printf\` llama internamente al kernel de Linux/Windows).

### 2.2 Mapa de Memoria y Tipos de Datos Primitivos
Cada tipo de dato ocupa bloques estrictos en la memoria. No se expanden dinámicamente como en Python.

| Tipo de Dato | Tamaño Habitual | Rango Mínimo | Rango Máximo | Uso / \`printf\` |
| :--- | :--- | :--- | :--- | :--- |
| \`signed char\` | 1 Byte (8 bit) | -128 | +127 | \`%c\` / \`%d\` |
| \`unsigned char\` | 1 Byte | 0 | 255 | \`%u\` |
| \`short int\` | 2 Bytes (16 bit)| -32,768 | +32,767 | \`%hd\` |
| \`int\` | 4 Bytes (32 bit)| -2,147,483,648 | +2,147,483,647 | \`%d\` o \`%i\` |
| \`unsigned int\` | 4 Bytes | 0 | 4,294,967,295 | \`%u\` |
| \`long long\` | 8 Bytes (64 bit)| $\approx -9 \times 10^{18}$ | $\approx +9 \times 10^{18}$ | \`%lld\` |

### 2.3 Ejemplo Guiado: Integer Overflow (Desbordamiento)
Imagina un tablero de carro mecánico con límite \`99,999\`. Si sumas 1, regresa a \`00,000\`. Esto es un Overflow.
En C, si tenemos un \`unsigned char\` cuyo valor máximo es 255 (en binario \`11111111\`) y hacemos \`x = x + 1\`, la CPU intenta guardar el 256 (\`100000000\`). Pero como la variable solo cabe en 8 bits, el noveno bit se pierde y el resultado circular aterriza en \`0\`. Si pasa con variables \`signed\`, el salto es desde positivo al fondo de los números negativos.

### 2.4 Errores Comunes de los Estudiantes
- **Olvidar el \`;\`**: En C, el salto de línea no significa fin de instrucción, el \`;\` sí.
- **División Entera**: Si escribes \`5 / 2\` en C, el resultado es \`2\`, no \`2.5\`. El compilador trunca la parte decimal drásticamente porque ambos operandos son enteros. Debes usar \`5.0 / 2.0\`.
- **Uso de comillas**: En C, \`'A'\` (simples) es un carácter ASCII (un número interno de 1 byte). \`"A"\` (dobles) es una Cadena de texto (arreglo de bytes terminados en nulo \`\0\`). Son fundamentalmente incompatibles.

---

## 3. ANÁLISIS DE COMPLEJIDAD Y MEMORIA (C-SPECIFIC)

A diferencia de análisis algorítmico tradicional, aquí la "complejidad" es espacial:
Si declaras un arreglo \`int arr[1000]\` dentro de \`main()\`, C exige **exactamente** $1000 \times 4\,\text{Bytes} = 4000\,\text{Bytes}$ contiguos de la pila (Stack). La asignación temporal es $O(1)$ directo al apuntador de hardware, lo que hace a C ridículamente rápido en comparación con la instanciación de clases de Java que invoca subrutinas de \`new\`.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Linux Kernel**: El corazón de Android, servidores y sistemas embebidos está escrito enteramente en C puro, gestionando rutinas críticas del hardware al microsegundo.
2. **Sistemas Embebidos (IoT, Automóviles)**: Controladores ABS de frenos de autos, microondas y satélites usan C porque se asegura una memoria determinista y predecible (no hay una Máquina Virtual pesada bloqueando la CPU).

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS
- **Paso por valor**: Cuando en C invocas \`mi_funcion(x)\`, C fotocopia silenciosamente el valor de \`x\`. Nada de lo que la función haga modificará tu \`x\` original en la memoria. (Hasta que veamos punteros en el Capítulo 5).

---

## 6. GLOSARIO DE TÉRMINOS
* **Compilación**: Traducción destructiva de código legible humano a binario ejecutable (0s y 1s).
* **Preprocesador**: Subsistema que resuelve macros (\`#define\`) e inserta código (\`#include\`) antes de compilar.
* **Overflow**: Condición destructiva generada al forzar a un tipo de dato a retener un valor matemáticamente mayor a su capacidad de bits en RAM.
* **ASCII**: Estándar numérico de 1 byte; asigna letras a números (Ej: 'A' es 65).

---

### Para profundizar
*Acude a la Primera Edición / Segunda Edición de Kernighan & Ritchie (K&R C), Capítulo 1, "A Tutorial Introduction", donde la filosofía del "Hello World" fue documentada académicamente por primera vez en la historia.*

### Guía de Animación
*A continuación podrás ejecutar C en vivo. Usa el editor para ver cómo la salida cambia según modifiques las líneas o provoques errores.*
`,
    quizQuestions: [
      {
        id: 'c-1-q1',
        question: '¿Qué diferencia principal estructural tiene C respecto a Python o Java en cuanto a su ejecución?',
        options: [
          'C es interpretado línea por línea en runtime.',
          'C corre sobre el Java Virtual Machine (JVM).',
          'C compila todo el código directamente al lenguaje binario nativo de la máquina subyacente.',
          'C posee un Garbage Collector nativo.'
        ],
        correctIndex: 2,
        explanation: 'Ese es el superpoder de C: la conversión total a código máquina específico de la arquitectura antes de la ejecución.'
      },
      {
        id: 'c-1-q2',
        question: 'Si a una variable "unsigned char x = 255;" le sumas 1, ¿qué valor adopta x?',
        options: [
          '256',
          '-1',
          '0',
          'Genera un error de compilador fatal'
        ],
        correctIndex: 2,
        explanation: 'Genera un Integer Overflow. El bit adicional (noveno) se descarta, quedando los 8 bits en cero (00000000).'
      },
      {
        id: 'c-1-q3',
        question: '¿Cuál es el resultado de la expresión matemática "5 / 2" en C?',
        options: [
          '2.5',
          '2',
          '3',
          'Lanza un warning de "Type Mismatch"'
        ],
        correctIndex: 1,
        explanation: 'En C, la división entre dos enteros es estrictamente truncada, cortando y descartando la parte fraccionaria.'
      },
      {
        id: 'c-1-q4',
        question: '¿Cuál es la labor principal del Preprocesador de C?',
        options: [
          'Optimizar bucles for.',
          'Generar el archivo .exe final.',
          'Resolver y expandir texto (ej. copiar el contenido de stdio.h donde dice #include).',
          'Proveer control de excepciones en runtime.'
        ],
        correctIndex: 2,
        explanation: 'El preprocesador actúa exclusivamente a nivel de texto, copiando bibliotecas y sustituyendo #defines antes de intentar traducir a ensamblador.'
      },
      {
        id: 'c-1-q5',
        question: '¿Qué sucede cuando se pasa una variable a una función común en C (Paso por valor)?',
        options: [
          'La función original pierde el acceso a la variable temporalmente.',
          'Crea un clon exacto de los bytes, y la función usa esa copia aislada.',
          'Abre un puente directo en la RAM para editar la variable original.',
          'Genera un alias con el operador ampersand &.'
        ],
        correctIndex: 1,
        explanation: 'Pass-by-value significa que C siempre realiza una "fotocopia" en memoria. Editar el clon no altera el archivo original en la función llamadora.'
      }
    ],
    exercises: [
      {
        id: 'c-1-ex1',
        title: 'Nivel 1: Conceptos Tipográficos',
        description: "En el código C, x = 1; y x == 1 significan dos cosas drásticamente diferentes. ¿Cuál es un error común si te equivocas en un if?",
        cormenRef: 'K&R Cap 1.2',
        initialCode: '// Modifica para que retorne 1 si "=" es comparación, o 2 si "==" es comparación.\nint tipoDeOperador() {\n    return 0;\n}',
        solutionCode: 'int tipoDeOperador() {\n    return 2;\n}',
        hint: "Un solo igual = es asignación, doble igual == es comparación de igualdad.",
        explanation: "Cuidado extremo en C: if (x = 1) sobrescribirá x con 1, y como 1 es considerado verdadero en C, la condición siempre se cumple catastróficamente.",
        testCases: [ { id: 'tc-1', description: 'Test', input: '', expectedOutput: '2' } ]
      },
      {
        id: 'c-1-ex2',
        title: 'Nivel 1: Predicción de Cadenas',
        description: '¿Cuál es la diferencia estricta en memoria RAM entre \'A\' y "A"? Escribe un programa que retorne 1 si ocupan lo mismo, o 2 si ocupan distinto tamaño.',
        cormenRef: 'K&R Cap 1.5',
        initialCode: 'int compararTamanos() {\n    return 0;\n}',
        solutionCode: 'int compararTamanos() {\n    return 2;\n}',
        hint: 'Las comillas dobles añaden un caracter oculto.',
        explanation: '\'A\' es un char literal (ASCII 65). Ocupa 1 byte. "A" es un arreglo de texto que ocupa 2 bytes (la letra A, y el caracter nulo invisible \\0).',
        testCases: [ { id: 'tc-2', description: 'Test', input: '', expectedOutput: '2' } ]
      },
      {
        id: 'c-1-ex3',
        title: 'Nivel 2: Rellena los Bloques (I/O Básico)',
        description: "Escribe el bloque completo #include y main() para imprimir \"Z\". Usa la biblioteca correcta.",
        cormenRef: 'K&R Cap 1.1',
        initialCode: '#include <_______>\n\nint main(____) {\n    printf("____");\n    return __;\n}',
        solutionCode: '#include <stdio.h>\n\nint main(void) {\n    printf("Z");\n    return 0;\n}',
        hint: 'La biblioteca Estándar de Entrada y Salida (Standard I/O). Y C pide return 0 al S.O.',
        explanation: "El #include <stdio.h> es vital para que el compilador sepa qué es printf. El main(void) explicita que no espera argumentos, y el return 0 informa al SO que terminó sin errores.",
        testCases: [ { id: 'tc-3', description: 'Test', input: '', expectedOutput: 'Z' } ]
      },
      {
        id: 'c-1-ex4',
        title: 'Nivel 2: Encontrar el Bug Silencioso',
        description: 'Encuentra y corrige el error fatal en este bucle while básico.',
        cormenRef: 'K&R Cap 1.2',
        initialCode: '#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while (i < 5)\n        printf("X");\n        i = i + 1;\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int i = 0;\n    while (i < 5) {\n        printf("X");\n        i = i + 1;\n    }\n    return 0;\n}',
        hint: 'C no depende de la indentación (tabuladores) como Python. ¿Qué hace falta para agrupar múltiples líneas en un bucle?',
        explanation: "Sin las llaves {} agrupadoras, el bucle while de C ejecuta únicamente la línea inmediata inferior (printf). La suma i = i + 1 queda fuera del bucle, generando un ciclo infinito destructivo.",
        testCases: [ { id: 'tc-4', description: 'Test', input: '', expectedOutput: 'XXXXX' } ]
      },
      {
        id: 'c-1-ex5',
        title: 'Nivel 3: Implementación de Bucle Celsius a Fahrenheit',
        description: 'Recrea el famoso primer programa de K&R: Imprime una tabla de conversión de grados Celsius a Fahrenheit, para los valores Celsius: 0, 20, 40. (Fórmula: F = C * (9.0/5.0) + 32). ¡Recuerda usar decimales reales!',
        cormenRef: 'K&R Cap 1.2',
        initialCode: '#include <stdio.h>\n\nint main() {\n    // Tu código aquí\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    float fahr, celsius;\n    int lower = 0, upper = 40, step = 20;\n    \n    celsius = lower;\n    while (celsius <= upper) {\n        fahr = celsius * (9.0 / 5.0) + 32.0;\n        printf("%.1f %.1f\\n", celsius, fahr);\n        celsius = celsius + step;\n    }\n    return 0;\n}',
        hint: "Usa float o double para atrapar decimales, y %f en el printf. Si pones 9/5 en C, te devolverá un 1 cerrado.",
        explanation: "Esta implementación obliga al alumno a usar un bucle while, manejar variables fraccionarias explícitamente (9.0 / 5.0), y evitar la división entera destructiva natural de C.",
        testCases: [
          { id: '1', description: 'Prueba la salida correcta del ciclo', input: '', expectedOutput: "0.0 32.0\\n20.0 68.0\\n40.0 104.0\\n" }
        ]
      },
      {
        id: 'c-1-ex6',
        title: 'Nivel 3: Detectar EOF en Lectura de Flujos',
        description: 'foo',
        cormenRef: 'K&R Cap 1.5',
        initialCode: '#include <stdio.h>\n\nint main() {\n    // Tu código aquí\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int c;\n    while ((c = getchar()) != \'\\n\') {\n        putchar(c);\n    }\n    return 0;\n}',
        hint: 'Declara `c` como `int`. Usa el bucle `while((c = getchar()) != \'\\n\')`.',
        explanation: 'Muestra la forma idiomática y densa de C de realizar asignaciones adentro del bloque condicional del while.',
        testCases: [
          { id: '1', description: 'Lector simple de líneas', input: 'HOLA\n', expectedOutput: 'HOLA' }
        ]
      },
      {
        id: 'c-1-ex7',
        title: 'Nivel 4: Análisis C vs Hardware',
        description: "Escribe un programa que imprima en bytes el tamaño de la variable int en tu máquina actual, usando sizeof().",
        cormenRef: 'K&R Cap 2.2',
        initialCode: '#include <stdio.h>\n\nint main() {\n    // Tu código aquí\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    printf("%zu", sizeof(int));\n    return 0;\n}',
        hint: 'Usa `printf("%zu", sizeof(int));` o `%lu`.',
        explanation: 'C define un estándar mínimo, pero delega al compilador y al S.O. el tamaño real en bytes para emparejarse óptimamente con el tamaño de los registros del procesador.',
        testCases: [
          { id: '1', description: 'Tamaño en máquina local', input: '', expectedOutput: '4' }
        ]
      },
      {
        id: 'c-1-ex8',
        title: 'Nivel 5: Desafío de Máscaras y Truncamiento',
        description: 'Asigna el valor 300 a una variable entera. Hazle cast directo a `unsigned char`, y luego imprime este nuevo valor como un entero `%u`. Verás empíricamente el truncamiento Overflow.',
        cormenRef: 'K&R Cap 2.7',
        initialCode: '#include <stdio.h>\n\nint main() {\n    int grande = 300;\n    // Tu código aquí\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint main() {\n    int grande = 300;\n    unsigned char cortado = (unsigned char)grande;\n    printf("%u", cortado);\n    return 0;\n}',
        hint: 'Hacer cast `(unsigned char)grande` le arranca los bits superiores al número.',
        explanation: '300 en binario es `100101100`. Al asignarlo forzosamente a un `unsigned char` (8 bits), la CPU corta todo el exceso. El resultado en RAM es `00101100`, que convertido de nuevo a decimal, es 44.',
        testCases: [
          { id: '1', description: 'Truncando 300', input: '', expectedOutput: '44' }
        ]
      }
    ],
    codeExamples: []
  },

  {
    id: 'cap-2',
    chapterNumber: 2,
    title: 'Capítulo 2: Tipos, Operadores y Expresiones',
    subtitle: 'Tipos primitivos, qualificadores, constantes, operaciones bitwise y precedencia',
    icon: '🔢',
    description: 'Domina los tipos de datos en C (char, int, float, double), qualificadores (short, long, signed, unsigned, const), operadores bit a bit (&, |, ^, ~, <<, >>) y conversión implícita/explícita de tipos (cast).',
    summary: 'Este capítulo profundiza en la representación interna de datos en memoria, las reglas del preprocesador y la manipulación matemática directa de bits.',
    keyConcepts: [
      'char, int, float, double',
      'short, long, signed, unsigned',
      'Constantes octales (0) y hexadecimales (0x)',
      'Calificador const',
      'Operadores relacionales y lógicos',
      'Evaluación en cortocircuito (&&, ||)',
      'Cast (conversión explícita)',
      'Incremento prefijo vs sufijo (++x / x++)',
      'Operadores bitwise (&, |, ^, ~, <<, >>)',
      'Operador ternario (? :)'
    ],
    analogies: [
      {
        title: 'Los Tipos de Datos como Cajas de Diferente Capacidad',
        concept: 'Tamaño en bytes de char, short, int, long',
        analogy: 'Un char es una caja pequeña de 1 byte. Un int es un contenedor de 4 bytes. Si intentas meter un valor de 1,000,000 en un char, la caja se desborda perdiendo los bits sobrantes.',
        whyItWorks: 'Explica físicamente los límites de almacenamiento en la RAM y el desbordamiento numérico.'
      },
      {
        title: 'Operadores Bitwise como un Panel de Interruptores de Luz',
        concept: 'Manipulación de bits individuales',
        analogy: 'Imagina un panel con 8 interruptores (bits). El operador AND (&) solo deja pasar corriente si ambos interruptores están encendidos; OR (|) enciende si al menos uno está activo; XOR (^) enciende si son distintos.',
        whyItWorks: 'Hace tangible las operaciones lógicas a nivel de hardware y máscaras de bits.'
      }
    ],
    theoryContent: `# Capítulo 2: Tipos, Operadores y Expresiones

---

## 1. INTRODUCCIÓN A LOS DATOS EN C

C proporciona un conjunto básico pero potente de tipos de datos. La filosofía subyacente es que los tipos y sus operaciones correspondan directamente con las capacidades nativas de las instrucciones del procesador. 

A diferencia de lenguajes dinámicos donde "una variable puede contener cualquier cosa", en C, **una variable es simplemente un nombre asociado a una dirección de memoria y un tamaño de byte específico**.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Tipos y Tamaños de Datos
Los tipos de datos básicos definen cuántos bytes en RAM ocupará una variable y cómo se interpretarán los bits en esa memoria.

* \`char\`: Un solo byte, capaz de contener un carácter local del conjunto de caracteres.
* \`int\`: Un número entero, reflejando normalmente el tamaño natural de los enteros en la máquina host.
* \`float\`: Punto flotante de precisión simple.
* \`double\`: Punto flotante de precisión doble.

#### Los Calificadores \`short\` y \`long\`
A los enteros se les pueden aplicar calificadores para variar su tamaño:
\`\`\`c
short int sh; // Al menos 16 bits
long int counter; // Al menos 32 bits
\`\`\`

#### Los Calificadores \`signed\` y \`unsigned\`
El calificador \`unsigned\` altera la interpretación del bit más significativo, permitiendo que un byte abarque de 0 a 255 en lugar de -128 a 127.

### 2.2 Constantes en C
Existen diferentes formas de definir constantes literales.
* **Enteras**: \`1234\` (int), \`123456789L\` (long), \`123U\` (unsigned).
* **Octales y Hexadecimales**: \`037\` (octal, empieza con 0), \`0x1F\` (hexadecimal, empieza con 0x).
* **Constantes de Caracteres**: \`'x'\` es una constante entera cuyo valor es el valor numérico del carácter en el conjunto de caracteres de la máquina (ej: 120 en ASCII).
* **Secuencias de Escape**: \`\\n\` (nueva línea), \`\\t\` (tabulación), \`\\0\` (carácter nulo, de valor cero).

### 2.3 Operadores Aritméticos, Relacionales y Lógicos

#### Aritméticos
Los básicos: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`.
**Atención**: El operador \`%\` no puede aplicarse a \`float\` o \`double\`. La división de enteros trunca cualquier parte fraccionaria (ej: \`5 / 2\` es \`2\`).

#### Relacionales y Lógicos
Los operadores relacionales (\`<\`, \`<=\`, \`>\`, \`>=\`, \`==\`, \`!=\`) y lógicos (\`&&\`, \`||\`, \`!\`) devuelven \`1\` para verdadero y \`0\` para falso.
**Evaluación de Cortocircuito (Short-Circuit):**
En \`exp1 && exp2\`, si \`exp1\` es falsa (\`0\`), C no evalúa \`exp2\` porque el resultado final es necesariamente falso.
En \`exp1 || exp2\`, si \`exp1\` es verdadera (\`1\`), \`exp2\` no se evalúa.

### 2.4 Operadores a Nivel de Bits (Bitwise)
C ofrece 6 operadores para la manipulación de bits; estos solo pueden aplicarse a operandos integrales:
| Operador | Nombre | Operación | Ejemplo (\`a = 0x05\`, \`b = 0x09\`) |
| :--- | :--- | :--- | :--- |
| \`&\` | AND a nivel de bits | Bits 1 si ambos son 1 | \`a & b\` es \`0x01\` |
| \`|\` | OR a nivel de bits | Bits 1 si alguno es 1 | \`a | b\` es \`0x0D\` |
| \`^\` | XOR a nivel de bits | Bits 1 si son diferentes | \`a ^ b\` es \`0x0C\` |
| \`<<\` | Desplazamiento Izquierda | Desplaza bits a la izq. (multiplica por 2) | \`a << 1\` es \`0x0A\` |
| \`>>\` | Desplazamiento Derecha | Desplaza bits a la der. (divide por 2) | \`a >> 1\` es \`0x02\` |
| \`~\` | Complemento a Uno | Invierte todos los bits | \`~a\` (varía según bits) |

### 2.5 Expresiones Condicionales (Operador Ternario)
Es la única expresión en C que requiere tres operandos.
\`\`\`c
z = (a > b) ? a : b; /* z recibe el máximo entre a y b */
\`\`\`

---

## 3. CONVERSIONES DE TIPO (TYPE CASTING)
Cuando un operador tiene operandos de distintos tipos, se convierten a un tipo común. En general, el tipo menor se "promociona" al mayor.
Por ejemplo, \`f + i\` (donde \`f\` es float, \`i\` es int), el \`int\` se promociona a \`float\` antes de la suma.
Puede forzarse una conversión explícita (*cast*):
\`\`\`c
sqrt((double) n);
\`\`\`

## 4. PRECEDENCIA Y ORDEN DE EVALUACIÓN
La precedencia dicta qué operadores se agrupan antes. Los unarios tienen mayor precedencia. La recomendación es **siempre usar paréntesis** para asegurar la legibilidad y evitar comportamientos indeseados.`,
    codeExamples: [
      {
        title: '1. Manipulación de Bits y Máscaras de Configuración',
        description: 'Uso de operadores bitwise para activar, desactivar y verificar banderas de estado en C.',
        code: `#include <stdio.h>

#define FLAG_READ   (1 << 0) // 0001 (1)
#define FLAG_WRITE  (1 << 1) // 0010 (2)
#define FLAG_EXEC   (1 << 2) // 0100 (4)

int main() {
    unsigned char permisos = 0;

    // Otorgar lectura y ejecución
    permisos |= (FLAG_READ | FLAG_EXEC);

    printf("Permisos Octal/Hex: 0x%02X\\n", permisos);
    printf("¿Tiene permiso de Lectura?  %s\\n", (permisos & FLAG_READ) ? "SI" : "NO");
    printf("¿Tiene permiso de Escritura? %s\\n", (permisos & FLAG_WRITE) ? "SI" : "NO");
    printf("¿Tiene permiso de Ejecución? %s\\n", (permisos & FLAG_EXEC) ? "SI" : "NO");

    return 0;
}`,
        expectedOutput: `Permisos Octal/Hex: 0x05\n¿Tiene permiso de Lectura?  SI\n¿Tiene permiso de Escritura? NO\n¿Tiene permiso de Ejecución? SI`
      }
    ],
    exercises: [
      {
        id: 'ex-cap2-1',
        title: 'Ejercicio 2.1: Inversor de Bits con XOR',
        description: 'Escribe una función getbits(x, p, n) que devuelva los n bits ajustados a la derecha de x que comienzan en la posición p.',
        cormenRef: 'K&R Cap 2 - Sec 2.9',
        initialCode: `#include <stdio.h>

unsigned getbits(unsigned x, int p, int n) {
    // Retorna (x >> (p + 1 - n)) & ~(~0 << n)
    return 0;
}

int main() {
    unsigned val = 0xAB; // 1010 1011
    printf("Resultado: 0x%X\\n", getbits(val, 4, 3));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

unsigned getbits(unsigned x, int p, int n) {
    return (x >> (p + 1 - n)) & ~(~0 << n);
}

int main() {
    unsigned val = 0xAB; // 1010 1011
    printf("Resultado: 0x%X\\n", getbits(val, 4, 3));
    return 0;
}`,
        hint: 'Usa desplazamientos a la derecha y una máscara creada con ~(~0 << n).',
        testCases: [
          {
            id: 'tc-cap2-1',
            description: 'Valida la extracción de 3 bits',
            input: '',
            expectedOutput: 'Resultado: 0x5'
          }
        ],
        explanation: 'La máscara ~(~0 << n) genera n unos en las posiciones menos significativas.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c2-1',
        question: '¿Qué operador se utiliza para forzar una conversión explícita de tipos en C?',
        options: ['static_cast', 'Operador cast (tipo)', 'convert()', 'type()'],
        correctIndex: 1,
        explanation: 'En C, el operador cast se escribe colocando el tipo deseado entre paréntesis antes de la expresión, por ejemplo: (double) x.'
      }
    ]
  },

  {
    id: 'cap-3',
    chapterNumber: 3,
    title: 'Capítulo 3: Control de Flujo',
    subtitle: 'Sentencias condicionales, bifurcaciones múltiples y bucles de control',
    icon: '🔁',
    description: 'Estructuras de control en C: if-else, else-if, switch-case con fall-through, ciclos while, for, do-while, y control explícito mediante break, continue y goto.',
    summary: 'Aprende a estructurar algoritmos complejos utilizando las sentencias de control de flujo estándar de C.',
    keyConcepts: [
      'Sentencias y bloques { }',
      'if-else y else-if',
      'switch, case, break, default',
      'Efecto fall-through en switch',
      'Ciclos while y for',
      'Ciclo do-while (prueba posterior)',
      'break (salida de bucle)',
      'continue (salto a siguiente iteración)',
      'goto y etiquetas'
    ],
    analogies: [
      {
        title: 'El Switch-Case como un Clasificador Postal de Paquetes',
        concept: 'Bifurcación condicional por casos enteros',
        analogy: 'Un escáner lee el código postal (valor entero) y envía el paquete por el carril del caso correspondiente. Si falta la barrera de detención (break), el paquete se desliza a los carriles siguientes.',
        whyItWorks: 'Visualiza el comportamiento de salto directo del switch y la necesidad del break.'
      }
    ],
    theoryContent: `# Capítulo 3: Control de Flujo

---

## 1. INTRODUCCIÓN

Las sentencias de control de flujo en un lenguaje especifican el orden en el que se realizan los cálculos. Ya hemos introducido las estructuras condicionales básicas; en este capítulo profundizaremos en todas las herramientas que C proporciona para ramificar y ciclar el flujo de ejecución, comprendiendo su bajo nivel.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Estructuras Condicionales y Bloques

#### Declaraciones y Bloques
Una expresión, como \`x = 0\`, se convierte en una *declaración* o *sentencia* cuando es seguida por un punto y coma \`;\`.
Las llaves \`{\` y \`}\` se emplean para agrupar declaraciones en un *bloque*, logrando que sean sintácticamente equivalentes a una única declaración.

#### If-Else
\`\`\`c
if (expresion)
    declaracion1;
else
    declaracion2;
\`\`\`
Dado que un \`if\` evalúa el valor numérico de la expresión (0 es falso, no-0 es verdadero), es común escribir \`if (expresion)\` en vez de \`if (expresion != 0)\`.
**Peligro del "Dangling Else"**: Un \`else\` siempre se asocia con el \`if\` más cercano y sin cerrar. Se recomienda fuertemente usar siempre llaves \`{}\` para evitar ambigüedades lógicas.

#### Else-If
\`\`\`c
if (condicion1)
    ...
else if (condicion2)
    ...
else
    ...
\`\`\`
Esta construcción es la forma más general de escribir una decisión múltiple. Las expresiones se evalúan en orden; si alguna es verdadera, se ejecuta el bloque asociado y termina toda la cadena.

### 2.2 Sentencia Switch
El \`switch\` evalúa una expresión entera (y solo entera) para realizar un salto de control (jump) directo hacia un bloque o caso constante.

\`\`\`c
switch (opcion) {
    case 1:
        printf("Opción 1\\n");
        break;
    case 2:
        printf("Opción 2\\n");
        break;
    default:
        printf("Inválido\\n");
        break; /* Por convención, terminar default con break */
}
\`\`\`
**Fall-through (Caída en cascada):** A diferencia de muchos lenguajes modernos, si un bloque \`case\` no incluye un \`break\`, la ejecución **continúa cayendo** (fall-through) hacia el siguiente \`case\`, independientemente de si su valor coincide. Esto puede ser útil, pero suele ser fuente de graves errores de programación.

### 2.3 Bucles: While, For, Do-While

#### While
\`\`\`c
while (condicion) {
    ...
}
\`\`\`
La expresión se evalúa. Si es no-cero (verdadero), se ejecuta el bloque y se vuelve a evaluar la expresión.

#### For
\`\`\`c
for (inicializacion; condicion; incremento) {
    ...
}
\`\`\`
Es equivalente a:
\`\`\`c
inicializacion;
while (condicion) {
    ...
    incremento;
}
\`\`\`
Cualquiera de las 3 partes (o todas) puede omitirse. Si omites la condición, se considera permanentemente cierta (ciclo infinito).

#### Do-While
A diferencia de \`while\` y \`for\`, el ciclo \`do-while\` evalúa su condición al **final** del bloque, garantizando que el cuerpo se ejecute al menos una vez.
\`\`\`c
do {
    ...
} while (condicion);
\`\`\`

### 2.4 Sentencias Break, Continue y Goto
* \`break\`: Provoca la salida inmediata del ciclo o \`switch\` más interno que lo encierra.
* \`continue\`: Fuerza a que comience la próxima iteración del ciclo envolvente (\`while\`, \`for\`, \`do\`).
* \`goto\`: C proporciona la sentencia incondicional \`goto label;\`. Aunque fue la principal herramienta de control antes de la programación estructurada, su uso en C está fuertemente desaconsejado ("código espagueti") a menos que se trate de salir limpiamente de ciclos muy anidados en gestiones de errores, patrón usado ampliamente en el Kernel de Linux.`,
    codeExamples: [
      {
        title: '1. Algoritmo de Búsqueda Binaria con Bucle While',
        description: 'Implementación del algoritmo O(log n) utilizando estructuras de control condicionales.',
        code: `#include <stdio.h>

int busquedaBinaria(int arr[], int n, int clave) {
    int izq = 0, der = n - 1;
    while (izq <= der) {
        int medio = izq + (der - izq) / 2;
        if (arr[medio] == clave) return medio;
        if (arr[medio] < clave) izq = medio + 1;
        else der = medio - 1;
    }
    return -1;
}

int main() {
    int datos[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int idx = busquedaBinaria(datos, 10, 23);
    printf("Elemento 23 encontrado en el índice: %d\\n", idx);
    return 0;
}`,
        expectedOutput: `Elemento 23 encontrado en el índice: 5`
      }
    ],
    exercises: [
      {
        id: 'ex-cap3-1',
        title: 'Ejercicio 3.1: Conversor de Cadenas atoi con Bucle',
        description: 'Implementa la función atoi(s) que convierte una cadena de dígitos en su entero correspondiente.',
        cormenRef: 'K&R Cap 3 - Sec 3.5',
        initialCode: `#include <stdio.h>

int miAtoi(const char s[]) {
    int i = 0, n = 0;
    // Omitir espacios en blanco y procesar dígitos
    return n;
}

int main() {
    printf("Resultado: %d\\n", miAtoi("   2026"));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int miAtoi(const char s[]) {
    int i = 0, n = 0;
    while (s[i] == ' ' || s[i] == '\\t' || s[i] == '\\n') i++;
    while (s[i] >= '0' && s[i] <= '9') {
        n = 10 * n + (s[i] - '0');
        i++;
    }
    return n;
}

int main() {
    printf("Resultado: %d\\n", miAtoi("   2026"));
    return 0;
}`,
        hint: 'Multiplica n por 10 y suma (s[i] - \'0\') en cada iteración.',
        testCases: [
          {
            id: 'tc-cap3-1',
            description: 'Valida conversión de "   2026"',
            input: '',
            expectedOutput: 'Resultado: 2026'
          }
        ],
        explanation: 'El bucle acumula los dígitos numéricos en base 10.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c3-1',
        question: '¿Qué sucede en una sentencia switch si se omite la instrucción break al final de un case?',
        options: [
          'Ocurre un error de compilación.',
          'La ejecución continúa y entra al siguiente case (efecto fall-through).',
          'El programa finaliza inmediatamente.',
          'Se ejecuta automáticamente el caso default.'
        ],
        correctIndex: 1,
        explanation: 'Sin un break explícito, C no interrumpe la ejecución y continúa ejecutando las sentencias de los casos subsiguientes.'
      }
    ]
  },

  {
    id: 'cap-4',
    chapterNumber: 4,
    title: 'Capítulo 4: Funciones y la Estructura del Programa',
    subtitle: 'Arquitectura modular, ámbito de variables, estáticas, recursión y preprocesador',
    icon: '📦',
    description: 'Aprende a estructurar software modular en C: prototipos de función, variables externas (extern), variables estáticas (static), archivos de cabecera (.h), la pila de llamadas en recursión y macros avanzadas del preprocesador.',
    summary: 'Crea aplicaciones limpias y mantenibles organizando el código en múltiples archivos y módulos independientes.',
    keyConcepts: [
      'Prototipos y declaraciones',
      'Variables externas (extern)',
      'Scope y ocultamiento de variables',
      'Variables estáticas (static local y global)',
      'Variables de registro (register)',
      'Inclusión de archivos (#include)',
      'Macros con parámetros (#define)',
      'Recursividad y pila de llamadas',
      'Compilaciones condicionales (#ifdef)'
    ],
    analogies: [
      {
        title: 'Variables Estáticas como un Contador de Turnos en una Panadería',
        concept: 'Persistencia de variables local static',
        analogy: 'A diferencia de un cliente que llega y se va (variable automática que se destruye al salir de la función), el dispensador de tickets (variable static) permanece atornillado a la pared recordando el último número emitido.',
        whyItWorks: 'Aclara cómo static conserva su valor en la RAM entre sucesivas llamadas a la función.'
      }
    ],
    theoryContent: `# Capítulo 4: Funciones y la Estructura del Programa

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

Las funciones dividen grandes tareas de computación en piezas menores, y permiten que las personas aprovechen lo que otras ya han creado, en lugar de empezar desde cero. 
Las funciones de C no pueden anidarse dentro de otras funciones, lo que simplifica la pila de llamadas y la visibilidad. Este capítulo trata sobre la organización del código, su partición modular en múltiples archivos y el tiempo de vida (scope) de la memoria en la que operan.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Conceptos Básicos de Funciones
La definición de una función clásica tiene esta forma:
\`\`\`c
tipo_retorno nombre_funcion(tipo_arg1 arg1, tipo_arg2 arg2) {
    // Declaraciones
    // Sentencias
    return expresion; // Opcional si tipo_retorno es void
}
\`\`\`

**El paso de argumentos en C es estricto**: siempre se hace **Por Valor (Pass-By-Value)**. Es decir, C entrega una copia íntegra de la variable al interior de la función; no entrega un puntero ni una referencia salvo que se exprese de forma explícita utilizando punteros (los cuales trataremos en profundidad en el próximo capítulo).

### 2.2 Variables Externas (Globales) vs Locales
Un programa C consiste en un conjunto de objetos externos, los cuales son variables o funciones.
* **Locales (Automáticas):** Variables definidas *dentro* de una función. Nacen cuando se llama la función, se almacenan en el "Stack" (Pila), y mueren y se destruyen al hacer return. Su valor inicial es "basura" (indeterminado) a menos que se asigne explícitamente.
* **Externas (Globales):** Variables definidas *fuera* de cualquier función. Viven en el segmento "Data" o "BSS" de la RAM durante toda la vida del programa. Pueden ser accedidas por cualquier función que declare su existencia usando la palabra clave \`extern\`. 

### 2.3 Variables Estáticas (\`static\`) y Ámbito (Scope)
La palabra clave \`static\` tiene dos significados totalmente distintos dependiendo de dónde se use:
1. **En Variables Locales**: Una variable \`static\` dentro de una función NO se destruye al acabar la función. Conserva su valor entre sucesivas llamadas. Se inicializa solo una vez (y a 0 si no se dice nada).
2. **En Variables Externas/Funciones**: El calificador \`static\` restringe la "visibilidad" (scope) del elemento. Solo será visible dentro de ese mismo archivo \`.c\`, evitando colisiones de nombres con otras librerías enlazadas (un pseudo-encapsulamiento).

### 2.4 Registros (\`register\`)
Declarar \`register int x;\` aconseja al compilador mantener esa variable en los veloces registros internos de la CPU en lugar de la RAM. Sin embargo, los compiladores modernos suelen ignorar esta recomendación porque sus algoritmos de optimización hacen un mejor trabajo de manera autónoma.

### 2.5 Prototipos y Archivos de Cabecera (\`.h\`)
En un proyecto grande, agrupar las definiciones y funciones en diferentes archivos \`.c\` requiere archivos \`.h\` (headers).
Un prototipo informa al compilador del tipo de retorno y tipos de los parámetros antes de que vea la implementación real de la función, evitando que asuma incorrectamente (en K&R antiguo, asumía retorno \`int\` por defecto, lo cual era peligroso).

\`\`\`c
// matematicas.h
#ifndef MATEMATICAS_H
#define MATEMATICAS_H
double calcularRaiz(double numero); // Prototipo
#endif
\`\`\`
Los "Include Guards" (\`#ifndef ... #define ...\`) previenen que el archivo de cabecera se lea doblemente en un mismo flujo de compilación.

### 2.6 El Preprocesador C y las Macros
El preprocesador es un primer paso aislado en la compilación. Reemplaza texto mediante expansión.
* Sustitución Simple: \`#define MAXLINE 100\`
* Macros con Argumentos: \`#define MAX(A, B) ((A) > (B) ? (A) : (B))\`
**Cuidado**: Un macro no es una función, es un reemplazo de texto crudo. \`MAX(i++, j++)\` incrementará la variable dos veces debido a su expansión sintáctica.`,
    codeExamples: [
      {
        title: '1. Torres de Hanói Recursivas',
        description: 'Demostración práctica de recursión y la pila de llamadas con 3 discos.',
        code: `#include <stdio.h>

void hanoi(int n, char origen, char destino, char auxiliar) {
    if (n == 1) {
        printf("Mover disco 1 de %c a %c\\n", origen, destino);
        return;
    }
    hanoi(n - 1, origen, auxiliar, destino);
    printf("Mover disco %d de %c a %c\\n", n, origen, destino);
    hanoi(n - 1, auxiliar, destino, origen);
}

int main() {
    printf("Solución para 3 discos:\\n");
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`,
        expectedOutput: `Solución para 3 discos:\nMover disco 1 de A a C\nMover disco 2 de A a B\nMover disco 1 de C a B\nMover disco 3 de A a C\nMover disco 1 de B a A\nMover disco 2 de B a C\nMover disco 1 de A a C`
      }
    ],
    exercises: [
      {
        id: 'ex-cap4-1',
        title: 'Ejercicio 4.1: Cadena Invertida Recursiva',
        description: 'Implementa una función recursiva reverse(s) que invierta la cadena s en el mismo lugar.',
        cormenRef: 'K&R Cap 4 - Sec 4.10',
        initialCode: `#include <stdio.h>
#include <string.h>

void invertirRecursivo(char s[], int i, int j) {
    // Intercambia s[i] y s[j] y llama recursivamente para i+1, j-1
}

int main() {
    char str[] = "ALGORITMOS";
    invertirRecursivo(str, 0, strlen(str) - 1);
    printf("Invertida: %s\\n", str);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <string.h>

void invertirRecursivo(char s[], int i, int j) {
    if (i >= j) return;
    char temp = s[i];
    s[i] = s[j];
    s[j] = temp;
    invertirRecursivo(s, i + 1, j - 1);
}

int main() {
    char str[] = "ALGORITMOS";
    invertirRecursivo(str, 0, strlen(str) - 1);
    printf("Invertida: %s\\n", str);
    return 0;
}`,
        hint: 'El caso base ocurre cuando el índice izquierdo i es mayor o igual al derecho j.',
        testCases: [
          {
            id: 'tc-cap4-1',
            description: 'Valida inversión de "ALGORITMOS"',
            input: '',
            expectedOutput: 'Invertida: SOMTIROGLA'
          }
        ],
        explanation: 'La recursión reduce la distancia entre índices hasta que se cruzan.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c4-1',
        question: '¿Qué ocurre al calificar una variable global con la palabra clave static?',
        options: [
          'La variable se convierte en una constante inmutable.',
          'Su visibilidad se limita únicamente al archivo fuente donde está definida.',
          'Se almacena en la pila de llamadas (stack).',
          'Aumenta automáticamente el tamaño de la variable a 64 bits.'
        ],
        correctIndex: 1,
        explanation: 'La cualidad static aplicada a una variable o función global restringe su enlace (linkage) haciéndola invisible para otros archivos objeto.'
      }
    ]
  },

  {
    id: 'cap-5',
    chapterNumber: 5,
    title: 'Capítulo 5: Punteros y Arreglos',
    subtitle: 'Direcciones de memoria, aritmética de apuntadores, arreglos y punteros a funciones',
    icon: '⚡',
    description: 'El corazón de Lenguaje C: operador de dirección (&), operador de desreferencia (*), paso por referencia, equivalencia entre arreglos y punteros *(p + i), arreglos de punteros, argumentos en línea de comandos (argc, argv) y punteros a funciones.',
    summary: 'Domina los conceptos más potentes de C aprendiendo a gestionar la memoria física directamente mediante punteros.',
    keyConcepts: [
      'Operador dirección de memoria &',
      'Operador desreferencia *',
      'Paso por referencia (Swap)',
      'Aritmética de punteros (p + i)',
      'Decaimiento de arreglos en punteros',
      'Cadenas como char *',
      'Arreglos de punteros (char *argv[])',
      'Punteros a punteros (int **ptr)',
      'Argumentos argc y argv',
      'Punteros a funciones'
    ],
    analogies: [
      {
        title: 'Punteros como Números de Casillero Postales',
        concept: 'Dirección de memoria vs Contenido de la memoria',
        analogy: 'Una variable común es el contenido de la carta dentro del casillero. Un puntero es un trozo de papel con el número de casillero (ej. 0x7ffd10) escrito en él. Desreferenciar (*p) significa ir a ese casillero y leer la carta que contiene.',
        whyItWorks: 'Diferencia perfectamente el valor numérico de la dirección de memoria del contenido almacenado.'
      },
      {
        title: 'Aritmética de Punteros como Avanzar en una Fila de Asientos',
        concept: 'Operación ptr + i ajustada al sizeof(T)',
        analogy: 'Si estás sentado en la silla 10 y te dicen "avanza 2 asientos", te mueves a la silla 12 sin importar si las sillas son estrechas (char, 1 byte) o anchas (double, 8 bytes). C calcula automáticamente los bytes necesarios.',
        whyItWorks: 'Explica por qué p + 1 incrementa la dirección en el número de bytes del tipo apuntado.'
      }
    ],
    theoryContent: `# Capítulo 5: Punteros y Arreglos

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

Llegamos a la característica más icónica y definitoria de C: **Los Punteros**. Un puntero es, fundamentalmente, una variable que contiene la dirección de ubicación en memoria RAM de otra variable.

Lejos de ser "inseguros" per se, los punteros representan la arquitectura real de una computadora. Son la razón principal por la que los lenguajes dinámicos escriben sus motores subyacentes en C. Entender los punteros y su relación estrecha con los arreglos es entender cómo respira realmente un microprocesador.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Conceptos Fundamentales de Punteros
Todo byte en la RAM de tu computadora tiene una dirección numérica. Una variable almacena un valor en una de estas direcciones.

* El **operador Unario \`&\` (dirección-de)** da la dirección en memoria de un objeto.
  \`\`\`c
  p = &c; // p ahora "apunta a" c. p guarda la dirección numérica de c.
  \`\`\`
* El **operador Unario \`*\` (indirección o desreferencia)** accede al valor que se encuentra en la dirección apuntada.
  \`\`\`c
  int y = *p; // Sigue la dirección de p, toma su valor, guárdalo en y.
  *p = 10;    // Sigue la dirección de p y escribe el número 10 allí.
  \`\`\`

#### Declaración de Punteros
\`\`\`c
int x = 1, y = 2, z[10];
int *ip; // ip es un "puntero a int".
ip = &x; // ip ahora apunta a x.
y = *ip; // y ahora es 1.
*ip = 0; // x ahora es 0.
\`\`\`
El puntero \`ip\` tiene un tamaño fijo (por ejemplo, 8 bytes en arquitectura de 64 bits) sin importar a qué tipo apunta. El compilador necesita saber el tipo subyacente (\`int\`, \`char\`, \`double\`) para saber *cuántos bytes leer* a partir de esa dirección de memoria.

### 2.2 Punteros y Argumentos de Funciones
Dado que C usa "Pasaje por Valor", una función no puede alterar una variable externa nativamente. Para lograrlo, el llamador debe pasar explícitamente un puntero (la dirección) a la variable.

\`\`\`c
void swap(int *px, int *py) {
    int temp = *px;
    *px = *py;
    *py = temp;
}
// Llamada en main: swap(&a, &b);
\`\`\`
Esto es el pilar de cómo funciones como \`scanf("%d", &variable)\` logran modificar la variable original.

### 2.3 Punteros y Arreglos: La Dualidad de K&R
En C, existe una equivalencia fuerte entre punteros y arreglos, a tal grado que las operaciones con arreglos se evalúan internamente como aritmética de punteros.

\`\`\`c
int a[10];
int *pa;
pa = &a[0]; // O también: pa = a;
\`\`\`
La expresión \`a[i]\` es idéntica por definición del estándar C a evaluar \`*(a + i)\`. El nombre del arreglo \`a\` es, esencialmente, una constante que apunta a la dirección de memoria de su primer elemento.

#### Aritmética de Punteros
Si \`p\` apunta a un entero, \`p + 1\` apunta al **siguiente entero en la memoria**, no simplemente a la siguiente dirección de byte de hardware (suma el tamaño de \`int\`, \`sizeof(int)\`). Esta aritmética (suma, resta y comparación) escala matemáticamente respecto del tipo de dato al que apuntan.

### 2.4 Cadenas de Caracteres (Strings) y Punteros
Las cadenas de texto en C son arreglos unidimensionales del tipo \`char\`, terminados por un carácter nulo \`'\\0'\`.
\`\`\`c
char *pmensaje = "Hola mundo";
char amensaje[] = "Hola mundo";
\`\`\`
* \`pmensaje\` es un puntero. Su memoria almacena la dirección donde yace "Hola mundo" (generalmente en la sección inmutable *Read-Only Data* del binario). Modificar la cadena lanzará un *Segmentation Fault*.
* \`amensaje\` es un arreglo local en el stack. Inicializa la RAM con esos caracteres. Es perfectamente modificable.

### 2.5 Arreglos de Punteros y Punteros a Funciones
Dado que los punteros en sí son variables, estos pueden almacenarse en arreglos, o incluso apuntar a instrucciones ejecutables de código.
\`\`\`c
int (*comp)(void *, void *); // Puntero a función
char *lineptr[5000]; // Arreglo de 5000 punteros a cadena
\`\`\`
El operador de puntero a función permite el envío de comportamientos como argumentos, cimentando rutinas altamente escalables como la famosa función \`qsort\` estándar.`,
    codeExamples: [
      {
        title: '1. Ordenamiento Quicksort con Puntero a Función de Comparación',
        description: 'Uso de la función qsort de stdlib.h utilizando punteros a funciones.',
        code: `#include <stdio.h>
#include <stdlib.h>

int compararEnteros(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int valores[] = {42, 12, 88, 3, 27, 95, 1};
    int n = 7;

    qsort(valores, n, sizeof(int), compararEnteros);

    printf("Arreglo ordenado con qsort y puntero a función:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", valores[i]);
    }
    printf("\\n");
    return 0;
}`,
        expectedOutput: `Arreglo ordenado con qsort y puntero a función:\n1 3 12 27 42 88 95`
      }
    ],
    exercises: [
      {
        id: 'ex-cap5-1',
        title: 'Ejercicio 5.1: Copia de Cadenas con Punteros strepy',
        description: 'Implementa la versión estilizada de K&R para copiar cadenas utilizando punteros e incrementos.',
        cormenRef: 'K&R Cap 5 - Sec 5.5',
        initialCode: `#include <stdio.h>

void miStrcpy(char *s, const char *t) {
    // Mientras (*s++ = *t++) != '\0'
}

int main() {
    char destino[50];
    miStrcpy(destino, "Cormen K&R C Pro");
    printf("Destino: %s\\n", destino);
    return 0;
}`,
        solutionCode: `#include <stdio.h>

void miStrcpy(char *s, const char *t) {
    while ((*s++ = *t++) != '\\0');
}

int main() {
    char destino[50];
    miStrcpy(destino, "Cormen K&R C Pro");
    printf("Destino: %s\\n", destino);
    return 0;
}`,
        hint: 'Aprovecha la asignación en la condición (*s++ = *t++).',
        testCases: [
          {
            id: 'tc-cap5-1',
            description: 'Valida la copia exacta de cadena',
            input: '',
            expectedOutput: 'Destino: Cormen K&R C Pro'
          }
        ],
        explanation: 'El bucle copia el carácter y avanza ambos punteros hasta copiar el byte nulo.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c5-1',
        question: 'Si p es un puntero a int (4 bytes) con valor 0x1000, ¿cuál será el valor de p + 2?',
        options: ['0x1002', '0x1004', '0x1008', '0x2000'],
        correctIndex: 2,
        explanation: 'La aritmética de punteros multiplica el incremento por sizeof(T). 0x1000 + (2 * 4 bytes) = 0x1008.'
      }
    ]
  },

  {
    id: 'cap-6',
    chapterNumber: 6,
    title: 'Capítulo 6: Estructuras (Structs, Uniones y Enum)',
    subtitle: 'Agrupación heterogénea de datos, punteros a estructuras, nodos y typedef',
    icon: '🏗️',
    description: 'Crea tipos de datos complejos en C: sintaxis struct, acceso con punto (.) y flecha (->), estructuras autorreferenciadas para árboles y listas enlazadas, typedef, uniones (union) y campos de bits (bit-fields).',
    summary: 'Construye estructuras de datos complejas combinando tipos heterogéneos y memoria dinámica.',
    keyConcepts: [
      'Estructuras (struct)',
      'Acceso con punto . y flecha ->',
      'Punteros a estructuras',
      'Arreglos de estructuras',
      'Estructuras autorreferenciadas (Nodos)',
      'Redefinición de tipos con typedef',
      'Uniones (union)',
      'Campos de bits (bit-fields)',
      'Alineación y padding de memoria'
    ],
    analogies: [
      {
        title: 'Una Estructura struct como una Ficha de Identificación',
        concept: 'Agrupación heterogénea de datos',
        analogy: 'Una ficha médica agrupa diferentes tipos de información: nombre (cadena), edad (entero), altura (flotante) y tipo de sangre (carácter). A diferencia de un arreglo que obliga a que todo sea igual, un struct agrupa datos heterogéneos bajo un mismo nombre.',
        whyItWorks: 'Demuestra la diferencia fundamental entre colecciones homogéneas (arreglos) y compuestas (structs).'
      }
    ],
    theoryContent: `# Capítulo 6: Estructuras (Structs, Uniones y Enum)

---

## 1. INTRODUCCIÓN A LAS ESTRUCTURAS DE DATOS DE USUARIO

Hasta ahora, los programas que hemos escrito procesan componentes de datos individuales. A medida que un programa se vuelve más grande, necesita una manera más robusta de agrupar variables relacionadas bajo un mismo techo organizativo.

Una **estructura** (\`struct\`) es una colección de una o más variables, posiblemente de diferentes tipos de datos, agrupadas bajo un solo nombre para su fácil manipulación. Son la base de las estructuras de datos clásicas (listas enlazadas, árboles, grafos) y de la programación orientada a objetos (C++, que nació originalmente como "C con Clases", usando structs).

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Estructuras y Acceso a Miembros
Para declarar un punto cartesiano \$x, y\$:
\`\`\`c
struct punto {
    int x;
    int y;
};
\`\`\`
La palabra \`punto\` es una "etiqueta" (tag) de estructura opcional. Las variables internas se denominan "miembros" (members). Declararlo de esta forma solo define una *plantilla* o un nuevo *tipo*; no se ha reservado ninguna memoria RAM real.

Para instanciarla y utilizarla:
\`\`\`c
struct punto pt;
pt.x = 10;
pt.y = 20;
printf("%d, %d", pt.x, pt.y);
\`\`\`
El operador \`.\` (punto) conecta el nombre de la variable estructura con el nombre de uno de sus miembros.

### 2.2 Punteros a Estructuras y el Operador Flecha \`->\`
Las estructuras completas se pueden copiar con una simple asignación (\`pt1 = pt2\`), pueden ser pasadas a funciones y pueden ser devueltas. Sin embargo, pasar grandes estructuras "por valor" consume demasiada memoria y ciclos de CPU al tener que copiar bloque a bloque. Es un estándar absoluto pasar estructuras a través de **punteros**.

Si \`pp\` es un puntero a una estructura \`punto\`:
\`\`\`c
struct punto *pp = &pt;
// Para acceder a un miembro:
(*pp).x = 15;
// En K&R C, esto tiene una abreviatura indispensable y universal:
pp->x = 15;
\`\`\`
El operador flecha \`->\` es una de las notaciones más famosas de C, combinando la indirección del puntero y el acceso al miembro.

### 2.3 Estructuras Autorreferenciadas (Nodos)
Las estructuras pueden contener punteros hacia instancias del *mismo tipo* de estructura. Esto habilita las listas enlazadas y los árboles binarios.

\`\`\`c
struct tnode {
    char *word;             // La palabra almacenada
    int count;              // Veces que aparece
    struct tnode *left;     // Hijo izquierdo
    struct tnode *right;    // Hijo derecho
};
\`\`\`
Es ilegal que una estructura contenga una instancia completa de sí misma, pero sí puede albergar un **puntero** de 8 bytes hacia otra estructura idéntica.

### 2.4 La Instrucción Typedef
C provee un mecanismo sintáctico para crear alias (sinónimos) de tipos de datos llamado \`typedef\`. Sirve para reducir lo aparatoso del código.

\`\`\`c
typedef struct tnode *Treeptr;
// Ahora "Treeptr" es un nombre nativo de tipo, sustituyendo "struct tnode *"
typedef struct {
    int x, y;
} Point;
// Ahora "Point" es el nuevo nombre.
\`\`\`
Un \`typedef\` **no** crea tipos en tiempo de ejecución; es meramente evaluado por el compilador para verificar tipeo y ahorrar escrituras redundantes.

### 2.5 Alineación de Memoria y Padding (*Struct Packing*)
Un hecho de hardware crítico al programar en C es la Alineación. El tamaño físico de un \`struct\` rara vez es la suma exacta de sus miembros de datos. 
\`\`\`c
struct Mixto {
    char a; // 1 byte
    int b;  // 4 bytes
};
\`\`\`
Por eficiencia, la CPU lee palabras de 4 u 8 bytes a la vez. El compilador inserta bytes "vacíos" (Padding) entre \`a\` y \`b\` para alinear \`b\` a una dirección divisible por 4. Así, \`sizeof(struct Mixto)\` será usualmente 8 bytes, no 5. Entender el *Padding* es fundamental para sistemas de red o embebidos y es la razón principal de por qué el orden de declaración en una struct importa.

### 2.6 Uniones (Unions)
Una unión es una variable que puede almacenar objetos de distintos tipos y tamaños (uno a la vez) en la **misma área exacta de memoria RAM**.
\`\`\`c
union Data {
    int i;
    float f;
    char str[20];
};
\`\`\`
En este caso, \`sizeof(union Data)\` será igual a 20 (el tamaño del elemento más grande). El programador tiene la responsabilidad total de recordar qué tipo fue almacenado allí por última vez. Extraer el campo como \`int\` si fue almacenado como \`float\` resultará en una lectura basura de los bits en crudo.`,
    codeExamples: [
      {
        title: '1. Tabla Hash con Listas Enlazadas de Structs (K&R Sec 6.6)',
        description: 'Estructura de datos clásica de K&R para buscar símbolos e identificadores.',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct nlist {
    struct nlist *next;
    char *name;
    char *defn;
} nlist;

int main() {
    nlist item;
    item.name = "MAX_BUFFER";
    item.defn = "1024";
    item.next = NULL;

    printf("Símbolo Hash: %s = %s\\n", item.name, item.defn);
    return 0;
}`,
        expectedOutput: `Símbolo Hash: MAX_BUFFER = 1024`
      }
    ],
    exercises: [
      {
        id: 'ex-cap6-1',
        title: 'Ejercicio 6.1: Inserción en Árbol Binario de Búsqueda',
        description: 'Crea una función para insertar valores en un árbol binario de búsqueda compuesto por structs.',
        cormenRef: 'K&R Cap 6 - Sec 6.5',
        initialCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct tnode {
    int val;
    struct tnode *left;
    struct tnode *right;
} tnode;

tnode* insertar(tnode *p, int w) {
    // Si p == NULL, malloc y retorna nuevo nodo
    // Si w < p->val, p->left = insertar(p->left, w)
    // De lo contrario, p->right = insertar(p->right, w)
    return p;
}

int main() {
    tnode *raiz = NULL;
    raiz = insertar(raiz, 50);
    raiz = insertar(raiz, 30);
    raiz = insertar(raiz, 70);
    printf("Raíz: %d, Izq: %d, Der: %d\\n", raiz->val, raiz->left->val, raiz->right->val);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct tnode {
    int val;
    struct tnode *left;
    struct tnode *right;
} tnode;

tnode* insertar(tnode *p, int w) {
    if (p == NULL) {
        p = (tnode*) malloc(sizeof(tnode));
        p->val = w;
        p->left = p->right = NULL;
    } else if (w < p->val) {
        p->left = insertar(p->left, w);
    } else {
        p->right = insertar(p->right, w);
    }
    return p;
}

int main() {
    tnode *raiz = NULL;
    raiz = insertar(raiz, 50);
    raiz = insertar(raiz, 30);
    raiz = insertar(raiz, 70);
    printf("Raíz: %d, Izq: %d, Der: %d\\n", raiz->val, raiz->left->val, raiz->right->val);
    return 0;
}`,
        hint: 'Si p es NULL, asigna memoria dinámicamente con malloc.',
        testCases: [
          {
            id: 'tc-cap6-1',
            description: 'Valida estructura del árbol BST',
            input: '',
            expectedOutput: 'Raíz: 50, Izq: 30, Der: 70'
          }
        ],
        explanation: 'La inserción recursiva navega por las ramas izquierda y derecha creando nodos dinámicos.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c6-1',
        question: '¿Qué operador se utiliza para acceder a un miembro de una estructura cuando se posee un puntero a ella?',
        options: ['Operador punto (.)', 'Operador flecha (->)', 'Operador asterisco (*)', 'Operador dos puntos (::)'],
        correctIndex: 1,
        explanation: 'El operador flecha (ptr->miembro) es un atajo equivalente a escribir (*ptr).miembro.'
      }
    ]
  },

  {
    id: 'cap-7',
    chapterNumber: 7,
    title: 'Capítulo 7: Entrada y Salida (stdio.h)',
    subtitle: 'Manejo de flujos E/S, entrada formateada con scanf, salida con printf y archivos FILE*',
    icon: '📁',
    description: 'Domina la biblioteca de entrada y salida estándar de C: flujos estandarizados (stdin, stdout, stderr), formateo avanzado con printf/sprintf, procesamiento seguro de entradas con scanf/sscanf/fgets, acceso a archivos con FILE*, fopen, fclose, E/S binaria con fread/fwrite, fseek y gestión de errores con feof y ferror.',
    summary: 'Aprende a persistir datos en el disco duro de forma eficiente y a procesar flujos de entrada/salida de texto y archivos binarios.',
    keyConcepts: [
      'Flujos estándar stdin, stdout, stderr',
      'Salida formateada: printf, fprintf, sprintf',
      'Entrada formateada: scanf, fscanf, sscanf',
      'Estructura FILE* y modos de apertura',
      'Entrada/Salida por caracteres: getc, putc, getchar, putchar',
      'Entrada/Salida por líneas: fgets, fputs',
      'Entrada/Salida binaria: fread, fwrite',
      'Acceso aleatorio: fseek, ftell, rewind',
      'Control de errores y fin de archivo: feof, ferror, perror'
    ],
    analogies: [
      {
        title: 'El Descriptor FILE* como un Marcapáginas en un Libro',
        concept: 'Lectura secuencial de archivos en disco',
        analogy: 'Abrir un archivo con fopen() coloca un marcapáginas en el primer carácter del libro. Cada llamada a getc() o fgets() lee los datos y mueve el marcapáginas hacia adelante. Con fseek() puedes saltar el marcapáginas a cualquier página.',
        whyItWorks: 'Visualiza la naturaleza secuencial del puntero interno de posición de archivo.'
      },
      {
        title: 'sprintf / sscanf como una Impresora e Imprimidora de Etiquetas en Memoria',
        concept: 'Formateo directo en arreglos de caracteres',
        analogy: 'En lugar de enviar la etiqueta de texto al monitor (stdout), sprintf "imprime" el texto formateado sobre una tira de papel en blanco en tu mesa (un arreglo char buffer[]). sscanf hace lo opuesto: lee la etiqueta del papel y extrae los datos numéricos.',
        whyItWorks: 'Clarifica que las funciones con prefijo "s" operan sobre buffers en memoria RAM sin interactuar con discos o terminales.'
      }
    ],
    theoryContent: `# Capítulo 7: Entrada y Salida (\`stdio.h\`)

---

## 1. INTRODUCCIÓN

Las operaciones de Entrada y Salida (E/S o I/O) no forman parte del núcleo del lenguaje C en sí, por lo cual C ha permanecido extremadamente ligero y portátil para microcontroladores diminutos. En su lugar, K&R diseñaron una Biblioteca Estándar inmensamente robusta dictada por el ANSI C que provee estas capacidades (declarada en \`<stdio.h>\`).

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 E/S Formateada: \`printf\` y \`scanf\`
C provee la función variádica \`printf\` y \`scanf\` que aceptan un número indeterminado de argumentos, definidos por un patrón string.

#### La anatomía de printf()
El formato general de las conversiones de impresión es:
\`%[-][min_width][.precision][l]conversion_char\`

Ejemplos:
* \`%d\`: Entero decimal estándar
* \`%05d\`: Entero rellenado con ceros hasta 5 posiciones (ej. \`00123\`)
* \`%.3f\`: Punto flotante con exactamente 3 decimales
* \`%p\`: Formatea un puntero imprimiblemente en hexadecimal.

#### La naturaleza de scanf()
La función \`scanf\` analiza la entrada basándose en un formato. Su peligro radica en que **modifica variables externas**, por lo tanto, **exige punteros**.
\`\`\`c
int day, year;
char monthname[20];
scanf("%d %s %d", &day, monthname, &year);
\`\`\`
Nota que \`day\` y \`year\` llevan el símbolo \`&\` (dirección), pero \`monthname\` NO, ya que el nombre de un arreglo es intrínsecamente un puntero en C.

### 2.2 Archivos Secuenciales con Archivos de Texto
C abstrae el concepto de un archivo físico usando un puntero especial de tipo \`FILE\` proveído por el sistema operativo.

\`\`\`c
FILE *fp;
fp = fopen("datos.txt", "r"); // Abre en modo lectura (read)
if (fp == NULL) {
    // Manejo de error si el archivo no existe
}
\`\`\`
C define los modos \`"r"\` (lectura), \`"w"\` (escritura destructiva) y \`"a"\` (append/adición).
Una vez abierto el "file pointer", se pueden utilizar operaciones análogas de string o carácter, pero dirigidas a ese flujo:
* \`getc(fp)\` / \`putc(c, fp)\`: equivalentes de \`getchar\` y \`putchar\`.
* \`fscanf(fp, "%d", &x)\`: lee formateado.
* \`fprintf(fp, "Hola")\`: escribe formateado.

Es un requisito de memoria indispensable invocar \`fclose(fp)\` cuando terminas con el archivo, liberando el Descriptor de Archivo que asignó el OS.

### 2.3 Procesamiento con Strings: \`sprintf\` y \`sscanf\`
Es sumamente común y poderoso parsear textos provenientes de la red, o generar mensajes en memoria en lugar de enviarlos a una terminal.
\`\`\`c
char buffer[100];
// Imprime DENTRO del arreglo de caracteres
sprintf(buffer, "El %s es %d", "año", 2026);

// Analiza (Parseo) DESDE un string en memoria
sscanf("Dato 123.45", "%s %f", bufTexto, &flotante);
\`\`\`

### 2.4 E/S Binaria y Acceso Aleatorio (\`fread\`, \`fwrite\`, \`fseek\`)
Las funciones formateadas como \`fprintf\` escriben secuencias legibles en ASCII (por ejemplo, el entero 1234 se escribe como 4 bytes de texto: '1', '2', '3', '4'). 
Para almacenar estructuras o matrices puras tal cual residen en RAM (mucho más rápido y eficiente), C utiliza \`fread\` y \`fwrite\`.

\`\`\`c
struct Registro reg;
// Escribe el bloque de memoria de la variable "reg" intacto al disco
fwrite(&reg, sizeof(struct Registro), 1, fp);
\`\`\`

Las funciones binarias se combinan con **\`fseek(fp, desplazamiento, origen)\`** que permite mover el cabezal del lector a cualquier byte del archivo sin leerlo secuencialmente de inicio a fin.`,
    codeExamples: [
      {
        title: '1. Procesamiento de Cadenas Formateadas con sprintf y sscanf',
        description: 'Construcción y análisis de datos en memoria sin interactuar directamente con disco.',
        code: `#include <stdio.h>

int main() {
    char registro[] = "Estudiante 101 95.5";
    char nombre[20];
    int id;
    float nota;

    sscanf(registro, "%s %d %f", nombre, &id, &nota);

    printf("Datos Parseados:\\n");
    printf("  Nombre: %s\\n  ID: %d\\n  Nota: %.1f\\n", nombre, id, nota);
    return 0;
}`,
        expectedOutput: `Datos Parseados:\n  Nombre: Estudiante\n  ID: 101\n  Nota: 95.5`
      },
      {
        title: '2. Formateo Seguro de Buffer con sprintf',
        description: 'Construcción estandarizada de mensajes formateados en arreglos de caracteres.',
        code: `#include <stdio.h>

int main() {
    char buffer[100];
    int id = 42;
    char estado[] = "OK";

    sprintf(buffer, "ID: %d | Estado: %s", id, estado);
    printf("Resultado: %s\\n", buffer);
    return 0;
}`,
        expectedOutput: `Resultado: ID: 42 | Estado: OK`
      }
    ],
    exercises: [
      {
        id: 'ex-cap7-niv1',
        title: 'Nivel 1 (Conceptual): Formateo de Cadenas en Memoria con sprintf',
        description: 'Escribe una función C `void formatearReporte(char dest[], int id, const char estado[])` que utilice `sprintf` para construir la cadena `"ID: <id> | Estado: <estado>"`.',
        cormenRef: 'K&R Cap 7 - Sec 7.2',
        initialCode: '#include <stdio.h>\n\nvoid formatearReporte(char dest[], int id, const char estado[]) {\n    // TODO: Utiliza sprintf para llenar dest\n}',
        solutionCode: '#include <stdio.h>\n\nvoid formatearReporte(char dest[], int id, const char estado[]) {\n    sprintf(dest, "ID: %d | Estado: %s", id, estado);\n}',
        hint: 'Sintaxis: `sprintf(dest, "ID: %d | Estado: %s", id, estado);`',
        testCases: [
          {
            id: 'tc-c7-1',
            description: 'Formatear ID 42 y Estado "OK"',
            input: '42, "OK"',
            expectedOutput: 'ID: 42 | Estado: OK'
          }
        ],
        explanation: '`sprintf` escribe la salida formateada directamente en el arreglo de caracteres especificado.'
      },
      {
        id: 'ex-cap7-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Extracción Segura de Datos con sscanf',
        description: 'El siguiente código intenta extraer una fecha `"2026-08-15"` usando `sscanf`, pero los especificadores de formato son incorrectos o faltan los operadores `&`. Corrígelo.',
        cormenRef: 'K&R Cap 7 - Sec 7.4',
        initialCode: '#include <stdio.h>\n\nint parsearFecha(const char fechaStr[], int *anio, int *mes, int *dia) {\n    // BUG: Error de especificadores o falta de punteros en sscanf\n    return sscanf(fechaStr, "%d-%d-%d", anio, mes, dia);\n}',
        solutionCode: '#include <stdio.h>\n\nint parsearFecha(const char fechaStr[], int *anio, int *mes, int *dia) {\n    return sscanf(fechaStr, "%d-%d-%d", anio, mes, dia);\n}',
        hint: '`sscanf(fechaStr, "%d-%d-%d", anio, mes, dia)` debe retornar 3 si se parsearon los 3 enteros correctamente.',
        testCases: [
          {
            id: 'tc-c7-2',
            description: 'Parsear "2026-08-15" -> debe retornar 3 campos parseados',
            input: '"2026-08-15"',
            expectedOutput: '3'
          }
        ],
        explanation: '`sscanf` devuelve el número de elementos asignados exitosamente, permitiendo validar la integridad del parseo.'
      },
      {
        id: 'ex-cap7-niv3-impl',
        title: 'Nivel 3 (Implementación C): Contador de Líneas en Texto con fgets',
        description: 'Escribe una función C `int contarLneasTexto(const char texto[])` que utilice `sscanf` o recorrido de buffer para contar cuántos caracteres salto de línea `\\n` existen en el texto.',
        cormenRef: 'K&R Cap 7 - Sec 7.7',
        initialCode: '#include <stdio.h>\n\nint contarLineasTexto(const char texto[]) {\n    int lineas = 0;\n    // TODO: Cuenta cuántos saltos de línea \\\'\\\\n\\\' contiene la cadena\n    return lineas;\n}',
        solutionCode: '#include <stdio.h>\n\nint contarLineasTexto(const char texto[]) {\n    int lineas = 0;\n    for (int i = 0; texto[i] != \'\\0\'; i++) {\n        if (texto[i] == \'\\n\') lineas++;\n    }\n    return lineas;\n}',
        hint: 'Itera sobre la cadena e incrementa `lineas` cada vez que `texto[i] == \'\\n\'`.',
        testCases: [
          {
            id: 'tc-c7-3',
            description: 'Contar líneas de "Hola\\nMundo\\nC\\n" -> 3 líneas',
            input: '"Hola\\nMundo\\nC\\n"',
            expectedOutput: '3'
          }
        ],
        explanation: 'Las herramientas de análisis de texto en C como `wc -l` cuentan la ocurrencia del carácter de nueva línea `\\n`.'
      },
      {
        id: 'ex-cap7-niv4-analisis',
        title: 'Nivel 4 (Análisis): Copia de Archivos Binarios por Bloques (fread / fwrite)',
        description: 'Escribe una función `size_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes)` que simule una copia por bloques binarios.',
        cormenRef: 'K&R Cap 7 - Sec 7.5',
        initialCode: '#include <stdio.h>\n#include <string.h>\n\nsize_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes) {\n    // TODO: Utiliza memcpy o transferencia por bytes para copiar numBytes\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n#include <string.h>\n\nsize_t copiarBloqueMemoria(const void *src, void *dest, size_t numBytes) {\n    if (src == NULL || dest == NULL) return 0;\n    memcpy(dest, src, numBytes);\n    return numBytes;\n}',
        hint: 'Utiliza `memcpy(dest, src, numBytes)` y retorna `numBytes`.',
        testCases: [
          {
            id: 'tc-c7-4',
            description: 'Copiar bloque de 10 bytes -> retorna 10',
            input: '10',
            expectedOutput: '10'
          }
        ],
        explanation: 'Las transferencias de bloques de memoria no interpretan tipos ni caracteres especiales, copiando los bytes puros.'
      },
      {
        id: 'ex-cap7-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Analizador de Expresión CSV con sscanf',
        description: 'Escribe una función C `int parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio)` que extraiga datos separados por comas usando `sscanf(linea, "%[^,],%d,%f", nombre, edad, promedio)`. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 7 - Sec 7.4',
        initialCode: '#include <stdio.h>\n\nint parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio) {\n    // TODO: Utiliza la especificación de conjunto de caracteres de sscanf %[^,]\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint parsearLineaCSV(const char linea[], char nombre[], int *edad, float *promedio) {\n    return sscanf(linea, "%[^,],%d,%f", nombre, edad, promedio);\n}',
        hint: 'Utiliza el especificador `%[^,]` en `sscanf` para leer todos los caracteres hasta encontrar una coma.',
        testCases: [
          {
            id: 'tc-c7-5',
            description: 'Parsear "Carlos,22,9.5" -> debe retornar 3 elementos parseados',
            input: '"Carlos,22,9.5"',
            expectedOutput: '3'
          }
        ],
        explanation: 'El especificador de escaneo `%[^,]` en `sscanf` actúa como una expresión regular simple para detener la lectura en la coma delimitadora.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c7-1',
        question: '¿Cuál es el valor retornado por fopen() si falla al abrir el archivo especificado?',
        options: ['EOF (-1)', 'NULL', '0', 'Un número entero negativo'],
        correctIndex: 1,
        explanation: 'Si el archivo no existe o el programa no cuenta con permisos de acceso, fopen() devuelve el puntero nulo NULL.'
      },
      {
        id: 'q-c7-2',
        question: '¿Por qué la función fgets() es preferible sobre la función obsoleta gets() para leer texto?',
        options: [
          'fgets() es más rápida porque usa ensamblador.',
          'fgets() requiere especificar el tamaño máximo del buffer destino, previniendo desbordamientos de memoria (Buffer Overflow).',
          'gets() no puede leer espacios en blanco.',
          'fgets() convierte automáticamente el texto a mayúsculas.'
        ],
        correctIndex: 1,
        explanation: 'Al requerir el límite del buffer en sus parámetros, fgets() garantiza que nunca se escriban más bytes de los asignados en memoria.'
      },
      {
        id: 'q-c7-3',
        question: '¿Cuál es la función del flujo estándar stderr en los sistemas operativos derivados de UNIX?',
        options: [
          'Guardar copias de seguridad del código fuente.',
          'Canal de salida sin buffer inmediato dedicado a emitir mensajes de error o advertencias independientemente de la redirección de stdout.',
          'Procesar datos ingresados desde el ratón.',
          'Acelerar el uso de la memoria RAM.'
        ],
        correctIndex: 1,
        explanation: 'stderr permite enviar alertas inmediatas a la consola incluso cuando la salida estándar stdout se redirige a un archivo mediante >.'
      }
    ]
  },

  {
    id: 'cap-8',
    chapterNumber: 8,
    title: 'Capítulo 8: La Interfaz del Sistema Operativo UNIX',
    subtitle: 'Llamadas al sistema (System Calls), Descriptores de Archivo y Asignación de Memoria (malloc)',
    icon: '💻',
    description: 'Módulo avanzado de arquitectura UNIX: llamadas al sistema nativas read(), write(), open(), close(), lseek(), acceso a directorios (stat, fstat) e implementación interna de un asignador de memoria dinámica Heap (malloc/free) con lista libre de bloques.',
    summary: 'Comprende la frontera entre el espacio de usuario de un programa C y el kernel del sistema operativo.',
    keyConcepts: [
      'Descriptores de Archivo (0: stdin, 1: stdout, 2: stderr)',
      'Llamadas al Sistema unbuffered: read() y write()',
      'System calls: open(), close(), creat()',
      'Reposicionamiento en archivo: lseek()',
      'Metadatos de archivos e inodos (stat, fstat)',
      'Gestión de directorios: opendir, readdir, closedir',
      'Ampliación del segmento de datos: llamada sbrk() / brk()',
      'Implementación K&R de malloc() y free()',
      'Lista circular de bloques libres con cabecera (Header)'
    ],
    analogies: [
      {
        title: 'Llamadas al Sistema como la Ventanilla de un Banco',
        concept: 'User Space vs Kernel Space',
        analogy: 'Tu programa C es un cliente en la sala de espera (User Space). No puede entrar a la bóveda del banco (Hardware/Disco) directamente. Debe pasar una solicitud firmada a la ventanilla (System Call) para que el cajero (el Kernel) realice la operación de manera aislada y segura.',
        whyItWorks: 'Explica la protección de memoria del procesador y las transiciones entre nivel de usuario y modo kernel.'
      },
      {
        title: 'El Malloc de K&R como una Red de Terrenos Conectados',
        concept: 'Free List (Lista de bloques libres en el Heap)',
        analogy: 'El Heap es un gran terreno administrado como una lista circular de parcelas disponibles. Cuando pides 100 metros (malloc), el administrador busca una parcela suficientemente grande, recorta los 100 metros y te los entrega con un cartelito (Header) en la entrada que indica su tamaño.',
        whyItWorks: 'Demuestra el funcionamiento de la cabecera oculta `Header` que antecede al puntero retornado por malloc.'
      }
    ],
    theoryContent: `# Capítulo 8: La Interfaz del Sistema Operativo UNIX

---
## 1. Motivación K&R
A lo largo de tu formación en C, te has apoyado en las bibliotecas estándar como \`<stdio.h>\` o \`<stdlib.h>\`. Has llamado a \`printf\` y \`malloc\` asumiendo que "mágicamente" el texto aparece en la terminal y la memoria aparece de la nada. 

Dennis Ritchie no creó C solo para escribir aplicaciones; lo creó para escribir el mismísimo sistema operativo UNIX. Por tanto, C provee mecanismos crudos y directos para hablar con el Kernel. El Capítulo 8 de K&R retira el velo de la biblioteca estándar, enfrentándote cara a cara con las "Llamadas al Sistema" (System Calls). Aquí descubres que \`malloc\` no es magia, sino un algoritmo que tú mismo puedes programar usando listas enlazadas sobre un trozo crudo de RAM.

---
## 2. Explicación Teórica Ampliada

### User Space vs Kernel Space y System Calls
Los programas que escribes corren en el anillo de protección más bajo (*User Space*). Si tu programa intenta leer el disco duro directamente, el procesador lanza una excepción y te aniquila (*Segmentation Fault*). Para interactuar con el mundo físico, debes hacer una interrupción especial de software: una **System Call**. Le entregas una solicitud al Kernel (*Kernel Space*, altos privilegios) y esperas que él realice la operación.

### Descriptores de Archivo de Bajo Nivel
En UNIX, "todo es un archivo": el teclado, la terminal, las impresoras y los sockets de red. 
Cuando tu programa en C inicia, el Kernel ya abre automáticamente tres descriptores (enteros que indexan una tabla en el Kernel):
*   **\`0\` (stdin):** Entrada estándar (teclado).
*   **\`1\` (stdout):** Salida estándar (pantalla).
*   **\`2\` (stderr):** Error estándar (pantalla, sin buffer, útil para alertas).

Las System Calls crudas evitan el uso de los cómodos punteros \`FILE*\` y operan directo con estos enteros:
\`\`\`c
#include <unistd.h>
char buffer[1024];
// Lee del descriptor 0 (teclado)
int leidos = read(0, buffer, sizeof(buffer));
// Escribe crudo al descriptor 1 (pantalla)
write(1, buffer, leidos);
\`\`\`

### El Algoritmo detrás de \`malloc\` (Free List)
\`malloc\` es una función en User Space, no una System Call. Pide un bloque gigantesco de memoria al Kernel (usando \`sbrk()\` o \`mmap()\`), y luego lo "lotea" y revende en pedazos más pequeños a tu programa.

K&R implementan \`malloc\` manteniendo una **Lista Libre Circular** (Free List) de los pedazos de memoria que no están en uso. 
Cuando haces \`malloc(100)\`:
1.  Busca un bloque libre en la lista que tenga al menos 100 bytes (First Fit).
2.  Le recorta los 100 bytes y te devuelve un puntero.
3.  **El secreto mortal:** Justo *antes* del puntero que te entrega, \`malloc\` esconde una cabecera de metadatos (Header) que dice "este bloque es de 100 bytes". Así, cuando llamas a \`free(p)\`, el sistema lee la cabecera hacia atrás y sabe cuánta memoria reclamar.

---
## 3. Complejidad Asintótica de las Llamadas Crudas

| Operación | System Call | Complejidad | Notas |
| :--- | :--- | :--- | :--- |
| **I/O Crudo** | \`read / write\` | $O(B)$ | El tiempo depende de los $B$ bytes copiados y el bus físico del hardware. |
| **Reposición** | \`lseek\` | $O(1)$ | Salto directo de un puntero en una estructura del Kernel, independientemente del tamaño del archivo. |
| **Reservar Heap** | \`sbrk\` | $O(1)$ | Solo mueve el "program break" (el límite superior del Heap del proceso) en el Kernel. |
| **Asignar Memoria** | \`malloc\` (K&R) | $O(N)$ peor caso | $N$ es el número de bloques fragmentados en la Free List, ya que hace una búsqueda lineal (First-Fit). |
| **Liberar Memoria** | \`free\` (K&R) | $O(N)$ peor caso | Busca el punto correcto en la Free List para re-insertar y fusionar (coalesce) bloques adyacentes. |

---
## 4. Aplicaciones en la Industria

*   **Motores de Bases de Datos:** PostgreSQL o SQLite rara vez usan el \`malloc\` o el \`fwrite\` estándar. Prefieren pedir bloques crudos al OS y administrar su propio "Memory Pool" y "Page Cache" para exprimir el rendimiento.
*   **Servidores Web de Alta Concurrencia:** Nginx o Redis utilizan System Calls avanzadas de I/O (como \`epoll\` en Linux) operando exclusivamente sobre descriptores crudos para manejar miles de peticiones simultáneas sin bloqueo.
*   **Microcontroladores y Sistemas Embebidos:** Cuando programas componentes sin un Sistema Operativo completo (Bare Metal), a menudo debes programar tu propio \`malloc\` para administrar la poca RAM (SRAM) disponible en el chip, basándote exactamente en la técnica de la lista de K&R.

---
## 5. Gotchas y Errores Letales (C/C++)

*   **El Infame "Heap Buffer Overflow":** Si reservas un arreglo de 10 bytes y escribes en la posición 11, estás corrompiendo la cabecera (Header secreto) del siguiente bloque de \`malloc\`. El programa seguirá "funcionando" hasta que intentes hacer \`free()\` y la tabla corrupta cause un Segmentation Fault cataclísmico incomprensible.
*   **Doble Liberación (Double Free):** Llamar a \`free(p)\` dos veces sobre el mismo puntero destruye por completo la integridad de la Free List circular, típicamente permitiendo vulnerabilidades de ciberseguridad catastróficas donde un atacante puede ejecutar código arbitrario.
*   **Fugas de Descriptores (File Descriptor Leak):** Al igual que la memoria RAM, los descriptores (\`0, 1, 2, 3, 4...\`) son recursos finitos del Kernel. Si haces \`open()\` y olvidas hacer \`close()\`, el proceso eventualmente se quedará sin descriptores y fallará (Error \`EMFILE: Too many open files\`).

---
## 6. Glosario Técnico

*   **System Call (Syscall):** La interfaz fundamental entre una aplicación en User Space y el Kernel de UNIX.
*   **User Space / Kernel Space:** Separación estricta de memoria virtual y privilegios de CPU impuesta por el hardware moderno.
*   **Descriptor de Archivo (File Descriptor):** Un pequeño número entero no negativo devuelto por el Kernel, usado como índice abstracto para identificar I/O (archivos, sockets, tuberías).
*   **Free List:** La estructura de datos interna que utiliza \`malloc\` para rastrear huecos de memoria disponibles en el Heap.
*   **Program Break:** La dirección virtual más alta del Heap de un proceso; incrementado por \`sbrk()\`.

---
## 7. Referencias Clásicas

*   **Cormen et al. (CLRS):** Las listas enlazadas y la gestión dinámica subyacente son equivalentes a los diccionarios elementales de los capítulos introductorios.
*   **Brian W. Kernighan & Dennis M. Ritchie, "The C Programming Language":** Capítulo 8 (La Interfaz del Sistema UNIX), subsecciones 8.2 (Lectura y Escritura de bajo nivel) y 8.7 (Un asignador de almacenamiento - \`malloc\`).`,
    codeExamples: [
      {
        title: '1. Simulación de Reserva Dinámica y Liberación en el Heap',
        description: 'Demostración práctica de asignación de memoria con malloc y comprobación de puntero libre.',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*) malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Error al asignar memoria\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 100;
        printf("Bloque %d: %d en dirección %p\\n", i, arr[i], (void*)&arr[i]);
    }

    free(arr); // Devuelve el bloque al sistema
    printf("Memoria liberada correctamente al Heap.\\n");
    return 0;
}`,
        expectedOutput: `Bloque 0: 100 en dirección 0x7ffd10\nBloque 1: 200 en dirección 0x7ffd14\nBloque 2: 300 en dirección 0x7ffd18\nBloque 3: 400 en dirección 0x7ffd1c\nBloque 4: 500 en dirección 0x7ffd20\nMemoria liberada correctamente al Heap.`
      },
      {
        title: '2. Implementación de miCalloc con malloc y memset',
        description: 'Asignación de memoria en el Heap garantizando inicialización limpia a ceros.',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void* miCalloc(size_t n, size_t size) {
    size_t total = n * size;
    void *p = malloc(total);
    if (p != NULL) {
        memset(p, 0, total);
    }
    return p;
}

int main() {
    int *arr = (int*) miCalloc(5, sizeof(int));
    printf("Primer elemento inicializado a cero: %d\\n", arr[0]);
    free(arr);
    return 0;
}`,
        expectedOutput: `Primer elemento inicializado a cero: 0`
      }
    ],
    exercises: [
      {
        id: 'ex-cap8-niv1',
        title: 'Nivel 1 (Conceptual): Identificación de Descriptores de Archivo Estándar',
        description: 'Escribe una función C `int obtenerDescriptorError(void)` que retorne el valor numérico del descriptor de archivo asignado por UNIX a la salida de errores estándar `stderr`.',
        cormenRef: 'K&R Cap 8 - Sec 8.1',
        initialCode: '#include <stdio.h>\n\nint obtenerDescriptorError(void) {\n    // TODO: Retorna el entero del descriptor de stderr\n    return -1;\n}',
        solutionCode: '#include <stdio.h>\n\nint obtenerDescriptorError(void) {\n    return 2; // 0: stdin, 1: stdout, 2: stderr\n}',
        hint: 'Los descriptores estándar son 0 (stdin), 1 (stdout) y 2 (stderr).',
        testCases: [
          {
            id: 'tc-c8-1',
            description: 'Obtener descriptor de stderr -> debe retornar 2',
            input: '',
            expectedOutput: '2'
          }
        ],
        explanation: 'UNIX asigna el entero 2 al flujo de error estándar stderr al iniciar cada proceso.'
      },
      {
        id: 'ex-cap8-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Asignador Limpio miCalloc con memset',
        description: 'La función `miCalloc` debe reservar memoria dinámica con `malloc` y limpiarla a cero con `memset`. Corrige el cálculo de bytes total.',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nvoid* miCalloc(size_t n, size_t size) {\n    // BUG: Multiplica mal los bytes para memset\n    void *p = malloc(n);\n    if (p) memset(p, 0, n);\n    return p;\n}',
        solutionCode: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nvoid* miCalloc(size_t n, size_t size) {\n    size_t total = n * size;\n    void *p = malloc(total);\n    if (p != NULL) {\n        memset(p, 0, total);\n    }\n    return p;\n}',
        hint: 'El tamaño total en bytes es `n * size`. Pasa `total` a `malloc` y a `memset`.',
        testCases: [
          {
            id: 'tc-c8-2',
            description: 'Asignar 5 enteros de 4 bytes -> limpia 20 bytes a cero',
            input: '5, 4',
            expectedOutput: '0'
          }
        ],
        explanation: '`calloc` requiere multiplicar el número de elementos `n` por el tamaño individual de cada elemento `size`.'
      },
      {
        id: 'ex-cap8-niv3-impl',
        title: 'Nivel 3 (Implementación C): Copia de Archivos con read() y write() unbuffered',
        description: 'Escribe una función C `int simularCopiaUnbuffered(int bytesCopiar)` que devuelva la cantidad total de bytes transferidos.',
        cormenRef: 'K&R Cap 8 - Sec 8.2',
        initialCode: '#include <stdio.h>\n\nint simularCopiaUnbuffered(int bytesCopiar) {\n    // TODO: Simula el bucle read/write retornando la cantidad de bytes procesados\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint simularCopiaUnbuffered(int bytesCopiar) {\n    if (bytesCopiar < 0) return 0;\n    return bytesCopiar;\n}',
        hint: 'Retorna `bytesCopiar` si es mayor o igual a 0, de lo contrario 0.',
        testCases: [
          {
            id: 'tc-c8-3',
            description: 'Copiar 1024 bytes -> retorna 1024',
            input: '1024',
            expectedOutput: '1024'
          }
        ],
        explanation: 'Las transferencias directas leen y escriben chunks contiguos de bytes retornando el total transferido.'
      },
      {
        id: 'ex-cap8-niv4-analisis',
        title: 'Nivel 4 (Análisis): Cálculo del Tamaño de Cabecera Header en Malloc de K&R',
        description: 'Escribe una función C `size_t obtenerTamanioHeader(void)` que devuelva `sizeof(Header)` garantizando la alineación estricta de memoria.',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n\ntypedef long Align;\nunion header {\n    struct {\n        union header *ptr;\n        unsigned size;\n    } s;\n    Align x;\n};\ntypedef union header Header;\n\nsize_t obtenerTamanioHeader(void) {\n    // TODO: Devuelve sizeof(Header)\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\ntypedef long Align;\nunion header {\n    struct {\n        union header *ptr;\n        unsigned size;\n    } s;\n    Align x;\n};\ntypedef union header Header;\n\nsize_t obtenerTamanioHeader(void) {\n    return sizeof(Header);\n}',
        hint: 'Retorna `sizeof(Header)`.',
        testCases: [
          {
            id: 'tc-c8-4',
            description: 'Obtener sizeof(Header) -> debe retornar mayor a 0 (ej. 16 en 64-bits)',
            input: '',
            expectedOutput: '16'
          }
        ],
        explanation: 'La `union header` fuerza al compilador a alinear cada bloque al tamaño de palabra más estricto del procesador (8 o 16 bytes).'
      },
      {
        id: 'ex-cap8-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Gestor de Asignación de Bloque de Memoria Fija',
        description: 'Escribe una función C `void* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida)` que asigne un bloque contiguo dentro de un buffer `pool` pre-reservado y actualice el `offset`. Si no hay espacio suficiente, retorna `NULL`. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 8 - Sec 8.7',
        initialCode: '#include <stdio.h>\n\nvoid* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida) {\n    // TODO: Verifica si *offset + bytesPedida <= tamanioPool y retorna la dirección\n    return NULL;\n}',
        solutionCode: '#include <stdio.h>\n\nvoid* asignarDePool(char pool[], size_t *offset, size_t tamanioPool, size_t bytesPedida) {\n    if (*offset + bytesPedida > tamanioPool) return NULL;\n    void *p = &pool[*offset];\n    *offset += bytesPedida;\n    return p;\n}',
        hint: 'Verifica si `*offset + bytesPedida <= tamanioPool`. Si es válido, guarda `&pool[*offset]`, incrementa `*offset` y retorna la dirección.',
        testCases: [
          {
            id: 'tc-c8-5',
            description: 'Pedir 64 bytes de un pool de 1024 -> asignación exitosa',
            input: '64',
            expectedOutput: '64'
          }
        ],
        explanation: 'Un asignador de arena o pool administra bloques contiguos incrementando un puntero de avance (*bump allocator*) de forma ultrafast $O(1)$.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c8-1',
        question: '¿Cuál es el descriptor de archivo estándar asignado por los sistemas UNIX a la salida de errores (stderr)?',
        options: ['0', '1', '2', '3'],
        correctIndex: 2,
        explanation: '0 representa la entrada estándar stdin, 1 la salida estándar stdout y 2 la salida de errores stderr.'
      },
      {
        id: 'q-c8-2',
        question: '¿Qué función cumple la llamada al sistema sbrk() en la implementación de malloc() en sistemas UNIX?',
        options: [
          'Escribir texto en la impresora.',
          'Solicitar al Kernel incrementar o decrementar el límite superior del segmento de datos (Heap) del proceso.',
          'Cerrar los descriptores de archivo inactivos.',
          'Crear un nuevo hilo de ejecución.'
        ],
        correctIndex: 1,
        explanation: 'sbrk() expande el espacio de direcciones disponible en el Heap para que el asignador malloc pueda satisfacer nuevas solicitudes de memoria.'
      },
      {
        id: 'q-c8-3',
        question: '¿Por qué la llamada al sistema read() devuelve el valor 0 al leer un archivo?',
        options: [
          'Ocurrió un error grave en el disco duro.',
          'Indica que se ha alcanzado el Fin de Archivo (EOF - End Of File).',
          'El archivo se encuentra protegido contra escritura.',
          'La memoria RAM está llena.'
        ],
        correctIndex: 1,
        explanation: 'read() devuelve 0 bytes leídos cuando el puntero del archivo alcanza el final del archivo (EOF).'
      }
    ]
  }
];
