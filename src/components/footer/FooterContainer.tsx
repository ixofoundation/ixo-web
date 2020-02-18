import * as React from 'react'
import styled from 'styled-components'
import { FooterLeft } from './FooterLeft'
import { FooterRight } from './FooterRight'

const BottomBar = styled.footer`
  padding: 19px 54px 19px 54px;
  z-index: 9;
  background: black;
`

export interface ParentProps {
  simpleFooter?: boolean
}
class Footer extends React.Component<ParentProps> {
  render(): JSX.Element {
    return (
      <BottomBar className="container-fluid text-white">
        <div className="row">
          <FooterLeft simple={this.props.simpleFooter} />
          <FooterRight simple={this.props.simpleFooter} />
        </div>
      </BottomBar>
    )
  }
}

export default Footer
