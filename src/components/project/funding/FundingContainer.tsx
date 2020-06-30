import * as React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Web3Proxy from 'src/modules/web3/util/Web3Proxy'
import * as Toast from '../../../common/utils/Toast'
import { Web3Acc } from 'src/modules/web3/web3'
import { FundingGauge } from './FundingGauge'
import { FundingButton } from './FundingButton'
import { Fragment } from 'react'
import { ModalWrapper } from 'src/common/components/Wrappers/ModalWrapper'
import { successToast, errorToast } from '../../../common/utils/Toast'
import { Button, ButtonTypes } from 'src/common/components/Form/Buttons'
import { BigNumber } from 'bignumber.js'
import { Header } from '../../../types/models'

declare const ethereum: any

const FundingWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00293e;
  color: white;
  height: 80px;
  z-index: 99;
  display: flex;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #0c3550;

  .container {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex: 1;
  }

  .row > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .row > div:first-child {
    border-right: 1px solid #033c50;
  }

  ol {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    margin: 0;

    li {
      margin: 0 30px;
      font-family: ${/* eslint-disable-line */ props =>
        props.theme.fontRobotoCondensed};
      font-size: 12px;
      font-weight: 400;
      color: props => props.theme.fontBlue;
      opacity: 0.4;

      &.active {
        color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
        opacity: 1;
      }
    }
  }

  .row > div:last-child {
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
  }
`

export const ModalContent = styled.div`
  p {
    font-size: 15px;
    margin-bottom: 0;
    padding: 0 20px;
  }

  a {
    margin-top: 40px;
  }
`

export enum Web3Accounts {
  project = 'PROJECT',
  user = 'USER',
}

export interface ParentProps {
  projectDid: string
  projectURL: string
  projectIxoRequired: number
  projectStatus: string
}

export interface State {
  web3error: string
  projectAccount: Web3Acc
  account: Web3Acc
  isModalOpen: boolean
  creatingProjectWallet: boolean
  fundingProject: boolean
  modalData: any
}

export interface StateProps {
  web3: any
  error: any
  ixo?: any
  keysafe?: any
  userInfo: any
}

export interface Props extends ParentProps, StateProps {}
export class Funding extends React.Component<Props, State> {
  state = {
    isModalOpen: false,
    web3error: null,
    account: {
      address: null,
      balance: null,
    },
    projectAccount: {
      address: null,
      balance: null,
    },
    creatingProjectWallet: false,
    fundingProject: false,
    modalData: {
      header: {
        title: '',
        icon: null,
      },
      content: '',
    },
  }

  private projectWeb3 = null
  private checkInterval = null

  componentDidMount(): void {
    if (this.props.web3 === null) {
      this.setState({ web3error: this.props.error })
    } else {
      ethereum.enable() // Request account access if needed
      this.projectWeb3 = new Web3Proxy(this.props.web3)
      this.checkInterval = setInterval(this.handleCheckAccount, 3000)
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (
      this.props.projectStatus === 'FUNDED' &&
      prevProps.projectStatus !== null &&
      this.props.projectStatus !== prevProps.projectStatus
    ) {
      const content = (
        <ModalContent>
          <p>Your project wallet has been funded.</p>
          <p>This project now has fuel to launch.</p>
          <p>
            Prepare for <strong>IMPACT</strong>.
          </p>
          <Button
            type={ButtonTypes.dark}
            onClick={(): void => this.toggleModal(false)}
          >
            CLOSE
          </Button>
        </ModalContent>
      )

      const modalData = {
        header: {
          icon: (
            <i
              className="icon-approved"
              style={{ fontSize: '40px', color: '#4A9F46' }}
            />
          ),
          title: 'SUCCESS',
        },
        content: content,
      }
      this.setState({
        fundingProject: false,
        modalData: modalData,
      })

      this.toggleModal(true)
    }
  }

  renderModalHeader = (): Header => {
    return {
      title: this.state.modalData.header.title,
      icon: this.state.modalData.header.icon,
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.checkInterval)
  }

  handleCheckAccount = (): void => {
    this.props.web3.eth.getAccounts((err: any, acc: any) => {
      if (!err) {
        if (acc[0]) {
          const tempAcc = Object.assign({}, this.state.account)
          tempAcc.address = acc[0]
          this.setState({
            web3error: null,
            account: tempAcc,
          })
          this.handleCheckIxoBalance(Web3Accounts.user)
          this.handleGetProjectWalletAddres()
        } else {
          this.setState({ web3error: 'SIGN IN TO METAMASK' })
        }
      }
    })

    if (this.props.projectStatus === 'FUNDED') {
      this.setState({ fundingProject: false })
    }
    if (
      this.state.projectAccount.address !== null &&
      this.state.projectAccount.address !==
        '0x0000000000000000000000000000000000000000' &&
      this.state.creatingProjectWallet === true
    ) {
      this.setState({ creatingProjectWallet: false })
    }
  }

  // handleCheckEthBalance = () => {

  // 	this.props.web3.eth.getAccounts((err: any, acc: any) => {
  // 		if (!err) {
  // 			this.props.web3.eth.getBalance(acc[0], (error, balance) => {
  // 				if (!error) {
  // 					let tempAcc = Object.assign({}, this.state.account);
  // 					tempAcc.balance = balance;
  // 					this.setState({
  // 						web3error: null,
  // 						account: tempAcc
  // 					});
  // 				}
  // 			});
  // 		}
  // 	});
  // }

  handleCheckIxoBalance = (accountType: Web3Accounts): void => {
    let addressToUse = null

    if (accountType === Web3Accounts.project) {
      addressToUse = this.state.projectAccount.address
    } else {
      addressToUse = this.state.account.address
    }

    this.projectWeb3.getIxoBalance(addressToUse).then(balance => {
      const tempAcc = Object.assign({}, this.state.account)
      tempAcc.balance = balance
      if (accountType === Web3Accounts.project) {
        this.setState({
          projectAccount: tempAcc,
        })
      } else {
        this.setState({
          web3error: null,
          account: tempAcc,
        })
      }
    })
  }

  handleCreateWallet = (): void => {
    this.projectWeb3.createEthProjectWallet(this.props.projectDid).then(res => {
      if (res === 'creating') {
        this.setState({ creatingProjectWallet: true })
      }
    })
  }

  handleGetProjectWalletAddres = (): void => {
    this.projectWeb3
      .getProjectWalletAddress(this.props.projectDid)
      .then(res => {
        const projectAccount = Object.assign({}, this.state.projectAccount)
        projectAccount.address = res
        this.setState({ projectAccount: projectAccount })
      })
  }

  handleFundProjectWallet = async (): Promise<void> => {
    await this.handleGetProjectWalletAddres()

    let ixoToSend = new BigNumber(this.props.projectIxoRequired)
    ixoToSend = ixoToSend.multipliedBy(100000000)
    this.projectWeb3
      .fundEthProjectWallet(
        this.state.projectAccount.address,
        this.state.account.address,
        ixoToSend.toNumber(),
      )
      .then(txnHash => {
        this.setState({ fundingProject: true })
        const statusObj = {
          projectDid: this.props.projectDid,
          status: 'PENDING',
          txnID: txnHash,
        }

        const signature = {
          creator: this.props.userInfo.didDoc.did,
          created: new Date(),
        }

        this.props.ixo.project
          .fundProject(statusObj, signature, this.props.projectURL)
          .then(res => {
            if (res.error) {
              Toast.errorToast(res.error.message)
            } else {
              Toast.successToast(
                `Successfully updated project status to ${statusObj.status}`,
              )
            }
          })
      })
  }

  handleStartProject = (): void => {
    const statusObj = {
      projectDid: this.props.projectDid,
      status: 'STARTED',
    }
    this.handleUpdateProjectStatus(statusObj)
  }

  handleUpdateProjectStatus = (statusData): void => {
    this.props.keysafe.requestSigning(
      JSON.stringify(statusData),
      (error: any, signature: any) => {
        if (!error) {
          this.props.ixo.project
            .updateProjectStatus(statusData, signature, this.props.projectURL)
            .then(res => {
              if (res.error) {
                Toast.errorToast(res.error.message)
              } else {
                Toast.successToast(
                  `Successfully updated project status to ${statusData.status}`,
                )
              }
            })
        } else {
          Toast.errorToast('PDS is not responding')
        }
      },
      'base64',
    )
  }

  handleStopProject = async (): Promise<void> => {
    if (
      this.state.projectAccount.address &&
      this.state.projectAccount.address !==
        '0x0000000000000000000000000000000000000000'
    ) {
      const statusObj = {
        projectDid: this.props.projectDid,
        status: 'STOPPED',
      }
      this.handleUpdateProjectStatus(statusObj)
    }
  }

  handlePayOutProject = async (): Promise<void> => {
    if (
      this.state.projectAccount.address &&
      this.state.projectAccount.address !==
        '0x0000000000000000000000000000000000000000'
    ) {
      const statusObj = {
        projectDid: this.props.projectDid,
        status: 'PAIDOUT',
      }
      this.handleUpdateProjectStatus(statusObj)
    }
  }

  handleWithdrawFunds = (): void => {
    if (this.props.userInfo) {
      const payload = {
        data: {
          projectDid: this.props.projectDid,
          ethWallet: this.state.account.address,
          isRefund: true,
        },
        senderDid: this.props.userInfo.didDoc.did,
      }
      // need to add amount: ethAmt property for withdrawel

      this.props.keysafe.requestSigning(
        JSON.stringify(payload),
        (error, signature) => {
          if (!error) {
            this.props.ixo.project
              .payOutToEthWallet(payload, signature)
              .then((response: any) => {
                if (response.code === 0) {
                  successToast('Withdraw requested successfully')
                } else {
                  errorToast('Unable to request a withdrawel at this time')
                }
              })
          }
        },
        'base64',
      )
    } else {
      errorToast('we not find your did')
    }
  }

  renderModalData = (): string => {
    return this.state.modalData.content
  }

  toggleModal = (isModalOpen: boolean): void => {
    this.setState({ isModalOpen: isModalOpen })
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <ModalWrapper
          isModalOpen={this.state.isModalOpen}
          handleToggleModal={this.toggleModal}
          header={this.renderModalHeader()}
        >
          {this.renderModalData()}
        </ModalWrapper>
        <FundingWrapper className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <ol>
                <li
                  onClick={(): void =>
                    this.handleCheckIxoBalance(Web3Accounts.project)
                  }
                >
                  Check project balance
                </li>
                <li
                  className={
                    this.props.projectStatus === 'CREATED' &&
                    this.state.projectAccount.address === null
                      ? 'active'
                      : ''
                  }
                >
                  SETUP
                </li>
                <li
                  className={
                    this.props.projectStatus === 'CREATED' &&
                    this.state.projectAccount.address ===
                      '0x0000000000000000000000000000000000000000'
                      ? 'active'
                      : ''
                  }
                >
                  CREATE WALLET
                </li>
                <li
                  className={
                    this.state.projectAccount.address !== null &&
                    this.state.projectAccount.address !==
                      '0x0000000000000000000000000000000000000000'
                      ? 'active'
                      : ''
                  }
                >
                  FUEL
                </li>
              </ol>
            </div>
            <div className="col-md-6">
              <FundingGauge
                web3error={this.state.web3error}
                account={this.state.account}
                requiredIxo={this.props.projectIxoRequired}
                projectStatus={this.props.projectStatus}
              />
              <FundingButton
                projectWalletAddress={this.state.projectAccount.address}
                account={this.state.account}
                createProjectWallet={this.handleCreateWallet}
                requiredIxo={this.props.projectIxoRequired}
                web3error={this.state.web3error}
                creatingWallet={this.state.creatingProjectWallet}
                fundingProject={this.state.fundingProject}
                fundProject={this.handleFundProjectWallet}
                projectStatus={this.props.projectStatus}
                startProject={this.handleStartProject}
                stopProject={this.handleStopProject}
                payoutPhase={this.handlePayOutProject}
                withdrawFunds={this.handleWithdrawFunds}
              />
            </div>
          </div>
        </FundingWrapper>
      </Fragment>
    )
  }
}

function mapStateToProps(
  state: RootState,
  ownProps: ParentProps,
): Record<string, any> {
  return {
    web3: state.web3.web3,
    keysafe: state.keySafe.keysafe,
    ixo: state.ixo.ixo,
    projectDid: ownProps.projectDid,
    projectURL: ownProps.projectURL,
    projectIxoRequired: ownProps.projectIxoRequired,
    error: state.web3.error,
    userInfo: state.account.userInfo,
  }
}

export const FundingContainer = connect(mapStateToProps)(Funding as any)
