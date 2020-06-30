import * as React from 'react'
import styled from 'styled-components'

const LoaderContainer = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoaderWrapper = styled.div`
  padding: 0;
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  background: #00c2e4;
  justify-content: center;
  align-items: center;
`

const Pulse = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  position: absolute;
  margin: 0;
  padding: 1px;

  @keyframes spinPulse {
    0% {
      width: 40px;
      height: 40px;
      background: rgba(0, 210, 255, 1);
    }
    100% {
      width: 80px;
      height: 80px;
      background: rgba(0, 34, 51, 0);
    }
  }
  animation: spinPulse 1.5s infinite ease;
`

const IxoIcon = styled.i`
  font-size: 54px;
  display: block;
  width: 29px;
  height: 29px;
  padding: 0;
  background: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  border-radius: 50%;
  position: absolute;

  :before {
    color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    position: relative;
    top: -13px;
    left: -12px;
  }
`

export interface Props {
  info: string
  transparentBg?: boolean
  scale?: number
}

export const Spinner: React.SFC<Props> = ({ info, transparentBg, scale }) => {
  let bgString = 'background-color: #002233;'
  if (transparentBg === true) {
    bgString = ''
  }
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: scale(${scale});
    ${bgString}
    flex:1 1 auto;
    p {
      color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
      margin-top: 10px;
    }
  `
  return (
    <Container>
      <LoaderContainer>
        <Pulse />
        <LoaderWrapper>
          <IxoIcon className="icon-ixo-x" />
        </LoaderWrapper>
      </LoaderContainer>
      <p>{info}</p>
    </Container>
  )
}
