import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { BondSellState } from './types'
import { Currency } from 'src/types/models'

export const selectBondSell = (state: RootState): BondSellState =>
  state.bondSell

export const selectBondSellTotalFee = createSelector(
  selectBondSell,
  (bondSell: BondSellState): Currency => bondSell.totalFee,
)

export const selectBondSellMinPrice = createSelector(
  selectBondSell,
  (bondSell: BondSellState): Currency => bondSell.minPrice,
)

export const selectBondSellReceiving = createSelector(
  selectBondSell,
  (bondSell: BondSellState): Currency => bondSell.receiving,
)

export const selectBondSellSending = createSelector(
  selectBondSell,
  (bondSell: BondSellState): Currency => bondSell.sending,
)

export const selectBondSellSignPending = createSelector(
  selectBondSell,
  (bondSell: BondSellState): boolean => bondSell.signPending,
)

export const selectBondSellQuotePending = createSelector(
  selectBondSell,
  (bondSell: BondSellState): boolean => bondSell.quotePending,
)

export const selectBondSellTransacting = createSelector(
  selectBondSell,
  (bondSell: BondSellState): boolean => bondSell.transacting,
)

export const selectBondSellIsSending = createSelector(
  selectBondSell,
  (bondSell: BondSellState): boolean => !!bondSell.sending,
)

export const selectBondSellPriceEstimate = createSelector(
  selectBondSellReceiving,
  selectBondSellSending,
  (receiving: Currency, sending: Currency) => ({
    amount: receiving.amount / sending.amount,
    denom: receiving.denom,
  }),
)
