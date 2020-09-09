import { Dispatch } from 'redux'
import { encode as base64Encode } from 'js-base64'
import {
  GoToStepAction,
  CreateEntityActions,
  NewEntityAction,
  CreateEntitySuccessAction,
  CreateEntityFailureAction,
} from './types'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { EntityType } from 'modules/EntityModules/Entities/types'
import { RootState } from 'common/redux/types'
import { PDS_URL } from 'modules/EntityModules/CreateEntity/types'
import * as createEntitySelectors from './CreateEntity.selectors'
import { createEntityMap } from './strategy-map'

export const goToStep = (step: number): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
})

export const newEntity = (entityType: EntityType) => (
  dispatch: Dispatch,
  getState: () => RootState,
): NewEntityAction => {
  const state = getState()
  const { entityType: currentEntityType, created } = state.createEntity

  if (currentEntityType === entityType && !created) {
    return null
  }

  return dispatch({
    type: CreateEntityActions.NewEntity,
    payload: {
      entityType,
    },
  })
}

export const createEntity = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): CreateEntitySuccessAction | CreateEntityFailureAction => {
  dispatch({
    type: CreateEntityActions.CreateEntityStart,
  })

  const state = getState()
  const entityType = state.createEntity.entityType

  // the page content data
  const pageData = `data:application/json;base64,${base64Encode(
    JSON.stringify(createEntityMap[entityType].selectPageContent(state)),
  )}`

  const uploadPageContent = blocksyncApi.project.createPublic(pageData, PDS_URL)

  Promise.all([uploadPageContent])
    .then((responses: any[]) => {
      const pageContentId = responses[0].result
      // the entity data with the page content resource id
      const entityData = JSON.stringify(
        createEntitySelectors.selectEntityApiPayload(
          entityType,
          pageContentId,
        )(state),
      )

      keysafe.requestSigning(
        entityData,
        (signError: any, signature: any): any => {
          if (signError) {
            return dispatch({
              type: CreateEntityActions.CreateEntityFailure,
              payload: {
                error: signError,
              },
            })
          }

          blocksyncApi.project
            .createProject(JSON.parse(entityData), signature, PDS_URL)
            .then((res: any) => {
              if (res.error) {
                return dispatch({
                  type: CreateEntityActions.CreateEntityFailure,
                  payload: {
                    error: res.error.message,
                  },
                })
              } else {
                return dispatch({
                  type: CreateEntityActions.CreateEntitySuccess,
                })
              }
            })
            .catch((error) => {
              return dispatch({
                type: CreateEntityActions.CreateEntityFailure,
                payload: {
                  error: error.message,
                },
              })
            })
        },
        'base64',
      )
    })
    .catch((error) => {
      return dispatch({
        type: CreateEntityActions.CreateEntityFailure,
        payload: {
          error: error.message,
        },
      })
    })

  return null
}
