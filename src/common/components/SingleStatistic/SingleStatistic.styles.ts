import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const Container = styled.div`
  text-align: center;
  padding: 0 1rem;
  font-family: ${(props): string => props.theme.fontRobotoCondensed};
  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 1.25rem 1rem;
  }
`

export const Title = styled.h3`
  text-transform: uppercase;
  color: white;
  font-size: 15px;
  margin-bottom: 4px;
  font-weight: 300;
`

export const Amount = styled.p`
  color: ${(props): string => props.theme.fontLightBlue};
  font-size: 29px;
  line-height: 38px;
  margin-bottom: 4px;
  font-weight: 300;

  i:before {
    font-size: 19px;
    top: -2px;
    right: 5px;
    position: relative;
  }
`

export const Error = styled.p`
  color: ${(props): string => props.theme.red};
  font-size: 16px;
`

export const Warning = styled(Error)`
  color: ${(props): string => props.theme.ixoOrange};
`

export const Description = styled.p`
  color: white;
  font-weight: 300;
  font-size: 13px;
  font-family: ${(props): string => props.theme.fontRoboto};
  margin-bottom: 0;
  .text {
    color: white;
  }

  .text-block {
    display: block;
    color: white;
  }

  .number {
    color: ${(props): string => props.theme.fontBlue};
    display: inline-block;
    background: ${(props): string => props.theme.bg.gradientBlue};
    padding: 2px 8px;
    margin: 0 5px;
    border-radius: 3px;
  }

  .number-orange {
    color: ${(props): string => props.theme.ixoOrange};
    background: #012232;
    display: inline-block;
    padding: 2px 15px;
    margin: 10px 5px;
    border-radius: 3px;
    font-size: 30px;
    font-weight: bold;
  }
`
