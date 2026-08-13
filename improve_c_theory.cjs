const fs = require('fs');

const file = 'src/data/cCourseData.ts';
let content = fs.readFileSync(file, 'utf8');

const newTheories = [
  // Chapter 1: Introduction
  `# Capítulo 1: Introducción General (El Tutorial K&R)

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
| \`signed char\` | $1$ Byte | $8$ bits | $-128$ | $+127$ | \`%c\` / \`%d\` |
| \`unsigned char\` | $1$ Byte | $8$ bits | $0$ | $255$ | \`%u\` |
| \`short int\` | $2$ Bytes | $16$ bits | $-32,768$ | $+32,767$ | \`%hd\` |
| \`int\` | $4$ Bytes | $32$ bits | $-2,147,483,648$ | $+2,147,483,647$ | \`%d\` / \`%i\` |
| \`unsigned int\` | $4$ Bytes | $32$ bits | $0$ | $4,294,967,295$ | \`%u\` |
| \`long long\` | $8$ Bytes| $64$ bits | $-9,223,372,036,854,775,808$ | $+9,223,372,036,854,775,807$ | \`%lld\` |

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

  // Chapter 2: Tipos, Operadores y Expresiones
  `# Capítulo 2: Tipos, Operadores y Expresiones

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
| \`|\` | OR a nivel de bits | Bits 1 si alguno es 1 | \`a \| b\` es \`0x0D\` |
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

  // Chapter 3: Control de Flujo
  `# Capítulo 3: Control de Flujo

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

  // Chapter 4: Funciones y la Estructura del Programa
  `# Capítulo 4: Funciones y la Estructura del Programa

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

  // Chapter 5: Punteros y Arreglos
  `# Capítulo 5: Punteros y Arreglos

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

  // Chapter 6: Estructuras
  `# Capítulo 6: Estructuras (Structs, Uniones y Enum)

---

## 1. INTRODUCCIÓN A LAS ESTRUCTURAS DE DATOS DE USUARIO

Hasta ahora, los programas que hemos escrito procesan componentes de datos individuales. A medida que un programa se vuelve más grande, necesita una manera más robusta de agrupar variables relacionadas bajo un mismo techo organizativo.

Una **estructura** (\`struct\`) es una colección de una o más variables, posiblemente de diferentes tipos de datos, agrupadas bajo un solo nombre para su fácil manipulación. Son la base de las estructuras de datos clásicas (listas enlazadas, árboles, grafos) y de la programación orientada a objetos (C++, que nació originalmente como "C con Clases", usando structs).

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Estructuras y Acceso a Miembros
Para declarar un punto cartesiano $x, y$:
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

  // Chapter 7: Entrada y Salida (stdio.h)
  `# Capítulo 7: Entrada y Salida (\`stdio.h\`)

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

  // Chapter 8: OS Interface
  `# Capítulo 8: La Interfaz del Sistema Operativo UNIX

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
Las llamadas al sistema \`stat(nombre, &struct)\` permiten, en un solo golpe de I/O, rellenar una gran estructura con la fecha de modificación, el propietario (UID), los permisos rwx, y el tamaño masivo del disco. Es el corazón subyacente de la instrucción bash \`ls -l\`.`
];

let currentIndex = 0;
// We will replace all occurrences of theoryContent: `...`
// Since the backticks can contain multiple lines, we'll use a regex
let modified = content;

// Replace all theoryContent blocks
modified = modified.replace(/theoryContent: `[\s\S]*?`,\n\s*codeExamples:/g, (match) => {
  if (currentIndex < newTheories.length) {
    const theory = newTheories[currentIndex];
    currentIndex++;
    return `theoryContent: \`${theory}\`,\n    codeExamples:`;
  }
  return match; // fallback
});

fs.writeFileSync(file, modified);
console.log(`Replaced ${currentIndex} theory sections.`);
