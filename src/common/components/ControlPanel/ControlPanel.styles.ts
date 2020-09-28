import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const MobileControlPanelToggle = styled.button`
  display: block;
  position: fixed;
  top: 136px;
  right: -1px;
  bottom: auto;
  left: auto;
  transform: translateY(calc(-100% + 1px));
  background: #dfe7f4;
  border: none;
  outline: none !important;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  .down-arrow {
    transform: rotate(90deg);
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    display: none;
  }
`

export const ControlPanelWrapper = styled.div`
  background: #dfe7f4;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.75rem;
  color: #47568c;
  overflow: visible scroll;
  padding-bottom: 3.5rem;
  ::-webkit-scrollbar {
    width: 8px;
  }
 
  ::-webkit-scrollbar-thumb {
    background: #C1CBD0;
    border-radius: 8px;
  }
  @media (max-width: ${deviceWidth.desktop}px) {
    position: fixed;
    top: 135px;
    left: 100%;
    right: 0;
    bottom: 0;
    z-index: 12;
    transition: all 0.3s;
    border-top-right-radius: 0;
    &.open {
      left: 0;
    }
  }

  .show-more-container {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0s ease-out;
    &.show {
      transition: max-height 1.75s ease-out;
      max-height: 300px;
    }
  }
`

export const ControlPanelScrollWrapper = styled.div`
  position: relative;
  transition: 0.3s all;
  @media (min-width: ${deviceWidth.desktop}px) {
    position: sticky;
    top: 120px;
    background: #dfe7f4;
    border-radius: 5px;
    ${ControlPanelWrapper} {
      height: calc(100vh - 106px);
    }
    &.fixed {
      position: absolute;
      top: 30px;
      z-index: 99;
    }
  }
`

export const ControlPanelSection = styled.div`
  background: #FCFDFF;
  border-radius: 5px;
  padding: 1rem 0.875rem;
  &:not(:first-child) {
    margin-top: 0.625rem;
    min-height: 170px;
  }
  h4 {
    display: block;
    position: relative;
    font-family: Roboto;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.2;
    display: flex;
    align-items: center;
    text-transform: none;
    .heading-icon svg {
      width: 25px;
      padding: 2px;
      margin-right: 0.5rem;
      background: #ffffff;
      border-radius: 4px;
    }
    .arrow-icon {
      position: absolute;
      top: 50%;
      right: 0;
      transition: transform 0.3s;
      transform: translateY(-50%) rotate(-90deg);
      cursor: pointer;
      &.active {
        transform: translateY(-50%);
      }
    }
  }
`

export const SquareButtonSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    outline: none !important;
    min-width: 25%;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.6875rem;
    line-height: 1.2;
    color: #47568c;

    .icon-wrapper {
      width: 100%;
      padding: 0.625rem;
      background: #fff;
      border-radius: 12px;
      margin-bottom: 0.5rem;
      transition: all 0.3s;
      border: 1px solid transparent;
      svg {
        margin: 0 auto;
      }
    }
    &:hover {
      .icon-wrapper {
        border: 1px solid ${(props: any): string => props.theme.ixoBlue};
      }
    }
  }
`
