import { useEffect } from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import { Icon } from '@components'
import { rgba } from '@lib'
import { palette } from '@theme'

const LottieAnimation = () => {
  /*
    fetch(getCdnPath(lottieFile.asset.url, 'files')).then(
  res => res.json().then(
    data => {
      setLottieData(data)
    }
  )
)



        {lottieData && (
  <StyledLottie 
    lottieRef={lottieRef} 
    animationData={lottieData} 
    loop={loop} 
    autoplay={loop ? true : false}
  />
)}
*/

  return <Lottie options={{ animationData: `/assets/guide/${item.image}`, autoplay: true, loop: true }} />
}

const Wrapper = styled.div``

export default LottieAnimation
