import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 40px;
  background: ${/* eslint-disable-line */ props => props.theme.grey};
  color: white;
`
export const LayoutWrapperClaims: React.SFC<{}> = ({ children }) => {
  return <Container className="container-fluid">{children}</Container>
}
