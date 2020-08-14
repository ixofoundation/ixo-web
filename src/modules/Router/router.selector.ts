import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { RouterState } from 'connected-react-router'
export const selectRouter = (state: RootState): RouterState => state.router

export const selectPathnameProps = createSelector(
  selectRouter,
  (router: RouterState) => {
    return router.location.pathname
  },
)
