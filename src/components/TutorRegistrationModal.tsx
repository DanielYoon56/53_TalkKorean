import React, { useState } from 'react';
import { 
  X, Award, CheckCircle2, BookOpen, Clock, Calendar, Plus, 
  Trash2, ShieldCheck, Sparkles, FileText, Upload, AlertCircle,
  Search, ShieldAlert, ArrowRight
} from 'lucide-react';
import { TutorProfile, TutorSlot } from '../types';

interface TutorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterTutor: (newTutor: TutorProfile) => void;
}

export default function TutorRegistrationModal({
  isOpen,
  onClose,
  onRegisterTutor
}: TutorRegistrationModalProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [certificateLevel, setCertificateLevel] = useState<'한국어교원 1급' | '한국어교원 2급' | '한국어교원 3급' | '한국어교육 전공'>('한국어교원 2급');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateProofName, setCertificateProofName] = useState('한국어교원자격증_사본_제출.pdf');
  const [education, setEducation] = useState('');
  const [degreeProofType, setDegreeProofType] = useState('졸업/학위수여증명서');
  const [degreeProofNumber, setDegreeProofNumber] = useState('');
  const [degreeProofFileName, setDegreeProofFileName] = useState('학위증명서_최종학력서류.pdf');
  const [totalTeachingHours, setTotalTeachingHours] = useState<number>(500);
  const [teachingStyle, setTeachingStyle] = useState('');
  const [bio, setBio] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [specialties, setSpecialties] = useState<string[]>(['표준 발음 정밀 교정', 'K-POP 뉘앙스 회화']);
  
  // Available Slots to open
  const [slots, setSlots] = useState<TutorSlot[]>([
    { id: 'custom-slot-1', date: '2026-09-22', dateDisplay: '9월 22일 (화)', time: '19:00 - 19:30', isBooked: false },
    { id: 'custom-slot-2', date: '2026-09-23', dateDisplay: '9월 23일 (수)', time: '20:00 - 20:30', isBooked: false }
  ]);

  const [newSlotDate, setNewSlotDate] = useState('2026-09-24');
  const [newSlotTime, setNewSlotTime] = useState('19:00 - 19:30');

  // Submission Completed State
  const [submittedTutor, setSubmittedTutor] = useState<TutorProfile | null>(null);

  if (!isOpen) return null;

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties([...specialties, specialtyInput.trim()]);
      setSpecialtyInput('');
    }
  };

  const handleRemoveSpecialty = (item: string) => {
    setSpecialties(specialties.filter(s => s !== item));
  };

  const handleAddSlot = () => {
    const newSlot: TutorSlot = {
      id: `custom-slot-${Date.now()}`,
      date: newSlotDate,
      dateDisplay: `${newSlotDate.split('-')[1]}월 ${newSlotDate.split('-')[2]}일`,
      time: newSlotTime,
      isBooked: false
    };
    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const certNum = certificateNumber.trim() || `KOR-EDU-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const degNum = degreeProofNumber.trim() || `DEG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTutor: TutorProfile = {
      id: `tutor-${Date.now()}`,
      name: name.trim(),
      avatar: avatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      certificateLevel,
      certificateVerified: false, // Initially false until verified
      certificateNumber: certNum,
      certificateProofDocument: `${certificateProofName} (등록번호: ${certNum})`,
      verificationStatus: 'pending', // Pending verification
      degreeVerified: false, // Initially false until verified
      degreeProofDocument: `${degreeProofType} (${degreeProofFileName}, 문서번호: ${degNum})`,
      verificationDate: new Date().toISOString().split('T')[0],
      verifiedBy: 'TalkKorean 자격검증운영팀',
      verificationAuditNotes: '학력 증명 및 자격증 공문서 진위 조사 진행 중 (발급기관 대조 대기)',
      totalTeachingHours: Number(totalTeachingHours) || 100,
      rating: 5.0,
      reviewCount: 0,
      education: education.trim() || '한국어교육 관련 학사/석사 학위 취득',
      specialties: specialties.length > 0 ? specialties : ['한국어 기초 발음', '일상 대화'],
      teachingStyle: teachingStyle.trim() || '학습자의 취향과 수준에 맞춘 친절하고 체계적인 1:1 코칭을 지향합니다.',
      bio: bio.trim() || '외국인 학습자분들과 즐겁게 소통하며 정확한 한국어를 알려드리겠습니다.',
      hourlyRateCredits: 50,
      availableSlots: slots
    };

    onRegisterTutor(newTutor);
    setSubmittedTutor(newTutor);
  };

  const handleSimulateApprove = () => {
    if (!submittedTutor) return;
    const approvedTutor: TutorProfile = {
      ...submittedTutor,
      verificationStatus: 'verified',
      degreeVerified: true,
      certificateVerified: true,
      verificationDate: new Date().toISOString().split('T')[0],
      verificationAuditNotes: '학력증명 및 국립국어원 자격증 전산 진위 확인 완료. 학생 목록에 즉시 공개 승인됨.'
    };
    onRegisterTutor(approvedTutor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white border border-editorial-border rounded-sm w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl my-8">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-editorial-border flex items-center justify-between bg-editorial-bg shrink-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold font-serif text-editorial-text">
                1:1 원어민 한국어 튜터 등록 신청
              </h2>
            </div>
            <p className="text-xs text-editorial-muted">
              제시하신 학력증명과 한국어교원 자격증을 전수 조사·확인하여 철저한 검증이 끝난 후 학생들에게 정식 공개됩니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-200/60 rounded-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If submission is completed: Show Verification Underway Notice */}
        {submittedTutor ? (
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-sm space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-serif font-bold text-base">
                <Search className="w-5 h-5 text-amber-600 animate-pulse" />
                <span>학력증명 및 자격증 진위 조사·검증 진행 중</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>튜터가 제시한 학력증명과 자격증을 조사 확인하여 검증이 끝난 후 학생들에게 공개됩니다.</strong>
                <br />
                제출하신 서류는 TalkKorean 자격검증운영팀에서 국립국어원 자격증 진위 여부 및 출신 대학교 학적 원부를 대조·조사하며, 심사 완료 시 프로필이 활성화됩니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-amber-200/80 font-mono">
                <div>
                  <span className="text-amber-900 font-bold">신청 튜터:</span> {submittedTutor.name}
                </div>
                <div>
                  <span className="text-amber-900 font-bold">자격 급수:</span> {submittedTutor.certificateLevel}
                </div>
                <div>
                  <span className="text-amber-900 font-bold">제출 학력:</span> {submittedTutor.education}
                </div>
                <div>
                  <span className="text-amber-900 font-bold">심사 접수번호:</span> TK-AUDIT-{Date.now().toString().slice(-6)}
                </div>
              </div>
            </div>

            {/* Verification Pipeline Step Indicators */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-editorial-text block">
                📋 4단계 자격 검증 프로세스
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-sm text-center">
                  <div className="font-bold text-emerald-900">1. 서류 접수 완료</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">학력/자격증 등록 완료</div>
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-sm text-center">
                  <div className="font-bold text-amber-900">2. 공문서 진위 조사</div>
                  <div className="text-[10px] text-amber-700 mt-0.5">국립국어원·대학 전산 확인</div>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-sm text-center">
                  <div className="font-bold text-neutral-600">3. 1:1 시범 강의 심사</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">발음 및 티칭 평가</div>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-sm text-center">
                  <div className="font-bold text-neutral-600">4. 최종 검증 및 공개</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">학생 예약 가능 상태 전환</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-editorial-bg border border-editorial-border rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-editorial-muted">
                ⏱️ 정상 심사 완료까지 영업일 기준 약 24~48시간이 소요됩니다.
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSimulateApprove}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm transition-colors cursor-pointer text-xs flex items-center space-x-1"
                  title="관리자 권한으로 검증 완료 즉시 승인 테스트"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>검증 승인 완료 처리 (시뮬레이션)</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-editorial-border text-editorial-text hover:bg-neutral-100 font-bold rounded-sm cursor-pointer text-xs"
                >
                  확인 닫기
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Modal Body Form */
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 text-xs">
            
            {/* Rigorous Verification Notice Banner */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-sm space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-950 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>학력증명 및 자격증 검증 후 공개 안내</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed pl-5">
                TalkKorean은 수강생 보호 및 고품질 수업을 위해 <strong>튜터가 제출한 학력증명과 한국어교원 자격증을 전수 조사 확인하여 검증이 끝난 후 학생들에게 정식 공개</strong>합니다. 허위 사실이 있을 경우 등록이 취소됩니다.
              </p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-editorial-text block mb-1">
                  튜터 성함 (한국어/영문 병기) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 정다은 (Da-eun Jung)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>

              <div>
                <label className="font-bold text-editorial-text block mb-1">
                  프로필 사진 URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>
            </div>

            {/* 1. Academic Credentials & Degree Verification Proof */}
            <div className="p-3.5 bg-editorial-bg border border-editorial-border rounded-sm space-y-3">
              <div className="flex items-center space-x-1.5 text-editorial-text font-bold text-sm">
                <BookOpen className="w-4 h-4 text-editorial-accent" />
                <span>1. 학력 증명 및 조사 확인 서류 (Degree Verification) *</span>
              </div>

              <div>
                <label className="font-bold text-editorial-text block mb-1">
                  출신 대학교 / 대학원 / 전공 및 학위 명칭 *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="예: 서울대학교 국어국문학 학사 졸업 / 연세대학교 한국어교육학 석사 취득"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-bold text-editorial-text block mb-1">
                    제출 증명서 종류
                  </label>
                  <select
                    value={degreeProofType}
                    onChange={(e) => setDegreeProofType(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-editorial-border rounded-sm focus:outline-none"
                  >
                    <option value="졸업/학위수여증명서">대학교/대학원 졸업 및 학위증명서</option>
                    <option value="재학/수료증명서">대학원 수료증명서 (논문 심사 중)</option>
                    <option value="해외 학위 아포스티유">해외 학위 아포스티유 확인서</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-editorial-text block mb-1">
                    학위증명 문서발급번호 (진위조사용)
                  </label>
                  <input
                    type="text"
                    placeholder="예: SNU-DEG-2022-09411"
                    value={degreeProofNumber}
                    onChange={(e) => setDegreeProofNumber(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-editorial-border rounded-sm focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-white border border-dashed border-editorial-border rounded-sm text-[11px]">
                <div className="flex items-center space-x-2 text-editorial-muted">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span className="font-mono text-neutral-800">{degreeProofFileName}</span>
                  <span className="text-emerald-700 font-semibold">(조사 확인 대기)</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('학력증명서 파일이 첨부되었습니다.')}
                  className="text-editorial-accent font-bold hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <Upload className="w-3 h-3" />
                  <span>서류 파일 변경</span>
                </button>
              </div>
            </div>

            {/* 2. License / Certification Verification */}
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-sm space-y-3">
              <div className="flex items-center space-x-1.5 text-emerald-950 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2. 한국어교원 자격증 진위 조사 정보 (License Verification) *</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-emerald-950 block mb-1">
                    자격증 유무/급수 *
                  </label>
                  <select
                    value={certificateLevel}
                    onChange={(e) => setCertificateLevel(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-sm font-bold text-emerald-900 focus:outline-none"
                  >
                    <option value="한국어교원 2급">한국어교원 2급 (국가공인)</option>
                    <option value="한국어교원 1급">한국어교원 1급 (국가공인)</option>
                    <option value="한국어교원 3급">한국어교원 3급 (양성과정)</option>
                    <option value="한국어교육 전공">한국어교육학 석/박사 전공</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-emerald-950 block mb-1">
                    국립국어원 자격증 발급 번호 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: KOR-EDU-2021-08123"
                    value={certificateNumber}
                    onChange={(e) => setCertificateNumber(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-sm focus:outline-none text-emerald-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-emerald-950 block mb-1">
                    누적 강의 시간 (시간) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={totalTeachingHours}
                    onChange={(e) => setTotalTeachingHours(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-white border border-emerald-300 rounded-sm focus:outline-none text-emerald-900 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-2 bg-white border border-dashed border-emerald-300 rounded-sm text-[11px]">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono text-emerald-950">{certificateProofName}</span>
                  <span className="text-emerald-700 font-semibold">(국립국어원 원부 대조 예정)</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('자격증 사본 파일이 등록되었습니다.')}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <Upload className="w-3 h-3" />
                  <span>자격증 사본 첨부</span>
                </button>
              </div>
            </div>

            {/* 3. Teaching Style & Bio */}
            <div className="space-y-3">
              <div>
                <label className="font-bold text-editorial-text block mb-1">
                  강의 특징 및 교수 스타일 (Teaching Style) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="예: 혀 위치와 구강 모형을 활용한 시각적 발음 지도, 실생활 대화 녹음 피드백 제공, 수강생 맞춤 단어장 배포"
                  value={teachingStyle}
                  onChange={(e) => setTeachingStyle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>

              <div>
                <label className="font-bold text-editorial-text block mb-1">
                  강사 소개 한 줄 (Bio)
                </label>
                <input
                  type="text"
                  placeholder="예: 외국인 맞춤 발음 교정 전문! 자연스러운 서울말을 유쾌하게 알려드립니다."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-text"
                />
              </div>
            </div>

            {/* Specialties Tag Input */}
            <div>
              <label className="font-bold text-editorial-text block mb-1">
                전문 분야 태그 (K-POP 발음, TOPIK, 비즈니스 등)
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="전문 분야 입력 후 [추가]"
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-editorial-border rounded-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="px-3 py-1.5 bg-editorial-text text-white font-bold rounded-sm cursor-pointer hover:bg-neutral-800"
                >
                  + 추가
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {specialties.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-editorial-bg border border-editorial-border rounded-full text-[11px] font-medium text-editorial-text flex items-center space-x-1">
                    <span>{item}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSpecialty(item)}
                      className="text-neutral-400 hover:text-rose-600 font-bold ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Open Schedule Slots */}
            <div className="p-3.5 bg-sky-50/50 border border-sky-200 rounded-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-sky-950 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>강의 개설 시간대 (Available Slots)</span>
                </label>
                <span className="text-[10px] text-sky-700">검증 완료 후 이 시간대에 학생 예약이 개시됩니다</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="date"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="px-2 py-1 bg-white border border-sky-300 rounded-sm text-sky-900 text-xs w-full sm:w-auto"
                />
                <select
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="px-2 py-1 bg-white border border-sky-300 rounded-sm text-sky-900 text-xs w-full sm:w-auto font-medium"
                >
                  <option value="10:00 - 10:30">10:00 - 10:30 (오전)</option>
                  <option value="14:00 - 14:30">14:00 - 14:30 (오후)</option>
                  <option value="18:30 - 19:00">18:30 - 19:00 (저녁)</option>
                  <option value="19:00 - 19:30">19:00 - 19:30 (저녁)</option>
                  <option value="20:00 - 20:30">20:00 - 20:30 (저녁)</option>
                  <option value="21:00 - 21:30">21:00 - 21:30 (야간)</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-sm font-bold text-xs flex items-center space-x-1 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Plus className="w-3 h-3" />
                  <span>시간대 추가</span>
                </button>
              </div>

              {/* Existing slots list */}
              <div className="space-y-1 pt-1">
                {slots.map((s) => (
                  <div key={s.id} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-sm border border-sky-200 text-xs">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-sky-600" />
                      <span className="font-bold text-sky-950">{s.dateDisplay}</span>
                      <span className="font-mono text-neutral-600">{s.time}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(s.id)}
                      className="text-neutral-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 border-t border-editorial-border flex items-center justify-between">
              <span className="text-[11px] text-editorial-muted">
                🛡️ 서류 진위 확인 및 심사 통과 후 정식 공개
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-editorial-border text-editorial-text rounded-sm hover:bg-neutral-50 font-bold transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-editorial-text hover:bg-editorial-accent text-white font-bold rounded-sm transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>학력증명·자격증 검증 심사 신청</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

