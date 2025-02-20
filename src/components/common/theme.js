import { createTheme } from '@mui/material/styles'

/**
 * 테마 커스터마이징 가이드
 *
 * 1. 테마 적용 방법
 *    - ThemeProvider로 앱 전체를 감싸서 사용
 *    - <ThemeProvider theme={theme}><App /></ThemeProvider>
 *
 * 2. 컴포넌트에서 테마 사용하기
 *    A. styled-components 사용 시:
 *       const StyledBox = styled(Box)(({ theme }) => ({
 *         background: theme.palette.primary.main,
 *         padding: theme.spacing(2)
 *       }));
 *
 *    B. useTheme 훅 사용 시:
 *       const theme = useTheme();
 *       <Box sx={{ color: theme.palette.primary.main }}>
 *
 * 3. 주요 테마 속성
 *    A. 색상 (theme.palette)
 *       - primary: 주요 색상 (main, light, dark)
 *       - secondary: 보조 색상
 *       - text: 텍스트 색상
 *       - background: 배경 색상
 *
 *    B. 타이포그래피 (theme.typography)
 *       - h1~h6: 제목 스타일
 *       - body1, body2: 본문 스타일
 *       - button: 버튼 텍스트 스타일
 *
 *    C. 간격 (theme.spacing)
 *       - theme.spacing(1) = 8px
 *       - theme.spacing(2) = 16px
 *       예시: margin: theme.spacing(2) // 16px 마진
 *
 *    D. 반응형 (theme.breakpoints)
 *       - up('md'): 960px 이상
 *       - down('sm'): 600px 이하
 *       예시: [theme.breakpoints.up('md')]: { display: 'none' }
 *
 * 4. 실제 사용 예시
 *    const Container = styled(Box)(({ theme }) => ({
 *      backgroundColor: theme.palette.background.default,
 *      padding: theme.spacing(2),
 *      [theme.breakpoints.down('sm')]: {
 *        padding: theme.spacing(1)
 *      }
 *    }));
 *
 * 5. 유용한 팁
 *    - 색상은 palette에서 중앙 관리하여 일관성 유지
 *    - 반응형은 breakpoints 활용하여 구현
 *    - typography로 폰트 스타일 통일
 */

/**
 * 실제 사용 상황별 가이드
 *
 * 1. 색상 팔레트 (palette)
 *    - primary: 브랜드의 주요 색상으로, 로고, 주요 버튼, 강조 텍스트에 사용
 *      예) 회원가입 버튼, 로그인 버튼 등 주요 CTA(Call-to-Action) 요소
 *    - secondary: 보조 색상으로, 부가적인 UI 요소나 덜 중요한 버튼에 사용
 *      예) '취소' 버튼, 부가 기능 버튼 등
 *    - text: 텍스트의 가독성과 계층 구조를 표현할 때 사용
 *      primary: 본문 텍스트
 *      secondary: 부가 설명 텍스트
 *      disabled: 비활성화된 텍스트
 *    - background: 페이지와 컴포넌트의 배경색 구분에 사용
 *      default: 페이지 전체 배경
 *      paper: 카드, 모달 등 컴포넌트 배경
 *      grey: 구분선이나 강조가 필요한 섹션의 배경
 *
 * 2. 타이포그래피 (typography)
 *    - h1: 페이지 메인 제목이나 가장 중요한 헤더에 사용
 *      예) 랜딩 페이지 메인 타이틀
 *    - h2: 섹션 제목이나 중요도가 높은 서브 헤더에 사용
 *      예) 템플릿 갤러리 섹션 제목
 *    - h3: 컴포넌트나 작은 섹션의 제목에 사용
 *      예) 카드 컴포넌트의 제목
 *    - body1: 주요 본문 텍스트에 사용
 *      예) 상품 설명, 공지사항 본문
 *    - body2: 부가적인 설명이나 작은 텍스트에 사용
 *      예) 카드 설명, 부가 정보
 *    - button: 버튼 텍스트 스타일링에 사용
 *      예) '더 보기', '저장하기' 등의 버튼 텍스트
 *
 * 3. 컴포넌트 스타일 (components)
 *    - MuiAppBar: 상단 네비게이션 바의 일관된 스타일링
 *      예) 메인 네비게이션, 서브 네비게이션
 *    - MuiButton: 버튼의 일관된 디자인 시스템 적용
 *      예) 모든 버튼의 모서리 둥글기, 호버 효과
 *    - MuiCard: 카드 컴포넌트의 일관된 스타일링
 *      예) 템플릿 카드, 상품 카드
 *    - MuiTextField: 입력 필드의 일관된 스타일링
 *      예) 로그인 폼, 검색창
 *
 * 4. 반응형 디자인 (breakpoints)
 *    - xs: 모바일 디바이스 (0-600px)
 *      예) 모바일에서는 단일 컬럼 레이아웃
 *    - sm: 태블릿 세로 모드 (600-960px)
 *      예) 2컬럼 그리드 레이아웃
 *    - md: 태블릿 가로 모드 (960-1280px)
 *      예) 3컬럼 그리드 레이아웃
 *    - lg/xl: 데스크탑 (1280px 이상)
 *      예) 4컬럼 이상의 그리드 레이아웃
 *
 * 5. 그림자 효과 (shadows)
 *    - elevation 1-3: 카드, 버튼 등 기본적인 요소의 그림자
 *      예) 템플릿 카드의 기본 그림자
 *    - elevation 4-6: 모달, 드롭다운 등 떠 있는 요소의 그림자
 *      예) 네비게이션 드롭다운 메뉴
 *    - elevation 8-24: 중요한 모달이나 특별히 강조해야 하는 요소
 *      예) 알림 모달, 결제 창
 *
 * 6. z-index 관리
 *    - appBar: 항상 최상단에 고정되어야 하는 네비게이션 바
 *    - drawer: 사이드 메뉴나 드로어
 *    - modal: 모달 창이나 다이얼로그
 *    - snackbar: 알림이나 토스트 메시지
 *    - tooltip: 도움말이나 추가 정보 툴팁
 */

const theme = createTheme({
   // 색상 팔레트
   palette: {
      primary: {
         main: '#000000', // 메인 색상 : 검정
         light: '#333333', // 라이트 색상 : 진한 회색
         dark: '#000000', // 다크 색상 : 검정
         contrastText: '#ffffff', // 대비 색상 : 흰색
      },
      // 버튼 색상
      secondary: {
         main: '#666666', // 버튼 색상 : 진한 회색
         light: '#999999', // 라이트 색상 : 회색
         dark: '#333333', // 다크 색상 : 진한 회색
         contrastText: '#ffffff', // 대비 색상 : 흰색
      },
      // 텍스트 색상
      text: {
         primary: '#000000', // 텍스트 색상 : 검정
         secondary: '#666666', // 텍스트 색상 : 진한 회색
         disabled: '#999999', // 텍스트 색상 : 회색
      },
      // 배경 색상
      background: {
         default: '#ffffff', // 배경 색상 : 흰색
         paper: '#ffffff', // 배경 색상 : 흰색
         grey: '#f5f5f5', // 배경 색상 : 회색
      },
      // 구분선 색상
      divider: '#dddddd', // 구분선 색상 : 회색
      // 액션 색상
      action: {
         active: 'rgba(0, 0, 0, 0.54)', // 액션 색상 : 진한 회색
         hover: 'rgba(0, 0, 0, 0.04)', // 호버 색상 : 진한 회색
         selected: 'rgba(0, 0, 0, 0.08)', // 선택 색상 : 진한 회색
         disabled: 'rgba(0, 0, 0, 0.26)', // 비활성화 색상 : 진한 회색
         disabledBackground: 'rgba(0, 0, 0, 0.12)', // 비활성화 배경 색상 : 진한 회색
      },
      // 간격 설정
      spacing: {
         xs: '4px', // 간격 설정 : 4px
         sm: '8px', // 간격 설정 : 8px
         md: '16px', // 간격 설정 : 16px
         lg: '24px', // 간격 설정 : 24px
         xl: '32px', // 간격 설정 : 32px
      },
      // 라운드 모서리 설정
      borderRadius: {
         small: '4px', // 라운드 모서리 설정 : 4px
         medium: '8px', // 라운드 모서리 설정 : 8px
         large: '12px', // 라운드 모서리 설정 : 12px
      },
   },

   // 타이포그래피
   typography: {
      fontFamily: ['Malgun Gothic', '맑은 고딕', 'Playfair Display', 'Times New Roman', 'sans-serif'].join(','),
      // 어떤 상황에서? : 제목 추가할 때 사용 (큰 글씨 md형식으로 보면 #)
      h1: {
         fontFamily: 'Playfair Display, Malgun Gothic, 맑은 고딕, serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째, 세번 째 사용
         fontSize: '2.5rem', // 폰트 크기
         fontWeight: 600, // 폰트 두께
         lineHeight: 1.2, // 폰트 높이
      },
      // 어떤 상황에서? : 제목 추가할 때 사용 (중간 글씨 md형식으로 보면 ##)
      h2: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째 사용
         fontSize: '2rem', // 폰트 크기
         fontWeight: 600, // 폰트 두께
         lineHeight: 1.3, // 폰트 높이
      },
      // 어떤 상황에서? : 제목 추가할 때 사용 (작은 글씨 md형식으로 보면 ###)
      h3: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째 사용
         fontSize: '1.75rem', // 폰트 크기
         fontWeight: 600, // 폰트 두께
         lineHeight: 1.4, // 폰트 높이
      },
      // 어떤 상황에서? : 본문 추가할 때 사용 (큰 글씨 md형식으로 보면 1)
      body1: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, Times New Roman, sans-serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째, 세번 째 사용
         fontSize: '1rem', // 폰트 크기
         lineHeight: 1.5, // 폰트 높이
         letterSpacing: '0.00938em', // 폰트 간격
      },
      // 어떤 상황에서? : 본문 추가할 때 사용 (중간 글씨 md형식으로 보면 2)
      body2: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째 사용
         fontSize: '0.875rem', // 폰트 크기
         lineHeight: 1.43, // 폰트 높이
         letterSpacing: '0.01071em', // 폰트 간격
      },
      // 어떤 상황에서? : 버튼 추가할 때 사용 (큰 글씨 md형식으로 보면 1)
      button: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 폰트 설정 : 첫 번째 폰트가 없으면 두번 째 사용
         fontSize: '0.875rem', // 폰트 크기
         fontWeight: 500, // 폰트 두께
         letterSpacing: '0.02857em', // 폰트 간격
         textTransform: 'none', // 폰트 변형
      },
   },

   // 반응형 브레이크포인트 : 모바일, 태블릿, 데스크탑 등 디바이스 크기에 따라 스타일 변경
   breakpoints: {
      values: {
         xs: 0, // 모바일 화면 크기
         sm: 600, // 태블릿 화면 크기
         md: 960, // 데스크탑 화면 크기
         lg: 1280, // 데스크탑 화면 크기
         xl: 1920, // 데스크탑 화면 크기
      },
   },

   transitions: {
      // 애니메이션 값
      quick: 'all 0.2s ease', // 빠른 애니메이션
      normal: 'all 0.3s ease', // 일반 애니메이션
      slow: 'all 0.5s ease', // 느린 애니메이션
   },

   // 컴포넌트 스타일
   components: {
      // 앱바 스타일
      MuiAppBar: {
         styleOverrides: {
            root: {
               backgroundColor: '#ffffff', // 앱바 배경색
               boxShadow: 'none', // 앱바 그림자
            },
         },
      },
      // 버튼 스타일
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: 'none', // 버튼 텍스트 변형
               fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 버튼 폰트 설정
               borderRadius: 4, // 버튼 모서리 둥글기
               padding: '6px 16px', // 버튼 패딩
               '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // 버튼 호버 배경색
               },
            },
            // 버튼 컨테이너 스타일
            contained: {
               boxShadow: 'none', // 버튼 그림자
               '&:hover': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // 버튼 호버 그림자
               },
            },
         },
      },
      // 타이포그래피 스타일
      MuiTypography: {
         styleOverrides: {
            root: {
               fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif', // 타이포그래피 폰트 설정
            },
         },
      },
      // 카드 스타일
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: 8, // 카드 모서리 둥글기
               boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // 카드 그림자
            },
         },
      },
      // 텍스트 필드 스타일
      MuiTextField: {
         styleOverrides: {
            root: {
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderColor: '#dddddd', // 텍스트 필드 테두리 색상
                  },
                  '&:hover fieldset': {
                     borderColor: '#999999', // 텍스트 필드 호버 테두리 색상
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: '#000000', // 텍스트 필드 포커스 테두리 색상
                  },
               },
            },
         },
      },
   },

   // 그림자 설정 : 버튼, 카드, 텍스트 필드 등 요소에 그림자 추가
   shadows: [
      'none',
      '0 2px 4px rgba(0,0,0,0.1)', // elevation 1
      '0 4px 8px rgba(0,0,0,0.1)', // elevation 2
      '0 8px 16px rgba(0,0,0,0.1)', // elevation 3
      '0 12px 24px rgba(0,0,0,0.1)', // elevation 4
      '0 16px 32px rgba(0,0,0,0.1)', // elevation 5
      '0 20px 40px rgba(0,0,0,0.1)', // elevation 6
      '0 24px 48px rgba(0,0,0,0.1)', // elevation 7
      '0 28px 56px rgba(0,0,0,0.1)', // elevation 8
      '0 32px 64px rgba(0,0,0,0.1)', // elevation 9
      '0 36px 72px rgba(0,0,0,0.1)', // elevation 10
      '0 40px 80px rgba(0,0,0,0.1)', // elevation 11
      '0 44px 88px rgba(0,0,0,0.1)', // elevation 12
      '0 48px 96px rgba(0,0,0,0.1)', // elevation 13
      '0 52px 104px rgba(0,0,0,0.1)', // elevation 14
      '0 56px 112px rgba(0,0,0,0.1)', // elevation 15
      '0 60px 120px rgba(0,0,0,0.1)', // elevation 16
      '0 64px 128px rgba(0,0,0,0.1)', // elevation 17
      '0 68px 136px rgba(0,0,0,0.1)', // elevation 18
      '0 72px 144px rgba(0,0,0,0.1)', // elevation 19
      '0 76px 152px rgba(0,0,0,0.1)', // elevation 20
      '0 80px 160px rgba(0,0,0,0.1)', // elevation 21
      '0 84px 168px rgba(0,0,0,0.1)', // elevation 22
      '0 88px 176px rgba(0,0,0,0.1)', // elevation 23
      '0 92px 184px rgba(0,0,0,0.1)', // elevation 24
   ],

   // z-index 관리 : 요소 순서 관리
   zIndex: {
      appBar: 1100, // 앱바 순서
      drawer: 1200, // 드로어 순서
      modal: 1300, // 모달 순서
      snackbar: 1400, // 스낵바 순서
      tooltip: 1500, // 툴팁 순서
   },
})

theme.bps = {
   lg: theme.breakpoints.down('lg'), // 1280px ()
   md: theme.breakpoints.down('md'), // 1024px (-256px)
   sm: theme.breakpoints.down('sm'), // 768px (-256px)
   // xs: theme.breakpoints.down(576), // 576px (-192px)
   // xxs: theme.breakpoints.down(448), // 480px (-128px)
}

export default theme
