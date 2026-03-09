import React, { useState, useEffect } from 'react';
import { Activity, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { Exercise, MonthPlan } from '../data/routineData';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  currentPlan: MonthPlan;
  onImageClick: (img: string) => void;
}

export default function ExerciseCard({ exercise, index, currentPlan, onImageClick }: ExerciseCardProps) {
  // Repetition tracking state
  const [repsDone, setRepsDone] = useState<boolean[]>([false, false, false, false]);

  const toggleRep = (repIndex: number) => {
    const newReps = [...repsDone];
    newReps[repIndex] = !newReps[repIndex];
    setRepsDone(newReps);
  };

  // Stopwatch state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset state when exercise or plan changes
  useEffect(() => {
    setRepsDone([false, false, false, false]);
    resetTimer();
  }, [exercise.id, currentPlan.month]);

  const seriesCount = typeof currentPlan.series === 'number' ? currentPlan.series : parseInt(currentPlan.series as string, 10);

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200">
      {/* Images */}
      <div className="relative bg-gray-100">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {exercise.images.map((img, imgIndex) => (
            <div 
              key={imgIndex} 
              className="min-w-full snap-center relative aspect-[4/3] sm:aspect-video flex items-center justify-center p-4 cursor-pointer" 
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`${exercise.title} - Imagen ${imgIndex + 1}`}
                className="w-full h-full object-contain drop-shadow-md rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x600/f8fafc/94a3b8?text=Falta+Imagen:+${img.split('/').pop()}`;
                }}
              />
              {exercise.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
                  {imgIndex + 1} / {exercise.images.length}
                </div>
              )}
            </div>
          ))}
        </div>
        {exercise.images.length > 1 && (
          <>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm pointer-events-none">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm pointer-events-none">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </>
        )}
      </div>

      {/* Exercise Details */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            <span className="text-blue-600 mr-2">{index + 1}.</span>
            {exercise.title}
          </h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-5 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-200">
          <Activity className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-medium">{exercise.muscles}</span>
        </div>

        {/* Quick Stats for this exercise based on current month */}
        <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-200 mb-5">
          <div className="text-center flex-1 border-r border-gray-200">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Series</p>
            <p className="font-black text-xl text-gray-900">{currentPlan.series}</p>
          </div>
          <div className="text-center flex-1 border-r border-gray-200">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Reps</p>
            <p className="font-black text-xl text-gray-900">{currentPlan.reps}</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Peso</p>
            <p className="font-black text-sm text-gray-900 px-2">{currentPlan.weight}</p>
          </div>
        </div>

        {/* Repetition tracking and Stopwatch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          {/* Repetition Buttons */}
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((i) => {
              const isActive = i < seriesCount;
              const isDone = repsDone[i];
              
              let bgColor = '#8c8c8c'; // inactive
              if (isActive) {
                bgColor = isDone ? '#2c8204' : '#450303';
              }

              return (
                <button
                  key={i}
                  onClick={() => isActive && toggleRep(i)}
                  disabled={!isActive}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-transform active:scale-95 shadow-sm"
                  style={{ backgroundColor: bgColor, opacity: isActive ? 1 : 0.5, cursor: isActive ? 'pointer' : 'not-allowed' }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Stopwatch */}
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
            <div className="font-mono text-2xl font-bold text-gray-800 w-16 text-center">
              {formatTime(time)}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={toggleTimer}
                className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                title={isRunning ? "Pausar" : "Iniciar"}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button 
                onClick={resetTimer}
                className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
