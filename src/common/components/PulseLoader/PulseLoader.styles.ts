import styled from 'styled-components'

export const PulseLoaderWrapper = styled.div`
  padding: 1rem;
  border-radius: 50%;
  width: 5.25rem;
  height: 5.25rem;
  position: relative;
  z-index: 1;
  flex-flow: row nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 50%;
  margin: 0 auto;
  flex: 1 0 auto;
  border: 2px solid #39c3e6;
  @keyframes iconPulse {
    0% {
      transform: scale(1.1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    top: -1px;
    left: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border-radius: 50%;
    border: 2px solid #dfe3e8;
    opacity: 0;
    animation-delay: 1s;
    transform-origin: center;
  }
  &.repeat {
    border: none;
    &:after {
      animation-delay: 0;
      animation: iconPulse 1s infinite ease-in-out;
    }
  }

  svg {
    margin: 0;
  }
`
