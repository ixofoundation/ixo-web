import styled from "styled-components";
import { deviceWidth } from "../../../lib/commonData";

export const createTabsContainer = (
  activeTabColor: string | undefined
): any => styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;

  > div:first-child a,
  > a:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  > div:last-child a,
  > a:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  > div a {
    height: 100%;
  }

  a {
    background: ${(props: any): string => props.theme.bg.gradientBlue};
    font-family: ${(props: any): string => props.theme.fontRoboto};
    color: white;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 14px;
    padding: 10px 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;

    i {
      margin-right: 10px;
      font-size: 18px;
      &:before {
        transition: all 0.3s ease;
      }
    }

    p {
      margin-bottom: 0;
      white-space: nowrap;
    }

    &:hover {
      text-decoration: none;
      color: ${(props: any): string => props.theme.ixoBlue};
    }

    &.active {
      background: ${(props: any): string =>
        activeTabColor || props.theme.bg.lightBlue};
      color: white;
      font-weight: bold;
    }

    &.in-active {
      pointer-events: none;
      cursor: default;
      i {
        opacity: 0.3;
      }
      p {
        opacity: 0.3;
      }
    }
  }

  button {
    background: linear-gradient(123.17deg, #0C5173 0%, #002A3F 101.44%);
    border: none;
    width: 50px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  img {
    padding: 0 5px;
  }

  @media (min-width: ${deviceWidth.mobileSmall}px) {
    a {
      min-width: 110px;
      width: calc(100% / 3);
    }
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    a {
      min-width: 168px;
      width: calc(100% / 3);
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    a {
      flex: 1;
      height: 40px;
      font-size: 10px;
      line-height: 1.4;
      font-weight: bold;
      i {
        display: none;
        font-size: 16px;
      }

      &:not(.active) {
        i {
          display: block;
        }
        p {
          display: none;
        }
      }
    }
  }
`;
