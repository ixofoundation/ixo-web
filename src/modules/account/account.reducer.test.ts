import * as SUT from './account.reducer'
import {
  AccountActions,
  GetBalancesSuccessAction,
  GetOrdersSuccessAction,
} from './types'

const initialState = SUT.initialState

describe('Account Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('GetBalancesSuccess Action', () => {
    it('should return a new copy of state, with the balances set', () => {
      const payload = {
        data: [
          { amount: 100, denom: 'abc' },
          { amount: 200, denom: 'def' },
          { amount: 300, denom: 'def' },
        ],
      }
      // ... we create a getBalances action
      const action: GetBalancesSuccessAction = {
        type: AccountActions.GetBalancesSuccess,
        payload,
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({ ...initialState, balances: payload.data })
    })
  })

  describe('GetOrdersSuccess Action', () => {
    it('should return a new copy of state, with the balances set', () => {
      const payload = [
        {
          data: [
            { id: 1, prop1: 'value1' },
            { id: 2, prop1: 'value2' },
            { id: 3, prop1: 'value3' },
          ],
        },
        {
          data: [
            { id: 4, prop1: 'value1' },
            { id: 5, prop1: 'value2' },
            { id: 6, prop1: 'value3' },
          ],
        },
        {
          data: [
            { id: 7, prop1: 'value1' },
            { id: 8, prop1: 'value2' },
            { id: 9, prop1: 'value3' },
          ],
        },
      ]

      // ... we create a getBalances action
      const action: GetOrdersSuccessAction = {
        type: AccountActions.GetOrdersSuccess,
        payload,
      }

      // when ... we run the reducer and pass it our initial state and this action
      const state = SUT.reducer(initialState, action)

      // then the state should be set as expected
      expect(state).toEqual({
        ...initialState,
        orders: [
          { id: 1, prop1: 'value1' },
          { id: 2, prop1: 'value2' },
          { id: 3, prop1: 'value3' },
          { id: 4, prop1: 'value1' },
          { id: 5, prop1: 'value2' },
          { id: 6, prop1: 'value3' },
          { id: 7, prop1: 'value1' },
          { id: 8, prop1: 'value2' },
          { id: 9, prop1: 'value3' },
        ],
      })
    })
  })
})
