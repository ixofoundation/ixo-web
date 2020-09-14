import * as React from 'react'
import { RouteProps } from 'react-router'
import { Moment } from 'moment'
import { EntitiesDashboard } from './components/EntitiesDashboard/EntitiesDashboard'
import { ProjectCard } from './components/EntityCard/ProjectCard/ProjectCard'
import { CellCard } from './components/EntityCard/CellCard/CellCard'
import { EntitiesHero } from './components/EntitiesHero/EntitiesHero'
import { Spinner } from 'common/components/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { contentType } from 'types/models'
import {
  Container,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
} from './EntitiesExplorer.container.styles'
import {
  getEntities,
  filterToggleUserEntities,
  filterToggleFeaturedEntities,
  filterTogglePopularEntities,
  filterDates,
  resetDatesFilter,
  filterAddCategoryTag,
  resetCategoryFilter,
  resetSectorFilter,
  resetFilters,
  changeEntitiesType,
  filterCategoryTag,
  filterSector,
} from './EntitiesExplorer.actions'
import EntitiesFilter from './components/EntitiesFilter/EntitiesFilter'
import { EntityType } from '../types'
import { DDOTagCategory, ExplorerEntity } from './types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import * as entitiesSelectors from './EntitiesExplorer.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { entityTypeMap } from '../strategy-map'

export interface Props extends RouteProps {
  location?: any
  contentType: string
  type: EntityType
  entities: ExplorerEntity[]
  entitiesCount: number
  userEntitiesCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  remainingClaimsCount: number
  serviceProvidersCount: number
  evaluatorsCount: number
  locations: any[]
  filteredEntitiesCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: DDOTagCategory[]
  filterCategoriesSummary: string
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  isLoadingEntities: boolean
  isLoggedIn: boolean
  filterSchema: FilterSchema
  filterSector: string
  handleGetEntities: () => void
  handleChangeEntitiesType: (type: EntityType) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleFilterAddCategoryTag: (category: string, tag: string) => void
  handleFilterSector: (category: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetSectorFilter: () => void
  handleResetFilters: () => void
}

export class Entities extends React.Component<any, any> {
  componentDidMount(): void {
    this.props.handleGetEntities()
  }

  resetWithDefaultViewFilters = (): void => {
    this.props.handleResetFilters()
  }

  renderCards = (): JSX.Element[] => {
    return this.props.entities.map((entity: ExplorerEntity, index) => {
      switch (this.props.type) {
        case EntityType.Cell:
          return (
            <CellCard
              dateCreated={entity.dateCreated}
              image={entity.image}
              logo={entity.logo}
              did={entity.did}
              description={entity.description}
              name={entity.name}
              sdgs={entity.sdgs}
              key={index}
              status={entity.status}
              /* TODO when these figures exist    
              memberCount={X}
              projectCount={X}
              */
            />
          )
        default:
          return (
            <ProjectCard
              image={entity.image}
              goal={entity.goal}
              did={entity.did}
              rejectedClaims={entity.rejectedClaimsCount}
              successfulClaims={entity.successfulClaimsCount}
              requiredClaims={entity.requiredClaimsCount}
              description={entity.description}
              name={entity.name}
              sdgs={entity.sdgs}
              key={index}
              logo={entity.logo}
              /* TODO when data exists          
              version={entity.version}
              fundedCount={X}
              activeUsage={X}
              ratingScore={X}
              ratingCount={X}
              */
            />
          )
      }
    })
  }

  renderEntities = (): JSX.Element => {
    if (this.props.entitiesCount > 0) {
      return (
        <EntitiesContainer className="container-fluid">
          <div className="container">
            <EntitiesFilter
              title={`All ${entityTypeMap[this.props.type].plural}`}
              filterSchema={this.props.filterSchema}
              startDate={this.props.filterDateFrom}
              startDateFormatted={this.props.filterDateFromFormatted}
              endDate={this.props.filterDateTo}
              endDateFormatted={this.props.filterDateToFormatted}
              dateSummary={this.props.filterDateSummary}
              categories={this.props.filterCategories}
              categoriesSummary={this.props.filterCategoriesSummary}
              userEntities={this.props.filterUserEntities}
              featuredEntities={this.props.filterFeaturedEntities}
              popularEntities={this.props.filterPopularEntities}
              sector={this.props.filterSector}
              handleFilterDates={this.props.handleFilterDates}
              handleResetDatesFilter={this.props.handleResetDatesFilter}
              handleFilterCategoryTag={this.props.handleFilterCategoryTag}
              handleFilterSector={this.props.handleFilterSector}
              handleFilterAddCategoryTag={this.props.handleFilterAddCategoryTag}
              handleResetCategoryFilter={this.props.handleResetCategoryFilter}
              handleResetSectorFilter={this.props.handleResetSectorFilter}
              handleFilterToggleUserEntities={
                this.props.handleFilterToggleUserEntities
              }
              handleFilterToggleFeaturedEntities={
                this.props.handleFilterToggleFeaturedEntities
              }
              handleFilterTogglePopularEntities={
                this.props.handleFilterTogglePopularEntities
              }
              handleResetFilters={this.resetWithDefaultViewFilters}
            />
            {this.props.filteredEntitiesCount > 0 ? (
              <div className="row row-eq-height">{this.renderCards()}</div>
            ) : (
              <NoEntitiesContainer>
                <p>
                  There are no{' '}
                  {entityTypeMap[this.props.type].plural.toLowerCase()} that
                  match your search criteria
                </p>
              </NoEntitiesContainer>
            )}
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>
            No {entityTypeMap[this.props.type].plural.toLowerCase()} were found
          </p>
        </ErrorContainer>
      )
    }
  }

  handleRenderEntityList(): JSX.Element {
    if (this.props.isLoadingEntities) {
      return (
        <Spinner info={`Loading ${entityTypeMap[this.props.type].plural}`} />
      )
    } else {
      if (this.props.contentType === contentType.dashboard) {
        return (
          <EntitiesDashboard
            type={this.props.type}
            requiredClaims={this.props.requiredClaimsCount}
            successfulClaims={this.props.successfulClaimsCount}
            pendingClaims={this.props.pendingClaimsCount}
            rejectedClaims={this.props.rejectedClaimsCount}
            remainingClaims={this.props.remainingClaimsCount}
            serviceProviders={this.props.serviceProvidersCount}
            evaluators={this.props.evaluatorsCount}
            locations={this.props.locations}
          />
        )
      } else {
        return this.renderEntities()
      }
    }
  }

  render(): JSX.Element {
    return (
      <Container>
        <EntitiesHero
          type={this.props.type}
          filterSector={this.props.filterSector}
          showSearch={this.props.contentType !== contentType.dashboard}
          handleChangeEntitiesType={this.props.handleChangeEntitiesType}
        />
        {this.handleRenderEntityList()}
      </Container>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    entities: entitiesSelectors.selectedFilteredEntities(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
    locations: entitiesSelectors.selectEntitiesCountries(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    userEntitiesCount: entitiesSelectors.selectUserEntitiesCount(state),
    requiredClaimsCount: entitiesSelectors.selectTotalRequiredClaimsCount(
      state,
    ),
    pendingClaimsCount: entitiesSelectors.selectTotalPendingClaimsCount(state),
    successfulClaimsCount: entitiesSelectors.selectTotalSuccessfulClaimsCount(
      state,
    ),
    rejectedClaimsCount: entitiesSelectors.selectTotalRejectedClaimsCount(
      state,
    ),
    remainingClaimsCount: entitiesSelectors.selectTotalRemainingClaimsCount(
      state,
    ),
    serviceProvidersCount: entitiesSelectors.selectTotalServiceProvidersCount(
      state,
    ),
    evaluatorsCount: entitiesSelectors.selectTotalEvaluatorsCount(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount(state),
    filterDateFrom: entitiesSelectors.selectFilterDateFrom(state),
    filterDateTo: entitiesSelectors.selectFilterDateTo(state),
    filterDateFromFormatted: entitiesSelectors.selectFilterDateFromFormatted(
      state,
    ),
    filterDateToFormatted: entitiesSelectors.selectFilterDateToFormatted(state),
    filterDateSummary: entitiesSelectors.selectFilterDateSummary(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterCategoriesSummary: entitiesSelectors.selectFilterCategoriesSummary(
      state,
    ),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(
      state,
    ),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetEntities: (): void => dispatch(getEntities()),
  handleChangeEntitiesType: (type: EntityType): void =>
    dispatch(changeEntitiesType(type)),
  handleFilterToggleUserEntities: (userEntities: boolean): void =>
    dispatch(filterToggleUserEntities(userEntities)),
  handleFilterTogglePopularEntities: (popularEntities: boolean): void =>
    dispatch(filterTogglePopularEntities(popularEntities)),
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean): void =>
    dispatch(filterToggleFeaturedEntities(featuredEntities)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterCategoryTag(category, tag)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleFilterAddCategoryTag: (category: string, tag: string): void =>
    dispatch(filterAddCategoryTag(category, tag)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetCategoryFilter(category)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
  handleResetFilters: (): void => dispatch(resetFilters()),
})

export const EntitiesContainerConnected: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entities as any)
