import * as React from 'react'
import { Link } from 'react-router-dom'
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims'
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims'
import { ClaimStatus } from '../common/ClaimStatus'
import { AgentRoles, FormStyles } from '../../types/models'
import InputText from '../form/InputText'
import TextArea from '../form/TextArea'

import styled from 'styled-components'
import { ImageSpinner } from '../common/ImageSpinner'
import { Spinner } from '../common/Spinner'

const Container = styled.div`
  justify-content: center;
  display: flex;
`

const Divider = styled.div`
  height: 2px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightBlue};
  width: 36%;
  position: absolute;
  left: 15px;
`

const DividerShadow = styled.div`
  height: 1px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightGrey};
  width: 100%;
`

const ButtonContainer = styled.div`
  padding: 22px 34px 22px 34px;
  background: ${/* eslint-disable-line */ props => props.theme.grey};
  padding: 10px 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.18);
`

const RejectButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  border: 1px solid #b8b8b8;
  background: ${/* eslint-disable-line */ props =>
    props.theme.bg.gradientButtonRed};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
`

const ApproveButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  background: ${/* eslint-disable-line */ props =>
    props.theme.bg.gradientButtonGreen};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
`

const ReturnButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  background: ${/* eslint-disable-line */ props => props.theme.bg.grey};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
  border: 1px solid
    ${/* eslint-disable-line */ props => props.theme.bg.darkButton};
  color: ${/* eslint-disable-line */ props => props.theme.bg.darkButton};
`

const EvaluateMoreButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  background: ${/* eslint-disable-line */ props =>
    props.theme.bg.gradientDarkBlue};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
  color: white;
  text-decoration: none;
`

const ButtonIcon = styled.i`
  font-size: 13px;
  padding-left: 10px;
  i:before {
    color: ${/* eslint-disable-line */ props => props.theme.bg.grey};
  }
`

const ButtonIconLeft = styled.i`
  font-size: 13px;
  padding-right: 10px;
  i:before {
    color: ${/* eslint-disable-line */ props => props.theme.bg.grey};
  }
`

const ButtonLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`

const ImageContainer = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
`

const IconContainer = styled.div`
  padding: 50px 20px 80px;
`

export interface ParentProps {
  match: any
  claim: any
  claimEvaluated: boolean
  handleListClaims: () => any
  handleEvaluateClaim: (status: object, claimId: string) => void
  hasCapability: (role: AgentRoles[]) => boolean
  singleClaimDependentsFetchedCallback: () => void
  singleClaimFormFile: string
}
export const ProjectSingleClaim: React.SFC<ParentProps> = props => {
  const projectDID = props.match.params.projectDID
  const latestClaimStatus = (): any => {
    if (props.claim.evaluations.length > 0) {
      return props.claim.evaluations[props.claim.evaluations.length - 1].status
    } else {
      return 0
    }
  }

  const latestClaimVersion = (): any => {
    if (props.claim.evaluations.length > 0) {
      return props.claim.evaluations[props.claim.evaluations.length - 1].version
    } else {
      return 0
    }
  }

  const evaluateClaim = (
    status: string,
    evaluations: any,
    id: string,
  ): void => {
    if (evaluations.length === 0) {
      props.handleEvaluateClaim({ status: status }, id)
    } else {
      props.handleEvaluateClaim({ status, version: latestClaimVersion() }, id)
    }
  }

  const handleRenderImage = (index: number, link: string): JSX.Element => {
    if (link === '') {
      return (
        <ImageContainer
          key={index}
          src={require('../../assets/images/ixo-placeholder.jpg')}
        />
      )
    }
    if (link.length > 40) {
      return <ImageContainer key={index} src={link} />
    }
    return <ImageSpinner key={index} />
  }

  const handleRenderStatus = (status, claim): JSX.Element => {
    if (props.claimEvaluated === true) {
      return (
        <ClaimStatus
          message={`Claim (${claim._id}) has been evaluated`}
          icon={'icon-approved'}
        />
      )
    }
    switch (status) {
      case '1':
        return (
          <ClaimStatus
            message={`Claim ${claim._id} Approved`}
            icon={'icon-approved'}
          />
        )
      case '2':
        return (
          <ClaimStatus
            message={`Claim ${claim._id} Rejected`}
            icon={'icon-rejected'}
          />
        )
      case '0':
      default:
        return <ClaimStatus message={'Pending'} icon={'icon-pending'} />
    }
  }

  const handleRenderButtons = (claim: any): JSX.Element | string => {
    if (props.claimEvaluated === true) {
      return (
        <ButtonContainer>
          <div className="row">
            <div className="col-md-6">
              <ButtonLink
                to={`/projects/${projectDID}/overview`}
                onClick={(): void =>
                  props.singleClaimDependentsFetchedCallback()
                }
              >
                <ReturnButton>Return to project</ReturnButton>
              </ButtonLink>
            </div>
            <div className="col-md-6">
              <ButtonLink
                to={`/projects/${projectDID}/detail/claims`}
                onClick={(): void =>
                  props.singleClaimDependentsFetchedCallback()
                }
              >
                <EvaluateMoreButton>
                  <ButtonIconLeft className="icon-approvetick" />
                  Evaluate another claim
                </EvaluateMoreButton>
              </ButtonLink>
            </div>
          </div>
        </ButtonContainer>
      )
    }
    if (latestClaimStatus() === 0) {
      return (
        <ButtonContainer>
          <div className="row">
            <div className="col-md-6">
              <RejectButton
                onClick={(): void =>
                  evaluateClaim('2', claim.evaluations, claim.txHash)
                }
              >
                Reject Claim
                <ButtonIcon className="icon-close" />
              </RejectButton>
            </div>
            <div className="col-md-6">
              <ApproveButton
                onClick={(): void =>
                  evaluateClaim('1', claim.evaluations, claim.txHash)
                }
              >
                Approve Claim
                <ButtonIcon className="icon-approvetick" />
              </ApproveButton>
            </div>
          </div>
        </ButtonContainer>
      )
    }
    return ''
  }

  const handleDataRender = (): JSX.Element => {
    const { fields = [] } = JSON.parse(props.singleClaimFormFile)
    return (
      <div>
        {fields.map((field, index) => {
          switch (field.type) {
            case 'text':
              return (
                <InputText
                  formStyle={FormStyles.disabled}
                  key={index}
                  type={field.type}
                  value={field.name}
                  text={props.claim[`${field.name}`]}
                  validation={field.validation}
                />
              )
            case 'textarea':
              return (
                <TextArea
                  formStyle={FormStyles.disabled}
                  id={field.name}
                  text={field.label + ': ' + props.claim[`${field.name}`]}
                  key={index}
                />
              )
            case 'image':
              return handleRenderImage(index, props.claim[`${field.name}`])
            case 'qrcode':
              return (
                <TextArea
                  formStyle={FormStyles.disabled}
                  id={field.name}
                  text={props.claim[`${field.name}`]}
                  key={index}
                />
              )
            default:
              return null
          }
        })}
      </div>
    )
  }

  const handleRenderClaim = (): JSX.Element => {
    if (props.claim === null) {
      props.handleListClaims()
      return <Spinner info="Loading claim..." />
    } else {
      const claim = props.claim
      if (!claim) {
        return <p>No claim found with that ID</p>
      }
      return (
        <LayoutWrapperClaims>
          <Container className="row">
            <div className="col-md-6">
              <WidgetWrapperClaims>
                <h3>Claim {props.claimEvaluated === true && 'evaluated'}</h3>
                <DividerShadow>
                  <Divider />
                </DividerShadow>
                <IconContainer>
                  {props.claimEvaluated === false && handleDataRender()}
                  {handleRenderStatus(latestClaimStatus(), claim)}
                </IconContainer>
              </WidgetWrapperClaims>
              {props.hasCapability([AgentRoles.evaluators]) &&
                handleRenderButtons(claim)}
            </div>
          </Container>
        </LayoutWrapperClaims>
      )
    }
  }

  return handleRenderClaim()
}
