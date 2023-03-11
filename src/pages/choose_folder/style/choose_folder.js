import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.background_color};
  font-family:  ${props => props.theme.first_font};
`

export const CanvaCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 500px;
    background-color: ${props => props.theme.background_color};
`
