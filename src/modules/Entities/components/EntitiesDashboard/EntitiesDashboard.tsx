import * as React from 'react'
import {
  DashboardContainer,
  ClaimsWidget,
  ClaimsLabels,
} from './EntitiesDashboard.styles'
import { LayoutWrapper } from '../../../../components/common/LayoutWrapper'
import { SingleStatistic } from '../../../../components/common/SingleStatistic'
import { StatType } from '../../../../types/models'
import { CircleProgressbar } from '../../../../common/components/Widgets/CircleProgressbar/CircleProgressbar'
import { WorldMap } from '../../../../common/components/Widgets/WorldMap/WorldMap'
import {
  WidgetWrapper,
  gridSizes,
} from '../../../../components/common/WidgetWrapper'
import { getCountryCoordinates } from '../../Entities.utils'
import { EntityType } from '../../types'

export interface Props {
  entityType: EntityType
  requiredClaims: number
  successfulClaims: number
  pendingClaims: number
  rejectedClaims: number
  remainingClaims: number
  serviceProviders: number
  evaluators: number
  countries: any[]
}

export const EntitiesDashboard: React.SFC<Props> = ({
  entityType,
  requiredClaims,
  pendingClaims,
  successfulClaims,
  rejectedClaims,
  remainingClaims,
  serviceProviders,
  evaluators,
  countries,
}) => {
  return (
    <DashboardContainer>
      <LayoutWrapper>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <WidgetWrapper
              title="Service Providers"
              gridHeight={gridSizes.standard}
            >
              <SingleStatistic
                title="Total"
                type={StatType.decimal}
                amount={serviceProviders}
              />
            </WidgetWrapper>
          </div>
          <div className="col-sm-6 col-lg-3">
            <WidgetWrapper title="Evaluators" gridHeight={gridSizes.standard}>
              <SingleStatistic
                title="Total"
                type={StatType.decimal}
                amount={evaluators}
              />
            </WidgetWrapper>
          </div>
          <div className="col-lg-6">
            <WidgetWrapper
              title="Impact claims"
              gridHeight={gridSizes.standard}
              linkIcon={'icon-expand'}
            >
              <ClaimsWidget>
                <ClaimsLabels>
                  <p>
                    <strong>{successfulClaims}</strong> Approved
                  </p>
                  <p>
                    <strong>{pendingClaims}</strong> Pending Approval
                  </p>
                  <p>
                    <strong>{rejectedClaims}</strong> Rejected
                  </p>
                  <p>
                    <strong>{remainingClaims}</strong> Total remaining claims
                  </p>
                </ClaimsLabels>
                <CircleProgressbar
                  approved={successfulClaims}
                  rejected={0}
                  pending={0}
                  totalNeeded={requiredClaims}
                  descriptor={'verified claims'}
                />
              </ClaimsWidget>
            </WidgetWrapper>
          </div>
          <div className="col-md-6">
            <WidgetWrapper
              title={`${entityType} location activity`}
              gridHeight={gridSizes.standard}
              padding={false}
            >
              <WorldMap
                // @ts-ignore
                markers={getCountryCoordinates(countries)}
              />
            </WidgetWrapper>
          </div>
        </div>
      </LayoutWrapper>
    </DashboardContainer>
  )
}
