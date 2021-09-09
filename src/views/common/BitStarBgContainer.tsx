import { Box, BoxProps } from '@material-ui/core'
import styled from '@emotion/styled'

const StyledBox = styled(Box)`
  background-image: url('static/bg2.gif');
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const BitStarBgContainer = ({ children, ...props }: BoxProps) => {
  return <StyledBox {...props}>{children}</StyledBox>
}
