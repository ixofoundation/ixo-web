import Axios from 'axios'
import { BondActions, GetBalancesAction, GetTradesAction } from './types'
import { Dispatch } from 'redux'

export const getBalances = (symbol: string) => (
  dispatch: Dispatch,
): GetBalancesAction => {
  const bondRequest = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/bonds/' + symbol,
    {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).result.value
        },
      ],
    },
  )
  const priceRequest = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/bonds/' +
      symbol +
      '/current_price',
    {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).result[0]
        },
      ],
    },
  )

  return dispatch({
    type: BondActions.GetBalances,
    payload: Axios.all([bondRequest, priceRequest]),
  })
}

/*.then(
      Axios.spread((...responses) => {
        const bond = responses[0].data.result.value
        const price = responses[1].data.result[0]

        return {
          symbol: bond.token,
          name: bond.name,
          address: bond.feeAddress,
          type: bond.function_type,
          collateral: bond.current_supply,
          totalSupply: bond.max_supply,
          price: price,
          alpha: 0,
          alphaDate: new Date(),
        }
      }),
    ), */

export const getTransactions = () => (dispatch: Dispatch): GetTradesAction => {
  // TODO: Select Specific token
  // TODO: Are queries disappearing?

  const config = {
    transformResponse: [
      (response: string): any => {
        return JSON.parse(response).txs
      },
    ],
  }

  const buyReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=buy',
    config,
  )
  const sellReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=sell',
    config,
  )
  const swapReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/txs?message.action=swap',
    config,
  )

  return dispatch({
    type: BondActions.GetTrades,
    payload: Axios.all([buyReq, sellReq, swapReq]),
  })
}

/* export const getTotalSupplies = (): any => {
  return {
    type: 'BondActions.GET_TOTAL_SUPPLIES',
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/supply/total',
    ).then(response => {
      const supplies = response.data.result

      return supplies
    }),
  }
}
 */
