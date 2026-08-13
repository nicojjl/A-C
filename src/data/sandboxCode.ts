export const getSandboxInitialCode = (chapterId: string): string => {
  switch (chapterId) {
    case 'cap-1':
      return '#include <stdio.h>\n\nint main(void) {\n    printf("¡Hola desde el Sandbox C!\\n");\n    // Intenta sumar un desbordamiento a un unsigned char\n    unsigned char c = 255;\n    printf("Valor original: %u\\n", c);\n    c = c + 1;\n    printf("Despues de sumar 1: %u\\n", c);\n    return 0;\n}';
    case 'cap-2':
      return '#include <stdio.h>\n\nint main(void) {\n    int a = 5;\n    int b = 9;\n    printf("a = %d, b = %d\\n", a, b);\n    printf("a AND b (a & b) = %d\\n", a & b);\n    printf("a OR b (a | b) = %d\\n", a | b);\n    printf("a XOR b (a ^ b) = %d\\n", a ^ b);\n    return 0;\n}';
    case 'cap-3':
      return '#include <stdio.h>\n\nint main(void) {\n    printf("Bucle For:\\n");\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}';
    case 'cap-4':
      return '#include <stdio.h>\n\n// Prototipo de funcion\nint cuadrado(int n);\n\nint main(void) {\n    printf("El cuadrado de 4 es: %d\\n", cuadrado(4));\n    return 0;\n}\n\nint cuadrado(int n) {\n    return n * n;\n}';
    case 'cap-5':
      return '#include <stdio.h>\n\nint main(void) {\n    int num = 42;\n    int *ptr = &num;\n    \n    printf("Valor de num: %d\\n", num);\n    printf("Direccion de num: %p\\n", ptr);\n    printf("Valor usando puntero: %d\\n", *ptr);\n    \n    return 0;\n}';
    case 'cap-6':
      return '#include <stdio.h>\n\nstruct Punto {\n    int x;\n    int y;\n};\n\nint main(void) {\n    struct Punto p1 = {10, 20};\n    struct Punto *ptr = &p1;\n    \n    printf("Punto p1: x=%d, y=%d\\n", p1.x, p1.y);\n    printf("Punto usando puntero: x=%d, y=%d\\n", ptr->x, ptr->y);\n    return 0;\n}';
    case 'cap-7':
      return '#include <stdio.h>\n\nint main(void) {\n    char buffer[100];\n    int edad = 25;\n    \n    sprintf(buffer, "Tengo %d anos", edad);\n    printf("String formateado: %s\\n", buffer);\n    \n    return 0;\n}';
    case 'cap-8':
      return '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // Alojamiento dinamico en el Heap\n    int *arr = (int *)malloc(3 * sizeof(int));\n    if (arr != NULL) {\n        arr[0] = 10; arr[1] = 20; arr[2] = 30;\n        printf("Valores en el Heap: %d, %d, %d\\n", arr[0], arr[1], arr[2]);\n        free(arr); // Liberando memoria\n    }\n    return 0;\n}';
    default:
      return '#include <stdio.h>\n\nint main(void) {\n    printf("¡Hola desde el Sandbox C!\\n");\n    return 0;\n}';
  }
};
