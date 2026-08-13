import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Trash2, ArrowRight, CornerDownLeft, Info, Code, Play } from 'lucide-react';

interface MemoryCell {
  id: string;
  name?: string;
  type?: string;
  address: string;
  value: string;
  region: 'stack' | 'heap';
  size?: number; // for heap allocs
}

export const InteractiveMemoryVisualizer: React.FC = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [stack, setStack] = useState<MemoryCell[]>([]);
  const [heap, setHeap] = useState<MemoryCell[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Track addresses to simulate memory
  const [nextStackAddr, setNextStackAddr] = useState(0x7FFF0010);
  const [nextHeapAddr, setNextHeapAddr] = useState(0x10000000);

  const reset = () => {
    setCommands([]);
    setStack([]);
    setHeap([]);
    setNextStackAddr(0x7FFF0010);
    setNextHeapAddr(0x10000000);
    setError(null);
  };

  const processCommand = (cmdText: string) => {
    const cmd = cmdText.trim().replace(/;$/, ''); // remove trailing semicolon
    setError(null);

    // Regex matchers
    const varDeclMatch = cmd.match(/^int\s+([a-zA-Z_]\w*)\s*=\s*(-?\d+)$/);
    const ptrDeclMatch = cmd.match(/^int\s*\*\s*([a-zA-Z_]\w*)\s*=\s*&([a-zA-Z_]\w*)$/);
    const mallocMatch = cmd.match(/^int\s*\*\s*([a-zA-Z_]\w*)\s*=\s*(?:int\s*\*\s*)?malloc\(\s*(\d+)\s*\)$/);
    const directAssignMatch = cmd.match(/^([a-zA-Z_]\w*)\s*=\s*(-?\d+)$/);
    const derefAssignMatch = cmd.match(/^\*\s*([a-zA-Z_]\w*)\s*=\s*(-?\d+)$/);
    const freeMatch = cmd.match(/^free\(\s*([a-zA-Z_]\w*)\s*\)$/);

    let currentStack = [...stack];
    let currentHeap = [...heap];
    let sAddr = nextStackAddr;
    let hAddr = nextHeapAddr;
    let success = false;

    if (varDeclMatch) {
      const name = varDeclMatch[1];
      const val = varDeclMatch[2];
      if (currentStack.find(c => c.name === name)) {
        setError(`Error: La variable '${name}' ya existe.`);
        return;
      }
      currentStack.unshift({
        id: `stack-${name}`, name, type: 'int', address: `0x${sAddr.toString(16).toUpperCase()}`, value: val, region: 'stack'
      });
      sAddr -= 4; // stack grows down
      success = true;
    } 
    else if (ptrDeclMatch) {
      const pName = ptrDeclMatch[1];
      const targetName = ptrDeclMatch[2];
      const targetCell = currentStack.find(c => c.name === targetName);
      if (!targetCell) {
        setError(`Error: La variable '${targetName}' no existe.`);
        return;
      }
      if (currentStack.find(c => c.name === pName)) {
        setError(`Error: La variable '${pName}' ya existe.`);
        return;
      }
      currentStack.unshift({
        id: `stack-${pName}`, name: pName, type: 'int*', address: `0x${sAddr.toString(16).toUpperCase()}`, value: targetCell.address, region: 'stack'
      });
      sAddr -= 8; // pointer takes 8 bytes on 64bit
      success = true;
    }
    else if (mallocMatch) {
      const pName = mallocMatch[1];
      const sizeBytes = parseInt(mallocMatch[2], 10);
      if (currentStack.find(c => c.name === pName)) {
        setError(`Error: La variable '${pName}' ya existe.`);
        return;
      }
      // Allocate on heap
      const hAddrStr = `0x${hAddr.toString(16).toUpperCase()}`;
      currentHeap.push({
        id: `heap-${hAddrStr}`, address: hAddrStr, value: '?', region: 'heap', size: sizeBytes
      });
      // Add pointer on stack
      currentStack.unshift({
        id: `stack-${pName}`, name: pName, type: 'int*', address: `0x${sAddr.toString(16).toUpperCase()}`, value: hAddrStr, region: 'stack'
      });
      sAddr -= 8;
      hAddr += sizeBytes;
      success = true;
    }
    else if (directAssignMatch) {
      const name = directAssignMatch[1];
      const val = directAssignMatch[2];
      const targetIdx = currentStack.findIndex(c => c.name === name);
      if (targetIdx !== -1) {
        currentStack[targetIdx] = { ...currentStack[targetIdx], value: val };
        success = true;
      } else {
        setError(`Error: La variable '${name}' no existe en el stack.`);
        return;
      }
    }
    else if (derefAssignMatch) {
      const ptrName = derefAssignMatch[1];
      const val = derefAssignMatch[2];
      const ptrCell = currentStack.find(c => c.name === ptrName);
      if (!ptrCell || ptrCell.type !== 'int*') {
        setError(`Error: El puntero '${ptrName}' no existe o no es un puntero.`);
        return;
      }
      const targetAddress = ptrCell.value;
      
      // Look in stack
      const targetStackIdx = currentStack.findIndex(c => c.address === targetAddress);
      if (targetStackIdx !== -1) {
        currentStack[targetStackIdx] = { ...currentStack[targetStackIdx], value: val };
        success = true;
      } else {
        // Look in heap
        const targetHeapIdx = currentHeap.findIndex(c => c.address === targetAddress);
        if (targetHeapIdx !== -1) {
          if (currentHeap[targetHeapIdx].value === 'LIBERADO') {
            setError(`Error [Segfault]: Intentando escribir en memoria heap liberada (${targetAddress}).`);
            return;
          }
          currentHeap[targetHeapIdx] = { ...currentHeap[targetHeapIdx], value: val };
          success = true;
        } else {
          setError(`Error [Segfault]: Dirección inválida ${targetAddress}.`);
          return;
        }
      }
    }
    else if (freeMatch) {
      const ptrName = freeMatch[1];
      const ptrCell = currentStack.find(c => c.name === ptrName);
      if (!ptrCell || ptrCell.type !== 'int*') {
        setError(`Error: El puntero '${ptrName}' no existe o no es un puntero.`);
        return;
      }
      const targetAddress = ptrCell.value;
      const targetHeapIdx = currentHeap.findIndex(c => c.address === targetAddress);
      
      if (targetHeapIdx !== -1) {
        if (currentHeap[targetHeapIdx].value === 'LIBERADO') {
          setError(`Error [Double Free]: La memoria en ${targetAddress} ya fue liberada.`);
          return;
        }
        currentHeap[targetHeapIdx] = { ...currentHeap[targetHeapIdx], value: 'LIBERADO' };
        success = true;
      } else {
        // Cannot free stack
        if (currentStack.find(c => c.address === targetAddress)) {
          setError(`Error: No puedes hacer free() de una dirección de Stack (${targetAddress}).`);
          return;
        }
        setError(`Error: Dirección ${targetAddress} no pertenece al heap asignado.`);
        return;
      }
    }
    else {
      setError(`Sintaxis no soportada. Comandos válidos: int x = 5; | int *p = &x; | int *p = malloc(4); | *p = 10; | x = 10; | free(p);`);
      return;
    }

    if (success) {
      setStack(currentStack);
      setHeap(currentHeap);
      setNextStackAddr(sAddr);
      setNextHeapAddr(hAddr);
      setCommands([...commands, cmdText]);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        processCommand(currentInput);
      }
    }
  };

  return (
    <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl overflow-hidden flex flex-col font-mono text-sm shadow-sm">
      <div className="bg-[#1A1A1A] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#C2410C]" />
          <span className="font-bold">Laboratorio Interactivo de Memoria y Punteros</span>
        </div>
        <button 
          onClick={reset}
          className="text-xs bg-[#2A2A2A] hover:bg-[#3A3A3A] px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
        >
          <Trash2 className="w-4 h-4" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
        {/* REPL / Terminal (Left 5 cols) */}
        <div className="md:col-span-5 bg-[#11111B] border-r border-[#313244] p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            <div className="text-[#6C7086] text-xs space-y-1 mb-4 italic">
              <p>// Escribe sentencias en C para simular la memoria.</p>
              <p>// Soportado:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>int x = 10;</li>
                <li>int *p = &amp;x;</li>
                <li>int *ptr = malloc(4);</li>
                <li>*p = 20;</li>
                <li>free(ptr);</li>
              </ul>
            </div>
            
            {commands.map((cmd, idx) => (
              <div key={idx} className="text-[#A6E3A1] flex items-start gap-2">
                <span className="text-[#6C7086]">❯</span>
                <span className="font-mono">{cmd}</span>
              </div>
            ))}
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#F38BA8] bg-[#F38BA8]/10 p-2 rounded text-xs">
                {error}
              </motion.div>
            )}
          </div>
          
          <div className="relative mt-auto flex items-center gap-2 bg-[#1E1E2E] rounded-lg p-2 border border-[#313244] focus-within:border-[#C2410C]">
            <span className="text-[#C2410C] font-bold">❯</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="int x = 5;"
              className="flex-1 bg-transparent text-white outline-none font-mono text-sm"
              spellCheck={false}
            />
            <button 
              onClick={() => currentInput.trim() && processCommand(currentInput)}
              className="bg-[#C2410C] hover:bg-[#9A3412] text-white p-1.5 rounded transition"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Memory View (Right 7 cols) */}
        <div className="md:col-span-7 bg-[#FFF7ED] p-6 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-start">
          
          {/* Stack Region */}
          <div className="flex-1 w-full space-y-3">
            <h4 className="font-bold text-[#1A1A1A] flex items-center gap-2 pb-2 border-b-2 border-[#FDBA74]">
              <div className="w-3 h-3 bg-[#C2410C] rounded-full"></div>
              Memoria STACK (Pila)
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {stack.map((cell) => (
                  <motion.div
                    key={cell.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border-2 border-[#FDBA74] rounded-lg p-3 shadow-sm relative group"
                  >
                    <div className="flex justify-between items-center border-b border-[#FFF7ED] pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#C2410C] text-base">{cell.name}</span>
                        <span className="text-[10px] bg-[#FDBA74]/20 text-[#C2410C] px-1.5 py-0.5 rounded uppercase font-bold">{cell.type}</span>
                      </div>
                      <span className="text-[#8C8882] text-xs font-mono">{cell.address}</span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs text-[#8C8882]">Valor:</span>
                      <span className="font-bold text-lg text-[#1A1A1A] break-all max-w-[150px]">{cell.value}</span>
                    </div>
                    
                    {cell.type === 'int*' && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#C2410C] text-white rounded-full flex items-center justify-center shadow-md">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {stack.length === 0 && (
                <div className="text-center py-8 text-[#8C8882] text-xs italic border-2 border-dashed border-[#FDBA74]/50 rounded-lg">
                  Stack vacío. Declara variables aquí.
                </div>
              )}
            </div>
            {stack.length > 0 && <div className="text-center pt-2 text-[#8C8882] text-xs font-bold animate-pulse">↓ Crece hacia abajo ↓</div>}
          </div>

          {/* Heap Region */}
          <div className="flex-1 w-full space-y-3">
            <h4 className="font-bold text-[#1A1A1A] flex items-center gap-2 pb-2 border-b-2 border-[#38BDF8]">
              <div className="w-3 h-3 bg-[#38BDF8] rounded-full"></div>
              Memoria HEAP (Montículo)
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {heap.map((cell) => (
                  <motion.div
                    key={cell.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`border-2 rounded-lg p-3 shadow-sm relative transition-colors ${
                      cell.value === 'LIBERADO' 
                        ? 'bg-gray-100 border-gray-300' 
                        : 'bg-white border-[#38BDF8]'
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#38BDF8]/20 text-[#0284C7] px-1.5 py-0.5 rounded uppercase font-bold">
                          {cell.value === 'LIBERADO' ? 'FREE' : `ALLOC (${cell.size} bytes)`}
                        </span>
                      </div>
                      <span className={`text-xs font-mono ${cell.value === 'LIBERADO' ? 'text-gray-400 line-through' : 'text-[#8C8882]'}`}>
                        {cell.address}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-xs text-[#8C8882]">Contenido:</span>
                      <span className={`font-bold text-lg max-w-[150px] break-all ${cell.value === 'LIBERADO' ? 'text-gray-400' : 'text-[#1A1A1A]'}`}>
                        {cell.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {heap.length === 0 && (
                <div className="text-center py-8 text-[#8C8882] text-xs italic border-2 border-dashed border-[#38BDF8]/50 rounded-lg">
                  Heap vacío. Usa malloc() para asignar.
                </div>
              )}
            </div>
            {heap.length > 0 && <div className="text-center pt-2 text-[#8C8882] text-xs font-bold animate-pulse">↑ Crece hacia arriba ↑</div>}
          </div>

        </div>
      </div>
    </div>
  );
};
