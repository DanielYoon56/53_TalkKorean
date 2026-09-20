# Talking Korean (토킹 코리안) 🇰🇷

**Talking Korean**은 한국어 학습자를 위한 실전 몰입형 한국어 회화 및 K-POP 학습 플랫폼입니다. 원어민 수준의 자연스러운 AI 역할극, K-POP 가사 분석 학습, 음성 인식을 통한 발음 분석 및 체계적인 학습 대시보드를 제공합니다.

---

## 🌟 주요 기능 (Key Features)

### 1. 🎭 실전 상황별 AI 역할극 (AI Scenario Roleplay)
맥락에 맞는 자연스러운 원어민 표현과 상황별 대화를 학습할 수 있습니다.
- **☕ 홍대 카페 (Barista)**: 메뉴 주문, 당도/옵션 조절, 화장실 위치 문의, 매장 이용 대화
- **🚕 서울 택시 (Taxi Driver)**: 예상 소요 시간, 교통 상황, 에어컨/온도 조절, 하차 및 결제
- **🏪 GS25 편의점 (Convenience Store Cashier)**: 종량제/비닐 봉투 구매, 1+1 행사, 교통카드 충전, 전자레인지 위치
- **🥩 강남 삼겹살집 (BBQ Waiter)**: 고기 주문, 불판 교체, 반찬/쌈채소 리필, 된장찌개 및 음료 주문
- **🎤 코인노래방 (Karaoke Owner)**: 룸 및 시간제 결제, 마이크 커버 요청, 서비스 시간, 신곡 예약
- **🤝 언어교환 모임 (Language Exchange)**: 자기소개, K-POP 및 드라마 취미 공유, 맛집 추천 대화
- **💬 원어민 튜터 지우 (Free Talk Tutor)**: 자유로운 일상 대화, 한국 문화 및 맞춤형 피드백

### 2. 🎵 K-POP 가사 기반 언어 학습 (K-POP Lyrics Study)
- 인기 K-POP 곡의 한국어 가사, 발음(Romanization), 번역 제공
- 구절별 문법/단어 해설 및 재생 구간 동기화

### 3. 🎴 스마트 단어장 및 퀴즈 (Flashcards & Quiz)
- 난이도별/주제별 핵심 단어장 학습
- 스페이싱 카드를 통한 인터랙티브 복습 및 객관식 퀴즈

### 4. 🎙️ 발음 visualizer 및 피드백 (Pronunciation Visualizer)
- 마이크 음성 인식을 활용한 발음 정확도 측정 및 실시간 교정 팁 제공

### 5. 📊 학습 대시보드 (Smart Progress Dashboard)
- 출석 스트릭, 연속 학습 일수, 학습 시간, 역할극 완료 횟수 Visual Charts 제공

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Recharts, Lucide React
- **Backend**: Node.js, Express, ESBuild, TSX
- **AI Integration**: `@google/genai` (Google Gemini API - Server-side proxy)
- **Build & Server**: Vite 6, Express SSR/Vite Middleware

---

## 🚀 시작하기 (Getting Started)

### 1. 환경 변수 설정
`.env` 파일에 Gemini API 키를 설정합니다.

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. 의존성 패키지 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```
개발 서버가 포트 `3000` (`http://localhost:3000`)에서 시작됩니다.

### 4. 프로덕션 빌드 및 실행
```bash
# 앱 및 서버 번들 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 📄 라이선스
Private Project - All rights reserved.
