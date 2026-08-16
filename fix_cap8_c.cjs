const fs = require('fs');
let code = fs.readFileSync('src/data/cCourseData.ts', 'utf8');

const cap8Idx = code.indexOf("id: 'cap-8'");
const theoryStart = code.indexOf("theoryContent: `", cap8Idx) + "theoryContent: `".length;
const theoryEnd = code.indexOf("`,\n    codeExamples:", theoryStart);

const prefix = code.substring(0, theoryStart);
const suffix = code.substring(theoryEnd);

const newTheory = `# Capítulo 8: La Interfaz del Sistema Operativo UNIX

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
*   **Brian W. Kernighan & Dennis M. Ritchie, "The C Programming Language":** Capítulo 8 (La Interfaz del Sistema UNIX), subsecciones 8.2 (Lectura y Escritura de bajo nivel) y 8.7 (Un asignador de almacenamiento - \`malloc\`).`;

fs.writeFileSync('src/data/cCourseData.ts', prefix + newTheory + suffix);
console.log("Replaced C Cap 8 successfully!");
