# 팀 세팅 화면 컴포넌트 참조 가이드

## 개요
Burger Rush 게임의 팀 세팅 화면을 다른 게임에서 재사용할 수 있도록 정리한 참조 문서입니다.

## 컴포넌트 구조

### 1. TeamSetupScreen.tsx
메인 팀 세팅 화면 컴포넌트입니다.

**주요 기능:**
- 두 팀(Blue, Red)의 플레이어 목록 표시
- 팀 셔플 기능
- 게임 시작 버튼

**Props 인터페이스:**
```typescript
interface TeamSetupScreenProps {
  teams: Teams;
  onShuffle: () => void;
  onStart: () => void;
}
```

### 2. TeamBox 컴포넌트
개별 팀을 표시하는 서브 컴포넌트입니다.

**Props:**
- `title`: 팀 이름 (예: "Blue Team")
- `teamColor`: 팀 색상 (예: "blue")
- `players`: 팀원 목록
- `team`: 팀 타입 ('blue' | 'red')

## 필요한 타입 정의

### types.ts에서 필요한 부분:
```typescript
export type Team = 'blue' | 'red';

export interface Player {
  id: string;
  name: string;
  avatarEmoji: string;
  team: Team;
}

export interface Teams {
  blue: Player[];
  red: Player[];
}
```

### constants.ts에서 필요한 부분:
```typescript
export const TEAM_MASCOTS: { [key in Team]: string } = {
  blue: '🐻', // Bear
  red: '🦊'   // Fox
};

export const MOCK_PLAYERS: Omit<Player, 'team'>[] = [
  { id: 'p1', name: 'Emily', avatarEmoji: '👩‍🦰' },
  { id: 'p2', name: 'John', avatarEmoji: '👨‍🦱' },
  // ... 더 많은 플레이어들
];
```

## 사용 방법

### 1. 기본 사용법
```tsx
import TeamSetupScreen from './components/TeamSetupScreen';
import type { Teams } from './types';

const MyGame = () => {
  const [teams, setTeams] = useState<Teams>({ blue: [], red: [] });

  const handleShuffle = () => {
    // 팀 셔플 로직
    const shuffledTeams = shuffleTeams(teams);
    setTeams(shuffledTeams);
  };

  const handleStart = () => {
    // 게임 시작 로직
    startGame();
  };

  return (
    <TeamSetupScreen
      teams={teams}
      onShuffle={handleShuffle}
      onStart={handleStart}
    />
  );
};
```

### 2. 팀 초기화 로직
```typescript
const initializeTeams = (players: Omit<Player, 'team'>[]) => {
  const blue: Player[] = [];
  const red: Player[] = [];
  
  players.forEach((player, index) => {
    if (index % 2 === 0) {
      blue.push({ ...player, team: 'blue' });
    } else {
      red.push({ ...player, team: 'red' });
    }
  });
  
  return { blue, red };
};
```

### 3. 팀 셔플 로직
```typescript
const shuffleTeams = (teams: Teams) => {
  const allPlayers = [...teams.blue, ...teams.red].sort(() => Math.random() - 0.5);
  const blue: Player[] = [];
  const red: Player[] = [];
  
  allPlayers.forEach((player, index) => {
    if (index % 2 === 0) {
      blue.push({ ...player, team: 'blue' });
    } else {
      red.push({ ...player, team: 'red' });
    }
  });
  
  return { blue, red };
};
```

## 스타일링

### Tailwind CSS 클래스 사용
- `bg-white/80`: 반투명 흰색 배경
- `rounded-3xl`: 둥근 모서리
- `shadow-xl`: 그림자 효과
- `border-t-8`: 상단 테두리
- `hover:scale-110`: 호버 시 확대 효과

### 반응형 디자인
- `grid-cols-1 md:grid-cols-2`: 모바일에서는 1열, 데스크톱에서는 2열
- `gap-8`: 그리드 간격
- `max-w-6xl`: 최대 너비 제한

## 커스터마이징 옵션

### 1. 팀 색상 변경
```tsx
// constants.ts에서 팀 색상 정의
export const TEAM_COLORS = {
  blue: '#3b82f6',
  red: '#ef4444',
  green: '#10b981', // 새로운 팀 추가
  yellow: '#f59e0b'
};
```

### 2. 플레이어 아바타 변경
```typescript
// MOCK_PLAYERS에서 아바타 이모지 변경
export const MOCK_PLAYERS: Omit<Player, 'team'>[] = [
  { id: 'p1', name: 'Player1', avatarEmoji: '🎮' },
  { id: 'p2', name: 'Player2', avatarEmoji: '🎯' },
  // ...
];
```

### 3. 버튼 스타일 변경
```tsx
// TeamSetupScreen.tsx에서 버튼 스타일 수정
<button
  onClick={onShuffle}
  className="bg-purple-500 text-white px-12 py-5 rounded-full text-4xl cursor-pointer shadow-xl border-b-8 border-purple-700 hover:bg-purple-400 hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
>
  Shuffle Teams
</button>
```

## 의존성

### 필수 의존성:
- React 18+
- TypeScript
- Tailwind CSS

### 권장 의존성:
- @types/react
- @types/react-dom

## 파일 구조
```
components/
├── TeamSetupScreen.tsx    # 메인 컴포넌트
types.ts                  # 타입 정의
constants.ts              # 상수 정의
```

## 주의사항

1. **Tailwind CSS 설정**: 프로젝트에 Tailwind CSS가 설정되어 있어야 합니다.
2. **타입 안전성**: TypeScript를 사용하여 타입 안전성을 보장합니다.
3. **반응형 디자인**: 모바일과 데스크톱에서 모두 잘 작동합니다.
4. **접근성**: 키보드 네비게이션과 스크린 리더 지원을 고려했습니다.

## 확장 가능성

1. **더 많은 팀**: 3팀 이상으로 확장 가능
2. **플레이어 수 조정**: 팀당 플레이어 수 변경 가능
3. **커스텀 아바타**: 이미지나 아이콘으로 아바타 변경 가능
4. **팀 이름 커스터마이징**: 하드코딩된 팀 이름을 props로 받도록 수정 가능


