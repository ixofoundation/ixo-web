import React, { Component } from 'react'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import { getOrders } from '../../../modules/account/account.actions'
import TransactionsTable from '../TransactionsTable'
import BondsWrapper from '../BondsWrapper'

class Orders extends Component<any> {
  state = { list: [] }

  constructor(props: any) {
    super(props)

    this.state = { list: [] }
  }

  componentDidMount(): void {
    // dispatch a fetch
    this.props.dispatch(getOrders(this.props.account.address))
  }

  render(): JSX.Element {
    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel orders_panel">
          <TransactionsTable txs={this.props.account.orders} />
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Orders)
