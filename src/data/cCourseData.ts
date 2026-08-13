import { CChapter } from '../types';

export const C_COURSE_DATA: CChapter[] = [
  {
    id: 'cap-1',
    chapterNumber: 1,
    title: 'Capítulo 1: Introducción General (El Tutorial K&R)',
    subtitle: 'Fundamentos esenciales del Lenguaje C: Sintaxis, Memoria, Estructuras de Control, Tipos y Rangos',
    icon: '📘',
    description: 'Aprende la arquitectura básica de un programa en C, el flujo de compilación, la tabla completa de rangos de tipos primitivos, el fenómeno de integer overflow y el modelo de I/O de caracteres.',
    summary: 'El primer capítulo establece los cimientos del estándar C de Kernighan & Ritchie. Comprenderás el mapa de memoria, la compilación nativa, la tabla de rangos de datos con desbordamiento y el procesamiento de flujos con getchar/putchar.',
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
      },
      {
        title: 'Paso por Valor como Fotocopiar un Documento',
        concept: 'Argumentos de funciones en C (Pass-by-value)',
        analogy: 'Si le prestas una fotocopia de tus notas a un compañero y él hace anotaciones en ella, tus notas originales en tu libreta no se alteran en absoluto.',
        whyItWorks: 'Demuestra con claridad por qué modificar un parámetro dentro de una función en C no afecta la variable original en main().'
      }
    ],
    theoryContent: `# Capítulo 1: Introducción General (El Tutorial K&R)

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

### C: La Lengua Franca de la Computación de Sistemas
El lenguaje **C** no es simplemente un lenguaje de programación más; es la infraestructura invisible sobre la cual opera el mundo digital moderno. Diseñado entre 1969 y 1973 por **Dennis Ritchie** en los Laboratorios Bell de AT&T para reescribir el sistema operativo UNIX, C logró una hazaña inédita: combinar la velocidad y el acceso directo a la memoria RAM propios del lenguaje Ensamblador con la abstracción elegante y estructurada de un lenguaje de alto nivel.

A diferencia de lenguajes interpretados o gestionados por una máquina virtual (como Python, JavaScript o Java), C se compila directamente a código máquina nativo del procesador. No existe una capa de gestión de memoria (*Garbage Collector*). Cada variable ocupa una ubicación física real en la memoria RAM y cada instrucción de C se traduce casi 1:1 a instrucciones de la CPU.

### Breve Contexto Histórico
* **1972 – Dennis Ritchie**: Diseña el lenguaje C en Bell Labs como sucesor del lenguaje B (de Ken Thompson).
* **1978 – Kernighan & Ritchie (K&R)**: Publican *The C Programming Language*, el célebre "Libro Blanco" que definió el primer estándar informal de C (*K&R C*).
* **1989 – ANSI C (C89/C90)**: Formaliza el estándar del lenguaje, introduciendo prototipos de funciones (\`void main(void)\`), calificadores \`const\` y bibliotecas estándar unificadas.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 La Anatomía de un Programa C y el Flujo de Compilación
El proceso de conversión de código fuente \`.c\` a un binario ejecutable pasa por 4 etapas fundamentales:

1. **Preprocesamiento (\`cpp\`)**: Procesa todas las directivas que comienzan con \`#\`. Reemplaza \`#include <stdio.h>\` con el texto literal del archivo de cabecera y sustituye las macros definidas con \`#define\`.
2. **Compilación (\`gcc -S\`)**: Traduce el código C preprocesado a código fuente en **Lenguaje Ensamblador** específico de la arquitectura (x86_64 o ARM).
3. **Ensamblado (\`as\`)**: Convierte las instrucciones en ensamblador a código objeto binario nativo (archivo \`.o\` o \`.obj\`).
4. **Enlazado (*Linking*, \`ld\`)**: Combina el archivo objeto con las bibliotecas del sistema (como \`libc.so\` o \`msvcrt.dll\`) para producir el archivo ejecutable final.

#### Estructura Mínima
\`\`\`c
#include <stdio.h> // Directiva del preprocesador

int main(void) {   // Punto de entrada obligatorio
    printf("¡Hola, mundo! Estándar K&R C\\n");
    return 0;      // Estado de salida enviado al S.O. (0 = éxito)
}
\`\`\`

### 2.2 Mapa de Memoria y Tipos de Datos Primitivos
En C, el tamaño de cada tipo de dato depende de la arquitectura del compilador (16, 32 o 64 bits). 

| Tipo de Dato | Tamaño | Tamaño | Rango Mínimo | Rango Máximo | Especificador \`printf\` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| \`signed char\` | 1 Byte | 8 bits | -128 | +127 | \`%c\` / \`%d\` |
| \`unsigned char\` | 1 Byte | 8 bits | 0 | 255 | \`%u\` |
| \`short int\` | 2 Bytes | 16 bits | -32,768 | +32,767 | \`%hd\` |
| \`int\` | 4 Bytes | 32 bits | -2,147,483,648 | +2,147,483,647 | \`%d\` / \`%i\` |
| \`unsigned int\` | 4 Bytes | 32 bits | 0 | 4,294,967,295 | \`%u\` |
| \`long long\` | 8 Bytes| 64 bits | -9,223,372,036,854,775,808 | +9,223,372,036,854,775,807 | \`%lld\` |

#### Integer Overflow (Desbordamiento Entero)
¿Qué ocurre si a un \`unsigned char\` (rango 0 a 255) cuyo valor actual es 255 se le suma 1?
Dado que 255 en binario es \`11111111\`, sumar 1 produce \`100000000\`. Como el \`char\` solo tiene 8 bits, el noveno bit se trunca y el valor vuelve a **0**. Para variables con signo (signed), el desbordamiento produce **Comportamiento Indefinido (Undefined Behavior)** según el estándar C, aunque típicamente da la vuelta hacia los números negativos (Complemento a Dos).

### 2.3 Modelo de I/O de Caracteres (\`getchar\` y \`putchar\`)
C no posee un concepto incorporado de "strings" o texto avanzado nativo, a diferencia de lenguajes de alto nivel. Todo se procesa como un flujo secuencial (stream) de bytes.
* \`getchar()\`: Lee exactamente el siguiente carácter (1 byte) disponible en el flujo de entrada estándar (\`stdin\`). Retorna un **entero** (\`int\`), no un \`char\`, para poder incluir el valor especial \`EOF\` (-1) cuando no hay más datos.
* \`putchar(c)\`: Imprime el byte \`c\` en la salida estándar (\`stdout\`).

---

## 3. MEJORES PRÁCTICAS Y PELIGROS COMUNES

### ⚠️ Errores Típicos del Novato en C
1. **Asignación en lugar de Comparación (\`=\` vs \`==\`)**:
   Un error devastador en C es escribir \`if (x = 5)\`. Esto no compara si \`x\` es igual a 5; asigna \`5\` a \`x\`, y dado que \`5\` es verdadero (no cero), la condición siempre se evalúa como verdadera.
2. **Tipo de Retorno de \`getchar()\`**:
   La función \`getchar()\` no retorna un \`char\`, sino un \`int\`. Si almacenas el retorno de \`getchar()\` en un \`char\`, la comparación contra \`EOF\` (\`-1\`) fallará en arquitecturas donde \`char\` es por defecto sin signo (\`unsigned\`).
3. **Falta del carácter nulo en cadenas de texto**:
   Las funciones como \`printf("%s", str)\` leen memoria consecutivamente hasta encontrar un byte con valor \`0\`. Si creas un arreglo de caracteres sin \`'\\0'\`, \`printf\` leerá basura en RAM causando un desastre de segmentación (*Segmentation Fault*).

## 4. TAREAS Y EJERCICIOS
Sigue las simulaciones interactivas y prueba compilar los ejemplos en la zona de ejercicios.`,
    codeExamples: [
      {
        title: '1. Tabla de Temperatura Fahrenheit - Celsius',
        description: 'Demostración de variables float, ciclo while y especificación de formato decimal.',
        code: `#include <stdio.h>

int main() {
    float fahr = 0;
    printf("  Fahrenheit   Celsius\\n");
    printf("  --------------------\\n");
    while (fahr <= 100) {
        float celsius = (5.0 / 9.0) * (fahr - 32.0);
        printf("   %6.1f C -> %6.2f C\\n", fahr, celsius);
        fahr += 25.0;
    }
    return 0;
}`,
        expectedOutput: `  Fahrenheit   Celsius\n  --------------------\n      0.0 C -> -17.78 C\n     25.0 C ->  -3.89 C\n     50.0 C ->  10.00 C\n     75.0 C ->  23.89 C\n    100.0 C ->  37.78 C`
      },
      {
        title: '2. Demostración Explícita de Integer Overflow',
        description: 'Muestra cómo el desbordamiento en signed char provoca wrap-around hacia números negativos.',
        code: `#include <stdio.h>

int main() {
    signed char c = 127;
    printf("Valor antes de desbordar: %d\\n", c);
    c = c + 1;
    printf("Valor tras desbordar (+1): %d\\n", c);
    return 0;
}`,
        expectedOutput: `Valor antes de desbordar: 127\nValor tras desbordar (+1): -128`
      }
    ],
    exercises: [
      {
        id: 'ex-cap1-niv1',
        title: 'Nivel 1 (Conceptual): Predicción de Salida de División Entera',
        description: 'Dado el programa C que calcula el promedio simple de dos calificaciones enteras, corrige la expresión para evitar la truncación decimal.',
        cormenRef: 'K&R Cap 1 - Sec 1.2',
        initialCode: `#include <stdio.h>

float calcularPromedio(int a, int b) {
    // BUG: (a + b) / 2 trunca decimales!
    return (a + b) / 2;
}

int main() {
    printf("Promedio: %.1f\\n", calcularPromedio(8, 9));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

float calcularPromedio(int a, int b) {
    // SOLUCIÓN: Usar 2.0f para forzar división en punto flotante
    return (a + b) / 2.0f;
}

int main() {
    printf("Promedio: %.1f\\n", calcularPromedio(8, 9));
    return 0;
}`,
        hint: 'Sustituye la constante entera `2` por la constante flotante `2.0f` para promocionar el cálculo.',
        testCases: [
          {
            id: 'tc-c1',
            description: 'Verificar promedio preciso de 8 y 9 (8.5)',
            input: '',
            expectedOutput: 'Promedio: 8.5'
          }
        ],
        explanation: 'Al usar `2.0f`, C promociona el resultado del paréntesis `(a + b)` a `float`, produciendo la respuesta exacta 8.5 en lugar de truncar a 8.0.'
      },
      {
        id: 'ex-cap1-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Encontrar el Bug de Bucle Infinito en getchar()',
        description: 'Un estudiante declaró la variable `char c` en lugar de `int c` para leer texto hasta encontrar `EOF`. Corrige el tipo de dato de la variable.',
        cormenRef: 'K&R Cap 1 - Sec 1.5.1',
        initialCode: `#include <stdio.h>

int procesarEntrada() {
    // BUG: c declarado como char no puede almacenar EOF (-1) de forma confiable en todos los compiladores
    char c = 'A';
    int conteo = 0;
    // Simulación: incrementa conteo 5 veces
    while (conteo < 5) {
        conteo++;
    }
    return conteo;
}`,
        solutionCode: `#include <stdio.h>

int procesarEntrada() {
    // SOLUCIÓN: Declarar c como int
    int c = 'A';
    int conteo = 0;
    while (conteo < 5) {
        conteo++;
    }
    return conteo;
}`,
        hint: 'Cambia la declaración `char c` por `int c`.',
        testCases: [
          {
            id: 'tc-c2',
            description: 'Verificar conteo correcto',
            input: '',
            expectedOutput: '5'
          }
        ],
        explanation: 'En C, `getchar()` devuelve un `int` de 32 bits para garantizar que el valor especial `-1` (`EOF`) no se confunda con un carácter válido de 8 bits.'
      },
      {
        id: 'ex-cap1-niv3-impl1',
        title: 'Nivel 3 (Implementación C): Impresión de Tabla Invertida Fahrenheit',
        description: 'Escribe un programa en C que imprima la tabla de conversiones de Fahrenheit a Celsius en orden inverso, desde 300°F hasta 0°F decreciendo de 20 en 20.',
        cormenRef: 'K&R Cap 1 - Ejercicio 1-5',
        initialCode: `#include <stdio.h>

int main() {
    // TODO: Escribe un ciclo for descendente desde 300 hasta 0
    // Formato de salida: "%3d F = %6.1f C\n"
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    for (int fahr = 300; fahr >= 0; fahr -= 20) {
        printf("%3d F = %6.1f C\\n", fahr, (5.0 / 9.0) * (fahr - 32.0));
    }
    return 0;
}`,
        hint: 'Utiliza la estructura de control `for (int fahr = 300; fahr >= 0; fahr -= 20)`.',
        testCases: [
          {
            id: 'tc-c3',
            description: 'Verificar primera línea para 300°F',
            input: '',
            expectedOutput: '300 F =  148.9 C'
          }
        ],
        explanation: 'El ciclo `for` decrece la variable en pasos de 20 hasta alcanzar 0, calculando con precisión de punto flotante la conversión.'
      },
      {
        id: 'ex-cap1-niv4-analisis',
        title: 'Nivel 4 (Análisis): Detector de Límites de Tipos (Limits.h)',
        description: 'Escribe una función C `int verificarRangoInt(long long val)` que devuelva `1` si el valor puede almacenarse dentro de un `int` de 32 bits firmado sin sufrir overflow, o `0` si provocará desbordamiento.',
        cormenRef: 'K&R Cap 2 - Tipos y Tamaños',
        initialCode: `#include <stdio.h>

int verificarRangoInt(long long val) {
    // Un int firmado de 32 bits abarca de -2147483648 a 2147483647
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int verificarRangoInt(long long val) {
    if (val >= -2147483648LL && val <= 2147483647LL) {
        return 1;
    }
    return 0;
}`,
        hint: 'Compara si `val >= -2147483648LL` y `val <= 2147483647LL`.',
        testCases: [
          {
            id: 'tc-c4a',
            description: 'Para val = 500000 (Dentro de rango)',
            input: '500000',
            expectedOutput: '1'
          },
          {
            id: 'tc-c4b',
            description: 'Para val = 3000000000 (Fuera de rango)',
            input: '3000000000',
            expectedOutput: '0'
          }
        ],
        explanation: 'Validar los rangos antes de realizar asignaciones evita bugs de overflow sutiles en aplicaciones críticas de C.'
      },
      {
        id: 'ex-cap1-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Parser de Palabras y Frecuencias ASCII',
        description: 'Implementa una función en C `int contarPalabras(const char *s)` que recorra una cadena de caracteres terminada en `\\0` utilizando una máquina de estados de dos posiciones (DENTRO_DE_PALABRA / FUERA_DE_PALABRA) y devuelva el número exacto de palabras. [Marcado como Avanzado]',
        cormenRef: 'K&R Cap 1 - Sec 1.5.4 (Conteo de Palabras)',
        initialCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    // TODO: Implementa la máquina de estados con bandera de estado (0 u 1)
    return 0;
}

int main() {
    char texto[] = "Estructuras de Datos y Algoritmos en C";
    printf("Palabras: %d\\n", contarPalabras(texto));
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int contarPalabras(const char *s) {
    int estado = 0; // 0 = FUERA, 1 = DENTRO
    int contador = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == ' ' || s[i] == '\\n' || s[i] == '\\t') {
            estado = 0;
        } else if (estado == 0) {
            estado = 1;
            contador++;
        }
    }
    return contador;
}

int main() {
    char texto[] = "Estructuras de Datos y Algoritmos en C";
    printf("Palabras: %d\\n", contarPalabras(texto));
    return 0;
}`,
        hint: 'Usa la variable `estado = 0` para denotar que estás en un espacio en blanco. Cuando encuentras un carácter diferente a espacio y estabas fuera, cambia `estado = 1` e incrementa el contador.',
        testCases: [
          {
            id: 'tc-c5',
            description: 'Verificar el conteo de 7 palabras en la frase de prueba',
            input: '',
            expectedOutput: 'Palabras: 7'
          }
        ],
        explanation: 'La máquina de estados de K&R detecta las transiciones desde espacios blancos hacia caracteres visibles, contando exactamente las secuencias continuas de texto.'
      }
    ],
    quizQuestions: [
      {
        id: 'q-c1-1',
        question: '¿Por qué la función getchar() devuelve un int en lugar de un char en el estándar K&R C?',
        options: [
          'Porque en C no existe el tipo primitivo char.',
          'Para poder devolver la constante especial EOF (-1), el cual no cabe en un char sin signo (0-255).',
          'Porque los procesadores x86 solo pueden procesar números enteros de 32 bits.',
          'Para permitir la lectura de caracteres unicode utf-32 exclusivamente.'
        ],
        correctIndex: 1,
        explanation: 'getchar() debe retornar cualquier byte válido (0 a 255) y además el código de control EOF (-1). Para no solapar -1 con el carácter 255 (0xFF), se requiere un entero de mayor capacidad.'
      },
      {
        id: 'q-c1-2',
        question: '¿Cuál es el resultado de evaluar la expresión (5 / 9) * 100 en lenguaje C?',
        options: ['55', '55.55', '0', 'Error de compilación'],
        correctIndex: 2,
        explanation: 'Dado que 5 y 9 son enteros, la división 5 / 9 evalúa primero a 0 (división entera con truncamiento). Luego 0 * 100 resulta en 0.'
      },
      {
        id: 'q-c1-3',
        question: '¿Qué sucede al declarar un `signed char c = 127;` y ejecutar `c = c + 1;` en una arquitectura estándar de Complemento a Dos?',
        options: [
          'El valor de c se incrementa normalmente a 128.',
          'Ocurre un desbordamiento (Integer Overflow) y c pasa a valer -128.',
          'El programa lanza un kernel panic del sistema operativo.',
          'La variable c se borra automáticamente de la memoria RAM.'
        ],
        correctIndex: 1,
        explanation: 'En complemento a dos de 8 bits, 127 es 01111111. Sumar 1 produce 10000000 en binario, que corresponde al valor negativo -128.'
      },
      {
        id: 'q-c1-4',
        question: '¿Cuál es la función del carácter nulo `\\0` en una cadena de texto en C?',
        options: [
          'Indicar al compilador que la cadena debe convertirse a mayúsculas.',
          'Servir como centinela de terminación en memoria RAM para saber dónde finaliza la cadena.',
          'Imprimir un espacio en blanco en la consola estándar.',
          'Reservar memoria en el disco duro para almacenar la cadena.'
        ],
        correctIndex: 1,
        explanation: 'Las cadenas en C son arreglos simples de caracteres sin encabezados de longitud. El byte `\\0` (ASCII 0) marca el fin exacto de la cadena en RAM.'
      },
      {
        id: 'q-c1-5',
        question: '¿Qué etapa de compilación procesa las directivas como `#include` y `#define`?',
        options: ['El Enlazador (Linker)', 'El Preprocesador', 'El Ensamblador', 'El Optimizador de Código Machine'],
        correctIndex: 1,
        explanation: 'El preprocesador (`cpp`) actúa antes del compilador propiamente dicho, sustituyendo texto literal y expandiendo macros.'
      }
    ]
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

## 1. INTRODUCCIÓN

A lo largo del curso, hemos utilizado las bibliotecas del estándar \`stdio.h\` o \`stdlib.h\`. Pero, ¿qué hay más abajo? ¿Cómo pide C memoria o guarda un archivo realmente?

Este capítulo final se sumerge al nivel más bajo posible. Estudiaremos la **interfaz real** entre los programas en C y el sistema operativo UNIX (y derivados como Linux/macOS). Las rutinas estándar (como \`printf\` o \`fopen\`) en realidad no son más que abstracciones amigables (wrappers) que por debajo están llamando a primitivas crudas del núcleo (Kernel).

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 El Espacio de Usuario y el Concepto de System Call
Una CPU moderna opera en anillos de protección. Los programas creados por ti se ejecutan en *User Space* (bajos privilegios). Si deseas leer el disco duro o enviar un byte a la pantalla, no puedes hacerlo directamente en hardware. Debes ejecutar una instrucción especial (una interrupción trampa o \`syscall\`) solicitando que el Kernel (*Kernel Space*, altos privilegios) lo haga por ti.
Una **System Call** (\`read\`, \`write\`, \`sbrk\`) es una interrupción de hardware organizada que le pide al Kernel realizar un trabajo en su nombre.

### 2.2 Descriptores de Archivo de Bajo Nivel (\`0\`, \`1\`, \`2\`)
En el sistema UNIX, **todo es un archivo**: teclado, pantalla, red, discos impresoras y tuberías. Al arrancar tu binario de C, el Kernel ya abre automáticamente tres descriptores (índices enteros):
* **0 (Standard Input)**: Típicamente vinculado al teclado de tu terminal.
* **1 (Standard Output)**: Típicamente vinculado a la pantalla.
* **2 (Standard Error)**: Diagnóstico y errores, también vinculado a la pantalla incluso si \`stdout\` es redirigido con \`>\`.

Para hacer un I/O de bajo nivel en UNIX, se evitan \`fopen\` y \`fread\`. En su lugar, se utilizan \`open\`, \`read\` y \`write\`.
\`\`\`c
#include <unistd.h> // Cabecera estándar POSIX UNIX

int fd = open("datos.bin", O_RDONLY);
char buffer[1024];
int n_bytes_leidos = read(fd, buffer, sizeof(buffer));
write(1, buffer, n_bytes_leidos); // Escribe directamente al descriptor 1 (stdout)
\`\`\`
Estas funciones no proveen ni almacenamiento en búfer intermedio (buffering), ni conversión a cadenas, ni mapeos. Mueven bytes crudos desde y hacia la RAM del proceso al hardware lo más rápido que la física permite.

### 2.3 Entendiendo a fondo el Asignador de Memoria (\`malloc\`)
Cuando declaras una variable local (\`int x;\`), ésta vive en el **Stack** (pila), que crece ordenadamente y se auto-libera. Pero cuando el tamaño de tus datos no se conoce hasta la ejecución (ej: leer todos los píxeles de una imagen), debes solicitar memoria al **Heap**.

\`malloc\` no es parte del Sistema Operativo. Es una función de C escrita en la librería \`stdlib\`. \`malloc\` gestiona un inmenso bloque de memoria continua que el OS le concedió con la system call \`sbrk()\`.

#### ¿Cómo funciona malloc y free por dentro? (El algoritmo de K&R)
El Heap es gestionado como una lista vinculada circular (Linked List) de bloques de memoria vacíos o en uso.
Cuando invocas \`p = malloc(100)\`:
1. \`malloc\` escanea esta lista en busca de un "agujero" contiguo de memoria de 100 bytes (con políticas como *First Fit* o *Best Fit*).
2. Si lo encuentra, corta el agujero y te entrega el puntero.
3. ¡CRÍTICO! \`malloc\` en realidad recorta 100 bytes **+ tamaño de una cabecera oculta (Header)**. Este Header se coloca justo *antes* del byte al que apunta \`p\`. El Header indica silenciosamente cuántos bytes ocupa este bloque en realidad, para que \`free(p)\` sepa cuánta memoria recuperar.

\`\`\`c
// Anatomía oculta del puntero que recibes:
[ Tamaño Real | Siguiente Nodo ] <- El HEADER secreto de malloc
[  ... Memoria Usable de 100 bytes ...  ] <- Lo que recibe el programador (puntero 'p')
\`\`\`

#### Los peligros del Heap
Si se escribe más allá de los límites de un arreglo dinámico reservado con \`malloc()\`, se sobrescribirá la estructura \`Header\` del bloque contiguo, provocando un colapso catastrófico (*Segmentation Fault*) al invocar \`free()\`. Esta es la famosa vulnerabilidad de **Heap Buffer Overflow**.

### 2.4 Directorios y Metadatos de Inodos (Struct stat)
Finalmente, UNIX trata los directorios simplemente como un archivo ordinario de tipo especial, cuyo contenido es una matriz tabular de nombres de archivos asociados a un **Inodo** (el número de identidad real de los archivos en disco).
Las llamadas al sistema \`stat(nombre, &struct)\` permiten, en un solo golpe de I/O, rellenar una gran estructura con la fecha de modificación, el propietario (UID), los permisos rwx, y el tamaño masivo del disco. Es el corazón subyacente de la instrucción bash \`ls -l\`.`,
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
