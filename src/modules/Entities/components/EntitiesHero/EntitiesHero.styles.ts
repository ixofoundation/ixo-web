import styled from "styled-components";
import { deviceWidth } from "lib/commonData";

export const ContainerInner = styled.div`
  height: 100%;
  width: 100%;
  h3 {
    font-size: 36px;
    line-height: 42px;
    color: #143f54;
    text-align: center;
    font-family: ${(props: any): string => props.theme.fontRoboto};
    margin: 0;
  }
  p {
    font-size: 14px;
    font-weight: 300;
    color: inherit;
    margin: 0;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    border-left: 1px solid black;
  }
`;

export const StatisticContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 !important;
`;

export const HeroInner = styled.div`
  height: 100%;

  > .row {
    margin: -0.5rem -15px;
    justify-content: center;
    align-items: center;
    height: 100%;
    @media (max-width: ${deviceWidth.tablet}px) {
      align-items: flex-start;
      padding: 56px 0;
    }
  }
`;

export const HeroContainer = styled.div`
  background: white;
  background-size: cover;
  background-blend-mode: multiply;
  position: relative;
  color: #143f54;

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 200px;
  }
`;

export const ColorOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.1;
  z-index: 0;
`;

export const HeroTextWrapper = styled.div`
  font-family: ${(props: any): string => props.theme.fontRoboto};
  h1 {
    font-family: ${(props: any): string => props.theme.fontRoboto};
    font-size: 36px;
    line-height: 42px;
    color: #143f54;
    margin: 0;
  }
  h3 {
    font-family: ${(props: any): string => props.theme.fontRoboto};
    font-size: 18px;
    line-height: 21px;
    color: black;
  }
`;
export const HeroIndicatorsWrapper = styled.div`
  > .row {
    justify-content: flex-end;
  }
`;
