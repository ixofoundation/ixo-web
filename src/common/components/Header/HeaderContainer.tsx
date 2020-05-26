import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/types'
import { HeaderLeft } from './HeaderLeft/HeaderLeft'
import { HeaderRight } from './HeaderRight/HeaderRight'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../lib/commonData'
import { ModalWrapper } from 'src/components/common/ModalWrapper'
import { ButtonTypes, Button } from '../../../components/common/Buttons'
import {
  InfoLink,
  Light,
  LightLoading,
  LightReady,
  ModalData,
  Ping,
  StatusMessage,
  TopBar,
} from './HeaderContainer.styles'
import Success from '../../../assets/icons/Success'

export interface State {
  responseTime: number
  shouldLedgerDid: boolean
  isModalOpen: boolean
  modalResponse: string
  isLedgering: boolean
  ledgerPopupShown: boolean
  isMobileMenuOpen: boolean
}

export interface StateProps {
  ixo?: any
  keysafe?: any
}

export interface ParentProps {
  userInfo: any
  simpleHeader: boolean
  pingIxoExplorer: () => Promise<unknown>
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
    isMobileMenuOpen: false,
  }

  componentDidMount(): void {
    this.pingExplorer()
  }

  handleBurgerClick = (): void => {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
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
        setTimeout((): void => this.pingExplorer(), 30000)
      })
      .catch(error => {
        this.setState({ responseTime: error })
        // Only check every 5 sec if not connected
        setTimeout((): void => this.pingExplorer(), 5000)
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
    titleNoCaps?: boolean
  } => {
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
          <Success width="64" fill="#49BFE0" />
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
      <TopBar
        className={`container-fluid text-white ${
          this.state.isMobileMenuOpen === true ? 'openMenu' : ''
        }`}
      >
        <ModalWrapper
          isModalOpen={this.state.isModalOpen}
          handleToggleModal={this.handleToggleModal}
          header={this.renderModalHeader()}
        >
          {this.renderModalData()}
        </ModalWrapper>
        <div className="row">
          <HeaderLeft
            openMenu={this.state.isMobileMenuOpen}
            handleBurgerClick={this.handleBurgerClick}
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

function mapStateToProps(state: RootState): StateProps {
  return {
    ixo: state.ixo.ixo,
    keysafe: state.keySafe.keysafe,
  }
}

export const HeaderConnected = connect(mapStateToProps)(Header)
