import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'
import { Link } from 'react-router-dom'

export enum ShieldColor {
  Grey = 'grey',
  Orange = 'orange',
  Green = 'green',
  Red = 'red',
  Blue = 'blue',
  Maroon = 'maroon',
}

export const CardTop = styled.div`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  overflow: hidden;
`

export const CardTopContainer = styled.div`
  padding: 10px;
  height: 250px;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.03);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  transition: transform 0.5s ease;

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 225px;
  }

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 33%;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.33) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  i {
    position: relative;
    z-index: 1;
  }
  i:before {
    color: white;
    font-size: 20px;
    margin: 10px 5px;
    display: inline-flex;
  }
`

export const Description = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 40px 20px 10px;
  text-align: left;
  transition: opacity 0.5s ease;

  @media (min-width: ${deviceWidth.desktop}px) {
    opacity: 0;
  }

  p {
    font-size: 13px;
    color: white;
    position: relative;
    top: -15px;

    transition: top 0.6s ease;
  }
`

export const CardBottom = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  flex: 1;
  padding: 14px 18px 18px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    color: ${(props: any): string => props.theme.fontDarkGrey};
  }
`

export const CardBottomHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ShieldContainer = styled.div`
  display: flex;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

export const ShieldText = styled.p`
  margin: 0;
  font-size: 12px;
`

export const Shield = styled.div`
  p {
    color: white;
    font-weight: bold;
    padding: 2px 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background: ${(props: any): string => props.theme.ixoOrange};
    font-family: ${(props: any): string => props.theme.fontRoboto};
  }

  &.${ShieldColor.Orange} {
    ${ShieldText} {
      background-color: #f89d28;
    }
  }

  &.${ShieldColor.Grey} {
    ${ShieldText} {
      background-color: #b6b6b6;
    }
  }

  &.${ShieldColor.Green} {
    ${ShieldText} {
      background-color: #b6b6b6;
    }
  }

  &.${ShieldColor.Red} {
    ${ShieldText} {
      background-color: #e2223b;
    }
  }

  &.${ShieldColor.Blue} {
    ${ShieldText} {
      background-color: #39c3e6;
    }
  }

  &.${ShieldColor.Maroon} {
    ${ShieldText} {
      background-color: #7c2740;
    }
  }
`

export const ShieldLabel = styled.div`
  ${ShieldText} {
    color: black;
    font-weight: 400;
    padding: 2px 10px;
    font-family: ${(props: any): string => props.theme.fontRoboto};
  }
`

export const CardContainer = styled.div`
  margin-bottom: 34px;
  font-family: ${(props: any): string => props.theme.fontRoboto};
`

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0);
  height: 100%;
  transition: box-shadow 0.3s ease;

  :hover {
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.15);
    text-decoration: none;
  }

  :hover ${CardTopContainer} {
    transform: scale(1.05);
  }

  :hover ${Description} {
    opacity: 1;
  }

  :hover ${Description} p {
    top: 0;
  }
`

export const MainContent = styled.div`
  margin: 30px 0 24px;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.2;
  color: ${(props: any): string => props.theme.fontDarkGrey};
`

export const StatisticsContainer = styled.div`
  margin-bottom: 18px;
`

export const Statistic = styled.div``

export const StatisticLabel = styled.span`
  color: grey;
`

export const StatisticValue = styled.span`
  color: #000;
`
