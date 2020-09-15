import moment, { Moment } from 'moment'
import { Dispatch } from 'redux'
import Axios from 'axios'
import { EntityType } from '../types'
import {
  GetEntitiesAction,
  ChangeEntitiesTypeAction,
  FilterToggleUserEntitiesAction,
  FilterToggleFeaturedEntitiesAction,
  FilterTogglePopularEntitiesAction,
  FilterDatesAction,
  ResetDatesFilterAction,
  FilterAddCategoryTagAction,
  ResetCategoryFilterAction,
  ResetSectorFilterAction,
  ResetFiltersAction,
  EntitiesExplorerActions,
  FilterDDOCategoriesAction,
  DDOTagCategory,
  FilterCategoryTagAction,
  FilterSectorAction,
} from './types'
import { RootState } from 'common/redux/types'
// import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'

export const getEntities = () => (dispatch: Dispatch): GetEntitiesAction => {
  return dispatch({
    type: EntitiesExplorerActions.GetEntities,
    // Temp
    payload: Axios.get(
      'https://run.mocky.io/v3/5b95a5aa-46ef-4015-98ed-8dc0059c4ed5',
    ).then((response) => {
      // TODO - blocksyncApi.project.listProjects()
      return response.data.map((apiEntity: ApiListedEntity) => {
        const claimToUse = apiEntity.data.claims
          ? apiEntity.data.claims.items[0]
          : undefined

        return {
          did: apiEntity.projectDid,
          type: apiEntity.data['@type'],
          creatorDid: apiEntity.data.createdBy,
          status: apiEntity.status,
          name: apiEntity.data.name,
          description: apiEntity.data.description,
          dateCreated: moment(apiEntity.data.createdOn),
          ownerName: apiEntity.data.owner.displayName,
          location: apiEntity.data.location,
          goal: claimToUse ? claimToUse.goal : undefined,
          image: apiEntity.data.image,
          logo: apiEntity.data.logo,
          serviceProvidersCount: 10, // TODO - get actual value when this is available
          evaluatorsCount: 10, // TODO - get actual value when this is available
          requiredClaimsCount: claimToUse ? claimToUse.targetMin : undefined,
          pendingClaimsCount: claimToUse ? 3 : undefined, // TODO - get actual value when this is available
          successfulClaimsCount: claimToUse ? 10 : undefined, // TODO - get actual value when this is available
          rejectedClaimsCount: claimToUse ? 5 : undefined, // TODO - get actual value when this is available
          agentDids: [], // TODO - get actual value when this is available
          sdgs: apiEntity.data.sdgs,
          ddoTags: apiEntity.data.ddoTags
            ? apiEntity.data.ddoTags.map((ddoTag) => ({
                name: ddoTag.category,
                tags: ddoTag.tags,
              }))
            : [],
        }
      })
    }),
  })
}

export const changeEntitiesType = (
  type: EntityType,
): ChangeEntitiesTypeAction => ({
  type: EntitiesExplorerActions.ChangeEntitiesType,
  payload: {
    type,
  },
})

export const filterToggleUserEntities = (
  userEntities: boolean,
): FilterToggleUserEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleUserEntities,
  payload: {
    userEntities,
  },
})

export const filterToggleFeaturedEntities = (
  featuredEntities: boolean,
): FilterToggleFeaturedEntitiesAction => ({
  type: EntitiesExplorerActions.FilterToggleFeaturedEntities,
  payload: {
    featuredEntities,
  },
})

export const filterTogglePopularEntities = (
  popularEntities: boolean,
): FilterTogglePopularEntitiesAction => ({
  type: EntitiesExplorerActions.FilterTogglePopularEntities,
  payload: {
    popularEntities,
  },
})

export const filterDates = (
  dateFrom: Moment,
  dateTo: Moment,
): FilterDatesAction => ({
  type: EntitiesExplorerActions.FilterDates,
  payload: {
    dateFrom,
    dateTo,
  },
})

export const resetDatesFilter = (): ResetDatesFilterAction => ({
  type: EntitiesExplorerActions.ResetDatesFilter,
})

export const filterCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterCategoryTagAction => {
  const state = getState()

  const isCurrentlySelected = state.entities.filter.ddoTags.find(
    (filterCategory) =>
      filterCategory.name === category && filterCategory.tags.includes(tag),
  )

  return dispatch({
    type: EntitiesExplorerActions.FilterCategoryTag,
    payload: {
      category,
      tags: isCurrentlySelected ? [] : [tag],
    },
  })
}

export const filterAddCategoryTag = (category: string, tag: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): FilterAddCategoryTagAction => {
  const state = getState()

  const currentCategoryTags = state.entities.filter.ddoTags.find(
    (filterCategory) => filterCategory.name === category,
  ).tags

  const newCategoryTags = currentCategoryTags.includes(tag)
    ? [...currentCategoryTags.filter((val) => val !== tag)]
    : [...currentCategoryTags, tag]

  return dispatch({
    type: EntitiesExplorerActions.FilterAddCategoryTag,
    payload: {
      category,
      tags: newCategoryTags,
    },
  })
}

export const filterCategories = (
  categories: DDOTagCategory[],
): FilterDDOCategoriesAction => ({
  type: EntitiesExplorerActions.FilterDDOCategories,
  payload: { ddoTags: categories },
})
export const filterSector = (sector: string): FilterSectorAction => ({
  type: EntitiesExplorerActions.FilterSector,
  payload: { sector },
})

export const resetCategoryFilter = (
  category: string,
): ResetCategoryFilterAction => ({
  type: EntitiesExplorerActions.ResetCategoryFilter,
  payload: { category },
})

export const resetSectorFilter = (): ResetSectorFilterAction => ({
  type: EntitiesExplorerActions.ResetSectorFilter,
})

export const resetFilters = (): ResetFiltersAction => ({
  type: EntitiesExplorerActions.ResetFilters,
})
