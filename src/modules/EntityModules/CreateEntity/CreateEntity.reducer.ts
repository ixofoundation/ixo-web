import {
  CreateEntityState,
  CreateEntityActionTypes,
  CreateEntityActions,
} from './types'

export const initialState: CreateEntityState = {
  step: 1,
  entityType: null,
  creating: false,
  created: false,
  error: null,
}

export const reducer = (
  state = initialState,
  action: CreateEntityActionTypes,
): CreateEntityState => {
  switch (action.type) {
    case CreateEntityActions.GoToStep:
      return {
        ...state,
        step: action.payload.step,
      }
    case CreateEntityActions.NewEntity:
      return {
        ...initialState,
        entityType: action.payload.entityType,
      }
    case CreateEntityActions.CreateEntityStart:
      return {
        ...state,
        creating: true,
        error: null,
      }
    case CreateEntityActions.CreateEntitySuccess:
      return {
        ...state,
        creating: false,
        created: true,
        error: null,
      }
    case CreateEntityActions.CreateEntityFailure:
      return {
        ...state,
        creating: false,
        error: action.payload.error,
      }
  }

  return state
}
