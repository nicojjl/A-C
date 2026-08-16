import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, RotateCcw, Check, X, Code, ChevronRight, ChevronLeft } from 'lucide-react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';

export const FlashcardsView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(FLASHCARDS_DATA.map(c => c.category)));
    return ['Todas', ...cats];
  }, []);

  const filteredCards = React.useMemo(() => {
    if (activeCategory === 'Todas') return FLASHCARDS_DATA;
    return FLASHCARDS_DATA.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCard = filteredCards[currentIndex];
  
  const knownCardsInView = React.useMemo(() => {
    return filteredCards.filter(c => knownCards.has(c.id)).length;
  }, [filteredCards, knownCards]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleKnown = () => {
    setKnownCards(prev => {
      const next = new Set(prev);
      next.add(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleReview = () => {
    setKnownCards(prev => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const resetProgress = () => {
    setKnownCards(new Set());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[#C2410C]">
            <Layers className="w-8 h-8" />
            <h1 className="text-3xl font-bold font-serif text-[#1A1A1A]">Tarjetas de Memoria (Flashcards)</h1>
          </div>
          <p className="text-[#4A4742] text-sm md:text-base max-w-2xl">
            Repaso espaciado de conceptos, sintaxis y palabras clave del lenguaje C.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col items-end">
            <span className="font-bold text-[#1A1A1A]">{knownCardsInView} / {filteredCards.length}</span>
            <span className="text-[#8C8882] text-xs">Memorizadas</span>
          </div>
          <button 
            onClick={resetProgress}
            className="p-2 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl hover:bg-[#E5E2DE] text-[#4A4742] transition-colors"
            title="Reiniciar progreso"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-[#C2410C] text-white' 
                : 'bg-white border border-[#E5E2DE] text-[#4A4742] hover:bg-[#F9F8F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#E5E2DE] h-2 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#10B981]"
          initial={{ width: 0 }}
          animate={{ width: `${(knownCardsInView / filteredCards.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Flashcard Container */}
      {!currentCard ? (
        <div className="text-center py-12 text-[#8C8882]">No hay tarjetas en esta categoría.</div>
      ) : (
      <div className="relative aspect-[4/3] md:aspect-video w-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <motion.div
              className="w-full h-full relative preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front Face */}
              <div className="absolute inset-0 backface-hidden bg-white border-2 border-[#E5E2DE] rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center">
                <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-widest text-[#C2410C] bg-[#FFF7ED] px-3 py-1 rounded-full">
                  {currentCard.category}
                </span>
                <span className="absolute top-6 right-6 text-sm font-bold text-[#8C8882]">
                  {currentIndex + 1} / {filteredCards.length}
                </span>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight max-w-2xl">
                  {currentCard.front}
                </h2>
                
                <p className="absolute bottom-8 text-[#8C8882] text-sm flex items-center gap-2 font-mono">
                  Haz clic para voltear <RotateCcw className="w-4 h-4" />
                </p>
              </div>

              {/* Back Face */}
              <div 
                className="absolute inset-0 backface-hidden bg-[#F9F8F6] border-2 border-[#C2410C] rounded-3xl p-6 md:p-10 shadow-lg flex flex-col overflow-y-auto"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <div className="prose prose-sm md:prose-base prose-stone max-w-none">
                    <MarkdownRenderer content={currentCard.backMarkdown} />
                  </div>
                  
                  {currentCard.codeSnippet && (
                    <div className="mt-6 border border-[#E5E2DE] rounded-xl overflow-hidden shadow-sm" onClick={(e) => e.stopPropagation()}>
                      <div className="bg-[#E5E2DE] px-4 py-1.5 flex items-center gap-2 text-xs font-bold text-[#4A4742]">
                        <Code className="w-3.5 h-3.5" />
                        Ejemplo
                      </div>
                      <div className="p-4 bg-white text-sm">
                        <CSyntaxHighlighter code={currentCard.codeSnippet} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto pt-4">
        <button
          onClick={handlePrev}
          className="p-3 bg-white border border-[#E5E2DE] hover:border-[#1A1A1A] rounded-xl text-[#1A1A1A] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 flex gap-2">
          <button
            onClick={handleReview}
            className="flex-1 py-3 px-4 bg-white border border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <X className="w-5 h-5" /> Repasar
          </button>
          <button
            onClick={handleKnown}
            className="flex-1 py-3 px-4 bg-[#10B981] text-white hover:bg-[#059669] rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Check className="w-5 h-5" /> Lo sé
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-white border border-[#E5E2DE] hover:border-[#1A1A1A] rounded-xl text-[#1A1A1A] transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
