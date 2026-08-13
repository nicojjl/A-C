import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Beaker, CheckCircle2, ChevronRight, Play, Award, Terminal } from 'lucide-react';
import { LABORATORIES_DATA } from '../data/laboratoriesData';
import { ExercisePlayground } from './ExercisePlayground';
import { Laboratory, LabStep, Exercise } from '../types';

export const LaboratoriesView: React.FC = () => {
  const [activeLabId, setActiveLabId] = useState<string | null>(null);

  // Convert LabSteps to Exercises for the Playground
  const convertStepToExercise = (step: LabStep, index: number, total: number): Exercise => ({
    id: step.id,
    title: `Paso ${index + 1} de ${total}: ${step.title}`,
    description: step.descriptionMarkdown,
    cormenRef: '',
    initialCode: step.initialCode,
    solutionCode: step.solutionCode,
    hint: step.hint,
    testCases: step.testCases,
    explanation: step.descriptionMarkdown
  });

  const activeLab = LABORATORIES_DATA.find(l => l.id === activeLabId);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-[#10B981]">
          <Beaker className="w-8 h-8" />
          <h1 className="text-3xl font-bold font-serif text-[#1A1A1A]">Laboratorios de Práctica</h1>
        </div>
        <p className="text-[#4A4742] text-sm md:text-base">
          Aplica tus conocimientos resolviendo proyectos guiados. Cada laboratorio se divide en pasos progresivos.
        </p>
      </div>

      {activeLabId === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LABORATORIES_DATA.map((lab) => (
            <motion.div
              key={lab.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveLabId(lab.id)}
              className="bg-white rounded-2xl p-6 border-2 border-[#E5E2DE] hover:border-[#10B981] shadow-sm cursor-pointer transition-all flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ECFDF5] text-[#10B981] rounded-xl">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
                    lab.difficulty === 'Principiante' ? 'bg-[#ECFDF5] text-[#10B981]' : 
                    lab.difficulty === 'Intermedio' ? 'bg-[#FFF7ED] text-[#F59E0B]' : 
                    'bg-[#FEF2F2] text-[#EF4444]'
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{lab.title}</h3>
              <p className="text-sm text-[#4A4742] mb-6 flex-1 line-clamp-3">
                {lab.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-[#E5E2DE] flex items-center justify-between">
                <div className="text-xs text-[#8C8882] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> {lab.steps.length} Pasos guiados
                </div>
                <button className="text-[#10B981] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Comenzar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => setActiveLabId(null)}
            className="text-[#8C8882] hover:text-[#1A1A1A] text-sm font-bold flex items-center gap-1 transition"
          >
            ← Volver a Laboratorios
          </button>
          
          <div className="bg-white p-6 rounded-2xl border border-[#E5E2DE] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">{activeLab?.title}</h2>
              <p className="text-[#4A4742] text-sm mt-1">{activeLab?.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold bg-[#F9F8F6] px-4 py-2 rounded-xl border border-[#E5E2DE]">
              <div className="flex items-center gap-2 text-[#F59E0B]">
                <Award className="w-4 h-4" />
                <span>Nivel {activeLab?.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <ExercisePlayground 
              exercises={activeLab?.steps.map((step, idx) => convertStepToExercise(step, idx, activeLab.steps.length))} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
