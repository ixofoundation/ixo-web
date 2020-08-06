import * as React from 'react'
import { Link } from 'react-router-dom'
import { LayoutWrapper } from '../../common/components/Wrappers/LayoutWrapper'
import styled from 'styled-components'
import { Fragment } from 'react'
import moment from 'moment'
const Section = styled.section`
  padding-bottom: 30px;
  border-bottom: 1px solid #164a63;
  margin-bottom: 30px;

  h2 {
    color: white;
    font-size: 30px;
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};
    margin-bottom: 20px;

    i {
      font-size: 25px;
      margin-right: 10px;
    }

    i.icon-pending:before {
      color: #f89d28;
    }
    i.icon-approved:before {
      color: #5ab946;
    }
    i.icon-rejected:before {
      color: #e2223b;
    }
  }
`

const Indicator = styled.div`
  width: 12px;
  height: 25px;
  position: absolute;
  top: 18px;
  left: -6px;

  background: ${/* eslint-disable-line */ props => props.color};
`

const Mail = styled.a``

const Col = styled.div`
  font-size: 15px;
  font-weight: 300;

  a {
    color: white;
    text-decoration: none;
  }

  ${Mail} {
    color: #5094ac;
    text-decoration: none;
    display: block;
  }

  p {
    margin: 0;
  }

  ${Mail}:hover {
    color: white;
    font-weight: 600;
  }

  > a > div {
    position: relative;
    margin: 8px 0;
  }
`

const ClaimsWidget = styled.div`
  margin: 20px 0 0;
`

const ClaimTitle = styled.p`
  display: flex;
  justify-content: space-between;
`

const ID = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`

const Date = styled.span`
  font-weight: 300;
  font-size: 13px;
  color: #d6d3d3;
`

const Did = styled.p`
	&& {color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
`

const ListItemWrapper = styled.div`
  background: #002d42;
  position: relative;
  margin-bottom: 10px;
  padding: 12px 25px;
  border: 1px solid #0c3549;

  transition: background 0.3s ease;

  :hover {
    background: #04364f;
  }

  p {
    font-size: 14px;
    color: white;
    margin-bottom: 0;
  }

  a {
    color: white;
  }

  a:hover {
    text-decoration: none;
  }
`

const ClaimLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;

  :hover {
    text-decoration: none;
    color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }
`

const ViewAllLink = styled(ClaimLink)`
  text-align: center;
`

export interface ParentProps {
  claims?: any[]
  projectDid: string
  fullPage: boolean
  hasLink: boolean
}

export const ProjectClaims: React.SFC<ParentProps> = ({
  claims,
  projectDid,
  fullPage,
  hasLink,
}) => {
  const claimDate = (date: string): string => {
    const duration = moment.duration(moment().diff(date))
    const daysDiff = duration.asDays()

    if (daysDiff > 7) {
      return moment(date).format('YYYY/MM/D')
    } else {
      return moment(date).fromNow()
    }
  }

  const claimItem = (claim, index, colorClass): JSX.Element => {
    const theItem = (
      <ListItemWrapper key={index} className="col-12">
        <Indicator color={colorClass} />
        <ClaimTitle>
          <ID>{claim.claimId}</ID> <Date>{claimDate(claim.date)}</Date>
        </ClaimTitle>
        <Did>{claim.saDid}</Did>
      </ListItemWrapper>
    )

    if (hasLink) {
      return (
        <ClaimLink
          key={index}
          to={{
            pathname: `/projects/${projectDid}/detail/claims/${claim.claimId}`,
          }}
        >
          {theItem}
        </ClaimLink>
      )
    } else {
      return theItem
    }
  }

  const handleRenderWidget = (): JSX.Element => {
    let colorCLass = ''
    return (
      <ClaimsWidget>
        {claims.slice(0, 3).map((claim, index) => {
          switch (claim.status) {
            case '0':
              colorCLass = '#F89D28'
              break
            case '1':
              colorCLass = '#5AB946'
              break
            case '2':
              colorCLass = '#E2223B'
              break
            default:
              break
          }
          return claimItem(claim, index, colorCLass)
        })}
        <ViewAllLink to={`/projects/${projectDid}/detail/claims`}>
          <ListItemWrapper>View all claims</ListItemWrapper>
        </ViewAllLink>
      </ClaimsWidget>
    )
  }

  const handleRenderPageSection = (
    iconClass: string,
    claimsList: any[],
    colorClass: string,
    title: string,
    key: number,
  ): JSX.Element => {
    return (
      <Section className="row" key={key}>
        <div className="col-12">
          <h2>
            <i className={iconClass} />
            {title}
          </h2>
        </div>
        {claimsList.map((claim, index) => {
          return (
            <Col className="col-12" key={index}>
              {claimItem(claim, index, colorClass)}
            </Col>
          )
        })}
      </Section>
    )
  }

  const handleRenderPage = (): JSX.Element => {
    const approved = []
    const pending = []
    const revoked = []
    const sections = []
    claims.map(claim => {
      switch (claim.status) {
        case '1':
          approved.push(claim)
          break
        case '2':
          revoked.push(claim)
          break
        case '0':
        default:
          pending.push(claim)
          break
      }
    })

    pending.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-pending',
          pending,
          '#F89D28',
          'Claims pending approval',
          1,
        ),
      )
    revoked.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-rejected',
          revoked,
          '#E2223B',
          'Claims rejected',
          2,
        ),
      )
    approved.length > 0 &&
      sections.push(
        handleRenderPageSection(
          'icon-approved',
          approved,
          '#5AB946',
          'Claims Approved',
          3,
        ),
      )
    return <LayoutWrapper>{sections}</LayoutWrapper>
  }

  return (
    <Fragment>{fullPage ? handleRenderPage() : handleRenderWidget()}</Fragment>
  )
}
