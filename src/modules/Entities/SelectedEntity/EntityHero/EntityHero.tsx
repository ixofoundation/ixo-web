import * as React from 'react'
import { Moment } from 'moment'
import { SDGArray } from 'lib/commonData'
import { getCountryName } from 'common/utils/formatters'
import { MatchType } from '../../../../types/models'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
import {
  SingleSDG,
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
  StyledFundingTitle,
} from './EntityHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'lib/json/availableFlags.json'
import { EntityType } from 'modules/Entities/types'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { useWindowSize } from 'common/hooks'
import { deviceWidth } from 'lib/commonData'
import IxoCircle from 'assets/images/ixo-circle.png'

interface Props {
  type: EntityType
  did: string
  bondDid: string
  name: string
  description: string
  dateCreated: Moment
  ownerName: string
  location: string
  sdgs: string[]
  loggedIn: boolean
  onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
}

const EntityHero: React.FunctionComponent<Props> = ({
  name,
  description,
  ownerName,
  type,
  did,
  bondDid,
  location,
  sdgs,
  dateCreated,
  loggedIn,
  onlyTitle,
  assistantPanelToggle,
  enableAssistantButton = true,
}) => {
  const windowSize = useWindowSize()
  const buttonsArray = [
    {
      iconClass: `icon-${type.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${did}/overview`,
      title: entityTypeMap[type].title,
    },
  ]

  if (type === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${did}/detail`,
      title: 'DASHBOARD',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: 'in-active',
      path: '/performace',
      title: 'DASHBOARD',
    })
  }

  if (loggedIn && bondDid) {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: null,
      path: `/projects/${did}/bonds/${bondDid}`,
      title: 'FUNDING',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: 'in-active',
      path: '/funding',
      title: 'FUNDING',
    })
  }

  const getFlagURL = (projectLocation: string): string => {
    if (availableFlags.availableFlags.includes(location)) {
      return `url(${require(`../../../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`)})`
    } else if (location === 'AA') {
      return `url(${require('../../../../assets/images/country-flags/global.svg')})`
    }

    return ''
  }

  const renderSDGs = (): JSX.Element => {
    return (
      <>
        {sdgs.map((SDG, index) => {
          const goal = Math.floor(parseInt(SDG, 10))
          if (goal > 0 && goal <= SDGArray.length) {
            return (
              <SingleSDG
                target="_blank"
                href={SDGArray[goal - 1].url}
                key={index}
              >
                <i className={`icon-sdg-${SDGArray[goal - 1].ico}`} />
                {goal}. {SDGArray[goal - 1].title}
              </SingleSDG>
            )
          } else {
            return null
          }
        })}
      </>
    )
  }
  return (
    <>
      {onlyTitle && windowSize.width > deviceWidth.tablet && (
        <StyledFundingTitle>{name}</StyledFundingTitle>
      )}
      <HeroContainer className="container-fluid" onlyTitle={false}>
        {!onlyTitle && windowSize.width > deviceWidth.tablet && (
          <HeroInner className="container detailed">
            <div className="row">
              <div className="col-sm-12">
                {renderSDGs()}
                <Title>{name}</Title>
                <Description>{description}</Description>
                <HeroInfoItemsWrapper>
                  <HeroInfoItem>
                    <CalendarSort fill="#A5ADB0" />
                    <span>{dateCreated.format('d MMM ‘YY')}</span>
                  </HeroInfoItem>
                  <HeroInfoItem>
                    <img src={IxoCircle} />
                    <span>{ownerName}</span>
                  </HeroInfoItem>
                  {location && (
                    <HeroInfoItem>
                      {getFlagURL(location) !== '' && (
                        <Flag
                          style={{
                            background: getFlagURL(location),
                          }}
                        />
                      )}
                      <span>{getCountryName(location)}</span>
                    </HeroInfoItem>
                  )}
                </HeroInfoItemsWrapper>
              </div>
            </div>
          </HeroInner>
        )}
        <HeaderTabs
          buttons={buttonsArray}
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={entityTypeMap[type].themeColor}
        />
      </HeroContainer>
    </>
  )
}

export default EntityHero
