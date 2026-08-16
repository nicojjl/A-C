import { CourseItem } from '../types';
import { EXERCISES_BY_COURSE } from './exercisesData';

const RAW_COURSES_DATA: CourseItem[] = [
  {
    id: 'clase-1',
    number: 1,
    type: 'class',
    title: 'Clase 1 – Introducción al Curso y Análisis Algorítmico',
    topic: '¿Qué es un algoritmo, por qué importa la complejidad y cómo escala el costo computacional?',
    cormenChapter: 'Capítulo 1: El papel de los algoritmos en la informática (CLRS 4ta Ed., págs. 5–15)',
    durationMinutes: 60,
    summary: 'Comprende la definición formal de algoritmo, la noción de problema computacional, las curvas de crecimiento asintótico O(1) a O(2^n) y la razón por la cual la eficiencia algorítmica supera drásticamente al hardware rápido.',
    theoryContent: `
# Clase 1: Introducción al Curso y Análisis Algorítmico

---

## 1. INTRODUCCIÓN Y MOTIVACIÓN

### ¿Por qué la Complejidad Algorítmica es la Piedra Angular de la Informática?
En la era del almacenamiento masivo en la nube, los procesadores multinúcleo a gigahertz y los macrodatos (*Big Data*), existe la falsa creencia de que la potencia bruta del hardware puede compensar el código ineficiente. Nada más alejado de la realidad. Cuando el volumen de datos de entrada $n$ pasa de miles a millones o billones de registros, la **complejidad algorítmica** domina por completo sobre la velocidad de reloj del procesador.

Un algoritmo no es simplemente "un trozo de código que funciona". Un algoritmo es una especificación matemática rigurosa que transforma recursos computacionales finitos (tiempo de CPU y memoria RAM) en soluciones exactas. Un algoritmo ineficiente ejecutado en la supercomputadora más potente del planeta colapsará irremisiblemente ante un algoritmo eficiente ejecutado en una modesta computadora portátil cuando $n$ crece lo suficiente.

### Breve Contexto Histórico
* **1843 – Ada Lovelace**: Escribió el primer algoritmo formal de la historia diseñado para ser procesado por una máquina (la Máquina Analítica de Charles Babbage), destinado a calcular la secuencia de números de Bernoulli.
* **1936 – Alan Turing**: En su célebre artículo sobre los "Números Computables", formalizó la definición de algoritmo mediante el modelo de la *Máquina de Turing*, estableciendo los límites matemáticos de lo que es y no es computable (*Problema de la Parada*).
* **1990 – Cormen, Leiserson, Rivest y Stein (CLRS)**: Publicaron la primera edición de *Introduction to Algorithms*, obra cumbre que estandarizó el análisis asintótico riguroso y la notación Big-O como el lenguaje universal de la ingeniería de software.

### Conexión Conceptual con el Curso
Esta clase es el cimiento de todo el programa de **Algorítmica & Complejidad**. Las técnicas avanzadas que estudiaremos en clases posteriores —desde estructuras de datos lineales y árboles balanceados Red-Black hasta algoritmos de grafos y programación dinámica— responden a una sola búsqueda fundamental: **reducir la curva de complejidad asintótica** para resolver problemas computacionales en escalas masivas.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Definición Formal de Algoritmo y Problema Computacional
Según **Cormen et al. (CLRS, Cap. 1.1)**, informalmente un **algoritmo** es cualquier procedimiento computacional bien definido que toma algún valor o conjunto de valores como **entrada** ($\text{Entrada} = I$) y produce algún valor o conjunto de valores como **salida** ($\text{Salida} = O$), satisfaciendo una relación funcional especificada $O = f(I)$.

Es indispensable distinguir entre dos conceptos frecuentemente confundidos:
1. **Problema Computacional**: La declaración formal y abstracta de la relación deseada entre las entradas permitidas y la salida esperada.
2. **Algoritmo**: La secuencia finita, inequívoca y determinista de pasos computacionales concretos que resuelve dicho problema.

#### Las Tres Propiedades Fundamentales de un Algoritmo Correcto
* **Finitud**: El algoritmo debe detenerse siempre tras un número finito de pasos para cualquier instancia válida de entrada.
* **Definibilidad (No Ambigüedad)**: Cada paso computacional debe estar rigurosamente especificado, sin interpretaciones ambiguas.
* **Correctitud**: Se dice que un algoritmo es *correcto* si, para cada instancia de entrada válida, se detiene y produce exactamente la salida requerida por la especificación del problema.

---

### 2.2 Ejemplo Guiado Paso a Paso: Ordenamiento de Secuencias
Consideremos el problema computacional clásico de **Ordenamiento de una Secuencia de Números**:
* **Entrada**: Una secuencia de $n$ números $\\langle a_1, a_2, \\dots, a_n \rangle$.
* **Salida**: Una reordenación $\\langle a'_1, a'_2, \\dots, a'_n \rangle$ tal que $a'_1 \\le a'_2 \\le \\dots \\le a'_n$.

Supongamos la secuencia concreta de 6 elementos: $I = \\langle 31, 41, 59, 26, 41, 58 \rangle$.

#### Enfoque A: Algoritmo Cuadrático $O(n^2)$ (por ejemplo, Insertion Sort o Bubble Sort)
1. Para colocar $26$ en su lugar correcto, el algoritmo realiza comparaciones e intercambios adyacentes iterativos.
2. Número total de comparaciones e intercambios en el peor caso para $n=6$:
   $$\text{Operaciones} \\approx \\frac{n(n-1)}{2} = \\frac{6 \\times 5}{2} = 15 \text{ pasos.}$$
3. Para $n = 1,000,000$ elementos:
   $$\text{Operaciones} \\approx \\frac{(10^6)^2}{2} = 5 \\times 10^{11} = 500,000,000,000 \text{ pasos.}$$

#### Enfoque B: Algoritmo Logarítmico-Lineal $O(n \\log_2 n)$ (por ejemplo, Merge Sort / Ordenamiento por Mezcla)
1. Divide la secuencia recursivamente en mitades hasta obtener listas de 1 solo elemento.
2. Fusiona las sublistas ordenadamente aprovechando que ya están ordenadas.
3. Número total de operaciones para $n = 1,000,000$:
   $$\text{Operaciones} \\approx n \\log_2 n = 10^6 \\times \\log_2(10^6) \\approx 10^6 \\times 19.93 \\approx 20,000,000 \text{ pasos.}$$

¡El algoritmo $O(n \\log n)$ requiere **25,000 veces menos operaciones** para el mismo conjunto de datos!

---

### 2.3 Comparativa de Crecimiento Asintótico en Tiempos Reales
La siguiente tabla ilustra el número de operaciones requeridas por diferentes familias de complejidad según el tamaño de la entrada $n$ (asumiendo 1 microsegundo $1\\,\\mu\text{s} = 10^{-6}\\,\text{s}$ por operación en CPU):

| $n$ (Entrada) | $O(1)$ | $O(\\log_2 n)$ | $O(n)$ | $O(n \\log_2 n)$ | $O(n^2)$ | $O(2^n)$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$n = 10$** | $1$ ops ($1\\,\\mu\text{s}$) | $3.3$ ops ($3\\,\\mu\text{s}$) | $10$ ops ($10\\,\\mu\text{s}$) | $33$ ops ($33\\,\\mu\text{s}$) | $100$ ops ($100\\,\\mu\text{s}$) | $1,024$ ops ($1\\,\text{ms}$) |
| **$n = 100$** | $1$ ops ($1\\,\\mu\text{s}$) | $6.6$ ops ($7\\,\\mu\text{s}$) | $100$ ops ($100\\,\\mu\text{s}$) | $664$ ops ($664\\,\\mu\text{s}$) | $10,000$ ops ($0.01\\,\text{s}$) | $1.26 \\times 10^{30}$ ops ($4 \\times 10^{16}$ años) |
| **$n = 1,000$** | $1$ ops ($1\\,\\mu\text{s}$) | $9.9$ ops ($10\\,\\mu\text{s}$) | $1,000$ ops ($1\\,\text{ms}$) | $9,965$ ops ($10\\,\text{ms}$) | $1,000,000$ ops ($1\\,\text{s}$) | **Incalculable** (Supera la edad del universo) |
| **$n = 10,000$** | $1$ ops ($1\\,\\mu\text{s}$) | $13.2$ ops ($13\\,\\mu\text{s}$) | $10,000$ ops ($10\\,\text{ms}$) | $132,877$ ops ($0.13\\,\text{s}$) | $100,000,000$ ops ($1.66\\,\text{min}$) | **Imposible** |
| **$n = 1,000,000$**| $1$ ops ($1\\,\\mu\text{s}$) | $19.9$ ops ($20\\,\\mu\text{s}$) | $1,000,000$ ops ($1\\,\text{s}$) | $19,931,568$ ops ($19.9\\,\text{s}$) | $10^{12}$ ops ($11.5\\,\text{días}$) | **Imposible** |

---

### 2.4 Errores Comunes de los Estudiantes
1. **Confundir tiempo medido en reloj de pared (\`clock()\`) con complejidad algorítmica**: El tiempo en segundos depende de la carga del SO, lenguaje, compilador y temperatura del CPU. La complejidad mide la tasa de crecimiento del número de instrucciones primitivas en función de $n$.
2. **Creer que el hardware rápido compensa un mal algoritmo**: Como demostró Cormen (Cap. 1.2), si duplicas la velocidad del procesador ejecutando un algoritmo $O(2^n)$, solo podrás procesar 1 elemento adicional ($n+1$) en el mismo tiempo.
3. **Subestimar las constantes para valores pequeños de $n$**: Si $n \\le 10$, un algoritmo $O(n^2)$ sencillo (como Insertion Sort) suele ser más rápido que Merge Sort $O(n \\log n)$ debido a que Merge Sort requiere overhead de asignación de memoria y llamadas recursivas.
4. **Olvidar los casos límite (Edge Cases)**: Un algoritmo puede ser eficiente para entradas promedio pero colapsar con bucles infinitos o desbordamientos si el arreglo está vacío ($n=0$), ya ordenado o contiene elementos duplicados.

---

### 2.5 Variantes y Casos Especiales
* **Algoritmos Deterministas vs. Probabilistas**: Un algoritmo determinista sigue siempre la misma secuencia de estados para la misma entrada. Un algoritmo probabilista (como QuickSort con pivote aleatorio o Monte Carlo) utiliza números aleatorios para tomar decisiones de ejecución.
* **Algoritmos In-Place (En el Sitio)**: Algoritmos que solo requieren $O(1)$ memoria adicional constante más allá del arreglo de entrada (ejemplo: HeapSort o Insertion Sort), en contraste con algoritmos que requieren $O(n)$ espacio extra (como Merge Sort).

---

## 3. ANÁLISIS DE COMPLEJIDAD DETALLADO

### 3.1 Derivación Paso a Paso de la Comparación de Cormen (CLRS Cap. 1.2)
Imaginemos una competencia entre dos sistemas computacionales ordenando $n = 10,000,000 = 10^7$ elementos:

* **SuperA**: Supercomputadora ejecutando un algoritmo de ordenamiento cuadrático $f(n) = 2n^2$ instrucciones.
  * Capacidad del procesador: $10^{10}$ instrucciones por segundo ($10\\,\text{GHz}$).
  * Tiempo total de ejecución $T_A(n)$:
    $$T_A(10^7) = \\frac{2 \\times (10^7)^2}{10^{10}} = \\frac{2 \\times 10^{14}}{10^{10}} = 20,000\text{ segundos} \\approx 5.55\text{ horas.}$$

* **LentaB**: Computadora personal modesta ejecutando Merge Sort con $g(n) = 50n \\log_2 n$ instrucciones.
  * Capacidad del procesador: $10^7$ instrucciones por segundo ($10\\,\text{MHz}$ — ¡1,000 veces más lenta que SuperA!).
  * Tiempo total de ejecución $T_B(n)$:
    $$T_B(10^7) = \\frac{50 \\times 10^7 \\times \\log_2(10^7)}{10^7} = 50 \\times \\log_2(10^7) \\approx 50 \\times 23.2534 \\approx 1,162.67\text{ segundos} \\approx 19.37\text{ minutos.}$$

**Conclusión Matemática**: La computadora 1,000 veces más lenta aplasta a la supercomputadora por **más de 17 veces de ventaja**, demostrando que el orden de crecimiento de la función de complejidad es la variable crítica dominante.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Planificadores de Consultas en Motores de Bases de Datos (PostgreSQL / MySQL)**:
   Cuando ejecutas \`SELECT * FROM usuarios WHERE email = 'ejemplo@correo.com'\`, el optimizador del motor evalúa la cardinalidad. Si existe un índice B-Tree, ejecuta una búsqueda $O(\\log n)$ en lugar de un *Sequential Scan* $O(n)$ sobre 50 millones de filas, reduciendo la respuesta de 12 segundos a 0.4 milisegundos.
2. **Motores de Navegación GPS y Tráfico en Tiempo Real (Google Maps / Waze)**:
   Modelan la red vial como un grafo con millones de aristas y vértices. Usan variantes optimizadas del algoritmo de Dijkstra y A* ($O((E + V) \\log V)$) para calcular rutas óptimas en milisegundos.
3. **Sistemas de Comercio Financiero de Alta Frecuencia (HFT)**:
   Las bolsas de valores (NASDAQ, NYSE) procesan millones de órdenes por segundo emparejando ofertas de compra y venta mediante colas de prioridad basadas en Binary Heaps ($O(\\log n)$) para evitar latencias en microsegundos.

---

## 5. NOTAS DE IMPLEMENTACIÓN EN C

### Gotchas y Consideraciones Críticas
1. **Desbordamiento de Enteros (*Integer Overflow*)**:
   El tipo primitivo \`int\` en arquitectura de 32 bits firmada tiene un rango limitado a $[-2,147,483,648 \\dots 2,147,483,647]$. Si intentas calcular $n^2$ con $n = 50,000$, $n^2 = 2,500,000,000$, lo cual desborda silenciosamente un \`int\` produciendo un número negativo.
   * *Solución*: Para cálculos de complejidad con valores de $n \\ge 50,000$, utiliza siempre \`long long\` (64 bits, hasta $\\approx 9 \\times 10^{18}$) o \`double\`.
2. **Precisión de \`log2()\`. en \`<math.h>\`**:
   La función \`log2(x)\` de la biblioteca estándar de C trabaja con tipo \`double\`. Al convertir su resultado a \`int\` mediante *casting* implícito, los errores de redondeo en coma flotante pueden alterar las comparaciones strictly.

\`\`\`c
#include <stdio.h>
#include <math.h>

// Forma segura de calcular operaciones sin overflow
long long calcularPasosCuadraticos(long long n) {
    return 2 * n * n; // Usa 64 bits para evitar wrap-around negativo
}
\`\`\`

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Algoritmo**: Secuencia finita e inequívoca de instrucciones computacionales que transforma entradas en salidas exactas.
* **Problema Computacional**: Definición abstracta y formal que establece las restricciones entre entradas válidas y salidas esperadas.
* **Complejidad Asintótica**: Estudio del comportamiento límite de los recursos computacionales (tiempo y espacio) cuando la entrada $n$ tiende a infinito.
* **Invariante de Bucle**: Propiedad lógica que debe mantenerse verdadera antes de la primera iteración, durante cada ciclo y al finalizar el bucle.
* **Correctitud**: Propiedad matemática de un algoritmo que garantiza que este siempre se detiene y entrega la respuesta válida especificada.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 1 completo (*The Role of Algorithms in Computing*), Secciones 1.1 y 1.2 (págs. 5–15).
  * Ejercicios recomendados del libro: Ejercicio 1.2-2 (pivote entre $8n^2$ y $64n \\log_2 n$) y Ejercicio 1.2-3 (mínimo $n$ para el cual un algoritmo $100n^2$ supera a $2^n$).
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Utiliza la **Animación 1.1 (Comparador de Crecimiento)** ajustando el selector de $n$ desde 10 hasta 1,000,000 para observar cómo la barra roja $O(n^2)$ eclipsa por completo a la barra naranja $O(n \\log n)$.
  * Utiliza la **Animación 1.2 (Máquina de Transformación)** para seguir el flujo de datos desde la entrada de RAM pasando por el microprocesador hasta la salida ordenada.
* **Resumen en Una Frase**:
  > *"Un algoritmo eficiente ejecutado en la computadora más modesta siempre vencerá a un algoritmo ineficiente en la supercomputadora más potente del mundo a medida que el volumen de datos aumenta."*
`,
    visualizerType: 'big_o_chart',
    checkQuestions: [
      {
        id: 'q1-1',
        question: 'Según la definición formal del libro CLRS (Cormen et al., Cap. 1.1), ¿qué es un algoritmo?',
        options: [
          'Un programa ejecutable escrito exclusivamente en lenguaje C o ensamblador.',
          'Un procedimiento computacional bien definido que toma una entrada y produce una salida deseada.',
          'Una arquitectura de supercomputadora capaz de ejecutar operaciones en paralelo.',
          'Una biblioteca estándar de funciones matemáticas sin aplicación práctica en software real.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! En CLRS Cap 1.1, un algoritmo se define formalmente como cualquier procedimiento computacional bien definido que transforma un conjunto de entradas en un conjunto de salidas.',
        analogousExplanation: 'Piensa en una procesadora de alimentos: le ingresas ingredientes crudos (Entrada), ejecuta las aspas a velocidad controlada (Pasos del Algoritmo) y produce una mezcla homogénea (Salida).'
      },
      {
        id: 'q1-2',
        question: 'Si tenemos una entrada masiva de n = 1,000,000 elementos, ¿por qué un algoritmo O(n log n) supera drásticamente a uno O(n²) ejecutado en una supercomputadora 1,000 veces más rápida?',
        options: [
          'Porque la tasa de crecimiento de las operaciones de n log n aumenta a un ritmo inmensamente menor que n², dominando sobre la velocidad del CPU.',
          'Porque el algoritmo O(n log n) consume más memoria RAM y fuerza al procesador a acelerar.',
          'Porque la notación Big-O es solo una aproximación teórica que no se refleja en tiempo real.',
          'Porque las supercomputadoras no pueden ejecutar bucles cuadráticos.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! Como demostró Cormen (Cap. 1.2), el orden de crecimiento de la función algorítmica domina el rendimiento cuando n crece, haciendo irrelevante la velocidad pura del hardware.',
        analogousExplanation: 'Imagina viajar a pie por una autopista directa de 10 km (n log n) versus viajar en un automóvil deportivo a 300 km/h en un laberinto de 500,000 km (n²). Ganará la ruta corta.'
      },
      {
        id: 'q1-3',
        question: '¿Cuál de los siguientes problemas se beneficia directamente de pasar de una búsqueda lineal O(n) a una búsqueda O(log n)?',
        options: [
          'Escribir datos secuenciales en un archivo de texto en disco.',
          'Buscar un usuario en una base de datos distribuida con 50 millones de filas indexed.',
          'Sumar todos los elementos de una matriz bidimensional.',
          'Imprimir todos los elementos de una lista enlazada por pantalla.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! Buscar en 50 millones de filas con O(log₂ n) requiere solo 26 comparaciones en un índice B-Tree, frente a 50,000,000 en búsqueda lineal.',
        analogousExplanation: 'Es la diferencia entre buscar una palabra en un diccionario hojeando página por página (O(n)) versus abrirlo exactamente por la mitad recursivamente (O(log n)).'
      },
      {
        id: 'q1-4',
        question: '¿Qué ocurre al intentar calcular n² en lenguaje C usando el tipo primitivo `int` cuando n = 50,000?',
        options: [
          'El programa lanza una excepción de tiempo de ejecución de tipo ArithmeticException.',
          'El compilador aborta la compilación de inmediato.',
          'Ocurre un desbordamiento de enteros (Integer Overflow) silencioso produciendo un número negativo debido al límite de 32 bits.',
          'El valor se convierte automáticamente a punto flotante de doble precisión.'
        ],
        correctIndex: 2,
        explanation: '¡Exacto! En C, un `int` firmado de 32 bits se limita a 2.14x10⁹. Para 50,000², el resultado es 2.5x10⁹, lo que provoca wrap-around negativo en complemento a dos.',
        analogousExplanation: 'Es como el odómetro analógico de un automóvil antiguo que llega a 999,999 km y al dar un paso más marca 000,000 km.'
      },
      {
        id: 'q1-5',
        question: '¿Qué es una "Invariante de Bucle" (Loop Invariant) en el análisis formal de algoritmos?',
        options: [
          'Una variable global que no puede ser modificada por ninguna función.',
          'Una propiedad lógica que se mantiene verdadera antes de iniciar el bucle, durante cada iteración y al finalizar la ejecución.',
          'Un error sintáctico que impide que el bucle `for` termine.',
          'La velocidad de reloj constante a la que el CPU ejecuta un ciclo `while`.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! Las invariantes de bucle son la herramienta matemática principal usada en CLRS para demostrar la correctitud formal de los algoritmos.',
        analogousExplanation: 'En un partido de fútbol, la suma de los goles del equipo A más el equipo B siempre es igual al marcador total del partido durante cualquier minuto del juego.'
      }
    ],
    exercises: [
      {
        id: 'ex-1-niv1',
        title: 'Nivel 1 (Conceptual): Predicción de Crecimiento Asintótico',
        description: 'Dados dos algoritmos A y B con complejidades f(n) = 100n y g(n) = n², determina para qué valor mínimo de n el algoritmo A comienza a ser estrictamente más eficiente que el algoritmo B.',
        cormenRef: 'CLRS 4ta Ed., Ejercicio 1.2-2',
        initialCode: '#include <stdio.h>\n\n// Responde en C retornando el valor int mínimo de n\nint calcularPuntoDeCruce() {\n    // f(n) = 100 * n\n    // g(n) = n * n\n    // Queremos encontrar el n donde 100n < n^2\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nint calcularPuntoDeCruce() {\n    int n = 1;\n    while (100 * n >= n * n) {\n        n++;\n    }\n    return n; // Retorna 101\n}',
        hint: 'Despeja la desigualdad 100n < n² dividiendo ambos lados entre n (para n > 0). Obtendrás 100 < n, por lo que el primer entero es 101.',
        testCases: [
          {
            id: 'tc-1',
            description: 'Verificar el punto de cruce exacto entre 100n y n²',
            input: '',
            expectedOutput: '101'
          }
        ],
        explanation: 'Para n ≤ 100, la constante 100 hace que g(n) = n² parezca más rápido o igual. Pero para n = 101 en adelante, g(n) crece como n² y f(n) = 100n demuestra su superioridad lineal.'
      },
      {
        id: 'ex-1-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Corrección de Bug de Overflow en C',
        description: 'Un estudiante escribió la función `long long calcularOperacionesCuadraticas(int n)` para calcular n², pero la función devuelve valores negativos para n = 50,000. Corrige el bug de casting explícito en la expresión C.',
        cormenRef: 'Gotchas de C - Complemento a Dos y Casting',
        initialCode: '#include <stdio.h>\n\nlong long calcularOperacionesCuadraticas(int n) {\n    // BUG: La multiplicación (n * n) se realiza primero como int de 32 bits!\n    long long resultado = n * n;\n    return resultado;\n}',
        solutionCode: '#include <stdio.h>\n\nlong long calcularOperacionesCuadraticas(int n) {\n    // SOLUCIÓN: Castear a (long long) antes de multiplicar\n    long long resultado = (long long)n * n;\n    return resultado;\n}',
        hint: 'Si multiplicas dos variables `int`, C realiza el producto en aritmética `int` de 32 bits antes de asignar el resultado a `long long`. Realiza un cast explícito `(long long)n`.',
        testCases: [
          {
            id: 'tc-2',
            description: 'Para n = 50000 (Resultado esperado: 2500000000)',
            input: '50000',
            expectedOutput: '2500000000'
          }
        ],
        explanation: 'Al hacer `(long long)n * n`, C promueve ambos operandos a 64 bits, permitiendo almacenar valores de hasta 9x10¹⁸ sin sufrir desbordamiento.'
      },
      {
        id: 'ex-1-niv3-impl1',
        title: 'Nivel 3 (Implementación C): Comparador de Eficiencia Cormen',
        description: 'Escribe una función en C `const char* compararEficacia(int n)` que compare el número exacto de operaciones entre f(n) = 2n² y g(n) = 50n log₂(n). Debe retornar "f_es_mejor" si f(n) < g(n) o "g_es_mejor" en caso contrario.',
        cormenRef: 'CLRS 4ta Ed., Sección 1.2',
        initialCode: '#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n    // TODO: Calcula f y g usando pow() y log2() de <math.h>\n    return "";\n}',
        solutionCode: '#include <stdio.h>\n#include <math.h>\n\nconst char* compararEficacia(int n) {\n    double f = 2.0 * n * n;\n    double g = 50.0 * n * log2(n);\n    if (f < g) {\n        return "f_es_mejor";\n    } else {\n        return "g_es_mejor";\n    }\n}',
        hint: 'Usa `log2(n)` de `<math.h>` y compara los valores en tipo `double` para mantener precisión decimal.',
        testCases: [
          {
            id: 'tc-3a',
            description: 'Para n = 10 (f=200, g=166.09 -> g es mejor)',
            input: '10',
            expectedOutput: 'f_es_mejor'
          },
          {
            id: 'tc-3b',
            description: 'Para n = 1000 (f=2000000, g=498289 -> g es mejor)',
            input: '1000',
            expectedOutput: 'g_es_mejor'
          }
        ],
        explanation: 'Para valores pequeños de n (como n = 10 o 100), la constante 50 hace que g(n) requiera más operaciones. Pero para n = 1000, g(n) es 4 veces más eficiente que f(n).'
      },
      {
        id: 'ex-1-niv4-analisis',
        title: 'Nivel 4 (Análisis): Cálculo del Término Dominante',
        description: 'Dado el polinomio de complejidad f(n) = 5n³ + 200n² + 1000n + 5000, escribe una función C `long long obtenerTerminoDominante(int n)` que devuelva únicamente la contribución del término de mayor orden (5n³).',
        cormenRef: 'CLRS 4ta Ed., Cap 3 - Notación Asintótica',
        initialCode: '#include <stdio.h>\n\nlong long obtenerTerminoDominante(int n) {\n    // Devuelve solo 5 * n^3\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n\nlong long obtenerTerminoDominante(int n) {\n    long long n64 = (long long)n;\n    return 5 * n64 * n64 * n64;\n}',
        hint: 'Eleva n al cubo usando tipos de 64 bits (`long long`) para evitar overflow en el término n³.',
        testCases: [
          {
            id: 'tc-4',
            description: 'Para n = 100 (Resultado esperado: 5 * 100³ = 5000000)',
            input: '100',
            expectedOutput: '5000000'
          }
        ],
        explanation: 'En el análisis asintótico Big-O, a medida que n tiende a infinito, el término de mayor grado (5n³) eclipsa a todos los términos de grado menor (200n² + 1000n + 5000).'
      },
      {
        id: 'ex-1-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Simulador de Umbral de Ineficiencia',
        description: 'Escribe un programa en C que determine el mayor valor entero de n para el cual un algoritmo exponencial T(n) = 2ⁿ ejecuta menos operaciones totales que un algoritmo cuadrático T2(n) = 1000n². [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Problemas del Capítulo 1',
        initialCode: '#include <stdio.h>\n#include <math.h>\n\nint determinarUmbralExponencial() {\n    // Encuentra el mayor n entero tal que 2^n < 1000 * n^2\n    return 0;\n}',
        solutionCode: '#include <stdio.h>\n#include <math.h>\n\nint determinarUmbralExponencial() {\n    int n = 1;\n    int ultimoNValido = 1;\n    while (1) {\n        double expVal = pow(2.0, n);\n        double quadVal = 1000.0 * n * n;\n        if (expVal < quadVal) {\n            ultimoNValido = n;\n        } else if (n > 20) {\n            break; // Una vez superado el umbral para n grande, 2^n domina para siempre\n        }\n        n++;\n    }\n    return ultimoNValido; // Retorna 19\n}',
        hint: 'Usa `pow(2.0, n)` y compara contra `1000.0 * n * n`. Inicia con n=1 e incrementa hasta que 2ⁿ supere definitivamente a 1000n².',
        testCases: [
          {
            id: 'tc-5',
            description: 'Determinar el último n entero donde 2^n < 1000n²',
            input: '',
            expectedOutput: '19'
          }
        ],
        explanation: 'A pesar de la enorme constante 1000, la función exponencial 2ⁿ explota tan rápido que para n = 20, 2²⁰ = 1,048,576 supera a 1000 × 20² = 400,000. ¡El último n válido es 19!'
      }
    ],
    nextItemId: 'clase-2'
  },

  {
    id: 'clase-2',
    number: 2,
    type: 'class',
    title: 'Clase 2 – Repaso de Programación Básica y Pseudocódigo CLRS',
    topic: 'Variables, tipos de datos, estructuras de control, funciones y la sintaxis formal de pseudocódigo en Cormen',
    cormenChapter: 'Capítulo 2: Primeros Pasos (Getting Started - Sec. 2.1)',
    durationMinutes: 50,
    summary: 'Análisis estructural del pseudocódigo formal de Cormen: bloques por identación, convenciones de arreglos base-1, paso por referencia y demostración de corrección mediante Invariantes de Bucle.',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico y Necesidad Universitaria
Cuando Thomas Cormen, Charles Leiserson, Ronald Rivest y Clifford Stein escribieron *Introduction to Algorithms* (CLRS) en MIT, se enfrentaron a un dilema fundamental: **¿en qué lenguaje de programación deben expresarse los algoritmos para que conserven su validez académica a lo largo de las décadas?**

Si hubieran elegido Pascal en 1990, C++ en 2001, o Java en 2009, el libro habría quedado obsoleto con los cambios de sintaxis de cada lenguaje. Por ello, diseñaron un **Pseudocódigo Matemático Formal** que omite los detalles de bajo nivel específicos del compilador (como la recolección de basura o las directivas de inclusión) pero retiene con precisión absoluta la lógica de ejecución, la estructura de bloques y el manejo de objetos en memoria.

### Analogía Intuitiva
El pseudocódigo de Cormen es como el **plano arquitectónico de un edificio**: no especifica qué marca de martillo o clavos usará el carpintero (C, C++, Java o Python), sino la distribución exacta de vigas de carga, dimensiones de columnas y flujos de tránsito que garantizan que la estructura no colapse.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Las Convenciones Formales del Pseudocódigo CLRS
El pseudocódigo en CLRS sigue cinco reglas estructurales estrictas:

1. **Estructura por Identación (Sangría)**: Los bloques de código dentro de un \`for\`, \`while\` o \`if-else\` se definen exclusivamente por la sangría, eliminando las llaves \`{}\` o las palabras reservadas \`begin/end\`.
2. **Estructuras de Control Iterativas y Condicionales**:
   * \`for i = 1 to n do\` (recorre de $1$ a $n$ inclusive de forma ascendente).
   * \`for i = n downto 1 do\` (recorre de forma descendente).
   * \`while\` *condición* \`do\` (evalúa la condición antes de cada iteración).
3. **Indexación de Arreglos Base 1 ($A[1 \\\dots n]$)**:
   * **REGLA FUNDAMENTAL DE CORMEN**: Los arreglos en el libro de texto están indexados habitualmente comenzando en $1$. El primer elemento es $A[1]$ y el último es $A[n]$, donde $n = A.length$.
   * *Nota de traducción a C*: Al codificar en lenguaje C, **debemos mapear obligatoriamente** la lógica de base 1 a base 0 ($A[0 \\\dots n-1]$).
4. **Paso de Parámetros por Referencia**:
   * Los tipos primarios (enteros, flotantes, booleanos) se pasan por valor.
   * Las estructuras compuestas (arreglos, objetos y grafos) se pasan por **referencia** (puntero a la dirección base en memoria RAM). Los cambios dentro del algoritmo afectan directamente los datos originales.
5. **Acceso a Atributos de Objetos**:
   * Se denotan mediante el punto: \`x.key\` o \`node.next\`. Un objeto asignado a una variable es una referencia (puntero). Si \`y = x\`, ambas variables apuntan al mismo objeto en memoria RAM.

#### Diagrama de Mapeo de Índices: Cormen (Base-1) vs C (Base-0)
\`\`\`
Pseudocódigo Cormen:  [ A[1] ]  [ A[2] ]  [ A[3] ]  ...  [ A[n] ]
                      ↓          ↓          ↓               ↓
Código en C Nativo:  [ A[0] ]  [ A[1] ]  [ A[2] ]  ...  [ A[n-1] ]
\`\`\`

---

### 2.2 La Invariante de Bucle (Loop Invariant)
Para demostrar formalmente que un algoritmo iterativo produce la respuesta correcta sin recurrir a pruebas empíricas de fuerza bruta, Cormen introduce el método de la **Invariante de Bucle**. Una invariante es una afirmación lógica sobre el estado de las variables que debe cumplir 3 propiedades esenciales:

1. **Inicialización**: La propiedad es verdadera inmediatamente antes de entrar a la primera iteración del bucle.
2. **Mantenimiento**: Si la propiedad es verdadera antes de una iteración, se mantiene verdadera antes de iniciar la siguiente iteración.
3. **Terminación**: Cuando el bucle finaliza, la propiedad retenida proporciona una prueba lógica irrefutable de que el algoritmo ha alcanzado la solución correcta.

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Conteo Riguroso de Operaciones en Bucles Simples y Anidados

Consideremos el algoritmo de búsqueda lineal para encontrar el elemento $x$ en un arreglo $A$ de $n$ elementos:

\`\`\`text
LINEAL-SEARCH(A, x)
1  i = 1
2  while i <= A.length and A[i] != x do
3      i = i + 1
4  if i <= A.length then
5      return i
6  else return NIL
\`\`\`

#### Derivación de Complejidad Temporal:
* **Mejor Caso ($T_{best}(n)$)**: Ocurre cuando $x$ se encuentra en la primera posición ($A[1] == x$). La condición del \`while\` se ejecuta 1 vez y se retorna inmediatamente.
  $$\\text{Tiempo} = O(1)$$
* **Peor Caso ($T_{worst}(n)$)**: Ocurre cuando $x$ no está presente en el arreglo o se encuentra en la última posición ($A[n]$). La condición del \`while\` se evalúa $n+1$ veces y el cuerpo se ejecuta $n$ veces.
  $$\\text{Tiempo} = c_1 + (n+1)c_2 + n c_3 + c_4 = O(n)$$

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Analizadores Sintácticos (Parsers) e Intérpretes**: Los compiladores de C y Java leen el código fuente como una secuencia de caracteres y aplican estructuras de control iterativas para verificar la validez sintáctica.
2. **Motores de Búsqueda de Texto**: La búsqueda secuencial lineal $O(n)$ se utiliza como fallback en buffers de edición en tiempo real (por ejemplo, búsquedas en editores Vim o VSCode sobre documentos pequeños).
3. **Validación de Integridad de Datos**: Los algoritmos de suma de comprobación (Checksums) recorren linealmente arreglos de bytes calculando acumulación de hash.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. El Error "Off-By-One" (Desfase por un Elemento)
El desatino más común de los estudiantes al traducir pseudocódigo de Cormen a C es olvidar convertir los límites de los bucles:
* **Incorrecto (Crash por Segmentation Fault en C)**:
  \`\`\`c
  // Causa lectura fuera de límites en A[n]!
  for (int i = 1; i <= n; i++) {
      suma += A[i];
  }
  \`\`\`
* **Correcto (Base-0 en C)**:
  \`\`\`c
  for (int i = 0; i < n; i++) {
      suma += A[i];
  }
  \`\`\`

### 2. Modificación de Variables de Control
En el pseudocódigo de Cormen, la variable de un bucle \`for\` incrementa automáticamente. Modificar manualmente la variable del bucle dentro del cuerpo se considera una pésima práctica académica que corrompe la invariante de bucle.

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Pseudocódigo**: Lenguaje informal de alto nivel diseñado para expresar algoritmos omitiendo detalles específicos de compiladores.
* **Invariante de Bucle**: Propiedad lógica que se demuestra antes, durante y al terminar un bucle para certificar su correctitud matemática.
* **Indexación Base-1**: Convención matemática en CLRS donde los arreglos inician en el índice 1 ($A[1]$).
* **Indexación Base-0**: Convención física de memoria usada en C donde los arreglos inician en el desplazamiento 0 ($A[0]$).
* **Off-By-One Error**: Fallo de programación que ocurre al iterar un elemento de más o de menos en un bucle.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 2 completo (*Getting Started*), Sección 2.1 (págs. 18–24).
  * Ejercicios del libro: Ejercicio 2.1-1 (trazar Ordenamiento por Inserción) y Ejercicio 2.1-3 (Pseudocódigo de Búsqueda Lineal y prueba de Invariante).
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Utiliza el visualizador de **Mapa de Memoria y Punteros** para inspeccionar la asignación contigua de memoria en arreglos y el comportamiento de variables locales en el stack.
* **Resumen en Una Frase**:
  > *"El pseudocódigo formal es el idioma universal de las ciencias de la computación; comprender la traducción entre los índices base-1 del libro y el hardware base-0 de C es el primer paso para dominar los algoritmos."*
`,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q2-1',
        question: 'En el pseudocódigo estándar del libro de Cormen (CLRS), ¿en qué número de índice comienzan usualmente los arreglos?',
        options: ['En índice 0', 'En índice 1', 'En índice -1', 'No tienen índices'],
        correctIndex: 1,
        explanation: '¡Correcto! Cormen adopta la convención matemática donde los arreglos van de A[1] a A[n]. Al programar en C debemos traducirlo a base 0.',
        analogousExplanation: 'En matemática tradicional contamos del 1 al 10. En informática física (C/JS) contamos desde el desplazamiento cero (offset 0).'
      },
      {
        id: 'q2-2',
        question: '¿Qué tres propiedades deben verificarse para demostrar la corrección de un algoritmo mediante una Invariante de Bucle?',
        options: [
          'Compilación, Ejecución y Finalización.',
          'Inicialización, Mantenimiento y Terminación.',
          'Entrada, Proceso y Salida.',
          'Asignación, Declaración y Desreferenciación.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Según CLRS Cap. 2.1, la prueba por Invariante requiere demostrar Inicialización (antes del bucle), Mantenimiento (entre iteraciones) y Terminación (al salir).',
        analogousExplanation: 'Es análogo al principio de inducción matemática: caso base (inicialización), paso inductivo (mantenimiento) y conclusión (terminación).'
      },
      {
        id: 'q2-3',
        question: 'En el pseudocódigo de Cormen, ¿cómo se representa formalmente la operación de asignación de un valor a una variable (especialmente en sus versiones clásicas)?',
        options: [
          'x = y',
          'x <- y',
          'x := y',
          'x == y'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! En el pseudocódigo clásico de Cormen se utiliza la flecha (<-) para representar la asignación, evitando así la confusión con el operador de igualdad matemática (=).',
        analogousExplanation: 'Imagina que tomas el valor de la derecha y lo "empujas" hacia adentro de la caja de la izquierda. (Nota: en ediciones recientes de CLRS se adoptó el = por influencia de C/Java).'
      },
      {
        id: 'q2-4',
        question: 'Al traducir el bloque "for i = 1 to n" del pseudocódigo de Cormen a C, ¿cómo se debe escribir la declaración del bucle asumiendo índices base-0?',
        options: [
          'for (int i = 1; i <= n; i++)',
          'for (int i = 0; i < n; i++)',
          'for (int i = 0; i <= n; i++)',
          'for (int i = 1; i < n; i++)'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! En C usamos base-0, así que empezamos en 0 y terminamos un elemento antes del tamaño total (i < n). El bucle "for i = 1 to n" ejecuta n veces.',
        analogousExplanation: 'Si vas a subir 10 pisos, puedes contar "del piso 1 al piso 10" (Cormen) o "del piso 0 al piso 9" (C). En ambos casos subiste 10 pisos exactamente.'
      },
      {
        id: 'q2-5',
        question: 'En el pseudocódigo de Cormen, si un bucle debe iterar en orden descendente, ¿qué palabra clave se utiliza?',
        options: [
          'descending',
          'step -1',
          'downto',
          'reversed'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! CLRS utiliza la palabra clave "downto" para indicar que el índice decrece en cada iteración (ej. for i = n downto 1).',
        analogousExplanation: 'Es como una cuenta regresiva de despegue: 10, 9, 8... "down to" (bajando hasta) 1.'
      }
    ],
    exercises: [
      {
        id: 'ex-2-niv1',
        title: 'Nivel 1 (Conceptual): Mapeo de Índices de Cormen a C Base-0',
        description: 'En el pseudocódigo de Cormen, el último elemento de un arreglo de tamaño n está en A[n]. Escribe una función en C `int obtenerUltimoElemento(int A[], int n)` que devuelva correctamente el último elemento en C.',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Convenciones de Pseudocódigo',
        initialCode: '#include <stdio.h>\n\nint obtenerUltimoElemento(int A[], int n) {\n    // BUG: A[n] en C accede fuera del límite!\n    return A[n];\n}',
        solutionCode: '#include <stdio.h>\n\nint obtenerUltimoElemento(int A[], int n) {\n    // SOLUCIÓN: En C base-0, el último elemento está en A[n - 1]\n    if (n <= 0) return -1;\n    return A[n - 1];\n}',
        hint: 'En C, un arreglo de tamaño n tiene posiciones válidas de 0 a n-1. Ajusta el índice a `A[n - 1]`.',
        testCases: [
          {
            id: 'tc-2-1',
            description: 'Obtener último elemento de [10, 20, 30, 40, 50], n=5',
            input: '[10, 20, 30, 40, 50], 5',
            expectedOutput: '50'
          }
        ],
        explanation: 'En C, acceder a `A[n]` es un error de "Off-By-One" que lee memoria no asignada. La última posición válida es siempre `A[n - 1]`.'
      },
      {
        id: 'ex-2-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Corrección de Bug "Off-By-One" en Búsqueda Lineal',
        description: 'El siguiente código intenta implementar la Búsqueda Lineal de Cormen en C, pero tiene un error de límite en el bucle for que causa un Segmentation Fault. Corrígelo.',
        cormenRef: 'CLRS 4ta Ed., Ejercicio 2.1-3',
        initialCode: '#include <stdio.h>\n\nint busquedaLineal(int A[], int n, int x) {\n    // BUG: i <= n en C genera acceso fuera de memoria\n    for (int i = 0; i <= n; i++) {\n        if (A[i] == x) {\n            return i; // Retorna índice base-0\n        }\n    }\n    return -1;\n}',
        solutionCode: '#include <stdio.h>\n\nint busquedaLineal(int A[], int n, int x) {\n    // SOLUCIÓN: Cambiar la condición a i < n\n    for (int i = 0; i < n; i++) {\n        if (A[i] == x) {\n            return i;\n        }\n    }\n    return -1;\n}',
        hint: 'Cambia la condición del ciclo `i <= n` por `i < n`.',
        testCases: [
          {
            id: 'tc-2-2a',
            description: 'Buscar x=30 en [10, 20, 30, 40], n=4 (Índice esperado: 2)',
            input: '[10, 20, 30, 40], 4, 30',
            expectedOutput: '2'
          },
          {
            id: 'tc-2-2b',
            description: 'Buscar x=99 en [10, 20, 30, 40], n=4 (No encontrado: -1)',
            input: '[10, 20, 30, 40], 4, 99',
            expectedOutput: '-1'
          }
        ],
        explanation: 'Cambiar `i <= n` a `i < n` asegura que el bucle se detenga en $i = n-1$, inspeccionando exactamente todos los elementos sin provocar desbordamiento de memoria.'
      },
      {
        id: 'ex-2-niv3-impl',
        title: 'Nivel 3 (Implementación C): Suma Acumulativa de Elementos Pares',
        description: 'Escribe una función C `int sumarElementosPares(int A[], int n)` que recorra un arreglo de enteros y devuelva únicamente la suma acumulada de los elementos cuyo valor sea un número par (`val % 2 == 0`).',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Estructuras Iterativas',
        initialCode: '#include <stdio.h>\n\nint sumarElementosPares(int A[], int n) {\n    int suma = 0;\n    // TODO: Implementa el recorrido acumulando los números pares\n    return suma;\n}',
        solutionCode: '#include <stdio.h>\n\nint sumarElementosPares(int A[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        if (A[i] % 2 == 0) {\n            suma += A[i];\n        }\n    }\n    return suma;\n}',
        hint: 'Usa el operador módulo `A[i] % 2 == 0` dentro del bucle `for` para identificar valores pares.',
        testCases: [
          {
            id: 'tc-2-3',
            description: 'Sumar pares de [1, 2, 3, 4, 5, 6], n=6 (2+4+6 = 12)',
            input: '[1, 2, 3, 4, 5, 6], 6',
            expectedOutput: '12'
          }
        ],
        explanation: 'El bucle evalúa la condición de paridad mediante el operador residuo `% 2`. Mantiene la invariante acumulando solo los valores válidos en $O(n)$ tiempo.'
      },
      {
        id: 'ex-2-niv4-analisis',
        title: 'Nivel 4 (Análisis): Verificador de Arreglo Estrictamente Monótono Creciente',
        description: 'Escribe una función C `int esMonotonoCreciente(int A[], int n)` que devuelva `1` si para todo i se cumple A[i] < A[i+1], o `0` si existe alguna violación.',
        cormenRef: 'CLRS 4ta Ed., Sec 2.1 - Demostración de Invariantes',
        initialCode: '#include <stdio.h>\n\nint esMonotonoCreciente(int A[], int n) {\n    // TODO: Verifica la propiedad de monotonía\n    return 1;\n}',
        solutionCode: '#include <stdio.h>\n\nint esMonotonoCreciente(int A[], int n) {\n    if (n <= 1) return 1;\n    for (int i = 0; i < n - 1; i++) {\n        if (A[i] >= A[i + 1]) {\n            return 0;\n        }\n    }\n    return 1;\n}',
        hint: 'Itera hasta `n - 1` e inspecciona la pareja `A[i]` y `A[i + 1]`. Si `A[i] >= A[i + 1]`, retorna 0 inmediatamente.',
        testCases: [
          {
            id: 'tc-2-4a',
            description: 'Para [10, 20, 30, 40], n=4 (Es creciente -> 1)',
            input: '[10, 20, 30, 40], 4',
            expectedOutput: '1'
          },
          {
            id: 'tc-2-4b',
            description: 'Para [10, 25, 20, 40], n=4 (Violación -> 0)',
            input: '[10, 25, 20, 40], 4',
            expectedOutput: '0'
          }
        ],
        explanation: 'La función utiliza cortocircuito para retornar `0` apenas se detecta la primera violación. La invariante de bucle garantiza que todo el subarreglo previo $A[0 \\\dots i]$ ha sido verificado.'
      },
      {
        id: 'ex-2-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Algoritmo de Rotación de Arreglo in-place',
        description: 'Escribe una función C `void rotarIzquierda(int A[], int n, int k)` que rote un arreglo k posiciones a la izquierda con complejidad espacial auxiliar O(1). [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Problemas del Capítulo 2',
        initialCode: '#include <stdio.h>\n\nvoid invertirSubarreglo(int A[], int inicio, int fin) {\n    while (inicio < fin) {\n        int temp = A[inicio];\n        A[inicio] = A[fin];\n        A[fin] = temp;\n        inicio++;\n        fin--;\n    }\n}\n\nvoid rotarIzquierda(int A[], int n, int k) {\n    // TODO: Utiliza el triple algoritmo de inversión de Jon Bentley\n}',
        solutionCode: '#include <stdio.h>\n\nvoid invertirSubarreglo(int A[], int inicio, int fin) {\n    while (inicio < fin) {\n        int temp = A[inicio];\n        A[inicio] = A[fin];\n        A[fin] = temp;\n        inicio++;\n        fin--;\n    }\n}\n\nvoid rotarIzquierda(int A[], int n, int k) {\n    if (n <= 1) return;\n    k = k % n;\n    if (k == 0) return;\n    invertirSubarreglo(A, 0, k - 1);\n    invertirSubarreglo(A, k, n - 1);\n    invertirSubarreglo(A, 0, n - 1);\n}',
        hint: 'Aplica el algoritmo de inversión triple: 1) invierte A[0...k-1], 2) invierte A[k...n-1], 3) invierte todo A[0...n-1]. Complejidad O(n) tiempo y O(1) memoria.',
        testCases: [
          {
            id: 'tc-2-5',
            description: 'Rotar [1, 2, 3, 4, 5] k=2 posiciones -> [3, 4, 5, 1, 2]',
            input: '[1, 2, 3, 4, 5], 5, 2',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El célebre algoritmo de rotación mediante tres inversiones invierte bloques contiguos de memoria en $O(n)$ tiempo total sin utilizar memoria auxiliar adicional ($O(1)$ espacio).'
      }
    ],
    prevItemId: 'clase-1',
    nextItemId: 'clase-3'
  },

  {
    id: 'clase-3',
    number: 3,
    type: 'class',
    title: 'Clase 3 – Punteros, Direcciones de Memoria y Structs en C para Cormen',
    topic: 'Direccionamiento de memoria RAM (&), desreferenciación (*), la arimética de punteros y estructuras compuestas (structs)',
    cormenChapter: 'Capítulo 10: Estructuras de Datos Elementales (Sec. 10.3 - Punteros y Objetos)',
    durationMinutes: 55,
    summary: 'Aprender a leer y manipular la memoria física de la computadora: operadores &, *, paso de parámetros por referencia, aritmética de punteros, estructuras compuestas (struct) y el operador flecha (->).',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### Contexto Histórico y Necesidad Universitaria
En los capítulos 10 a 21 del libro de Cormen (CLRS), los algoritmos manipulan **Estructuras de Datos Dinámicas**: Listas Enlazadas, Árboles Binarios de Búsqueda, Montículos (Heaps), Grafos y Tablas Hash. En el pseudocódigo del libro, expresiones como \`x.next = y\` o \`parent[x] = NIL\` asumen que el sistema operativo puede seguir referencias en memoria instantáneamente.

Para implementar estos algoritmos en la realidad, el lenguaje C es la herramienta insustituible por excelencia. A diferencia de lenguajes con memoria administrada (Python, Java o JavaScript) donde la memoria RAM está oculta tras capas de abstracción, en C **el programador tiene control directo sobre cada byte físico de la memoria RAM del sistema**.

### Analogía Intuitiva
La memoria RAM es un **hotel de lujo gigante con miles de millones de habitaciones numeradas de forma secuencial** (las direcciones hexadecimales de memoria, ej. \`0x7fff5fbff7c0\`):
* Una **variable convencional** (\`int x = 42;\`) es una habitación donde el huésped (el número 42) vive adentro.
* Un **puntero** (\`int *p = &x;\`) es un **papel que tiene anotado el número de la habitación** de \`x\`.
* **Desreferenciar un puntero** (\`*p = 99;\`) es usar esa dirección anotada en el papel para caminar hacia la habitación y cambiar al huésped por un nuevo número 99.

---

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 Los Tres Operadores Fundamentales de Memoria en C
1. **Operador Dirección (\`&\`)**: Antepuesto a cualquier variable, extrae su dirección física inicial en la memoria RAM (expresada en hexadecimal).
2. **Declarador de Puntero (\`*\`)**: En una declaración (\`T *ptr;\`), indica que la variable \`ptr\` no almacena un valor numérico directo, sino la dirección de memoria de un dato de tipo \`T\`.
3. **Operador Desreferenciación / Indirección (\`*\`)**: Antepuesto a un puntero existente (\`*ptr\`), accede directamente al contenido almacenado en la dirección apuntada.

#### Diagrama de Memoria RAM: Variable vs Puntero
\`\`\`
Dirección Hexadecimal  | Variable / Tipo | Contenido en RAM
-----------------------|-----------------|------------------
0x7fff5fbff7c0         | int x           | 42
...                    | ...             | ...
0x7fff5fbff7c8         | int *p          | 0x7fff5fbff7c0  (Apunta a x)
\`\`\`

---

### 2.2 Estructuras Compuestas (\`struct\`) y el Operador Flecha (\`->\`)
Un \`struct\` en C agrupa múltiples variables bajo un mismo nombre. Cuando manejamos punteros a estructuras (como en los nodos de Cormen), el lenguaje C proporciona el operador flecha \`->\` como un atajo sintáctico equivalente a la desreferenciación seguida del acceso a campo:

$$\\text{puntero}->\\text{campo} \\\equiv (*\\text{puntero}).\\text{campo}$$

\`\`\`c
struct Nodo {
    int clave;
    struct Nodo *siguiente;
};

struct Nodo n1 = {10, NULL};
struct Nodo *ptr = &n1;

// Ambas líneas son idénticas en C:
(*ptr).clave = 25;
ptr->clave = 25; // Sintaxis preferida en CLRS y C Pro
\`\`\`

---

## 3. ANÁLISIS DE COMPLEJIDAD Y RENDIMIENTO

### Tiempos de Acceso a Memoria
* **Acceso Directo (\`x\`)**: $O(1)$ tiempo. El CPU lee la dirección de memoria asociada a la variable local en el stack frame actual.
* **Acceso Indirecto por Puntero (\`*p\`)**: $O(1)$ tiempo. Requiere dos lecturas de bus de datos: primero lee la dirección guardada en \`p\` y luego busca el valor en esa dirección objetivo.
* **Aritmética de Punteros (\`ptr + i\`)**: $O(1)$ tiempo. En C, sumar $i$ a un puntero de tipo \`T*\` incrementa la dirección física en $i \\times \\text{sizeof}(T)$ bytes.

---

## 4. APLICACIONES EN EL MUNDO REAL

1. **Kernel de Sistemas Operativos (Linux / Windows)**: El planificador de tareas de Linux utiliza listas doblemente enlazadas de estructuras \`task_struct\` interconectadas mediante punteros en C.
2. **Asignadores de Memoria (\`malloc\` / \`free\` / \`jemalloc\`)**: Los administradores de heap leen cabeceras de bloques libres desreferenciando punteros a la tabla de memoria.
3. **Manejadores de Hardware y Drivers**: La lectura de puertos I/O (tarjetas de red, GPUs) requiere mapear punteros directamente a direcciones de memoria físicas de dispositivos PCI.

---

## 5. NOTAS DE IMPLEMENTACIÓN Y GOTCHAS EN C

### 1. Punteros Salvajes (Wild Pointers) y Uninitialized Pointers
Un puntero declarado sin inicializar (\`int *p;\`) contiene "basura" de memoria. Intentar desreferenciarlo (\`*p = 5;\`) provoca el error fatal de tiempo de ejecución **Segmentation Fault (core dumped)** o corrompe regiones aleatorias de la memoria del sistema.
* **REGLA UNIVERSAL**: Inicializa siempre todo puntero no utilizado con \`NULL\` (\`int *p = NULL;\`).

### 2. Violación del Principio de Aliasing y Punteros Colgantes (Dangling Pointers)
Si dos punteros \`p1\` y \`p2\` apuntan a la misma dirección y liberas o destruyes la variable subyacente, \`p2\` queda "colgando".

---

## 6. GLOSARIO DE TÉRMINOS DE LA CLASE

* **Puntero**: Variable que almacena una dirección de memoria en lugar de un valor directo.
* **Desreferenciación**: Operación \`*\` que permite leer o modificar el valor alojado en la dirección a la que apunta un puntero.
* **Puntero NULL**: Valor especial (habitualmente \`0x0\`) que representa un puntero que no apunta a ninguna dirección válida de memoria.
* **Operador Flecha (\`->\`)**: Atajo sintáctico en C para acceder a miembros de un \`struct\` a través de un puntero.
* **Segmentation Fault**: Violación de acceso de memoria generada por el procesador cuando un programa intenta leer o escribir en una dirección no permitida.

---

## 7. MATERIALES DE APOYO Y REFERENCIAS

* **Para Profundizar en el Libro de Texto**:
  * **CLRS 4ta Edición**: Capítulo 10 completo (*Elementary Data Structures*), Sección 10.3 (págs. 263–268).
  * **Kernighan & Ritchie (K&R C)**: Capítulo 5 completo (*Pointers and Arrays*), Secciones 5.1 y 5.2.
* **Guía de Uso de la Animación Interactiva de la Clase**:
  * Activa la **Animación de Punteros y Memoria** ajustando el interruptor de desreferenciación para visualizar cómo cambia el valor de la variable objetivo cuando modificamos el puntero.
* **Resumen en Una Frase**:
  > *"Un puntero no es más que un número que indica en qué habitación de la RAM vive la información; dominar su desreferenciación es la clave para construir estructuras de datos dinámicas."*
`,
    visualizerType: 'memory_pointers',
    checkQuestions: [
      {
        id: 'q3-1',
        question: 'En C, si tenemos `int a = 50; int *ptr = &a;`, ¿qué hace exactamente la instrucción `*ptr = 99;`?',
        options: [
          'Cambia la dirección de memoria almacenada en ptr por el número 99.',
          'Modifica directamente el valor almacenado en la variable `a` asignándole 99.',
          'Produce un error de compilación por incompatibilidad de tipos.',
          'Crea un nuevo puntero secundario en el stack.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! El operador `*` (desreferenciación) accede a la celda de memoria cuya dirección está guardada en `ptr` (es decir, la variable `a`) y reemplaza su contenido por 99.',
        analogousExplanation: 'Si `ptr` es el número de la habitación 104, `*ptr = 99` entra a la habitación 104 y cambia la cama por una nueva.'
      },
      {
        id: 'q3-2',
        question: 'Dada una estructura `struct Nodo { int clave; struct Nodo *next; } *p;`, ¿cuál es la sintaxis correcta equivalente a `(*p).clave`?',
        options: ['p.clave', 'p->clave', 'p&*clave', 'p..clave'],
        correctIndex: 1,
        explanation: '¡Correcto! En C, el operador flecha `p->clave` es el atajo oficial para desreferenciar un puntero a estructura y acceder a uno de sus campos.',
        analogousExplanation: 'Es simplemente una forma abreviada y limpia de escribir `(*p).clave` sin tener que llenar el código de paréntesis extra.'
      },
      {
        id: 'q3-3',
        question: 'En C, si `arr` es un arreglo de enteros, ¿qué significa exactamente la expresión `*(arr + i)`?',
        options: [
          'Multiplica todos los elementos del arreglo por i.',
          'Accede al elemento en el índice i del arreglo, siendo equivalente a `arr[i]`.',
          'Desplaza la memoria del arreglo en i bits a la izquierda.',
          'Suma i al primer elemento del arreglo (`arr[0] + i`).'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! La notación de arreglos `arr[i]` es internamente convertida por C a aritmética de punteros: `*(arr + i)`. Al sumar i al puntero arr, se avanza exactamente i veces el tamaño del tipo de dato en memoria.',
        analogousExplanation: 'Si la calle comienza en la casa 0 (`arr`) y caminas i casas hacia adelante (`arr + i`), luego abres la puerta (`*`) para ver qué hay adentro.'
      },
      {
        id: 'q3-4',
        question: '¿Cuál es la consecuencia directa de pasar un `struct` muy grande "por valor" a una función (ej. `void procesar(struct Datos d)`) en lugar de usar un puntero?',
        options: [
          'Se produce automáticamente una Violación de Segmento (Segfault).',
          'Se copia todo el contenido del struct bit a bit en el stack, consumiendo CPU y memoria de forma ineficiente.',
          'El contenido original del struct es destruido permanentemente de la memoria RAM.',
          'El compilador ignora la variable y la optimiza fuera del programa.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! El paso por valor obliga a realizar una copia completa de toda la estructura. Si el struct pesa 1MB, se copiará 1MB cada vez que se llame a la función. Al pasarlo por puntero (`struct Datos *d`), solo se copian 8 bytes (la dirección).',
        analogousExplanation: 'Si alguien te pide leer un libro de 1000 páginas, pasar "por valor" es imprimirle una copia completa de todo el libro. Pasar "por puntero" es simplemente darle la tarjeta con la ubicación de la biblioteca.'
      },
      {
        id: 'q3-5',
        question: '¿Qué sucede a nivel de sistema si intentas desreferenciar un puntero que fue declarado pero no inicializado, o que apunta a `NULL`?',
        options: [
          'El compilador reserva memoria silenciosamente usando malloc.',
          'La instrucción devuelve 0 (cero) de manera segura para evitar crasheos.',
          'C genera un warning pero el programa se ejecuta normalmente ignorando la instrucción.',
          'Se produce una Violación de Segmento (Segmentation Fault) y el sistema operativo detiene abruptamente el programa.'
        ],
        correctIndex: 3,
        explanation: '¡Correcto! C no tiene un entorno seguro o máquina virtual (como Java/Python) que intercepte esto suavemente. El sistema operativo detecta el intento de acceso a memoria inválida o protegida y aborta el programa inmediatamente.',
        analogousExplanation: 'Es como intentar abrir una puerta con una llave falsa en un edificio de alta seguridad: saltan las alarmas y el sistema te expulsa al instante.'
      }
    ],
    exercises: [
      {
        id: 'ex-3-niv1',
        title: 'Nivel 1 (Conceptual): Modificación Indirecta por Punteros',
        description: 'Escribe una función en C `void duplicarValor(int *p)` que tome un puntero a un entero `p` y duplique el valor alojado en esa dirección de memoria.',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Apéndice B',
        initialCode: '#include <stdio.h>\n\nvoid duplicarValor(int *p) {\n    // TODO: Duplica el valor desreferenciando p\n}',
        solutionCode: '#include <stdio.h>\n\nvoid duplicarValor(int *p) {\n    if (p != NULL) {\n        *p = (*p) * 2;\n    }\n}',
        hint: 'Usa `*p = (*p) * 2;` para modificar el entero original en la memoria RAM.',
        testCases: [
          {
            id: 'tc-3-1',
            description: 'Duplicar valor original val=21 (Resultado esperado: 42)',
            input: '21',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Al desreferenciar `*p`, modificamos directamente la variable en el scope invocador sin necesidad de retornar un nuevo valor.'
      },
      {
        id: 'ex-3-niv2-bug',
        title: 'Nivel 2 (Aplicación Guiada): Intercambio de Variables (Swap) con Punteros',
        description: 'Un estudiante escribió la función `swap(int a, int b)` intentando intercambiar dos variables, pero descubrió que fuera de la función no cambiaban. Corrige la firma y el cuerpo usando punteros `int *a, int *b`.',
        cormenRef: 'K&R C Cap 5.2 - Paso por Referencia',
        initialCode: '#include <stdio.h>\n\nvoid intercambiarErroneo(int a, int b) {\n    // BUG: Pasa por valor, no modifica las variables originales fuera!\n    int temp = a;\n    a = b;\n    b = temp;\n}',
        solutionCode: '#include <stdio.h>\n\nvoid intercambiar(int *a, int *b) {\n    if (a != NULL && b != NULL) {\n        int temp = *a;\n        *a = *b;\n        *b = temp;\n    }\n}',
        hint: 'Cambia los parámetros a `int *a, int *b` e intercambia mediante `*a` y `*b`.',
        testCases: [
          {
            id: 'tc-3-2',
            description: 'Intercambiar a=10 y b=20',
            input: '10, 20',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Pasar direcciones de memoria `&a` y `&b` permite a la función modificar el estado en el frame de pila del llamador.'
      },
      {
        id: 'ex-3-niv3-impl',
        title: 'Nivel 3 (Implementación C): Modificador de Estructura de Nodo',
        description: 'Dada la estructura `struct Elemento { int id; int valor; };`, escribe una función C `void actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor)` que actualice ambos campos usando el operador flecha `->`.',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Atributos de Objetos',
        initialCode: '#include <stdio.h>\n\nstruct Elemento {\n    int id;\n    int valor;\n};\n\nvoid actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor) {\n    // TODO: Actualiza id y valor mediante el operador flecha ->\n}',
        solutionCode: '#include <stdio.h>\n\nstruct Elemento {\n    int id;\n    int valor;\n};\n\nvoid actualizarElemento(struct Elemento *elem, int nuevoId, int nuevoValor) {\n    if (elem != NULL) {\n        elem->id = nuevoId;\n        elem->valor = nuevoValor;\n    }\n}',
        hint: 'Usa `elem->id = nuevoId;` y `elem->valor = nuevoValor;`.',
        testCases: [
          {
            id: 'tc-3-3',
            description: 'Actualizar struct a id=101, valor=500',
            input: '101, 500',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El operador `->` desreferencia la dirección del struct y modifica directamente los miembros de la estructura original.'
      },
      {
        id: 'ex-3-niv4-analisis',
        title: 'Nivel 4 (Análisis): Búsqueda de Mínimo y Máximo con Retorno Multivalor por Puntero',
        description: 'En C una función solo puede retornar un único valor directamente. Implementa `void obtenerMinMax(int A[], int n, int *minVal, int *maxVal)` que devuelva el mínimo y el máximo de un arreglo escribiendo en los punteros provistos.',
        cormenRef: 'CLRS 4ta Ed., Cap 9 - Medianas y Estadísticos de Orden',
        initialCode: '#include <stdio.h>\n\nvoid obtenerMinMax(int A[], int n, int *minVal, int *maxVal) {\n    // TODO: Recorre A y asigna los resultados en *minVal y *maxVal\n}',
        solutionCode: '#include <stdio.h>\n\nvoid obtenerMinMax(int A[], int n, int *minVal, int *maxVal) {\n    if (n <= 0 || minVal == NULL || maxVal == NULL) return;\n    int min = A[0];\n    int max = A[0];\n    for (int i = 1; i < n; i++) {\n        if (A[i] < min) min = A[i];\n        if (A[i] > max) max = A[i];\n    }\n    *minVal = min;\n    *maxVal = max;\n}',
        hint: 'Inicializa `min = A[0]` y `max = A[0]`. Al terminar el recorrido asigna `*minVal = min;` y `*maxVal = max;`.',
        testCases: [
          {
            id: 'tc-3-4',
            description: 'Para [45, 12, 89, 3, 67], n=5 (Min=3, Max=89)',
            input: '[45, 12, 89, 3, 67], 5',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'El patrón de pasar punteros de salida (`int *out`) es el mecanismo idiomático en C para retornar múltiples resultados desde una sola función.'
      },
      {
        id: 'ex-3-niv5-desafio',
        title: 'Nivel 5 (Desafío Avanzado Integrador): Simulador de Asignador de Memoria Fija (Arena Allocator)',
        description: 'Implementa una estructura `struct Arena` que administre un arreglo buffer de enteros de tamaño fijo (ej. 100 enteros). Escribe la función `int* arenaAlloc(struct Arena *a, int tamano)` que devuelva un puntero al bloque asignado incrementando el desplazamiento (offset) interno. [Marcado como Avanzado]',
        cormenRef: 'CLRS 4ta Ed., Sec 10.3 - Representación mediante arreglos',
        initialCode: '#include <stdio.h>\n\nstruct Arena {\n    int buffer[100];\n    int offset;\n};\n\nvoid initArena(struct Arena *a) {\n    a->offset = 0;\n}\n\nint* arenaAlloc(struct Arena *a, int tamano) {\n    // TODO: Si offset + tamano <= 100, devuelve &a->buffer[offset] e incrementa offset\n    return NULL;\n}',
        solutionCode: '#include <stdio.h>\n\nstruct Arena {\n    int buffer[100];\n    int offset;\n};\n\nvoid initArena(struct Arena *a) {\n    a->offset = 0;\n}\n\nint* arenaAlloc(struct Arena *a, int tamano) {\n    if (a == NULL || a->offset + tamano > 100) {\n        return NULL;\n    }\n    int *ptr = &a->buffer[a->offset];\n    a->offset += tamano;\n    return ptr;\n}',
        hint: 'Verifica si `a->offset + tamano <= 100`. Si es así, calcula `ptr = &a->buffer[a->offset]`, suma `tamano` a `offset` y retorna `ptr`.',
        testCases: [
          {
            id: 'tc-3-5',
            description: 'Asignar bloque de 10 enteros en Arena limpia',
            input: '10',
            expectedOutput: 'undefined'
          }
        ],
        explanation: 'Los asignadores por arena (Arena Allocators) son patrones de altísimo rendimiento usados en compiladores y motores de juegos para evitar la fragmentación de memoria de `malloc`.'
      }
    ],
    prevItemId: 'clase-2',
    nextItemId: 'clase-4'
  },

  {
    id: 'clase-4',
    number: 4,
    type: 'class',
    title: 'Clase 4 – Listas Enlazadas',
    topic: 'Listas enlazadas simples y dobles, inserciones, punteros y fugas de memoria',
    cormenChapter: 'Capítulo 10.2: Listas enlazadas (Linked Lists)',
    durationMinutes: 60,
    summary: 'Construcción de estructuras dinámicas de datos: nodos, punteros head y next, inserción O(1), eliminación, listas circulares y doblemente enlazadas.',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### La Tiranía de la Memoria Contigua
En programación elemental, el arreglo (array) es el rey indiscutido. Es simple, rápido y compacto. Sin embargo, su mayor fortaleza —la memoria contigua— es también su mayor debilidad. Cuando un arreglo alcanza su capacidad máxima, insertar un nuevo elemento obliga al sistema a reservar un bloque de memoria más grande, copiar todos los datos antiguos y liberar el original. Peor aún, si queremos insertar en el medio del arreglo, debemos desplazar uno por uno todos los elementos posteriores, lo que cuesta $O(n)$.

Para resolver esta rigidez estructural, las **Listas Enlazadas** (descritas en el Capítulo 10.2 de CLRS) ofrecen un paradigma radicalmente distinto: la memoria dispersa. En lugar de exigir un bloque enorme e ininterrumpido, una lista enlazada permite que sus elementos se esparzan por toda la memoria RAM, conectándose entre sí mediante **punteros** (flechas que indican dónde está el siguiente eslabón).

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 La Lista Enlazada Simple (Singly Linked List)
En una lista enlazada simple, los elementos se arreglan en un **orden lineal**. Cada elemento es un **Nodo** (objeto independiente en memoria dinámica) que contiene:
1. **\`key\` / \`dato\`**: La información útil o carga útil (payload) que queremos guardar.
2. **\`next\`**: Un puntero a la dirección de memoria del siguiente nodo.

El acceso a la lista se gestiona mediante un puntero especial llamado **\`head\`** (cabeza), que apunta al primer nodo. Si la lista está vacía, \`head == NULL\`. El último nodo de la lista tiene un puntero \`next\` que apunta a \`NULL\`, marcando el final lógico de la cadena.

\`\`\`text
[ HEAD ] -> [ Dato: 12 | next ] -> [ Dato: 99 | next ] -> [ Dato: 37 | NULL ]
\`\`\`

### 2.2 Inserción en Medio de la Lista: Paso a Paso
Una de las mayores virtudes de las listas enlazadas es insertar elementos en cualquier posición en tiempo $O(1)$... **siempre y cuando ya estemos parados en el nodo previo**.
Veamos cómo insertar un nuevo nodo $N$ entre un nodo $A$ y un nodo $B$:
1. Estado inicial: \`A -> next = B\`
2. Creamos $N$: Le asignamos memoria dinámicamente (\`malloc\`).
3. Conectamos $N$ al resto de la lista: \`N -> next = A -> next\` (ahora $N$ apunta a $B$).
4. Enganchamos el nodo anterior a $N$: \`A -> next = N\`.

**¡CRÍTICO!** El orden de los pasos 3 y 4 es inamovible. Si primero hiciéramos \`A -> next = N\`, perderíamos la referencia a $B$ para siempre, partiendo la lista en dos y generando una fuga de memoria masiva.

### 2.3 Lista Doblemente Enlazada (Doubly Linked List)
El libro de Cormen hace mucho énfasis en las listas doblemente enlazadas. A diferencia de la simple, cada nodo tiene **dos** punteros:
*   **\`next\`**: Apunta al nodo sucesor.
*   **\`prev\`**: Apunta al nodo predecesor.

Esto permite recorrer la cadena en ambas direcciones. Además, si conocemos la dirección en memoria de un nodo específico, podemos eliminarlo en tiempo $O(1)$, porque gracias al puntero \`prev\` podemos acceder inmediatamente a su predecesor para "saltar" el nodo a eliminar y reconectar la lista. En una lista simple, eliminar un nodo conocido cuesta $O(n)$ porque necesitamos recorrer todo desde \`head\` para encontrar a su predecesor.

### 2.4 Listas Circulares
Una variación común es la lista circular, donde el puntero \`next\` del último nodo no apunta a \`NULL\`, sino que regresa apuntando al nodo \`head\`. Si es doblemente enlazada, el \`prev\` del \`head\` apunta directamente al último nodo, formando un anillo perfecto e infinito.

## 3. ANÁLISIS DE COMPLEJIDAD DETALLADO

Al comparar una lista enlazada con un arreglo, notamos un claro intercambio (trade-off) de rendimiento:

| Operación | Arreglo Contiguo | Lista Simple | Lista Doble |
| :--- | :--- | :--- | :--- |
| **Acceso aleatorio** ($A[i]$) | **$O(1)$** | $O(n)$ | $O(n)$ |
| **Búsqueda secuencial** | $O(n)$ | $O(n)$ | $O(n)$ |
| **Insertar al inicio (Push)** | $O(n)$ (Desplazar todo) | **$O(1)$** | **$O(1)$** |
| **Borrar un nodo (ya ubicado)**| $O(n)$ | $O(n)$ (Buscar predecesor) | **$O(1)$** |
| **Búsqueda Binaria** | **$O(\\\log n)$** (si ordenado) | Imposible / Ineficiente | Imposible / Ineficiente |

**¿Por qué la Búsqueda Binaria es imposible en $O(\\\log n)$?**
Aunque los datos en la lista enlazada estén perfectamente ordenados de menor a mayor, **no se puede hacer búsqueda binaria en $O(\\\log n)$**. La búsqueda binaria exige "saltar" instantáneamente a la mitad exacta de los datos, lo que requiere acceso aleatorio en memoria ($O(1)$). En una lista, ir a la mitad requiere $n/2$ pasos avanzando nodo por nodo, degradando la complejidad a $O(n)$.

## 4. APLICACIONES EN EL MUNDO REAL

*   **Gestión de Memoria del Sistema Operativo**: El OS utiliza listas enlazadas (free lists) para rastrear qué bloques de RAM están libres.
*   **Historial de Navegadores**: El botón de "Atrás" y "Adelante" del navegador web se modela tradicionalmente con una Lista Doblemente Enlazada para navegar bidireccionalmente.
*   **Colas y Pilas**: Las listas enlazadas son la infraestructura perfecta para construir Pilas (LIFO) y Colas (FIFO) sin límite de capacidad y sin el overhead de redimensionamiento de los arreglos.
*   **Manejo de Colisiones en Tablas Hash**: Mediante "Chaining", cada cubeta de una tabla hash almacena una lista enlazada con los elementos que colisionaron.

## 5. NOTAS DE IMPLEMENTACIÓN EN C / PELIGROS COMUNES

Trabajar con listas enlazadas en C es un rito de iniciación. Involucra manipulación directa de memoria dinámica y es terreno fértil para errores catastróficos.

### El Peligro del Memory Leak (Pérdida de Referencia)
La trampa clásica ocurre al intentar recorrer y eliminar un nodo, o al liberar la lista completa. Si queremos eliminar la \`head\` y mover la cabeza al siguiente nodo, un programador novato podría escribir:
\`\`\`c
free(head);
head = head->next; // ¡CRASH! SEGFAULT INMINENTE
\`\`\`
Esto es un error fatal. Al hacer \`free(head)\`, esa memoria se devuelve al sistema operativo. En la línea siguiente, el programa intenta acceder a \`head->next\` leyendo una porción de RAM que ya no le pertenece.
**Forma correcta:**
\`\`\`c
struct Nodo* nodoAEliminar = head; // Guardamos la dirección
head = head->next;                 // Avanzamos el puntero a salvo
free(nodoAEliminar);               // Ahora liberamos la memoria antigua
\`\`\`

### El Orden de Inserción
Al insertar en medio de la lista (ver Sección 2.2), si conectas primero el nodo anterior al nuevo nodo, sobrescribes el puntero que llevaba al resto de la cadena. Ese bloque de memoria quedará flotando irremediablemente: un *memory leak* devorando RAM en silencio.

## 6. GLOSARIO DE TÉRMINOS

*   **Nodo (Node)**: La unidad atómica de la lista, agrupando la carga útil de datos (key) y uno o más punteros.
*   **Head (Cabeza)**: Puntero que señala al primer nodo. Es la única puerta de entrada a la estructura.
*   **Tail (Cola)**: Puntero opcional que señala al último nodo. Acelera la inserción al final reduciéndola de $O(n)$ a $O(1)$.
*   **Memory Leak (Fuga de Memoria)**: Situación donde se pierde la referencia a un nodo de memoria dinámica antes de liberarlo con \`free()\`, dejándolo ocupando recursos para siempre.
*   **NULL**: Constante en C que indica que un puntero "no apunta a nada", utilizada para marcar el final lógico de una lista simple.

## 7. MATERIALES DE APOYO

*   **Lectura Fundamental**: *Introduction to Algorithms* (Cormen et al.), Cap. 10.2: Listas enlazadas.
*   **Técnica de Estudio Sugerida**: La mejor forma de dominar las listas enlazadas no es programando de inmediato, sino **dibujando cajas y flechas en un papel** (diagramas de traza) antes de escribir cada línea de código en C.
*   [Visualgo: Animación de Inserciones y Eliminaciones](https://visualgo.net/en/list)
    `,
    visualizerType: 'linked_list',
    checkQuestions: [
      {
        id: 'q4-1',
        question: '¿Cuál es la ventaja fundamental de insertar un nuevo elemento al INICIO de una lista enlazada frente a un arreglo estático contiguo?',
        options: [
          'En la lista enlazada toma tiempo O(1) cambiando solo un par de punteros, mientras que en el arreglo toma O(n) al tener que desplazar los elementos.',
          'La lista enlazada ocupa mucha menos memoria total debido a la compresión.',
          'La lista enlazada permite buscar la posición correcta mucho más rápido.',
          'El arreglo no permite insertar elementos nuevos bajo ninguna circunstancia.'
        ],
        correctIndex: 0,
        explanation: '¡Excelente! Insertar al frente de una lista enlazada requiere simplemente crear el nodo, conectarlo a head y reasignar head = nuevoNodo, operación constante O(1).',
        analogousExplanation: 'Imagina una locomotora: enganchar un vagón nuevo justo al frente detrás de la máquina es instantáneo. En una fila fija de sillas de cine, tendrías que pedirle a todos que se corran una silla a la derecha.'
      },
      {
        id: 'q4-2',
        question: '¿Por qué NO es posible implementar Búsqueda Binaria en tiempo O(log n) sobre una lista enlazada simple, incluso si los elementos están perfectamente ordenados?',
        options: [
          'Porque la estructura de datos no admite almacenar números enteros ordenados.',
          'Porque para ir al punto medio se debe recorrer la lista nodo por nodo, costando O(n) en lugar del acceso O(1) que exige la búsqueda binaria.',
          'Porque los punteros consumen demasiada memoria para el algoritmo recursivo.',
          'Porque las listas enlazadas simples no tienen un puntero tail.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! La búsqueda binaria fundamenta su velocidad logarítmica en poder acceder al índice (min+max)/2 en tiempo constante O(1). Al no tener acceso aleatorio, una lista enlazada obliga a saltar O(n) veces para llegar a la mitad.',
        analogousExplanation: 'Si tienes un libro impreso (Arreglo), abrirlo justo por la mitad es instantáneo. Si tienes un rollo de papiro antiguo (Lista), para ver la mitad debes desenrollarlo manualmente desde el inicio.'
      },
      {
        id: 'q4-3',
        question: 'Supongamos que conoces exactamente la dirección de memoria de un nodo M (que está en medio de la estructura) y quieres eliminarlo. ¿Por qué una Lista Doblemente Enlazada lo hace en O(1) mientras que la Simple cuesta O(n)?',
        options: [
          'La lista doble almacena el tamaño total de la estructura.',
          'En la lista doble puedes seguir el puntero "prev" para llegar instantáneamente al nodo anterior a M y reconectar la lista. En la simple debes iterar desde head para encontrar a ese predecesor.',
          'El nodo M en una lista doble se marca como nulo automáticamente.',
          'La lista doble delega el borrado al sistema operativo de forma concurrente.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Para borrar un nodo necesitas enlazar a su predecesor con su sucesor. En la lista simple, el predecesor solo se encuentra buscándolo desde el principio O(n). El puntero "prev" de la lista doble te lo da en O(1).',
        analogousExplanation: 'Es como estar en el tercer piso de un edificio sin escaleras de bajada (lista simple): para ir al piso dos, debes tirarte, volver al lobby y subir dos pisos. Con escaleras de bajada (puntero prev), es un paso.'
      },
      {
        id: 'q4-4',
        question: '¿Qué es un "memory leak" (fuga de memoria) en el contexto de listas enlazadas en C?',
        options: [
          'Cuando la memoria RAM se vuelve demasiado rápida para el procesador.',
          'Cuando se hace una copia excesiva de structs pasados por valor.',
          'Cuando se rompe o sobrescribe el puntero a un bloque de memoria dinámica antes de liberarlo, dejándolo inalcanzable para el programa pero aún reservado.',
          'Cuando un puntero se sale de los límites de un arreglo estático (Buffer Overflow).'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! Una fuga de memoria ocurre cuando pierdes la dirección de un bloque alojado dinámicamente con malloc() antes de llamar a free(), robando RAM permanentemente hasta que el programa se cierra.',
        analogousExplanation: 'Imagínate aparcar tu auto en un parking gigante (RAM), perder la llave y el ticket (Puntero), e irte. Tu auto quedará ocupando esa plaza para siempre y nadie más podrá usarla.'
      },
      {
        id: 'q4-5',
        question: 'Si quieres avanzar la "cabeza" de la lista y eliminar el nodo antiguo, ¿cuál es el orden correcto y seguro para evitar un Segmentation Fault?',
        options: [
          'free(head); head = head->next;',
          'head = head->next; free(head);',
          'struct Nodo* temp = head; head = head->next; free(temp);',
          'struct Nodo* temp = head->next; free(head); head = head;'
        ],
        correctIndex: 2,
        explanation: '¡Exacto! Primero respaldas la dirección actual en un puntero temporal, luego avanzas la cabeza de forma segura usando la memoria válida, y finalmente haces free del temporal respaldado.',
        analogousExplanation: 'Regla de Tarzán: no puedes soltar la liana actual (free) antes de haber agarrado firmemente la siguiente liana (head = head->next).'
      }
    ],
    exercises: [
      {
        id: "ex-4",
        title: "Ejercicio 4: Lectura de Cabeza de Lista Enlazada en C",
        description: "Dada la estructura \`struct Nodo { int dato; struct Nodo *siguiente; };\`, escribe una función \`int obtenerPrimerValor(struct Nodo *cabeza)\` que devuelva el campo \`dato\` del nodo cabeza o \`-1\` si la lista es nula (\`NULL\`).",
        cormenRef: "Cormen Cap 10.2 - Listas Enlazadas Simples",
        initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  // TODO: Retorna cabeza->dato o -1 si cabeza == NULL\n  return -1;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint obtenerPrimerValor(struct Nodo *cabeza) {\n  if (cabeza == NULL) return -1;\n  return cabeza->dato;\n}",
        hint: "Verifica primero si \`cabeza == NULL\`. Si no es nulo, accede a su valor usando el operador flecha \`cabeza->dato\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Lista con nodo dato=42",
                    "input": "{ dato: 42, siguiente: null }",
                    "expectedOutput": "42"
          },
          {
                    "id": "t2",
                    "description": "Lista vacía (NULL)",
                    "input": "null",
                    "expectedOutput": "-1"
          }],
        explanation: "El acceso a campos de una estructura mediante un puntero se realiza con el operador flecha \`->\`, verificando siempre que el puntero no sea nulo."
      }
    ],
    prevItemId: 'clase-3',
    nextItemId: 'clase-5'
  },

  {
    id: 'clase-5',
    number: 5,
    type: 'class',
    title: 'Clase 5 – Recursión',
    topic: 'Casos base y recursivos, la pila de llamadas (Call Stack), pensamiento recursivo y explosión exponencial',
    cormenChapter: 'Capítulo 3 y 4.4: Recursividad y Árboles de Recursión',
    durationMinutes: 60,
    summary: 'Comprender cómo una función se llama a sí misma dividiendo problemas en subproblemas idénticos más pequeños, trazando el Call Stack y analizando la complejidad O(2^n).',
    theoryContent: `
## 1. INTRODUCCIÓN Y MOTIVACIÓN

### El Poder de Dividir y Vencerás
A menudo, los problemas computacionales son demasiado grandes o complejos para resolverse de un solo golpe con un bucle simple. La **recursión** es una técnica elegante donde una función se define en términos de sí misma. En lugar de resolver todo el problema, la función resuelve una pequeña parte y luego *se llama a sí misma* para resolver el resto.

Este es el núcleo del paradigma **"Divide y Vencerás"** (Cormen Cap 4): tomar un problema masivo, cortarlo en subproblemas idénticos pero más pequeños, resolver los subproblemas recursivamente, y luego combinar sus resultados.

## 2. EXPLICACIÓN TEÓRICA AMPLIADA

### 2.1 La Anatomía de una Función Recursiva
Toda función recursiva bien diseñada DEBE constar de dos componentes sagrados. Si falta uno, el programa está condenado a fallar:
1. **Caso Base (Condición de parada)**: Un estado trivial que se resuelve directamente sin volver a llamar a la función. ¡Evita que el programa entre en un bucle infinito!
2. **Caso Recursivo**: El paso donde la función realiza una llamada a sí misma, pasando una versión **estrictamente más pequeña** o reducida del problema original.

### 2.2 Ejemplo Paso a Paso: El Factorial
Definición matemática del factorial ($n!$):
$$n! = \\begin{cases} 1 & \text{si } n = 0 \text{ o } n = 1 \text{ (Caso Base)} \\\ n \\times (n-1)! & \text{si } n > 1 \text{ (Caso Recursivo)} \\end{cases}$$

**Traza de ejecución para \`factorial(3)\`:**
Cuando una función se llama a sí misma, la ejecución actual se **pausa**.
1. \`factorial(3)\` invoca \`3 * factorial(2)\` (Queda en pausa esperando el resultado de factorial(2))
2. \`factorial(2)\` invoca \`2 * factorial(1)\` (Queda en pausa)
3. \`factorial(1)\` alcanza el **Caso Base** y retorna \`1\` inmediatamente.
4. (Se reanuda) \`factorial(2)\` recibe el \`1\`, calcula \`2 * 1\` y retorna \`2\`.
5. (Se reanuda) \`factorial(3)\` recibe el \`2\`, calcula \`3 * 2\` y retorna \`6\`.

### 2.3 Fibonacci y la Explosión Exponencial
La serie de Fibonacci es el ejemplo clásico de recursión múltiple: $F(n) = F(n-1) + F(n-2)$.
Si trazamos el árbol de llamadas para \`fib(4)\`:
\`\`\`text
                fib(4)
               /      \\
         fib(3)        fib(2)
        /     \\        /    \\
   fib(2)   fib(1)  fib(1) fib(0)
   /    \\
fib(1) fib(0)
\`\`\`
Nota cómo \`fib(2)\` se calcula **dos veces**. A medida que $n$ crece, la cantidad de subproblemas repetidos se multiplica, creando un árbol inmenso.

## 3. ANÁLISIS DE COMPLEJIDAD DETALLADO

| Algoritmo | Complejidad de Tiempo | Complejidad de Espacio (Call Stack) |
| :--- | :--- | :--- |
| **Factorial Recursivo** | $O(n)$ | $O(n)$ |
| **Fibonacci Recursivo (Ingenuo)** | **$O(2^n)$** | $O(n)$ |
| **Búsqueda Binaria Recursiva** | $O(\\log n)$ | $O(\\log n)$ |

**El puente hacia las Recurrencias (Clase 9):**
El $O(2^n)$ de Fibonacci es desastroso. Un simple \`fib(50)\` podría tardar años en ejecutarse en una computadora normal debido a la **explosión exponencial** de llamadas redundantes. Aprender a calcular exactamente este costo (usando Árboles de Recurrencia y el Teorema Maestro) es el objetivo central del análisis asintótico avanzado.

## 4. APLICACIONES EN EL MUNDO REAL

*   **Exploración de Sistemas de Archivos**: Calcular el tamaño de una carpeta que contiene subcarpetas.
*   **Análisis del DOM (HTML/XML)**: Los navegadores usan recursión para renderizar y buscar nodos en la estructura de árbol de una página web.
*   **Algoritmos de Ordenamiento Rápidos**: QuickSort y MergeSort se basan completamente en dividir el arreglo a la mitad y ordenarlo de forma recursiva.
*   **Inteligencia Artificial**: Algoritmos como Minimax (usado en ajedrez) exploran árboles de decisiones recursivamente.

## 5. NOTAS DE IMPLEMENTACIÓN EN C / PELIGROS COMUNES

### 5.1 La Pila de Llamadas (Call Stack) y el Stack Overflow
En C, cada vez que llamas a una función (recursiva o no), el sistema operativo aparta un bloque de memoria temporal llamado **marco de pila (stack frame)**. Este bloque guarda las variables locales y la instrucción exacta a la que debe retornar.
La memoria del Call Stack es **muy limitada** (típicamente 1MB a 8MB). Si olvidas el caso base, la función se llamará a sí misma infinitamente, apilando millones de marcos hasta agotar la memoria. El resultado: el infame **Stack Overflow** (Desbordamiento de Pila), que aborta el programa inmediatamente (Segmentation Fault).

### 5.2 Recursión de Cola (Tail Recursion)
Una **Recursión de Cola** ocurre cuando la llamada recursiva es la **absolutamente última instrucción** que ejecuta la función, sin operaciones pendientes (como multiplicar por \`n\` en el factorial).
En lenguajes funcionales puros (Haskell, LISP), el compilador optimiza esto y reutiliza el mismo marco de pila, bajando la complejidad de espacio a $O(1)$.
**Peligro en C**: A menos que compiles tu código en C con banderas de optimización agresiva (\`gcc -O2\` o \`-O3\`), el compilador de C estándar **no garantiza** la optimización de recursión de cola, por lo que aún podrías sufrir un Stack Overflow si la recursión es muy profunda.

## 6. GLOSARIO DE TÉRMINOS

*   **Caso Base**: La condición que detiene la recursión.
*   **Call Stack (Pila de Llamadas)**: Estructura de memoria LIFO (Last In, First Out) que administra la ejecución de las funciones.
*   **Stack Frame (Marco de Pila)**: El bloque de memoria en el Call Stack reservado para una ejecución específica de una función.
*   **Stack Overflow**: Error fatal provocado al exceder el límite de memoria del Call Stack.
*   **Tail Recursion**: Patrón recursivo donde la llamada a sí misma es la última operación evaluada.

## 7. MATERIALES DE APOYO

*   **Lectura Fundamental**: *Introduction to Algorithms* (Cormen), Capítulo 4 (Recurrencias y Divide y Vencerás).
*   **Herramienta Visual**: Recomendamos fuertemente dibujar en un papel el árbol de llamadas paso a paso para cualquier función recursiva nueva que escribas.
    `,
    visualizerType: 'recursion_tree',
    checkQuestions: [
      {
        id: 'q5-1',
        question: '¿Qué sucede a nivel de memoria si escribimos una función recursiva en C y olvidamos colocar el Caso Base?',
        options: [
          'El compilador de C detecta el bucle infinito y detiene la compilación.',
          'La función retorna 0 automáticamente de manera segura.',
          'El programa satura la memoria Heap hasta llenar toda la RAM.',
          'El Call Stack (Pila de Llamadas) se llena de marcos de pila repetidos hasta agotar su límite, provocando un Stack Overflow y abortando el programa.'
        ],
        correctIndex: 3,
        explanation: '¡Exacto! Cada llamada ocupa espacio en el Call Stack. Sin caso base, las llamadas se apilan infinitamente hasta desbordar la pila, causando un crash.',
        analogousExplanation: 'Es como meter una caja dentro de otra caja infinitamente; eventualmente te quedarás sin cartón (memoria).'
      },
      {
        id: 'q5-2',
        question: '¿Cuál es la complejidad de tiempo de una implementación recursiva ingenua de la serie de Fibonacci, $F(n) = F(n-1) + F(n-2)$?',
        options: [
          'O(1)',
          'O(n)',
          'O(n log n)',
          'O(2^n)'
        ],
        correctIndex: 3,
        explanation: '¡Correcto! Es $O(2^n)$. Al llamar a la función dos veces por cada nivel, el árbol de llamadas se duplica en ancho en cada paso, generando una explosión exponencial de cálculos redundantes.',
        analogousExplanation: 'Si un rumor lo cuentas a dos amigos, y cada uno a otros dos, la cantidad de gente hablando crece exponencialmente.'
      },
      {
        id: 'q5-3',
        question: 'En el cálculo del factorial recursivo, ¿por qué la complejidad de memoria (espacio) es $O(n)$ en lugar de $O(1)$?',
        options: [
          'Porque guarda los números grandes en un Arreglo dinámico.',
          'Porque cada de una de las $n$ llamadas recursivas mantiene abierto su propio marco (Stack Frame) en la Pila de Llamadas esperando a que termine la siguiente.',
          'Porque el compilador de C siempre reserva $O(n)$ espacio de seguridad.',
          'La complejidad de espacio del factorial es $O(1)$, la premisa es falsa.'
        ],
        correctIndex: 1,
        explanation: '¡Correcto! En la recursión profunda, las llamadas se "pausan" esperando la respuesta de sus sub-llamadas. Si $n=100$, habrá 100 marcos de pila abiertos simultáneamente.',
        analogousExplanation: 'Es como tener 100 pestañas del navegador abiertas al mismo tiempo porque en cada una hiciste clic en "Abrir en nueva pestaña" antes de leerla.'
      },
      {
        id: 'q5-4',
        question: '¿Qué característica define a la "Recursión de Cola" (Tail Recursion)?',
        options: [
          'La función no tiene Caso Base.',
          'La llamada recursiva es la absolutamente última operación de la función, sin dejar cálculos pendientes tras su retorno.',
          'La función retorna un puntero al último elemento (cola) de una lista.',
          'La función hace múltiples llamadas recursivas simultáneas.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Si no hay operaciones pendientes (como una multiplicación multiplicando el resultado recursivo), la función no necesita guardar su estado local, lo que teóricamente permite al compilador optimizar la memoria a $O(1)$.',
        analogousExplanation: 'Es como pasarle el testigo a otro corredor y salir de la pista de inmediato, en lugar de quedarte esperando a que termine para aplaudirle.'
      },
      {
        id: 'q5-5',
        question: 'Si \`int f(int x) { if(x == 0) return 0; return x + f(x-1); }\`, ¿qué devuelve \`f(3)\`?',
        options: [
          '3',
          '4',
          '6',
          '9'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! La traza es: $3 + f(2) \\rightarrow 3 + (2 + f(1)) \\rightarrow 3 + 2 + (1 + f(0)) \\rightarrow 3 + 2 + 1 + 0 = 6$.',
        analogousExplanation: 'Es simplemente la suma de los números del 1 al $n$.'
      }
    ],
    exercises: [
      {
        id: "ex-5",
        title: "Ejercicio 5: Factorial Recursivo en C",
        description: "Implementa la función en C \`int factorial(int n)\` que calcule el factorial de un número entero positivo de manera recursiva.",
        cormenRef: "Cormen Cap 3.2 - Funciones Recursivas",
        initialCode: "#include <stdio.h>\n\nint factorial(int n) {\n  // Caso base: si n <= 1 retorna 1\n  // Caso recursivo: n * factorial(n - 1)\n  \n  // TODO: Escribe el código en C\n  return 1;\n}",
        solutionCode: "#include <stdio.h>\n\nint factorial(int n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
        hint: "Si \`n <= 1\`, retorna 1. En caso contrario, retorna \`n * factorial(n - 1)\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Factorial de 5",
                    "input": "5",
                    "expectedOutput": "120"
          },
          {
                    "id": "t2",
                    "description": "Factorial de 0",
                    "input": "0",
                    "expectedOutput": "1"
          },
          {
                    "id": "t3",
                    "description": "Factorial de 3",
                    "input": "3",
                    "expectedOutput": "6"
          }],
        explanation: "Cada llamada recursiva apila un marco en la pila de llamadas de C hasta llegar al caso base $n \\\le 1$."
      }
    ],
    prevItemId: 'clase-4',
    nextItemId: 'taller-1'
  },

  {
    id: 'taller-1',
    number: 1,
    type: 'workshop',
    title: 'Taller 1 – Recursión Práctica (Taller Obligatorio)',
    topic: 'Resolución guiada de ejercicios intensivos: Listas enlazadas, arreglos y pensamiento recursivo',
    cormenChapter: 'Capítulo 4: Divide y Vencerás & Problemas de Recursión',
    durationMinutes: 70,
    summary: 'Taller práctico obligatorio: resolución paso a paso integrando listas enlazadas con recursión, conteo, sumas e inversión.',
    theoryContent: `### 🎯 Bienvenido al Taller 1 de Recursión Práctica

En este taller no hay teoría abstracta nueva. Vamos a aplicar directamente el pensamiento recursivo (y todo lo aprendido en la Clase 4 y 5) a problemas reales.
El objetivo es transformar la forma en la que piensas los problemas iterativos y resolverlos pura y exclusivamente con recursión.

#### Estrategia para cada problema:
1. **Identificar el Caso Base**: ¿Cuál es el caso más trivial que se puede responder sin pensar? (Ej. Un arreglo vacío, un puntero \`NULL\`).
2. **Asumir que el Caso Recursivo funciona (Salto de Fe)**: Si llamas a la función con el problema "un paso más pequeño", asume ciegamente que retornará el resultado correcto.
3. **Combinar**: ¿Cómo unes el elemento actual con la solución del subproblema para obtener la solución final?

#### Desafíos del Taller (Ejercicios Guiados):

**1. Suma Recursiva de Arreglo**
Dado un arreglo y su tamaño $n$, en lugar de usar un bucle \`for\`, el problema se define como:
*   Caso Base: Si $n = 0$, la suma es 0.
*   Caso Recursivo: El último elemento (\`arr[n-1]\`) sumado a la suma de los primeros $n-1$ elementos.

**2. Longitud de una Lista Enlazada (Integración con Clase 4)**
Dado un puntero a la cabeza de una lista enlazada, ¿cuántos nodos tiene?
*   Caso Base: Si \`head == NULL\`, la longitud es 0.
*   Caso Recursivo: 1 (el nodo actual) más la longitud del resto de la lista (\`head->next\`).

Este es un patrón fundamental para recorrer estructuras dinámicas sin bucles.

**3. MCD (Algoritmo de Euclides)**
Calcula el Máximo Común Divisor entre dos enteros usando $a \\% b$.
*   Caso Base: Si $b = 0$, retorna $a$.
*   Caso Recursivo: Llama a la función intercambiando los parámetros: \`mcd(b, a % b)\`.

*Traza de ejecución paso a paso para mcd(48, 18):*
1. \`mcd(48, 18)\` $\\rightarrow$ $48 \\% 18 = 12$ $\\rightarrow$ Llama a \`mcd(18, 12)\`
2. \`mcd(18, 12)\` $\\rightarrow$ $18 \\% 12 = 6$ $\\rightarrow$ Llama a \`mcd(12, 6)\`
3. \`mcd(12, 6)\` $\\rightarrow$ $12 \\% 6 = 0$ $\\rightarrow$ Llama a \`mcd(6, 0)\`
4. \`mcd(6, 0)\` $\\rightarrow$ Caso Base ($b=0$), retorna **6**.

**4. Torres de Hanói (El problema maestro)**
Mover $n$ discos de una clavija Origen a una clavija Destino usando una clavija Auxiliar.
*   Caso Base: Si $n=0$, no hay discos que mover.
*   Caso Recursivo:
    1. Mover $n-1$ discos del Origen al Auxiliar.
    2. Mover el disco $n$ (el más grande) directo al Destino.
    3. Mover los $n-1$ discos del Auxiliar al Destino.
Todo resuelto matemáticamente en exactamente $2^n - 1$ movimientos.

*Traza de ejecución para n=3 (Origen: A, Auxiliar: B, Destino: C):*
1. Mover disco 1 de A a C
2. Mover disco 2 de A a B
3. Mover disco 1 de C a B
4. Mover disco 3 de A a C *(El más grande llega a su destino final)*
5. Mover disco 1 de B a A
6. Mover disco 2 de B a C
7. Mover disco 1 de A a C
(Total: $2^3 - 1 = 7$ movimientos).
`,
    visualizerType: 'recursion_tree',
    checkQuestions: [
      {
        id: 'qt1-1',
        question: 'En el problema de las Torres de Hanói con $n$ discos, ¿cuál es el número mínimo exacto de movimientos necesarios?',
        options: ['$2^n - 1$', '$n^2$', '$n \\log n$', '$2n$'],
        correctIndex: 0,
        explanation: '¡Excelente! La recurrencia $T(n) = 2T(n-1) + 1$ se resuelve matemáticamente en $T(n) = 2^n - 1$ movimientos.',
        analogousExplanation: 'Para 1 disco = 1 mov. Para 2 discos = 3 mov. Para 3 discos = 7 mov ($2^3 - 1 = 7$). Crece de forma exponencial.'
      },
      {
        id: 'qt1-2',
        question: 'Si resolvemos la "Longitud de una Lista Enlazada" recursivamente, ¿qué representa nuestro Caso Base?',
        options: [
          'Cuando el puntero actual apunta a sí mismo.',
          'Cuando el dato del nodo es igual a 0.',
          'Cuando el puntero head es NULL (lista vacía).',
          'Cuando el arreglo se queda sin elementos.'
        ],
        correctIndex: 2,
        explanation: '¡Exacto! El final de la lista está marcado por el puntero NULL. Ese es nuestro estado vacío y trivial donde la longitud es 0.',
        analogousExplanation: 'Es como caminar por una cadena humana; te detienes y cuentas 0 cuando llegas a la persona que no le está dando la mano a nadie más.'
      }
    ],
    exercises: [
      {
        id: "ex-t1-1",
        title: "Ejercicio Taller 1.1: Suma Recursiva de Arreglo",
        description: "Implementa la función recursiva en C \`int sumaRecursiva(int arr[], int n)\` que calcule la suma de los $n$ elementos de un arreglo sin usar bucles.",
        cormenRef: "Taller 1 - Divide y Vencerás",
        initialCode: "#include <stdio.h>\n\nint sumaRecursiva(int arr[], int n) {\n  // Caso base: si n <= 0 retorna 0\n  // Caso recursivo: suma el último elemento y el resto\n  \n  // TODO: Escribe tu código en C\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n\nint sumaRecursiva(int arr[], int n) {\n  if (n <= 0) return 0;\n  return arr[n - 1] + sumaRecursiva(arr, n - 1);\n}",
        hint: "Suma el elemento \`arr[n - 1]\` con la llamada recursiva usando \`n - 1\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Suma [1, 2, 3, 4, 5], n=5",
                    "input": "[1, 2, 3, 4, 5], 5",
                    "expectedOutput": "15"
          },
          {
                    "id": "t2",
                    "description": "Arreglo vacío, n=0",
                    "input": "[], 0",
                    "expectedOutput": "0"
          }],
        explanation: "La recursión divide el problema reduciendo el tamaño del arreglo en 1 en cada llamada."
      },
      {
        id: "ex-t1-2",
        title: "Ejercicio Taller 1.2: Longitud de Lista Enlazada",
        description: "Dada la estructura \`struct Nodo { int dato; struct Nodo *siguiente; };\`, escribe la función recursiva \`int contarNodos(struct Nodo *head)\`.",
        cormenRef: "Taller 1 - Recursión en Estructuras Dinámicas",
        initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint contarNodos(struct Nodo *head) {\n  // TODO: Caso base (head == NULL) y recursivo\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Nodo {\n  int dato;\n  struct Nodo *siguiente;\n};\n\nint contarNodos(struct Nodo *head) {\n  if (head == NULL) return 0;\n  return 1 + contarNodos(head->siguiente);\n}",
        hint: "Si head es NULL, retorna 0. Si no, retorna 1 + contarNodos(head->siguiente).",
        testCases: [
          {
                    "id": "t1",
                    "description": "Lista de 3 nodos",
                    "input": "{ dato: 1, siguiente: { dato: 2, siguiente: { dato: 3, siguiente: null } } }",
                    "expectedOutput": "3"
          },
          {
                    "id": "t2",
                    "description": "Lista vacía (NULL)",
                    "input": "null",
                    "expectedOutput": "0"
          }],
        explanation: "Recorrer una lista enlazada recursivamente es la base para operaciones complejas como eliminarla o invertirla."
      },
      {
        id: "ex-t1-3",
        title: "Ejercicio Taller 1.3: MCD (Algoritmo de Euclides)",
        description: "Implementa el algoritmo de Euclides recursivo \`int mcd(int a, int b)\`. Recordando que MCD(a, b) = MCD(b, a % b).",
        cormenRef: "Taller 1 - Matemática Recursiva",
        initialCode: "#include <stdio.h>\n\nint mcd(int a, int b) {\n  // TODO: Caso base (b == 0)\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n\nint mcd(int a, int b) {\n  if (b == 0) return a;\n  return mcd(b, a % b);\n}",
        hint: "El caso base es cuando \`b == 0\`, en cuyo caso el MCD es \`a\`. Si no, retorna \`mcd(b, a % b)\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "MCD(48, 18)",
                    "input": "48, 18",
                    "expectedOutput": "6"
          },
          {
                    "id": "t2",
                    "description": "MCD(101, 10)",
                    "input": "101, 10",
                    "expectedOutput": "1"
          }],
        explanation: "El algoritmo de Euclides es uno de los usos más elegantes y eficientes de la recursión matemática."
      }
    ],
    prevItemId: 'clase-5',
    nextItemId: 'clase-6'
  },
  {
    id: 'clase-6',
    number: 6,
    type: 'class',
    title: 'Clase 6 – Árboles',
    topic: 'Árboles binarios, recorridos (Inorden, Preorden, Postorden) y Árboles Binarios de Búsqueda (BST)',
    cormenChapter: 'Capítulo 12: Árboles Binarios de Búsqueda (Binary Search Trees)',
    durationMinutes: 60,
    summary: 'Estructura jerárquica no lineal: nodos con hijos izquierdo y derecho, propiedad de búsqueda de un BST y recorridos de árbol.',
    theoryContent: `## 1. Anatomía de un Árbol (Terminología Fundamental)
Hasta ahora hemos trabajado con arreglos y listas enlazadas, que son estructuras de datos **lineales** (unidimensionales). Un árbol es una estructura de datos **no lineal** o jerárquica. Según **Cormen Cap. 12**, los árboles representan relaciones donde cada elemento (nodo) puede ramificarse en múltiples direcciones.

**Vocabulario clave:**
*   **Raíz (Root):** El nodo superior del árbol. Es el único nodo que no tiene padre.
*   **Hijo (Child):** Un nodo que desciende directamente de otro nodo.
*   **Padre (Parent):** El nodo inversamente correlativo a un hijo.
*   **Hoja (Leaf):** Un nodo que no tiene hijos (es decir, el final de una rama).
*   **Profundidad (Depth):** La distancia (número de aristas) desde la raíz hasta un nodo específico. La raíz tiene profundidad 0.
*   **Altura (Height):** La mayor profundidad de cualquier nodo en el árbol. La altura de un árbol con un solo nodo es 0.

## 2. Árboles Binarios (Binary Trees)
Un árbol se considera **binario** si cada nodo tiene, como máximo, dos hijos. Por convención, a estos hijos se les llama **hijo izquierdo (left child)** e **hijo derecho (right child)**.

En lenguajes como C o C++, un nodo de árbol binario se define usando punteros:
\`\`\`c
struct Nodo {
    int valor;
    struct Nodo* izquierdo;
    struct Nodo* derecho;
};
\`\`\`

## 3. Árbol Binario de Búsqueda (Binary Search Tree - BST)
Un BST no es un árbol binario cualquiera. Es un árbol binario que cumple una **propiedad invariante** estricta de ordenamiento.

**La Propiedad Invariante del BST:**
Sea $$x$$ un nodo cualquiera en un árbol binario de búsqueda:
1.  Si $$y$$ es un nodo en el **subárbol izquierdo** de $$x$$, entonces $$y.valor \le x.valor$$.
2.  Si $$y$$ es un nodo en el **subárbol derecho** de $$x$$, entonces $$y.valor \ge x.valor$$.

*¿Por qué es esto poderoso?*
Porque nos permite buscar elementos simulando el comportamiento de la Búsqueda Binaria, pero sobre una estructura dinámica. Si buscas el número 50 y la raíz es 100, automáticamente descartas **todo el subárbol derecho** y navegas al hijo izquierdo. El tiempo de búsqueda en el mejor de los casos y en el caso promedio es $$O(\log n)$$.

*(Nota de peligro: Si insertas elementos en un BST en orden secuencial ordenado como 1, 2, 3, 4, 5... el árbol se degenera convirtiéndose en una línea recta (una lista enlazada), resultando en un tiempo de búsqueda peor caso de $$O(n)$$).*

## 4. Recorridos de Árboles (Tree Traversals)
A diferencia de un arreglo donde el recorrido lineal es de $$0$$ a $$n-1$$, en un árbol hay múltiples formas de visitar todos los nodos de la estructura recursivamente. 

### A. Recorrido Preorden (Preorder)
**Secuencia:** Nodo Raíz $$\rightarrow$$ Subárbol Izquierdo $$\rightarrow$$ Subárbol Derecho.
**Aplicación típica:** Se utiliza principalmente para crear una copia (clonar) un árbol o serializar su estructura en un archivo antes de enviarlo por red.
\`\`\`c
void preorden(struct Nodo* n) {
    if (n == NULL) return;
    printf("%d ", n->valor);      // 1. Procesar Raíz
    preorden(n->izquierdo);       // 2. Visitar Izquierda
    preorden(n->derecho);         // 3. Visitar Derecha
}
\`\`\`

### B. Recorrido Inorden (Inorder)
**Secuencia:** Subárbol Izquierdo $$\rightarrow$$ Nodo Raíz $$\rightarrow$$ Subárbol Derecho.
**¡Propiedad Mágica!** Si aplicas un recorrido Inorden a un BST, este visitará los nodos en orden **estrictamente ascendente**. Es la forma de extraer una lista ordenada a partir de un árbol.
\`\`\`c
void inorden(struct Nodo* n) {
    if (n == NULL) return;
    inorden(n->izquierdo);        // 1. Visitar Izquierda
    printf("%d ", n->valor);      // 2. Procesar Raíz
    inorden(n->derecho);          // 3. Visitar Derecha
}
\`\`\`

### C. Recorrido Postorden (Postorder)
**Secuencia:** Subárbol Izquierdo $$\rightarrow$$ Subárbol Derecho $$\rightarrow$$ Nodo Raíz.
**Aplicación típica:** Ideal para procesos destructivos. Se usa al **liberar la memoria** asignada al árbol, ya que procesas los hijos (los eliminas) antes de procesar/eliminar a su propio padre.
\`\`\`c
void postorden(struct Nodo* n) {
    if (n == NULL) return;
    postorden(n->izquierdo);      // 1. Visitar Izquierda
    postorden(n->derecho);        // 2. Visitar Derecha
    printf("%d ", n->valor);      // 3. Procesar Raíz
}
\`\`\`

## 5. Resumen de Complejidad en BST
| Operación | Caso Promedio / Balanceado | Peor Caso (Degenerado) |
| :--- | :---: | :---: |
| Búsqueda | $$O(\log n)$$ | $$O(n)$$ |
| Inserción | $$O(\log n)$$ | $$O(n)$$ |
| Eliminación | $$O(\log n)$$ | $$O(n)$$ |
| Recorrido Total | $$O(n)$$ | $$O(n)$$ |

Para garantizar siempre tiempos de $$\Theta(\log n)$$, en temas avanzados se utilizan variaciones llamadas "Árboles Balanceados", como los árboles AVL o los Árboles Rojo-Negro (Red-Black trees), que aplican rotaciones mecánicas para evitar degeneraciones.

## 6. Aplicaciones en el Mundo Real
Los árboles no son solo conceptos abstractos; son fundamentales en la informática diaria:
*   **Sistemas de Archivos (File Systems):** Tu disco duro (Carpetas, subcarpetas, archivos) se modela con una estructura de árbol general.
*   **DOM (Document Object Model):** El HTML de las páginas web se estructura y procesa en memoria como un árbol de elementos.
*   **Índices de Bases de Datos:** Motores como PostgreSQL o MySQL usan variaciones de árboles (B-Trees o Árboles B+) para acelerar la búsqueda y paginación en millones de registros en $$O(\log n)$$.
*   **Inteligencia Artificial y Toma de Decisiones:** Minimax, Árboles de Decisión y recorridos de estados en IA clásica (como en un motor de ajedrez).
*   **Autocompletado:** Estructuras llamadas Tries (Prefijos) permiten que tu celular sugiera palabras velozmente.

## 7. Materiales de Apoyo y Referencias
*   **Thomas H. Cormen et al., "Introduction to Algorithms", Tercera Edición.**
    *   Capítulo 12: Árboles Binarios de Búsqueda (Definiciones formales y operaciones en BST).
*   **Visualizadores interactivos:** Visualgo.net (BST) permite observar las rotaciones en árboles AVL y cómo se insertan/eliminan nodos.
*   **Comunidad y Repositorios:** Implementaciones modulares de árboles en el repositorio clásico del Kernel de Linux (rbtrees - Red-Black Trees).`,
    visualizerType: 'binary_tree',
    checkQuestions: [
      {
        id: 'q6-1',
        question: 'Si ejecutamos un recorrido INORDEN (Inorder Traversal) sobre un Árbol Binario de Búsqueda (BST), ¿en qué secuencia se procesan las claves?',
        options: [
          'En orden totalmente aleatorio.',
          'En orden estrictamente ascendente (ordenado de menor a mayor).',
          'De mayor a menor obligatoriamente.',
          'En orden de nivel por nivel (Breadth-First).'
        ],
        correctIndex: 1,
        explanation: '¡Excelente! Debido a la propiedad del BST ($Izquierdo \le Raíz \le Derecho$), el recorrido Inorden visita las claves ordenadas perfectamente de menor a mayor.',
        analogousExplanation: 'Imagina una biblioteca ordenada por código: Inorden recorre primero el estante izquierdo (menores), luego la mesa central (raíz) y finalmente el estante derecho (mayores).'
      },
      {
        id: 'q6-2',
        question: 'En términos de terminología de árboles, ¿cómo se define un \'Nodo Hoja\' (Leaf Node)?',
        options: [
          'El nodo superior que sirve como punto de partida.',
          'Un nodo que tiene exactamente un hijo izquierdo.',
          'Un nodo que no tiene ningún hijo (ambos punteros son NULL).',
          'Un nodo que pertenece exclusivamente a un BST.'
        ],
        correctIndex: 2,
        explanation: 'Correcto. Una hoja representa el punto terminal de un árbol. Al no tener ramificaciones adicionales, sus punteros `izquierdo` y `derecho` son `NULL`.',
        analogousExplanation: 'Es el extremo literal de la rama de un árbol real: donde termina el crecimiento y no salen brotes nuevos.'
      },
      {
        id: 'q6-3',
        question: '¿Cuál es el riesgo de complejidad temporal o \'Peor Caso\' (Worst Case) al insertar una secuencia de números ya ordenados (ej. 1, 2, 3, 4, 5) en un BST simple?',
        options: [
          'El árbol se vuelve un árbol AVL y mantiene $O(\log n)$.',
          'La inserción falla por violación de tipo.',
          'El árbol se degenera en una lista enlazada (línea recta), resultando en operaciones $O(n)$.',
          'El tiempo mejora a $O(1)$ porque los datos ya están en orden.'
        ],
        correctIndex: 2,
        explanation: '¡Muy bien! Un BST simple no se balancea solo. Insertar datos ordenados crea ramas que solo van hacia la derecha, arruinando la propiedad de división dicotómica y escalando la búsqueda a $O(n)$.',
        analogousExplanation: 'Es como intentar jugar al \'Adivina Quién\' pero todas tus preguntas solo logran descartar a una persona a la vez, en lugar de dividir el tablero a la mitad.'
      },
      {
        id: 'q6-4',
        question: 'Si estás escribiendo una función recursiva para eliminar un árbol completo de la memoria liberando (free) sus nodos, ¿qué recorrido deberías usar?',
        options: [
          'Preorden (Preorder)',
          'Inorden (Inorder)',
          'Postorden (Postorder)',
          'No importa el recorrido'
        ],
        correctIndex: 2,
        explanation: '¡Exacto! Con Postorden primero liberas el subárbol izquierdo, luego el subárbol derecho, y solo al final liberas el nodo padre (Raíz). Si usaras Preorden, liberarías la raíz primero y perderías los punteros a sus hijos.',
        analogousExplanation: 'Como desarmar una pirámide de vasos: si quitas la base primero (la raíz en Preorden), todo colapsa. Debes quitar los bordes exteriores (los hijos en Postorden) antes de quitar el centro.'
      }
    ],
    exercises: [
      {
        id: "ex-6",
        title: "Ejercicio 6: Búsqueda en un Árbol Binario de Búsqueda (BST) en C",
        description: "Dada la estructura `struct NodoBST { int valor; struct NodoBST *izq; struct NodoBST *der; };`, escribe la función `bool buscarBST(struct NodoBST *raiz, int x)` que devuelva `true` si `x` está en el BST o `false` en caso contrario.",
        cormenRef: "Cormen Cap 12.2 - Búsqueda en Árboles BST",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  if (raiz == NULL) return false;\n  // TODO: Compara raiz->valor con x para decidir ir a la izquierda o derecha\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nbool buscarBST(struct NodoBST *raiz, int x) {\n  if (raiz == NULL) return false;\n  if (raiz->valor == x) return true;\n  if (x < raiz->valor) {\n    return buscarBST(raiz->izq, x);\n  } else {\n    return buscarBST(raiz->der, x);\n  }\n}",
        hint: "Si `raiz->valor == x`, retorne `true`. Si `x < raiz->valor`, busque en `raiz->izq`, de lo contrario en `raiz->der`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Buscar 15 en raíz valor=10 (der con 15)",
                    "input": "{ valor: 10, izq: null, der: { valor: 15, izq: null, der: null } }, 15",
                    "expectedOutput": "true"
          },
          {
                    "id": "t2",
                    "description": "Buscar 99 no existente",
                    "input": "{ valor: 10, izq: null, der: null }, 99",
                    "expectedOutput": "false"
          }
],
        explanation: "Aprovecha la propiedad del BST: los valores menores están en el subárbol izquierdo y los mayores en el derecho, ofreciendo búsqueda en $O(h)$."
      }
    ],
    prevItemId: 'taller-1',
    nextItemId: 'clase-7'
  },

  {
    id: 'clase-7',
    number: 7,
    type: 'review',
    title: 'Clase 7 – Repaso Integrador (Listas, Recursión y Árboles)',
    topic: 'Sesión de consolidación de conceptos fundamentales antes del Análisis Asintótico',
    cormenChapter: 'Consolidación de Capítulos 4, 10 y 12',
    durationMinutes: 50,
    summary: 'Conectar las estructuras de datos dinámicas con el razonamiento recursivo. Desafíos integrados.',
    theoryContent: `## 1. El Triángulo de Hierro: Estructuras, Punteros y Recursión
Has llegado a la mitad del curso. Hasta aquí hemos construido herramientas fundamentales en C: manejamos punteros, enlazamos nodos en memoria dinámica, los estructuramos linealmente (Listas) y jerárquicamente (Árboles), y utilizamos la Pila de Llamadas (Recursión) para navegarlos.

Estos tres conceptos no son temas aislados, conforman el **Triángulo de Hierro de las Estructuras de Datos Dinámicas**:
*   **La Estructura (Nodos)** define *dónde* está la información.
*   **Los Punteros** definen *cómo* se conecta esa información con el resto.
*   **La Recursión** define *cómo* pensamos algoritmos para navegar estas conexiones.

## 2. Unificando Listas y Árboles
Si observamos una **Lista Enlazada Simplemente**, notaremos que cada nodo apunta a exactamente un sucesor. En términos matemáticos abstractos, ¡una lista enlazada es simplemente un árbol degenerado donde cada nodo solo puede tener un hijo!

Por eso, el caso base para ambos siempre es el mismo: llegar a un puntero \`NULL\`. Y el caso recursivo se trata de dar un salto hacia adelante (\`head->next\` o \`raiz->izquierdo\`).

## 3. Patrones de Diseño Recursivo en C
Repasemos los tres patrones mentales recurrentes que has aprendido:

*   **El Salto de Fe:** Cuando quieres invertir una lista, confías ciegamente en que \`invertir(head->next)\` hará todo el trabajo pesado por ti. Solo te encargas de arreglar el enlace del nodo actual.
*   **El Procesamiento Post-Retorno:** Todo el código que escribes en una función recursiva *después* de la propia llamada recursiva, se ejecuta en el camino de regreso (cuando la pila se está vaciando). Es por eso que imprimir *después* de \`recorrer(head->next)\` imprime la lista al revés.
*   **La Subdivisión Dicotómica (Divide y Vencerás temprano):** Al buscar en un Árbol Binario de Búsqueda (BST), la recursión toma decisiones de ruteo: "¿Me voy por la izquierda o por la derecha?". Esto destruye la mitad del problema en cada salto de pila, llevándonos al codiciado $$O(\log n)$$.

## 4. Peligros y Limitaciones de la Recursión
A pesar de su elegancia, la recursión no es gratuita:
*   **El costo oculto en RAM:** Cada vez que una función se llama a sí misma, reserva un bloque de memoria (Stack Frame) para sus variables locales. Si tienes una lista enlazada de 100,000 elementos e intentas recorrerla recursivamente, la Pila del Sistema Operativo se desbordará (**Stack Overflow**) y el programa crasheará violentamente.
*   **Solución (Clase 8 en adelante):** Siempre que sea posible optimizar el espacio (especialmente en estructuras puramente lineales), preferimos recorrerlas con un bucle \`while\` tradicional para mantener un consumo de memoria $$O(1)$$. Para árboles, la recursión se justifica plenamente debido a la altura logarítmica de la pila.

## 5. Resumen del Flujo de Datos
| Estructura | Acceso | Crecimiento | Navegación recomendada | Complejidad de Búsqueda (Promedio) |
| :--- | :--- | :--- | :--- | :--- |
| **Arreglo (Array)** | Aleatorio (Índices) | Fijo (al declarar) | Iterativa (\`for\`) | $$O(n)$$ o $$O(\log n)$$ si ordenado |
| **Lista Enlazada** | Secuencial | Dinámico (infinito) | Iterativa (\`while\`) | $$O(n)$$ |
| **Árbol BST** | Jerárquico/Dicotómico | Dinámico (infinito) | Recursiva | $$O(\log n)$$ |

## 6. Aplicaciones en el Mundo Real
Estas tres estructuras fundamentales se combinan para crear sistemas masivos:
*   **Bases de Datos en Memoria:** Bases de datos ultra rápidas como Redis implementan complejas listas doblemente enlazadas debajo del capó.
*   **Compiladores e Intérpretes:** Tu código JavaScript (o este mismo texto Markdown) es convertido por el motor del navegador en un Árbol de Sintaxis Abstracta (AST). El motor luego aplica recursión (postorden) para evaluar las matemáticas y ejecutar tu código paso a paso.
*   **Algoritmos de Enrutamiento:** Cómo llegan los paquetes de Internet a tu casa depende de grafos, los cuales son una generalización libre de los árboles.

## 7. Materiales de Apoyo y Referencias
*   **Thomas H. Cormen et al., "Introduction to Algorithms", Tercera Edición.**
    *   **Capítulo 10 (Estructuras de Datos Elementales):** Para reforzar pilas, colas y listas enlazadas en general.
    *   **Capítulo 12 (Árboles Binarios de Búsqueda):** Revisa el Teorema 12.1 sobre los recorridos de árboles.
*   **Práctica Complementaria:** Te sugerimos implementar, por tu cuenta, la inserción de un nodo en un árbol BST en C (combinación perfecta de punteros y recursión).`,
    visualizerType: 'binary_tree',
    checkQuestions: [
      {
        id: 'q7-1',
        question: '¿Por qué la mayoría de las operaciones sobre árboles binarios se escriben de forma recursiva?',
        options: [
          'Porque los árboles son estructuras naturalmente recursivas donde cada subárbol es en sí mismo un árbol binario.',
          'Porque C no permite bucles sobre árboles.',
          'Porque la recursión usa menos memoria que un bucle iterativo.',
          'Porque el libro de Cormen lo exige obligatoriamente.'
        ],
        correctIndex: 0,
        explanation: '¡Exacto! El caso base suele ser el árbol vacío (null) y el caso recursivo procesa la raíz y llama recursivamente a left y right.',
        analogousExplanation: 'Un árbol botánico real está hecho de ramas: si cortas una rama principal, parece un árbol más pequeño completo.'
      },
      {
        id: 'q7-2',
        question: 'En términos estructurales, ¿cuál de las siguientes afirmaciones describe mejor a una Lista Enlazada Simplemente?',
        options: [
          'Es un arreglo dinámico sin tamaño fijo.',
          'Es un tipo especial de matriz bidimensional.',
          'Es, en esencia, un árbol degenerado donde cada nodo tiene únicamente un "hijo" (sucesor).',
          'Es una estructura de acceso aleatorio directo $O(1)$.'
        ],
        correctIndex: 2,
        explanation: '¡Correcto! Matemáticamente, una lista es un árbol donde todos los nodos solo tienen un subárbol, perdiendo la ramificación dicotómica pero reteniendo la estructura de punteros dependientes.',
        analogousExplanation: 'Una lista enlazada es un árbol que creció como una palmera de un solo tronco alto, sin ramas a los lados.'
      },
      {
        id: 'q7-3',
        question: '¿Cuál es el peligro principal de recorrer una Lista Enlazada de 1,000,000 de nodos utilizando recursión en C?',
        options: [
          'El programa se ejecutará pero será muy lento debido a la fragmentación del Heap.',
          'Desencadenará un Stack Overflow (Desbordamiento de Pila) y el programa crasheará.',
          'Perderá los datos en el proceso de retorno si no hay return explícito.',
          'Ninguno, la recursión es segura y óptima para listas infinitas.'
        ],
        correctIndex: 1,
        explanation: 'Muy bien. Al apilar 1,000,000 de Stack Frames para las llamadas recursivas de la lista, la pila del SO estalla. Por eso preferimos bucles iterativos $O(1)$ en memoria para listas inmensamente largas.',
        analogousExplanation: 'Es como pedirle a tu cerebro que memorice 1 millón de pasos para ir al baño antes de dar el primer paso; te agotarás mentalmente antes de arrancar. Mejor solo memorizar "el siguiente paso".'
      },
      {
        id: 'q7-4',
        question: 'Durante la recursión (por ejemplo al recorrer una lista), ¿cuándo se ejecuta el código que escribimos DESPUÉS de la llamada a sí misma?',
        options: [
          'Antes del caso base.',
          'En paralelo, en un hilo secundario.',
          'Inmediatamente después de la invocación.',
          'En el camino de retorno, a medida que la pila de llamadas se va vaciando (desenrollando).'
        ],
        correctIndex: 3,
        explanation: 'Correcto. Todo lo que va después de la llamada recursiva, es el "Procesamiento Post-Retorno" que opera una vez que el problema alcanzó el fondo (caso base) y rebota hacia atrás.',
        analogousExplanation: 'Como recoger las migajas de pan que dejaste al entrar al bosque: solo las recoges en el camino de vuelta a casa.'
      },
      {
        id: 'q7-5',
        question: 'Si tienes 1,000,000 de usuarios ordenados por ID, ¿cuál es la diferencia clave entre buscarlos en una Lista Enlazada vs. un Árbol Binario de Búsqueda (BST) perfectamente balanceado?',
        options: [
          'Ambos tardan lo mismo porque deben procesar punteros secuencialmente.',
          'La lista toma un máximo de ~1 millón de pasos ($O(n)$), mientras que el BST encuentra al usuario en máximo ~20 pasos ($O(\\log n)$).',
          'El BST es más lento porque requiere verificar dos punteros (izquierdo y derecho) por nodo.',
          'La lista enlazada permite búsqueda binaria directa si está ordenada, igualando al BST.'
        ],
        correctIndex: 1,
        explanation: '¡Exacto! Aunque la lista esté ordenada, al ser secuencial debes iterar uno por uno ($O(n)$). El BST permite ramificar (dividir por dos) en cada paso, logrando $O(\\log n)$ ($2^{20} \\approx 1,000,000$).',
        analogousExplanation: 'Buscar en la lista es leer un libro de 1 millón de páginas desde el principio. Buscar en el BST es abrir el libro a la mitad, ver si te pasaste, y repetir con la mitad restante (¡solo abres el libro 20 veces!).'
      },
      {
        id: 'q7-6',
        question: 'Al escribir una función recursiva pura en C, ¿por qué calcular la "longitud de una lista" y calcular la "altura de un árbol" comparten el mismo caso base estructural?',
        options: [
          'Porque ambas operaciones requieren matemáticas de tiempo constante $O(1)$.',
          'Porque el lenguaje C asume que todos los punteros apuntan a 0 al inicializarse.',
          'Porque ambas estructuras terminan obligatoriamente en un puntero nulo (NULL), indicando la ausencia de datos a procesar.',
          'Porque Cormen define ambas operaciones usando variables globales estáticas.'
        ],
        correctIndex: 2,
        explanation: '¡Excelente conexión! Ya sea `head == NULL` o `raiz == NULL`, el caso base para estructuras dinámicas siempre representa "llegamos a un vacío que tiene longitud/altura 0".',
        analogousExplanation: 'Ambos son como medir un río: el caso base es cuando llegas al lugar exacto donde el río se seca y ya no hay agua.'
      }
    ],
    exercises: [
      {
        id: "ex-7",
        title: "Ejercicio 7: Calcular la Altura Recursiva de un Árbol en C",
        description: "Escribe una función en C `int calcularAltura(struct NodoBST *raiz)` que calcule la altura de un árbol binario recursivamente (un árbol vacío `NULL` tiene altura 0).",
        cormenRef: "Cormen Cap 12.1 - Propiedades de Árboles",
        initialCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  // Caso base: si raiz == NULL retorna 0\n  // Caso recursivo: 1 + maxVal(calcularAltura(izq), calcularAltura(der))\n  \n  // TODO: Escribe el código en C\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdlib.h>\n\nstruct NodoBST {\n  int valor;\n  struct NodoBST *izq;\n  struct NodoBST *der;\n};\n\nint maxVal(int a, int b) {\n  return (a > b) ? a : b;\n}\n\nint calcularAltura(struct NodoBST *raiz) {\n  if (raiz == NULL) return 0;\n  return 1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der));\n}",
        hint: "Si `raiz == NULL`, retorna 0. Retorna `1 + maxVal(calcularAltura(raiz->izq), calcularAltura(raiz->der))`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Árbol con raíz y un hijo",
                    "input": "{ valor: 10, izq: { valor: 5, izq: null, der: null }, der: null }",
                    "expectedOutput": "2"
          },
          {
                    "id": "t2",
                    "description": "Árbol vacío (NULL)",
                    "input": "null",
                    "expectedOutput": "0"
          }
],
        explanation: "La altura se calcula desde las hojas hacia la raíz sumando 1 por cada nivel del camino más largo."
      }
    ],
    prevItemId: 'clase-6',
    nextItemId: 'clase-8'
  },

  {
    id: 'clase-8',
    number: 8,
    type: 'class',
    title: 'Clase 8 – Análisis Asintótico',
    topic: 'Notaciones Big-O (O), \\Omega (Ω) y \\Theta (Θ), análisis de peores/mejores casos y reglas prácticas',
    cormenChapter: 'Capítulo 3: Crecimiento de las funciones (Asymptotic Notation)',
    durationMinutes: 65,
    summary: 'Aprender la notación matemática formal para clasificar algoritmos ignorando constantes insignificantes a gran escala.',
    theoryContent: `## 1. La Necesidad del Análisis Asintótico
Cuando analizamos la eficiencia de un algoritmo, no nos interesan los milisegundos exactos en una computadora determinada, ya que el hardware cambia constantemente. Lo que realmente importa es la **tasa de crecimiento** del tiempo de ejecución (o uso de memoria) a medida que el tamaño de la entrada ($n$) tiende a infinito ($n \\to \\infty$). Según Cormen (CLRS Cap. 3), para esto utilizamos las notaciones asintóticas.

## 2. Definiciones Formales: $O$, $\\Omega$ y $\\Theta$
Existen tres notaciones fundamentales para clasificar funciones de tiempo $f(n)$:

*   **Big-O ($O$) - Cota Superior (El Peor Caso):** 
    $O(g(n))$ es el conjunto de funciones $f(n)$ para las cuales existen constantes positivas $c$ y $n_0$ tales que:
    $0 \\le f(n) \\le c \\cdot g(n)$ para todo $n \\ge n_0$.
    *Significado:* $f(n)$ crece **a lo sumo** tan rápido como $g(n)$.
*   **Big-Omega ($\\Omega$) - Cota Inferior (El Mejor Caso):**
    $\\Omega(g(n))$ es el conjunto de funciones $f(n)$ para las cuales existen constantes positivas $c$ y $n_0$ tales que:
    $0 \\le c \\cdot g(n) \\le f(n)$ para todo $n \\ge n_0$.
    *Significado:* $f(n)$ crece **al menos** tan rápido como $g(n)$.
*   **Big-Theta ($\\Theta$) - Cota Estricta (Tasa Exacta):**
    $\\Theta(g(n))$ significa que $f(n)$ pertenece tanto a $O(g(n))$ como a $\\Omega(g(n))$.
    *Significado:* $f(n)$ crece **exactamente** al mismo ritmo que $g(n)$ (ignorando factores constantes).

## 3. La "Carrera" Matemática: Demostrando Cotas
Imagina una carrera entre dos funciones a medida que $n$ crece. Vamos a demostrar formalmente que $3n^2 = O(n^3)$.

Queremos encontrar constantes $c > 0$ y $n_0 > 0$ tales que:
$3n^2 \\le c \\cdot n^3$ para todo $n \\ge n_0$.

Si dividimos ambos lados por $n^2$ (asumiendo que $n > 0$), obtenemos:
$3 \\le c \\cdot n$

Si elegimos la constante $c = 1$, necesitamos que $3 \\le 1 \\cdot n$, lo cual es matemáticamente cierto para cualquier $n \\ge 3$.
**Conclusión:** Hemos demostrado que $3n^2 = O(n^3)$ usando $c = 1$ y $n_0 = 3$. La función cúbica siempre "alcanza y supera" asintóticamente a la cuadrática.

## 4. Reglas Prácticas para Código C
En el día a día, no hacemos demostraciones formales para cada línea de código. Usamos reglas prácticas: descartamos las constantes multiplicativas y nos quedamos únicamente con el término de mayor orden dominancia.

**Ejemplo A: Operaciones Secuenciales $\\rightarrow O(1)$**
\`\`\`c
int x = a + b; // O(1)
int y = x * 2; // O(1)
// Total: O(1) + O(1) = O(1)
\`\`\`

**Ejemplo B: Bucle Simple $\\rightarrow O(n)$**
\`\`\`c
for (int i = 0; i < n; i++) {
    printf("%d", i); // Se ejecuta 'n' veces
}
// Total: O(n)
\`\`\`

**Ejemplo C: Bucles Anidados Independientes $\\rightarrow O(n^2)$**
\`\`\`c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        matriz[i][j] = 0; // Se ejecuta n * n veces
    }
}
// Total: O(n^2)
\`\`\`

**Ejemplo D: Bucle con Salto Logarítmico $\\rightarrow O(\\log n)$**
\`\`\`c
int i = 1;
while (i < n) {
    i = i * 2; // El problema se reduce a la mitad en cada paso
}
// Total: O(log n)
\`\`\`

## 5. Aplicaciones en el Mundo Real
*   **Escalabilidad en la Nube:** Si un algoritmo de análisis de datos es $O(n^2)$, al duplicar el tamaño de la base de datos (de 1 a 2 millones de registros), el servidor no tardará el doble, ¡tardará 4 veces más! Optimizarlo a $O(n \\log n)$ ahorra literalmente miles de dólares en costos de AWS o Google Cloud.
*   **Contratos Inteligentes (Blockchain):** En Ethereum, cada operación cuesta "Gas" (dinero real). Un bucle $O(n)$ mal diseñado puede encarecer tanto una transacción que el contrato se vuelve inutilizable si los datos crecen demasiado, forzando a los ingenieros a usar mapas Hash de $O(1)$.

## 6. Materiales de Apoyo y Referencias
*   **Thomas H. Cormen et al., "Introduction to Algorithms", Tercera Edición.**
    *   **Capítulo 3 (Growth of Functions):** Definición rigurosa de las notaciones asintóticas y propiedades algebraicas de polinomios y logaritmos.
*   **Visualizaciones de Complejidad:** El sitio interactivo "Big-O Cheat Sheet" ofrece gráficos cartesianos de cómo $O(\\log n)$, $O(n)$ y $O(n^2)$ se separan radicalmente al crecer la entrada.`,
    visualizerType: 'none',
    checkQuestions: [
        {
            id: 'q8-1',
            question: 'Según la definición formal de la notación Big-O (Cota Superior), si decimos que $f(n) = O(g(n))$, ¿qué estamos garantizando matemáticamente?',
            options: [
                'Que $f(n)$ es exactamente igual a $g(n)$ en todo momento.',
                'Que a partir de cierto punto $n_0$, $f(n)$ siempre será menor o igual a un múltiplo constante de $g(n)$.',
                'Que el algoritmo ejecutará $g(n)$ instrucciones exactas en milisegundos.',
                'Que $f(n)$ crece infinitamente más rápido que $g(n)$.'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! La desigualdad $0 \\le f(n) \\le c \\cdot g(n)$ para $n \\ge n_0$ asegura que $g(n)$ actúa como un "techo" asintótico (una cota superior) para la función $f(n)$.',
            analogousExplanation: 'Es como decir "Mi gasto mensual ($f$) nunca será mayor que el doble de tu salario ($g$) a partir del año que viene ($n_0$)".'
        },
        {
            id: 'q8-2',
            question: 'En la demostración de la "carrera" donde probamos que $3n^2 = O(n^3)$, ¿qué papel juegan las constantes $c$ y $n_0$?',
            options: [
                'Sirven para convertir la ecuación en un logaritmo.',
                'Son variables que el usuario ingresa por teclado durante la ejecución.',
                'Demuestran el punto de cruce ($n_0$) y el factor multiplicativo ($c$) a partir de los cuales la cota superior envuelve definitivamente a la función original.',
                'Indican la cantidad de memoria RAM ($c$) y el tamaño máximo del disco duro ($n_0$).'
            ],
            correctIndex: 2,
            explanation: '¡Muy bien! $n_0$ define "a partir de qué tamaño de entrada nos importa" y $c$ permite escalar la cota superior para acomodar detalles constantes, validando la desigualdad.',
            analogousExplanation: 'Como en una carrera donde a un corredor lento ($n^2$) se le da ventaja, sabemos que el corredor más rápido ($n^3$) con paso firme ($c$) eventualmente lo pasará a partir del kilómetro $n_0$, y nunca volverá a estar detrás.'
        },
        {
            id: 'q8-3',
            question: 'Analiza el siguiente bucle anidado no trivial:\n`for(int i=0; i<n; i++) { for(int j=i; j<n; j++) { /* O(1) */ } }`\n¿Cuál es la complejidad asintótica de este fragmento?',
            options: [
                '$O(n)$ porque la variable `j` depende de `i` y los bucles se cancelan.',
                '$O(n^2)$ porque la suma total de iteraciones corresponde a una serie aritmética (aprox. $n^2 / 2$).',
                '$O(n \\log n)$ porque el bucle interno se va achicando.',
                '$O(n^3)$ por tener dos variables y una condición combinada.'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! Aunque el bucle interno no hace `n` iteraciones completas siempre, el primer paso hace `n`, el segundo `n-1`, luego `n-2`... Esto forma una serie aritmética $(n * (n+1))/2$, que ignorando constantes y términos menores, sigue siendo $O(n^2)$.',
            analogousExplanation: 'Imagina lavar ventanas en un edificio de `n` pisos. Si lavas todas las de tu piso actual y las de los pisos de arriba, a medida que subes lavas menos, pero el total de ventanas lavadas sigue escalando cuadráticamente.'
        },
        {
            id: 'q8-4',
            question: 'Si un algoritmo tiene una función de costo $f(n) = 5000n + 9999999$, ¿cómo se simplifica en notación Big-O?',
            options: [
                '$O(5000n)$',
                '$O(9999999)$',
                '$O(n)$',
                '$O(1)$ porque las constantes dominan.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. En el análisis asintótico a gran escala ($n \\to \\infty$), el término lineal domina. Descartamos la constante aditiva (9999999) y el factor multiplicativo (5000), resultando en $O(n)$.',
            analogousExplanation: 'Si vas a comprar un planeta, no te importa si además te cobran $9999999 de envío. Solo te importa la escala intergaláctica del precio (la $n$).'
        },
        {
            id: 'q8-5',
            question: '¿Cuál es la diferencia fundamental entre las notaciones Big-O ($O$) y Big-Omega ($\\Omega$)?',
            options: [
                'Big-O mide el uso de memoria RAM, mientras Big-Omega mide la velocidad del CPU.',
                'Big-O es para lenguajes compilados y Big-Omega para interpretados.',
                'Big-O establece un límite de crecimiento MÁXIMO (Cota Superior, "no peor que"), mientras que Big-Omega establece un límite MÍNIMO (Cota Inferior, "al menos esto").',
                'Son exactamente lo mismo, pero se inventaron en distintas universidades.'
            ],
            correctIndex: 0,
            explanation: 'O(g(n)) establece un límite superior (peor caso). Omega(g(n)) establece un límite inferior (mejor caso). Theta(g(n)) significa que está acotado por ambos lados (crece exactamente a ese ritmo).',
            analogousExplanation: 'O() es decir "Tardaré máximo 1 hora". Omega() es "Tardaré al menos 30 min". Theta() es "Tardaré exactamente entre 30 min y 1 hora".'
        }
    ],
    exercises: [
      {
        id: "ex-8",
        title: "Ejercicio 8: Identificación de Complejidad Cuadrática en C",
        description: "Escribe una función en C `int analizarMatriz(int n)` con dos bucles `for` anidados que cuente y devuelva la cantidad total de iteraciones $n \\times n$.",
        cormenRef: "Cormen Cap 3.1 - Notaciones Asintóticas",
        initialCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  // TODO: Escribe dos bucles anidados i de 0 a n-1 y j de 0 a n-1 incrementando contador\n  return contador;\n}",
        solutionCode: "#include <stdio.h>\n\nint analizarMatriz(int n) {\n  int contador = 0;\n  for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n      contador++;\n    }\n  }\n  return contador;\n}",
        hint: "Escribe un bucle `for(int i=0; i<n; i++)` que contenga `for(int j=0; j<n; j++) contador++;`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Para n = 4",
                    "input": "4",
                    "expectedOutput": "16"
          },
          {
                    "id": "t2",
                    "description": "Para n = 10",
                    "input": "10",
                    "expectedOutput": "100"
          }
        ],
        explanation: "La complejidad es $O(n^2)$ porque por cada una de las $n$ iteraciones del bucle exterior, el bucle interior se ejecuta $n$ veces."
      }
    ],
    prevItemId: 'clase-7'
  },
  {
    id: 'clase-9',
    number: 9,
    type: 'class',
    title: 'Clase 9 – Recurrencias y Método Maestro',
    topic: 'Resolución de árboles de recursión y el Teorema Maestro (Cormen)',
    cormenChapter: 'Capítulo 4 (Divide-and-Conquer)',
    durationMinutes: 60,
    summary: 'Aprende a calcular matemáticamente el costo de los algoritmos recursivos divide-y-vencerás con el poderoso Método Maestro.',
    theoryContent: `### El Costo de Dividir y Vencer (Cormen Cap 4)
Cuando un algoritmo se llama a sí mismo partiendo el problema en partes más pequeñas (ej. Mergesort), su tiempo de ejecución se expresa con una Ecuación de Recurrencia:
$$T(n) = aT(n/b) + f(n)$$

#### El Teorema Maestro
Es una "receta" directa para resolver la mayoría de estas recurrencias sin dibujar árboles inmensos. Compara la velocidad a la que el problema "crece" (ramas del árbol $n^{\log_b a}$) versus el "costo" de unir las ramas ($f(n)$).

Hay tres casos:
1.  **Caso 1 (El Árbol Pesa Más):** Si $f(n)$ es polinómicamente menor que $n^{\log_b a}$, el trabajo en las hojas domina. Complejidad: $\Theta(n^{\log_b a})$.
2.  **Caso 2 (Empate):** Si $f(n)$ es similar a $n^{\log_b a}$, multiplicamos por $\log n$. Complejidad: $\Theta(n^{\log_b a} \log n)$.
3.  **Caso 3 (La Raíz Pesa Más):** Si $f(n)$ es polinómicamente mayor y cumple regularidad, el trabajo de unir los pedazos domina. Complejidad: $\Theta(f(n))$.
`,
    visualizerType: 'none',
    checkQuestions: [
        {
            id: 'q9-1',
            question: 'En la recurrencia de Mergesort $T(n) = 2T(n/2) + O(n)$, ¿qué significa la función $f(n) = O(n)$?',
            options: [
                'El tiempo para dividir el problema y luego mezclar (merge) las dos mitades ordenadas.',
                'El número de nodos en el nivel más profundo del árbol.',
                'La memoria RAM que consume el algoritmo.',
                'El límite de llamadas recursivas antes de un Stack Overflow.'
            ],
            correctIndex: 0,
            explanation: 'Correcto. $f(n)$ representa el trabajo "extra" realizado en ese nivel del árbol. En Mergesort, dividir toma $O(1)$, pero mezclar dos mitades de tamaño $n/2$ toma $O(n)$ pasos.',
            analogousExplanation: ''
        }
    ],
    exercises: [],
    prevItemId: 'clase-8'
  },
  {
    id: 'taller-2',
    number: 2,
    type: 'workshop',
    title: 'Taller 2 – Análisis Asintótico y Recurrencias (Taller Obligatorio)',
    topic: 'Taller',
    cormenChapter: 'Taller Práctico sobre Cap 3 y 4',
    durationMinutes: 45,
    summary: 'Consolida tu habilidad para aplicar notación asintótica y el Método Maestro a problemas reales de código.',
    theoryContent: `### Taller Práctico: Análisis y Recurrencias
Este taller pondrá a prueba tu capacidad para observar un código e identificar instantáneamente su complejidad, y usar el Método Maestro.
`,
    visualizerType: 'none',
    checkQuestions: [
        {
            id: 'qt2-1',
            question: '¿A qué caso del Método Maestro pertenece $T(n) = 2T(n/2) + O(n)$?',
            options: [
                'Caso 1',
                'Caso 2 (Empate)',
                'Caso 3',
                'No se puede aplicar'
            ],
            correctIndex: 1,
            explanation: 'Es el Caso 2, resolviendo a $O(n \log n)$.',
            analogousExplanation: ''
        }
    ],
    exercises: [],
    prevItemId: 'clase-9'
  },
  {
    id: 'clase-10',
    number: 10,
    type: 'class',
    title: 'Clase 10 – Algoritmos de Búsqueda',
    topic: 'Búsqueda Lineal, Binaria y Variantes',
    cormenChapter: 'Fundamentos de Búsqueda',
    durationMinutes: 45,
    summary: 'De la búsqueda secuencial $O(n)$ a la poderosa búsqueda binaria $O(\\log n)$ en arreglos ordenados, incluyendo variantes y búsqueda por interpolación.',
    theoryContent: `## 1. Introducción y Motivación
La recuperación de información es el corazón de la informática moderna. Ya sea buscar un nombre en una agenda, localizar el historial de transacciones de un usuario en un banco, o identificar un registro específico en una base de datos de millones de filas, la eficiencia del algoritmo de búsqueda determina si un sistema es útil o inoperable. 

Imagina un arreglo con 1,000 millones de elementos. Si utilizamos el enfoque más básico, podríamos requerir 1,000 millones de comprobaciones para encontrar lo que buscamos. Si logramos estructurar y comprender nuestros datos, podemos reducir ese número de operaciones a tan solo **30 comprobaciones**. Esa es la diferencia abismal entre la búsqueda lineal y la binaria, y subraya la importancia del ordenamiento previo y las estructuras de datos correctas.

---

## 2. Búsqueda Lineal (Sequential Search)
El algoritmo más primitivo, simple y robusto. Revisa un elemento tras otro desde el índice 0 hasta el final. No hace absolutamente ninguna suposición sobre la naturaleza de los datos ni su distribución.

*   **Complejidad:** $O(n)$ en el peor caso (el elemento no existe o está en la última posición). $O(1)$ en el mejor caso (está en la primera posición).
*   **Cuándo usar:** Arreglos desordenados, colecciones muy pequeñas donde la sobrecarga de un algoritmo complejo no justifica el tiempo ahorrado, o en listas enlazadas simples donde no hay acceso aleatorio a memoria (por índice).

---

## 3. Búsqueda Binaria (Binary Search)
El milagro de la escala logarítmica y una aplicación pura del paradigma *Divide y Vencerás*. Requiere estrictamente que el arreglo esté **previamente ordenado** y que se pueda acceder a cualquier índice en $O(1)$ (como ocurre en los arreglos de memoria contigua).

El algoritmo se posiciona matemáticamente en la mitad exacta, compara la clave buscada con el valor central, y descarta instantáneamente la mitad irrelevante del arreglo, repitiendo el proceso en el subarreglo restante de forma recursiva o iterativa.

*   **Complejidad:** $\\Theta(\\log n)$.

### Demostración: ¿Por qué falla fatalmente si el arreglo está desordenado?
Imagina intentar buscar el número \`2\` utilizando Búsqueda Binaria en el arreglo desordenado \`[10, 3, 7, 2, 8]\`.
1.  Calculamos el índice medio: \`2\` (cuyo valor es \`7\`).
2.  Como el valor buscado \`2 < 7\`, el algoritmo **asume ciegamente** (por la regla matemática del ordenamiento) que *todos* los valores menores a 7 deben estar obligatoriamente a su izquierda.
3.  Descarta sin contemplaciones la mitad derecha entera (\`[2, 8]\`) y continúa buscando solo en la porción izquierda \`[10, 3]\`.
4.  El \`2\` real acaba de quedar descartado para siempre de la zona de búsqueda. El algoritmo terminará concluyendo erróneamente que el número "no existe" (Falso Negativo).

---

## 4. Variantes de la Búsqueda Binaria (Manejo de Duplicados)
Si un arreglo ordenado contiene elementos repetidos (por ejemplo, \`[1, 2, 2, 2, 5]\`), la búsqueda binaria clásica es inestable: retornará la posición de cualquier ocurrencia aleatoria en el medio, dependiendo puramente de cómo caigan las divisiones. A menudo necesitamos saber los límites exactos de esos duplicados.

*   **Encontrar la primera ocurrencia (Lower Bound):** Cuando el algoritmo encuentra el valor (\`A[mid] == target\`), en lugar de retornar inmediatamente, **guarda \`mid\` como un posible candidato** y *continúa buscando obsesivamente hacia la izquierda* (\`high = mid - 1\`) para verificar si existe una ocurrencia aún más temprana.
*   **Encontrar la última ocurrencia (Upper Bound):** Exactamente la lógica inversa. Al encontrar el valor, guarda el índice y **continúa buscando hacia la derecha** (\`low = mid + 1\`) para estirar la frontera lo más posible.

---

## 5. Interpolation Search (Búsqueda por Interpolación)
Piensa en cómo interactúas en la vida real. ¿Cómo buscas a la familia "Zapata" en un directorio telefónico físico? Jamás abres el libro exactamente por la mitad geométrica (letra M o N). Instintivamente lo abres casi en el 90% del lomo.

*   **Concepto:** En lugar de dividir siempre el espacio entre 2 de manera rígida, este algoritmo estima la posición esperada del elemento interpolando matemáticamente su valor relativo contra el rango actual \`[min, max]\` de valores en los extremos del arreglo.
*   **Complejidad Promedio:** $O(\\log \\log n)$. Para 1,000 millones de elementos, tomaría alrededor de **5 operaciones** (en lugar de las 30 de la búsqueda binaria). ¡Increíblemente rápido!
*   **Condición Estricta y Talón de Aquiles:** Los datos no solo deben estar ordenados, sino **distribuidos uniformemente** (saltos constantes entre valores).
*   **Peor Caso:** $O(n)$. Si los datos crecen de forma abrupta o exponencial (ej. \`[1, 2, 100, 1000000]\`) y buscas un valor pequeño, la interpolación geométrica se sesgará de forma horrible y avanzará de a 1 elemento, arrastrándose muy lento.

---

## 6. Aplicaciones en el Mundo Real
La búsqueda eficiente no es solo un ejercicio académico, es la infraestructura de la era de la información:

1.  **Motores de Bases de Datos (SQL / NoSQL):** Los índices de las bases de datos modernas (como los B-Trees en PostgreSQL) utilizan los fundamentos de la búsqueda binaria para ubicar registros rápidamente sin tener que hacer un "Full Table Scan" lineal.
2.  **Sistemas de Autocompletado y Diccionarios:** Cuando escribes las primeras letras de una palabra en un buscador, sistemas basados en prefijos (y diccionarios ordenados) utilizan saltos binarios y de interpolación para sugerir el resto.
3.  **Gráficos 3D y Detección de Colisiones:** Para determinar rápidamente si un rayo de luz intersecta un polígono complejo en la renderización gráfica (Ray Tracing), el espacio físico se divide y se "busca" la colisión descartando masivamente mitades de la geometría vacía mediante *Bounding Volume Hierarchies* (BVH), un concepto hermano de la búsqueda binaria.

---

## 7. Notas de Implementación en C y Gotchas
La Búsqueda Binaria parece trivial de implementar en código, pero el propio Donald Knuth señaló que, aunque la teoría se publicó en 1946, el primer algoritmo completamente libre de errores no se publicó hasta 1962. Existen trampas mortales en C:

### El Error de "Integer Overflow" al calcular la mitad
La fórmula matemática natural para encontrar el centro es sumar los extremos y dividir por dos:
\`\`\`c
int mid = (low + high) / 2; // ¡PELIGRO CRÍTICO!
\`\`\`
**¿Qué pasa aquí?** Si \`low\` y \`high\` son números enormes cercanos al límite máximo del tipo \`int\` de C (aprox. 2.14 mil millones), al sumarlos, el resultado superará el límite del espacio de memoria de 32 bits. Ocurrirá un **Integer Overflow** silencioso, envolviendo el número a un valor negativo absurdo, provocando un \`Segmentation Fault\` al intentar leer \`A[-1542]\`.

**La Solución Segura:**
\`\`\`c
// Evita el desbordamiento calculando la distancia y sumando la mitad al inicio
int mid = low + (high - low) / 2;
\`\`\`

---

## 8. Glosario y Materiales de Apoyo

*   **Falso Negativo:** Situación donde un algoritmo reporta que un elemento no existe cuando en realidad sí está presente (usualmente por un estado ilegal de los datos, como aplicar búsqueda binaria a un arreglo desordenado).
*   **Integer Overflow:** Desbordamiento aritmético que ocurre en lenguajes de bajo nivel cuando una operación matemática genera un número mayor al que puede almacenar su tipo de dato (ej. \`int\`).
*   **Cormen (Introduction to Algorithms):** Revisa los capítulos introductorios sobre invariantes de bucle, donde formaliza cómo se demuestra la correctitud matemática de cortar los arreglos a la mitad.
*   **Recurso Adicional:** Intenta visualizar la búsqueda de interpolación y compárala visualmente contra la binaria en la herramienta de simulaciones visuales. Nota cómo la interpolación "salta" asimétricamente.`,
    visualizerType: 'none',
    checkQuestions: [
        {
            id: 'q10-1',
            question: '¿Por qué la Búsqueda Binaria tiene una complejidad temporal de $O(\\log n)$?',
            options: [
                'Porque utiliza matemáticas de logaritmos neperianos.',
                'Porque divide el espacio de búsqueda a la mitad en cada paso, tomando como máximo $\\log_2(n)$ iteraciones para llegar a un solo elemento.',
                'Porque es un caso 1 del Método Maestro.',
                'Porque divide el problema en 10 partes proporcionales.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! Si divides 1,000,000 por 2 repetidamente, llegarás a 1 en aprox. 20 pasos. Eso es el logaritmo en base 2.',
            analogousExplanation: 'Como adivinar un número del 1 al 1000 preguntando "¿es mayor a 500?". Cada respuesta elimina la mitad de las posibilidades.'
        },
        {
            id: 'q10-2',
            question: '¿Qué sucede si ejecutamos una Búsqueda Binaria estándar buscando el valor 15 en el arreglo desordenado `[20, 5, 15, 30, 10]`?',
            options: [
                'Lo encuentra en $O(n)$ porque internamente se degrada a una búsqueda lineal de seguridad.',
                'El algoritmo detecta el desorden y arroja una excepción en tiempo de ejecución.',
                'Puede retornar que el elemento no existe (falso negativo), porque al evaluar la mitad, descarta regiones donde el elemento podría estar escondido.',
                'Lo encuentra correctamente pero le toma más tiempo, $O(n \\log n)$.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. La Búsqueda Binaria descarta ciega y matemáticamente las mitades. Si el arreglo no está ordenado, su lógica deductiva falla por completo y omitirá zonas que contienen el valor.',
            analogousExplanation: 'Si buscas la palabra "Gato" en un diccionario donde las páginas se imprimieron desordenadas, abrir por la mitad (M) y buscar a la izquierda porque G < M no te garantiza nada. "Gato" podría estar al final.'
        },
        {
            id: 'q10-3',
            question: 'En un arreglo ordenado con duplicados `[2, 4, 4, 4, 8, 10]`, deseamos encontrar la **primera** ocurrencia del 4. ¿Qué modificación clave requiere la Búsqueda Binaria?',
            options: [
                'Cuando `A[mid] == 4`, retornamos `mid` inmediatamente, garantizando ser el primero.',
                'Cuando `A[mid] == 4`, registramos la posición y continuamos la búsqueda en la mitad izquierda (`high = mid - 1`).',
                'Debemos abandonar la Búsqueda Binaria y usar Búsqueda Lineal exclusivamente.',
                'Cuando `A[mid] == 4`, continuamos la búsqueda en la mitad derecha (`low = mid + 1`).'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! Al encontrar el 4, sabemos que existe, pero podría haber un 4 previo. Acotamos el límite superior a `high = mid - 1` y seguimos buscando para encontrar la coincidencia más a la izquierda posible.',
            analogousExplanation: ''
        },
        {
            id: 'q10-4',
            question: '¿En qué escenario la Búsqueda por Interpolación (Interpolation Search) brilla alcanzando $\\Theta(\\log \\log n)$?',
            options: [
                'Cuando la colección es una lista enlazada (Linked List).',
                'Cuando el arreglo está casi ordenado pero tiene algunos elementos invertidos.',
                'Cuando los datos aumentan de manera exponencial en cada índice.',
                'Cuando los datos están ordenados y distribuidos uniformemente (ej. una guía telefónica).'
            ],
            correctIndex: 3,
            explanation: 'Correcto. La interpolación asume que los valores se distribuyen de forma predecible y lineal a lo largo de los índices, permitiendo saltar casi directamente a la posición estimada. Si la distribución es mala (ej. exponencial), puede degradarse a $O(n)$.',
            analogousExplanation: 'Cuando buscas un número telefónico que empieza con "W", no abres la guía telefónica a la mitad (letra M), abres el libro en un 90% de su espesor porque sabes cómo se distribuyen.'
        }
    ],
    exercises: [],
    prevItemId: 'taller-2'
  },
  {
id: 'clase-11',
    number: 11,
    type: 'class',
    title: 'Clase 11 – Algoritmos de Ordenamiento (Parte 1)',
    topic: 'Insertion, Selection y Bubble Sort',
    cormenChapter: 'Capítulo 2.1',
    durationMinutes: 60,
    summary: 'Los algoritmos de ordenamiento elementales. Lentos asintóticamente $O(n^2)$, pero vitales para entender los cimientos del diseño in-place.',
    theoryContent: `## 1. Introducción y Motivación
Ordenar información (Sorting) es uno de los problemas fundacionales más estudiados en la ciencia de la computación. Su importancia radica en que habilita eficiencias masivas en otros algoritmos posteriores (como vimos con la Búsqueda Binaria, que requiere un arreglo previamente ordenado para funcionar en tiempo logarítmico). 

En esta clase nos centraremos en los algoritmos de ordenamiento cuadráticos o "elementales": Inserción, Selección y Burbuja. Aunque asintóticamente tienen un rendimiento pobre de $O(n^2)$ para grandes volúmenes de datos, son vitales didácticamente para entender la manipulación in-place (sin usar memoria extra) y para aprender a construir Invariantes de Bucle (Loop Invariants). Además, como veremos al final de esta lección, los algoritmos elementales (específicamente la Inserción) siguen siendo los reyes indiscutidos cuando se trata de procesar arreglos muy pequeños o casi ordenados en el mundo real.

---

## 2. Ordenamiento por Inserción (Insertion Sort)
**El Algoritmo de las Cartas.** Imagina que estás jugando a las cartas. Tienes tu mano izquierda ya ordenada y una pila desordenada en la mesa a la derecha. En cada paso, tomas la carta superior de la pila desordenada y la insertas en el lugar exacto que le corresponde dentro de tu mano izquierda.

*   **¿Cómo funciona?** El arreglo se divide lógicamente en dos partes: una subsecuencia ordenada a la izquierda (que comienza inicialmente con un solo elemento, trivialmente ordenado) y el resto desordenado a la derecha. Tomamos el primer elemento desordenado y lo comparamos hacia atrás en la parte izquierda, desplazando los mayores hacia la derecha para hacerle un "hueco" e insertarlo.
*   **Complejidad en el Peor Caso:** $O(n^2)$ (ocurre cuando el arreglo está ordenado en sentido inverso, forzando un desplazamiento completo cada vez).
*   **El Mejor Caso: $\\Theta(n)$.** Aquí brilla la Inserción. Si el arreglo ya está ordenado (o casi ordenado), al intentar insertar el nuevo elemento a la izquierda, la primera comparación nos dirá inmediatamente que ya es mayor que el elemento a su izquierda. El bucle \`while\` interno aborta instantáneamente. Por lo tanto, el algoritmo solo hace $n$ comparaciones y $0$ desplazamientos. Es **adaptativo**.

---

## 3. Ordenamiento por Selección (Selection Sort)
**El Algoritmo Terco.** Este algoritmo funciona buscando (seleccionando) el elemento más pequeño de todo el arreglo desordenado y lo intercambia (\`swap\`) directamente con el elemento en la primera posición. Luego busca el segundo más pequeño y lo pone en la segunda posición, y así sucesivamente hasta ordenar todo.

*   **¿Cómo funciona?** Mantiene una frontera entre la parte ordenada (izquierda) y desordenada (derecha). En cada iteración, debe escanear *toda* la parte desordenada para confirmar matemáticamente cuál es el mínimo absoluto.
*   **Complejidad Asintótica:** Siempre es $\\Theta(n^2)$.
*   **Por qué NO tiene Mejor Caso:** A diferencia de la Inserción, Selección no es adaptativo. Incluso si le entregas un arreglo perfectamente ordenado, el algoritmo no tiene forma de "saber" que el siguiente elemento ya es el mínimo sin escanear exhaustivamente todos los elementos restantes hasta el final del arreglo. Siempre realizará aproximadamente $n^2 / 2$ comparaciones, sin importar el orden inicial.

---

## 4. Ordenamiento de Burbuja (Bubble Sort)
**El Algoritmo Pedagógico.** Consiste en recorrer repetidamente el arreglo, comparando cada par de elementos adyacentes y permutándolos si están en el orden incorrecto. Los elementos más grandes "burbujean" hacia el final de la lista en cada pasada.

*   **Complejidad:** $O(n^2)$ en el peor caso. Se puede optimizar con una bandera booleana para detenerse si en una pasada completa no hubo intercambios (Mejor caso $\\Theta(n)$).
*   **El Veredicto Práctico:** Es considerado el peor de los algoritmos de ordenamiento elementales en la práctica, debido a la inmensa cantidad de intercambios (swaps) en memoria necesarios para mover elementos pequeños desde el final del arreglo. Casi nunca se utiliza en sistemas reales de producción, quedando relegado puramente a la enseñanza básica y demostraciones teóricas.

---

## 5. El Concepto de Estabilidad en el Ordenamiento
Un algoritmo es **Estable (Stable)** si los elementos con valores clave duplicados conservan el mismo orden relativo exacto que tenían en el arreglo de entrada original.

**¿Por qué importa?**
Imagina que tienes una tabla de Empleados que ya está ordenada alfabéticamente por "Apellido". Ahora deseas reordenar toda esa tabla por "Edad". 
*   Si el algoritmo es **Estable**: Todos los empleados de 30 años aparecerán agrupados, y *dentro de ese grupo de 30 años*, seguirán ordenados alfabéticamente por Apellido (preservando el esfuerzo del ordenamiento anterior).
*   Si el algoritmo es **Inestable**: El orden de los Apellidos para los empleados de 30 años quedará destruido y mezclado de forma impredecible.

| Algoritmo | ¿Es Estable? | Razón principal |
| :--- | :--- | :--- |
| **Insertion Sort** | **SÍ** | Solo desplaza elementos estrictamente mayores (\`>\`). Si son iguales, los respeta y los deja en su orden original a la derecha. |
| **Bubble Sort** | **SÍ** | Solo intercambia vecinos adyacentes si el de la izquierda es estrictamente mayor que el de la derecha. |
| **Selection Sort** | **NO** | Realiza "saltos" largos e intercambios directos (\`swap\`). Al hacer swap del mínimo encontrado a la primera posición, puede empujar y cruzar un elemento sobre uno de sus propios duplicados, rompiendo la estabilidad original. |

---

## 6. Cuándo usar Insertion Sort en la Práctica
A pesar de ser asintóticamente muy lento ($O(n^2)$), Insertion Sort tiene un superpoder: las constantes ocultas en su notación matemática Big-O son minúsculas. Es un algoritmo extremadamente simple, sin llamadas recursivas, con muy poco overhead y un patrón de acceso a memoria lineal que es altamente amigable con las cachés del procesador (Localidad de Referencia espacial).

**Implementaciones Híbridas en Sistemas Reales (Timsort / Introsort):**
Los algoritmos avanzados de $O(n \\log n)$ modernos que dominan la industria actual (como Timsort en Python/Java V8, o Introsort en C++) son híbridos. Suelen dividir recursivamente los arreglos masivos, pero cuando el tamaño del subarreglo a ordenar cae por debajo de un umbral muy pequeño (usualmente entre 16 y 64 elementos), *abandonan* su compleja lógica logarítmica y **cambian internamente a Insertion Sort**. 

La Inserción es imbatible, vuela en memoria para arreglos diminutos, y brilla especialmente cuando el arreglo subyacente ya está casi ordenado por pasos previos (su adaptatividad lineal).

---

## 7. Glosario y Materiales de Apoyo
*   **Invariante de Bucle (Loop Invariant):** Una propiedad lógica que es verdadera antes de la primera iteración de un bucle, se mantiene verdadera de una iteración a otra, y garantiza la correctitud del algoritmo cuando el bucle finaliza. Revisar Cormen Cap. 2.1.
*   **In-place (En el sitio):** Un algoritmo que transforma la estructura de datos utilizando únicamente un espacio de memoria auxiliar constante $O(1)$. Inserción, Selección y Burbuja son todos in-place.
*   **Algoritmo Adaptativo:** Aquel cuyo tiempo de ejecución se beneficia drásticamente cuando la entrada ya está parcial o totalmente ordenada (Ejemplo claro: Insertion Sort).
`,
    visualizerType: 'sorting',
    checkQuestions: [
        {
            id: 'q11-1',
            question: 'En base al análisis formal, ¿por qué se dice que el "Mejor Caso" de Insertion Sort es $\\Theta(n)$?',
            options: [
                'Porque si el arreglo ya está completamente ordenado, el bucle while interno inmediatamente evalúa falso y solo se hace 1 comparación por cada elemento $j$.',
                'Porque usa recursión para dividir el problema de entrada en subarreglos más cortos.',
                'Porque se pueden omitir elementos pares durante las evaluaciones.',
                'Porque la operación de swapping es instantánea a nivel de hardware.'
            ],
            correctIndex: 0,
            explanation: '¡Excelente! En un arreglo ordenado, `A[i] > key` es falso en el primer intento del `while` de Insertion Sort. El tiempo total es dominado puramente por el bucle `for` exterior, resultando en un recorrido lineal de $n$ pasos.',
            analogousExplanation: 'Imagina que te dan las cartas ya ordenadas. Solo levantas la carta nueva, ves que ya es mayor a la de tu extremo derecho y la dejas ahí, sin desplazar nada. Cuesta muy poco trabajo.'
        },
        {
            id: 'q11-2',
            question: '¿Qué es un "Invariante de Bucle" (Loop Invariant) según Cormen?',
            options: [
                'Un valor numérico fijo que nunca puede cambiar durante la ejecución del programa.',
                'La condición del bucle while (ej. `i < n`).',
                'Una declaración lógica que siempre es verdadera antes de cada iteración, utilizada para demostrar matemáticamente que un algoritmo es correcto.',
                'Una variable global estática en C.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. El Invariante de Bucle se demuestra en 3 partes: Inicialización, Mantenimiento y Finalización. En el caso de Insertion Sort, el invariante afirma que el subarreglo `A[0...j-1]` siempre está ordenado con los elementos originales.',
            analogousExplanation: 'Es como la garantía de limpieza de tu casa al barrer: Si empiezas con tu cuarto limpio (Inicialización), y al pasar al pasillo aseguras no ensuciar el cuarto (Mantenimiento), cuando termines de barrer el último espacio, sabes que toda la casa está limpia (Finalización).'
        },
        {
            id: 'q11-3',
            question: 'Si comparas el Mejor Caso de *Insertion Sort* con el Mejor Caso de *Selection Sort* sobre un arreglo ya ordenado, ¿cómo se comportan asintóticamente?',
            options: [
                'Ambos logran optimizar el recorrido y terminan en $\\Theta(n)$.',
                'Ambos fallan y se ejecutan en $\\Theta(n^2)$.',
                'Insertion Sort termina en $\\Theta(n)$ pero Selection Sort ejecuta bucles anidados completos en $\\Theta(n^2)$.',
                'Selection Sort detecta que no hay intercambios y corta en $\\Theta(n)$, Insertion Sort corre en $\\Theta(n^2)$.'
            ],
            correctIndex: 2,
            explanation: '¡Muy bien! Selection Sort no sabe si el arreglo está ordenado. Siempre asume que el elemento actual no es el más pequeño y debe escanear *todo el resto del arreglo* para verificarlo. Insertion Sort reacciona y corta prematuramente si detecta orden.',
            analogousExplanation: 'Selection Sort es terco: aunque el mazo ya esté ordenado, siempre mira todas y cada una de las cartas restantes "por si acaso" existe una menor. Insertion Sort se fía del trabajo ya hecho a la izquierda.'
        },
        {
            id: 'q11-4',
            question: 'En la teoría de algoritmos, ¿qué significa que un algoritmo de ordenamiento sea "Estable" (Stable)?',
            options: [
                'Significa que no colapsa ni lanza excepciones de Segmentation Fault.',
                'Significa que el consumo de memoria es constante $O(1)$.',
                'Significa que siempre se ejecuta en un tiempo predecible.',
                'Significa que los elementos con el mismo valor mantendrán exactamente el mismo orden relativo que tenían en el arreglo de entrada original.'
            ],
            correctIndex: 3,
            explanation: '¡Correcto! La estabilidad es crítica si estás ordenando objetos complejos por diferentes criterios (ej. ordenar personas por Edad, y luego por Apellido). Si el algoritmo es estable, mantendrá el orden original de la Edad dentro de los mismos Apellidos.',
            analogousExplanation: 'Si "Juan Pérez (30)" estaba antes que "Ana Pérez (40)", un ordenamiento estable por apellido los mantendrá como "Juan Pérez, Ana Pérez". Si es inestable, podría invertir el empate y poner a Ana primero sin razón lógica.'
        },
        {
            id: 'q11-5',
            question: 'De los 3 algoritmos elementales (Inserción, Selección, Burbuja), ¿cuál de los siguientes enunciados define mejor la principal falencia de Selection Sort?',
            options: [
                'Es inestable, lo que altera empates, y su complejidad siempre es cuadrática $\\Theta(n^2)$ independientemente del grado de orden previo.',
                'Requiere memoria auxiliar $O(n)$, destruyendo la ventaja de ordenamiento in-place.',
                'Genera demasiadas operaciones de escritura (`swap`) comparado con Burbuja.',
                'No tiene falencias, es asintóticamente superior a Inserción.'
            ],
            correctIndex: 0,
            explanation: 'Correcto. Selection Sort siempre efectúa $\\sim n^2/2$ comparaciones sin importar cómo ingresen los datos. Además, el intercambio (`swap`) a distancia rompe la Estabilidad.',
            analogousExplanation: 'Selection sort destruye la estructura original para hacer grandes "saltos" (swaps) que rompen empates (inestable), y además se niega a detenerse incluso cuando el trabajo ya está terminado.'
        }
    ],
    exercises: [

      {
        id: "ex-11",
        title: "Ejercicio 11: Implementar Insertion Sort en C",
        description: "Escribe la función en C `void insertionSort(int arr[], int n)` que ordene in-place el arreglo usando el algoritmo de inserción de Cormen (Cap. 2.1).",
        cormenRef: "Cormen Cap 2.1 - Insertion Sort",
        initialCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    // TODO: Mueve los elementos mayores que key un lugar adelante\n    while (i >= 0 && arr[i] > key) {\n      arr[i + 1] = arr[i];\n      i = i - 1;\n    }\n    arr[i + 1] = key;\n  }\n}",
        solutionCode: "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n  for (int j = 1; j < n; j++) {\n    int key = arr[j];\n    int i = j - 1;\n    while (i >= 0 && arr[i] > key) {\n      arr[i + 1] = arr[i];\n      i = i - 1;\n    }\n    arr[i + 1] = key;\n  }\n}",
        hint: "Mantiene una subsecuencia ordenada `arr[0..j-1]` e inserta la clave `key = arr[j]` en su posición correcta.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Ordenar [5, 2, 4, 6, 1, 3], n=6",
                    "input": "[5, 2, 4, 6, 1, 3], 6",
                    "expectedOutput": "undefined"
          }
],
        explanation: "Insertion Sort es un algoritmo eficiente para arreglos pequeños o casi ordenados con complejidad $O(n^2)$ en el peor caso."
      }
    ],
    prevItemId: 'clase-10',
    nextItemId: 'clase-12'
  },

  {
    id: 'clase-12',
    number: 12,
    type: 'class',
    title: 'Clase 12 – Algoritmos de Ordenamiento (Parte 2)',
    topic: 'Mergesort y Quicksort',
    cormenChapter: 'Capítulos 2.3 y 7',
    durationMinutes: 60,
    summary: 'El poder del enfoque Divide y Vencerás. La guerra entre Mergesort y Quicksort en el diseño de sistemas de alto rendimiento y el miedo al peor caso.',
    theoryContent: `## 1. Introducción y Motivación: Divide y Vencerás
En la clase anterior, analizamos los algoritmos de ordenamiento elementales (Inserción, Selección, Burbuja), descubriendo que todos operan en tiempo asintótico $O(n^2)$. Para arreglos grandes, este comportamiento cuadrático es insostenible y paraliza los sistemas. 

Para romper la barrera del tiempo cuadrático, recurrimos a una de las técnicas de diseño algorítmico más elegantes: **Divide y Vencerás (Divide and Conquer)**. Este enfoque divide el arreglo original en subproblemas más pequeños, los resuelve de manera recursiva, y luego combina las soluciones. Aquí es donde nacen los titanes del ordenamiento logarítmico: **Mergesort** y **Quicksort**. Estos algoritmos dominan la industria actual, reduciendo el tiempo teórico necesario para ordenar grandes volúmenes de datos a unos espectaculares $\\Theta(n \\log n)$.

---

## 2. Mergesort: El Rey de la Estabilidad Matemática
Inventado por John von Neumann, Mergesort es un algoritmo tan predecible como un reloj suizo. Independientemente de cómo le entregues los datos (ordenados, invertidos, aleatorios), siempre se ejecutará matemáticamente en tiempo $\\Theta(n \\log n)$.

*   **¿Cómo funciona?** El algoritmo corta a ciegas el arreglo justo por la mitad hasta llegar a subarreglos de tamaño 1 (Divide). El verdadero "cerebro" está en la fase de **Combinación (Merge)**: toma dos subarreglos que ya están ordenados y los va fusionando uno a uno mediante punteros paralelos en un nuevo arreglo.
*   **La Ventaja (Estabilidad):** Es un algoritmo naturalmente Estable, al igual que Insertion Sort.
*   **La Falencia (Consumo de Memoria RAM):** La gran desventaja arquitectónica de Mergesort es que no puede operar *in-place*. Para realizar la fusión de forma segura sin sobrescribir elementos, necesita reservar memoria temporal (RAM). Su consumo de memoria auxiliar es de $O(n)$. Si estás ordenando una base de datos de 16 GB, Mergesort exigirá al servidor otros 16 GB libres de RAM para crear arreglos temporales, lo cual es inaceptable en sistemas embebidos o servidores bajo presión.

---

## 3. Quicksort: El Estándar de la Industria
Quicksort fue inventado por Tony Hoare y, a nivel práctico, es el algoritmo de ordenamiento general más rápido conocido en la computación moderna, a pesar de sus excentricidades teóricas.

*   **¿Cómo funciona?** Al revés que Mergesort, Quicksort hace el trabajo pesado en la fase de **División**. Elige un elemento del arreglo al que llama **Pivote**. Luego, escanea el arreglo y mueve todos los elementos menores al pivote hacia su izquierda, y todos los mayores hacia su derecha (función \`Partition\`). Después de esto, el pivote queda en su posición matemática final, y el algoritmo se llama recursivamente en los bloques izquierdo y derecho.
*   **Memoria in-place ($O(\\log n)$):** A diferencia de Mergesort, Quicksort mueve los elementos dentro del propio arreglo (in-place) mediante intercambios (swaps). Solo utiliza memoria auxiliar de pila $O(\\log n)$ para gestionar las llamadas recursivas del propio procesador. Es increíblemente ligero en espacio de datos.
*   **Inestabilidad:** Los saltos lejanos de los elementos para cruzar al otro lado del pivote rompen el orden natural. Quicksort **NO** es estable.

---

## 4. El Terrorífico Peor Caso de Quicksort ($O(n^2)$)
En su mejor caso y caso promedio, Quicksort divide el arreglo por la mitad, logrando una espectacular profundidad logarítmica $\\Theta(n \\log n)$. Pero el "Talón de Aquiles" clásico de Quicksort ocurre cuando **elegimos siempre el último elemento como Pivote** sobre datos ya ordenados o casi ordenados.

**Ejemplo Concreto del Fracaso:**
Imagina el arreglo ya ordenado: \`[10, 20, 30, 40, 50]\`.
Si elegimos siempre el último elemento como pivote (50), al particionar, resulta que *todos* los demás elementos son menores que 50. 
El particionado no divide el arreglo en dos mitades (2 y 2), sino en un bloque de 4 elementos y un bloque de 0 elementos. En la siguiente llamada recursiva con \`[10, 20, 30, 40]\`, elegimos el 40, volviendo a dividir mal (3 y 0).
El árbol recursivo se degenera en una línea recta de profundidad $n$, y el costo temporal colapsa catastróficamente al temido $O(n^2)$. 

Los hackers conocen esto. Si expones un Quicksort clásico en una API pública, un atacante puede enviarte deliberadamente arreglos ya ordenados para congelar el CPU de tu servidor mediante un ataque de complejidad algorítmica (Algorithmic Complexity DoS).

---

## 5. El Remedio: Randomized Quicksort y Mediana de Tres
Para evitar el fatídico peor caso $\\Theta(n^2)$ que los atacantes pueden explotar mediante ataques de complejidad algorítmica, la ingeniería de algoritmos presenta soluciones:

**Estrategia Aleatoria (Randomized Pivot):**
Cormen expone (Cap 7.3) que en lugar de elegir ciegamente el elemento \`A[high]\`, generamos un número aleatorio \`r\` entre \`low\` y \`high\`, intercambiamos \`A[r]\` con \`A[high]\`, y luego usamos la partición normal. Esta simple línea matemática rompe cualquier patrón malicioso en los datos, haciendo que el peor caso dependa puramente de un azar asombrosamente improbable (más difícil que ganar la lotería cósmica).

**Mediana de Tres (Median of Three):**
Otra estrategia clásica determinista consiste en observar tres elementos (el primero, el del medio, y el último) y elegir el que quede en la mitad de los valores. Esto garantiza que el pivote nunca sea el mínimo absoluto ni el máximo absoluto del arreglo actual, forzando matemáticamente siempre una división mínimamente "decente" y evitando la degeneración cuadrática en datos pre-ordenados o invertidos.

---

## 6. Introsort: Híbridos en el Mundo Real (\`std::sort\`)
En la práctica industrial (C++, Rust, Python), nadie usa Quicksort o Mergesort en estado algorítmico "puro" de libro de texto. La función \`std::sort\` de C++ utiliza internamente un poderoso híbrido algorítmico llamado **Introsort** (Introspective Sort).

Introsort aprovecha lo mejor de cada mundo para garantizar un peor caso $O(n \\log n)$ absoluto, manteniendo la ligereza de memoria in-place:
1.  **Quicksort Inicial:** Arranca ordenando con Quicksort (por su abrumadora velocidad en localidad de memoria y caché de procesador).
2.  **Protección Heapsort:** Mantiene un contador de la profundidad recursiva. Si el algoritmo detecta introspectivamente que las particiones de Quicksort están siendo muy desequilibradas y el árbol de recursión supera el nivel $2 \\times \\log_2(n)$ (alerta de degeneración cuadrática inminente), aborta Quicksort y cambia en pleno vuelo a un **Heapsort**. (Heapsort siempre garantiza $O(n \\log n)$ en el peor caso, mitigando el riesgo).
3.  **Finalización con Insertion Sort:** Cuando las divisiones ya generaron sub-arreglos sumamente pequeños (menores a ~16 elementos), detiene las complejas llamadas recursivas y aplica directamente **Insertion Sort**, que, como vimos en la Clase 11, vuela y es insuperable para bloques diminutos sin overhead de funciones.

---

## 7. Glosario y Materiales de Apoyo
*   **Divide y Vencerás (Divide and Conquer):** Paradigma que resuelve un problema dividiéndolo recursivamente en subproblemas del mismo tipo, resolviéndolos, y combinando lógicamente las respuestas.
*   **Pivote (Pivot):** Elemento clave en Quicksort utilizado como barrera de división temporal para mandar a los más pequeños a la izquierda y a los mayores a la derecha.
*   **Introsort:** Algoritmo de ordenamiento híbrido utilizado en producción (ej. \`std::sort\`) para garantizar estabilidad temporal superior $O(n \\log n)$ en el peor caso, eliminando las debilidades de la recursión profunda.
`,
    visualizerType: 'sorting',
    checkQuestions: [
        {
            id: 'q12-1',
            question: 'Tanto Mergesort como Quicksort operan bajo "Divide y Vencerás". ¿Cuál es la principal diferencia estructural entre ambos al analizar cómo hacen su trabajo?',
            options: [
                'Mergesort divide a ciegas y hace todo el procesamiento al "Combinar". Quicksort hace el trabajo pesado al "Dividir" usando el pivote, y la combinación es trivial.',
                'Mergesort requiere elegir un pivote central, mientras Quicksort elige un pivote aleatorio.',
                'Mergesort es inestable en todos sus casos, mientras Quicksort es asintóticamente estable.',
                'Mergesort utiliza memoria $O(1)$ in-place, mientras Quicksort requiere copiar todo a memoria auxiliar $O(n)$.'
            ],
            correctIndex: 0,
            explanation: '¡Excelente! Mergesort corta el arreglo inmediatamente y la carga computacional ocurre en la función `MERGE`. Quicksort ordena durante el particionado y luego las llamadas recursivas ensamblan todo lógicamente sin requerir un paso extra.',
            analogousExplanation: 'Mergesort es como armar un rompecabezas ensamblando bloques progresivamente (de abajo hacia arriba). Quicksort separa las piezas por color desde el inicio (de arriba hacia abajo), y luego solo ordena los subgrupos.'
        },
        {
            id: 'q12-2',
            question: 'En sistemas limitados por Memoria RAM, ¿por qué Quicksort es preferido arquitectónicamente sobre Mergesort?',
            options: [
                'Porque Quicksort es $O(n^2)$ y procesa menos variables temporales.',
                'Porque Mergesort requiere asignar matrices auxiliares masivas consumiendo $O(n)$ de RAM extra, mientras Quicksort opera in-place consumiendo solo $O(\\log n)$ de pila.',
                'Porque Quicksort utiliza llamadas de sistema que no consumen memoria del heap.',
                'Porque el peor caso de Mergesort detiene los servidores al agotar la memoria caché.'
            ],
            correctIndex: 1,
            explanation: 'Correcto. La principal falencia práctica de Mergesort es requerir copiar los elementos a subarreglos temporales durante el Merge ($O(n)$ extra). Quicksort hace todo usando intercambios de memoria directa (swaps), usando solo $O(\\log n)$ para las funciones recursivas.',
            analogousExplanation: 'Para mezclar dos mazos de cartas en orden, Mergesort requiere una gran mesa auxiliar vacía (RAM). Quicksort reubica las cartas en las mismas manos sin requerir de mesas grandes.'
        },
        {
            id: 'q12-3',
            question: 'Un atacante descubre que utilizas Quicksort clásico eligiendo el último elemento como pivote. ¿Qué datos te enviará intencionalmente para causar una Denegación de Servicio (DoS) bloqueando el procesador?',
            options: [
                'Un arreglo puramente aleatorio y de gran magnitud.',
                'Un arreglo ya perfectamente ordenado o completamente invertido.',
                'Un arreglo que alterna entre números pares y negativos.',
                'Un arreglo disperso con múltiples ceros.'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! Si envían datos ordenados, el último pivote causará un particionado que no divide el problema (ej. 4 elementos de un lado, 0 del otro). Así repetitivamente el algoritmo pasará de ser logarítmico a ser lineal, resultando en un tiempo de ejecución cuadrático $O(n^2)$.',
            analogousExplanation: 'Si mides altura y siempre eliges como pivote a la persona más alta del grupo, nunca lograrás formar "grupos más bajos y más altos"; siempre aislarás a 1 persona, y te tomará una eternidad ordenarlos.'
        },
        {
            id: 'q12-4',
            question: '¿Para qué sirve exactamente la estrategia "Mediana de Tres" (Median of Three) en Quicksort?',
            options: [
                'Para convertir un algoritmo inestable en un algoritmo completamente estable.',
                'Para acelerar el particionado de $O(n)$ a $O(1)$ constante.',
                'Para garantizar matemáticamente que el pivote nunca será el mínimo ni el máximo del subarreglo, evitando así el peor caso degenerativo $O(n^2)$.',
                'Para permitir el particionado multihilo en bases de datos SQL.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. Al extraer el primero, el centro y el último elemento, y usar como pivote al del medio, mitigamos los ataques con arreglos ordenados. Si el arreglo ya está ordenado, la mediana será un punto central perfecto, asegurando una división equilibrada y un comportamiento de $O(n \\log n)$.',
            analogousExplanation: 'Es como tomar de muestra a tres personas: una muy alta, una mediana y una muy baja. Al elegir siempre al mediano, nos aseguramos de que siempre habrá gente por arriba y por debajo de él.'
        },
        {
            id: 'q12-5',
            question: 'La función nativa `std::sort` de C++ utiliza Introsort. ¿Por qué Introsort cambia a Insertion Sort cuando los arreglos a ordenar son muy pequeños (ej. < 16 elementos)?',
            options: [
                'Porque Quicksort es inestable y necesita recuperar estabilidad al final de la ejecución.',
                'Porque Insertion Sort utiliza una búsqueda binaria para no incurrir en desbordamientos (overflows) en procesadores lentos.',
                'Porque algoritmos como Quicksort o Mergesort generan overhead excesivo creando nuevos marcos de función recursivos. Insertion Sort, con sus bucles simples, es drásticamente más rápido en memoria caché para lotes diminutos.',
                'Porque Insertion Sort puede usar paralelismo de GPU (CUDA) para resolver matrices pequeñas.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! El "Divide y Vencerás" es ineficiente en su capa más inferior. El costo de llamar recursivamente a nuevas sub-rutinas supera el costo de un doble bucle trivial (overhead). Insertion Sort opera de forma ininterrumpida y se ejecuta instantáneamente a velocidades de silicio en bloques mínimos.',
            analogousExplanation: 'Para cortar 1 millón de hojas de papel usas una guillotina industrial enorme (Quicksort). Pero si solo te quedan 3 hojas de papel en la mesa final, encender toda la guillotina industrial cuesta más tiempo y energía que simplemente tomar las tijeras de escritorio (Insertion Sort).'
        }
    ],
    exercises: [

      {
        id: "ex-12",
        title: "Ejercicio 12: Combinación (Merge) de Subarreglos en C",
        description: "Implementa en C la rutina `void merge(int arr[], int l, int m, int r)` para combinar dos subarreglos ordenados `arr[l..m]` y `arr[m+1..r]`.",
        cormenRef: "Cormen Cap 2.3 - Merge Sort",
        initialCode: "#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m - l + 1;\n  int n2 = r - m;\n  int L[100], R[100];\n  for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n  \n  // TODO: Combina L y R de nuevo en arr\n}",
        solutionCode: "#include <stdio.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n  int n1 = m - l + 1;\n  int n2 = r - m;\n  int L[100], R[100];\n  for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n  \n  int i = 0, j = 0, k = l;\n  while (i < n1 && j < n2) {\n    if (L[i] <= R[j]) { arr[k] = L[i]; i++; }\n    else { arr[k] = R[j]; j++; }\n    k++;\n  }\n  while (i < n1) { arr[k] = L[i]; i++; k++; }\n  while (j < n2) { arr[k] = R[j]; j++; k++; }\n}",
        hint: "Compara `L[i]` y `R[j]`, coloca el menor en `arr[k]` y avanza el índice correspondiente.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Combinar subarreglos ordenados en [2, 4, 1, 3]",
                    "input": "[2, 4, 1, 3], 0, 1, 3",
                    "expectedOutput": "undefined"
          }
],
        explanation: "Merge realiza la mezcla lineal en tiempo $O(n_1 + n_2)$, formando la columna vertebral de Merge Sort $O(n \\\log n)$."
      }
    ],
    prevItemId: 'clase-11',
    nextItemId: 'clase-13'
  },

  {
    id: 'clase-13',
    number: 13,
    type: 'class',
    title: 'Clase 13 – Algoritmos de Grafos (Parte 1)',
    topic: 'Representaciones de grafos (Matriz vs Lista de Adyacencia) y recorridos BFS (Anchura) y DFS (Profundidad)',
    cormenChapter: 'Capítulo 22: Algoritmos elementales de grafos',
    durationMinutes: 65,
    summary: 'Estructuras no lineales en red: vértices $V$ y aristas $E$. Exploración por niveles (BFS) vs exploración profunda (DFS).',
    theoryContent: `## 1. El Salto a las Estructuras No Lineales (Grafos)
Hasta ahora, hemos operado exclusivamente sobre arreglos, que representan información de forma estrictamente lineal y unidimensional. Sin embargo, el mundo real es interconectado, caótico y multidimensional. La web está conformada por páginas enlazadas entre sí, las ciudades se unen mediante autopistas, y las relaciones humanas forman redes sociales gigantescas.

Para modelar matemáticamente este tipo de problemas, recurrimos a la Teoría de Grafos. Un Grafo $G = (V, E)$ es una estructura de datos no lineal compuesta por dos conjuntos básicos: los **Vértices (V)**, que representan las entidades (personas, ciudades, servidores), y las **Aristas (E - Edges)**, que representan las conexiones o relaciones entre esas entidades. Las aristas pueden ser "dirigidas" (como un enlace unidireccional de una página web a otra) o "no dirigidas" (como una amistad bidireccional en Facebook).

---

## 2. Representación en Memoria: Matriz vs Lista de Adyacencia
Un desafío central (Cormen Cap 22.1) es cómo almacenar un grafo en la RAM de la computadora para poder procesarlo eficientemente. Existen dos arquitecturas canónicas:

**Matriz de Adyacencia (Adjacency Matrix):**
Consiste en una tabla bidimensional de tamaño $|V| \times |V|$. Si el vértice $u$ se conecta con $v$, colocamos un $1$ en la celda $M[u][v]$ (o el peso de la arista).
*   **Consultas:** Es matemáticamente inmejorable. Consultar si hay conexión entre dos nodos es acceso directo $O(1)$.
*   **Espacio:** Su gran debilidad es la memoria cuadrática $O(|V|^2)$. Si quieres representar una red de $1$ millón de nodos, requerirás una matriz de $1$ billón de celdas.

**Lista de Adyacencia (Adjacency List):**
Es un arreglo unidimensional de tamaño $|V|$, donde cada vértice apunta a una Lista Enlazada que contiene estrictamente a sus vecinos inmediatos.
*   **Consultas:** Es más lenta. Para confirmar si $u$ conecta con $v$, hay que iterar la lista completa de $u$, resultando en un tiempo de acceso $O(grado(u))$.
*   **Espacio:** Sumamente eficiente $O(|V| + |E|)$. No desperdicia memoria guardando ceros o ausencias de conexión. Grafos dispersos (ej. redes sociales) siempre usan este enfoque.

---

## 3. Búsqueda en Anchura (BFS / Breadth-First Search)
BFS explora el grafo de forma radial concéntrica, por "capas", partiendo de un nodo origen $s$. Visita primero los vecinos a distancia 1, luego a distancia 2, y así sucesivamente, lo que garantiza matemáticamente encontrar el **camino más corto** en grafos no ponderados.

**Pseudocódigo de Cormen (BFS):** Utiliza una Cola (Queue) FIFO.
\`\`\`text
BFS(G, s)
  for each vertex u in G.V - {s}
    u.color = WHITE
    u.d = ∞
  s.color = GRAY
  s.d = 0
  Q = empty queue
  ENQUEUE(Q, s)
  while Q is not empty
    u = DEQUEUE(Q)
    for each v in G.Adj[u] // Explorar vecinos
      if v.color == WHITE
        v.color = GRAY
        v.d = u.d + 1
        ENQUEUE(Q, v)
    u.color = BLACK
\`\`\`

---

## 4. Búsqueda en Profundidad (DFS / Depth-First Search)
DFS es un explorador agresivo. Elige un pasillo y se sumerge lo más profundo posible hasta topar con un callejón sin salida, momento en el cual realiza **Backtracking** (retrocede) para intentar una nueva ruta. Se implementa usando una Pila (Stack) LIFO explícita, o más comúnmente, de forma recursiva (utilizando la pila de llamadas del sistema).

**Pseudocódigo de Cormen (DFS Recursivo):** Registra marcas de tiempo.
\`\`\`text
DFS(G)
  for each vertex u in G.V
    u.color = WHITE
  time = 0
  for each vertex u in G.V
    if u.color == WHITE
      DFS-VISIT(G, u)

DFS-VISIT(G, u)
  time = time + 1
  u.d = time      // Tiempo de Descubrimiento
  u.color = GRAY
  for each v in G.Adj[u]
    if v.color == WHITE
      DFS-VISIT(G, v)
  u.color = BLACK
  time = time + 1
  u.f = time      // Tiempo de Finalización
\`\`\`

---

## 5. Los Colores de Cormen
Ambos algoritmos controlan su estado mediante 3 colores canónicos:
*   **Blanco:** Vértice no visitado.
*   **Gris:** Vértice descubierto (en la Cola de BFS o en la pila recursiva de DFS), pero sus vecinos aún están siendo procesados. Representa la "frontera".
*   **Negro:** Vértice totalmente finalizado, todos sus vecinos fueron explorados.

---

## 6. Traza Paso a Paso: Grafo de 6 Nodos
Para ilustrar las estructuras, imagina un grafo con 6 nodos **{A, B, C, D, E, F}** y las aristas: 'A-B', 'A-C', 'B-D', 'B-E', 'C-F'. Arrancamos desde 'A'.

**Traza de BFS (Anchura) desde A:**
1.  **Inicialización:** Cola 'Q = [A]'. Distancia 'A.d = 0'. 'A' es Gris.
2.  'DEQUEUE(A)'. Sus vecinos Blancos son 'B' y 'C'. Se colorean de Gris, su distancia es $0+1=1$, y van a la Cola. 'Q = [B, C]'. 'A' se vuelve Negro.
3.  'DEQUEUE(B)'. Vecinos Blancos: 'D', 'E'. Distancia $1+1=2$. 'Q = [C, D, E]'. 'B' se vuelve Negro.
4.  'DEQUEUE(C)'. Vecino Blanco: 'F'. Distancia $1+1=2$. 'Q = [D, E, F]'. 'C' se vuelve Negro.
5.  Los nodos restantes 'D', 'E', 'F' salen de la Cola 'DEQUEUE()', pero ya no tienen vecinos Blancos. Se vuelven Negros directamente y la cola queda vacía.
*Resultado por niveles:* Capa 0: {A}, Capa 1: {B, C}, Capa 2: {D, E, F}.

**Traza de DFS (Profundidad) desde A (Tiempos d/f):**
1.  Descubrimos 'A' en el tiempo $t=1$. Se explora su vecino 'B'.
2.  Descubrimos 'B' en $t=2$. Se explora su vecino 'D'.
3.  Descubrimos 'D' en $t=3$. No tiene vecinos Blancos. ¡Pared! Finaliza 'D' en $t=4$ y hace backtracking a 'B'.
4.  Desde 'B', se explora el vecino restante 'E'. Descubierto en $t=5$. Sin salida, finaliza en $t=6$.
5.  'B' terminó de explorar. Finaliza en $t=7$. Backtracking a 'A'.
6.  Desde 'A', se explora el otro camino: 'C' en $t=8$. De allí a 'F' en $t=9$. 'F' finaliza en $t=10$. 'C' finaliza en $t=11$.
7.  Finalmente 'A' se vuelve Negro en $t=12$.

---

## 7. Desglose de Complejidad: ¿Por qué $O(|V| + |E|)$?
Es común memorizar que estos algoritmos operan en tiempo lineal $O(|V| + |E|)$, pero su demostración rigurosa es fundamental y se desglosa en dos partes analíticas:

*   **El componente $O(|V|)$ por Inicialización:** Al comienzo absoluto de BFS y DFS, se ejecuta un bucle 'for' incondicional que visita todos y cada uno de los vértices del grafo para pintarlos de color Blanco (y fijar distancias o tiempos). Este bloque ejecuta exactamente $|V|$ operaciones simples, aportando el primer término a la suma.
*   **El componente $O(|E|)$ por Exploración de Aristas:** Durante el bucle 'while' (en BFS) o durante las llamadas recursivas (en DFS), un vértice se marca como Gris y sus vecinos son revisados. La clave es que un vértice entra en la Cola o Pila **solamente una vez**. Al procesar un vértice $u$, iteramos sobre su Lista de Adyacencia ('G.Adj[u]'). Si sumamos la longitud de *todas* las listas de adyacencia de todos los vértices a lo largo de todo el proceso algorítmico, el total de aristas inspeccionadas es exactamente $|E|$ (para grafos dirigidos) o $2|E|$ (para no dirigidos). Por lo tanto, el tiempo total invertido recorriendo vecinos y descubriendo caminos se limita a una constante proporcional a $|E|$.
*   **Conclusión:** Sumando la fase de inicialización $O(|V|)$ y la fase de escaneo estructural de aristas $O(|E|)$, obtenemos un comportamiento estrictamente sumatorio respecto a ambos elementos del grafo: $\Theta(|V| + |E|)$.

---

## 8. Aplicaciones Críticas
*   **BFS:** Cálculo de rutas GPS no ponderadas, encontrar el camino más corto para resolver un cubo Rubik o laberinto, y algoritmos de "6 grados de separación".
*   **DFS:** Detección de Ciclos (encontrar Aristas de Retroceso / Back Edges que apuntan hacia un nodo Gris en pleno recorrido) y Ordenamiento Topológico en grafos dirigidos acíclicos (DAGs) organizando los tiempos finales $f[v]$.`,
    visualizerType: 'graph_bfs_dfs',
    checkQuestions: [
        {
            id: 'q13-1',
            question: 'Para mapear una red social mundial (donde el número de vértices es inmenso pero la cantidad promedio de amigos por persona es pequeña), ¿cuál es la estructura de datos obligatoria para representar el grafo y por qué?',
            options: [
                'Matriz de Adyacencia, porque permite consultas de amistad en $O(1)$ sin comprometer la RAM.',
                'Lista de Adyacencia, porque su huella de memoria $O(|V| + |E|)$ es la única escalable para grafos dispersos, evitando desperdiciar exabytes en guardar "ceros" (ausencia de conexión).',
                'Un Árbol Binario de Búsqueda para mantener la localidad de referencia.',
                'Una Matriz de Adyacencia comprimida con punteros dinámicos $O(1)$.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! Las redes sociales son el ejemplo clásico de Grafos Dispersos (Sparse Graphs). Usar una matriz de adyacencia $\Theta(|V|^2)$ requeriría memoria masiva inútil, la inmensa mayoría llena de ceros (personas que no se conocen).',
            analogousExplanation: 'En vez de darle a cada humano del mundo una libreta enciclopédica con 8 billones de casillas marcando SÍ/NO, le das una libretita de bolsillo solo con los nombres de las personas que sí conoce.'
        },
        {
            id: 'q13-2',
            question: 'En el algoritmo BFS (Búsqueda en Anchura) detallado por Cormen, ¿qué estructura de datos auxiliar es la responsable algorítmica de que el proceso se ejecute por "capas concéntricas"?',
            options: [
                'Una Pila (Stack) estructurada como LIFO (Last-In, First-Out).',
                'Las llamadas recursivas anidadas en el Heap.',
                'Una Cola (Queue) estructurada como FIFO (First-In, First-Out).',
                'El uso de una variable booleana compartida.'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! La Cola (First-In, First-Out) es el motor de BFS. Al colocar los nuevos vecinos al final de la cola y extraer el próximo a procesar siempre por el frente, BFS se obliga matemáticamente a procesar primero a los nodos más antiguos (los de distancia \'d\') antes de tocar a los más nuevos (distancia \'d+1\').',
            analogousExplanation: 'Como hacer fila en el banco: el primero que llega (los vecinos inmediatos y más cercanos) es estrictamente el primero en ser atendido.'
        },
        {
            id: 'q13-3',
            question: 'Supongamos que desarrollas el código de un robot para escapar de un laberinto gigante y deseas garantizar matemáticamente encontrar el camino que requiera **la menor cantidad absoluta de pasos físicos**. ¿Qué algoritmo debes invocar?',
            options: [
                'Búsqueda Binaria.',
                'DFS (Búsqueda en Profundidad), ya que siempre retrocede.',
                'BFS (Búsqueda en Anchura), ya que explora radialmente garantizando el Shortest Path.',
                'Ordenamiento Topológico Inverso.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! El superpoder intrínseco de BFS es que garantiza el "Camino Más Corto" (Shortest Path) en grafos donde todas las aristas pesan lo mismo (cada paso equivale a 1 unidad). Al avanzar radialmente, el momento exacto en que la onda BFS toca la salida representa matemáticamente la ruta más corta posible.',
            analogousExplanation: 'BFS inunda el laberinto como si vertieras agua. El agua tocará la salida tomando estrictamente el camino físico más corto posible de forma natural. DFS, en cambio, exploraría ciegamente un túnel larguísimo y daría la vuelta entera al laberinto antes de encontrar la puerta.'
        },
        {
            id: 'q13-4',
            question: 'En la teoría de grafos, durante la ejecución de una Búsqueda en Profundidad (DFS), tu explorador recursivo intenta procesar un nodo vecino que el algoritmo determina que ya tiene el color "Gris" (Frontera). ¿Qué significa esto estructuralmente?',
            options: [
                'Significa que el DFS ha finalizado su ejecución con éxito absoluto.',
                'Es un error de memoria (Stack Overflow) en la llamada recursiva.',
                'Significa que el DFS acaba de detectar un Ciclo en el grafo mediante una Arista de Retroceso (Back Edge).',
                'Significa que el grafo es bipartito y requiere ser reiniciado en Blanco.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. Los nodos de color Gris son aquellos que actualmente están "activos" o abiertos en la pila de recursión (se han descubierto, pero aún no han finalizado). Si colisionas con un nodo que sigue Gris, significa que tu ruta de exploración dio la vuelta y se intersecó consigo misma en el pasado, formando un ciclo cerrado.',
            analogousExplanation: 'Si vas dejando un hilo rojo deshilachándose por el laberinto (representando tus nodos Grises), y al doblar una esquina te encuentras con tu propio hilo rojo original, significa que caminaste en círculos.'
        },
        {
            id: 'q13-5',
            question: 'En la demostración analítica de la complejidad $O(|V| + |E|)$ de BFS y DFS, ¿de dónde proviene exactamente el término $O(|E|)$?',
            options: [
                'Del bucle \'for\' inicial que colorea todos los vértices de Blanco.',
                'Del hecho de que al sumar las longitudes de todas las Listas de Adyacencia procesadas a lo largo de todo el algoritmo, se examina exactamente cada arista del grafo.',
                'De la profundidad máxima de la Pila o la Cola en memoria.',
                'De la verificación de los ciclos al final del algoritmo.'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! El término $O(|E|)$ emerge matemáticamente porque, aunque usamos bucles anidados (\'while\' o llamadas recursivas, y dentro de ellos un \'for each v in G.Adj[u]\'), cada vértice ingresa y sale de la estructura principal solo una vez. Esto garantiza que cada arista se recorra solo 1 vez en grafos dirigidos o 2 en grafos no dirigidos. El otro término $O(|V|)$ proviene puramente del bucle inicial de blanqueamiento.',
            analogousExplanation: 'Para pintar de Blanco a Negro todos los postes de una cerca, la tarea de vaciar todos los tarros de pintura cuesta $O(V)$, y la tarea de revisar todos los tramos de alambre que los unen a medida que caminas cuesta $O(E)$.'
        }
    ],
    exercises: [


      {
        id: "ex-13",
        title: "Ejercicio 13: Recorrido BFS en Grafo sobre Matriz de Adyacencia en C",
        description: "Implementa la función en C `int bfsContarNodosConectados(int matriz[10][10], int n, int inicio)` que realice un recorrido BFS sobre una matriz de adyacencia y retorne cuántos nodos son alcanzables desde `inicio`.",
        cormenRef: "Cormen Cap 22.2 - Breadth-First Search",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0;\n  int cont = 0;\n  \n  // TODO: Inicializa cola y realiza el recorrido BFS\n  return cont;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint bfsContarNodosConectados(int matriz[10][10], int n, int inicio) {\n  bool visitados[10] = {false};\n  int cola[10];\n  int frente = 0, fin = 0;\n  int cont = 0;\n  \n  visitados[inicio] = true;\n  cola[fin++] = inicio;\n  \n  while (frente < fin) {\n    int u = cola[frente++];\n    cont++;\n    for (int v = 0; v < n; v++) {\n      if (matriz[u][v] == 1 && !visitados[v]) {\n        visitados[v] = true;\n        cola[fin++] = v;\n      }\n    }\n  }\n  return cont;\n}",
        hint: "Usa la cola FIFO con `frente` y `fin` para procesar los vecinos no visitados.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Grafo conexo de 3 nodos",
                    "input": "[[0,1,0],[1,0,1],[0,1,0]], 3, 0",
                    "expectedOutput": "3"
          }
],
        explanation: "BFS explora nivel por nivel (amplitud) usando una cola FIFO, garantizando descubrir los caminos más cortos en grafos no ponderados."
      }
    ],
    prevItemId: 'clase-12',
    nextItemId: 'clase-14'
  },

  {
    id: 'clase-14',
    number: 14,
    type: 'class',
    title: 'Clase 14 – Algoritmos de Grafos (Parte 2)',
    topic: 'Árbol de Expansión Mínima (Kruskal, Prim) y Caminos Más Cortos (Dijkstra, Bellman-Ford)',
    cormenChapter: 'Capítulos 23 y 24: Minimum Spanning Trees y Shortest Paths',
    durationMinutes: 75,
    summary: 'Algoritmos Greedy sobre Grafos. Cómo conectar redes (Kruskal/Prim) y cómo navegar en ellas (Dijkstra/Bellman-Ford).',
    theoryContent: `## 1. El Problema del Árbol de Expansión Mínima (MST)
En el diseño de redes (eléctricas, de fibra óptica, o carreteras), a menudo necesitamos conectar un conjunto de ubicaciones (vértices) de manera que todas queden unidas entre sí, minimizando el costo total del cableado o asfaltado (la suma de los pesos de las aristas). El resultado de esta interconexión óptima sin ciclos se denomina **Árbol de Expansión Mínima (MST - Minimum Spanning Tree)**. Cormen detalla dos enfoques codiciosos (Greedy) para resolver esto: Kruskal y Prim.

---

## 2. El Algoritmo de Kruskal (MST)
Kruskal adopta una perspectiva global: ve todas las aristas flotando en el espacio y las procesa estrictamente desde la más barata a la más cara. 
1. **Ordenamiento:** Ordena todas las aristas de menor a mayor peso.
2. **Construcción:** Itera la lista. Si la arista conecta dos árboles distintos, la acepta. Si conecta dos nodos que ya pertenecen a la misma red (lo que crearía un ciclo inútil y redundante), la descarta.
3. **Estructura Interna:** Utiliza la poderosa estructura **Disjoint-Set (Union-Find)**. Con las operaciones \`Find(u) == Find(v)\`, determina en $O(1)$ amortizado si formarían un ciclo.

### Traza Numérica de Kruskal
Imagina un grafo de 4 nodos {A, B, C, D} y 5 aristas:
*   (A-B) peso 1
*   (B-C) peso 2
*   (A-C) peso 3
*   (C-D) peso 4
*   (B-D) peso 5

**Paso a paso:**
1.  **Arista A-B (1):** \`Find(A) != Find(B)\`. Se **Acepta**. Conjuntos actuales: {A, B}, {C}, {D}.
2.  **Arista B-C (2):** \`Find(B) != Find(C)\`. Se **Acepta**. Conjuntos: {A, B, C}, {D}.
3.  **Arista A-C (3):** \`Find(A) == Find(C)\`. ¡Ambos están en el mismo conjunto! Si ponemos esta arista formaremos un triángulo (ciclo). Se **Rechaza**.
4.  **Arista C-D (4):** \`Find(C) != Find(D)\`. Se **Acepta**. Conjunto: {A, B, C, D}.
5.  Terminamos, ya que un árbol de 4 nodos debe tener exactamente 3 aristas. Costo del MST: $1+2+4 = 7$.

---

## 3. El Algoritmo de Prim (MST)
Prim adopta una perspectiva local (como una infección que se propaga o una mancha de aceite). Arranca desde un nodo raíz $R$ cualquiera y mantiene un árbol solitario que va creciendo. 
En cada iteración, el algoritmo mira todas las aristas "frontera" (aquellas que conectan un nodo que *ya está en el árbol* con un nodo que *todavía está afuera*) y absorbe al nodo exterior usando la arista de menor peso.
Utiliza una **Cola de Prioridad (Min-Heap)** para extraer eficientemente el vecino más barato.

---

## 4. El Algoritmo de Dijkstra (Caminos Más Cortos)
Mientras Kruskal y Prim conectan todo el grafo minimizando la suma total (MST), Dijkstra busca **el camino más corto desde un nodo origen a todos los demás** (Single-Source Shortest Path). 
Dijkstra mantiene un arreglo de distancias $d[v]$ inicialmente en $\\infty$. Utiliza una Cola de Prioridad para siempre procesar primero el nodo más cercano conocido, garantizando que cuando saca un nodo $u$, su distancia mínima ya es definitiva y no cambiará. Luego, aplica la **Relajación** a todos sus vecinos $v$:
$\\text{Nuevo } d[v] = \\min(d[v], d[u] + w(u,v))$

### Traza Numérica de Dijkstra
Grafo de 3 nodos {S, A, B}. Origen S.
Aristas: S-A(5), S-B(10), A-B(2).

*   **Iter 0 (Inicialización):** $d[S]=0$, $d[A]=\\infty$, $d[B]=\\infty$. Cola \`Q = [(S, 0)]\`.
*   **Iter 1:** Sacamos S(0). Relajamos vecinos A y B.
    *   Para A: $\\min(\\infty, 0 + 5) = 5$. Actualizamos $d[A]=5$. \`Q\` inserta \`(A, 5)\`.
    *   Para B: $\\min(\\infty, 0 + 10) = 10$. Actualizamos $d[B]=10$. \`Q\` inserta \`(B, 10)\`.
*   **Iter 2:** Sacamos el mínimo de la Cola, que es A(5). Su vecino es B. Relajamos:
    *   Para B: $\\min(10, 5 + 2) = \\min(10, 7) = 7$. Actualizamos $d[B]=7$. 
*   **Resultado final:** Desde S, llegar a A cuesta 5, llegar a B cuesta 7 (por la ruta S $\\rightarrow$ A $\\rightarrow$ B).

---

## 5. El Talón de Aquiles de Dijkstra: Pesos Negativos y Bellman-Ford
En un examen clásico de algoritmos (Cormen Cap 24.1) surge la pregunta: ¿Qué pasa si una arista tiene peso negativo? 
Dijkstra hace una asunción avariciosa y matemática crítica: **asume que al avanzar añadiendo aristas, el costo total solo puede crecer (o quedarse igual).** Una vez que Dijkstra saca un nodo de su Min-Heap, lo declara "terminado" bajo la promesa de que ningún desvío posterior podrá ser más barato, porque todos los tramos posteriores tendrán peso positivo.

Si introduces una arista de $-10$, rompes esta promesa. Dijkstra ignorará el camino negativo porque descartó esa rama antes por parecer inicialmente "muy cara", obteniendo resultados completamente erróneos.

Para grafos que contienen pesos negativos (como modelos financieros de arbitraje de divisas), debemos usar el **Algoritmo de Bellman-Ford**. Este algoritmo no usa heurística codiciosa; en cambio, relaja brutalmente absolutamente *todas* las aristas del grafo repetidas veces (exactamente $|V|-1$ iteraciones). Su complejidad es $O(|V||E|)$ (mucho más lento que Dijkstra), pero es robusto ante pesos negativos y capaz de detectar si existe un **Ciclo de Peso Negativo** (una anomalía donde puedes viajar en círculos ganando dinero infinito), en cuyo caso no existe solución.`,
    visualizerType: 'dijkstra',
    checkQuestions: [
        {
            id: 'q14-1',
            question: 'En la traza manual del algoritmo de Kruskal, tenemos las aristas ordenadas por peso: $A-B(1)$, $B-C(2)$, $A-C(3)$, $C-D(4)$. ¿Qué sucede matemáticamente cuando evaluamos la arista $A-C(3)$?',
            options: [
                'Se añade al árbol porque 3 es menor que 4.',
                'La estructura Union-Find (Disjoint-Set) detecta que `Find(A) == Find(C)`, lo que indica que agregarla formaría un ciclo. La arista se descarta.',
                'Se añade al árbol y esto provoca que el algoritmo termine inmediatamente.',
                'Dijkstra la relaja disminuyendo el valor de C a 3.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! Al procesar primero A-B(1) y B-C(2), los nodos A, B y C ya forman una única componente conexa. Cuando evaluamos A-C(3), la estructura Union-Find detectará que ya comparten "raíz" y la rechazará para evitar un triángulo (ciclo cerrado), que violaría la definición de un Árbol.',
            analogousExplanation: 'Kruskal dice: A ya es amigo de B, y B es amigo de C. Entonces A ya tiene una forma indirecta de llegar a C. No gastes asfalto construyendo una autopista directa y redundante A-C.'
        },
        {
            id: 'q14-2',
            question: 'Ejecutando Dijkstra desde el nodo $S=0$, tenemos las distancias actuales: $d[A]=5$ y $d[B]=\\infty$. Sacamos $A$ de la Cola de Prioridad y vemos una arista $A \\rightarrow B$ con peso $w=2$. Tras aplicar la operación de "relajación", ¿cuál es el nuevo estado de $B$?',
            options: [
                '$d[B] = 2$',
                '$d[B] = 7$, marcando que la ruta óptima temporalmente proviene de $A$.',
                '$d[A] = 7$',
                'La cola de prioridad descarta a $A$ por ser muy alto.'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! La relajación aplica la fórmula: $d[B] = \\min(\\infty, d[A] + w(A,B)) = \\min(\\infty, 5 + 2) = 7$. Como 7 es menor que infinito, actualizamos la distancia mínima a $B$ y anotamos que el mejor camino descubierto hasta ahora pasa por $A$.',
            analogousExplanation: 'Llegar al aeropuerto A te costó 5 horas. El vuelo de A hacia B dura 2 horas. Por lo tanto, el nuevo costo total conocido para llegar a B es 7 horas (y en tu itinerario marcas que pasaste por A).'
        },
        {
            id: 'q14-3',
            question: '¿Por qué el algoritmo de Dijkstra es matemáticamente incapaz de procesar correctamente grafos que contienen aristas con pesos negativos?',
            options: [
                'Porque utiliza una pila (Stack) en lugar de una Cola de Prioridad.',
                'Porque entra en un bucle infinito buscando valores más bajos.',
                'Por su asunción "Greedy": asume que al sumar aristas el costo total solo puede crecer. Al sacar un nodo del Min-Heap lo declara definitivo, ignorando que un desvío larguísimo podría tener una ganancia negativa enorme al final.',
                'Porque solo funciona sobre matrices de adyacencia y los índices no pueden ser negativos.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! Dijkstra está construido sobre la premisa de que los pesos son distancias físicas (siempre $\\ge 0$). Una vez que procesa el camino más corto conocido, asume ciegamente que cualquier otra ruta indirecta será más larga, negándose a revisar atajos engañosos que se "abaratan" más adelante gracias a números negativos.',
            analogousExplanation: 'Dijkstra asume que conducir más kilómetros siempre gasta más gasolina. Si de pronto te encuentras una gasolinera mágica que te "regala" gasolina por recorrer un tramo largo (peso negativo), el GPS de Dijkstra nunca la tomará en cuenta porque descartó esa ruta por considerarla "demasiado larga" al inicio.'
        },
        {
            id: 'q14-4',
            question: 'Si te enfrentas a un problema de optimización financiera (como arbitraje de divisas) modelado como un grafo dirigido donde existen aristas con pesos negativos. ¿Qué algoritmo debes usar (Cap 24.1 de Cormen) y qué ocurre si hay un "ciclo de peso negativo"?',
            options: [
                'Uso Dijkstra modificado. Si hay ciclos, Dijkstra los procesa correctamente.',
                'Uso BFS. Los ciclos provocan un crash de memoria.',
                'Uso Kruskal. Si hay ciclos, Union-Find los descarta y la ganancia se mantiene.',
                'Uso Bellman-Ford. Si existe un ciclo de peso negativo, el algoritmo alertará de su presencia porque las distancias tenderían a menos infinito, impidiendo un camino mínimo válido.'
            ],
            correctIndex: 3,
            explanation: '¡Correcto! Bellman-Ford es la solución general para caminos más cortos. Es más costoso ($O(|V||E|)$) porque no usa la asunción Greedy de Dijkstra, sino que prueba todos los caminos posibles repetidas veces. Su gran fortaleza es que detecta matemáticamente la presencia de "Ciclos de Peso Negativo" (bucles infinitos).',
            analogousExplanation: 'Un ciclo de peso negativo es como tener una máquina que, cada vez que giras una manivela, te da 10 dólares. La pregunta "¿Cuál es el camino más barato?" pierde sentido, porque la respuesta es "quedarme girando la manivela infinitamente". Bellman-Ford es el inspector que detecta que esa máquina está rota.'
        },
        {
            id: 'q14-5',
            question: 'A diferencia de Kruskal (que ordena todas las aristas globalmente), ¿cuál es la estrategia geométrica que utiliza el algoritmo de Prim para construir el Árbol de Expansión Mínima (MST)?',
            options: [
                'Encuentra el camino más corto a todos los nodos, y elimina las aristas largas.',
                'Inicia desde un nodo raíz y expande una componente conexa absorbiendo en cada paso al vecino "exterior" más cercano (la arista frontera de menor peso) usando una Cola de Prioridad.',
                'Itera todos los vértices y los conecta con sus vecinos si el índice del vértice es menor.',
                'Realiza una búsqueda en Profundidad (DFS) y rompe los ciclos que encuentre.'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! Prim es un algoritmo de crecimiento focalizado. Empieza como una semilla (un solo nodo) y mira todas sus ramas hacia el mundo exterior. Elige la rama más barata y absorbe ese nuevo nodo. Ahora, la semilla creció, y vuelve a mirar todas las fronteras de esta nueva masa conectada.',
            analogousExplanation: 'Como una mancha de humedad en la pared. Empieza en un punto y se va expandiendo lentamente, siempre buscando avanzar por las partes del yeso que ofrezcan menor resistencia (menor peso), manteniendo toda la mancha unida.'
        }
    ],
    exercises: [
      {
        id: "ex-t3-1",
        title: "Ejercicio Taller 3.1: Detección de Componentes Conexas (Disjoint Set) en C",
        description: "Implementa la función en C `bool conectaMismaComponente(int padres[], int u, int v)` usando la búsqueda de la raíz representante en un Disjoint Set.",
        cormenRef: "Taller 3 - Disjoint-Set Data Structures",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  // TODO: Retorna true si find(padres, u) == find(padres, v)\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  return find(padres, u) == find(padres, v);\n}",
        hint: "Retorna `find(padres, u) == find(padres, v)`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Misma componente padres=[0,0,2], u=0, v=1",
                    "input": "[0, 0, 2], 0, 1",
                    "expectedOutput": "true"
          }
        ],
        explanation: "Si dos nodos comparten el mismo representante raíz, pertenecen al mismo conjunto o componente conexa."
      }
    ],
    prevItemId: 'clase-13',
    nextItemId: 'taller-3'
  },

  {
    id: 'taller-3',
    number: 3,
    type: 'workshop',
    title: 'Taller 3 – Algoritmos de Grafos (Laboratorio)',
    topic: 'BFS, DFS, Dijkstra, Kruskal, Prim',
    cormenChapter: 'Laboratorio de Capítulos 22, 23 y 24',
    durationMinutes: 90,
    summary: 'Implementación y manipulación práctica de algoritmos de grafos sobre matrices y listas de adyacencia.',
    visualizerType: 'none',
    theoryContent: `## Laboratorio de Grafos\nEn este taller nos enfocamos en trasladar la teoría de Búsqueda y Caminos Mínimos a código C puro, aprendiendo a representar el "infinito", los estados de visitado y la gestión de memoria para grafos. Cuestiones como la inicialización de distancias y la estructura Union-Find son fundamentales.`,
    checkQuestions: [],
    exercises: [
      {
        id: "ex-t3-1",
        title: "Ejercicio Taller 3.1: Detección de Componentes Conexas (Disjoint Set) en C",
        description: "Implementa la función en C `bool conectaMismaComponente(int padres[], int u, int v)` usando la búsqueda de la raíz representante en un Disjoint Set.",
        cormenRef: "Taller 3 - Disjoint-Set Data Structures",
        initialCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  // TODO: Retorna true si find(padres, u) == find(padres, v)\n  return false;\n}",
        solutionCode: "#include <stdio.h>\n#include <stdbool.h>\n\nint find(int padres[], int i) {\n  if (padres[i] == i) return i;\n  return find(padres, padres[i]);\n}\n\nbool conectaMismaComponente(int padres[], int u, int v) {\n  return find(padres, u) == find(padres, v);\n}",
        hint: "Retorna `find(padres, u) == find(padres, v)`.",
        testCases: [
          {
            id: "t1",
            description: "Misma componente padres=[0,0,2], u=0, v=1",
            input: "[0, 0, 2], 0, 1",
            expectedOutput: "true"
          }
        ],
        explanation: "Si dos nodos comparten el mismo representante raíz, pertenecen al mismo conjunto o componente conexa."
      }
    ],
    prevItemId: 'clase-14',
    nextItemId: 'clase-15'
  },
  {
    visualizerType: 'none',
    id: 'clase-15',
    number: 15,
    type: 'class',
    title: 'Clase 15 – Técnicas de Diseño de Algoritmos',
    topic: 'Divide y Vencerás, Programación Dinámica (Corte de Varilla, Mochila) y Algoritmos Voraces (Greedy)',
    cormenChapter: 'Capítulos 15 (Dynamic Programming) y 16 (Greedy Algorithms)',
    durationMinutes: 70,
    summary: 'Aprender cuándo reutilizar soluciones de subproblemas traslapados (Programación Dinámica) vs tomar decisiones óptimas locales (Voraces).',
    theoryContent: `## 1. El Triunfo del Diseño sobre la Fuerza Bruta
A lo largo del curso hemos visto múltiples algoritmos, pero ¿cómo los ingenieros los inventan? En los Capítulos 15 y 16, Cormen describe los paradigmas fundamentales de diseño. Entender la diferencia entre Programación Dinámica (Dynamic Programming) y el Enfoque Voraz (Greedy) es la cúspide del diseño algorítmico moderno.

## 2. Programación Dinámica (Dynamic Programming)
Técnica inventada por Richard Bellman en los años 50. La idea central es brillante y sencilla: **Los que no recuerdan el pasado están condenados a repetirlo**.

Aplica cuando un problema cumple dos propiedades estrictas (Cormen Cap 15):
1.  **Subestructura Óptima:** La solución óptima al problema grande contiene las soluciones óptimas de sus subproblemas más pequeños.
2.  **Subproblemas Traslapados (Overlapping Subproblems):** Un algoritmo recursivo ingenuo resolvería *el mismo subproblema* una y otra vez, desperdiciando tiempo exponencial.

### Tabulación (Bottom-Up) y Memoización (Top-Down)
En lugar de recalcular, la Programación Dinámica guarda la respuesta de los subproblemas en una tabla. **Top-Down** es recursivo guardando en caché. **Bottom-Up** (preferido por no sobrecargar la pila recursiva) llena iterativamente un arreglo de los problemas más pequeños a los más grandes.

## 3. DP: El Problema del Corte de Varilla (Rod Cutting)
Tienes una varilla de acero de longitud $n$ y una lista de precios $p_i$ para cada tamaño $i$. ¿Cómo debes cortarla para maximizar tu ganancia $r_n$?

*   **Ecuación de Bellman:** $r_n = \max_{1 \le i \le n} (p_i + r_{n-i})$
*   **Fuerza Bruta Recursiva:** Complejidad $O(2^n)$. Recalcula los mismos cortes múltiples veces.
*   **Programación Dinámica (Bottom-Up):** Resolvamos las varillas desde tamaño 1 hasta $n$. Complejidad $O(n^2)$.

**Ejemplo de Tabla de Memoización (Precios: P[1]=1, P[2]=5, P[3]=8, P[4]=9):**
*   $r_1$: máx(P[1] + $r_0$) = 1
*   $r_2$: máx(P[1]+$r_1$, P[2]+$r_0$) = máx(2, 5) = 5
*   $r_3$: máx(P[1]+$r_2$, P[2]+$r_1$, P[3]+$r_0$) = máx(1+5, 5+1, 8+0) = 8
*   $r_4$: máx(P[1]+$r_3$, P[2]+$r_2$, P[3]+$r_1$, P[4]+$r_0$) = máx(1+8, 5+5, 8+1, 9+0) = 10 (¡Cortamos en dos de 2!)

## 4. DP: La Mochila 0/1 (Knapsack) y LCS
Otros clásicos de la Programación Dinámica (Cormen 15.3, 15.4):
*   **Longest Common Subsequence (LCS):** Encuentra la subsecuencia más larga común entre dos strings. Usado genéticamente para comparar ADN y en software de control de versiones (\`git diff\`). La tabla 2D guarda los matches de los sub-strings previos.
*   **Mochila 0/1:** Debes maximizar el valor en una mochila con capacidad $W$ sin excederla. No puedes partir los objetos. Esto genera un árbol de "tomar o no tomar" cada objeto. (¡Puedes ver esto interactivamente en el visualizador de DP de este curso!).

## 5. Algoritmos Voraces (Greedy Algorithms)
Los algoritmos voraces son los impacientes de la informática (Cormen Cap 16). Frente a una decisión, toman la elección que parece la mejor *en este momento preciso* (óptimo local), sin mirar nunca hacia el futuro y sin retractarse jamás (sin backtracking). Funciona increíblemente rápido (típicamente $O(n \log n)$ al ordenar datos previamente).

### Selección de Actividades y el Argumento de Intercambio
**El Problema:** Tienes $n$ actividades (charlas en un auditorio) con tiempos de inicio y fin. ¿Cómo metes la mayor cantidad de charlas sin que se solapen?

*   **Solución Greedy:** Ordena las charlas por **tiempo de finalización**. Siempre elige la que termine primero y no se solape con tu charla actual.
*   **Argumento de Intercambio (Exchange Argument):** ¿Cómo probamos matemáticamente que esta solución impulsiva siempre da el resultado perfecto? Supongamos que existe una solución óptima distinta. Si tomamos la primera charla de esa solución óptima y la *intercambiamos* por la nuestra (la que termina antes), liberamos tiempo en el auditorio sin perder la cantidad total de charlas. Por inducción, nuestra elección Greedy siempre es igual de buena o mejor que cualquier otra.

## 6. El Fracaso de Greedy: La Mochila 0/1 vs Fraccional
¿Por qué necesitamos Programación Dinámica si Greedy es tan rápido? Porque **Greedy a menudo se equivoca si el problema no exhibe la "Propiedad de Elección Voraz"**.

Veamos un contraejemplo clásico con la Mochila (Knapsack) de Capacidad $W=50$:
*   **Objeto A:** Pesa 10, Valor $60 (Densidad: $6/peso)
*   **Objeto B:** Pesa 20, Valor $100 (Densidad: $5/peso)
*   **Objeto C:** Pesa 30, Valor $120 (Densidad: $4/peso)

Un **Algoritmo Greedy** ordenaría por mayor densidad y tomaría "A". Luego queda espacio 40, toma "B". Queda espacio 20, y el Objeto C ya no entra. Valor Total: **$160** (Peso: 30).
La **Programación Dinámica**, mirando el panorama global, se da cuenta de que es mejor NO tomar "A", y en su lugar tomar "B" y "C". Valor Total: **$220** (Peso: 50). ¡Greedy fracasa miserablemente porque su miopía local le impidió llenar eficientemente el espacio restante!

*(Nota: Si los objetos fueran polvo de oro y se pudieran fraccionar, entonces Greedy SÍ sería óptimo. Esto se conoce como Mochila Fraccional).*

## 7. Glosario y Material de Apoyo
*   **Bottom-Up (Tabulación):** Enfoque iterativo en DP que resuelve subproblemas pequeños primero, llenando un arreglo iterativamente en lugar de recursivamente.
*   **Top-Down (Memoización):** Enfoque recursivo en DP que guarda resultados de llamadas a funciones en una caché.
*   **Argumento de Intercambio (Exchange Argument):** Técnica de demostración matemática para probar que un algoritmo Voraz es globalmente óptimo.
*   **CLRS (Cormen):** Lectura recomendada Cap. 15 (Rod Cutting, Matrix-chain, LCS) y Cap. 16 (Activity Selection, Huffman Codes).
`,
    checkQuestions: [
        {
            id: 'q15-1',
            question: 'Según Cormen, ¿cuál es la característica técnica clave que hace que un problema sea ideal para resolverse con Programación Dinámica (Dynamic Programming)?',
            options: [
                'Que el problema sea completamente aleatorio, forzando a crear simulaciones de Montecarlo.',
                'Poseer "Subproblemas Traslapados" (Overlapping Subproblems). Es decir, el árbol recursivo re-evalúa idénticamente el mismo subproblema múltiples veces.',
                'Que pueda resolverse usando la GPU en vez de la CPU.',
                'Poseer la "Propiedad de Elección Voraz", donde siempre la primera elección local es la mejor.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! La Programación Dinámica brilla exactamente allí donde la Recursividad Ingenua fracasa: re-computar lo mismo un millón de veces. Al guardar los resultados de los subproblemas traslapados en una memoria, transformamos tiempo exponencial en tiempo polinomial.',
            analogousExplanation: 'Si te pido calcular 50 * 200, haces el cálculo (10,000). Si 5 minutos después te vuelvo a pedir que calcules 50 * 200, no agarras la calculadora, simplemente recuerdas la respuesta (10,000). Eso es Programación Dinámica.'
        },
        {
            id: 'q15-2',
            question: 'A diferencia de la Programación Dinámica, ¿cómo actúa un algoritmo "Greedy" (Voraz) al tomar decisiones?',
            options: [
                'Almacena las decisiones en una tabla y las reevalúa todas al final para buscar la combinación matemáticamente perfecta.',
                'Divide el problema en dos mitades simétricas y espera resolverlas independientemente.',
                'Toma la elección que parece óptima en ese instante inmediato (óptimo local) y jamás retrocede (backtracking) ni reevalúa esa decisión, esperando que conduzca al óptimo global.',
                'Elige decisiones de forma aleatoria (RNG) para promediar el mejor caso.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. La esencia de la "Voracidad" es el compromiso inquebrantable con la decisión actual. No hay arrepentimiento, no hay revisión del pasado. Funciona increíblemente rápido ($O(n \log n)$ típicamente), pero solo es correcto si el problema exhibe la Propiedad de Elección Voraz.',
            analogousExplanation: 'Greedy es como jugar ajedrez comiéndote inmediatamente cualquier pieza desprotegida del oponente sin pensar en sus trampas a 5 turnos en el futuro. Si el oponente no sabe poner trampas (Dijkstra, Kruskal), ganas. Si sabe (Mochila 0-1), pierdes catastróficamente.'
        },
        {
            id: 'q15-3',
            question: 'Analizando el "Problema del Corte de Varilla" (Rod Cutting), un árbol recursivo ingenuo toma tiempo $O(2^n)$. Si aplicamos Tabulación (Bottom-Up Dynamic Programming), ¿a qué complejidad de tiempo se reduce típicamente la construcción de la tabla para una varilla de tamaño $n$?',
            options: [
                '$O(\log n)$',
                '$O(n^2)$',
                '$O(1)$',
                'No mejora la complejidad asintótica, solo reduce el uso de memoria RAM.'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! El método Bottom-Up llena una tabla iterando j desde 1 hasta n, y para cada tamaño j utiliza un bucle interno i desde 1 hasta j. Estos dos bucles anidados determinan un tiempo de ejecución cuadrático $O(n^2)$.',
            analogousExplanation: 'Pasar de $O(2^n)$ a $O(n^2)$ significa que para una varilla de 50 metros, el algoritmo ingenuo tardaría décadas de cómputo (más de mil billones de pasos), mientras que la Programación Dinámica la resuelve en un milisegundo (2500 pasos).'
        },
        {
            id: 'q15-4',
            question: 'Al resolver el problema de Selección de Actividades (Activity Selection), la solución Greedy elige consistentemente la actividad que **termina primero**. ¿Qué técnica usa Cormen para demostrar que esta elección "precipitada" siempre forma parte de una solución global óptima?',
            options: [
                'El Teorema de Flujo Máximo - Corte Mínimo.',
                'El Teorema del Límite Central.',
                'El Argumento de Intercambio (Exchange Argument). Demuestra que al reemplazar una actividad óptima por nuestra elección Greedy, no empeoramos la respuesta final y liberamos más tiempo útil.',
                'Una simulación iterativa Monte Carlo de todos los casos posibles.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! El Argumento de Intercambio es la técnica matemática estándar para probar algoritmos Voraces. Básicamente prueba que, si tienes la mejor solución posible imaginada, y le "intercambias" una pieza por la que el algoritmo Greedy habría elegido en ese momento, la solución final sigue siendo igual de buena o mejor. Eso demuestra matemáticamente que Greedy nunca se equivoca en este problema particular.',
            analogousExplanation: 'Es como demostrar que es siempre óptimo poner al libro más bajo de la biblioteca a la izquierda. Si tomas la biblioteca ordenada por un bibliotecario maestro y cambias su libro más a la izquierda por tu libro más bajito... no rompes el orden y posiblemente ganas espacio. Lo mismo hace Greedy al liberar tiempo.'
        },
        {
            id: 'q15-5',
            question: 'Se nos presenta el problema de la "Mochila 0/1" con Capacidad 50. Tenemos Objeto A(Peso 10, Valor 60, Densidad 6), Objeto B(Peso 20, Valor 100, Densidad 5) y Objeto C(Peso 30, Valor 120, Densidad 4). ¿Qué ocurre si resolvemos el problema con un Algoritmo Greedy ordenado por densidad (valor/peso), y por qué en su lugar se exige usar Programación Dinámica?',
            options: [
                'Greedy selecciona A, luego B, llenando 30 de espacio con 160 de valor. Y se equivoca. DP evaluaría todo el árbol de decisiones superpuestas reconociendo que seleccionar B y C produce 220 de valor usando exacto los 50 de peso.',
                'Greedy es capaz de resolverlo correctamente partiendo el Objeto C a la mitad para rellenar los 20 espacios faltantes, obteniendo el valor óptimo de 240.',
                'Greedy funciona perfecto para la Mochila 0/1; DP es innecesario.',
                'DP fraccionaría el Objeto B porque tiene propiedades de recursividad, logrando 300 de valor.'
            ],
            correctIndex: 0,
            explanation: '¡Muy bien! Este es el clásico contraejemplo que derrota la voracidad. Greedy se "enceguece" por el oro puro de alta densidad (A) y lo agarra sin pensar en las consecuencias. Al hacerlo, arruina geométricamente el espacio disponible e impide tomar la combinación perfecta (B+C) que la Programación Dinámica logra detectar porque evalúa globalmente la subestructura óptima.',
            analogousExplanation: 'Greedy prefiere meter una bola de boliche carísima en una maleta por su alto valor y dejar el resto vacío porque ninguna otra cosa grande cabe. La Programación Dinámica analiza el espacio global y dice: "Mejor no llevo la bola, sino lleno todo el espacio con dos paquetes medianos que sumados valen mucho más".'
        }
    ],
    exercises: [
      {
        id: "ex-15",
        title: "Ejercicio 15: Fibonacci con Programación Dinámica (DP) en C",
        description: "Implementa la función en C `long long fibonacciDP(int n)` utilizando un arreglo de memoria (Tabulación DP) para calcular el $n$-ésimo número de Fibonacci en tiempo $O(n)$.",
        cormenRef: "Cormen Cap 15.1 - Programación Dinámica",
        initialCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  // TODO: Asigna dp[0] = 0, dp[1] = 1 y llena la tabla hasta n\n  return 0;\n}",
        solutionCode: "#include <stdio.h>\n\nlong long fibonacciDP(int n) {\n  if (n <= 1) return n;\n  long long dp[100];\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}",
        hint: "Construye la tabla `dp[i] = dp[i-1] + dp[i-2]` de manera ascendente (Bottom-Up) desde $i=2$ hasta $n$.",
        testCases: [
          {
            id: "t1",
            description: "Fibonacci de 10",
            input: "10",
            expectedOutput: "55"
          },
          {
            id: "t2",
            description: "Fibonacci de 1",
            input: "1",
            expectedOutput: "1"
          }
        ],
        explanation: "La Programación Dinámica evita recalculaciones redundantes almacenando soluciones a subproblemas superpuestos en $O(n)$ tiempo."
      }
    ],
    prevItemId: 'taller-3',
    nextItemId: 'clase-16'
  },
{
    id: 'clase-16',
    number: 16,
    type: 'review',
    title: 'Clase 16 – Repaso Final y Mapa Conceptual',
    topic: 'Síntesis global de los algoritmos y estructuras de datos aprendidos, complejidades y casos de uso.',
    cormenChapter: 'Resumen Global',
    durationMinutes: 90,
    summary: 'Consolidación final del curso: un mapa conceptual definitivo de cuándo usar qué algoritmo y un examen integrador de todos los temas.',
    visualizerType: 'none',
    theoryContent: `## 1. El Mapa Conceptual del Ingeniero
A lo largo de este curso, hemos analizado y desglosado el libro "*Introduction to Algorithms*" de Cormen, Leiserson, Rivest y Stein (CLRS). No hemos aprendido simples líneas de código, sino un **arsenal matemático y estructural** para resolver problemas reales. 

En la ingeniería de software de élite, el desafío rara vez es la sintaxis del lenguaje. El verdadero desafío es: **"Tengo un problema de negocio. ¿Qué estructura de datos lo modela y qué algoritmo lo resuelve eficientemente?"**.

## 2. Tabla Resumen de Algoritmos (Cheatsheet)
A continuación, el resumen definitivo de los algoritmos y estructuras dominados en este curso. Hemos incluido tanto aquellos que cuentan con **soporte interactivo en el Visualizador de la plataforma** como los que estudiamos como **fundamentos teóricos avanzados**.

| Algoritmo | Paradigma | Complejidad | Caso de Uso / Contexto | Visualizador |
| :--- | :--- | :--- | :--- | :--- |
| **Punteros / Ventana Deslizante** | Optimización Lineal | $O(n)$ | Recorrer arrays buscando sub-rangos óptimos o pares (Two Pointers, Sliding Window). | 🟢 Sí |
| **Pilas (Stack) / Colas (Queue)** | Estructuras Base | $O(1)$ op | LIFO (deshacer, llamadas a función) y FIFO (filas, buffers de tareas). | 🟢 Sí |
| **Búsqueda Binaria** | Divide y Vencerás | $O(\\log n)$ | Buscar velozmente en arrays que **ya están ordenados**. Base de índices de BD. | 🟢 Sí |
| **Bubble / Selection Sort** | Fuerza Bruta | $O(n^2)$ | Fines didácticos. Burbujeo de adyacentes o selección del mínimo. | 🟢 Sí |
| **Insertion Sort** | Incremental | $O(n^2)$ | Arrays casi ordenados o conjuntos muy pequeños. ($O(n)$ mejor caso). | 🟢 Sí |
| **Merge Sort** | Divide y Vencerás | $O(n \\log n)$ | Ordenamiento garantizado estable. Excelente para bases masivas (ordenamiento externo). | 🟢 Sí |
| **Quick Sort** | Divide y Vencerás | $O(n \\log n)$ | Ordenamiento *in-place* general. Baja constante, el más rápido en la práctica (RAM). | 🟢 Sí |
| **N-Queens** | Backtracking | $O(n!)$ | Exploración exhaustiva con poda. Resolver tableros y puzzles complejos. | 🟢 Sí |
| **BFS (Anchura)** | Búsqueda en Grafos | $O(V + E)$ | Encontrar el camino más corto (menor número de saltos) en grafos **sin pesos**. | 🟢 Sí |
| **Mochila 0/1 (Knapsack)** | Prog. Dinámica | $O(n \\cdot W)$ | Maximizar valor bajo restricción de capacidad (Subproblemas traslapados). | 🟢 Sí |
| **Heap Sort** | Estructuras de Datos | $O(n \\log n)$ | Ordenamiento *in-place* con garantía estricta. Sistemas de tiempo real seguros. | 📘 Teórico |
| **DFS (Profundidad)**| Búsqueda en Grafos | $O(V + E)$ | Detectar ciclos (back-edges), resolver laberintos, Ordenamiento Topológico. | 📘 Teórico |
| **Dijkstra** | Greedy | $O(E \\log V)$ | Rutas GPS más cortas en grafos con pesos **positivos**. | 📘 Teórico |
| **Bellman-Ford** | Prog. Dinámica | $O(V \\cdot E)$ | Camino más corto con **pesos negativos** y detectar ciclos negativos (arbitraje). | 📘 Teórico |
| **Kruskal / Prim** | Greedy | $O(E \\log V)$ | Conectar redes (MST) gastando el mínimo cable/asfalto global posible. | 📘 Teórico |
| **Selección de Actividades**| Greedy | $O(n \\log n)$ | Optimizar recursos compartidos usando la Propiedad de Elección Voraz. | 📘 Teórico |

## 3. El Camino a Seguir
Has dominado la **Base Algorítmica**. Algunos temas (como Dijkstra o los Árboles de Expansión) quedan como fundamentos teóricos invaluables de diseño, mientras que otros están codificados como herramientas interactivas. Tus siguientes pasos en CLRS hacia la arquitectura de élite son:
*   **Grafos Avanzados:** Flujo Máximo (Ford-Fulkerson) para redes logísticas y emparejamiento.
*   **Estructuras de Datos Avanzadas:** Árboles B (motores de bases de datos relacionales) y Árboles Red-Black.
*   **NP-Completitud (Cap 34):** Aprender a demostrar matemáticamente cuando un problema es literalmente intratable de resolver rápidamente, y cómo usar algoritmos de aproximación.

¡La plataforma quedará desbloqueada para que regreses a **practicar con los 13 visualizadores interactivos**, reescribas los laboratorios en código y repases la teoría avanzada para tus exámenes!`,
    checkQuestions: [
        {
            id: 'q16-1',
            question: 'Si en una entrevista técnica te piden diseñar una red de fibra óptica para conectar 1000 ciudades minimizando los kilómetros totales de cable a utilizar, ¿qué algoritmo de tu arsenal eliges?',
            options: [
                'Dijkstra, porque encuentra la ruta más corta.',
                'Kruskal o Prim (Árbol de Expansión Mínima), porque conectan todos los nodos garantizando el menor peso global de aristas.',
                'Mergesort, para ordenar las ciudades alfabéticamente.',
                'Programación Dinámica con la Ecuación de Bellman.'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! Este es el caso clásico del Árbol de Expansión Mínima (MST). Dijkstra encuentra la ruta óptima desde UN origen a UN destino, pero el MST garantiza que TODAS las ciudades estén conectadas formando un único grafo conexo con el menor gasto total de cable (aristas).',
            analogousExplanation: 'Dijkstra es el GPS para tu auto. Kruskal es el gobierno decidiendo cómo pavimentar las carreteras gastando el mínimo de asfalto para que ningún pueblo quede aislado.'
        },
        {
            id: 'q16-2',
            question: 'El entrevistador te muestra una función recursiva que calcula los números de Fibonacci. Te das cuenta de que para $n=50$, el servidor colapsa por timeout tras minutos calculando. ¿Qué técnica aplicas inmediatamente?',
            options: [
                'Cambiar el lenguaje de programación a C para que corra más rápido.',
                'Algoritmo Voraz (Greedy).',
                'Programación Dinámica (Memoización o Tabulación) para almacenar en un arreglo los números de Fibonacci ya calculados y evitar recalcularlos.',
                'Aumentar la memoria RAM del servidor.'
            ],
            correctIndex: 2,
            explanation: '¡Perfecto! Fibonacci es el ejemplo por excelencia de Subproblemas Traslapados. La recursión ingenua recalcula subproblemas idénticos exponenciales veces. Al guardar los resultados en un array de tamaño 50, el tiempo de cálculo baja de años a microsegundos.',
            analogousExplanation: 'Si el servidor es un oficinista, la recursión es pedirle que cuente con los dedos cada vez. La Programación Dinámica es darle una libreta para que anote el resultado y simplemente lo lea la próxima vez que se lo preguntes.'
        },
        {
            id: 'q16-3',
            question: 'Si te piden detectar fraude en transacciones bancarias (lavado de dinero), representas las cuentas como nodos y transferencias como aristas dirigidas. Descubrir un "Ciclo" demuestra el fraude. ¿Qué algoritmo de grafos usas?',
            options: [
                'BFS (Búsqueda en Anchura).',
                'DFS (Búsqueda en Profundidad), buscando una "Arista de Retroceso" (Back-Edge) hacia un nodo en estado Gris (En Progreso).',
                'Quicksort sobre las transacciones.',
                'Dijkstra.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! DFS con coloreado de nodos (Blanco, Gris, Negro) es la herramienta matemática suprema para detectar ciclos en grafos dirigidos. Si DFS choca con un nodo que actualmente está en la pila de recursión (Gris), el ciclo está demostrado matemáticamente.',
            analogousExplanation: 'Si vas dejando un rastro de pintura fresca (Gris) por las calles que caminas, y de repente pisas pintura fresca, significa que has caminado en círculos y volviste al punto de partida.'
        },
        {
            id: 'q16-4',
            question: 'Diseñando una base de datos, te das cuenta de que hacer un "SELECT" buscando un número de identidad (ID) en un archivo desordenado toma tiempo $O(n)$. ¿Qué proponen CLRS para reducir este tiempo drásticamente?',
            options: [
                'Nada, $O(n)$ es lo más rápido posible si se usa un procesador veloz.',
                'Aplicar Kruskal a la base de datos.',
                'Usar algoritmos Greedy aleatorios.',
                'Mantener el archivo ordenado o usar un Árbol Binario de Búsqueda (BST) para habilitar Búsqueda Binaria, bajando el tiempo a $O(\log n)$.'
            ],
            correctIndex: 3,
            explanation: '¡Correcto! Esta es la base teórica de los "Índices" en Bases de Datos. En lugar de leer un millón de filas una por una (Búsqueda Lineal $O(n)$), si los IDs están ordenados, un Árbol o Búsqueda Binaria encontrará el registro en apenas ~20 pasos ($O(\log n)$).',
            analogousExplanation: 'En vez de leer un diccionario página por página (Búsqueda Lineal), abres el diccionario por la mitad y descartas la mitad inútil repetidamente (Búsqueda Binaria/Árboles).'
        },
        {
            id: 'q16-5',
            question: 'En un sistema de mapas de GPS, las rutas de una ciudad tienen tiempos (pesos) en las calles. Hay un error en el sistema de peajes que registra un tramo con un costo de peaje "negativo". ¿Por qué fallará Dijkstra y qué algoritmo deberíamos usar en su lugar?',
            options: [
                'Dijkstra fallará porque asume que una vez visitado un nodo, el camino hacia él es óptimo (no retrocede). Se debe usar Bellman-Ford, que puede manejar pesos negativos.',
                'Dijkstra nunca falla, simplemente convertirá el peso negativo a positivo usando valor absoluto.',
                'Se debe usar Kruskal porque es más resistente a errores de base de datos.',
                'Dijkstra fallará porque los GPS usan BFS obligatoriamente.'
            ],
            correctIndex: 0,
            explanation: '¡Muy bien! El algoritmo de Dijkstra (Voraz) asume que sumar más aristas a un camino siempre aumenta su costo, por lo que una vez que finaliza un nodo, confía ciegamente en que es inmejorable. Bellman-Ford "relaja" todas las aristas múltiples veces, permitiéndole retroceder y corregir caminos si detecta que un peso negativo abarata una ruta ya visitada.',
            analogousExplanation: 'Dijkstra nunca mira atrás; asume que avanzar cuesta dinero. Si existe un camino mágico que te devuelve dinero (peso negativo), Dijkstra nunca lo verá. Bellman-Ford revisa meticulosamente todas las rutas varias veces buscando esas ofertas.'
        },
        {
            id: 'q16-6',
            question: 'Estás diseñando la base de datos para una tienda y tienes que elegir un algoritmo de ordenamiento para ordenar cientos de miles de transacciones diariamente. Necesitas garantía estricta de tiempo (sin peores casos malos) pero tienes RAM muy limitada. ¿Cuál algoritmo seleccionas?',
            options: [
                'Merge Sort. Tiene garantía $O(n \log n)$.',
                'Insertion Sort, porque los datos de las tiendas casi siempre están preordenados.',
                'Heap Sort. Garantiza $O(n \log n)$ en el peor caso y opera in-place, consumiendo $O(1)$ de memoria extra.',
                'Quick Sort. Es el más rápido en la práctica.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! Aunque Merge Sort y Heap Sort ambos garantizan $O(n \log n)$, Merge Sort no es "in-place" y requiere RAM adicional igual al tamaño de los datos. Quick Sort es in-place y rápido, pero sufre de un peor caso $O(n^2)$. Heap Sort es el único que combina ambas virtudes críticas para tu limitación: $O(n \log n)$ de peor caso Y consumo de memoria $O(1)$.',
            analogousExplanation: 'Heap Sort es como un coche todoterreno: no es el más veloz en la autopista de carreras (donde gana Quicksort), pero te asegura que llegará a la meta en un tiempo constante sin importar cuán difícil sea el terreno (peor caso), y gasta un tanque de gasolina pequeñísimo (in-place).'
        },
        {
            id: 'q16-7',
            question: 'Se requiere calcular la cantidad de "saltos" (conexiones de red) que hace un paquete de internet desde tu PC hasta un servidor en Japón, asumiendo que todos los saltos toman el mismo tiempo de tránsito. ¿Qué algoritmo te dirá la ruta con menos saltos?',
            options: [
                'Algoritmo Voraz (Greedy).',
                'Programación Dinámica (Rod Cutting).',
                'Prim (Árbol de Expansión Mínima).',
                'BFS (Búsqueda en Anchura).'
            ],
            correctIndex: 3,
            explanation: '¡Perfecto! Como todos los saltos toman el mismo tiempo (el grafo "no tiene pesos" o todas las aristas pesan 1), el algoritmo óptimo para la ruta más corta es BFS. Explorar nivel por nivel garantiza que el primer camino que llegue al servidor de destino sea matemáticamente el de menos saltos.',
            analogousExplanation: 'Si el agua se inunda a través de túneles en todas direcciones a la misma velocidad (BFS), el agua mojará primero el lugar más cercano en distancia absoluta.'
        },
        {
            id: 'q16-8',
            question: 'Tienes 1,000,000 de registros casi completamente ordenados. Solo unos 5 registros están fuera de su posición. ¿Qué algoritmo de ordenamiento completaría el trabajo casi instantáneamente (en tiempo $O(n)$)?',
            options: [
                'Heap Sort.',
                'Insertion Sort.',
                'Merge Sort.',
                'Quick Sort.'
            ],
            correctIndex: 1,
            explanation: '¡Correcto! Esta es la trampa clásica. Algoritmos de "fuerza bruta" o supuestamente malos pueden ser perfectos en contextos específicos. Insertion Sort es de tiempo lineal $O(n)$ cuando el array está casi o completamente ordenado, superando a los algoritmos $O(n \log n)$ que realizarían particiones y fisiones innecesarias.',
            analogousExplanation: 'Si tienes un mazo de cartas ordenado y alguien saca una sola carta y la pone al principio... no barajas de nuevo y usas una técnica matemática compleja (Quicksort). Simplemente tomas esa carta y la empujas hasta su lugar (Insertion Sort).'
        }
    ],
    exercises: [],
    prevItemId: 'clase-15'
  }];

export const COURSES_DATA: CourseItem[] = RAW_COURSES_DATA.map((item) => ({
  ...item,
  exercises: EXERCISES_BY_COURSE[item.id] || item.exercises || [],
}));