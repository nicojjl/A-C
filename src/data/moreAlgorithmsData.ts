import { AlgorithmItem, AlgoVisualStep } from '../types';

export const MORE_ALGORITHMS: AlgorithmItem[] = [
  {
    id: 'linear-search',
    name: 'Búsqueda Lineal',
    category: 'conceptos',
    categoryLabel: 'Conceptos Fundamentales',
    subtitle: 'El método más simple: buscar un elemento uno por uno.',
    icon: '🔍',
    difficulty: 'Principiante',
    complexity: { timeBest: 'O(1)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(1)' },
    analogy: { title: 'Buscando llaves', description: 'Revisas cada bolsillo uno por uno hasta encontrar las llaves.', realLifeExample: 'Buscar una carta específica en una baraja desordenada.' },
    explanationMarkdown: `### Búsqueda Lineal\nEl algoritmo de búsqueda lineal recorre secuencialmente cada elemento de una colección hasta encontrar el valor deseado o hasta que se hayan revisado todos los elementos.\n\n**¿Cómo funciona paso a paso?**\n1. Se inicializa un índice \`i = 0\`.\n2. Se compara el elemento en \`arreglo[i]\` con el valor objetivo.\n3. Si coinciden, se retorna el índice \`i\`.\n4. Si no coinciden, se incrementa \`i\` en 1 y se repite el paso 2.\n5. Si se llega al final del arreglo sin encontrar el elemento, se retorna \`-1\` o se indica que no existe.\n\n**¿Cuándo conviene usarlo?**\n- Cuando la colección de datos **no está ordenada**. Si estuviera ordenada, la Búsqueda Binaria sería mucho más eficiente (O(log n)).\n- Cuando la colección es pequeña o se realiza una búsqueda única.\n\n**Casos Borde:**\n- El arreglo está vacío (se debe retornar de inmediato).\n- El elemento a buscar está en la primera posición (Mejor caso: O(1)).\n- El elemento a buscar está en la última posición o no existe (Peor caso: O(n)).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nint linearSearch(int arr[], int size, int target) {\n    for (int i = 0; i < size; i++) {\n        if (arr[i] == target) {\n            return i; // Elemento encontrado\n        }\n    }\n    return -1; // No encontrado\n}\n\nint main() {\n    int arr[] = {14, 21, 36, 14, 18, 90, 43};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    int target = 90;\n    \n    int result = linearSearch(arr, size, target);\n    if (result != -1) {\n        printf("Encontrado en el índice: %d\\n", result);\n    } else {\n        printf("No encontrado.\\n");\n    }\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint linearSearch(const vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); i++) {\n        if (arr[i] == target) {\n            return i; // Elemento encontrado\n        }\n    }\n    return -1; // No encontrado\n}\n\nint main() {\n    vector<int> arr = {14, 21, 36, 14, 18, 90, 43};\n    int target = 90;\n    \n    int result = linearSearch(arr, target);\n    if (result != -1) {\n        cout << "Encontrado en el índice: " << result << endl;\n    } else {\n        cout << "No encontrado." << endl;\n    }\n    return 0;\n}`,
      python: `def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i # Elemento encontrado\n    return -1 # No encontrado\n\nif __name__ == "__main__":\n    arr = [14, 21, 36, 14, 18, 90, 43]\n    target = 90\n    \n    result = linear_search(arr, target)\n    if result != -1:\n        print(f"Encontrado en el índice: {result}")\n    else:\n        print("No encontrado.")`
    },
    initialVisualData: { defaultArray: [14, 21, 36, 14, 18, 90, 43] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [14, 21, 36, 14, 18, 90, 43];
      const target = 90;
      const steps: AlgoVisualStep[] = [];
      for (let i = 0; i < arr.length; i++) {
        steps.push({ stepIndex: steps.length, description: `Verificando arr[${i}] == ${target}`, arrayState: [...arr], highlightIndices: [i], activePointers: [{ label: 'i', index: i }] });
        if (arr[i] === target) {
          steps.push({ stepIndex: steps.length, description: `¡Encontrado!`, arrayState: [...arr], highlightIndices: [i], sortedIndices: [i], activePointers: [{ label: 'ENCONTRADO', index: i }] });
          return steps;
        }
      }
      return steps;
    },
    exercises: [
      {
        id: 'linear-1',
        title: 'Búsqueda Básica',
        description: 'Implementa la búsqueda lineal para encontrar el índice de un número. Retorna -1 si no existe.',
        cCode: `int linearSearch(int arr[], int n, int target) {\n    // Tu código aquí\n    return -1;\n}`,
        cppCode: `int linearSearch(vector<int>& arr, int target) {\n    // Tu código aquí\n    return -1;\n}`,
        pythonCode: `def linear_search(arr, target):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna el índice correcto o -1.',
        explanation: 'Simplemente itera sobre el arreglo comparando cada elemento con el target.'
      },
      {
        id: 'linear-2',
        title: 'Última Ocurrencia',
        description: 'Modifica la búsqueda lineal para encontrar la ÚLTIMA ocurrencia de un elemento (el índice más grande).',
        cCode: `int lastOccurrence(int arr[], int n, int target) {\n    // Tu código aquí\n    return -1;\n}`,
        cppCode: `int lastOccurrence(vector<int>& arr, int target) {\n    // Tu código aquí\n    return -1;\n}`,
        pythonCode: `def last_occurrence(arr, target):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna el último índice donde aparece el target.',
        explanation: 'Puedes iterar de izquierda a derecha y guardar el índice, o iterar de reversa y retornar en la primera coincidencia.'
      },
      {
        id: 'linear-3',
        title: 'Contar Ocurrencias',
        description: 'En lugar de retornar el índice, cuenta cuántas veces aparece un número objetivo en el arreglo.',
        cCode: `int countOccurrences(int arr[], int n, int target) {\n    int count = 0;\n    // Tu código aquí\n    return count;\n}`,
        cppCode: `int countOccurrences(vector<int>& arr, int target) {\n    int count = 0;\n    // Tu código aquí\n    return count;\n}`,
        pythonCode: `def count_occurrences(arr, target):\n    count = 0\n    # Tu código aquí\n    return count`,
        expectedOutput: 'Retorna la cantidad total de veces que aparece el elemento.',
        explanation: 'Recorre todo el arreglo y suma 1 a un contador cada vez que el valor sea igual al objetivo.'
      }
    ]
  },
  {
    id: 'array-reverse',
    name: 'Invertir Arreglo',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Invierte un arreglo usando dos punteros.',
    icon: '🔁',
    difficulty: 'Principiante',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(1)' },
    analogy: { title: 'Dar vuelta a los espejos', description: 'Cambias el primero con el último y avanzas hacia el centro.', realLifeExample: 'Invertir una lista de reproducción.' },
    explanationMarkdown: `### Invertir un Arreglo (Two Pointers)\nInvertir un arreglo es un problema clásico que se resuelve de manera óptima usando la técnica de los **Dos Punteros (Two Pointers)**.\n\n**¿Cómo funciona paso a paso?**\n1. Se inicializan dos índices: uno al principio (\`left = 0\`) y otro al final (\`right = n - 1\`).\n2. Mientras el índice \`left\` sea menor que \`right\`:\n   - Se intercambian (swap) los elementos en \`arreglo[left]\` y \`arreglo[right]\`.\n   - Se incrementa \`left\` en 1.\n   - Se decrementa \`right\` en 1.\n3. El ciclo termina cuando \`left\` y \`right\` se cruzan o son iguales.\n\n**¿Por qué es óptimo?**\n- **Complejidad de Tiempo: O(n)**, ya que solo necesitamos recorrer la mitad del arreglo (\`n/2\` intercambios).\n- **Complejidad de Espacio: O(1)** (in-place), modificamos el arreglo original.\n\n**Casos Borde:**\n- Arreglos vacíos o de un solo elemento (no entran al bucle).\n- Arreglos con cantidad impar de elementos (el índice central no se mueve).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nvoid reverseArray(int arr[], int size) {\n    int left = 0;\n    int right = size - 1;\n    \n    while (left < right) {\n        // Swap\n        int temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        \n        // Move pointers\n        left++;\n        right--;\n    }\n}\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5, 6, 7};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    \n    reverseArray(arr, size);\n    \n    for(int i = 0; i < size; i++) {\n        printf("%d ", arr[i]);\n    }\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid reverseArray(vector<int>& arr) {\n    int left = 0;\n    int right = arr.size() - 1;\n    \n    while (left < right) {\n        swap(arr[left], arr[right]);\n        left++;\n        right--;\n    }\n}\n\nint main() {\n    vector<int> arr = {1, 2, 3, 4, 5, 6, 7};\n    reverseArray(arr);\n    \n    for(int num : arr) {\n        cout << num << " ";\n    }\n    return 0;\n}`,
      python: `def reverse_array(arr):\n    left = 0\n    right = len(arr) - 1\n    \n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n\nif __name__ == "__main__":\n    arr = [1, 2, 3, 4, 5, 6, 7]\n    reverse_array(arr)\n    print(arr)`
    },
    initialVisualData: { defaultArray: [1, 2, 3, 4, 5, 6, 7] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [1, 2, 3, 4, 5, 6, 7];
      const steps: AlgoVisualStep[] = [];
      let left = 0;
      let right = arr.length - 1;
      steps.push({ stepIndex: 0, description: 'Estado inicial', arrayState: [...arr], activePointers: [{ label: 'L', index: left }, { label: 'R', index: right }] });
      while(left < right) {
        steps.push({ stepIndex: steps.length, description: `Intercambiar ${arr[left]} con ${arr[right]}`, arrayState: [...arr], highlightIndices: [left, right], activePointers: [{ label: 'L', index: left }, { label: 'R', index: right }] });
        const temp = arr[left]; arr[left] = arr[right]; arr[right] = temp;
        steps.push({ stepIndex: steps.length, description: `Intercambio completado`, arrayState: [...arr], sortedIndices: [left, right], activePointers: [{ label: 'L', index: left }, { label: 'R', index: right }] });
        left++; right--;
      }
      steps.push({ stepIndex: steps.length, description: 'Arreglo invertido.', arrayState: [...arr], sortedIndices: arr.map((_, i) => i) });
      return steps;
    },
    exercises: [
      {
        id: 'rev-1',
        title: 'Invertir In-Place',
        description: 'Implementa el algoritmo para invertir un arreglo modificando el original (O(1) de memoria extra).',
        cCode: `void reverse(int arr[], int n) {\n    // Tu código aquí\n}`,
        cppCode: `void reverse(vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def reverse_array(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El arreglo es modificado y queda en orden inverso.',
        explanation: 'Utiliza un bucle while con dos variables, left=0 y right=n-1, haciendo swap hasta que se crucen.'
      },
      {
        id: 'rev-2',
        title: 'Invertir una Porción',
        description: 'Dado un arreglo y dos índices (start, end), invierte SOLO la porción del arreglo entre esos índices (inclusive).',
        cCode: `void reverseRange(int arr[], int start, int end) {\n    // Tu código aquí\n}`,
        cppCode: `void reverseRange(vector<int>& arr, int start, int end) {\n    // Tu código aquí\n}`,
        pythonCode: `def reverse_range(arr, start, end):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Solo la porción especificada queda invertida.',
        explanation: 'Inicializa los punteros left en start, y right en end. Realiza el mismo ciclo.'
      },
      {
        id: 'rev-3',
        title: 'Verificar Palíndromo',
        description: 'Usa la técnica de los dos punteros para verificar si un arreglo de caracteres (o string) es palíndromo (se lee igual al revés).',
        cCode: `int isPalindrome(char str[], int n) {\n    // Tu código aquí\n    return 1;\n}`,
        cppCode: `bool isPalindrome(string str) {\n    // Tu código aquí\n    return true;\n}`,
        pythonCode: `def is_palindrome(s):\n    # Tu código aquí\n    return True`,
        expectedOutput: 'Retorna true/1 si es palíndromo, false/0 si no lo es.',
        explanation: 'En lugar de intercambiar, solo compara. Si arr[left] != arr[right], retorna false de inmediato.'
      }
    ]
  },
  {
    id: 'prefix-sum',
    name: 'Suma de Prefijos',
    category: 'conceptos',
    categoryLabel: 'Conceptos Fundamentales',
    subtitle: 'Precalcula sumas para O(1) consultas de rango.',
    icon: '➕',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(n)' },
    analogy: { title: 'Saldo de cuenta', description: 'Llevas un registro de saldo acumulado.', realLifeExample: 'Obtener ganancia entre días.' },
    explanationMarkdown: `### Suma de Prefijos (Prefix Sum)\nEl algoritmo de Suma de Prefijos (o Arreglo Acumulativo) permite calcular la suma de los elementos en cualquier rango continuo en tiempo constante **O(1)**.\n\n**¿Cómo funciona paso a paso?**\n1. Creamos un nuevo arreglo \`prefix\` del mismo tamaño.\n2. El primer elemento es igual al original: \`prefix[0] = arr[0]\`.\n3. Para cada índice subsiguiente \`i\`, sumamos el acumulado anterior con el elemento actual: \`prefix[i] = prefix[i-1] + arr[i]\`.\n\n**Cálculo de rango O(1):**\nPara sumar desde \`L\` hasta \`R\` (inclusive):\n- Si \`L == 0\`: La respuesta es \`prefix[R]\`.\n- Si \`L > 0\`: La respuesta es \`prefix[R] - prefix[L-1]\`.\n\n**¿Cuándo usarlo?**\n- Para arreglos estáticos donde necesitas responder a **múltiples consultas**.\n- Costo de preparación: O(n). Consulta: O(1).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nvoid buildPrefixSum(int arr[], int n, int prefix[]) {\n    prefix[0] = arr[0];\n    for (int i = 1; i < n; i++) {\n        prefix[i] = prefix[i - 1] + arr[i];\n    }\n}\n\nint rangeSum(int prefix[], int L, int R) {\n    if (L == 0) return prefix[R];\n    return prefix[R] - prefix[L - 1];\n}\n\nint main() {\n    int arr[] = {3, 1, 4, 1, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int prefix[5];\n    \n    buildPrefixSum(arr, n, prefix);\n    printf("Suma[1..3] = %d\\n", rangeSum(prefix, 1, 3));\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvector<int> buildPrefixSum(const vector<int>& arr) {\n    vector<int> prefix(arr.size());\n    prefix[0] = arr[0];\n    for (int i = 1; i < arr.size(); i++) {\n        prefix[i] = prefix[i - 1] + arr[i];\n    }\n    return prefix;\n}\n\nint rangeSum(const vector<int>& prefix, int L, int R) {\n    if (L == 0) return prefix[R];\n    return prefix[R] - prefix[L - 1];\n}\n\nint main() {\n    vector<int> arr = {3, 1, 4, 1, 5};\n    vector<int> prefix = buildPrefixSum(arr);\n    \n    cout << "Suma[1..3] = " << rangeSum(prefix, 1, 3) << endl;\n    return 0;\n}`,
      python: `def build_prefix_sum(arr):\n    prefix = [0] * len(arr)\n    prefix[0] = arr[0]\n    for i in range(1, len(arr)):\n        prefix[i] = prefix[i - 1] + arr[i]\n    return prefix\n\ndef range_sum(prefix, L, R):\n    if L == 0:\n        return prefix[R]\n    return prefix[R] - prefix[L - 1]\n\nif __name__ == "__main__":\n    arr = [3, 1, 4, 1, 5]\n    prefix = build_prefix_sum(arr)\n    print(f"Suma[1..3] = {range_sum(prefix, 1, 3)}")`
    },
    initialVisualData: { defaultArray: [3, 1, 4, 1, 5] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [3, 1, 4, 1, 5];
      const steps: AlgoVisualStep[] = [];
      const prefix = [arr[0]];
      steps.push({ stepIndex: 0, description: `prefix[0] = ${arr[0]}`, arrayState: [...prefix, ...Array(arr.length-1).fill(0)] });
      for(let i=1; i<arr.length; i++) {
        prefix.push(prefix[i-1] + arr[i]);
        steps.push({ stepIndex: steps.length, description: `prefix[${i}] = ${prefix[i-1]} + ${arr[i]} = ${prefix[i]}`, arrayState: [...prefix, ...Array(arr.length-prefix.length).fill(0)], highlightIndices: [i, i-1] });
      }
      return steps;
    },
    exercises: [
      {
        id: 'pref-1',
        title: 'Crear Arreglo Acumulativo',
        description: 'Dada un arreglo de enteros, retorna un nuevo arreglo con la suma de prefijos correspondiente.',
        cCode: `void createPrefix(int arr[], int n, int res[]) {\n    // Tu código aquí\n}`,
        cppCode: `vector<int> createPrefix(vector<int>& arr) {\n    // Tu código aquí\n    return {};\n}`,
        pythonCode: `def create_prefix(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna el arreglo [arr[0], arr[0]+arr[1], ...]',
        explanation: 'Inicializa el primer índice con arr[0] y el resto iterativamente.'
      },
      {
        id: 'pref-2',
        title: 'Consulta de Rango Rápida',
        description: 'Asumiendo que recibes el arreglo Prefix, devuelve la suma entre índices L y R.',
        cCode: `int getRangeSum(int prefix[], int L, int R) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int getRangeSum(vector<int>& prefix, int L, int R) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def get_range_sum(prefix, L, R):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna la suma en O(1) tiempo.',
        explanation: 'Aplica la fórmula: si L == 0 retorna prefix[R], de lo contrario retorna prefix[R] - prefix[L-1].'
      },
      {
        id: 'pref-3',
        title: 'Punto de Equilibrio',
        description: 'Encuentra un índice donde la suma a su izquierda sea igual a la suma a su derecha.',
        cCode: `int findEquilibrium(int arr[], int n) {\n    // Tu código aquí\n    return -1;\n}`,
        cppCode: `int findEquilibrium(vector<int>& arr) {\n    // Tu código aquí\n    return -1;\n}`,
        pythonCode: `def find_equilibrium(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna el índice de equilibrio, o -1 si no existe.',
        explanation: 'La suma total es prefix[n-1]. La suma izquierda de un índice i es prefix[i-1], la derecha es prefix[n-1] - prefix[i].'
      }
    ]
  },
  {
    id: 'kadane',
    name: 'Algoritmo de Kadane',
    category: 'dp_backtracking',
    categoryLabel: 'Prog. Dinámica & Backtracking',
    subtitle: 'Máxima suma de un subarreglo contiguo.',
    icon: '📈',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(1)' },
    analogy: { title: 'Racha de victorias', description: 'Si tu saldo acumulado es negativo, es mejor reiniciar tu racha desde cero.', realLifeExample: 'Análisis de mercado de valores para encontrar la racha de mayor crecimiento.' },
    explanationMarkdown: `### Algoritmo de Kadane\nEl Algoritmo de Kadane es una técnica de **Programación Dinámica** utilizada para resolver el problema del **Subarreglo de Suma Máxima** en tiempo lineal **O(n)** y espacio constante **O(1)**.\n\n**¿Cómo funciona paso a paso?**\nSe recorre el arreglo manteniendo dos variables:\n1. \`max_curr\`: La suma máxima del subarreglo que termina en la posición actual.\n2. \`max_global\`: La suma máxima encontrada hasta el momento en todo el arreglo.\n\nEn cada paso \`i\`:\n- Decidimos si es mejor continuar el subarreglo actual agregando \`arr[i]\`, o comenzar un nuevo subarreglo desde \`arr[i]\`. Esto se hace con: \`max_curr = max(arr[i], max_curr + arr[i])\`.\n- Luego, actualizamos el récord global: \`max_global = max(max_global, max_curr)\`.\n\n**¿Cuándo usarlo?**\n- Cuando necesitas encontrar el segmento continuo más rentable/sumable dentro de un flujo de números que contiene tanto positivos como negativos.\n\n**Casos Borde:**\n- Todos los números son negativos (el algoritmo debe retornar el número menos negativo).\n- El arreglo está vacío (se debe manejar como excepción o retornar 0).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint kadane(int arr[], int n) {\n    int max_curr = arr[0];\n    int max_global = arr[0];\n    \n    for (int i = 1; i < n; i++) {\n        max_curr = MAX(arr[i], max_curr + arr[i]);\n        max_global = MAX(max_global, max_curr);\n    }\n    \n    return max_global;\n}\n\nint main() {\n    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    printf("Suma Máxima: %d\\n", kadane(arr, n));\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint kadane(const vector<int>& arr) {\n    if (arr.empty()) return 0;\n    int max_curr = arr[0];\n    int max_global = arr[0];\n    \n    for (size_t i = 1; i < arr.size(); i++) {\n        max_curr = max(arr[i], max_curr + arr[i]);\n        max_global = max(max_global, max_curr);\n    }\n    \n    return max_global;\n}\n\nint main() {\n    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << "Suma Máxima: " << kadane(arr) << endl;\n    return 0;\n}`,
      python: `def kadane(arr):\n    if not arr:\n        return 0\n    max_curr = max_global = arr[0]\n    \n    for num in arr[1:]:\n        max_curr = max(num, max_curr + num)\n        max_global = max(max_global, max_curr)\n        \n    return max_global\n\nif __name__ == "__main__":\n    arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n    print(f"Suma Máxima: {kadane(arr)}")`
    },
    initialVisualData: { defaultArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      const steps: AlgoVisualStep[] = [];
      let max_curr = arr[0], max_global = arr[0];
      steps.push({ stepIndex: 0, description: 'Inicializar max_curr y max_global con el primer elemento.', arrayState: [...arr], highlightIndices: [0] });
      for(let i=1; i<arr.length; i++) {
        max_curr = Math.max(arr[i], max_curr + arr[i]);
        max_global = Math.max(max_global, max_curr);
        steps.push({ stepIndex: steps.length, description: `arr[${i}] = ${arr[i]} | max_curr = ${max_curr} | max_global = ${max_global}`, arrayState: [...arr], highlightIndices: [i], activePointers: [{ label: 'i', index: i }] });
      }
      return steps;
    },
    exercises: [
      {
        id: 'kadane-1',
        title: 'Kadane Clásico',
        description: 'Implementa el algoritmo de Kadane para encontrar la suma máxima de un subarreglo contiguo.',
        cCode: `int maxSubArray(int arr[], int n) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int maxSubArray(vector<int>& arr) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def max_sub_array(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'La suma máxima (entero).',
        explanation: 'Utiliza dos variables: una para la suma máxima local y otra para la suma máxima global. Itera el arreglo y actualiza ambas en cada paso.'
      },
      {
        id: 'kadane-2',
        title: 'Retornar Índices',
        description: 'Modifica el algoritmo para que, además de la suma, retorne el índice de INICIO y FIN del subarreglo máximo.',
        cCode: `void maxSubArrayIndices(int arr[], int n, int* start, int* end) {\n    // Tu código aquí\n}`,
        cppCode: `pair<int, int> maxSubArrayIndices(vector<int>& arr) {\n    // Tu código aquí\n    return {0, 0};\n}`,
        pythonCode: `def max_sub_array_indices(arr):\n    # Tu código aquí\n    return (0, 0)`,
        expectedOutput: 'Retorna los índices [start, end].',
        explanation: 'Necesitas rastrear un \'temp_start\' que se actualiza a \'i\' cada vez que max_curr se reinicia a arr[i]. Actualiza \'start\' y \'end\' solo cuando max_global cambie.'
      },
      {
        id: 'kadane-3',
        title: 'Kadane Circular',
        description: 'Encuentra la suma máxima asumiendo que el arreglo es circular (el último elemento conecta con el primero).',
        cCode: `int maxCircularSubarray(int arr[], int n) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int maxCircularSubarray(vector<int>& arr) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def max_circular_subarray(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Suma máxima circular.',
        explanation: 'Calcula el Kadane normal (max_linear). Luego calcula la suma total y el Kadane INVERSO (min_linear). La respuesta es max(max_linear, total_sum - min_linear).'
      }
    ]
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento (Sorting)',
    subtitle: 'Ordena basándose en la frecuencia de ocurrencias.',
    icon: '🧮',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(n+k)', timeAverage: 'O(n+k)', timeWorst: 'O(n+k)', spaceWorst: 'O(k)' },
    analogy: { title: 'Agrupar monedas', description: 'En vez de comparar monedas una por una, cuentas cuántas de 10, de 50 y de 100 tienes, y luego las pones en orden.', realLifeExample: 'Ordenar bases de datos donde el rango de claves (ej. edades 0-120) es pequeño y conocido.' },
    explanationMarkdown: `### Counting Sort (Ordenamiento por Cuentas)\nCounting Sort es un algoritmo de ordenamiento de números enteros **no comparativo**. En lugar de comparar elementos, utiliza la aritmética para determinar la posición de cada elemento.\n\n**¿Cómo funciona paso a paso?**\n1. **Encontrar el Máximo (k):** Se busca el valor más alto en el arreglo para determinar el tamaño del arreglo de conteo.\n2. **Conteo:** Se crea un arreglo \`count\` de tamaño \`k+1\`. Se recorre el arreglo original y se suma 1 a \`count[arr[i]]\`.\n3. **Suma Acumulativa (Opcional pero estándar para estabilidad):** Se modifica \`count\` para que cada índice almacene la suma de los conteos anteriores.\n4. **Reconstrucción:** Se coloca cada elemento en su posición final usando el arreglo \`count\`.\n\n**¿Cuándo usarlo?**\n- Es extremadamente rápido **O(n + k)**, superando la barrera matemática de O(n log n) de los algoritmos de comparación.\n- Solo es viable cuando el rango de valores (\`k\`) no es significativamente mayor que la cantidad de elementos (\`n\`). Si tienes 5 elementos pero sus valores van del 1 al 1,000,000, el uso de memoria (O(k)) será terrible.\n\n**Casos Borde:**\n- Arreglos con números negativos (requieren un desplazamiento/offset).\n- Arreglos vacíos.`,
    codeImplementations: {
      c: `#include <stdio.h>\n#include <string.h>\n\nvoid countingSort(int arr[], int n) {\n    if (n <= 1) return;\n    \n    int max = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > max) max = arr[i];\n    }\n    \n    int count[max + 1];\n    memset(count, 0, sizeof(count));\n    \n    for (int i = 0; i < n; i++) {\n        count[arr[i]]++;\n    }\n    \n    int index = 0;\n    for (int i = 0; i <= max; i++) {\n        while (count[i] > 0) {\n            arr[index++] = i;\n            count[i]--;\n        }\n    }\n}\n\nint main() {\n    int arr[] = {4, 2, 2, 8, 3, 3, 1};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    countingSort(arr, n);\n    for (int i=0; i<n; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nvoid countingSort(vector<int>& arr) {\n    if (arr.empty()) return;\n    \n    int max_val = *max_element(arr.begin(), arr.end());\n    vector<int> count(max_val + 1, 0);\n    \n    for (int num : arr) {\n        count[num]++;\n    }\n    \n    int index = 0;\n    for (int i = 0; i <= max_val; i++) {\n        while (count[i] > 0) {\n            arr[index++] = i;\n            count[i]--;\n        }\n    }\n}\n\nint main() {\n    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};\n    countingSort(arr);\n    for (int num : arr) cout << num << " ";\n    return 0;\n}`,
      python: `def counting_sort(arr):\n    if not arr: return arr\n    \n    max_val = max(arr)\n    count = [0] * (max_val + 1)\n    \n    for num in arr:\n        count[num] += 1\n        \n    index = 0\n    for i in range(len(count)):\n        while count[i] > 0:\n            arr[index] = i\n            index += 1\n            count[i] -= 1\n    return arr\n\nif __name__ == "__main__":\n    arr = [4, 2, 2, 8, 3, 3, 1]\n    counting_sort(arr)\n    print(arr)`
    },
    initialVisualData: { defaultArray: [4, 2, 2, 8, 3, 3, 1] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [4, 2, 2, 8, 3, 3, 1];
      const steps: AlgoVisualStep[] = [];
      const count = Array(10).fill(0);
      steps.push({ stepIndex: 0, description: 'Se crea un arreglo de conteo.', arrayState: [...count] });
      for(let i=0; i<arr.length; i++) {
        count[arr[i]]++;
        steps.push({ stepIndex: steps.length, description: `Contando ${arr[i]}: count[${arr[i]}] = ${count[arr[i]]}`, arrayState: [...count], highlightIndices: [arr[i]] });
      }
      return steps;
    },
    exercises: [
      {
        id: 'count-1',
        title: 'Counting Sort Básico',
        description: 'Implementa el algoritmo Counting Sort para ordenar un arreglo de enteros no negativos.',
        cCode: `void countingSort(int arr[], int n) {\n    // Tu código aquí\n}`,
        cppCode: `void countingSort(vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def counting_sort(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El arreglo queda ordenado.',
        explanation: 'Encuentra el máximo, crea el arreglo de conteo, cuenta las frecuencias y luego sobrescribe el arreglo original.'
      },
      {
        id: 'count-2',
        title: 'Counting Sort Estable',
        description: 'Modifica tu implementación para que sea "Estable" (mantiene el orden relativo de elementos iguales).',
        cCode: `void stableCountingSort(int arr[], int n) {\n    // Tu código aquí\n}`,
        cppCode: `void stableCountingSort(vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def stable_counting_sort(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Arreglo ordenado manteniendo estabilidad.',
        explanation: 'Debes hacer el arreglo count acumulativo. Luego iterar el arreglo original DE ATRÁS HACIA ADELANTE (para mantener estabilidad), colocar el elemento en su índice calculado y restar 1 a count.'
      },
      {
        id: 'count-3',
        title: 'Counting Sort con Negativos',
        description: 'Adapta el algoritmo para que pueda ordenar arreglos que contengan números negativos.',
        cCode: `void negativeCountingSort(int arr[], int n) {\n    // Tu código aquí\n}`,
        cppCode: `void negativeCountingSort(vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def negative_counting_sort(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Arreglo ordenado correctamente.',
        explanation: 'Encuentra el mínimo y el máximo. El tamaño del count array será (max - min + 1). Al indexar, usa (arr[i] - min) como offset.'
      }
    ]
  },
  {
    id: 'hash-table',
    name: 'Tablas Hash',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Mapea llaves a índices usando una función Hash.',
    icon: '🗄️',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(1)', timeAverage: 'O(1)', timeWorst: 'O(n)', spaceWorst: 'O(n)' },
    analogy: { title: 'Casilleros postales', description: 'Una fórmula te dice exactamente el número de casillero donde está el correo, sin tener que revisar uno por uno.', realLifeExample: 'Bases de datos en memoria caché como Redis o Memcached.' },
    explanationMarkdown: `### Tablas Hash (Hash Maps)\nUna Tabla Hash es una estructura de datos que implementa un tipo de dato abstracto de diccionario (asociación clave-valor). Utiliza una **función hash** para calcular un índice en un arreglo de cubetas (buckets) donde se encuentra el valor deseado.\n\n**¿Cómo funciona paso a paso?**\n1. **Hashing:** Cuando pasas una llave (ej. el número 42 o el string "Hola"), la función hash la procesa y escupe un número entero.\n2. **Módulo:** Ese número enorme se reduce al tamaño del arreglo usando el operador módulo (\`hash % tamaño\`).\n3. **Almacenamiento:** El valor se inserta en ese índice exacto (búsqueda O(1)).\n\n**Manejo de Colisiones:**\n¿Qué pasa si dos llaves diferentes terminan en el mismo índice?\n- **Encadenamiento (Chaining):** Cada índice guarda una lista enlazada. Si hay colisión, simplemente agregas el elemento a la lista de ese índice.\n- **Sondeo Lineal (Linear Probing):** Si el índice está ocupado, revisas el siguiente, y el siguiente, hasta encontrar uno vacío.\n\n**¿Cuándo usarlo?**\n- Cuando necesitas hacer búsquedas, inserciones y eliminaciones increíblemente rápidas.\n- Es la base de los Set (Conjuntos) y Diccionarios en casi todos los lenguajes modernos.`,
    codeImplementations: {
      c: `#include <stdio.h>\n#include <stdlib.h>\n#define TABLE_SIZE 10\n\nint hashTable[TABLE_SIZE];\n\nvoid init() {\n    for (int i = 0; i < TABLE_SIZE; i++) hashTable[i] = -1;\n}\n\nvoid insert(int key) {\n    int index = key % TABLE_SIZE;\n    // Linear probing para resolver colisiones\n    while (hashTable[index] != -1) {\n        index = (index + 1) % TABLE_SIZE;\n    }\n    hashTable[index] = key;\n}\n\nint main() {\n    init();\n    insert(10);\n    insert(22);\n    insert(31);\n    for (int i = 0; i < TABLE_SIZE; i++) {\n        printf("Index %d: %d\\n", i, hashTable[i]);\n    }\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <unordered_map>\n\nusing namespace std;\n\nint main() {\n    // En C++ moderno, std::unordered_map es la tabla hash\n    unordered_map<string, int> ages;\n    \n    ages["Alice"] = 28;\n    ages["Bob"] = 34;\n    \n    // Búsqueda en O(1)\n    if (ages.find("Alice") != ages.end()) {\n        cout << "Alice tiene " << ages["Alice"] << " años." << endl;\n    }\n    return 0;\n}`,
      python: `def hash_table_demo():\n    # En Python, los diccionarios (dict) están implementados como tablas hash\n    hash_map = {}\n    \n    # Inserción O(1)\n    hash_map["Alice"] = 28\n    hash_map["Bob"] = 34\n    \n    # Búsqueda O(1)\n    if "Alice" in hash_map:\n        print(f"Alice tiene {hash_map['Alice']} años.")\n\nif __name__ == "__main__":\n    hash_table_demo()`
    },
    initialVisualData: { defaultArray: [10, 22, 31, 4, 15] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [10, 22, 31, 4, 15];
      const steps: AlgoVisualStep[] = [];
      const table = Array(10).fill(0);
      steps.push({ stepIndex: 0, description: 'Se inicializa la tabla con tamaño 10.', arrayState: [...table] });
      for(let i=0; i<arr.length; i++) {
        let idx = arr[i] % 10;
        let desc = `Hash(${arr[i]}) = ${arr[i]} % 10 = ${idx}`;
        while (table[idx] !== 0) {
          desc += ' -> Colisión. Avanzando...';
          idx = (idx + 1) % 10;
        }
        table[idx] = arr[i];
        steps.push({ stepIndex: steps.length, description: desc, arrayState: [...table], highlightIndices: [idx] });
      }
      return steps;
    },
    exercises: [
      {
        id: 'hash-1',
        title: 'Two Sum usando Hash',
        description: 'Encuentra dos números en un arreglo que sumen un target específico, retornando sus índices. Debe ser O(n).',
        cCode: `// C no tiene hash map nativo, requiere implementación manual.\nvoid twoSum(int arr[], int n, int target) {\n    // Tu código aquí\n}`,
        cppCode: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    // Tu código aquí\n    return {};\n}`,
        pythonCode: `def two_sum(nums, target):\n    hash_map = {}\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna los índices [i, j].',
        explanation: 'Itera el arreglo. Para cada elemento, revisa si (target - elemento) ya existe en tu Hash Map. Si existe, ¡ganaste! Si no, guarda el elemento y su índice en el mapa.'
      },
      {
        id: 'hash-2',
        title: 'Detectar Duplicados',
        description: 'Determina si un arreglo contiene algún elemento duplicado. Debe ser O(n).',
        cCode: `int containsDuplicate(int arr[], int n) {\n    // C requiere un Set manual\n    return 0;\n}`,
        cppCode: `bool containsDuplicate(vector<int>& nums) {\n    unordered_set<int> seen;\n    // Tu código aquí\n    return false;\n}`,
        pythonCode: `def contains_duplicate(nums):\n    # Tu código aquí\n    return False`,
        expectedOutput: 'Retorna True si hay duplicados, False si todos son únicos.',
        explanation: 'Utiliza una Tabla Hash (o un Set, que usa la misma lógica subyacente). Si al intentar insertar un número descubres que ya está en el Set, retorna true.'
      },
      {
        id: 'hash-3',
        title: 'Implementar Sondeo Lineal',
        description: 'Escribe una función de inserción manual para un arreglo de tamaño 10 usando módulo 10 y sondeo lineal (Linear Probing).',
        cCode: `void insert(int table[], int key) {\n    // Tu código aquí\n}`,
        cppCode: `void insert(vector<int>& table, int key) {\n    // Tu código aquí\n}`,
        pythonCode: `def insert(table, key):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'La llave es insertada en el arreglo resolviendo colisiones.',
        explanation: 'Calcula indice = key % 10. Usa un bucle while que avance el índice (indice = (indice + 1) % 10) mientras esa posición del arreglo ya esté ocupada.'
      }
    ]
  },
  {
    id: 'linked-list-traversal',
    name: 'Listas Enlazadas (Singly)',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Estructura lineal donde cada nodo apunta al siguiente.',
    icon: '🔗',
    difficulty: 'Principiante',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(1)' },
    analogy: { title: 'Búsqueda del tesoro', description: 'Cada pista te dice exactamente dónde está escondida la siguiente pista, pero no puedes saltarte ninguna para llegar al final.', realLifeExample: 'El historial del navegador (atrás/adelante) o la asignación de memoria dinámica del sistema operativo.' },
    explanationMarkdown: `### Listas Enlazadas (Singly Linked List)\nUna Lista Enlazada Simple es una colección lineal de nodos. A diferencia de los arreglos (donde la memoria es contigua), los nodos de una lista enlazada están esparcidos por toda la memoria.\n\n**Anatomía de un Nodo:**\n- **Valor (Data):** El dato que quieres almacenar.\n- **Siguiente (Next):** Un puntero o referencia a la dirección de memoria del siguiente nodo.\n\n**¿Cómo recorrerla paso a paso?**\n1. Comienzas con un puntero (suele llamarse \`current\` o \`temp\`) apuntando al primer nodo (la \`head\`).\n2. Mientras \`current\` no sea nulo:\n   - Lees o modificas el valor de \`current\`.\n   - Mueves el puntero al siguiente nodo usando: \`current = current.next\`.\n\n**Ventajas y Desventajas:**\n- **(+)** Insertar o eliminar elementos al principio es **O(1)** (en un arreglo es O(n) porque debes mover todo).\n- **(-)** No puedes acceder a un elemento por su índice (no hay \`arr[5]\`). Debes recorrer 5 nodos uno por uno (búsqueda es **O(n)**).`,
    codeImplementations: {
      c: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid traverse(struct Node* head) {\n    struct Node* current = head;\n    while (current != NULL) {\n        printf("%d -> ", current->data);\n        current = current->next;\n    }\n    printf("NULL\\n");\n}\n\nint main() {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = NULL;\n    traverse(head);\n    return 0;\n}`,
      cpp: `#include <iostream>\n\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid traverse(Node* head) {\n    Node* current = head;\n    while (current != nullptr) {\n        cout << current->data << " -> ";\n        current = current->next;\n    }\n    cout << "NULL" << endl;\n}\n\nint main() {\n    Node* head = new Node(10);\n    head->next = new Node(20);\n    traverse(head);\n    return 0;\n}`,
      python: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\ndef traverse(head):\n    current = head\n    while current is not None:\n        print(f"{current.data} ->", end=" ")\n        current = current.next\n    print("NULL")\n\nif __name__ == "__main__":\n    head = Node(10)\n    head.next = Node(20)\n    traverse(head)`
    },
    initialVisualData: { defaultArray: [10, 20, 30, 40] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [10, 20, 30, 40];
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Head apunta a inicio', arrayState: [...arr], activePointers: [{ label: 'head', index: 0 }] });
      for(let i=0; i<arr.length; i++) {
        steps.push({ stepIndex: steps.length, description: `Visitando ${arr[i]}`, arrayState: [...arr], highlightIndices: [i], activePointers: [{ label: 'curr', index: i }] });
      }
      return steps;
    },
    exercises: [
      {
        id: 'll-1',
        title: 'Buscar Elemento',
        description: 'Escribe una función que retorne true si un valor específico existe en la lista enlazada, y false si no.',
        cCode: `int search(struct Node* head, int target) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `bool search(Node* head, int target) {\n    // Tu código aquí\n    return false;\n}`,
        pythonCode: `def search(head, target):\n    # Tu código aquí\n    return False`,
        expectedOutput: 'Retorna un valor booleano.',
        explanation: 'Inicializa un puntero current en head. Usa un bucle while (current != null). Si current.data == target, retorna true. Al final del bucle mueve current = current.next.'
      },
      {
        id: 'll-2',
        title: 'Invertir Lista Enlazada',
        description: 'El clásico de las entrevistas: invierte la dirección de todos los punteros en la lista enlazada in-place.',
        cCode: `struct Node* reverse(struct Node* head) {\n    // Tu código aquí\n    return head;\n}`,
        cppCode: `Node* reverse(Node* head) {\n    // Tu código aquí\n    return head;\n}`,
        pythonCode: `def reverse(head):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Retorna la nueva cabeza (el antiguo último nodo).',
        explanation: 'Necesitas tres punteros: prev (null inicialmente), curr (head), y next. En cada iteración: guarda next, haz que curr apunte a prev, mueve prev a curr, y mueve curr a next.'
      },
      {
        id: 'll-3',
        title: 'Detectar Ciclo',
        description: 'Usa el algoritmo de la liebre y la tortuga (Floyd) para detectar si hay un ciclo infinito en la lista.',
        cCode: `int hasCycle(struct Node *head) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `bool hasCycle(Node *head) {\n    // Tu código aquí\n    return false;\n}`,
        pythonCode: `def has_cycle(head):\n    # Tu código aquí\n    return False`,
        expectedOutput: 'Retorna true si los punteros colisionan.',
        explanation: 'Inicia dos punteros (slow y fast) en head. En cada ciclo, mueve slow 1 paso y fast 2 pasos. Si fast alcanza a slow, hay un ciclo.'
      }
    ]
  },
  {
    id: 'factorial-recursive',
    name: 'Factorial (Recursivo)',
    category: 'conceptos',
    categoryLabel: 'Conceptos Fundamentales',
    subtitle: 'Uso de la Pila de Llamadas (Call Stack).',
    icon: '❗️',
    difficulty: 'Principiante',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(n)' },
    analogy: { title: 'Muñecas rusas', description: 'Abres una muñeca para encontrar otra igual pero más pequeña adentro, hasta que llegas a la más pequeña que no se puede abrir (el caso base).', realLifeExample: 'Exploración de directorios en una computadora (una carpeta dentro de una carpeta).' },
    explanationMarkdown: `### Recursividad y la Pila de Llamadas\nUna función es recursiva si se llama a sí misma para resolver una versión más pequeña del problema original.\n\n**La regla de oro de la Recursión:**\n1. **El Caso Base:** Es la condición que detiene la recursión. ¡Sin esto, tu programa correrá hasta quedarse sin memoria (Stack Overflow)! En el factorial, el caso base es \`if (n == 0)\` o \`n == 1\`.\n2. **El Paso Recursivo:** Es donde la función se llama a sí misma con un argumento modificado para acercarse al caso base. Para factorial: \`n * factorial(n - 1)\`.\n\n**La Pila de Llamadas (Call Stack):**\nCuando la función llama a \`factorial(n-1)\`, la función actual se "pausa" y se guarda en la memoria (la pila) esperando a que la nueva función termine. Cuando se alcanza el caso base, la pila comienza a desapilarse (Pop) devolviendo y multiplicando los resultados hacia atrás.`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nint factorial(int n) {\n    // Caso base\n    if (n <= 1) {\n        return 1;\n    }\n    // Paso recursivo\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("Factorial de 5 es: %d\\n", factorial(5));\n    return 0;\n}`,
      cpp: `#include <iostream>\n\nusing namespace std;\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    cout << "Factorial de 5 es: " << factorial(5) << endl;\n    return 0;\n}`,
      python: `def factorial(n):\n    # Caso base\n    if n <= 1:\n        return 1\n    # Paso recursivo\n    return n * factorial(n - 1)\n\nif __name__ == "__main__":\n    print(f"Factorial de 5 es: {factorial(5)}")`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Llama fact(3)', stackQueueState: [{value:'fact(3)'}] });
      steps.push({ stepIndex: 1, description: 'Llama fact(2)', stackQueueState: [{value:'fact(2)'}, {value:'fact(3)'}] });
      steps.push({ stepIndex: 2, description: 'Llama fact(1) -> CASO BASE', stackQueueState: [{value:'fact(1)'}, {value:'fact(2)'}, {value:'fact(3)'}] });
      steps.push({ stepIndex: 3, description: 'Retorna 1, resuelve fact(2)', stackQueueState: [{value:'fact(2)'}, {value:'fact(3)'}] });
      steps.push({ stepIndex: 4, description: 'Retorna 2, resuelve fact(3)', stackQueueState: [{value:'fact(3)'}] });
      steps.push({ stepIndex: 5, description: 'Retorna 6, Pila Vacía', stackQueueState: [] });
      return steps;
    },
    exercises: [
      {
        id: 'fact-1',
        title: 'Suma Recursiva',
        description: 'Escribe una función recursiva que calcule la suma de los números del 1 al N.',
        cCode: `int sum(int n) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int sum(int n) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def sum(n):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Suma total.',
        explanation: 'El caso base es if (n == 0) return 0. El paso recursivo es return n + sum(n - 1).'
      },
      {
        id: 'fact-2',
        title: 'Fibonacci Recursivo',
        description: 'Calcula el enésimo número de Fibonacci de forma recursiva.',
        cCode: `int fib(int n) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int fib(int n) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def fib(n):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El valor en la secuencia Fibonacci.',
        explanation: 'Fibonacci requiere DOS casos base: if (n == 0) return 0, y if (n == 1) return 1. El paso recursivo hace dos llamadas: return fib(n-1) + fib(n-2).'
      },
      {
        id: 'fact-3',
        title: 'Invertir String (Recursivo)',
        description: 'Crea una función recursiva para invertir una cadena/arreglo de caracteres.',
        cCode: `void reverseStr(char str[], int start, int end) {\n    // Tu código aquí\n}`,
        cppCode: `void reverseStr(string& str, int start, int end) {\n    // Tu código aquí\n}`,
        pythonCode: `def reverse_str(s):\n    # Piensa en cómo usar slicing s[1:] + s[0]\n    pass`,
        expectedOutput: 'La cadena queda invertida.',
        explanation: 'Caso base: si start >= end, detente. Paso recursivo: intercambia str[start] con str[end], y llama a la función de nuevo pasándole start+1 y end-1.'
      }
    ]
  },
  {
    id: 'dfs',
    name: 'DFS (Depth-First Search)',
    category: 'busqueda_grafos',
    categoryLabel: 'Búsqueda y Grafos',
    subtitle: 'Explora tan profundo como sea posible antes de retroceder.',
    icon: '🧗‍♂️',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(V+E)', timeAverage: 'O(V+E)', timeWorst: 'O(V+E)', spaceWorst: 'O(V)' },
    analogy: { title: 'Resolviendo un laberinto', description: 'Caminas por un pasillo tomando siempre la derecha. Cuando llegas a un muro, retrocedes a la última intersección y pruebas el otro camino.', realLifeExample: 'Análisis de dependencias y detección de ciclos en Git o gestores de paquetes.' },
    explanationMarkdown: `### Búsqueda en Profundidad (DFS)\nDFS es un algoritmo para atravesar o buscar en árboles y grafos.\n\n**¿Cómo funciona paso a paso?**\nSe aprovecha intensamente de la **Recursión (Pila)**:\n1. El algoritmo empieza en el nodo raíz (o uno arbitrario) y lo marca como visitado.\n2. Revisa las conexiones (hijos/vecinos) de ese nodo.\n3. Si un vecino no ha sido visitado, el algoritmo **salta inmediatamente** a ese vecino y repite el proceso desde allí (se sumerge "en profundidad").\n4. Cuando llega a un nodo que no tiene más vecinos no visitados (muro), hace **Backtrack** (retrocede) al nodo anterior y continúa revisando los vecinos restantes de ese.\n\n**¿Cuándo usar DFS en vez de BFS?**\n- Si la solución que buscas está lejos del nodo inicial, o en las hojas de un árbol.\n- Si necesitas evaluar todas las rutas posibles (ej. resolver un laberinto o Sudoku).\n- Cuando el grafo es ancho; DFS consume menos memoria O(V) que BFS si las ramas son muy largas.`,
    codeImplementations: {
      c: `#include <stdio.h>\n#include <stdbool.h>\n\n// Representación estática sencilla para demostración\nint graph[4][4] = { {0, 1, 1, 0}, {1, 0, 0, 1}, {1, 0, 0, 0}, {0, 1, 0, 0} };\nbool visited[4] = {false};\n\nvoid dfs(int vertex) {\n    printf("Visitando: %d\\n", vertex);\n    visited[vertex] = true;\n    \n    for (int i = 0; i < 4; i++) {\n        if (graph[vertex][i] == 1 && !visited[i]) {\n            dfs(i);\n        }\n    }\n}\n\nint main() {\n    dfs(0);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid dfs(int vertex, const vector<vector<int>>& adj, vector<bool>& visited) {\n    cout << "Visitando: " << vertex << endl;\n    visited[vertex] = true;\n    \n    for (int neighbor : adj[vertex]) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, adj, visited);\n        }\n    }\n}\n\nint main() {\n    vector<vector<int>> adj = {{1, 2}, {0, 3}, {0}, {1}};\n    vector<bool> visited(4, false);\n    dfs(0, adj, visited);\n    return 0;\n}`,
      python: `def dfs(vertex, adj, visited):\n    print(f"Visitando: {vertex}")\n    visited.add(vertex)\n    \n    for neighbor in adj[vertex]:\n        if neighbor not in visited:\n            dfs(neighbor, adj, visited)\n\nif __name__ == "__main__":\n    # Representación en lista de adyacencia\n    adj = { 0: [1, 2], 1: [0, 3], 2: [0], 3: [1] }\n    visited = set()\n    dfs(0, adj, visited)`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      const nodes = [{ id: 'A', label: 'A', state: 'unvisited' as const, x: 200, y: 50 }, { id: 'B', label: 'B', state: 'unvisited' as const, x: 100, y: 150 }, { id: 'C', label: 'C', state: 'unvisited' as const, x: 300, y: 150 }];
      const edges = [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }];
      const cg = (id:string, v:string[]) => nodes.map(n => ({...n, state: (id===n.id?'current':v.includes(n.id)?'visited':'unvisited') as any}));
      steps.push({ stepIndex: 0, description: 'Inicio', graphNodes: cg('A',[]), graphEdges: edges });
      steps.push({ stepIndex: 1, description: 'A -> B', graphNodes: cg('B',['A']), graphEdges: edges });
      steps.push({ stepIndex: 2, description: 'Backtrack -> A -> C', graphNodes: cg('C',['A','B']), graphEdges: edges });
      return steps;
    },
    exercises: [
      {
        id: 'dfs-1',
        title: 'Islas de unos',
        description: 'Dado un grid 2D de 1s (tierra) y 0s (agua), cuenta el número de islas conectadas vertical y horizontalmente.',
        cCode: `void dfs(char** grid, int r, int c, int rows, int cols) {\n    // Tu código aquí\n}`,
        cppCode: `void dfs(vector<vector<char>>& grid, int r, int c) {\n    // Tu código aquí\n}`,
        pythonCode: `def dfs(grid, r, c):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Modifica el grid in-place para marcar nodos.',
        explanation: 'Inicia un DFS cuando encuentres un \'1\'. En la función recursiva, marca la celda actual como \'0\' (para no revisarla de nuevo) y llama al DFS para arriba, abajo, izq, y der (verificando los límites de la matriz).'
      },
      {
        id: 'dfs-2',
        title: 'Componentes Conectados',
        description: 'Cuenta cuántos sub-grafos separados existen en el grafo completo.',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `int countComponents(int n, vector<vector<int>>& edges) {\n    // Construye la lista de adyacencia y lanza el DFS.\n    return 0;\n}`,
        pythonCode: `def count_components(n, edges):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Un número entero.',
        explanation: 'Lleva un contador inicializado en 0. Usa un bucle que recorra todos los vértices del 0 al n. Si el vértice no ha sido visitado, suma 1 al contador y lanza la función DFS desde ese vértice para que marque a todos sus vecinos.'
      },
      {
        id: 'dfs-3',
        title: 'Recorrido en Árboles (Pre-order)',
        description: 'El recorrido Pre-order de un árbol es estructuralmente idéntico a DFS.',
        cCode: `void preOrder(struct TreeNode* root) {\n    // Tu código aquí\n}`,
        cppCode: `void preOrder(TreeNode* root) {\n    // Tu código aquí\n}`,
        pythonCode: `def pre_order(root):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Visita Raíz, Izquierda, Derecha.',
        explanation: 'En lugar de un bucle de vecinos, directamente haz: print(root.val), luego preOrder(root.left), luego preOrder(root.right).'
      }
    ]
  },
  {
    id: 'bst-inorder',
    name: 'BST In-Order',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Recorre un Árbol Binario de Búsqueda de menor a mayor.',
    icon: '🌲',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(n)', timeAverage: 'O(n)', timeWorst: 'O(n)', spaceWorst: 'O(h)' },
    analogy: { title: 'Leer de Izquierda a Derecha', description: 'Visita los nodos estrictamente de menor a mayor valor.', realLifeExample: 'Imprimir un directorio de archivos en orden alfabético.' },
    explanationMarkdown: `### Recorrido In-Order (Inorden)\nEn un **Árbol Binario de Búsqueda (BST)**, donde los hijos izquierdos son menores y los derechos son mayores, el recorrido In-Order te garantiza visitar los elementos en **orden ascendente perfecto**.\n\n**¿Cómo funciona paso a paso?**\nSe implementa con una función recursiva que sigue siempre este patrón:\n1. **Izquierda:** Llama a la función recursivamente para el subárbol izquierdo.\n2. **Raíz:** "Visita" (imprime o procesa) el nodo actual.\n3. **Derecha:** Llama a la función recursivamente para el subárbol derecho.\n\n**Complejidad:**\n- El tiempo siempre es **O(n)** porque hay que visitar todos los nodos una vez.\n- El espacio (memoria en la pila) depende de la altura del árbol \`h\` **O(h)**. En un árbol balanceado es O(log n), pero en el peor caso (árbol degenerado o línea) es O(n).`,
    codeImplementations: {
      c: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left, *right;\n};\n\nvoid inorder(struct Node* root) {\n    if (root != NULL) {\n        inorder(root->left);\n        printf("%d ", root->data);\n        inorder(root->right);\n    }\n}\n\nint main() {\n    // Creación manual del árbol\n    return 0;\n}`,
      cpp: `#include <iostream>\n\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node *left, *right;\n    Node(int val) : data(val), left(nullptr), right(nullptr) {}\n};\n\nvoid inorder(Node* root) {\n    if (root != nullptr) {\n        inorder(root->left);\n        cout << root->data << " ";\n        inorder(root->right);\n    }\n}\n\nint main() {\n    Node* root = new Node(10);\n    root->left = new Node(5);\n    root->right = new Node(15);\n    inorder(root);\n    return 0;\n}`,
      python: `class Node:\n    def __init__(self, key):\n        self.left = None\n        self.right = None\n        self.val = key\n\ndef inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val, end=" ")\n        inorder(root.right)\n\nif __name__ == "__main__":\n    root = Node(10)\n    root.left = Node(5)\n    root.right = Node(15)\n    inorder(root)`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      const nodes = [{ id: '10', label: '10', state: 'unvisited' as const, x: 200, y: 50 }, { id: '5', label: '5', state: 'unvisited' as const, x: 100, y: 150 }, { id: '15', label: '15', state: 'unvisited' as const, x: 300, y: 150 }];
      const edges = [{ from: '10', to: '5' }, { from: '10', to: '15' }];
      const cg = (id:string, v:string[]) => nodes.map(n => ({...n, state: (id===n.id?'current':v.includes(n.id)?'visited':'unvisited') as any}));
      steps.push({ stepIndex: 0, description: 'In-order', graphNodes: cg('10',[]), graphEdges: edges });
      steps.push({ stepIndex: 1, description: 'Baja todo a la izquierda (Visita 5)', graphNodes: cg('5',[]), graphEdges: edges });
      steps.push({ stepIndex: 2, description: 'Regresa a Raíz (Visita 10)', graphNodes: cg('10',['5']), graphEdges: edges });
      steps.push({ stepIndex: 3, description: 'Baja a la derecha (Visita 15)', graphNodes: cg('15',['5','10']), graphEdges: edges });
      return steps;
    },
    exercises: [
      {
        id: 'inorder-1',
        title: 'Recorrido Básico',
        description: 'Dada la raíz de un árbol binario, devuelve el recorrido in-order en un arreglo.',
        cCode: `void inorderTraversal(struct Node* root, int* arr, int* index) {\n    // Tu código aquí\n}`,
        cppCode: `void inorderTraversal(Node* root, vector<int>& res) {\n    // Tu código aquí\n}`,
        pythonCode: `def inorder_traversal(root, res):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El arreglo con los valores en orden ascendente.',
        explanation: 'En lugar de imprimir en consola, haz res.push_back(root.val) entre las llamadas a los subárboles.'
      },
      {
        id: 'inorder-2',
        title: 'Verificar BST Válido',
        description: 'Usa In-order para comprobar si un árbol binario cumple la propiedad de Búsqueda Binaria.',
        cCode: `int isValidBST(struct Node* root) {\n    // Piensa en cómo guardar el último valor visitado\n    return 1;\n}`,
        cppCode: `bool isValidBST(Node* root) {\n    // Tu código aquí\n    return true;\n}`,
        pythonCode: `def is_valid_bst(root):\n    # Tu código aquí\n    return True`,
        expectedOutput: 'True si es válido, False si un nodo mayor está a la izquierda de uno menor.',
        explanation: 'Si realizas un recorrido in-order, los números DEBEN salir estrictamente ascendentes. Lleva una variable externa "prev". Si el nodo actual es <= "prev", retorna False.'
      },
      {
        id: 'inorder-3',
        title: 'K-ésimo Menor',
        description: 'Encuentra el k-ésimo elemento más pequeño en un BST.',
        cCode: `int kthSmallest(struct Node* root, int k) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int kthSmallest(Node* root, int k) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def kth_smallest(root, k):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El valor del nodo en la posición k.',
        explanation: 'Inicia un contador. Haz in-order. Cada vez que visites un nodo ("Raíz"), suma 1 al contador. Cuando el contador sea igual a k, has encontrado la respuesta.'
      }
    ]
  },
  {
    id: 'kruskal',
    name: 'Algoritmo de Kruskal (MST)',
    category: 'busqueda_grafos',
    categoryLabel: 'Búsqueda y Grafos',
    subtitle: 'Encuentra el Árbol de Expansión Mínima uniendo las aristas más baratas.',
    icon: '🌳',
    difficulty: 'Avanzado',
    complexity: { timeBest: 'O(E log E)', timeAverage: 'O(E log E)', timeWorst: 'O(E log E)', spaceWorst: 'O(V)' },
    analogy: { title: 'Caminos más baratos', description: 'Imagina que conectas las ciudades de un país. Escoges siempre construir primero el camino más barato, a menos que este cierre un bucle (porque sería redundante).', realLifeExample: 'Redes de distribución eléctrica, cableado o ductos óptimos.' },
    explanationMarkdown: `### Algoritmo de Kruskal\nKruskal es un algoritmo **voraz (greedy)** que encuentra el Minimum Spanning Tree (MST) para un grafo ponderado no dirigido.\n\n**¿Cómo funciona paso a paso?**\n1. **Ordenar:** Toma todas las aristas del grafo y ordénalas de menor a mayor peso (este paso dicta la complejidad O(E log E)).\n2. **Union-Find:** Inicia una estructura de datos Disjoint-Set (Union-Find) donde cada vértice es un conjunto separado.\n3. **Procesar Aristas:** Itera sobre la lista ordenada de aristas:\n   - Para cada arista, verifica si sus dos vértices pertenecen al mismo conjunto.\n   - Si pertenecen a conjuntos distintos, la arista NO forma un ciclo. Agrega la arista al resultado y **Une** los dos conjuntos.\n   - Si pertenecen al mismo conjunto, la ignoras (formaría un ciclo).\n4. Repite hasta que el MST tenga \`V-1\` aristas.`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdlib.h>

// Estructura para representar una arista
struct Edge {
    int src, dest, weight;
};

// Estructura para el grafo
struct Graph {
    int V, E;
    struct Edge* edge;
};

// Estructura para el subset de Union-Find
struct subset {
    int parent;
    int rank;
};

// Crea un grafo con V vértices y E aristas
struct Graph* createGraph(int V, int E) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edge = (struct Edge*)malloc(graph->E * sizeof(struct Edge));
    return graph;
}

// Búsqueda con Path Compression
int find(struct subset subsets[], int i) {
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);
    return subsets[i].parent;
}

// Unión por Rank
void Union(struct subset subsets[], int x, int y) {
    int xroot = find(subsets, x);
    int yroot = find(subsets, y);
    
    if (subsets[xroot].rank < subsets[yroot].rank)
        subsets[xroot].parent = yroot;
    else if (subsets[xroot].rank > subsets[yroot].rank)
        subsets[yroot].parent = xroot;
    else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}

// Comparador para qsort
int myComp(const void* a, const void* b) {
    struct Edge* a1 = (struct Edge*)a;
    struct Edge* b1 = (struct Edge*)b;
    return a1->weight > b1->weight;
}

void KruskalMST(struct Graph* graph) {
    int V = graph->V;
    struct Edge result[V];
    int e = 0, i = 0;
    
    // 1. Ordenar todas las aristas
    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), myComp);
    
    // Asignar memoria para los subsets
    struct subset* subsets = (struct subset*)malloc(V * sizeof(struct subset));
    for (int v = 0; v < V; ++v) {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }
    
    // 2. Iterar sobre las aristas ordenadas
    while (e < V - 1 && i < graph->E) {
        struct Edge next_edge = graph->edge[i++];
        int x = find(subsets, next_edge.src);
        int y = find(subsets, next_edge.dest);
        
        // Si no forman un ciclo, inclúyela en el resultado
        if (x != y) {
            result[e++] = next_edge;
            Union(subsets, x, y);
        }
    }
    
    // Imprimir el Minimum Spanning Tree
    int minimumCost = 0;
    printf("Aristas en el MST:\\n");
    for (i = 0; i < e; ++i) {
        printf("%d -- %d == %d\\n", result[i].src, result[i].dest, result[i].weight);
        minimumCost += result[i].weight;
    }
    printf("Costo Total Minimo: %d\\n", minimumCost);
    free(subsets);
}

int main() {
    int V = 4, E = 5;
    struct Graph* graph = createGraph(V, E);
    
    graph->edge[0] = (struct Edge){0, 1, 10};
    graph->edge[1] = (struct Edge){0, 2, 6};
    graph->edge[2] = (struct Edge){0, 3, 5};
    graph->edge[3] = (struct Edge){1, 3, 15};
    graph->edge[4] = (struct Edge){2, 3, 4};
    
    KruskalMST(graph);
    
    free(graph->edge);
    free(graph);
    return 0;
}
`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Edge { int src, dest, weight; };\nbool compareEdges(Edge a, Edge b) { return a.weight < b.weight; }\n\nstruct DisjointSet {\n    vector<int> parent;\n    DisjointSet(int n) {\n        parent.resize(n);\n        for (int i=0; i<n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    void unionSets(int i, int j) {\n        int root_i = find(i);\n        int root_j = find(j);\n        if (root_i != root_j) parent[root_i] = root_j;\n    }\n};\n\nint main() {\n    vector<Edge> edges = {{0, 1, 1}, {0, 2, 4}, {1, 2, 2}};\n    sort(edges.begin(), edges.end(), compareEdges);\n    // Lógica Union-Find aquí...\n    return 0;\n}`,
      python: `class DisjointSet:\n    def __init__(self, vertices):\n        self.parent = {v: v for v in vertices}\n\n    def find(self, item):\n        if self.parent[item] == item:\n            return item\n        self.parent[item] = self.find(self.parent[item])\n        return self.parent[item]\n\n    def union(self, set1, set2):\n        root1 = self.find(set1)\n        root2 = self.find(set2)\n        self.parent[root1] = root2\n\n# Kruskal logic...\nif __name__ == "__main__":\n    pass`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      const nodes = [{ id: 'A', label: 'A', state: 'unvisited' as const, x: 100, y: 150 }, { id: 'B', label: 'B', state: 'unvisited' as const, x: 250, y: 80 }, { id: 'C', label: 'C', state: 'unvisited' as const, x: 250, y: 220 }];
      const edges = [{ from: 'A', to: 'B', weight: 1, highlighted: false }, { from: 'A', to: 'C', weight: 4, highlighted: false }, { from: 'B', to: 'C', weight: 2, highlighted: false }];
      steps.push({ stepIndex: 0, description: 'Inicio', graphNodes: nodes, graphEdges: edges });
      steps.push({ stepIndex: 1, description: 'Toma A-B (peso 1)', graphNodes: nodes, graphEdges: [{...edges[0], highlighted:true}, edges[1], edges[2]] });
      steps.push({ stepIndex: 2, description: 'Toma B-C (peso 2)', graphNodes: nodes, graphEdges: [{...edges[0], highlighted:true}, edges[1], {...edges[2], highlighted:true}] });
      return steps;
    },
    exercises: [
      {
        id: 'kruskal-1',
        title: 'Implementar Find con Compresión',
        description: 'Escribe la función \'Find\' de un Disjoint Set usando Path Compression para optimizar futuras búsquedas.',
        cCode: `int find(int parent[], int i) {\n    // Tu código aquí\n    return i;\n}`,
        cppCode: `int find(vector<int>& parent, int i) {\n    // Tu código aquí\n    return i;\n}`,
        pythonCode: `def find(parent, i):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Encuentra y comprime la ruta hacia la raíz.',
        explanation: 'En lugar de solo retornar la recursión, asigna parent[i] = find(parent, parent[i]) y luego retorna parent[i].'
      },
      {
        id: 'kruskal-2',
        title: 'Costo Total del MST',
        description: 'Asumiendo que tienes el array de aristas del MST final, suma el costo.',
        cCode: `// Ejercicio conceptual`,
        cppCode: `int getTotalCost(vector<Edge>& mst) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def get_total_cost(mst):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'La suma de los pesos.',
        explanation: 'Simplemente itera la lista o arreglo resultante y acumula el atributo de peso de cada arista.'
      },
      {
        id: 'kruskal-3',
        title: 'Detección de Ciclos',
        description: 'Si solo te interesara saber si el grafo tiene un ciclo en lugar del MST, ¿cómo usarías Union-Find?',
        cCode: `// Ejercicio conceptual`,
        cppCode: `bool hasCycle(vector<Edge>& edges, int V) {\n    // Tu código aquí\n    return false;\n}`,
        pythonCode: `def has_cycle(edges, V):\n    # Tu código aquí\n    return False`,
        expectedOutput: 'True si existe un ciclo.',
        explanation: 'Itera por las aristas. Si al hacer un find de ambos vértices resulta que tienen la MISMA raíz (mismo conjunto), significa que conectarlos cerraría un ciclo.'
      }
    ]
  },
  {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento (Sorting)',
    subtitle: 'Inserción optimizada con intervalos.',
    icon: '🐚',
    difficulty: 'Intermedio',
    complexity: { timeBest: 'O(n log n)', timeAverage: 'O(n^(4/3))', timeWorst: 'O(n^2)', spaceWorst: 'O(1)' },
    analogy: { title: 'Peinado por intervalos', description: 'Mueve los elementos desordenados a lo largo del arreglo muy rápido saltando grandes distancias, antes de afinar con distancias pequeñas.', realLifeExample: 'Sistemas de hardware embebido, donde llamar a funciones recursivas o asignar nueva memoria es muy costoso.' },
    explanationMarkdown: `### Shell Sort\nShell Sort es una variante avanzada del **Insertion Sort** (Ordenamiento por Inserción). El problema del Insertion Sort es que los elementos se mueven solo una posición a la vez. Si el elemento más pequeño está al final del arreglo, requiere \`n\` intercambios para llegar al principio.\n\n**¿Cómo lo soluciona Shell Sort?**\nSe define una **secuencia de intervalos (gap)**. En vez de comparar elementos adyacentes, compara elementos separados por el gap.\n\n1. **Empieza con un gap grande** (ej. \`n/2\`). Se agrupan los elementos separados por este gap y se ordenan por inserción.\n2. **Reduce el gap** progresivamente a la mitad (\`n/4\`, \`n/8\`).\n3. **Fase Final:** El último gap siempre es 1, lo que se convierte en un Insertion Sort estándar. Pero como el arreglo ya está "casi ordenado" gracias a los pasos anteriores, esta fase final es extremadamente rápida.`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nvoid shellSort(int arr[], int n) {\n    // Empieza con un gap grande, reduce a la mitad\n    for (int gap = n/2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i += 1) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n                arr[j] = arr[j - gap];\n            }\n            arr[j] = temp;\n        }\n    }\n}\n\nint main() {\n    int arr[] = {12, 34, 54, 2, 3};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    shellSort(arr, n);\n    for(int i=0; i<n; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid shellSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int gap = n/2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n                arr[j] = arr[j - gap];\n            }\n            arr[j] = temp;\n        }\n    }\n}\n\nint main() {\n    vector<int> arr = {12, 34, 54, 2, 3};\n    shellSort(arr);\n    for(int num : arr) cout << num << " ";\n    return 0;\n}`,
      python: `def shell_sort(arr):\n    n = len(arr)\n    gap = n // 2\n    \n    while gap > 0:\n        for i in range(gap, n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j - gap] > temp:\n                arr[j] = arr[j - gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2\n\nif __name__ == "__main__":\n    arr = [12, 34, 54, 2, 3]\n    shell_sort(arr)\n    print(arr)`
    },
    initialVisualData: { defaultArray: [12, 34, 54, 2, 3] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [12, 34, 54, 2, 3];
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Inicio', arrayState: [...arr] });
      steps.push({ stepIndex: 1, description: 'Gap 2', arrayState: [12, 2, 54, 34, 3], highlightIndices: [1, 3] });
      steps.push({ stepIndex: 2, description: 'Gap 1', arrayState: [2, 3, 12, 34, 54] });
      return steps;
    },
    exercises: [
      {
        id: 'shell-1',
        title: 'Bucle de Secuencia',
        description: 'Escribe solo el bucle exterior para generar la secuencia de incrementos (gaps) dividiendo por 2, hasta que gap sea 0.',
        cCode: `void printGaps(int n) {\n    // Tu código aquí\n}`,
        cppCode: `void printGaps(int n) {\n    // Tu código aquí\n}`,
        pythonCode: `def print_gaps(n):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'La secuencia correcta de saltos (ej: si n=10 -> 5, 2, 1).',
        explanation: 'Inicia con gap = n/2 (división entera). Continúa mientras gap > 0, y actualiza con gap = gap / 2.'
      },
      {
        id: 'shell-2',
        title: 'Desplazamiento',
        description: 'Implementa el bucle interior que mueve elementos arr[j-gap] hacia adelante (simulando Inserción).',
        cCode: `void shiftGap(int arr[], int i, int gap) {\n    // Tu código aquí\n}`,
        cppCode: `void shiftGap(vector<int>& arr, int i, int gap) {\n    // Tu código aquí\n}`,
        pythonCode: `def shift_gap(arr, i, gap):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Los elementos se desplazan el tamaño del gap.',
        explanation: 'Guarda el valor temp = arr[i]. Inicia un puntero j=i. Mientras j >= gap y arr[j-gap] > temp, haz arr[j] = arr[j-gap] y resta gap a j.'
      },
      {
        id: 'shell-3',
        title: 'Secuencia de Knuth',
        description: 'Modifica el cálculo de los Gaps para usar la secuencia de Knuth (h = h * 3 + 1), que ofrece una mejor complejidad teórica.',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `void knuthShellSort(vector<int>& arr) {\n    // Tu código aquí\n}`,
        pythonCode: `def knuth_shell_sort(arr):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Arreglo ordenado con secuencia Knuth.',
        explanation: 'Antes de iniciar el ordenamiento, encuentra el gap inicial de Knuth que sea menor al tamaño n (ej: 1, 4, 13, 40...). Luego divide el gap por 3 en el bucle.'
      }
    ]
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento (Sorting)',
    subtitle: 'Ordena construyendo una estructura de Max Heap.',
    icon: '⛰️',
    difficulty: 'Avanzado',
    complexity: { timeBest: 'O(n log n)', timeAverage: 'O(n log n)', timeWorst: 'O(n log n)', spaceWorst: 'O(1)' },
    analogy: { title: 'El Rey de la Colina', description: 'Encuentras al más grande del grupo (la cima de la montaña), lo quitas y lo pones al final de la fila. Repites.', realLifeExample: 'Sistemas operativos para planificadores de tareas de prioridad estricta.' },
    explanationMarkdown: `### Heap Sort\nHeap Sort es un algoritmo de ordenamiento basado en comparaciones que usa una estructura de datos llamada **Binary Heap** (Montículo Binario).\n\n**¿Qué es un Heap?**\nEs un árbol binario casi completo que cumple con la propiedad Heap. Un **Max Heap** es donde el padre siempre es mayor que sus hijos.\n\n**¿Cómo funciona paso a paso?**\n1. **Heapify (Construcción):** Convierte el arreglo desordenado en un Max Heap. Tras esto, sabes que el elemento más grande de todo el arreglo está en la raíz (índice 0).\n2. **Extracción (Ordenamiento):**\n   - Intercambia la raíz (el mayor) con el último elemento del arreglo.\n   - Reduce el tamaño "lógico" del heap en 1 (porque el elemento más grande ya está en su posición final).\n   - Aplica Heapify a la nueva raíz para que el siguiente elemento más grande flote hasta arriba.\n   - Repite hasta que el Heap quede vacío.\n\n**Ventajas:**\nTiene una complejidad garantizada de **O(n log n)** en el peor de los casos (a diferencia de QuickSort) y ordena In-Place **O(1)** (a diferencia de MergeSort).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6, 7};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    heapSort(arr, n);\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid heapify(vector<int>& arr, int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nint main() {\n    vector<int> arr = {12, 11, 13, 5, 6, 7};\n    heapSort(arr);\n    for(int num : arr) cout << num << " ";\n    return 0;\n}`,
      python: `def heapify(arr, n, i):\n    largest = i\n    left = 2 * i + 1\n    right = 2 * i + 2\n\n    if left < n and arr[left] > arr[largest]: largest = left\n    if right < n and arr[right] > arr[largest]: largest = right\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n\nif __name__ == "__main__":\n    arr = [12, 11, 13, 5, 6, 7]\n    heap_sort(arr)\n    print(arr)`
    },
    initialVisualData: { defaultArray: [12, 11, 13, 5, 6, 7] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [12, 11, 13, 5, 6, 7];
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Inicio', arrayState: [...arr] });
      steps.push({ stepIndex: 1, description: 'Construyendo el Heap', arrayState: [13, 11, 12, 5, 6, 7] });
      steps.push({ stepIndex: 2, description: 'Intercambio Raíz y Último', arrayState: [7, 11, 12, 5, 6, 13] });
      return steps;
    },
    exercises: [
      {
        id: 'heap-1',
        title: 'Manejo de Índices',
        description: 'Dada una representación de heap como arreglo, ¿cómo calculas el índice del padre, el hijo izquierdo y el hijo derecho?',
        cCode: `int leftChild(int i) { return 0; }\nint rightChild(int i) { return 0; }\nint parent(int i) { return 0; }`,
        cppCode: `int leftChild(int i) { return 0; }\nint rightChild(int i) { return 0; }\nint parent(int i) { return 0; }`,
        pythonCode: `def get_indices(i):\n    # Retorna tupla: (padre, hijo_izq, hijo_der)\n    pass`,
        expectedOutput: 'Los índices matemáticos.',
        explanation: 'En un arreglo de base cero, padre = (i-1)/2, izquierdo = 2*i + 1, derecho = 2*i + 2.'
      },
      {
        id: 'heap-2',
        title: 'Heapify Down',
        description: 'Escribe la lógica base para corregir el heap hundiendo el elemento de la raíz hacia abajo si es menor que sus hijos.',
        cCode: `void heapify(int arr[], int n, int i) {\n    // Tu código aquí\n}`,
        cppCode: `void heapify(vector<int>& arr, int n, int i) {\n    // Tu código aquí\n}`,
        pythonCode: `def heapify(arr, n, i):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El arreglo con la propiedad Max Heap restaurada.',
        explanation: 'Encuentra el índice del valor máximo entre el nodo i y sus dos hijos. Si el máximo no es i, haz swap(arr[i], arr[max]) y llama de nuevo recursivamente a heapify(arr, n, max).'
      },
      {
        id: 'heap-3',
        title: 'K-ésimo Más Grande',
        description: 'Encuentra el K-ésimo elemento más grande del arreglo sin ordenarlo completamente usando la idea de HeapSort.',
        cCode: `int findKthLargest(int arr[], int n, int k) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int findKthLargest(vector<int>& arr, int k) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def find_kth_largest(arr, k):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El valor numérico.',
        explanation: 'Puedes convertir el arreglo en un Max Heap, y llamar a la función de extracción (swap de raíz con final y hacer heapify) exactamente K veces. El K-ésimo elemento extraído es la respuesta.'
      }
    ]
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'ordenamiento',
    categoryLabel: 'Ordenamiento (Sorting)',
    subtitle: 'Ordena de dígito en dígito, de menos a más significativo.',
    icon: '🎰',
    difficulty: 'Avanzado',
    complexity: { timeBest: 'O(nk)', timeAverage: 'O(nk)', timeWorst: 'O(nk)', spaceWorst: 'O(n+k)' },
    analogy: { title: 'Máquina tragamonedas', description: 'Ordenas las cartas primero viendo sólo el número de las unidades, luego decenas, luego cientos.', realLifeExample: 'Máquinas antiguas de tabulación de tarjetas perforadas IBM.' },
    explanationMarkdown: `### Radix Sort\nRadix Sort es un algoritmo de ordenamiento no comparativo. A diferencia de Counting Sort (que es su subrutina), puede manejar números grandes ordenando dígito por dígito.\n\n**¿Cómo funciona paso a paso?**\nSe puede hacer de Menos Significativo a Más Significativo (LSD) o viceversa (MSD).\nUsando LSD:\n1. Encuentra el número máximo en el arreglo para saber cuántos dígitos (pasadas) vas a procesar.\n2. Para el primer dígito (Unidades): Aplica Counting Sort para ordenar todos los números según su dígito de las unidades (0-9).\n3. Para el segundo dígito (Decenas): Aplica Counting Sort OTRA VEZ. Como el Counting Sort es ESTABLE, no rompe el orden interno de las unidades de la pasada anterior.\n4. Repite por cada cifra.\n\n**Ejemplo (170, 45, 75, 90):**\n- Unidades: 170, 90, 45, 75\n- Decenas: 45, 170, 75, 90\n- Centenas: 045, 075, 090, 170 (Ordenado).\n\n**Ventajas:**\nSi el número más grande (k) no tiene muchos dígitos, la complejidad **O(n*k)** puede ser más rápida que O(n log n).`,
    codeImplementations: {
      c: `#include <stdio.h>\n\nint getMax(int arr[], int n) {\n    int mx = arr[0];\n    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];\n    return mx;\n}\n\nvoid countSort(int arr[], int n, int exp) {\n    int output[n];\n    int i, count[10] = {0};\n    for (i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;\n    for (i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (i = n - 1; i >= 0; i--) {\n        output[count[(arr[i] / exp) % 10] - 1] = arr[i];\n        count[(arr[i] / exp) % 10]--;\n    }\n    for (i = 0; i < n; i++) arr[i] = output[i];\n}\n\nvoid radixSort(int arr[], int n) {\n    int m = getMax(arr, n);\n    for (int exp = 1; m / exp > 0; exp *= 10)\n        countSort(arr, n, exp);\n}\n\nint main() {\n    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    radixSort(arr, n);\n    for(int i=0; i<n; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nvoid countSort(vector<int>& arr, int exp) {\n    int n = arr.size();\n    vector<int> output(n);\n    int count[10] = {0};\n    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;\n    for (int i = 1; i < 10; i++) count[i] += count[i - 1];\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[(arr[i] / exp) % 10] - 1] = arr[i];\n        count[(arr[i] / exp) % 10]--;\n    }\n    for (int i = 0; i < n; i++) arr[i] = output[i];\n}\n\nvoid radixSort(vector<int>& arr) {\n    int m = *max_element(arr.begin(), arr.end());\n    for (int exp = 1; m / exp > 0; exp *= 10)\n        countSort(arr, exp);\n}\n\nint main() {\n    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};\n    radixSort(arr);\n    for(int num : arr) cout << num << " ";\n    return 0;\n}`,
      python: `def count_sort(arr, exp1):\n    n = len(arr)\n    output = [0] * n\n    count = [0] * 10\n    for i in range(0, n):\n        index = arr[i] // exp1\n        count[index % 10] += 1\n    for i in range(1, 10): count[i] += count[i - 1]\n    i = n - 1\n    while i >= 0:\n        index = arr[i] // exp1\n        output[count[index % 10] - 1] = arr[i]\n        count[index % 10] -= 1\n        i -= 1\n    for i in range(0, len(arr)): arr[i] = output[i]\n\ndef radix_sort(arr):\n    max1 = max(arr)\n    exp = 1\n    while max1 / exp >= 1:\n        count_sort(arr, exp)\n        exp *= 10\n\nif __name__ == "__main__":\n    arr = [170, 45, 75, 90, 802, 24, 2, 66]\n    radix_sort(arr)\n    print(arr)`
    },
    initialVisualData: { defaultArray: [170, 45, 75, 90, 802, 24, 2, 66] },
    generateSteps: (customInput?: any) => {
      const arr: number[] = customInput ? [...customInput] : [170, 45, 75, 90, 802, 24, 2, 66];
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Inicio', arrayState: [...arr] });
      steps.push({ stepIndex: 1, description: 'Ordenado por las Unidades', arrayState: [170, 90, 802, 2, 24, 45, 75, 66] });
      steps.push({ stepIndex: 2, description: 'Ordenado por las Decenas', arrayState: [802, 2, 24, 45, 66, 170, 75, 90] });
      steps.push({ stepIndex: 3, description: 'Ordenado por las Centenas (Final)', arrayState: [2, 24, 45, 66, 75, 90, 170, 802] });
      return steps;
    },
    exercises: [
      {
        id: 'radix-1',
        title: 'Extracción de Dígitos',
        description: 'Escribe una función auxiliar que obtenga el valor posicional. Si x=456, extraer_digito(x, 1)=6, extraer_digito(x, 10)=5.',
        cCode: `int extract(int num, int exp) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `int extract(int num, int exp) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def extract(num, exp):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El dígito solicitado (0-9).',
        explanation: 'Solo necesitas retornar (num / exp) % 10. Asegúrate de que las operaciones sean de división entera.'
      },
      {
        id: 'radix-2',
        title: 'Determinar el Bucle Exterior',
        description: 'Dado un arreglo numérico, ¿cómo calcularías dinámicamente hasta qué exp debe correr el Radix Sort?',
        cCode: `int getMax(int arr[], int n) {\n    // Retorna el máximo elemento\n    return 0;\n}`,
        cppCode: `int getMaxExp(vector<int>& arr) {\n    // Tu código aquí\n    return 0;\n}`,
        pythonCode: `def get_max_exp(arr):\n    # Retorna qué tan lejos llega el exp\n    pass`,
        expectedOutput: 'La condición de paro correcta.',
        explanation: 'Encuentra el número mayor de todo el arreglo. Si es 852, debes iterar mientras max_val / exp > 0 (es decir, para exp=1, exp=10, y exp=100).'
      },
      {
        id: 'radix-3',
        title: 'Radix con Strings',
        description: '¿Cómo adaptarías la lógica del LSD para ordenar palabras de igual longitud (ej: "CAR", "CAT", "BAT")?',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `void stringRadix(vector<string>& arr, int string_length) {\n    // Tu código aquí\n}`,
        pythonCode: `def string_radix(arr, string_length):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Arreglo ordenado alfabéticamente.',
        explanation: 'Inicia el bucle desde la última letra hasta la primera (i = length-1 hacia 0). En la función CountSort, los "cubos" serán 256 en lugar de 10 para mapear el código ASCII de cada letra (arr[index][i]).'
      }
    ]
  },
  {
    id: 'lru-cache',
    name: 'LRU Cache',
    category: 'estructuras',
    categoryLabel: 'Estructuras de Datos',
    subtitle: 'Mantiene elementos recientes, descarta el más antiguo (Least Recently Used).',
    icon: '💾',
    difficulty: 'Avanzado',
    complexity: { timeBest: 'O(1)', timeAverage: 'O(1)', timeWorst: 'O(1)', spaceWorst: 'O(c)' },
    analogy: { title: 'Tu clóset de ropa', description: 'Cuando compras ropa nueva y el clóset está lleno, sacas la prenda que llevas más tiempo sin ponerte para hacer espacio.', realLifeExample: 'Caché de navegadores web y sistemas de paginación de memoria en Sistemas Operativos.' },
    explanationMarkdown: `### Caché LRU (Least Recently Used)\nUn Caché LRU almacena una cantidad limitada de datos. Cuando el caché se llena, y quieres ingresar un nuevo dato, el sistema elimina automáticamente el elemento que ha sido **usado menos recientemente**.\n\n**El Secreto O(1):**\nPara lograr que la Inserción, la Lectura y la Eliminación sean todas de tiempo constante **O(1)**, necesitas combinar dos estructuras:\n1. **Hash Map (Diccionario):** Permite encontrar cualquier elemento inmediatamente (O(1)). Guarda las llaves y como valores almacena punteros directos a los Nodos.\n2. **Lista Doblemente Enlazada (Doubly Linked List):** Mantiene el orden de uso. \n   - Cada vez que lees o insertas un nodo, lo arrancas de donde esté y lo pones en la **Cabeza** (lo más reciente).\n   - Cuando la capacidad se llena, el elemento a eliminar siempre está en la **Cola** (lo más viejo). Como es doblemente enlazada, arrancarlo es O(1).`,
    codeImplementations: {
      c: `#include <stdio.h>
#include <stdlib.h>

#define HASH_SIZE 100 // Array simple para el Hash Map (asumiendo llaves < 100)

// Nodo de la Lista Doblemente Enlazada
typedef struct Node {
    int key, value;
    struct Node *prev, *next;
} Node;

// Estructura de la Caché
typedef struct {
    int capacity, count;
    Node *head, *tail;
    Node* hash[HASH_SIZE]; // Mapeo directo llave -> Nodo
} LRUCache;

// Crear un nuevo nodo
Node* createNode(int key, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->key = key;
    newNode->value = value;
    newNode->prev = newNode->next = NULL;
    return newNode;
}

// Inicializar Caché
LRUCache* createCache(int capacity) {
    LRUCache* cache = (LRUCache*)malloc(sizeof(LRUCache));
    cache->capacity = capacity;
    cache->count = 0;
    cache->head = createNode(0, 0); // Dummy Head
    cache->tail = createNode(0, 0); // Dummy Tail
    cache->head->next = cache->tail;
    cache->tail->prev = cache->head;
    for(int i = 0; i < HASH_SIZE; i++) cache->hash[i] = NULL;
    return cache;
}

// Remover un nodo de la lista
void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
}

// Agregar nodo justo después del head (marca como usado recientemente)
void addToHead(LRUCache* cache, Node* node) {
    node->next = cache->head->next;
    node->next->prev = node;
    node->prev = cache->head;
    cache->head->next = node;
}

// Función Obtener (Get)
int get(LRUCache* cache, int key) {
    if (key >= HASH_SIZE || cache->hash[key] == NULL) return -1;
    Node* node = cache->hash[key];
    removeNode(node); // Lo sacamos de su posición actual
    addToHead(cache, node); // Lo movemos al frente
    return node->value;
}

// Función Poner (Put)
void put(LRUCache* cache, int key, int value) {
    if (key >= HASH_SIZE) return;
    
    if (cache->hash[key] != NULL) {
        // Actualizar existente
        Node* node = cache->hash[key];
        node->value = value;
        removeNode(node);
        addToHead(cache, node);
    } else {
        // Insertar nuevo
        Node* newNode = createNode(key, value);
        cache->hash[key] = newNode;
        addToHead(cache, newNode);
        cache->count++;
        
        // Evicción si sobrepasa capacidad
        if (cache->count > cache->capacity) {
            Node* lru = cache->tail->prev; // El más antiguo está antes del tail
            removeNode(lru);
            cache->hash[lru->key] = NULL;
            free(lru);
            cache->count--;
        }
    }
}

// Liberar memoria (buena práctica en C)
void freeCache(LRUCache* cache) {
    Node* curr = cache->head;
    while(curr != NULL) {
        Node* next = curr->next;
        free(curr);
        curr = next;
    }
    free(cache);
}

int main() {
    LRUCache* cache = createCache(2); // Capacidad de 2
    put(cache, 1, 10);
    put(cache, 2, 20);
    printf("get(1): %d\\n", get(cache, 1)); // Devuelve 10 (Llave 1 es MRU)
    
    put(cache, 3, 30);                      // Evicta la llave 2 (que era LRU)
    printf("get(2): %d\\n", get(cache, 2)); // Devuelve -1 (no encontrada)
    
    freeCache(cache);
    return 0;
}
`,
      cpp: `#include <iostream>\n#include <unordered_map>\n\nusing namespace std;\n\nclass LRUCache {\n    struct Node {\n        int key, val;\n        Node *prev, *next;\n        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}\n    };\n    int capacity;\n    unordered_map<int, Node*> cache;\n    Node *head, *tail;\n\n    void removeNode(Node* node) {\n        node->prev->next = node->next;\n        node->next->prev = node->prev;\n    }\n\n    void addToHead(Node* node) {\n        node->next = head->next;\n        node->next->prev = node;\n        node->prev = head;\n        head->next = node;\n    }\n\npublic:\n    LRUCache(int cap) : capacity(cap) {\n        head = new Node(0, 0); tail = new Node(0, 0);\n        head->next = tail; tail->prev = head;\n    }\n\n    int get(int key) {\n        if (cache.find(key) != cache.end()) {\n            Node* node = cache[key];\n            removeNode(node);\n            addToHead(node);\n            return node->val;\n        }\n        return -1;\n    }\n\n    void put(int key, int value) {\n        if (cache.find(key) != cache.end()) {\n            Node* node = cache[key];\n            node->val = value;\n            removeNode(node);\n            addToHead(node);\n        } else {\n            if (cache.size() == capacity) {\n                Node* lru = tail->prev;\n                cache.erase(lru->key);\n                removeNode(lru);\n                delete lru;\n            }\n            Node* newNode = new Node(key, value);\n            cache[key] = newNode;\n            addToHead(newNode);\n        }\n    }\n};\n\nint main() {\n    LRUCache lru(2);\n    lru.put(1, 10); lru.put(2, 20);\n    cout << lru.get(1) << endl; // Devuelve 10\n    lru.put(3, 30);             // Evicta la llave 2\n    cout << lru.get(2) << endl; // Devuelve -1 (no encontrada)\n    return 0;\n}`,
      python: `class Node:\n    def __init__(self, key, val):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = {}  # Map key to node\n        self.head, self.tail = Node(0, 0), Node(0, 0)\n        self.head.next, self.tail.prev = self.tail, self.head\n\n    def _remove(self, node):\n        p, n = node.prev, node.next\n        p.next, n.prev = n, p\n\n    def _add(self, node):\n        p, n = self.head, self.head.next\n        p.next = node; node.prev = p\n        n.prev = node; node.next = n\n\n    def get(self, key):\n        if key in self.cache:\n            self._remove(self.cache[key])\n            self._add(self.cache[key])\n            return self.cache[key].val\n        return -1\n\n    def put(self, key, val):\n        if key in self.cache:\n            self._remove(self.cache[key])\n        self.cache[key] = Node(key, val)\n        self._add(self.cache[key])\n        if len(self.cache) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.cache[lru.key]\n\nif __name__ == "__main__":\n    lru = LRUCache(2)\n    lru.put(1, 10)\n    lru.put(2, 20)\n    print(lru.get(1))\n    lru.put(3, 30)\n    print(lru.get(2))`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Inicializado Cache con Capacidad = 2', arrayState: [] });
      steps.push({ stepIndex: 1, description: 'put(1, 10) -> Se agrega a la cabeza', arrayState: [1] });
      steps.push({ stepIndex: 2, description: 'put(2, 20) -> Se agrega a la cabeza', arrayState: [2, 1] });
      steps.push({ stepIndex: 3, description: 'get(1) -> El nodo 1 vuelve a la cabeza', arrayState: [1, 2] });
      steps.push({ stepIndex: 4, description: 'put(3, 30) -> Se llena. Evicta el 2 (cola).', arrayState: [3, 1] });
      return steps;
    },
    exercises: [
      {
        id: 'lru-1',
        title: 'Python OrderedDict',
        description: 'En Python moderno, puedes implementar un LRU Cache muy fácil usando OrderedDict. Inténtalo.',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `// Ejercicio conceptual C++`,
        pythonCode: `from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n\n    def get(self, key: int) -> int:\n        # Tu código aquí\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        # Tu código aquí\n        pass`,
        expectedOutput: 'Caché funcional.',
        explanation: 'En get(): si la llave existe, haz self.cache.move_to_end(key) y retorna el valor. En put(): asigna el valor, haz move_to_end(key), y si len > capacity, haz self.cache.popitem(last=False).'
      },
      {
        id: 'lru-2',
        title: 'Agregar a la Cabeza (C++)',
        description: 'Imagina que los nodos falsos (dummy) de cabeza y cola ya existen. Escribe la función que inserta un nodo justo después del head dummy.',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `void addToHead(Node* node) {\n    // Tu código aquí\n}`,
        pythonCode: `def add_to_head(self, node):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'Los 4 punteros actualizados correctamente.',
        explanation: 'Guarda head->next en una variable n. Haz node->next = n, node->prev = head. Luego head->next = node, y n->prev = node.'
      },
      {
        id: 'lru-3',
        title: 'Remover un Nodo',
        description: 'Escribe la lógica para aislar/arrancar un nodo de la lista doblemente enlazada.',
        cCode: `void removeNode(struct Node* node) {\n    // Tu código aquí\n}`,
        cppCode: `void removeNode(Node* node) {\n    // Tu código aquí\n}`,
        pythonCode: `def remove_node(self, node):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'El nodo es removido de la cadena.',
        explanation: 'Guarda node->prev en p, y node->next en n. Simplemente haz p->next = n; y n->prev = p;.'
      }
    ]
  },
  {
    id: 'floyd-warshall',
    name: 'Floyd-Warshall (APSP)',
    category: 'dp_backtracking',
    categoryLabel: 'Prog. Dinámica & Backtracking',
    subtitle: 'Encuentra las rutas más cortas entre TODOS los pares de nodos.',
    icon: '🗺️',
    difficulty: 'Avanzado',
    complexity: { timeBest: 'O(V^3)', timeAverage: 'O(V^3)', timeWorst: 'O(V^3)', spaceWorst: 'O(V^2)' },
    analogy: { title: 'Agencias de vuelo', description: 'Para cada par de ciudades, pruebas sistemáticamente si usar una escala en una tercera ciudad abarata el boleto final.', realLifeExample: 'Calculadores de tarifas de redes de transporte y routing de red (protocolos antiguos de enrutamiento).' },
    explanationMarkdown: `### Algoritmo de Floyd-Warshall\nEs un algoritmo de Programación Dinámica utilizado para encontrar los caminos más cortos en un grafo con peso dirigido, entre **Todos los Pares (All-Pairs Shortest Path - APSP)**.\n\n**¿Cómo funciona?**\nSe basa en una idea muy simple pero anidada en **tres bucles \`for\`**: Iterar sobre un nodo intermedio \`k\`.\n\nPara cada nodo intermedio \`k\`, cada nodo de origen \`i\` y cada nodo de destino \`j\`:\n- Preguntamos: ¿La distancia de \`i\` a \`j\` es más corta si viajamos a través de \`k\`?\n- Fórmula: \`dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\`\n\n**Características Clave:**\n- Puede manejar **aristas con pesos negativos** (a diferencia de Dijkstra).\n- Puede detectar **Ciclos Negativos** (si la diagonal principal de la matriz dist[i][i] se vuelve menor a 0, hay un ciclo negativo).\n- Es muy ineficiente en grafos enormes debido a su complejidad **O(V³)**. Se usa principalmente en matrices de adyacencia de tamaño manejable.`,
    codeImplementations: {
      c: `#include <stdio.h>\n#define INF 99999\n#define V 4\n\nvoid floydWarshall(int graph[V][V]) {\n    int dist[V][V], i, j, k;\n    for (i = 0; i < V; i++)\n        for (j = 0; j < V; j++)\n            dist[i][j] = graph[i][j];\n\n    for (k = 0; k < V; k++) {\n        for (i = 0; i < V; i++) {\n            for (j = 0; j < V; j++) {\n                if (dist[i][k] + dist[k][j] < dist[i][j])\n                    dist[i][j] = dist[i][k] + dist[k][j];\n            }\n        }\n    }\n    \n    for (i = 0; i < V; i++) {\n        for (j = 0; j < V; j++) {\n            if (dist[i][j] == INF) printf("INF ");\n            else printf("%d   ", dist[i][j]);\n        }\n        printf("\\n");\n    }\n}\n\nint main() {\n    int graph[V][V] = { {0, 5, INF, 10},\n                        {INF, 0, 3, INF},\n                        {INF, INF, 0, 1},\n                        {INF, INF, INF, 0} };\n    floydWarshall(graph);\n    return 0;\n}`,
      cpp: `#include <iostream>\n#include <vector>\n\nusing namespace std;\n\n#define INF 99999\n\nvoid floydWarshall(vector<vector<int>>& graph) {\n    int V = graph.size();\n    vector<vector<int>> dist = graph;\n\n    for (int k = 0; k < V; k++) {\n        for (int i = 0; i < V; i++) {\n            for (int j = 0; j < V; j++) {\n                if (dist[i][k] + dist[k][j] < dist[i][j])\n                    dist[i][j] = dist[i][k] + dist[k][j];\n            }\n        }\n    }\n\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (dist[i][j] == INF) cout << "INF ";\n            else cout << dist[i][j] << "   ";\n        }\n        cout << endl;\n    }\n}\n\nint main() {\n    vector<vector<int>> graph = { {0, 5, INF, 10},\n                                  {INF, 0, 3, INF},\n                                  {INF, INF, 0, 1},\n                                  {INF, INF, INF, 0} };\n    floydWarshall(graph);\n    return 0;\n}`,
      python: `def floyd_warshall(graph):\n    V = len(graph)\n    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))\n    \n    for k in range(V):\n        for i in range(V):\n            for j in range(V):\n                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n                \n    for i in range(V):\n        for j in range(V):\n            if dist[i][j] == 99999:\n                print("INF", end="   ")\n            else:\n                print(dist[i][j], end="     ")\n        print()\n\nif __name__ == "__main__":\n    INF = 99999\n    graph = [[0, 5, INF, 10],\n             [INF, 0, 3, INF],\n             [INF, INF, 0, 1],\n             [INF, INF, INF, 0]]\n    floyd_warshall(graph)`
    },
    initialVisualData: { defaultArray: [] },
    generateSteps: () => {
      const steps: AlgoVisualStep[] = [];
      steps.push({ stepIndex: 0, description: 'Inicializando matriz de distancias', arrayState: [] });
      steps.push({ stepIndex: 1, description: 'k = 0 (Escala en Nodo A)', arrayState: [] });
      steps.push({ stepIndex: 2, description: 'k = 1 (Escala en Nodo B)', arrayState: [] });
      steps.push({ stepIndex: 3, description: 'Matriz final estabilizada.', arrayState: [] });
      return steps;
    },
    exercises: [
      {
        id: 'floyd-1',
        title: 'Lógica Principal (K, I, J)',
        description: 'Escribe la lógica anidada triple para Floyd Warshall en una matriz dist.',
        cCode: `void shortest_path(int dist[][4], int V) {\n    // Tu código aquí\n}`,
        cppCode: `void shortest_path(vector<vector<int>>& dist) {\n    // Tu código aquí\n}`,
        pythonCode: `def shortest_path(dist):\n    # Tu código aquí\n    pass`,
        expectedOutput: 'La matriz se actualiza in-place.',
        explanation: 'Escribe tres bucles for anidados estrictamente en el orden K (intermedio), I (origen), J (destino). Dentro: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).'
      },
      {
        id: 'floyd-2',
        title: 'Detectar Ciclos Negativos',
        description: '¿Cómo adaptarías la salida del algoritmo para retornar un booleano indicando si hay un ciclo negativo en la matriz?',
        cCode: `int hasNegativeCycle(int dist[][4], int V) {\n    // Tu código aquí\n    return 0;\n}`,
        cppCode: `bool hasNegativeCycle(vector<vector<int>>& dist) {\n    // Tu código aquí\n    return false;\n}`,
        pythonCode: `def has_negative_cycle(dist):\n    # Tu código aquí\n    return False`,
        expectedOutput: 'Retorna True si hay un ciclo negativo, False si no.',
        explanation: 'DESPUÉS de que se hayan ejecutado los 3 bucles anidados, revisa la diagonal principal. Si algún elemento dist[i][i] es menor a 0, retorna true.'
      },
      {
        id: 'floyd-3',
        title: 'Reconstruir Ruta',
        description: 'Además de la matriz dist, necesitas una matriz "next" para saber el camino reconstruido. Escribe la asignación.',
        cCode: `// Ejercicio conceptual C`,
        cppCode: `// Si dist[i][k] + dist[k][j] < dist[i][j] ... ¿qué hacemos con next_node[i][j]?\n`,
        pythonCode: `# Ejercicio conceptual Python`,
        expectedOutput: 'Actualización correcta del next_node.',
        explanation: 'Dentro del condicional del paso de relajación, además de actualizar dist[i][j], debes actualizar la matriz de rutas: next_node[i][j] = next_node[i][k].'
      }
    ]
  }
];


