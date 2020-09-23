import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'
import { Link } from 'react-router-dom'

export const CardTop = styled.div`
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  overflow: hidden;
`

export const CardTopContainer = styled.div`
  padding: 10px;
  height: 180px;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.03);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  transition: transform 0.5s ease;

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
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.2;
  color: ${(props: any): string => props.theme.fontDarkGrey};
`

export const SubTitle = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  color: #000 !important;
  line-height: 1.5;
  strong {
    font-weight: bold;
  }
`

export const StatisticsContainer = styled.div`
  margin-bottom: 18px;
`

export const Statistic = styled.div``

export const Logo = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 17px;
`

export const StatisticLabel = styled.span`
  display: block;
  font-weight: 400;
  font-size: 12px;
  color: #a5adb0;
`

export const StatisticValue = styled.span`
  display: block;
  font-weight: normal;
  font-size: 36px;
  line-height: 36px;
  color: #000;
`

export const CardBottomLogoContainer = styled.div`
  border-top: 1px solid #e8edee;
  padding-top: 18px;
`
