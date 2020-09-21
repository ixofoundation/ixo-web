import * as React from 'react'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardBottom,
  MainContent,
  Title,
  StatisticsContainer,
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
  Description,
  CardTop,
  CardTopContainer,
} from '../EntityCard.styles'
import { TermsOfUseType } from 'modules/Entities/types'
import { termsOfUseTypeStrategyMap } from 'modules/Entities/strategy-map'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import SDGIcons from '../SDGIcons/SDGIcons'
import Star from 'assets/icons/Star'
import Shield, { ShieldColor } from '../Shield/Shield'

interface Props {
  did: string
  name: string
  ownerLogo: string
  sdgs: string[]
  image: string
  description: string
  termsType: TermsOfUseType
}

const DataCard: React.FunctionComponent<Props> = ({
  did,
  name,
  ownerLogo,
  image,
  sdgs,
  description,
  termsType,
}) => {
  const termsOfUseMap = termsOfUseTypeStrategyMap[termsType]

  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <Shield
            label="Data Asset"
            text="Algorithm"
            color={ShieldColor.Orange}
          />
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className="row">
            <div className="col-4">
              <StatisticValue>0.2</StatisticValue>
              <StatisticLabel>Version</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>16</StatisticValue>
              <StatisticLabel>Active Usage</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>
                4.5 <Star fill="#E8EDEE" width="20" />
              </StatisticValue>
              <StatisticLabel>Rating (380)</StatisticLabel>
            </div>
          </StatisticsContainer>
          <CardBottomLogoContainer className="row">
            <div className="col-6">
              <Tooltip
                text={termsOfUseMap.title}
                position={TooltipPosition.Bottom}
              >
                {React.createElement(termsOfUseMap.icon, {
                  width: 34,
                  fill: 'black',
                })}
              </Tooltip>
            </div>
            <div className="col-6 text-right">
              <Logo src={ownerLogo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DataCard
