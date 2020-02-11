import * as React from 'react'
import { connect } from 'react-redux'
import { PublicSiteStoreState } from '../../redux/public_site_reducer'
import styled from 'styled-components'
import { HeaderLeft } from './HeaderLeft'
import { HeaderRight } from './HeaderRight'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../lib/commonData'
import { ModalWrapper } from 'src/components/common/ModalWrapper'
import { ButtonTypes, Button } from '../common/Buttons'

const TopBar = styled.header`
  position: sticky;
  top: 0;
  padding: 0 15px;

  z-index: 9;
  background: black;

  && {
    width: 100%;
  }
`

const StatusMessage = styled.div`
  opacity: 0;
  background: ${/*eslint-disable-line*/ props => props.theme.bg.lightBlue};
  position: absolute;
  color: white;
  top: 15px;
  right: 0;
  width: 220px;
  padding: 10px;
  line-height: 1.2;
  font-size: 0.8em;
  border-radius: 10px;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 9;

  p {
    margin: 0;
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid
      ${/*eslint-disable-line*/ props => props.theme.bg.lightBlue};
    position: absolute;
    top: -10px;
    right: 20px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
`

const Ping = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  &:hover ${StatusMessage}, &:hover ${StatusMessage} {
    opacity: 1;
  }
`

const Light = styled.span`
  display: block;
  width: 100%;
  height: 4px;
  background: rgb(240, 0, 0);
  border-radius: 0 0 2px 2px;
  box-shadow: 0px 0px 5px 0px rgb(255, 0, 0);
`

const LightLoading = Light.extend`
  box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
  background: rgb(255, 165, 0);
  animation: flashing 1s infinite;

  @keyframes flashing {
    0% {
      box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
    }
    50% {
      box-shadow: 0px 0px 5px 1px rgba(255, 200, 0, 1);
      background: rgb(255, 200, 0);
    }
    100% {
      box-shadow: 0px 0px 5px 0px rgba(255, 165, 0, 1);
    }
  }
`

const LightReady = Light.extend`
  background: #5ab946;
  box-shadow: 0px 0px 5px 0px rgb(0, 255, 64);
`

const ModalData = styled.div`
  max-width: 380px;
  text-align: center;
  padding: 20px 20px 30px;

  i {
    font-size: 64px;

    :before {
      color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
    }
  }

  h3 {
    margin-top: 10px;
    font-size: 18px;
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
  }

  p {
    font-size: 15px;
    font-weight: 300;

    span {
      color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
    }
  }
`

const InfoLink = styled.a`
  color: white;
  font-size: 12px;
  text-decoration: underline;

  :hover {
    color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
  }
`

export interface State {
  responseTime: number
  shouldLedgerDid: boolean
  isModalOpen: boolean
  modalResponse: string
  isLedgering: boolean
  ledgerPopupShown: boolean
}

export interface StateProps {
  ixo?: any
  keysafe?: any
}

export interface ParentProps {
  userInfo: any
  simpleHeader: boolean
  refreshProjects?: Function
  pingIxoExplorer: () => Promise<unknown>
  initUserInfo: Function
}
export interface Props extends StateProps, ParentProps {}

class Header extends React.Component<Props, State> {
  state = {
    responseTime: null,
    shouldLedgerDid: false,
    isModalOpen: false,
    modalResponse: '',
    isLedgering: false,
    ledgerPopupShown: false,
  }

  componentDidMount(): void {
    this.pingExplorer()
    // setTimeout(() => { this.props.initUserInfo(); }, 10000);
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.ixo !== this.props.ixo && this.props.ixo !== null) {
      this.pingExplorer()
    }
    if (
      this.props.userInfo &&
      prevProps.userInfo !== this.props.userInfo &&
      this.props.userInfo.loggedInKeysafe === true &&
      this.props.userInfo.ledgered === false &&
      this.state.isLedgering === false
    ) {
      this.setState({ shouldLedgerDid: true })
    }
    if (
      this.props.userInfo &&
      prevProps.userInfo !== this.props.userInfo &&
      this.props.userInfo.loggedInKeysafe === true &&
      this.props.userInfo.ledgered === true &&
      this.state.isLedgering === false
    ) {
      this.setState({ shouldLedgerDid: false })
    }
    if (
      this.state.shouldLedgerDid === true &&
      this.state.ledgerPopupShown === false
    ) {
      this.setState({ ledgerPopupShown: true })
      this.handleToggleModal(true)
    }
  }

  pingExplorer = (): void => {
    this.props
      .pingIxoExplorer()
      .then(res => {
        this.setState({ responseTime: res as number })
        // Only check every 30 sec if connected
        setTimeout(() => this.pingExplorer(), 30000)
      })
      .catch(error => {
        this.setState({ responseTime: error })
        // Only check every 5 sec if not connected
        setTimeout(() => this.pingExplorer(), 5000)
      })
  }

  renderStatusIndicator = (): JSX.Element => {
    return (
      <Ping>
        {this.renderLightIndicator()}
        <div className="d-none d-sm-block">{this.renderStatusMessage()}</div>
      </Ping>
    )
  }

  renderStatusMessage(): JSX.Element {
    if (this.props.ixo && this.state.responseTime > 0) {
      return (
        <StatusMessage>
          <p>Response time: {this.state.responseTime} ms</p>
        </StatusMessage>
      )
    } else {
      return (
        <StatusMessage>
          <p>
            IXO Explorer <br />
            not responding
          </p>
        </StatusMessage>
      )
    }
  }

  renderLightIndicator(): JSX.Element {
    if (this.props.ixo === null || this.state.responseTime === null) {
      return <LightLoading />
    } else if (this.props.ixo && this.state.responseTime !== 0) {
      return <LightReady />
    } else {
      return <Light />
    }
  }

  renderModalHeader = (): {
    title: string
    titleNoCaps: boolean
  } | null => {
    if (this.props.userInfo) {
      return {
        title: 'Hi, ' + this.props.userInfo.name,
        titleNoCaps: true,
      }
    } else {
      return null
    }
  }

  renderModalData = (): JSX.Element => {
    if (this.state.modalResponse.length > 0) {
      return (
        <ModalData>
          <p>{this.state.modalResponse}</p>
          <Button
            type={ButtonTypes.dark}
            onClick={(): void => this.handleToggleModal(false)}
          >
            CONTINUE
          </Button>
        </ModalData>
      )
    } else {
      return (
        <ModalData>
          <i className="icon-success" />
          <h3>YOU HAVE SUCCESSFULLY INSTALLED THE IXO KEYSAFE</h3>
          <p>
            <span>LAST STEP - </span>create your self-sovereign credentials on
            the ixo blockchain.
          </p>
          <Button type={ButtonTypes.dark} onClick={this.handleLedgerDid}>
            SIGN NOW USING KEYSAFE
          </Button>
          <InfoLink
            href="https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6"
            target="_blank"
          >
            Why do I need to sign my credentials?
          </InfoLink>
        </ModalData>
      )
    }
  }

  handleToggleModal = (isModalOpen: boolean): void => {
    this.setState({ isModalOpen: isModalOpen })
  }

  handleLedgerDid = (): void => {
    if (this.props.userInfo.didDoc) {
      const payload = { didDoc: this.props.userInfo.didDoc }
      this.props.keysafe.requestSigning(
        JSON.stringify(payload),
        (error, signature) => {
          this.setState({ isLedgering: true })
          if (!error) {
            this.props.ixo.user
              .registerUserDid(payload, signature)
              .then((response: any) => {
                if (response.code === 0) {
                  this.setState({
                    shouldLedgerDid: false,
                    modalResponse:
                      'Your credentials have been registered on the ixo blockchain. This will take a few seconds in the background, you can continue using the site.',
                  })
                } else {
                  this.setState({
                    modalResponse:
                      'Unable to ledger did at this time, please contact our support at support@ixo.world',
                  })
                }
              })
          }
        },
        'base64',
      )
    } else {
      this.setState({
        modalResponse:
          'We cannot find your keysafe information, please reach out to our support at support@ixo.world',
      })
    }
  }

  render(): JSX.Element {
    return (
      <TopBar className="container-fluid text-white">
        <ModalWrapper
          isModalOpen={this.state.isModalOpen}
          handleToggleModal={this.handleToggleModal}
          header={this.renderModalHeader()}
        >
          {this.renderModalData()}
        </ModalWrapper>
        <div className="row">
          <HeaderLeft
            simple={this.props.simpleHeader}
            refreshProjects={this.props.refreshProjects}
          />
          <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
            <HeaderRight
              renderStatusIndicator={this.renderStatusIndicator}
              userInfo={this.props.userInfo}
              simple={this.props.simpleHeader}
              shouldLedgerDid={this.state.shouldLedgerDid}
              toggleModal={this.handleToggleModal}
              keysafe={this.props.keysafe}
            />
          </MediaQuery>
        </div>
      </TopBar>
    )
  }
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
  return {
    ixo: state.ixoStore.ixo,
    keysafe: state.keysafeStore.keysafe,
  }
}

export const HeaderConnected = connect(mapStateToProps)(Header)
