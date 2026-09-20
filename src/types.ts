/**
 * Types representing Talk Korean features and states
 */

export interface LyricLine {
  korean: string;
  romanized: string;
  english: string;
  timestamp?: string;
  words?: {
    korean: string;
    english: string;
    grammar?: string;
  }[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lyrics: LyricLine[];
}

export interface SlangWord {
  word: string;
  meaning: string;
  description: string;
  examples: {
    korean: string;
    romanized: string;
    english: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
}

export type CreditPlanType = 'free' | 'pro' | 'unlimited';

export interface CreditTransaction {
  id: string;
  date: string;
  amount: number; // positive for topup, negative for usage
  description: string;
}

export interface TutorSlot {
  id: string;
  date: string; // '2026-09-21'
  dateDisplay: string; // '9월 21일 (월)'
  time: string; // '19:00 - 19:30'
  isBooked: boolean;
}

export interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  certificateLevel: '한국어교원 1급' | '한국어교원 2급' | '한국어교원 3급' | '한국어교육 전공';
  certificateVerified: boolean;
  certificateNumber?: string;
  verificationStatus?: 'verified' | 'pending' | 'reviewing' | 'rejected';
  degreeVerified?: boolean;
  degreeProofDocument?: string;
  certificateProofDocument?: string;
  verificationDate?: string;
  verifiedBy?: string;
  verificationAuditNotes?: string;
  totalTeachingHours: number; // 누적 강의 시간
  rating: number; // 평점 4.9
  reviewCount: number; // 수강 후기 수
  education: string; // 학력 및 주요 약력
  specialties: string[]; // 전문 분야
  teachingStyle: string; // 강의 특징
  bio: string; // 튜터 소개 한 줄 / 인사말
  hourlyRateCredits: number; // 50 credits per 30 min session
  availableSlots: TutorSlot[];
}

export interface TutorBooking {
  id: string;
  tutorId?: string;
  tutorName: string;
  tutorTitle: string;
  tutorAvatar?: string;
  certificateLevel?: string;
  date: string;
  time: string;
  topic: string;
  meetingUrl: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  creditsSpent: number;
  notes?: string;
}

export interface UserStats {
  name: string;
  streak: number;
  totalXp: number;
  dailyGoalProgress: number; // percentage
  dailyGoalXp: number;
  completedLessons: string[];
  credits: number;
  plan: CreditPlanType;
  creditHistory: CreditTransaction[];
  tutorBookings?: TutorBooking[];
}

export interface ChatCorrection {
  hasCorrection: boolean;
  original?: string;
  suggested: string;
  explanation: string;
}

export interface ChatVocabulary {
  word: string;
  meaning: string;
  romanized: string;
}

export interface SuggestedReply {
  ko: string;
  en: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  translation?: string;
  correction?: ChatCorrection;
  vocabulary?: ChatVocabulary[];
  suggestedReplies?: SuggestedReply[];
  culturalTip?: string;
}

export interface PronunciationScore {
  lyrics: string;
  score: number;
  accuracy: number;
  rhythm: number;
  intonation: number;
  expertFeedback: string;
  userRecordingUrl?: string;
  waveformCompareData: {
    name: string;
    artist: number;
    user: number;
  }[];
}
