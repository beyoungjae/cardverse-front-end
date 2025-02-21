import { InputField } from '.'

const OTPInput = ({ value, onChange, isDisabled, timer, maxLength = 6 }) => {
   const handleChange = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength)
      onChange(value)
   }

   const handleKeyDown = (e) => {
      // 드래그 선택 후 백스페이스/딜리트 처리
      if ((e.key === 'Backspace' || e.key === 'Delete') && window.getSelection().toString()) {
         e.preventDefault()
         onChange('')
         return
      }

      // 숫자 키, 제어 키, 특수 키 조합 처리
      if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) && !e.ctrlKey && !e.metaKey) {
         e.preventDefault()
      }
   }

   const handleKeyPress = (e) => {
      const isNumber = /[0-9]/.test(e.key)
      const isControl = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)
      const isMaxLength = value.length >= maxLength

      if (!isNumber && !isControl) {
         e.preventDefault()
      }
      if (isNumber && isMaxLength) {
         e.preventDefault()
      }
   }

   const handlePaste = (e) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text')
      const numericValue = pastedData.replace(/[^0-9]/g, '').slice(0, maxLength)
      onChange(numericValue)
   }

   return (
      <InputField
         $isDisabled={isDisabled}
         disabled={isDisabled}
         variant="outlined"
         autoComplete="one-time-code"
         label={`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
         value={value}
         onChange={handleChange}
         onKeyDown={handleKeyDown}
         inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: maxLength,
            style: {
               letterSpacing: '0.5em',
               textAlign: 'center',
               fontSize: '1.2em',
            },
            onPaste: handlePaste,
         }}
      />
   )
}

export default OTPInput
