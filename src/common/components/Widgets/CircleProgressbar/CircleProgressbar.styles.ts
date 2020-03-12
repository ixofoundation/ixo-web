import styled from 'styled-components'

export const WidgetContainer = styled.div`
  position: relative;

  .progress {
    width: 250px;
    height: 100%;
    transform: rotate(-90deg);
    background: none;
  }

  .progress__meter,
  .progress__value {
    fill: none;
  }

  .progress__meter {
    stroke: #033c50;
  }

  .progress__value {
    stroke-linecap: round;
  }
`

export const ApprovedText = styled.p``

export const TotalText = styled.p``

export const Descriptor = styled.p``

export const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  p {
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};
    line-height: 1;
  }

  ${ApprovedText} {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
    font-size: 30px;
    font-weight: 500;
    margin: 0;
  }

  ${TotalText} {
    color: white;
    font-size: 20px;
    margin: 0;
  }

  ${Descriptor} {
    font-size: 16px;
    color: white;
    margin: 5px 0 0 0;
  }
`
