import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import './Exchange.css'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { BondsWrapperConnected as BondsWrapper } from '../BondsWrapper/BondsWrapper'
import BondBuy from '../../../../modules/BondBuy/BondBuy.container'
import BondSell from '../../../../modules/BondSell/BondSell.container'
import BondSwap from '../../../../modules/BondSwap/BondSwap.container'
import { BondsSectionNav } from './Exchange.styles'
import * as bondBuySelectors from '../../../../modules/BondBuy/BondBuy.selectors'
import * as bondSellSelectors from '../../../../modules/BondSell/BondSell.selectors'
import * as bondSwapSelectors from '../../../../modules/BondSwap/BondSwap.selectors'
import { isActiveRoute } from '../.././../utils/isActiveRoute'

interface Props {
  match: any
  transacting: boolean
  activeBondType: string
}

class Exchange extends Component<Props> {
  render(): JSX.Element {
    const { projectDID, bondDID } = this.props.match.params

    return (
      <BondsWrapper {...this.props.match}>
        <div className="BondsWrapper_panel exchange_panel">
          {/*<b style={{fontSize: 'calc(10px + 2vmin)'}}>Balances</b>
              <div className="BondsWrapper_panel__content"></div>*/}
          <BondsSectionNav>
            <NavLink
              to={
                !this.props.transacting
                  ? `/projects/${projectDID}/bonds/${bondDID}/exchange/`
                  : '#'
              }
              isActive={(match, location): boolean =>
                isActiveRoute(match, location, ['/buy'])
              }
              exact
              className="tablinks_tablink"
            >
              Buy
            </NavLink>
            <NavLink
              to={
                !this.props.transacting
                  ? `/projects/${projectDID}/bonds/${bondDID}/exchange/sell`
                  : '#'
              }
              isActive={(match, location): boolean =>
                isActiveRoute(match, location, ['/sell'])
              }
              className="tablinks_tablink"
            >
              Sell
            </NavLink>
            {this.props.activeBondType == 'swapper_function' ? (
              <NavLink
                to={
                  !this.props.transacting
                    ? `/projects/${projectDID}/bonds/${bondDID}/exchange/swap`
                    : '#'
                }
                isActive={(match, location): boolean =>
                  isActiveRoute(match, location, ['/swap'])
                }
                className="tablinks_tablink"
              >
                Swap
              </NavLink>
            ) : (
              undefined
            )}
          </BondsSectionNav>
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/buy`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/buy/confirm`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/`,
            ]}
            render={(): JSX.Element => <BondBuy {...this.props.match.params} />}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/sell`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/sell/confirm`,
            ]}
            render={(): JSX.Element => (
              <BondSell {...this.props.match.params} />
            )}
          />
          <Route
            exact
            path={[
              `/projects/${projectDID}/bonds/${bondDID}/exchange/swap`,
              `/projects/${projectDID}/bonds/${bondDID}/exchange/swap/confirm`,
            ]}
            render={(): JSX.Element => (
              <BondSwap {...this.props.match.params} />
            )}
          />
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  transacting:
    bondSellSelectors.selectBondSellTransacting(state) ||
    bondBuySelectors.selectBondBuyTransacting(state) ||
    bondSwapSelectors.selectBondSwapTransacting(state),
  activeBondType: state.activeBond.type,
})

export default connect(mapStateToProps)(Exchange)
