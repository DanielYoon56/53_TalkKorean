import React, { useState } from 'react';
import { 
  HelpCircle, MessageSquare, Lock, Plus, Search, ChevronDown, 
  CheckCircle2, Clock, User, Calendar, Send, FileText, 
  AlertCircle, ArrowLeft, Tag, ShieldCheck, Sparkles, Eye
} from 'lucide-react';

export interface InquiryPost {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  status: '답변완료' | '처리중' | '답변대기';
  isSecret: boolean;
  isNotice?: boolean;
  content: string;
  adminReply?: {
    author: string;
    date: string;
    content: string;
  };
}

const INITIAL_INQUIRIES: InquiryPost[] = [
  {
    id: 105,
    category: '공지사항',
    title: '[공지] Talk Korean PRO 서비스 정기 점검 및 AI 모델 업데이트 안내',
    author: '운영팀',
    date: '2026.08.05',
    status: '답변완료',
    isSecret: false,
    isNotice: true,
    content: `안녕하세요, Talk Korean 팀입니다.\n\n더욱 자연스럽고 매끄러운 AI 한국어 튜터링 경험을 위해 정기 시스템 점검 및 음성 합성(TTS) 모델 업그레이드가 진행되었습니다.\n\n- 점검 내용: 발음 평가 정확도 향상, 카카오톡 스타일 AI 대화 응답 속도 개선\n- 주요 변경 사항: 카페/택시 시나리오 대화 맥락 유지 기능 대폭 강화\n\n항상 Talk Korean을 이용해 주셔서 감사합니다.`,
    adminReply: {
      author: '고객센터 관리자',
      date: '2026.08.05',
      content: '점검 관련 궁금하신 점은 언제든지 문의 게시판에 남겨주시면 신속히 답변해 드리겠습니다.'
    }
  },
  {
    id: 104,
    category: '결제/크레딧',
    title: '크레딧 충전 후 바로 반영되지 않는 경우 어떻게 하나요?',
    author: 'sarah_k**',
    date: '2026.08.07',
    status: '답변완료',
    isSecret: false,
    content: '방금 크레딧 100개를 결제했는데 상단 헤더에 바로 숫자가 늘어나지 않습니다. 새로고침을 해야 하나요?',
    adminReply: {
      author: 'Talk Korean 지원팀',
      date: '2026.08.07 10:15',
      content: '안녕하세요 sarah님! 결제 직후 네트워크 지연으로 잠시 표시가 늦어질 수 있습니다. 페이지를 새로고침하시거나, 상단 [CR +충전] 버튼을 클릭하시면 실시간으로 결제 내역과 크레딧이 동기화됩니다. 현재 정상적으로 120 CR 보유 중이신 것으로 확인됩니다!'
    }
  },
  {
    id: 103,
    category: '회화 & 발음',
    title: '음성이 잘 안 들릴 때 설정 변경 방법',
    author: 'michael_p**',
    date: '2026.08.06',
    status: '답변완료',
    isSecret: false,
    content: 'Roleplay 음성 발음 속도를 조금 천천히 들을 수 있는 옵션이 있나요?',
    adminReply: {
      author: 'Talk Korean 지원팀',
      date: '2026.08.06 14:30',
      content: '안녕하세요! 대화화면 하단 TTS 설정 메뉴 또는 메시지 오른쪽의 [Slow 🐢] 스피커 버튼을 클릭하시면 0.75배속으로 더 또렷하게 원어민 발음을 들으실 수 있습니다.'
    }
  },
  {
    id: 102,
    category: 'TOPIK / 학습',
    title: 'TOPIK II 쓰기 53번 원고지 답안 작성 양식 문의',
    author: 'kenji_to**',
    date: '2026.08.06',
    status: '답변완료',
    isSecret: true,
    content: 'TOPIK II 쓰기 연습 시 모범 답안에 나오는 문체(~ㄴ다/는다)가 채점 기준에 필수적인가요?',
    adminReply: {
      author: 'TOPIK 전문 튜터',
      date: '2026.08.06 17:00',
      content: '네, TOPIK II 53번 그래프 설명글은 주관적 소견 없이 객관적 사실을 보고하는 공식적인 글이므로 ~ㄴ다/는다 평서문 어미 사용이 필수 감점 요인입니다.'
    }
  },
  {
    id: 101,
    category: '시스템 오류',
    title: '모바일 브라우저에서 마이크 권한 허용이 안 될 때',
    author: 'minji_l**',
    date: '2026.08.04',
    status: '답변완료',
    isSecret: false,
    content: '아이폰 사파리 브라우저에서 마이크를 켜려고 하면 권한 거부 오류가 납니다.',
    adminReply: {
      author: '기술지원팀',
      date: '2026.08.04 11:20',
      content: 'iOS 설정 > Safari > 마이크 허용 항목에서 "허용"으로 변경하신 후, 브라우저 탭을 완전히 닫고 다시 접속해 보세요.'
    }
  }
];

const FAQS = [
  {
    q: 'Talk Korean PRO 서비스는 무료인가요?',
    a: '기본 학습 콘텐츠(학습, K-Culture, 발음 평가, TOPIK 연습)는 무료로 이용 가능합니다. 실시간 음성 회화 및 영가사 분석 서비스 이용 시 일단 기본 제공되는 무료 크레딧이 차감됩니다.'
  },
  {
    q: '음성 대화 시 발음 평가 기준은 무엇인가요?',
    a: '최신 음성 인식 엔진을 기반으로 한국어 억양(Intonation), 음소 정확도, 속도 및 유창성을 실시간 분석하여 100점 만점으로 세부 피드백을 제공합니다.'
  },
  {
    q: '1:1 문의에 대한 답변은 얼마나 걸리나요?',
    a: '평일 기준 평균 1~2시간 이내에 전담 지원팀이 확인 후 답변을 등록해 드립니다.'
  }
];

export default function CustomerSupport() {
  const [inquiries, setInquiries] = useState<InquiryPost[]>(INITIAL_INQUIRIES);
  const [activeTab, setActiveTab] = useState<'board' | 'faq'>('board');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<InquiryPost | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  // Form State for New Inquiry
  const [newCategory, setNewCategory] = useState<string>('회화 & 발음');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newIsSecret, setNewIsSecret] = useState<boolean>(false);

  const categories = ['전체', '공지사항', '회화 & 발음', '결제/크레딧', 'TOPIK / 학습', '시스템 오류', '기타'];

  const filteredInquiries = inquiries.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: InquiryPost = {
      id: Date.now(),
      category: newCategory,
      title: newTitle,
      author: newAuthor.trim() || '학습자_' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      status: '답변대기',
      isSecret: newIsSecret,
      content: newContent,
      adminReply: undefined
    };

    setInquiries([newPost, ...inquiries]);
    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setSelectedPost(newPost);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-accent/15 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-editorial-accent text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              Customer Support Center
            </span>
            <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded text-[10px] font-mono">
              고객문의 게시판
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            1:1 문의 & 고객 지원 (Customer Inquiry)
          </h1>
          <p className="text-editorial-accent-light text-sm sm:text-base leading-relaxed max-w-3xl">
            서비스 이용 중 궁금하신 점이나 오류 사항을 남겨주시면, 전문 원어민 튜터 및 기술지원팀이 친절하고 신속하게 답변해 드립니다.
          </p>
        </div>
      </div>

      {/* Main Tabs: 1:1 Inquiry Board vs FAQ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-editorial-border pb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setActiveTab('board');
              setSelectedPost(null);
            }}
            className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'board'
                ? 'bg-editorial-text text-white shadow-sm'
                : 'bg-white border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>1:1 문의 게시판</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('faq');
              setSelectedPost(null);
            }}
            className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'faq'
                ? 'bg-editorial-text text-white shadow-sm'
                : 'bg-white border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>자주 묻는 질문 (FAQ)</span>
          </button>
        </div>

        {activeTab === 'board' && !selectedPost && (
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2.5 bg-editorial-accent hover:bg-editorial-text text-white font-bold text-xs rounded-sm transition-all shadow-sm cursor-pointer flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>새 문의 작성하기</span>
          </button>
        )}
      </div>

      {/* BOARD VIEW */}
      {activeTab === 'board' && (
        <>
          {/* Post Detail View if selected */}
          {selectedPost ? (
            <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6 animate-fadeIn">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-editorial-muted hover:text-editorial-text cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>목록으로 돌아가기</span>
              </button>

              <div className="border-b border-editorial-border pb-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-editorial-accent-light/60 text-editorial-accent border border-editorial-border">
                    {selectedPost.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    selectedPost.status === '답변완료'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {selectedPost.status}
                  </span>
                  {selectedPost.isSecret && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                      <Lock className="w-3 h-3" />
                      <span>비밀글</span>
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-editorial-text leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center space-x-4 text-xs font-mono text-editorial-muted pt-1">
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>작성자: {selectedPost.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-editorial-accent" />
                    <span>작성일: {selectedPost.date}</span>
                  </span>
                </div>
              </div>

              {/* Inquiry Question Content */}
              <div className="bg-editorial-bg border border-editorial-border p-6 rounded-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-accent flex items-center space-x-1.5">
                  <FileText className="w-4 h-4" />
                  <span>문의 내용</span>
                </h4>
                <p className="text-sm font-sans text-editorial-text leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>

              {/* Admin Answer Section */}
              {selectedPost.adminReply ? (
                <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-sm space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>{selectedPost.adminReply.author} 답변</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700">
                      {selectedPost.adminReply.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-sans leading-relaxed whitespace-pre-line">
                    {selectedPost.adminReply.content}
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-sm text-amber-900 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>답변 검토 중입니다</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    작성해주신 문의 내용을 확인 중입니다. 1~2시간 이내에 튜터 및 고객지원팀에서 친절하게 답변해 드리겠습니다.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Board Table View */
            <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
              {/* Category Filters & Search */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-editorial-border pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-editorial-text text-white'
                          : 'bg-editorial-bg border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-3.5 h-3.5 text-editorial-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="제목 또는 내용 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-editorial-border rounded-sm text-xs outline-none focus:border-editorial-accent bg-white"
                  />
                </div>
              </div>

              {/* Inquiry Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-editorial-border bg-editorial-bg text-editorial-text font-serif font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 w-16 text-center">번호</th>
                      <th className="py-3 px-4 w-28">카테고리</th>
                      <th className="py-3 px-4">제목</th>
                      <th className="py-3 px-4 w-28 text-center">작성자</th>
                      <th className="py-3 px-4 w-28 text-center">작성일</th>
                      <th className="py-3 px-4 w-24 text-center">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-editorial-border/60">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-editorial-muted text-xs">
                          등록된 문의 내역이 없거나 검색 결과가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((post) => (
                        <tr
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className={`hover:bg-editorial-accent-light/30 transition-colors cursor-pointer ${
                            post.isNotice ? 'bg-amber-50/50 font-medium' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-center font-mono text-editorial-muted">
                            {post.isNotice ? (
                              <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                공지
                              </span>
                            ) : (
                              post.id
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-editorial-accent">
                            {post.category}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-editorial-text hover:text-editorial-accent flex items-center space-x-2">
                            {post.isSecret && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                            <span className="truncate max-w-md sm:max-w-lg">{post.title}</span>
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono text-editorial-muted">
                            {post.author}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono text-editorial-muted">
                            {post.date}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                              post.status === '답변완료'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* FAQ VIEW */}
      {activeTab === 'faq' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-editorial-border pb-3">
            <h2 className="text-xl font-serif font-bold text-editorial-text">
              자주 묻는 질문 (Frequently Asked Questions)
            </h2>
            <p className="text-xs text-editorial-muted">
              학습자분들이 자주 문의하시는 대표적인 질문과 답변입니다.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-editorial-border rounded-sm p-5 bg-editorial-bg space-y-2">
                <div className="flex items-center space-x-2 text-sm font-bold text-editorial-text">
                  <span className="w-6 h-6 rounded-full bg-editorial-accent text-white flex items-center justify-center text-xs font-mono">
                    Q
                  </span>
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-editorial-muted leading-relaxed pl-8 pt-1 border-t border-editorial-border/40">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW INQUIRY MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative text-left">
            <div className="flex justify-between items-center border-b border-editorial-border pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent">
                  1:1 Support Ticket
                </span>
                <h3 className="text-xl font-serif font-bold text-editorial-text">
                  새 문의글 작성하기
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-editorial-muted hover:text-editorial-text font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-editorial-text block">카테고리</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 border border-editorial-border rounded-sm bg-white text-editorial-text font-bold outline-none focus:border-editorial-accent"
                  >
                    <option value="회화 & 발음">회화 & 발음</option>
                    <option value="결제/크레딧">결제/크레딧</option>
                    <option value="TOPIK / 학습">TOPIK / 학습</option>
                    <option value="시스템 오류">시스템 오류</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-editorial-text block">작성자 닉네임</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="예: korean_learner"
                    className="w-full p-2.5 border border-editorial-border rounded-sm bg-white text-editorial-text outline-none focus:border-editorial-accent"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-editorial-text block">문의 제목 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="문의하실 제목을 명확하게 입력해 주세요"
                  className="w-full p-2.5 border border-editorial-border rounded-sm bg-white text-editorial-text outline-none focus:border-editorial-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-editorial-text block">문의 내용 *</label>
                <textarea
                  required
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="궁금하신 내용, 발생한 오류 현상 또는 개선 의견을 자세히 적어주세요..."
                  className="w-full p-2.5 border border-editorial-border rounded-sm bg-white text-editorial-text outline-none focus:border-editorial-accent font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="secretCheck"
                  checked={newIsSecret}
                  onChange={(e) => setNewIsSecret(e.target.checked)}
                  className="rounded border-editorial-border text-editorial-accent cursor-pointer"
                />
                <label htmlFor="secretCheck" className="font-bold text-editorial-text cursor-pointer flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>비밀글로 작성 (관리자 및 본인만 확인 가능)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-editorial-border">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 border border-editorial-border rounded-sm text-editorial-text font-bold hover:bg-editorial-bg cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-editorial-accent hover:bg-editorial-text text-white font-bold rounded-sm cursor-pointer transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>문의 등록하기</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
