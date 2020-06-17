import React, { Dispatch } from 'react'
import { RouteProps } from 'react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  ActionWrapper,
  AssistantWrapper,
  AssistantHeader,
  SummaryWrapper,
} from '../../components/project/ControlPanel/Actions/Actions.styles'
import Assistant, {
  startAssistant,
} from '../../common/components/Assistant/Assistant'
import FuelEntityConfirmOrder from './components/FuelEntityConfirmOrder/FuelEntityConfirmOrder'
import { RootState } from 'src/common/redux/types'
import * as fuelEntitySelectors from './FuelEntity.selectors'
import { getOrder, confirmOrder, cancelOrder } from './FuelEntity.actions'
import BackIcon from '../../assets/icons/Back'
import ChatbotIcon from '../../assets/icons/Chatbot'

interface Props {
  match: any
  subscription: string
  symbol: string
  amount: string
  fiatAmount: string
  fiatConversionRate: string
  transactionFee: string
  fiatTransactionFee: string
  gasFee: string
  total: string
  fiatTotal: string
  hasOrder: boolean
  sending: boolean
  sent: boolean
  error: string
  handleGetOrder: (assistantResponse: any) => void
  handleConfirmOrder: (entityDid: string) => void
  handleCancelOrder: () => void
}

class FuelEntity extends React.Component<Props & RouteProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount(): void {
    startAssistant('fuel_my_entity')
  }

  onAssistantMessageReceive = (utter: any): void => {
    // TODO - actual event to trigger end
    // if (utter.text === "Sorry, I didn't get that. Could you rephrase?") {

    // TODO - actual response to pass to handleGetOrder
    this.props.handleGetOrder(null)
    // }
  }

  render(): JSX.Element {
    const {
      match: {
        params: { projectDID },
      },
      subscription,
      symbol,
      amount,
      fiatAmount,
      fiatConversionRate,
      transactionFee,
      fiatTransactionFee,
      gasFee,
      total,
      fiatTotal,
      hasOrder,
      sending,
      sent,
      error,
      handleConfirmOrder,
      handleCancelOrder,
    } = this.props

    const hasError = !!error

    return (
      <ActionWrapper className="open">
        {!sending && !sent && !hasOrder && (
          <AssistantWrapper>
            <AssistantHeader>
              <h3 className="assistant-heading">
                <span className="chatbot-icon">
                  <ChatbotIcon />
                </span>
                Pixo
              </h3>
              <NavLink
                to={`/projects/${projectDID}/overview`}
                className="back-icon"
              >
                <BackIcon width="18" />
              </NavLink>
            </AssistantHeader>
            <Assistant onMessageReceive={this.onAssistantMessageReceive} />
          </AssistantWrapper>
        )}
        {!sending && !sent && hasOrder && !hasError && (
          <SummaryWrapper>
            <FuelEntityConfirmOrder
              subscription={subscription}
              symbol={symbol}
              amount={amount}
              fiatAmount={fiatAmount}
              fiatConversionRate={fiatConversionRate}
              transactionFee={transactionFee}
              fiatTransactionFee={fiatTransactionFee}
              gasFee={gasFee}
              total={total}
              fiatTotal={fiatTotal}
              handleConfirmOrder={(): void => handleConfirmOrder(projectDID)}
              handleCancelOrder={(): void => handleCancelOrder()}
            />
          </SummaryWrapper>
        )}
        {sending && <div>Sending</div>}
        {sent && <div>Sent</div>}
        {hasError && <div>{error}</div>}
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  subscription: fuelEntitySelectors.selectOrderSubscription(state),
  symbol: fuelEntitySelectors.selectOrderSymbol(state),
  amount: fuelEntitySelectors.selectOrderTokenAmount(state),
  fiatAmount: fuelEntitySelectors.selectOrderFiatAmount(state),
  fiatConversionRate: fuelEntitySelectors.selectOrderFiatConversionRate(state),
  transactionFee: fuelEntitySelectors.selectOrderTokenTransactionFee(state),
  fiatTransactionFee: fuelEntitySelectors.selectOrderFiatTransactionFee(state),
  gasFee: fuelEntitySelectors.selectOrderGasFee(state),
  total: fuelEntitySelectors.selectOrderTokenTotal(state),
  fiatTotal: fuelEntitySelectors.selectOrderFiatTotal(state),
  hasOrder: fuelEntitySelectors.selectHasOrder(state),
  sending: fuelEntitySelectors.selectSending(state),
  error: fuelEntitySelectors.selectError(state),
  sent: fuelEntitySelectors.selectSent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrder: (assistantResponse: any): void =>
    dispatch(getOrder(assistantResponse)),
  handleConfirmOrder: (entityDid: string): void =>
    dispatch(confirmOrder(entityDid)), // TODO remove entityDid once projects refactored
  handleCancelOrder: (): void => dispatch(cancelOrder()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelEntity)
