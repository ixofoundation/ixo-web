import { EntityType } from '../Entities/types'
import { RootState } from 'common/redux/types'

export const PDS_URL = process.env.REACT_APP_PDS_URL

export interface CreateEntityState {
  step: number
  entityType: EntityType
  creating: boolean
  created: boolean
  error: string
}

export enum CreateEntityActions {
  GoToStep = 'ixo/CreateEntity/GO_TO_STEP',
  NewEntity = 'ixo/CreateEntity/NEW_ENTITY',
  CreateEntity = 'ixo/CreateEntity/CREATE_ENTITY',
  CreateEntityStart = 'ixo/CreateEntity/CREATE_ENTITY_START',
  CreateEntitySuccess = 'ixo/CreateEntity/CREATE_ENTITY_SUCCESS',
  CreateEntityFailure = 'ixo/CreateEntity/CREATE_ENTITY_FAILURE',
}

export interface FileContent {
  fileSrc: string
  uploading: boolean
}

export interface Validation {
  identifier: string
  validated: boolean
  errors: string[]
}

export type EntityStepStrategyMap = {
  [TKey in EntityType]: {
    stepCount: number
    steps: {
      [stepNumber: number]: {
        container: any
        url: string
        name: string
        previousStep: number
        nextStep: number
      }
    }
    selectPageContent: (state: RootState) => any
    selectHeaderInfo: (
      state: RootState,
    ) => {
      name: string
      description: string
      image: string
      imageDescription: string
      location: string
      sdgs: string[]
    }
  }
}

export interface FormCardProps {
  ref: any
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
  handleRemoveSection?: () => void
}

export interface GoToStepAction {
  type: typeof CreateEntityActions.GoToStep
  payload: {
    step: number
  }
}

export interface NewEntityAction {
  type: typeof CreateEntityActions.NewEntity
  payload: {
    entityType: EntityType
  }
}

export interface CreateEntityAction {
  type: typeof CreateEntityActions.CreateEntity
  payload: Promise<any>
}

export interface CreateEntityStartAction {
  type: typeof CreateEntityActions.CreateEntityStart
}

export interface CreateEntitySuccessAction {
  type: typeof CreateEntityActions.CreateEntitySuccess
}

export interface CreateEntityFailureAction {
  type: typeof CreateEntityActions.CreateEntityFailure
  payload: {
    error
  }
}

export type CreateEntityActionTypes =
  | GoToStepAction
  | NewEntityAction
  | CreateEntityAction
  | CreateEntityStartAction
  | CreateEntitySuccessAction
  | CreateEntityFailureAction
