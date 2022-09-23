import styled from 'styled-components'
import PhoneInput from 'react-phone-number-input'
import { breakpoint } from '@theme'

const StyledPhoneInput = styled(props => <PhoneInput {...props} />)`
  .PhoneInputCountry {
    z-index: 1;
    position: absolute;
    top: 50%;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 72px;
    @media only screen and (min-width: ${breakpoint.laptop}px) {
      width: 76px;
    }
    @media only screen and (min-width: ${breakpoint.desktop}px) {
      width: 80px;
    }

    transform: translateY(-50%);

    select {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .PhoneInputCountryIconUnicode {
      position: absolute;
      display: flex;
      width: 24px;
      height: 16px;
      pointer-events: none;
      font-size: 24px;
      line-height: 1em;
    }

    .PhoneInputCountrySelectArrow {
      /* to-do */
    }
  }
`

export default StyledPhoneInput
