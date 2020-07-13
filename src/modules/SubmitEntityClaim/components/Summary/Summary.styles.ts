import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'
import {
  ActionWrapper as ActionWrapperBase,
  SummaryWrapper as SummaryWrapperBase,
} from '../../../../common/components/ControlPanel/Actions/Actions.styles'

export const ActionWrapper = styled(ActionWrapperBase)``
export const ClaimSummaryList = styled.ul``

export const SummaryWrapper = styled(SummaryWrapperBase)`
  padding: 3.125rem 1.375rem;
  color: black;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  > * {
    flex: 1 0 auto;
  }

  h2.summary-header {
    margin: 0 0 2rem;
    font-size: 2.25rem;
    letter-spacing: 0.3px;
    color: black;
  }
  h3.list-header {
    letter-spacing: 0.3px;
    margin: 1.25rem 0 1rem;
  }
  h6 {
    font-family: ${(props): string => props.theme.fontRoboto};
    font-size: 0.75rem;
    letter-spacing: 0.3px;
    color: #436779;
    margin: 0;
  }

  strong {
    font-weight: bold;
  }

  ${ClaimSummaryList} {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    flex-shrink: 3;
    li {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.5;
      color: #000000;
      &:not(:last-child) {
        border-bottom: 1px solid #e8edee;
      }
      svg {
        margin-right: 0.75rem;
      }
      button {
        background: transparent;
        border: none;
        box-shadow: none;
        outline: none;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;

        letter-spacing: 0.3px;

        color: #39c3e6;
      }
    }
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 2.625rem 3.75rem;
  }
`

export const CancelButton = styled.div``
export const SubmitButton = styled.div``
export const ButtonWrapper = styled.div`
  margin-top: 2.75rem;
  .select-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  ${CancelButton},
  ${SubmitButton} {
    border-radius: 4px;
    border: none;
    outline: none !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
  }
  ${CancelButton} {
    background: none;
    color: black;
    padding: 1rem 0;
  }
  ${SubmitButton} {
    padding: 1rem 2rem;
    color: white;
    background: #04d0fb;
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    text-align: center;
  }
`
