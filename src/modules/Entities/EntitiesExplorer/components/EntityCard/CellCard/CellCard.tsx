import * as React from 'react'
import { Moment } from 'moment'
import { excerptText, toTitleCase } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  MainContent,
  Title,
  SubTitle,
} from '../EntityCard.styles'
import {
  SummaryLabel,
  SummaryValue,
  Logo,
  SummaryContainer,
} from './CellCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import Shield, { ShieldColor } from '../Shield/Shield'

interface Props {
  dateCreated: Moment
  // TODO when data exists
  /*   memberCount: number
  projectCount: number */
  did: string
  name: string
  description: string
  image: string
  logo: string
  status: string
  sdgs: string[]
}

const CellCard: React.FunctionComponent<Props> = ({
  dateCreated,
  /*   memberCount,
  projectCount, */
  did,
  name,
  description,
  image,
  logo,
  status,
  sdgs,
}) => {
  const shield = toTitleCase(status)

  let shieldColor
  switch (shield) {
    case 'Created':
      shieldColor = ShieldColor.Orange
      break
    case 'Completed':
      shieldColor = ShieldColor.Grey
      break
  }

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
            label="Status"
            text={toTitleCase(shield)}
            color={shieldColor}
          />
          <MainContent>
            <Logo src={logo} />
            <Title>{excerptText(name, 10)}</Title>
            <SubTitle>
              Founded in <strong>{dateCreated.format('DD MMM YYYY')}</strong>
            </SubTitle>
          </MainContent>
          <SummaryContainer className="row">
            <div className="col-6">
              {/* TODO - replace with actual value */}
              <SummaryValue>12</SummaryValue>
              <SummaryLabel>members</SummaryLabel>
            </div>
            <div className="col-6">
              {/* TODO - replace with actual value */}
              <SummaryValue>22</SummaryValue>
              <SummaryLabel>projects</SummaryLabel>
            </div>
          </SummaryContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default CellCard
