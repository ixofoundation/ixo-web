import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const Container = styled.div`
  color: white;
`

export const ClaimsWidget = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  flex-wrap: wrap;
`

export const ClaimsLabels = styled.div`
  margin-top: 40px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  a {
    max-width: 300px;
  }

  strong {
    font-weight: 700;
  }

  p {
    margin-bottom: 5px;
  }

  p:before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 25px;
  }
  p:nth-child(1):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }
  p:nth-child(2):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoOrange};
  }
  p:nth-child(3):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.red};
  }
  p:nth-child(4):before {
    background: #033c50;
  }
`

export const ClaimsTopLabels = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-bottom: 30px;

  p {
    margin: 0 5px;
    font-size: 13px;
  }
  p:before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 10px;
  }
  p:nth-child(1):before {
    background: #035971;
  }

  p:nth-child(2):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }
  p:nth-child(3):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.red};
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    justify-content: flex-start;
    margin: 15px 0 15px 12px;
    flex-wrap: wrap;
  }
`
