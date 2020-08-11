import React, { Dispatch } from 'react'
import { RootState } from 'common/redux/types'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../CreateEntity/components/CreateEntityBase/CreateEntityBase'
import * as createEntityAdvancedSelectors from './CreateEntityAdvanced.selectors'
import {
  LinkedEntity,
  Payment,
  Stake,
  Node,
  Fund,
  Key,
  Service,
  DataResource,
} from './types'
import { connect } from 'react-redux'
import {
  addLinkedEntity,
  removeLinkedEntity,
  updateLinkedEntity,
  addPayment,
  removePayment,
  updatePayment,
  addStake,
  removeStake,
  updateStake,
  addNode,
  removeNode,
  updateNode,
  addFund,
  removeFund,
  updateFund,
  addKey,
  removeKey,
  updateKey,
  addService,
  removeService,
  updateService,
  addDataResource,
  removeDataResource,
  updateDataResource,
  validated,
  validationError,
} from './CreateEntityAdvanced.actions'
import { FormData } from 'common/components/JsonForm/types'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import LinkedEntityCard from './components/LinkedEntityCard/LinkedEntityCard'
import PaymentCard from './components/PaymentCard/PaymentCard'
import StakeCard from './components/StakeCard/StakeCard'
import NodeCard from './components/NodeCard/NodeCard'
import FundCard from './components/FundCard/FundCard'
import KeyCard from './components/KeyCard/KeyCard'
import ServiceCard from './components/ServiceCard/ServiceCard'
import DataResourceCard from './components/DataResourceCard/DataResourceCard'

interface Props extends CreateEntityBaseProps {
  linkedEntities: LinkedEntity[]
  payments: Payment[]
  staking: Stake[]
  nodes: Node[]
  funding: Fund[]
  keys: Key[]
  services: Service[]
  dataResources: DataResource[]
  handleAddLinkedEntity: () => void
  handleRemoveLinkedEntity: (id: string) => void
  handleUpdateLinkedEntity: (id: string, formData: FormData) => void
  handleAddPayment: () => void
  handleRemovePayment: (id: string) => void
  handleUpdatePayment: (id: string, formData: FormData) => void
  handleAddStake: () => void
  handleRemoveStake: (id: string) => void
  handleUpdateStake: (id: string, formData: FormData) => void
  handleAddNode: () => void
  handleRemoveNode: (id: string) => void
  handleUpdateNode: (id: string, formData: FormData) => void
  handleAddFund: () => void
  handleRemoveFund: (id: string) => void
  handleUpdateFund: (id: string, formData: FormData) => void
  handleAddKey: () => void
  handleRemoveKey: (id: string) => void
  handleUpdateKey: (id: string, formData: FormData) => void
  handleAddService: () => void
  handleRemoveService: (id: string) => void
  handleUpdateService: (id: string, formData: FormData) => void
  handleAddDataResource: () => void
  handleRemoveDataResource: (id: string) => void
  handleUpdateDataResource: (id: string, formData: FormData) => void
}

class CreateEntityAdvanced extends CreateEntityBase<Props> {
  renderLinkedEntities = (): JSX.Element => {
    const {
      linkedEntities,
      handleUpdateLinkedEntity,
      handleAddLinkedEntity,
      handleRemoveLinkedEntity,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Linked Entities"
        onAddSection={handleAddLinkedEntity}
        addSectionText="Add Linked Entity"
      >
        {linkedEntities.map(linkedEntity => {
          this.cardRefs[linkedEntity.id] = React.createRef()

          const { id, entityId, type } = linkedEntity

          return (
            <LinkedEntityCard
              ref={this.cardRefs[linkedEntity.id]}
              key={id}
              entityId={entityId}
              type={type}
              handleUpdateContent={(formData): void =>
                handleUpdateLinkedEntity(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveLinkedEntity(id)}
              handleSubmitted={(): void =>
                this.props.handleValidated(linkedEntity.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(linkedEntity.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderPayments = (): JSX.Element => {
    const {
      payments,
      handleUpdatePayment,
      handleAddPayment,
      handleRemovePayment,
    } = this.props
    return (
      <FormCardWrapper
        showAddSection={true}
        title="Payments"
        onAddSection={handleAddPayment}
        addSectionText="Add Payment"
      >
        {payments.map(payment => {
          this.cardRefs[payment.id] = React.createRef()

          const {
            id,
            type,
            paymentId,
            denomination,
            maxAmount,
            maxUnits,
          } = payment

          return (
            <PaymentCard
              ref={this.cardRefs[payment.id]}
              key={id}
              type={type}
              paymentId={paymentId}
              denomination={denomination}
              maxAmount={maxAmount}
              maxUnits={maxUnits}
              handleUpdateContent={(formData): void =>
                handleUpdatePayment(id, formData)
              }
              handleRemoveSection={(): void => handleRemovePayment(id)}
              handleSubmitted={(): void =>
                this.props.handleValidated(payment.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(payment.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderStaking = (): JSX.Element => {
    const {
      staking,
      handleUpdateStake,
      handleAddStake,
      handleRemoveStake,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Staking"
        addSectionText="Add Stake"
        onAddSection={handleAddStake}
      >
        {staking.map(stake => {
          this.cardRefs[stake.id] = React.createRef()

          const {
            id,
            type,
            stakeId,
            denomination,
            depositAddress,
            minStake,
            slashingCondition,
            slashFactor,
            maxSlashAmount,
            unbondingPeriod,
          } = stake

          return (
            <StakeCard
              ref={this.cardRefs[stake.id]}
              key={id}
              type={type}
              stakeId={stakeId}
              denomination={denomination}
              depositAddress={depositAddress}
              minStake={minStake}
              slashingCondition={slashingCondition}
              slashFactor={slashFactor}
              maxSlashAmount={maxSlashAmount}
              unbondingPeriod={unbondingPeriod}
              handleUpdateContent={(formData): void =>
                handleUpdateStake(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveStake(id)}
              handleSubmitted={(): void => this.props.handleValidated(stake.id)}
              handleError={(errors): void =>
                this.props.handleValidationError(stake.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderNodes = (): JSX.Element => {
    const {
      nodes,
      handleUpdateNode,
      handleAddNode,
      handleRemoveNode,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Nodes"
        addSectionText="Add Node"
        onAddSection={handleAddNode}
      >
        {nodes.map(stake => {
          this.cardRefs[stake.id] = React.createRef()

          const { id, type, nodeId } = stake

          return (
            <NodeCard
              ref={this.cardRefs[stake.id]}
              key={id}
              type={type}
              nodeId={nodeId}
              handleUpdateContent={(formData): void =>
                handleUpdateNode(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveNode(id)}
              handleSubmitted={(): void => this.props.handleValidated(stake.id)}
              handleError={(errors): void =>
                this.props.handleValidationError(stake.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderFunding = (): JSX.Element => {
    const {
      funding,
      handleUpdateFund,
      handleAddFund,
      handleRemoveFund,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Funding"
        addSectionText="Add a Funding Source"
        onAddSection={handleAddFund}
      >
        {funding.map(fund => {
          this.cardRefs[fund.id] = React.createRef()

          const { id, source, fundId } = fund

          return (
            <FundCard
              ref={this.cardRefs[fund.id]}
              key={id}
              source={source}
              fundId={fundId}
              handleUpdateContent={(formData): void =>
                handleUpdateFund(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveFund(id)}
              handleSubmitted={(): void => this.props.handleValidated(fund.id)}
              handleError={(errors): void =>
                this.props.handleValidationError(fund.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderKeys = (): JSX.Element => {
    const { keys, handleUpdateKey, handleAddKey, handleRemoveKey } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Keys"
        onAddSection={handleAddKey}
        addSectionText="Add Key"
      >
        {keys.map(key => {
          this.cardRefs[key.id] = React.createRef()

          const {
            id,
            purpose,
            type,
            denomination,
            controllerId,
            dateCreated,
            dateUpdated,
          } = key

          return (
            <KeyCard
              ref={this.cardRefs[key.id]}
              key={id}
              purpose={purpose}
              type={type}
              denomination={denomination}
              controllerId={controllerId}
              dateCreated={dateCreated}
              dateUpdated={dateUpdated}
              handleUpdateContent={(formData): void =>
                handleUpdateKey(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveKey(id)}
              handleSubmitted={(): void => this.props.handleValidated(key.id)}
              handleError={(errors): void =>
                this.props.handleValidationError(key.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderServices = (): JSX.Element => {
    const {
      services,
      handleUpdateService,
      handleAddService,
      handleRemoveService,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Services"
        onAddSection={handleAddService}
        addSectionText="Add Service"
      >
        {services.map(service => {
          this.cardRefs[service.id] = React.createRef()

          const {
            id,
            type,
            shortDescription,
            endpoint,
            publicKey,
            otherParams,
          } = service

          return (
            <ServiceCard
              ref={this.cardRefs[service.id]}
              key={id}
              type={type}
              shortDescription={shortDescription}
              endpoint={endpoint}
              publicKey={publicKey}
              otherParams={otherParams}
              handleUpdateContent={(formData): void =>
                handleUpdateService(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveService(id)}
              handleSubmitted={(): void =>
                this.props.handleValidated(service.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(service.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderDataResources = (): JSX.Element => {
    const {
      dataResources,
      handleUpdateDataResource,
      handleAddDataResource,
      handleRemoveDataResource,
    } = this.props

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Data"
        addSectionText="Add a Data Resource"
        onAddSection={handleAddDataResource}
      >
        {dataResources.map(dataResource => {
          this.cardRefs[dataResource.id] = React.createRef()

          const {
            id,
            type,
            dataId,
            resourceLocator,
            otherParams,
          } = dataResource

          return (
            <DataResourceCard
              ref={this.cardRefs[dataResource.id]}
              key={id}
              type={type}
              dataId={dataId}
              resourceLocator={resourceLocator}
              otherParams={otherParams}
              handleUpdateContent={(formData): void =>
                handleUpdateDataResource(id, formData)
              }
              handleRemoveSection={(): void => handleRemoveDataResource(id)}
              handleSubmitted={(): void =>
                this.props.handleValidated(dataResource.id)
              }
              handleError={(errors): void =>
                this.props.handleValidationError(dataResource.id, errors)
              }
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const {
      linkedEntities,
      payments,
      staking,
      nodes,
      funding,
      keys,
      services,
      dataResources,
    } = this.props

    const identifiers: string[] = []

    linkedEntities.forEach(section => {
      identifiers.push(section.id)
    })
    payments.forEach(section => {
      identifiers.push(section.id)
    })
    staking.forEach(section => {
      identifiers.push(section.id)
    })
    nodes.forEach(section => {
      identifiers.push(section.id)
    })
    funding.forEach(section => {
      identifiers.push(section.id)
    })
    keys.forEach(section => {
      identifiers.push(section.id)
    })
    services.forEach(section => {
      identifiers.push(section.id)
    })
    dataResources.forEach(section => {
      identifiers.push(section.id)
    })

    return (
      <>
        {this.renderLinkedEntities()}
        {this.renderPayments()}
        {this.renderStaking()}
        {this.renderNodes()}
        {this.renderFunding()}
        {this.renderKeys()}
        {this.renderServices()}
        {this.renderDataResources()}
        {this.renderButtonGroup(identifiers)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  linkedEntities: createEntityAdvancedSelectors.selectLinkedEntities(state),
  payments: createEntityAdvancedSelectors.selectPayments(state),
  staking: createEntityAdvancedSelectors.selectStaking(state),
  nodes: createEntityAdvancedSelectors.selectNodes(state),
  funding: createEntityAdvancedSelectors.selectFunding(state),
  keys: createEntityAdvancedSelectors.selectKeys(state),
  services: createEntityAdvancedSelectors.selectServices(state),
  dataResources: createEntityAdvancedSelectors.selectDataResources(state),
  validationComplete: createEntityAdvancedSelectors.selectValidationComplete(
    state,
  ),
  validated: createEntityAdvancedSelectors.selectValidated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddLinkedEntity: (): void => dispatch(addLinkedEntity()),
  handleRemoveLinkedEntity: (id: string): void =>
    dispatch(removeLinkedEntity(id)),
  handleUpdateLinkedEntity: (id: string, formData: FormData): void =>
    dispatch(updateLinkedEntity(id, formData)),
  handleAddPayment: (): void => dispatch(addPayment()),
  handleRemovePayment: (id: string): void => dispatch(removePayment(id)),
  handleUpdatePayment: (id: string, formData: FormData): void =>
    dispatch(updatePayment(id, formData)),
  handleAddStake: (): void => dispatch(addStake()),
  handleRemoveStake: (id: string): void => dispatch(removeStake(id)),
  handleUpdateStake: (id: string, formData: FormData): void =>
    dispatch(updateStake(id, formData)),
  handleAddNode: (): void => dispatch(addNode()),
  handleRemoveNode: (id: string): void => dispatch(removeNode(id)),
  handleUpdateNode: (id: string, formData: FormData): void =>
    dispatch(updateNode(id, formData)),
  handleAddFund: (): void => dispatch(addFund()),
  handleRemoveFund: (id: string): void => dispatch(removeFund(id)),
  handleUpdateFund: (id: string, formData: FormData): void =>
    dispatch(updateFund(id, formData)),
  handleAddKey: (): void => dispatch(addKey()),
  handleRemoveKey: (id: string): void => dispatch(removeKey(id)),
  handleUpdateKey: (id: string, formData: FormData): void =>
    dispatch(updateKey(id, formData)),
  handleAddService: (): void => dispatch(addService()),
  handleRemoveService: (id: string): void => dispatch(removeService(id)),
  handleUpdateService: (id: string, formData: FormData): void =>
    dispatch(updateService(id, formData)),
  handleAddDataResource: (): void => dispatch(addDataResource()),
  handleRemoveDataResource: (id: string): void =>
    dispatch(removeDataResource(id)),
  handleUpdateDataResource: (id: string, formData: FormData): void =>
    dispatch(updateDataResource(id, formData)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
})

export const CreateEntityAdvancedConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAdvanced)
