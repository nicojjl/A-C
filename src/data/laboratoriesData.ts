import { Laboratory } from '../types';

export const LABORATORIES_DATA: Laboratory[] = [
  {
    id: 'lab-1',
    title: 'Laboratorio 1: Programa una Calculadora en C',
    description: 'En este laboratorio construirás paso a paso una calculadora interactiva utilizando sentencias de control, funciones y formato de entrada/salida.',
    difficulty: 'Principiante',
    estimatedMinutes: 20,
    steps: [
      {
        id: 'lab-1-step-1',
        title: 'Paso 1: Suma Básica',
        descriptionMarkdown: 'Comencemos creando una función que acepte dos números enteros y devuelva su suma. Escribe el cuerpo de la función `sumar`.',
        initialCode: `#include <stdio.h>\n\nint sumar(int a, int b) {\n    // TODO: Retorna la suma de a y b\n    return 0;\n}\n\nint main() {\n    printf("Suma: %d\\n", sumar(5, 7));\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint sumar(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf("Suma: %d\\n", sumar(5, 7));\n    return 0;\n}`,
        hint: 'Usa el operador + para sumar a y b.',
        testCases: [
          {
            id: 'tc-1',
            description: 'Debe imprimir 12',
            input: '',
            expectedOutput: 'Suma: 12'
          }
        ]
      },
      {
        id: 'lab-1-step-2',
        title: 'Paso 2: Operaciones Múltiples con switch',
        descriptionMarkdown: 'Ahora, crea una función `operar` que reciba un carácter que represente la operación (`+`, `-`, `*`, `/`) y dos enteros. Usa una sentencia `switch` para realizar la operación correspondiente. Si es división, y el segundo número es 0, retorna 0 (por simplicidad).',
        initialCode: `#include <stdio.h>\n\nint operar(char op, int a, int b) {\n    // TODO: Implementa el switch\n    return 0;\n}\n\nint main() {\n    printf("Restar: %d\\n", operar('-', 10, 4));\n    printf("Multiplicar: %d\\n", operar('*', 3, 3));\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint operar(char op, int a, int b) {\n    switch(op) {\n        case '+': return a + b;\n        case '-': return a - b;\n        case '*': return a * b;\n        case '/': return (b != 0) ? a / b : 0;\n        default: return 0;\n    }\n}\n\nint main() {\n    printf("Restar: %d\\n", operar('-', 10, 4));\n    printf("Multiplicar: %d\\n", operar('*', 3, 3));\n    return 0;\n}`,
        hint: 'Usa `switch(op)` y `case \'+\':`',
        testCases: [
          {
            id: 'tc-2',
            description: 'Resta y multiplicación correcta',
            input: '',
            expectedOutput: 'Restar: 6\nMultiplicar: 9'
          }
        ]
      }
    ]
  },
  {
    id: 'lab-2',
    title: 'Laboratorio 2: Crea tu propia función strlen',
    description: 'Aprenderemos a trabajar con cadenas (arrays de caracteres) y punteros re-implementando funciones estándar de la biblioteca string.h.',
    difficulty: 'Intermedio',
    estimatedMinutes: 30,
    steps: [
      {
        id: 'lab-2-step-1',
        title: 'Paso 1: Medir Longitud (Bucle while)',
        descriptionMarkdown: 'Implementa la función `mi_strlen(const char *str)`. Recuerda que las cadenas en C terminan con el carácter nulo `\\0`. Usa un bucle `while` para contar los caracteres.',
        initialCode: `#include <stdio.h>\n\nint mi_strlen(const char *str) {\n    int count = 0;\n    // TODO: Bucle hasta encontrar '\\0'\n    \n    return count;\n}\n\nint main() {\n    printf("Longitud: %d\\n", mi_strlen("Hola C"));\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint mi_strlen(const char *str) {\n    int count = 0;\n    while (str[count] != '\\0') {\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    printf("Longitud: %d\\n", mi_strlen("Hola C"));\n    return 0;\n}`,
        hint: 'Verifica si `str[count] != \'\\0\'`.',
        testCases: [
          {
            id: 'tc-1',
            description: 'Longitud de Hola C',
            input: '',
            expectedOutput: 'Longitud: 6'
          }
        ]
      },
      {
        id: 'lab-2-step-2',
        title: 'Paso 2: Medir Longitud (Aritmética de Punteros)',
        descriptionMarkdown: 'Optimicemos la función usando aritmética de punteros. En lugar de llevar un contador entero, avanza el puntero y retorna la diferencia entre el puntero final y el inicial.',
        initialCode: `#include <stdio.h>\n\nint mi_strlen_ptr(const char *str) {\n    const char *ptr = str;\n    // TODO: Avanza ptr hasta el nulo y retorna la diferencia\n    \n    return 0;\n}\n\nint main() {\n    printf("Longitud: %d\\n", mi_strlen_ptr("Punteros"));\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint mi_strlen_ptr(const char *str) {\n    const char *ptr = str;\n    while (*ptr) {\n        ptr++;\n    }\n    return ptr - str;\n}\n\nint main() {\n    printf("Longitud: %d\\n", mi_strlen_ptr("Punteros"));\n    return 0;\n}`,
        hint: '`while (*ptr) { ptr++; } return ptr - str;`',
        testCases: [
          {
            id: 'tc-2',
            description: 'Longitud usando punteros',
            input: '',
            expectedOutput: 'Longitud: 8'
          }
        ]
      }
    ]
  }
];
