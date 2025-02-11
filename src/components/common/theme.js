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

const theme = createTheme({
   // 색상 팔레트
   palette: {
      primary: {
         main: '#000000',
         light: '#333333',
         dark: '#000000',
         contrastText: '#ffffff',
      },
      // 버튼 색상
      secondary: {
         main: '#666666',
         light: '#999999',
         dark: '#333333',
         contrastText: '#ffffff',
      },
      // 텍스트 색상
      text: {
         primary: '#000000', // 선택
         secondary: '#666666', // 호버 
         disabled: '#999999', // 미선택
      },
      // 배경 색상
      background: {
         default: '#ffffff',
         paper: '#ffffff',
         grey: '#f5f5f5',
      },
      // 구분선 색상
      divider: '#dddddd',
      // 액션 색상
      action: {
         active: 'rgba(0, 0, 0, 0.54)',

         hover: 'rgba(0, 0, 0, 0.04)',
         selected: 'rgba(0, 0, 0, 0.08)',
         disabled: 'rgba(0, 0, 0, 0.26)',
         disabledBackground: 'rgba(0, 0, 0, 0.12)',
      },
      // 간격 설정
      spacing: {
         xs: '4px',
         sm: '8px',
         md: '16px',
         lg: '24px',
         xl: '32px',
      },
      // 라운드 모서리 설정
      borderRadius: {
         small: '4px',
         medium: '8px',
         large: '12px',
      },
   },

   // 타이포그래피
   typography: {
      fontFamily: ['Malgun Gothic', '맑은 고딕', 'Playfair Display', 'Times New Roman', 'sans-serif'].join(','),
      h1: {
         fontFamily: 'Playfair Display, Malgun Gothic, 맑은 고딕, serif',
         fontSize: '2.5rem',
         fontWeight: 600,
         lineHeight: 1.2,
      },
      h2: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
         fontSize: '2rem',
         fontWeight: 600,
         lineHeight: 1.3,
      },
      h3: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
         fontSize: '1.75rem',
         fontWeight: 600,
         lineHeight: 1.4,
      },
      body1: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, Times New Roman, sans-serif',
         fontSize: '1rem',
         lineHeight: 1.5,
         letterSpacing: '0.00938em',
      },
      body2: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
         fontSize: '0.875rem',
         lineHeight: 1.43,
         letterSpacing: '0.01071em',
      },
      button: {
         fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
         fontSize: '0.875rem',
         fontWeight: 500,
         letterSpacing: '0.02857em',
         textTransform: 'none',
      },
   },

   // 반응형 브레이크포인트 : 모바일, 태블릿, 데스크탑 등 디바이스 크기에 따라 스타일 변경
   breakpoints: {
      values: {
         xs: 0,
         sm: 600,
         md: 960,
         lg: 1280,
         xl: 1920,
      },
   },

   transitions: {
      // 애니메이션 값
      quick: 'all 0.2s ease',
      normal: 'all 0.3s ease',
      slow: 'all 0.5s ease',
   },

   // 컴포넌트 스타일
   components: {
      MuiAppBar: {
         styleOverrides: {
            root: {
               backgroundColor: '#ffffff',
               boxShadow: 'none',
            },
         },
      },
      // 버튼 스타일
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: 'none',
               fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
               borderRadius: 4,
               padding: '6px 16px',
               '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
               },
            },
            // 버튼 컨테이너 스타일
            contained: {
               boxShadow: 'none',
               '&:hover': {
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
               },
            },
         },
      },
      // 타이포그래피 스타일
      MuiTypography: {
         styleOverrides: {
            root: {
               fontFamily: 'Malgun Gothic, 맑은 고딕, sans-serif',
            },
         },
      },
      // 카드 스타일
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: 8,
               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
         },
      },
      // 텍스트 필드 스타일
      MuiTextField: {
         styleOverrides: {
            root: {
               '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                     borderColor: '#dddddd',
                  },
                  '&:hover fieldset': {
                     borderColor: '#999999',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: '#000000',
                  },
               },
            },
         },
      },
   },

   // 그림자 설정 : 버튼, 카드, 텍스트 필드 등 요소에 그림자 추가
   shadows: [
      'none',
      '0 2px 4px rgba(0,0,0,0.1)',
      '0 4px 8px rgba(0,0,0,0.1)',
      '0 8px 16px rgba(0,0,0,0.1)',
      '0 12px 24px rgba(0,0,0,0.1)', // elevation 4
      '0 16px 32px rgba(0,0,0,0.1)',
      '0 20px 40px rgba(0,0,0,0.1)',
      '0 24px 48px rgba(0,0,0,0.1)',
      '0 28px 56px rgba(0,0,0,0.1)',
      '0 32px 64px rgba(0,0,0,0.1)',
      '0 36px 72px rgba(0,0,0,0.1)',
      '0 40px 80px rgba(0,0,0,0.1)',
      '0 44px 88px rgba(0,0,0,0.1)',
      '0 48px 96px rgba(0,0,0,0.1)',
      '0 52px 104px rgba(0,0,0,0.1)',
      '0 56px 112px rgba(0,0,0,0.1)',
      '0 60px 120px rgba(0,0,0,0.1)', // elevation 16
      '0 64px 128px rgba(0,0,0,0.1)',
      '0 68px 136px rgba(0,0,0,0.1)',
      '0 72px 144px rgba(0,0,0,0.1)',
      '0 76px 152px rgba(0,0,0,0.1)',
      '0 80px 160px rgba(0,0,0,0.1)',
      '0 84px 168px rgba(0,0,0,0.1)',
      '0 88px 176px rgba(0,0,0,0.1)',
      '0 92px 184px rgba(0,0,0,0.1)',
   ],

   // z-index 관리 : 요소 순서 관리
   zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
   },
})

export default theme
