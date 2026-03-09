import React, { useState } from 'react';
import { Calendar, Dumbbell, Clock, Repeat, X } from 'lucide-react';
import { progressionPlan, rutinaA, rutinaB } from './data/routineData';
import ExerciseCard from './components/ExerciseCard';

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedRoutine, setSelectedRoutine] = useState<'A' | 'B'>('A');
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const currentPlan = progressionPlan[selectedMonth];
  const currentExercises = selectedRoutine === 'A' ? rutinaA : rutinaB;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Full Screen Image Viewer */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button 
            onClick={() => setFullScreenImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={fullScreenImage} 
            alt="Full screen" 
            className="max-w-full max-h-full object-contain p-4"
          />
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Mi Rutina de Entrenamiento</h1>
          
          {/* Month Selector */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wider text-center">Mes de Entrenamiento</p>
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-semibold transition-all duration-200 ${
                    selectedMonth === month
                      ? 'bg-blue-600 text-white shadow-md scale-110'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Routine Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 max-w-sm mx-auto">
            <button
              onClick={() => setSelectedRoutine('A')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
                selectedRoutine === 'A' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              RUTINA A
            </button>
            <button
              onClick={() => setSelectedRoutine('B')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${
                selectedRoutine === 'B' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              RUTINA B
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Current Plan Info */}
        <div className="bg-blue-50 rounded-2xl p-5 mb-8 border border-blue-100 shadow-sm">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-blue-900">Mes {selectedMonth}: {currentPlan.title}</h2>
          </div>
          <p className="text-sm text-blue-800 mb-4 leading-relaxed">{currentPlan.notes}</p>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-blue-50">
              <Repeat className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Series x Reps</p>
                <p className="font-bold text-gray-800">{currentPlan.series} x {currentPlan.reps}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-blue-50">
              <Dumbbell className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Peso</p>
                <p className="font-bold text-gray-800">{currentPlan.weight}</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-blue-50 col-span-2">
              <Clock className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Descanso</p>
                <p className="font-bold text-gray-800">{currentPlan.rest}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-8">
          {currentExercises.map((exercise, index) => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              index={index}
              currentPlan={currentPlan}
              onImageClick={setFullScreenImage}
            />
          ))}
        </div>
      </main>
      
      {/* Global styles for hiding scrollbar but keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
