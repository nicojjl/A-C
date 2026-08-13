import React, { useState, useRef, useEffect } from 'react';
import { executeCCodeInBrowser, CExecutionResult } from './ExercisePlayground';
import { Terminal, Play, Loader2, Code2, AlertTriangle, CornerDownLeft, Sparkles } from 'lucide-react';

interface StandaloneSandboxProps {
  initialCode?: string;
  title?: string;
}

export const StandaloneSandbox: React.FC<StandaloneSandboxProps> = ({ 
  initialCode = '#include <stdio.h>\n\nint main(void) {\n    printf("¡Hola desde el Sandbox C!\\n");\n    return 0;\n}',
  title = 'Sandbox Interactivo C'
}) => {
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput(null);
    setError(null);
    setExecutionTime(null);
  }, [initialCode]);

  const handleRun = () => {
    setIsExecuting(true);
    setOutput(null);
    setError(null);
    setExecutionTime(null);
    
    // Slight timeout to show executing state
    setTimeout(() => {
      try {
        const result = executeCCodeInBrowser(code);
        if (result.success) {
          setOutput(result.stdout);
          setExecutionTime(result.executionTimeMs);
        } else {
          setError(result.error || 'Error de compilación o ejecución desconocido.');
        }
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setIsExecuting(false);
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
      return;
    }
    
    // Tab handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      setCode(value.substring(0, start) + '    ' + value.substring(end));
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="bg-[#181825] border border-[#313244] rounded-2xl overflow-hidden shadow-lg mt-8 flex flex-col font-mono">
      {/* Header */}
      <div className="bg-[#11111B] px-4 py-3 flex items-center justify-between border-b border-[#313244]">
        <div className="flex items-center gap-2 text-[#A6E3A1]">
          <Code2 className="w-4 h-4" />
          <span className="font-bold text-xs uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#6C7086] hidden sm:inline-flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Ctrl + Enter para ejecutar
          </span>
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#89B4FA] hover:bg-[#B4BEFE] disabled:bg-[#45475A] text-[#11111B] rounded-lg text-[10px] uppercase font-bold transition"
          >
            {isExecuting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
            {isExecuting ? 'Ejecutando...' : 'Ejecutar Código'}
          </button>
        </div>
      </div>
      
      {/* Editor */}
      <div className="p-4 bg-[#1E1E2E]">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="w-full h-[200px] bg-transparent text-[#CDD6F4] text-xs sm:text-sm resize-y focus:outline-none leading-relaxed"
        />
      </div>
      
      {/* Output / Terminal */}
      <div className="bg-[#11111B] border-t border-[#313244] p-4 min-h-[100px]">
        <div className="flex items-center gap-2 text-[#6C7086] mb-3 text-[10px] uppercase tracking-wider font-bold">
          <Terminal className="w-3 h-3" />
          <span>Salida del Compilador</span>
          {executionTime !== null && (
            <span className="ml-auto text-[#89B4FA]">{executionTime}ms</span>
          )}
        </div>
        
        {error ? (
          <div className="text-[#F38BA8] text-xs bg-[#F38BA8]/10 p-3 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <pre className="whitespace-pre-wrap font-mono">{error}</pre>
          </div>
        ) : output !== null ? (
          <pre className="text-[#A6E3A1] text-xs whitespace-pre-wrap font-mono">{output}</pre>
        ) : (
          <div className="text-[#585B70] text-xs italic flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Listo para compilar. Presiona "Ejecutar Código".
          </div>
        )}
      </div>
    </div>
  );
};
