import React, { createContext, useContext, useState, useEffect } from 'react';
import { Consultation, MoodLog, YogaPose } from '../types';
import { YOGA_POSES } from '../data/yogaData';
import { INITIAL_CONSULTATIONS, INITIAL_MOOD_LOGS } from '../data/mockUserData';

interface WellnessContextType {
  streakDays: number;
  wellnessScore: number;
  poses: YogaPose[];
  togglePoseCompletion: (id: string) => void;
  completedPosesCount: number;
  totalPosesCount: number;
  moodLogs: MoodLog[];
  addMoodLog: (entry: Omit<MoodLog, 'id' | 'date' | 'time'>) => void;
  consultations: Consultation[];
  bookConsultation: (consultation: Omit<Consultation, 'id' | 'status'>) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('mw_streak');
    return saved ? parseInt(saved, 10) : 12;
  });

  const [wellnessScore, setWellnessScore] = useState<number>(84);

  const [poses, setPoses] = useState<YogaPose[]>(() => {
    const saved = localStorage.getItem('mw_poses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved poses', e);
      }
    }
    return YOGA_POSES;
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const saved = localStorage.getItem('mw_moods');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved moods', e);
      }
    }
    return INITIAL_MOOD_LOGS;
  });

  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('mw_consultations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved consultations', e);
      }
    }
    return INITIAL_CONSULTATIONS;
  });

  useEffect(() => {
    localStorage.setItem('mw_poses', JSON.stringify(poses));
  }, [poses]);

  useEffect(() => {
    localStorage.setItem('mw_moods', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('mw_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const togglePoseCompletion = (id: string) => {
    setPoses(prev =>
      prev.map(pose => {
        if (pose.id === id) {
          const nextState = !pose.completed;
          if (nextState) {
            setWellnessScore(s => Math.min(100, s + 2));
          } else {
            setWellnessScore(s => Math.max(50, s - 2));
          }
          return { ...pose, completed: nextState };
        }
        return pose;
      })
    );
  };

  const addMoodLog = (entry: Omit<MoodLog, 'id' | 'date' | 'time'>) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry: MoodLog = {
      id: `m-${Date.now()}`,
      date: dateStr,
      time: timeStr,
      ...entry,
    };
    setMoodLogs(prev => [newEntry, ...prev]);
    setWellnessScore(s => Math.min(100, s + 3));
  };

  const bookConsultation = (data: Omit<Consultation, 'id' | 'status'>) => {
    const newConsultation: Consultation = {
      id: `c-${Date.now()}`,
      status: 'Confirmed',
      ...data,
    };
    setConsultations(prev => [newConsultation, ...prev]);
  };

  const completedPosesCount = poses.filter(p => p.completed).length;
  const totalPosesCount = poses.length;

  return (
    <WellnessContext.Provider
      value={{
        streakDays,
        wellnessScore,
        poses,
        togglePoseCompletion,
        completedPosesCount,
        totalPosesCount,
        moodLogs,
        addMoodLog,
        consultations,
        bookConsultation,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

