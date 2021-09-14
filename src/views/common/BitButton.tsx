import { observer } from 'mobx-react-lite'
import { Button } from '@material-ui/core'
import styled from '@emotion/styled'
import { walletStore } from 'stores/walletStore'
import { maskWalletAddress } from 'utils/wallet.utils'
import { walletService } from 'services/walletService'

const StyledButton = styled.div`
  background: #92cd41;
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 14px;
  padding: 5px;
  font-family: 'Press Start 2P', cursive;
  text-decoration: none;
  color: white;
  box-shadow: inset (-4px) (-4px) 0px 0px #4aa52e;

  &:hover,
  &:focus {
    background: #76c442;
    box-shadow: inset (-4px * 1.5) (-4px * 1.5) 0px 0px #4aa52e;
  }

  &:active {
    box-shadow: inset 4px 4px 0px 0px #4aa52e;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
  }

  &:before {
    top: -6px;
    left: 0;
    border-top: 6px black solid;
    border-bottom: 6px black solid;
  }

  &:after {
    left: -6px;
    top: 0;
    border-left: 6px black solid;
    border-right: 6px black solid;
  }

  &--reset {
    background: #e76e55;
    box-shadow: inset (-4px) (-4px) 0px 0px #8c2022;

    &:hover,
    &:focus {
      background: #ce372b;
      box-shadow: inset (-4px * 1.5) (-4px * 1.5) 0px 0px #8c2022;
    }

    &:active {
      box-shadow: inset 4px 4px 0px 0px #8c2022;
    }
  }

  &--proceed {
    background: #f7d51d;
    box-shadow: inset (-4px) (-4px) 0px 0px #e59400;

    &:hover,
    &:focus {
      background: #f2c409;
      box-shadow: inset (-4px * 1.5) (-4px * 1.5) 0px 0px #e59400;
    }

    &:active {
      box-shadow: inset 4px 4px 0px 0px #e59400;
    }
  }
`
export const BitButton = observer(() => {
  const handler = async () => {
    if (walletStore.isConnected) {
      await walletService.disconnect()
    } else {
      await walletService.connect()
    }
  }

  return (
    <StyledButton onClick={handler}>
      {walletStore.isConnected ? maskWalletAddress(walletStore.address) : 'Connect'}
    </StyledButton>
  )
})
