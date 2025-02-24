import { Box } from '@mui/material'
import { styled } from '@mui/system'

const ItemWrap = styled(Box)(({ theme }) => ({
   display: 'flex',
   gap: '12px',
   height: '20%',
   padding: '12px 4px',
}))

const ImgWrap = styled(Box)(({ theme }) => ({
   flex: 2,
   border: '1px solid black',
   borderRadius: '6px',
}))

const InfoWrap = styled(Box)(({ theme }) => ({
   flex: 4,
   border: '1px solid black',
}))

const Image = styled('img')(() => ({
   objectFit: 'cover',
}))

function ItemForm({items}) {
 

   return (
      <>
         {items.map((item) => (
            <ItemWrap key={item.id}>
               <ImgWrap>
                  <Image src={`${item.bannerUrl}`} alt="배너 이미지" />
               </ImgWrap>
               <InfoWrap>{item.title}</InfoWrap>
            </ItemWrap>
         ))}
      </>
   )
}

export default ItemForm
