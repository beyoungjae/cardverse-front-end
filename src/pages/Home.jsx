import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

// Swiper
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// 배너 컨테이너
const BannerContainer = styled(Box)(({ theme }) => ({
   width: '100%',
   height: '900px',
   position: 'relative',
   overflow: 'hidden',
   [theme.breakpoints.down('lg')]: {
      height: '550px',
   },
   [theme.breakpoints.down('md')]: {
      height: '450px',
   },
   [theme.breakpoints.down('sm')]: {
      height: '250px',
   },
}))

// 배너 이미지
const Bannerimg = styled('img')(({ theme }) => ({
   width: '100%',
   height: '100%',
   objectFit: 'cover',
   [theme.breakpoints.down('sm')]: {
      objectPosition: 'center center',
   },
}))

// 그라데이션 오버레이
const Overlay = styled(Box)(({ theme }) => ({
   position: 'absolute',
   top: 0,
   left: 0,
   width: '100%',
   height: '100%',
   background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
}))

// 배너 컨테이너
const BannerContent = styled(Box)(({ theme }) => ({
   position: 'absolute',
   bottom: '50px',
   left: '50px',
   zIndex: 1,
   [theme.breakpoints.down('md')]: {
      bottom: '30px',
      left: '30px',
   },
   [theme.breakpoints.down('sm')]: {
      bottom: '20px',
      left: '20px',
   },
}))

// 배너 타이틀
const BannerTitle = styled('img')(({ theme }) => ({
   maxWidth: '550px',
   marginBottom: '1rem',
   [theme.breakpoints.down('lg')]: {
      maxWidth: '450px',
   },
   [theme.breakpoints.down('md')]: {
      maxWidth: '350px',
   },
   [theme.breakpoints.down('sm')]: {
      maxWidth: '200px',
   },
}))

// 배너 서브타이틀
const BannerSubtitle = styled('img')(({ theme }) => ({
   maxWidth: '550px',
   [theme.breakpoints.down('lg')]: {
      maxWidth: '450px',
   },
   [theme.breakpoints.down('md')]: {
      maxWidth: '350px',
   },
   [theme.breakpoints.down('sm')]: {
      maxWidth: '200px',
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

// 슬라이더 컨테이너
const SliderSection = styled(Box)(({ theme }) => ({
   padding: '11rem 0',
   backgroundColor: theme.palette.background.default,
   position: 'relative',
   '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)',
      pointerEvents: 'none',
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

// 슬라이더 이미지
const SlideImage = styled('img')(({ theme }) => ({
   width: '100%',
   height: '600px',
   objectFit: 'cover',
   borderRadius: '20px',
   boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
   transition: 'all 0.3s ease-in-out',
   cursor: 'pointer',
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

// 슬라이더 컨테이너
const StyledSwiper = styled(Swiper)(({ theme }) => ({
   '.swiper-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.5s ease',
      opacity: 0.4,
      transform: 'scale(0.8)',
      cursor: 'pointer',

      '&.swiper-slide-active': {
         opacity: 1,
         transform: 'scale(1.1)',
         '& img': {
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
         },
      },
      '&.swiper-slide-prev, &.swiper-slide-next': {
         opacity: 0.7,
         transform: 'scale(0.8)',
      },
   },
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
      image: `${process.env.PUBLIC_URL}/images/templates/card1.svg`,
      title: '웨딩 카드 1',
   },
   {
      id: 2,
      image: `${process.env.PUBLIC_URL}/images/templates/card2.svg`,
      title: '웨딩 카드 2',
   },
   {
      id: 3,
      image: `${process.env.PUBLIC_URL}/images/templates/card3.png`,
      title: '웨딩 카드 3',
   },
   {
      id: 4,
      image: `${process.env.PUBLIC_URL}/images/templates/card4.png`,
      title: '웨딩 카드 4',
   },
   {
      id: 5,
      image: `${process.env.PUBLIC_URL}/images/templates/card5.png`,
      title: '웨딩 카드 5',
   },
   {
      id: 6,
      image: `${process.env.PUBLIC_URL}/images/templates/card6.png`,
      title: '웨딩 카드 6',
   },
   {
      id: 7,
      image: `${process.env.PUBLIC_URL}/images/templates/card7.png`,
      title: '웨딩 카드 7',
   },
   {
      id: 8,
      image: `${process.env.PUBLIC_URL}/images/templates/card8.png`,
      title: '웨딩 카드 8',
   },
   {
      id: 9,
      image: `${process.env.PUBLIC_URL}/images/templates/card9.png`,
      title: '웨딩 카드 9',
   },
   {
      id: 10,
      image: `${process.env.PUBLIC_URL}/images/templates/card10.png`,
      title: '웨딩 카드 10',
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
const ReadMore = styled(Box)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
   color: theme.palette.text.disabled,
   cursor: 'pointer',
   fontSize: '0.9rem',
   transition: 'all 0.3s ease',
   '&:hover': {
      color: theme.palette.text.primary,
      fontSize: '0.95rem',
   },
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
   },
}))

// 갤러리 아이템 데이터 (나중에 변경 가능)
const galleryItems = [
   {
      id: 1,
      title: '청첩장 갤러리',
      image: '/images/home/1.png',
      description: '간편하고 세련된 모바일 청첩장 솔루션 한 번으로 특별한 날을 초대하세요. 디지털로 전달되는 모바일 청첩장으로, 소중한 순간을 더 많은 사람들과 쉽게 나누고, 기억에 남을 초대장을 만들어 보세요.',
   },
   {
      id: 2,
      title: '연하장 갤러리',
      image: '/images/home/2.png',
      description: '간편하고 세련된 모바일 청첩장 솔루션 한 번으로 특별한 날을 초대하세요. 디지털로 전달되는 모바일 청첩장으로, 소중한 순간을 더 많은 사람들과 쉽게 나누고, 기억에 남을 초대장을 만들어 보세요.',
   },
   {
      id: 3,
      title: '고희연 갤러리',
      image: '/images/home/3.png',
      description: '간편하고 세련된 모바일 청첩장 솔루션 한 번으로 특별한 날을 초대하세요. 디지털로 전달되는 모바일 청첩장으로, 소중한 순간을 더 많은 사람들과 쉽게 나누고, 기억에 남을 초대장을 만들어 보세요.',
   },
   {
      id: 4,
      title: '초빙장 갤러리',
      image: '/images/home/4.png',
      description: '간편하고 세련된 모바일 청첩장 솔루션 한 번으로 특별한 날을 초대하세요. 디지털로 전달되는 모바일 청첩장으로, 소중한 순간을 더 많은 사람들과 쉽게 나누고, 기억에 남을 초대장을 만들어 보세요.',
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
                        <SlideImage src={card.image} alt={card.title} />
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
                           <ReadMore>
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
