const fs = require('fs');
let code = fs.readFileSync('src/data/coursesData.ts', 'utf8');

const p9 = code.indexOf("id: 'clase-9',");
let startIdx = p9;
while(code[startIdx] !== '{') {
    startIdx--;
}

const endIdx = code.indexOf("id: 'taller-2',", p9);
let endBound = endIdx;
while(code[endBound] !== '{') {
    endBound--;
}

const prefix = code.substring(0, startIdx);
const suffix = code.substring(endBound);

const replacement = `{
    id: 'clase-9',
    number: 9,
    type: 'class',
    title: 'Clase 9 – Recurrencias y Método Maestro',
    topic: 'Análisis de algoritmos recursivos, resolución de ecuaciones de recurrencia y el Teorema Maestro',
    cormenChapter: 'Capítulo 4: Método Maestro y Árboles de Recurrencia',
    durationMinutes: 65,
    summary: 'Aprender la herramienta matemática definitiva de Cormen para resolver la complejidad de algoritmos tipo Divide y Vencerás.',
    theoryContent: \`## 1. La Naturaleza de las Recurrencias
Cuando diseñamos algoritmos usando el paradigma de **Divide y Vencerás** (Divide and Conquer), el tiempo de ejecución natural se expresa matemáticamente mediante una ecuación de recurrencia. Por ejemplo, en Merge Sort dividimos el problema a la mitad ($n/2$) dos veces, y luego juntamos los resultados en tiempo lineal ($n$). Esto genera la recurrencia: $T(n) = 2T(n/2) + \\\\Theta(n)$.
Para resolver estas ecuaciones y hallar su cota asintótica, Cormen (Cap. 4) propone tres métodos principales.
 
## 2. Método de Sustitución y Árbol de Recursión
Antes de saltar a fórmulas prefabricadas, es vital entender cómo se desenvuelve la recursión:
*   **Método del Árbol de Recursión:** Dibujamos un árbol donde cada nodo representa el costo de un subproblema. Sumamos los costos horizontales por nivel y luego sumamos todos los niveles verticalmente. Es excelente para visualizar por qué surgen términos como $n \\\\log n$ (un árbol de altura $\\\\log n$ donde cada nivel cuesta $n$).
*   **Método de Sustitución:** Adivinamos una cota asintótica inicial y luego usamos inducción matemática pura para demostrar que nuestra suposición es correcta. Es el método más riguroso y poderoso, pero requiere intuición matemática para la "adivinanza".
 
## 3. El Teorema Maestro (Master Theorem)
El Teorema Maestro ofrece una "receta de cocina" directa para resolver recurrencias de la forma:
$$T(n) = aT(n/b) + f(n)$$
Donde:
*   $a \\\\ge 1$: Número de subproblemas en la recursión.
*   $b > 1$: Factor por el cual se divide el tamaño del problema original.
*   $f(n)$: Costo del trabajo realizado fuera de las llamadas recursivas (dividir y combinar en el nivel actual).
 
El "truco" del teorema es comparar el costo local $f(n)$ con la función $n^{\\\\log_b a}$ (que representa el costo total acumulado en las hojas del árbol). Existen tres escenarios de competencia:
 
**Caso 1: Las hojas dominan (Muchos subproblemas)**
Si $f(n) = O(n^{\\\\log_b a - \\\\epsilon})$ para alguna constante $\\\\epsilon > 0$.
**Resultado:** $T(n) = \\\\Theta(n^{\\\\log_b a})$.
*(El peso computacional es tan pesado en el fondo del árbol que el trabajo en la raíz es insignificante).*
 
**Caso 2: Equilibrio perfecto**
Si $f(n) = \\\\Theta(n^{\\\\log_b a})$.
**Resultado:** $T(n) = \\\\Theta(n^{\\\\log_b a} \\\\log n)$.
*(El costo de dividir/combinar se distribuye equitativamente a lo largo de todos los niveles del árbol. Multiplicamos por la altura $\\\\log n$).*
 
**Caso 3: La raíz domina (Mucho trabajo local)**
Si $f(n) = \\\\Omega(n^{\\\\log_b a + \\\\epsilon})$ para alguna constante $\\\\epsilon > 0$, **Y** se cumple la **condición de regularidad**:
$a \\\\cdot f(n/b) \\\\le c \\\\cdot f(n)$ para alguna constante $c < 1$ y todo $n$ suficientemente grande.
**Resultado:** $T(n) = \\\\Theta(f(n))$.
*(El trabajo de combinar/dividir en el nivel superior es tan abrumadoramente costoso que eclipsa absolutamente todo el trabajo recursivo sucesivo).*
 
## 4. Ejemplos Resueltos Paso a Paso
 
**Ejemplo A: $T(n) = 2T(n/2) + n$ (Merge Sort)**
*   Identificamos: $a=2, b=2, f(n)=n$.
*   Calculamos el crítico de hojas: $n^{\\\\log_b a} = n^{\\\\log_2 2} = n^1 = n$.
*   Comparamos: $f(n) = n$ y hojas $= n$. Son exactamente iguales asintóticamente.
*   Aplicamos **Caso 2**.
*   **Resultado:** $T(n) = \\\\Theta(n \\\\log n)$.
 
**Ejemplo B: $T(n) = T(n/2) + 1$ (Búsqueda Binaria)**
*   Identificamos: $a=1, b=2, f(n)=1$.
*   Calculamos el crítico de hojas: $n^{\\\\log_b a} = n^{\\\\log_2 1} = n^0 = 1$.
*   Comparamos: $f(n) = 1$ y hojas $= 1$. Son iguales.
*   Aplicamos **Caso 2**.
*   **Resultado:** $T(n) = \\\\Theta(1 \\\\cdot \\\\log n) = \\\\Theta(\\\\log n)$.
 
**Ejemplo C: $T(n) = 8T(n/2) + n^2$**
*   Identificamos: $a=8, b=2, f(n)=n^2$.
*   Calculamos el crítico de hojas: $n^{\\\\log_b a} = n^{\\\\log_2 8} = n^3$.
*   Comparamos: $f(n) = n^2$ contra hojas $= n^3$. Claramente $n^2 = O(n^{3-1})$, por lo que la raíz es polinomialmente menor.
*   Aplicamos **Caso 1**.
*   **Resultado:** $T(n) = \\\\Theta(n^3)$.
 
## 5. Referencias y Limitaciones
*   **Cormen, Cap. 4 (Divide-and-Conquer):** Contiene las pruebas formales (páginas 93-97).
*   **Advertencia:** El Teorema Maestro NO es universal. Si la diferencia entre $f(n)$ y $n^{\\\\log_b a}$ no es polinomial (por ejemplo, difieren solo por un factor de $\\\\log n$), el teorema estándar falla y debemos recurrir al método de sustitución avanzado.\`,
    visualizerType: 'recursion_tree',
    checkQuestions: [
        {
            id: 'q9-1',
            question: 'En la ecuación estructural $T(n) = aT(n/b) + f(n)$ del Teorema Maestro, ¿qué representa matemáticamente la variable $a$?',
            options: [
                'El costo de combinar los resultados en el nivel superior.',
                'El factor de reducción del tamaño de entrada de la recursión.',
                'El número de llamadas recursivas (la cantidad de subproblemas) que se originan en cada paso.',
                'La cota asintótica final del algoritmo.'
            ],
            correctIndex: 2,
            explanation: '¡Exacto! La variable $a$ multiplica a la función $T$, indicando cuántas ramas hijas nacen de cada nodo del árbol de recursividad (cuántos subproblemas se generan).',
            analogousExplanation: 'Si $a=2$, significa que cada vez que divides el problema, invocas 2 copias más pequeñas de ti mismo (como clonarse en 2 mini-versiones).'
        },
        {
            id: 'q9-2',
            question: 'Si resolvemos la recurrencia $T(n) = 4T(n/2) + n$, ¿cuál es el resultado y a qué caso del Teorema Maestro corresponde?',
            options: [
                '$\\\\Theta(n)$ por el Caso 3.',
                '$\\\\Theta(n \\\\log n)$ por el Caso 2.',
                '$\\\\Theta(n^2)$ por el Caso 1.',
                'No se puede resolver con el Teorema Maestro.'
            ],
            correctIndex: 2,
            explanation: '¡Muy bien! $a=4, b=2$. El costo de hojas es $n^{\\\\log_2 4} = n^2$. Como $f(n) = n$ es asintóticamente menor polinomialmente que $n^2$, aplica el Caso 1 (las hojas dominan). El resultado es $\\\\Theta(n^2)$.',
            analogousExplanation: 'Crear 4 subproblemas partiendo a la mitad es demasiado explosivo. El trabajo de hacer tantas divisiones sepulta al simple esfuerzo lineal ($n$) de combinarlos.'
        },
        {
            id: 'q9-3',
            question: 'Para aplicar el Caso 3 (La raíz domina), se requiere que $f(n)$ sea mayor que $n^{\\\\log_b a}$ polinomialmente, Y además se debe cumplir una condición extra. ¿Cuál es?',
            options: [
                'La condición de equilibrio: $a=b$.',
                'La condición de regularidad: $a \\\\cdot f(n/b) \\\\le c \\\\cdot f(n)$ para $c < 1$.',
                'La condición de positividad: $f(n)$ debe ser siempre impar.',
                'La condición límite de sustitución.'
            ],
            correctIndex: 1,
            explanation: '¡Perfecto! La condición de regularidad garantiza que el trabajo real decrece constantemente a medida que bajamos por el árbol, asegurando que la raíz es verdaderamente el cuello de botella computacional dominante.',
            analogousExplanation: 'Asegura que "el jefe" (la raíz) realmente trabaja más que "los empleados" (subproblemas) combinados. Si no, la jerarquía se rompe.'
        },
        {
            id: 'q9-4',
            question: '¿Qué método general de resolución requiere proponer una complejidad inicial (adivinar) y luego demostrar formalmente que es cierta usando inducción matemática?',
            options: [
                'El Método del Árbol de Recursión.',
                'El Teorema Maestro.',
                'El Método de Sustitución.',
                'El Análisis de Grafos.'
            ],
            correctIndex: 2,
            explanation: 'Correcto. El Método de Sustitución (Substitution Method) asume una respuesta (ej. $T(n) \\\\le c \\\\cdot n^2$) y luego fuerza matemáticamente esa cota por inducción sobre la ecuación recursiva original.',
            analogousExplanation: 'Como en un juicio: formulas la hipótesis (adivinas) y luego presentas pruebas irrefutables (inducción) para convencer al juez.'
        },
        {
            id: 'q9-5',
            question: 'En un algoritmo tipo "Divide y Vencerás" donde la recurrencia es $T(n) = 2T(n/2) + n$, ¿por qué el Teorema Maestro determina que la complejidad es $\\\\Theta(n \\\\log n)$?',
            options: [
                'Porque siempre que $a=2$ el resultado es un logaritmo por convención matemática.',
                'Porque se aplica el Caso 2: El costo de las hojas ($n^{\\\\log_2 2} = n$) y el trabajo local $f(n)=n$ crecen exactamente a la misma tasa de dominancia.',
                'Porque aplica el Caso 3, la raíz $n$ domina a las hojas.',
                'Porque la recursión no puede ser lineal.'
            ],
            correctIndex: 1,
            explanation: '¡Excelente! En el Caso 2 hay un "empate" perfecto. Ningún nivel del árbol de ejecución pesa asintóticamente más que otro. Como cada nivel toma trabajo $n$, y hay $\\\\log_2 n$ niveles de altura, el total acumulado es $n \\\\cdot \\\\log n$.',
            analogousExplanation: 'Es como un edificio donde cada piso tiene el mismo número de ladrillos. El peso total es (ladrillos por piso) $\\\\times$ (altura del edificio).'
        }
    ],
    exercises: [
      {
        id: "ex-9",
        title: "Ejercicio 9: Evaluador de Casos del Método Maestro en C",
        description: "Implementa la función en C \`const char* resolverMetodoMaestro(double a, double b, double d)\` que retorne el tiempo asintótico según los 3 casos del Método Maestro.",
        cormenRef: "Cormen Cap 4.5 - Método Maestro",
        initialCode: "#include <stdio.h>\\n#include <math.h>\\n\\nconst char* resolverMetodoMaestro(double a, double b, double d) {\\n  // log_b(a) = log(a) / log(b)\\n  // Compara log_b(a) contra d\\n  \\n  // TODO: Escribe tu lógica en C\\n  return \\"\\";\\n}",
        solutionCode: "#include <stdio.h>\\n#include <math.h>\\n\\nconst char* resolverMetodoMaestro(double a, double b, double d) {\\n  double log_b_a = log(a) / log(b);\\n  if (fabs(log_b_a - d) < 0.0001) {\\n    return \\"Case 2: Theta(n^d * log n)\\";\\n  } else if (log_b_a > d) {\\n    return \\"Case 1: Theta(n^log_b_a)\\";\\n  } else {\\n    return \\"Case 3: Theta(n^d)\\";\\n  }\\n}",
        hint: "Calcula \`double log_b_a = log(a) / log(b);\` usando \`<math.h>\` y compara con \`d\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "a=2, b=2, d=1 (log_2(2)=1 == d=1)",
                    "input": "2, 2, 1",
                    "expectedOutput": "Case 2: Theta(n^d * log n)"
          },
          {
                    "id": "t2",
                    "description": "a=4, b=2, d=1 (log_2(4)=2 > d=1)",
                    "input": "4, 2, 1",
                    "expectedOutput": "Case 1: Theta(n^log_b_a)"
          }
        ],
        explanation: "El Método Maestro compara la tasa de división del trabajo $n^{\\\\log_b a}$ contra la función de combinación $f(n) = O(n^d)$."
      }
    ],
    prevItemId: 'clase-8',
    nextItemId: 'taller-2'
  },
  `;

fs.writeFileSync('src/data/coursesData.ts', prefix + replacement + suffix);
console.log("Replaced Clase 9 successfully!");
