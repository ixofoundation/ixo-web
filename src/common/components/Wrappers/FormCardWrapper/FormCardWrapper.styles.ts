import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const Container = styled.div`
  background: #f7f8f9;
  border: 1px solid #39c3e6;
  border-radius: 4px;
  margin-top: 1.75rem;
  padding: 2.125rem 1.25rem;
  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 3.5rem 4.25rem;
  }

  h2 {
    font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    @media (min-width: ${deviceWidth.mobile}px) {
      font-size: 2.25rem;
    }
  }
  div hr {
    border-top: 0.0625rem solid #e8edee;
  }
  div hr.subdivider {
    border-color: #39c3e6;
    margin-bottom: 3rem;
  }
`
export const AddSectionButton = styled.button`
  &:focus {
    outline: none;
  }
  border: none;
  color: #39c3e6;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
`
