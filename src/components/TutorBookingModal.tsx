import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Award, CheckCircle2, ShieldCheck, 
  ExternalLink, Copy, Check, Zap, Sparkles, BookOpen, AlertCircle, Video 
} from 'lucide-react';
import { TutorProfile, TutorSlot, TutorBooking } from '../types';

interface TutorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: TutorProfile | null;
  userCredits: number;
  onOpenCreditModal: () => void;
  onConfirmBooking: (booking: TutorBooking, slotId: string) => void;
}

export default function TutorBookingModal({
  isOpen,
  onClose,
  tutor,
  userCredits,
  onOpenCreditModal,
  onConfirmBooking
}: TutorBookingModalProps) {
  if (!isOpen || !tutor) return null;

  const [selectedSlot, setSelectedSlot] = useState<TutorSlot | null>(
    tutor.availableSlots.find(s => !s.isBooked) || null
  );
  const [topic, setTopic] = useState('K-Culture 실전 회화 & 발음 정밀 코칭');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<TutorBooking | null>(null);
  const [copied, setCopied] = useState(false);

  const cost = tutor.hourlyRateCredits || 50;
  const hasEnoughCredits = userCredits >= cost;

  const topicPresets = [
    'K-POP 가사 억양 & 음절 피치 교정',
    'TOPIK II 말하기 & 작문 집중 첨삭',
    'K-드라마 실생활 대화 & 존댓말 뉘앙스',
    '비즈니스 한국어 & 취업 면접 대비',
    '한국 일상 프리토킹 & 문화 질의응답'
  ];

  const handleBook = () => {
    if (!selectedSlot) return;
    if (!hasEnoughCredits) {
      onOpenCreditModal();
      return;
    }

    const meetingCode = Math.random().toString(36).substring(2, 6);
    const meetingUrl = `https://meet.google.com/kor-${meetingCode}-tut`;

    const newBooking: TutorBooking = {
      id: `booking-${Date.now()}`,
      tutorId: tutor.id,
      tutorName: tutor.name,
      tutorTitle: `${tutor.certificateLevel} / ${tutor.education.split('/')[0]}`,
      tutorAvatar: tutor.avatar,
      certificateLevel: tutor.certificateLevel,
      date: selectedSlot.dateDisplay,
      time: selectedSlot.time,
      topic: topic.trim() || '1:1 맞춤 한국어 클리닉',
      meetingUrl,
      status: 'upcoming',
      creditsSpent: cost,
      notes: notes.trim() || tutor.teachingStyle
    };

    onConfirmBooking(newBooking, selectedSlot.id);
    setCreatedBooking(newBooking);
    setIsSuccess(true);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white border border-editorial-border rounded-sm w-full max-w-2xl max-h-[92vh] flex flex-col shadow-xl my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-editorial-border flex items-center justify-between bg-editorial-bg shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-editorial-accent">
              1:1 Native Tutor Booking
            </span>
            <h2 className="text-lg font-bold font-serif text-editorial-text">
              1:1 원어민 튜터 상세 확인 및 화상 수업 예약
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-200/60 rounded-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* SUCCESS SCREEN */}
          {isSuccess && createdBooking ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  🎉 1:1 원어민 화상 수업 예약이 확정되었습니다!
                </h3>
                <p className="text-xs text-neutral-600">
                  예약된 시간에 맞춰 아래의 Google Meet 미팅룸 링크로 입장해 주세요.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-editorial-bg border border-editorial-border rounded-sm p-4 text-left space-y-3">
                <div className="flex items-center space-x-3 pb-3 border-b border-editorial-border/60">
                  <img 
                    src={tutor.avatar} 
                    alt={tutor.name}
                    className="w-12 h-12 rounded-full object-cover border border-editorial-border"
                  />
                  <div>
                    <div className="font-bold text-sm text-editorial-text">{tutor.name}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">{tutor.certificateLevel}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-editorial-muted block">수업 일시:</span>
                    <span className="font-bold text-editorial-text">{createdBooking.date} {createdBooking.time}</span>
                  </div>
                  <div>
                    <span className="text-editorial-muted block">결제 크레딧:</span>
                    <span className="font-mono font-bold text-editorial-accent">-{createdBooking.creditsSpent} CR (완료)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-editorial-border/60 space-y-1">
                  <span className="text-editorial-muted block">수업 주제:</span>
                  <p className="font-medium text-editorial-text">{createdBooking.topic}</p>
                </div>

                {/* Google Meet Link */}
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-sm space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-950 flex items-center space-x-1">
                      <Video className="w-3.5 h-3.5 text-sky-600" />
                      <span>Google Meet 화상 강의실 링크</span>
                    </span>
                    <span className="text-[10px] text-sky-700">10분 전부터 입장 가능</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <input
                      type="text"
                      readOnly
                      value={createdBooking.meetingUrl}
                      className="w-full px-2.5 py-1.5 bg-white border border-sky-300 rounded-sm font-mono text-xs text-sky-950 select-all"
                    />
                    <button
                      onClick={() => handleCopyLink(createdBooking.meetingUrl)}
                      className="px-3 py-1.5 bg-white border border-sky-300 hover:bg-sky-100 text-sky-800 rounded-sm font-bold flex items-center space-x-1 shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>복사</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={createdBooking.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-sm flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                  >
                    <span>화상 강의실 바로 입장하기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-editorial-text text-white font-bold rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  확인 및 마이페이지로 돌아가기
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TUTOR DETAILED PROFILE CARD */}
              <div className="bg-white border border-editorial-border rounded-sm p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-editorial-border shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-serif font-bold text-lg text-editorial-text">
                          {tutor.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300 flex items-center space-x-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{tutor.certificateLevel}</span>
                        </span>
                      </div>

                      <p className="text-editorial-muted text-xs leading-relaxed">
                        {tutor.education}
                      </p>

                      <div className="flex items-center space-x-3 pt-1 text-xs">
                        <span className="font-bold text-amber-600 flex items-center space-x-1">
                          <span>⭐</span>
                          <span>{tutor.rating}</span>
                          <span className="text-neutral-400 font-normal">({tutor.reviewCount}개 후기)</span>
                        </span>
                        <span className="text-neutral-300">|</span>
                        <span className="font-bold text-editorial-text flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                          <span>누적 강의: {tutor.totalTeachingHours.toLocaleString()}시간</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 bg-editorial-bg px-3 py-2 rounded-sm border border-editorial-border/60">
                    <span className="text-[10px] uppercase font-bold text-editorial-muted block">수업료 (30분)</span>
                    <span className="text-base font-black font-mono text-editorial-accent">{cost} CR</span>
                  </div>
                </div>

                {/* 학력 및 자격증 조사 검증 완료 배너 */}
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm flex items-start space-x-2.5 text-xs text-emerald-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-left">
                    <div className="font-bold flex items-center space-x-1.5">
                      <span>학력증명 및 한국어교원 자격증 전수 조사·검증 완료</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-xs font-mono font-bold">100% Verified</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-normal">
                      튜터가 제시한 대학교·대학원 학력증명과 국립국어원 자격증을 전수 조사 확인하여 검증이 완료된 신뢰할 수 있는 강사입니다.
                    </p>
                    {tutor.certificateNumber && (
                      <div className="text-[10px] text-emerald-700 font-mono mt-1 pt-1 border-t border-emerald-200 flex flex-wrap gap-x-3">
                        <span>• 자격 등록: {tutor.certificateNumber}</span>
                        {tutor.degreeProofDocument && <span>• 학력 증빙: {tutor.degreeProofDocument}</span>}
                        {tutor.verificationDate && <span>• 검증 일자: {tutor.verificationDate}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Teaching Style & Bio */}
                <div className="space-y-2 pt-2 border-t border-editorial-border/60 text-xs">
                  <div>
                    <span className="font-bold text-editorial-text">강의 특징 (Teaching Style):</span>
                    <p className="text-editorial-muted leading-relaxed mt-0.5">{tutor.teachingStyle}</p>
                  </div>
                  <div>
                    <span className="font-bold text-editorial-text">전문 분야:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {tutor.specialties.map((spec, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-xs text-[11px] font-medium">
                          #{spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 1: SELECT DATE & TIME SLOT */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-editorial-text flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-editorial-accent" />
                    <span>강의 개설 시간 (날짜 및 시간대 선택) *</span>
                  </label>
                  <span className="text-[11px] text-editorial-muted">
                    한국 표준시(KST) 기준
                  </span>
                </div>

                {tutor.availableSlots && tutor.availableSlots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tutor.availableSlots.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={slot.isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-sm border text-left transition-all cursor-pointer flex items-center justify-between ${
                            slot.isBooked
                              ? 'bg-neutral-100 border-neutral-200 opacity-50 cursor-not-allowed'
                              : isSelected
                              ? 'bg-editorial-accent-light/30 border-editorial-accent text-editorial-text ring-1 ring-editorial-accent font-bold'
                              : 'bg-white border-editorial-border hover:border-editorial-text/50'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1.5">
                              <Calendar className="w-3.5 h-3.5 text-editorial-accent" />
                              <span className="font-bold">{slot.dateDisplay}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-[11px] text-neutral-600 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>{slot.time}</span>
                            </div>
                          </div>
                          <div>
                            {slot.isBooked ? (
                              <span className="text-[10px] font-bold text-neutral-500 bg-neutral-200 px-1.5 py-0.5 rounded-xs">
                                마감됨
                              </span>
                            ) : isSelected ? (
                              <span className="text-[11px] font-bold text-editorial-accent flex items-center space-x-0.5">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>선택됨</span>
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-neutral-500 hover:text-editorial-accent">
                                선택
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-neutral-50 border border-neutral-200 text-center text-editorial-muted">
                    현재 개설된 예약 가능한 강의 슬롯이 없습니다. 다른 튜터를 선택해 주세요.
                  </div>
                )}
              </div>

              {/* STEP 2: CHOOSE TOPIC & NOTES */}
              <div className="space-y-2.5">
                <label className="font-bold text-editorial-text flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>학습 희망 주제 및 사전 요청사항</span>
                </label>

                {/* Preset Topic Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {topicPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(preset)}
                      className={`px-2.5 py-1 rounded-sm text-[11px] font-medium border transition-colors cursor-pointer ${
                        topic === preset
                          ? 'bg-editorial-text text-white border-editorial-text font-bold'
                          : 'bg-white border-editorial-border hover:bg-neutral-50 text-editorial-text'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="직접 학습 희망 주제를 입력하세요"
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />

                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="튜터에게 미리 전달하고 싶은 질문이나 학습 고민이 있다면 적어주세요 (선택)"
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>

              {/* STEP 3: PAYMENT SUMMARY & CREDIT CHECK */}
              <div className="p-4 bg-editorial-bg border border-editorial-border rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-editorial-muted">내 보유 크레딧:</span>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-mono font-bold text-editorial-text">{userCredits} CR</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-editorial-muted">차감 예정 수강료 (30분):</span>
                  <span className="font-mono font-bold text-editorial-accent">-{cost} CR</span>
                </div>

                <div className="pt-2 border-t border-editorial-border/60 flex items-center justify-between font-bold text-xs">
                  <span>예약 후 잔여 크레딧:</span>
                  <span className={`font-mono ${hasEnoughCredits ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {hasEnoughCredits ? `${userCredits - cost} CR` : `잔액 부족 (${userCredits - cost} CR)`}
                  </span>
                </div>

                {!hasEnoughCredits && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-sm text-rose-800 text-[11px] flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>크레딧이 부족합니다. 충전 후 예약할 수 있습니다.</span>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenCreditModal}
                      className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xs cursor-pointer ml-2"
                    >
                      충전하기
                    </button>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 border-t border-editorial-border flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-editorial-border text-editorial-text rounded-sm hover:bg-neutral-50 font-bold transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot || selectedSlot.isBooked || !hasEnoughCredits}
                  onClick={handleBook}
                  className="px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent disabled:bg-neutral-300 text-white font-bold rounded-sm transition-colors flex items-center space-x-2 cursor-pointer shadow-xs disabled:cursor-not-allowed"
                >
                  <Video className="w-4 h-4" />
                  <span>
                    {selectedSlot 
                      ? `${selectedSlot.dateDisplay} ${selectedSlot.time} 예약 확정 (-${cost} CR)` 
                      : '날짜 및 시간을 먼저 선택해 주세요'}
                  </span>
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
