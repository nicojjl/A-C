const fs = require('fs');
let code = fs.readFileSync('src/data/coursesData.ts', 'utf8');

const target = `      {
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
      }`;

const newQuestions = `,
      {
        id: 'q2-3',
        question: 'En el pseudocódigo de Cormen, ¿cómo se representa formalmente la operación de asignación de un valor a una variable?',
        options: [
          'x = y',
          'x <- y',
          'x := y',
          'x == y'
        ],
        correctIndex: 0,
        explanation: '¡Correcto! En las ediciones más recientes de CLRS (como la 3ra y 4ta), se utiliza el símbolo de igual (=) para la asignación, y el doble igual (==) para pruebas de igualdad.',
        analogousExplanation: 'Al igual que en lenguajes como C, C++ y Java, el pseudocódigo moderno adoptó el = para asignar. (Nota: ediciones muy antiguas usaban la flecha <-).'
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
      }`;

if (code.includes(target)) {
  code = code.replace(target, target + newQuestions);
  fs.writeFileSync('src/data/coursesData.ts', code, 'utf8');
  console.log("Patched Clase 2 successfully.");
} else {
  console.log("Target not found. Please check.");
}
