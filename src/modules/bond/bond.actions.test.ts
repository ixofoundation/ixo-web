import axios from 'axios'
import mockStore from '../../common/redux/mockStore'
import * as SUT from './bond.actions'
import { BondActions } from './types'

const mockAxios = axios as jest.Mocked<typeof axios>
let store

beforeEach(() => {
  store = mockStore({})
})

describe('Bond Actions', () => {
  describe('getBalances', () => {
    it('should return a data array on success', async () => {
      const data = []

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the getBalances action creator with an address
      await store.dispatch(SUT.getBalances('some-symbol'))
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondActions.GetBalancesPending)
      expect(actions[1].type).toEqual(BondActions.GetBalancesSuccess)
      expect(actions[1].payload.data).toEqual(data)
    })

    it('should return an error on failure', async () => {
      const error = 'some-error'
      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      try {
        // when ... we call the getBalances action creator with an address
        await store.dispatch(SUT.getBalances('some-symbol'))
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(BondActions.GetBalancesPending)
        expect(actions[1].type).toEqual(BondActions.GetBalancesFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })

  describe('getTransactions', () => {
    it('should return a data array on success', async () => {
      const data = []

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data,
        }),
      )

      // when ... we call the getTransactions action creator with an address
      await store.dispatch(SUT.getTransactions())
      const actions = store.getActions()

      // then we should expect it to create actions with the correct types and payload
      expect.assertions(3)
      expect(actions[0].type).toEqual(BondActions.GetTradesPending)
      expect(actions[1].type).toEqual(BondActions.GetTradesSuccess)
      expect(actions[1].payload.data).toEqual(data)
    })

    it('should return an error on failure', async () => {
      const error = 'some-error'
      mockAxios.all.mockImplementationOnce(() =>
        Promise.reject({
          error,
        }),
      )

      // when ... we call the getTransactions action creator with an address

      try {
        await store.dispatch(SUT.getTransactions())
      } catch {
        const actions = store.getActions()

        // then we should expect it to create actions with the correct types and payload
        expect.assertions(3)
        expect(actions[0].type).toEqual(BondActions.GetTradesPending)
        expect(actions[1].type).toEqual(BondActions.GetTradesFailure)
        expect(actions[1].payload.error).toEqual(error)
      }
    })
  })
})
