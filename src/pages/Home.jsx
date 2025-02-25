import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Swiper
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// 배너 컨테이너
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '100vh',
   maxHeight: '1000px',
   position: 'relative',
   overflow: 'hidden',
   userSelect: 'none',
   [theme.breakpoints.down('lg')]: {
      maxHeight: '800px',
   },
   [theme.breakpoints.down('md')]: {
      maxHeight: '600px',
   },
   [theme.breakpoints.down('sm')]: {
      maxHeight: '400px',
   },
}))

// 배너 이미지
const Bannerimg = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   objectPosition: 'center',
   transition: 'transform 0.3s ease',
   pointerEvents: 'none',
}))

// 그라데이션 오버레이
const Overlay = styled(Box)(() => ({
   position: 'absolute',
   top: 0,
   width: '100%',
   height: '100%',
   background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
   transition: 'opacity 0.3s ease',
}))

// 배너 컨텐츠
const BannerContent = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: '10%',
   left: '10%',
   zIndex: 1,
   transition: 'all 0.3s ease',
   [theme.breakpoints.down('md')]: {
      bottom: '8%',
      left: '8%',
   },
   [theme.breakpoints.down('sm')]: {
      bottom: '6%',
      left: '6%',
   },
}))

// 배너 타이틀
const BannerTitle = styled('img')(({ theme }) => ({
   width: '100%',
   maxWidth: '600px',
   height: 'auto',
   marginBottom: '2rem',
   filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
   [theme.breakpoints.down('lg')]: {
      maxWidth: '500px',
      marginBottom: '1.5rem',
   },
   [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
      marginBottom: '1rem',
   },
   [theme.breakpoints.down('sm')]: {
      maxWidth: '280px',
      marginBottom: '0.8rem',
   },
}))

// 배너 서브타이틀
const BannerSubtitle = styled('img')(({ theme }) => ({
   width: '100%',
   maxWidth: '500px',
   height: 'auto',
   filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
   [theme.breakpoints.down('lg')]: {
      maxWidth: '400px',
   },
   [theme.breakpoints.down('md')]: {
      maxWidth: '320px',
   },
   [theme.breakpoints.down('sm')]: {
      maxWidth: '240px',
   },
}))

// 슬라이더 타이틀
const SliderTitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.h1,
   textAlign: 'center',
   marginBottom: '2rem',
   color: theme.palette.text.secondary,
   [theme.breakpoints.down('lg')]: {
      fontSize: '2.5rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
   },
}))

// 슬라이더 서브타이틀
const SliderSubtitle = styled(Typography)(({ theme }) => ({
   ...theme.typography.body1,
   marginBottom: '10rem',
   textAlign: 'center',
   color: theme.palette.text.disabled,
   [theme.breakpoints.down('lg')]: {
      fontSize: '1.5rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
   },
}))

// 반응형 슬라이더 섹션
const SliderSection = styled(Box)(({ theme }) => ({
   padding: '8rem 0',
   backgroundColor: theme.palette.background.default,
   position: 'relative',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
      pointerEvents: 'none',
   },
   [theme.breakpoints.down('md')]: {
      padding: '6rem 0',
   },
   [theme.breakpoints.down('sm')]: {
      padding: '4rem 0',
   },
}))

// 슬라이드 스타일 컴포넌트
const StyledSlide = styled(Box)(({ theme }) => ({
   paddingTop: '50px',
   width: '400px',
   height: '660px',
   backgroundColor: 'transparent',
   margin: '0 auto',
   marginBottom: '100px',
   [theme.breakpoints.down('lg')]: {
      width: '300px',
      height: '580px',
      marginBottom: '60px',
   },
   [theme.breakpoints.down('md')]: {
      width: '280px',
      height: '460px',
      marginBottom: '70px',
   },
   [theme.breakpoints.down('sm')]: {
      width: '200px',
      height: '395px',
      marginBottom: '80px',
   },
}))

// 슬라이더 컨테이너 스타일
const StyledSwiper = styled(Swiper)(({ theme }) => ({
   '.swiper-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0.5,
      transform: 'scale(0.85)',
      cursor: 'pointer',
      [theme.breakpoints.down('lg')]: {
         transform: 'scale(0.8)',
      },
      [theme.breakpoints.down('sm')]: {
         transform: 'scale(0.75)',
      },
      '&.swiper-slide-active': {
         opacity: 1,
         transform: 'scale(1)',
         '& img': {
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
         },
      },
      '&.swiper-slide-prev, &.swiper-slide-next': {
         opacity: 0.7,
         transform: 'scale(0.9)',
      },
   },
}))

// 슬라이드 이미지 스타일
const SlideImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: '600px',
   objectFit: 'cover',
   borderRadius: '24px',
   boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
   cursor: 'pointer',
   '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
   },
   [theme.breakpoints.down('lg')]: {
      height: '500px',
   },
   [theme.breakpoints.down('md')]: {
      height: '400px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '350px',
   },
}))

// 슬라이드 이미지와 오버레이를 함께 감싸는 래퍼
const SlideWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
}))

// 오버레이 컨테이너 – 이미지 위에 투명한 배경과 함께 중앙에 위치
const OverlayContainer = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '600px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '24px',
   backgroundColor: 'rgba(0, 0, 0, 0.25)',
   '&:hover': {
      boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
      transition: 'all 0.2s ease',
   },
   [theme.breakpoints.down('lg')]: {
      height: '500px',
   },
   [theme.breakpoints.down('md')]: {
      height: '400px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '350px',
   },
}))

// 오버레이 텍스트 – "샘플 이미지" 문구
const OverlayText = styled(Typography)(({ theme }) => ({
   fontSize: '1.8rem',
   fontWeight: 600,
   color: '#fff',
   textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
   marginBottom: theme.spacing(2),
}))

// 오버레이 버튼 – 고급스러운 버튼 디자인 (클릭 기능 X)
const OverlayButton = styled(Box)(({ theme }) => ({
   padding: '10px 20px',
   background: theme.palette.primary.main,
   color: '#fff',
   borderRadius: '8px',
   fontWeight: 600,
   textTransform: 'uppercase',
   boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
   cursor: 'pointer',
}))

// 점 세개 효과
const Spotpoint = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '8px',
   margin: '20px 0',

   '& div': {
      fontSize: '24px',
      color: theme.palette.text.disabled,
      transition: 'all 0.3s ease',
      opacity: 0.8,
   },

   '& div:nth-of-type(2)': {
      // 가운데 점
      fontSize: '32px',
      opacity: 1,
      color: theme.palette.text.disabled,
   },
}))

// 카드 데이터 (나중에 변경 가능)
const cards = [
   {
      id: 1,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00001.png`,
      title: '카드 1',
   },
   {
      id: 2,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00002.png`,
      title: '카드 2',
   },
   {
      id: 3,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00003.png`,
      title: '카드 3',
   },
   {
      id: 4,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00004.png`,
      title: '카드 4',
   },
   {
      id: 5,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00005.png`,
      title: '카드 5',
   },
   {
      id: 6,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00006.png`,
      title: '카드 6',
   },
   {
      id: 7,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00007.png`,
      title: '카드 7',
   },
   {
      id: 8,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00008.png`,
      title: '카드 8',
   },
   {
      id: 9,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00009.png`,
      title: '카드 9',
   },
   {
      id: 10,
      image: `${process.env.PUBLIC_URL}/images/templates/sample00010.png`,
      title: '카드 10',
   },
]

// 샘플 섹션
const SampleSection = styled(Box)(({ theme }) => ({
   padding: '120px 0',
   backgroundColor: theme.palette.background.default,
}))

// 샘플 타이틀
const SampleTitle = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '1rem',
   ...theme.typography.body1,
   color: theme.palette.text.disabled,
   fontSize: '0.9rem',
   letterSpacing: '0.8em',
   textTransform: 'uppercase',
   [theme.breakpoints.down('lg')]: {
      fontSize: '0.8rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
   },
}))

// 갤러리 타이틀
const GalleryTitle = styled(Typography)(({ theme }) => ({
   textAlign: 'center',
   marginBottom: '4rem',
   ...theme.typography.h1,
   color: theme.palette.text.primary,
   fontSize: '2.5rem',
   fontWeight: 500,
   [theme.breakpoints.down('lg')]: {
      fontSize: '2rem',
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem',
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
   },
}))

// 갤러리 그리드
const GalleryGrid = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '120px',
   width: '100%',
   position: 'relative',
   overflow: 'hidden',
   marginBottom: '5rem',
}))

// 갤러리 아이템
const GalleryItem = styled(motion.div)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '80px',
   padding: '0 20px',
   marginBottom: '10rem',
   position: 'relative',
   '&[data-reverse="true"]': {
      flexDirection: 'row-reverse',
   },
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '40px',
      '&[data-reverse="true"], &[data-reverse="false"]': {
         flexDirection: 'column',
      },
   },
}))

// 이미지 컨테이너
const ImageContainer = styled(Box)(({ theme }) => ({
   flex: '0 0 65%',
   position: 'relative',
   '&[data-reverse="false"]': {
      marginLeft: '-1.2vw',
   },
   '&[data-reverse="true"]': {
      marginRight: '-1.2vw',
   },
   [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '0 !important',
   },
}))

// 이미지 상단에 오버레이 효과
const ImageWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   paddingTop: '75%',
   overflow: 'hidden',
   '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20%',
      height: '100%',
      background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3))',
      pointerEvents: 'none',
      zIndex: 1,
   },
   '&[data-reverse="false"]::after': {
      right: 0,
      background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3))',
   },
   '&[data-reverse="true"]::after': {
      left: 0,
      background: 'linear-gradient(to left, transparent, rgba(255, 255, 255, 0.3))',
   },
   [theme.breakpoints.down('md')]: {
      '&::after': {
         display: 'none',
      },
   },
}))

// 갤러리 이미지
const GalleryImage = styled('img')({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   zIndex: 0,
})

// 갤러리 컨텐츠
const GalleryContent = styled(Box)(({ theme }) => ({
   flex: '0 0 35%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   maxWidth: '500px',
   margin: '0 auto',
   '&[data-reverse="true"]': {
      alignItems: 'flex-end',
   },
   [theme.breakpoints.down('md')]: {
      flex: '0 0 100%',
      maxWidth: '100%',
      alignItems: 'flex-start',
      '&[data-reverse="true"]': {
         alignItems: 'flex-start',
      },
   },
}))

// 갤러리 아이템 타이틀
const GalleryItemTitle = styled(Typography)(({ theme }) => ({
   fontSize: '1.8rem',
   marginBottom: '1.5rem',
   color: theme.palette.text.primary,
}))

// 갤러리 아이템 텍스트
const GalleryItemText = styled(Typography)(({ theme }) => ({
   fontSize: '1rem',
   color: theme.palette.text.secondary,
   lineHeight: 1.8,
   marginBottom: '2rem',
}))

// 리드모어 버튼
const ReadMore = styled(Link)(({ theme }) => ({
   display: 'inline-flex',
   alignItems: 'center',
   gap: '0.5rem',
   color: theme.palette.text.primary,
   textDecoration: 'none',
   fontSize: '0.9rem',
   marginTop: '1rem',
   '&:hover': {
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
   },
}))

// 갤러리 아이템 데이터
const galleryItems = [
   {
      id: 1,
      title: '청첩장 갤러리',
      image: '/images/home/weddinggallery.png',
      description: '사랑의 이야기를 디지털에 담아내는 특별한 청첩장입니다. 세련된 디자인과 손쉬운 전달로, 결혼식의 설렘과 기쁨을 더 많은 이들과 나눌 수 있습니다. 당신만의 독특한 스타일로 완성되는 모바일 청첩장으로, 새로운 시작을 알려보세요.',
      path: '/template/wedding',
   },
   {
      id: 2,
      title: '연하장 갤러리',
      image: '/images/home/newyeargallery.png',
      description: '새해의 따뜻한 마음을 전하는 디지털 연하장입니다. 다양한 디자인과 개성 있는 템플릿으로, 새해 인사를 특별하게 전달하세요. 간편한 제작과 전송으로, 소중한 이들에게 정성 가득한 새해 축복을 나눌 수 있습니다.',
      path: '/template/newyear',
   },
   {
      id: 3,
      title: '고희연 갤러리',
      image: '/images/home/gohyeongallery.png',
      description: '일흔 번째 봄을 맞이하는 특별한 순간을 위한 초대장입니다. 품격 있는 디자인과 정성스러운 구성으로, 감사와 축하의 마음을 전하세요. 소중한 분의 인생을 기념하는 뜻깊은 자리에 가족과 친지를 모십니다.',
      path: '/template/gohyeon',
   },
   {
      id: 4,
      title: '초빙장 갤러리',
      image: '/images/home/invitationgallery.png',
      description: '비즈니스부터 문화행사까지, 모든 순간을 위한 프로페셔널한 초대장입니다. 목적에 맞는 맞춤형 디자인과 간편한 참석 관리로, 성공적인 행사를 준비하세요. 세련된 디지털 초빙장으로 당신의 특별한 순간에 품격을 더합니다.',
      path: '/template/invitation',
   },
]

const Home = () => {
   const swiperRef = React.useRef(null)

   // 각 갤러리 아이템에 대한 개별 ref 생성
   const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true })
   const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true })
   const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true })
   const [ref4, inView4] = useInView({ threshold: 0.3, triggerOnce: true })

   // ref와 inView 상태를 배열로 구성
   const galleryRefs = [
      { ref: ref1, inView: inView1 },
      { ref: ref2, inView: inView2 },
      { ref: ref3, inView: inView3 },
      { ref: ref4, inView: inView4 },
   ]

   // 슬라이드 클릭 핸들러
   const handleSlideClick = (clickedIndex) => {
      if (swiperRef.current && swiperRef.current.swiper) {
         const swiper = swiperRef.current.swiper // 스와이퍼 인스턴스
         const activeIndex = swiper.realIndex // 현재 활성화된 슬라이드의 실제 인덱스
         const totalSlides = cards.length // 총 슬라이드 수

         // 클릭된 슬라이드가 현재 활성 슬라이드의 이전인지 다음인지 확인
         if (clickedIndex === (activeIndex + 1) % totalSlides) {
            swiper.slideNext() // 다음 슬라이드로 이동
         } else if (clickedIndex === (activeIndex - 1 + totalSlides) % totalSlides) {
            swiper.slidePrev() // 이전 슬라이드로 이동
         }
      }
   }

   return (
      <>
         <BannerContainer>
            <Bannerimg src={`${process.env.PUBLIC_URL}/images/home/banner.png`} alt="banner" />
            <Overlay />
            <BannerContent>
               <BannerTitle src={`${process.env.PUBLIC_URL}/images/home/banner_title.png`} alt="banner_title" />
               <br />
               <BannerSubtitle src={`${process.env.PUBLIC_URL}/images/home/banner_subtitle.png`} alt="banner_subtitle" />
            </BannerContent>
         </BannerContainer>
         <SliderSection>
            <SliderTitle>Completed Template</SliderTitle>
            <Spotpoint>
               <div>•</div>
               <div>•</div>
               <div>•</div>
            </Spotpoint>
            <SliderSubtitle>
               결혼식, 생일, 고희연 등 다양한 이벤트를 위한
               <br />
               맞춤형 모바일 초대장. 당신의 소중한 순간을 디지털로 전달하세요
            </SliderSubtitle>
            <StyledSwiper
               ref={swiperRef}
               grabCursor={true}
               centeredSlides={true}
               slidesPerView={3}
               initialSlide={1}
               loop={true}
               speed={800}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
               }}
               modules={[Autoplay]}
               style={{
                  width: '100%',
                  padding: '15px 0',
               }}
               breakpoints={{
                  320: {
                     slidesPerView: 2,
                  },
                  768: {
                     slidesPerView: 2,
                  },
                  1024: {
                     slidesPerView: 4,
                  },
               }}
               spaceBetween={30}
            >
               {cards.map((card, index) => (
                  <SwiperSlide key={card.id} onClick={() => handleSlideClick(index)}>
                     <StyledSlide>
                        <SlideWrapper>
                           <SlideImage src={card.image} alt={card.title} />
                           <OverlayContainer>
                              <OverlayText>샘플 템플릿</OverlayText>
                              <OverlayButton>Open</OverlayButton>
                           </OverlayContainer>
                        </SlideWrapper>
                     </StyledSlide>
                  </SwiperSlide>
               ))}
            </StyledSwiper>
         </SliderSection>
         <SampleSection>
            <SampleTitle>sample images</SampleTitle>
            <GalleryTitle>Mobile Card Gallery</GalleryTitle>

            <GalleryGrid>
               {galleryItems.map((item, index) => {
                  const isReverse = index % 2 === 1

                  return (
                     <GalleryItem key={item.id} ref={galleryRefs[index].ref} data-reverse={isReverse} initial={{ opacity: 0, x: isReverse ? 100 : -100 }} animate={galleryRefs[index].inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.2 }}>
                        <ImageContainer data-reverse={isReverse}>
                           <ImageWrapper data-reverse={isReverse}>
                              <GalleryImage src={item.image} alt={item.title} />
                           </ImageWrapper>
                        </ImageContainer>

                        <GalleryContent data-reverse={isReverse}>
                           <GalleryItemTitle>{item.title}</GalleryItemTitle>
                           <GalleryItemText>{item.description}</GalleryItemText>
                           <ReadMore to={item.path}>
                              Read More
                              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                 →
                              </motion.span>
                           </ReadMore>
                        </GalleryContent>
                     </GalleryItem>
                  )
               })}
            </GalleryGrid>
         </SampleSection>
      </>
   )
}

export default Home
