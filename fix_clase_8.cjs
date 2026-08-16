const fs = require('fs');
let code = fs.readFileSync('src/data/coursesData.ts', 'utf8');

const p8 = code.indexOf("id: 'clase-8'");
// Find start of clase-8 block
let startIdx = p8;
while(code[startIdx] !== '{') {
    startIdx--;
}
startIdx -= 2;

const endIdx = code.indexOf("prevItemId: 'clase-7'", p8) + "prevItemId: 'clase-7'\n  }".length;

const prefix = code.substring(0, startIdx);
const suffix = code.substring(endIdx);

const replacement = `{
    id: 'clase-8',
    number: 8,
    type: 'class',
    title: 'Clase 8 – Análisis Asintótico y Notación Big-O',
    topic: 'Crecimiento de funciones, Cotas Superiores/Inferiores (O, \\Omega, \\Theta) y Análisis Matemático de Algoritmos',
    cormenChapter: 'Capítulo 3: Growth of Functions',
    durationMinutes: 75,
    summary: 'Aprende a analizar el rendimiento de tus algoritmos con el rigor matemático de la Notación Asintótica, el lenguaje universal de la informática.',
    theoryContent: \`## 1. La Necesidad del Análisis Asintótico
Cuando analizamos la eficiencia de un algoritmo, medir los milisegundos exactos en un cronómetro es inútil: un procesador M3 de Apple siempre ejecutará un algoritmo ineficiente más rápido que un viejo Pentium 4. Lo que distingue a la ingeniería de software de élite es evaluar la **tasa de crecimiento** (*Growth Rate*) del algoritmo.

¿Cómo se comporta nuestro código a medida que la entrada de datos ($n$) tiende a infinito ($n \\\\to \\\\infty$)? ¿Qué sucede si la base de datos pasa de 1,000 registros a 1,000,000? Aquí entra la matemática de las **Notaciones Asintóticas** (Cormen Cap. 3).

## 2. Definiciones Formales: $O$, $\\\\Omega$ y $\\\\Theta$
En lugar de contar cada pequeña asignación de memoria, clasificamos las funciones de tiempo $f(n)$ en conjuntos algebraicos:

### Big-O ($O$) - La Cota Superior (Peor Caso)
$O(g(n))$ representa el conjunto de funciones $f(n)$ para las cuales existen constantes positivas $c$ y $n_0$ tales que:
$$0 \\\\le f(n) \\\\le c \\\\cdot g(n) \\\\text{ para todo } n \\\\ge n_0$$
*   **Significado:** Tu algoritmo es "a lo sumo" tan lento como $g(n)$. Si tienes $O(n^2)$, tienes la garantía matemática de que, sin importar qué tan mala sea la entrada, la curva de tiempo jamás cruzará por encima de una parábola escalada.

### Big-Omega ($\\\\Omega$) - La Cota Inferior (Mejor Caso)
$\\\\Omega(g(n))$ representa las funciones donde:
$$0 \\\\le c \\\\cdot g(n) \\\\le f(n) \\\\text{ para todo } n \\\\ge n_0$$
*   **Significado:** Tu algoritmo tardará "al menos" esto. Ningún atajo lo hará más rápido. Por ejemplo, ordenar comparando elementos siempre será $\\\\Omega(n \\\\log n)$.

### Big-Theta ($\\\\Theta$) - La Cota Estricta
Si un algoritmo pertenece a $O(g(n))$ y también a $\\\\Omega(g(n))$, entonces decimos que pertenece a $\\\\Theta(g(n))$.
*   **Significado:** La función crece **exactamente** a la misma tasa que $g(n)$ al ignorar las constantes. Es el "santo grial" del análisis, porque tienes acorralado al algoritmo por arriba y por abajo.

## 3. Demostrando Cotas (La "Carrera" Matemática)
Para demostrar formalmente que $3n^2 + 5n = O(n^3)$:
Buscamos un $c > 0$ y $n_0 > 0$ tal que $3n^2 + 5n \\\\le c \\\\cdot n^3$.
Si dividimos por $n^2$: $3 + \\\\frac{5}{n} \\\\le c \\\\cdot n$.
A medida que $n$ crece, $5/n$ se hace minúsculo. Si elegimos $c=1$, necesitamos $3 \\\\le n$. Esto es cierto para todo $n_0 = 4$. 
Hemos demostrado matemáticamente que la curva cúbica siempre terminará tragándose a la curva cuadrática en el infinito.

## 4. Reglas Prácticas en el Código Real
En la industria, aplicamos reglas heurísticas basadas en estas matemáticas:
1.  **Regla de la Suma (Descartar Constantes Aditivas):** $O(n + 10000) \\\\rightarrow O(n)$. En el infinito, sumar 10,000 operaciones no hace mella.
2.  **Regla del Producto (Descartar Constantes Multiplicativas):** $O(50n) \\\\rightarrow O(n)$.
3.  **Regla del Polinomio (El Término Dominante):** $O(5n^3 + 2n^2 + 100n) \\\\rightarrow O(n^3)$. El exponente mayor devora al resto.

**Ejemplo: Bucle con salto (Logarítmico)**
\`\`\`c
int i = 1;
while (i < n) {
    i = i * 2; 
}
\`\`\`
En cada paso, multiplicamos por 2. Llegaremos a $n$ cuando $2^k = n$. Despejando $k$ (los pasos), obtenemos $k = \\\\log_2 n$. Complejidad: **$O(\\\\log n)$**.

## 5. El Impacto de $O(n^2)$ vs $O(n \\\\log n)$
Si una consulta SQL está programada en $O(n^2)$ y la base de datos pasa de 1 millón a 10 millones de filas (crece 10 veces), **el tiempo de respuesta se multiplica por 100**. Pasar de $O(n^2)$ a $O(n \\\\log n)$ usando índices adecuados es la diferencia entre un servidor que responde instantáneamente y uno que se bloquea y colapsa (Time Out).

## 6. Glosario y Material de Apoyo
*   **Tasa de Crecimiento:** Cómo cambia el consumo de recursos (tiempo/RAM) respecto al tamaño de la entrada.
*   **Complejidad Asintótica:** El comportamiento de la función limitando $n$ hacia el infinito.
*   **$n_0$:** El "punto de quiebre" en el eje X a partir del cual una curva domina a la otra para siempre.
*   **Referencia:** *Cormen (CLRS) Capítulo 3*. Contiene las propiedades de reflexividad y transitividad de estas cotas.\`,
    visualizerType: 'none',
    checkQuestions: [
        {
            id: 'q8-1',
            question: 'Según la definición formal de Big-O ($O$), si decimos que el tiempo es $O(g(n))$, ¿qué estamos garantizando matemáticamente?',
            options: [
                'Que la función es exactamente igual a $g(n)$.',
                'Que existe un punto $n_0$ a partir del cual el tiempo siempre será menor o igual a un múltiplo constante de $g(n)$.',
                'Que el algoritmo ejecutará $g(n)$ líneas de código exactas.',
                'Que la memoria RAM no se desbordará.'
            ],
            correctIndex: 1,
            explanation: '¡Exacto! La desigualdad $0 \\\\le f(n) \\\\le c \\\\cdot g(n)$ para $n \\\\ge n_0$ asegura que $g(n)$ actúa como un "techo" matemático (una cota superior).',
            analogousExplanation: 'Es como decir "A partir del año que viene ($n_0$), mi gasto ($f$) jamás superará el doble ($c$) de tu salario ($g$)".'
        },
        {
            id: 'q8-2',
            question: 'Al demostrar que $3n^2 = O(n^3)$, ¿cuál es el propósito de las constantes $c$ y $n_0$?',
            options: [
                'Sirven para convertir polinomios a logaritmos.',
                'Validan la desigualdad; $n_0$ es el punto a partir del cual la cota superior envuelve permanentemente a la función, y $c$ la escala.',
                'Definen el hardware de la máquina.',
                'Aceleran la ejecución en tiempo constante.'
            ],
            correctIndex: 1,
            explanation: '¡Muy bien! $n_0$ define a partir de qué volumen de datos las gráficas se cruzan, y $c$ es un ajuste para acomodar factores pequeños iniciales.',
            analogousExplanation: 'A un auto lento ($n^2$) se le da una ventaja, pero el auto rápido ($n^3$) viaja a una velocidad constante $c$. A partir de un kilómetro $n_0$, el auto rápido lo rebasará y jamás volverá a estar detrás.'
        },
        {
            id: 'q8-3',
            question: 'Analiza este bucle: \\n\`for(int i=0; i<n; i++) { for(int j=i; j<n; j++) { printf("*"); } }\`\\n¿Cuál es su complejidad asintótica?',
            options: [
                '$O(n)$ porque la variable j depende de i y se cancelan.',
                '$O(n \\\\log n)$ porque el bucle interno se acorta en cada iteración.',
                '$O(n^2)$ porque la suma total de iteraciones forma una serie aritmética proporcional a $n^2$.',
                '$O(n^3)$ por tener múltiples variables.'
            ],
            correctIndex: 2,
            explanation: '¡Perfecto! El primer ciclo hace $n$ pasos, el segundo $n-1$, etc. Esto es una progresión aritmética cuya suma es $\\\\frac{n(n+1)}{2}$. Al ignorar factores constantes y términos menores ($n/2$), domina el término $O(n^2)$.',
            analogousExplanation: 'Imagina lavar las ventanas de un rascacielos. Lavas todas las de tu piso y las de los pisos superiores. A medida que subes lavas menos, pero el total de ventanas lavadas crece de forma cuadrática respecto al número de pisos.'
        },
        {
            id: 'q8-4',
            question: 'Si un algoritmo tiene una función exacta de costo $f(n) = 15000n + 5n^2 + 888$, ¿cómo se expresa en Big-O puro?',
            options: [
                '$O(15000n)$',
                '$O(888)$',
                '$O(n^2)$',
                '$O(n)$'
            ],
            correctIndex: 2,
            explanation: '¡Excelente! En análisis asintótico ($n \\\\to \\\\infty$), aplicamos la Regla del Polinomio: el término con el exponente mayor devora a todos los demás. Se ignora la gran constante 15000 y el factor aditivo 888.',
            analogousExplanation: 'Si compraste la Luna, no te preocupas por un impuesto extra de $888 o por el flete local. El precio masivo a nivel intergaláctico (el $n^2$) ahoga cualquier otro gasto terrestre.'
        },
        {
            id: 'q8-5',
            question: '¿Cuál es la diferencia estricta entre las notaciones Big-O ($O$) y Big-Omega ($\\\\Omega$)?',
            options: [
                'Big-O mide el uso de RAM, Big-Omega la latencia de red.',
                'Big-O se usa en lenguajes de alto nivel, Big-Omega en C.',
                'Big-O establece un límite de crecimiento MÁXIMO (Cota Superior, "peor caso"), mientras Big-Omega establece el MÍNIMO (Cota Inferior, "mejor caso").',
                'Son exactamente lo mismo pero en distintos idiomas.'
            ],
            correctIndex: 2,
            explanation: '¡Correcto! $O(g(n))$ garantiza que el código nunca irá más lento que esa cota. $\\\\Omega(g(n))$ garantiza que jamás podrá ser más rápido que eso. Y $\\\\Theta(g(n))$ ocurre cuando ambas cotas coinciden.',
            analogousExplanation: 'Big-O es decir "Llegaré a mi destino en máximo 1 hora". Big-Omega es decir "El tráfico está perfecto, pero físicamente tardaré al menos 30 min".'
        }
    ],
    exercises: [
      {
        id: "ex-8",
        title: "Ejercicio: Análisis Práctico del Peor Caso",
        description: "Escribe una función en C \`int analizarMatriz(int n)\` con dos bucles \`for\` anidados independientes (ambos de 0 a $n-1$) que incremente y devuelva un contador, evidenciando el crecimiento $O(n^2)$.",
        cormenRef: "Cormen Cap 3",
        initialCode: "#include <stdio.h>\\n\\nint analizarMatriz(int n) {\\n  int contador = 0;\\n  // TODO: Escribe dos bucles anidados i de 0 a n-1 y j de 0 a n-1\\n  return contador;\\n}",
        solutionCode: "#include <stdio.h>\\n\\nint analizarMatriz(int n) {\\n  int contador = 0;\\n  for (int i = 0; i < n; i++) {\\n    for (int j = 0; j < n; j++) {\\n      contador++;\\n    }\\n  }\\n  return contador;\\n}",
        hint: "Utiliza \`for(int i=0; i<n; i++)\` envolviendo a \`for(int j=0; j<n; j++)\`.",
        testCases: [
          {
                    "id": "t1",
                    "description": "Para n = 4, las iteraciones son 4*4",
                    "input": "4",
                    "expectedOutput": "16"
          },
          {
                    "id": "t2",
                    "description": "Para n = 10, las iteraciones crecen cuadráticamente a 10*10",
                    "input": "10",
                    "expectedOutput": "100"
          }
        ],
        explanation: "Dado que el bucle interno corre exactamente $n$ veces, por cada una de las $n$ iteraciones del externo, el total estricto es $n \\\\times n = n^2$. Por tanto, es $O(n^2)$ y $\\\\Theta(n^2)$ simultáneamente."
      }
    ],
    prevItemId: 'clase-7'
  }`;

fs.writeFileSync('src/data/coursesData.ts', prefix + replacement + suffix);
console.log("Replaced Clase 8 successfully!");
