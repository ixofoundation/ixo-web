import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import './Exchange.css'
import { QuoteActions } from '../../../model/quote'
import { connect } from 'react-redux'
import { Store } from '../../../model/store'
import BondsWrapper from '../BondsWrapper'
import Buy from './buy/Buy'
import Sell from './sell/Sell'
import Swap from './swap/Swap'
import styled from 'styled-components'

const BondsSectionNav = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  a {
    font-weight: normal;
    font-size: 1.1875rem;
    text-transform: uppercase;
    text-decoration: none;

    color: #ffffff;
    padding: 0.25rem 1.5rem;
    &.active {
      color: #87def6;
    }
    &:hover {
      text-decoration: none;
      color: #87def6;
    }
  }
`

class Exchange extends Component<any> {
  // console.log(this.props)
  componentDidMount(): void {
    this.props.dispatch({
      type: QuoteActions.QUOTE_BUY + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.QUOTE_SELL + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.QUOTE_SWAP + '_FAILED',
    })
    this.props.dispatch({
      type: QuoteActions.CONFIRM_QUOTE + '_FAILED',
    })
  }

  isActive = (m: any, l: any, paths: [string]): boolean => {
    let active = m != undefined
    paths.forEach((path: string) => {
      active = active || l.pathname.indexOf(path) != -1
    })
    return active
  }

  render(): JSX.Element {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel exchange_panel">
          {/*<b style={{fontSize: 'calc(10px + 2vmin)'}}>Balances</b>
              <div className="BondsWrapper_panel__content"></div>*/}
          <BondsSectionNav>
            <NavLink
              to={!this.props.transacting ? '/bonds/exchange/' : '#'}
              isActive={(m, l): boolean => this.isActive(m, l, ['/buy'])}
              exact
              className="tablinks_tablink"
            >
              Buy
            </NavLink>
            <NavLink
              to={!this.props.transacting ? '/bonds/exchange/sell' : '#'}
              isActive={(m, l): boolean => this.isActive(m, l, ['/sell'])}
              className="tablinks_tablink"
            >
              Sell
            </NavLink>
            {this.props.activeBond.type == 'swapper_function' ? (
              <NavLink
                to={!this.props.transacting ? '/bonds/exchange/swap' : '#'}
                isActive={(m, l): boolean => this.isActive(m, l, ['/swap'])}
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
              '/bonds/exchange/buy',
              '/bonds/exchange/buy/confirm',
              '/bonds/exchange/',
            ]}
            component={Buy}
          />
          <Route
            exact
            path={['/bonds/exchange/sell', '/bonds/exchange/sell/confirm']}
            component={Sell}
          />
          <Route
            exact
            path={['/bonds/exchange/swap', '/bonds/exchange/swap/confirm']}
            component={Swap}
          />
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: Store): Store {
  return state
}

export default connect(mapStateToProps)(Exchange)
