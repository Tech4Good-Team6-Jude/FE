# 또박또박 Frontend

> 소리로 트고, 훈련으로 굳히다.

또박또박은 읽기에 어려움을 겪는 아이가 자신의 속도로 글을 이해하고 반복해서 연습할 수 있도록 돕는 읽기 학습 서비스입니다.

---

## 페이지 구성

| 경로 | 페이지 | 역할 |
| --- | --- | --- |
| `/` | 시작 경로 | 역할 선택 화면으로 이동합니다. |
| `/role-select` | 역할 선택 | 아이와 보호자 중 사용할 역할을 선택합니다. |
| `/child` | 아이 홈 | 학습 현황을 보여주고 도서관, 게임, 리워드 화면으로 연결합니다. |
| `/child/library` | 도서관 | 책 목록을 확인하고 촬영 화면으로 이동합니다. |
| `/child/library/capture` | 촬영 UI | 예시 책 이미지를 이용해 촬영 인터랙션을 시연하고 분석 화면으로 이동합니다. |
| `/child/library/analysis` | 문장 분석 | 문장 목록과 이해 보조 내용을 확인하고 학습할 문장을 선택합니다. |
| `/child/library/practice` | 반복 학습 | 유사 문장과 학습 이력을 확인하며 읽기 연습을 진행합니다. |
| `/child/library/completion` | 학습 완료 | 학습 결과와 알 부화 진행 상태를 확인합니다. |
| `/child/game` | 게임 목록 | 이용할 수 있는 읽기 학습 게임을 확인합니다. |
| `/child/game/match` | 짝 맞추기 | 단어 카드와 소리 아이콘 카드의 짝을 맞춥니다. |
| `/child/rewards` | 리워드 | 리워드 기능을 위한 기본 화면입니다. |
| `/parent_report` | 보호자 리포트 | 주간 학습 기록과 읽기 관련 지표를 확인합니다. |

Expo Router의 라우트 그룹은 실제 URL에 포함되지 않습니다.

---

## 주요 사용자 흐름

### 읽기 학습

```text
역할 선택
→ 아이 홈
→ 도서관
→ 촬영 UI
→ 문장 분석
→ 반복 학습
→ 학습 완료
```

### 짝 맞추기 게임

```text
아이 홈
→ 게임 목록
→ 짝 맞추기
```

카드 선택과 정답 판정은 프론트엔드에서 처리합니다. 현재 실제 음성 재생은 연결되어 있지 않습니다.

### 보호자 리포트

```text
역할 선택
→ 보호자 리포트
```

현재 리포트의 학습 기록과 지표는 정적 데이터로 표시됩니다.

---

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Framework | Expo SDK 54, React Native |
| Language | TypeScript |
| Routing | Expo Router |
| Styling | NativeWind, Tailwind CSS |
| Animation | React Native Reanimated |
| Layout | React Native Safe Area Context |
| Platform | Android, iOS, Web |

---

## 시작하기

### 패키지 설치

```bash
npm ci
```

### 개발 서버 실행

```bash
npm run start
```

### 플랫폼별 실행

```bash
npm run android
npm run ios
npm run web
```

### 코드 검사

```bash
npm run lint
npx tsc --noEmit
```

---

## 프로젝트 구조

```text
src/
├── app/          Expo Router 페이지와 라우트
├── features/     기능별 화면과 상태 로직
├── components/   공통 UI 컴포넌트
├── constants/    색상과 디자인 상수
└── hooks/        공통 React Hook

assets/           이미지, 아이콘, 폰트 등 정적 리소스
```

`src/app`은 페이지 진입과 연결을 담당합니다. 실제 화면 UI와 상태 로직은 기능별 `features` 디렉터리에 작성합니다.

---

## 코드 작성 기준

### 파일과 이름

| 대상 | 규칙 |
| --- | --- |
| 일반 TS·TSX 파일 | kebab-case |
| Expo Router 파일 | `_layout.tsx`, `index.tsx` 등 예약 이름과 URL 경로 이름 사용 |
| React 컴포넌트 | PascalCase |
| TypeScript 타입 | PascalCase |
| 함수와 변수 | camelCase |
| Custom Hook | `use`로 시작 |

### 구조

- 라우트 파일은 페이지 연결 역할만 담당합니다.
- 페이지별 UI와 상태 로직은 `features`에 작성합니다.
- 여러 페이지에서 사용하는 UI는 `components`에 작성합니다.
- 컴포넌트가 커지면 역할을 기준으로 분리합니다.

### Import와 타입

- 내부 모듈은 `@/` 절대 경로를 사용합니다.
- TypeScript strict 설정을 유지합니다.
- 불필요한 `any` 사용을 피합니다.
- 타입 전용 import는 `import type`을 사용합니다.

### 스타일

- 기본 스타일은 NativeWind의 `className`을 사용합니다.
- 공통 디자인 상수를 우선 사용합니다.
- 임의 크기 값은 필요한 경우에만 사용합니다.
- 웹 화면은 프로젝트의 breakpoint를 기준으로 대응합니다.
- 플랫폼별 차이가 크면 `.web.tsx` 등의 파일로 분리합니다.
- 상호작용 요소에는 접근성 속성을 추가합니다.

---

## Git 컨벤션

### 브랜치

| 브랜치 | 용도 |
| --- | --- |
| `main` | 배포 및 릴리즈 |
| `develop` | 개발 내용 통합 |
| 작업 브랜치 | 이슈 단위 기능 개발 |

작업 브랜치 이름:

```text
{type}#{issue-number}/{task-name}
```

예시:

```text
feat#12/reader-highlight
fix#15/android-tabs
```

### 커밋 메시지와 PR 제목

```text
{type}/#{issue-number}: {작업 요약}
```

예시:

```text
feat/#12: 단어별 하이라이트 화면 구현
fix/#15: 안드로이드 탭 레이아웃 수정
```

| Type | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 오류 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 형식 수정 |
| `refactor` | 코드 구조 개선 |
| `test` | 테스트 추가 및 수정 |
| `chore` | 설정과 개발 환경 작업 |
| `design` | UI 디자인 변경 |

---
