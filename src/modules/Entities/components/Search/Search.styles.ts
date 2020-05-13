import styled from 'styled-components'
import { deviceWidth } from 'src/lib/commonData'

export const SearchWrapper = styled.div`
  background: white;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  border-radius: 4px;
  transform: translateY(-50%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Roboto, sans-serif;
  font-weight: 400;
  z-index: 4;
  > * {
    flex: 1;
    border-radius: 4px;
  }
  .search-input-wrapper {
    flex: 3;
    > *,
    input {
      height: 100%;
    }
  }
  color: black;
`

export const ModalButton = styled.div`
  background: #e8edee;
  padding: 0 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  overflow: visible;
  font-size: 18px;
  white-space: nowrap;
  > * {
    display: block;
  }
  svg:first-child {
    width: 1em;
    margin-right: 0.5rem;
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-right: 6px;
    }
  }
  .down-icon {
    margin-left: auto;
    transition: all 0.3s;
    transform-origin: center;
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-left: 6px;
    }
  }
  :after {
    position: absolute;
    top: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
  &.modal-open {
    overflow: visible;
    :after {
      content: '';
    }
  }
`

export const SearchIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 50px;
  flex: initial;
  text-align: center;
  svg path {
    fill: #83d9f2;
  }
`

export const SearchModal = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  z-index: 10;
  background: white;
  width: 100%;
  padding: 1.5em 2.875em 4.5em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const SearchHeading = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  box-sizing: border-box;
  margin: 0.825rem 0 1.5rem;
`

export const SearchButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1.75rem;
`

export const SearchFilterButton = styled.button`
  color: #4d4d4d;
  outline: none !important;
  background: none;
  text-align: center;
  width: calc(33.333% - 1rem);
  margin: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding: 1.5rem;
  font-weight: 500;
  svg path {
    fill: #4d4d4d;
  }

  &.active {
    color: #4d4d4d;
  }

  &:hover:not(.disabled) {
    color: #fff;
    svg path {
      fill: #fff;
    }
  }
  &.projects {
    border: 2px solid #2f80ed;
    &.active {
      background: linear-gradient(
        90deg,
        #2f80ed 0%,
        #2f80ed 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #2f80ed 0%, #2f80ed 100%);
    }
  }
  &.oracles {
    border: 2px solid #9b51e0;
    &.active {
      background: linear-gradient(
        90deg,
        #9b51e0 0%,
        #9b51e0 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #9b51e0 0%, #9b51e0 100%);
    }
  }
  &.investments {
    border: 2px solid #219653;
    &.active {
      background: linear-gradient(
        90deg,
        #219653 0%,
        #219653 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #219653 0%, #219653 100%);
    }
  }
  &.cells {
    border: 2px solid #f2c94c;
    &.active {
      background: linear-gradient(
        90deg,
        #f2c94c 0%,
        #f2c94c 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #f2c94c 0%, #f2c94c 100%);
    }
  }
  &.templates {
    border: 2px solid #000000;
    &.active {
      background: linear-gradient(
        90deg,
        #000000 0%,
        #000000 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #000000 0%, #000000 100%);
    }
  }
  &.data {
    border: 2px solid #f2994a;
    &.active {
      background: linear-gradient(
        90deg,
        #f2994a 0%,
        #f2994a 5px,
        transparent 6px,
        transparent 100%
      );
    }
    &:hover:not(.disabled) {
      background: linear-gradient(90deg, #f2994a 0%, #f2994a 100%);
    }
  }
  &.disabled {
    border-color: #a5adb0;
    color: #a5adb0;
    cursor: not-allowed;
    i {
      color: #a5adb0;
    }
    svg path {
      fill: #a5adb0;
    }
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    width: calc(100% - 1rem);
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    padding: 1.5rem 2rem;
  }
`

export const ButtonContent = styled.div`
  font-size: 1rem;
  svg {
    margin-right: 1rem;
  }
`
