import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { CreateEntityAdvancedState } from './types'

export const selectAdvanced = (state: RootState): CreateEntityAdvancedState =>
  state.createEntityAdvanced

export const selectLinkedEntities = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.linkedEntities)
  },
)

export const selectPayments = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.payments)
  },
)

export const selectStaking = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.staking)
  },
)

export const selectNodes = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.nodes)
  },
)

export const selectFunding = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.funding)
  },
)

export const selectKeys = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.keys)
  },
)

export const selectServices = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.services)
  },
)

export const selectDataResources = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.dataResources)
  },
)

export const selectValidation = createSelector(selectAdvanced, advanced => {
  return advanced.validation
})

export const selectValidationComplete = createSelector(
  selectLinkedEntities,
  selectPayments,
  selectStaking,
  selectNodes,
  selectFunding,
  selectKeys,
  selectServices,
  selectDataResources,
  selectValidation,
  (
    linkedEntitySections,
    paymentSections,
    stakingSections,
    nodeSections,
    fundingSections,
    keySections,
    serviceSections,
    dataResourceSections,
    validation,
  ) => {
    // check if each section has had it's validation completed
    let validationComplete = true
    validationComplete =
      linkedEntitySections
        .map(section => section.id)
        .every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      paymentSections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      stakingSections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      nodeSections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      fundingSections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      keySections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      serviceSections.map(section => section.id).every(id => !!validation[id])
    validationComplete =
      validationComplete &&
      dataResourceSections
        .map(section => section.id)
        .every(id => !!validation[id])

    return validationComplete
  },
)

export const selectValidated = createSelector(
  selectLinkedEntities,
  selectPayments,
  selectStaking,
  selectNodes,
  selectFunding,
  selectKeys,
  selectServices,
  selectDataResources,
  selectValidationComplete,
  selectValidation,
  (
    linkedEntitySections,
    paymentSections,
    stakingSections,
    nodeSections,
    fundingSections,
    keySections,
    serviceSections,
    dataResourceSections,
    validationComplete,
    validation,
  ) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    let validated = true
    validated =
      linkedEntitySections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      paymentSections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      stakingSections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      nodeSections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      fundingSections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      keySections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      serviceSections
        .map(section => section.id)
        .every(id => validation[id].validated)
    validated =
      validated &&
      dataResourceSections
        .map(section => section.id)
        .every(id => validation[id].validated)

    return validated
  },
)
