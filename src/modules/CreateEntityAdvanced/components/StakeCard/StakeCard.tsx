import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import {
  PaymentDenomination,
  StakeType,
  SlashingCondition,
} from '../../../Entities/types'
import {
  paymentDenominationMap,
  stakeTypeMap,
  slashingConditionMap,
} from '../../../Entities/strategy-map'
import { FormWrapper } from '../../../CreateEntityPageContent/components/PageContent.styles'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'
import { RemoveButton } from '../../../..//common/components/JsonForm/CustomWidgets/SDGSelector/SDGSelector.styles'

interface Props {
  id: string
  type: StakeType
  stakeId: string
  denomination: PaymentDenomination
  depositAddress: string
  minStake: number
  slashingCondition: SlashingCondition
  slashFactor: number
  maxSlashAmount: number
  unbondingPeriod: number
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const StakeCard: React.FunctionComponent<Props> = ({
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
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    type,
    stakeId,
    denomination,
    depositAddress,
    minStake,
    slashingCondition,
    slashFactor,
    maxSlashAmount,
    unbondingPeriod,
  }

  const schema = {
    type: 'object',
    required: [
      'type',
      'stakeId',
      'denomination',
      'depositAddress',
      'minStake',
      'slashingCondition',
      'slashFactor',
      'maxSlashAmount',
      'unbondingPeriod',
    ],
    properties: {
      type: {
        type: 'string',
        title: 'Stake Type',
        enum: Object.keys(StakeType).map(key => StakeType[key]),
        enumNames: Object.keys(StakeType).map(
          key => stakeTypeMap[StakeType[key]].title,
        ),
      },
      stakeId: { type: 'string', title: 'Stake ID' },
      denomination: {
        type: 'string',
        title: 'Deposit Denomination',
        enum: Object.keys(PaymentDenomination).map(
          key => PaymentDenomination[key],
        ),
        enumNames: Object.keys(PaymentDenomination).map(
          key => paymentDenominationMap[PaymentDenomination[key]].title,
        ),
      },
      depositAddress: { type: 'string', title: 'Stake Deposit Address' },
      minStake: { type: 'number', title: 'Minimum Stake' },
      slashingCondition: {
        type: 'string',
        title: 'Slashing Condition',
        enum: Object.keys(SlashingCondition).map(key => SlashingCondition[key]),
        enumNames: Object.keys(SlashingCondition).map(
          key => slashingConditionMap[SlashingCondition[key]].title,
        ),
      },
      slashFactor: { type: 'number', title: 'Slash Factor' },
      maxSlashAmount: { type: 'number', title: 'Maximum Slash Amount' },
      unbondingPeriod: { type: 'number', title: 'Unbonding Period (Days)' },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Stake Type',
    },
    stakeId: { ['ui:placeholder']: 'Enter Stake ID' },
    denomination: { ['ui:placeholder']: 'Select Denomination' },
    depositAddress: { ['ui:placeholder']: 'Enter Address' },
    minStake: { ['ui:placeholder']: 'Enter Value' },
    slashingCondition: { ['ui:placeholder']: 'Select Condition' },
    slashFactor: { ['ui:placeholder']: 'Enter Factor' },
    maxSlashAmount: { ['ui:placeholder']: 'Enter Amount' },
    unbondingPeriod: { ['ui:placeholder']: 'Enter Days' },
  }

  return (
    <>
      <FormWrapper>
        <MultiControlForm
          handleSubmit={(): void => null}
          handleFormDataChange={(formData): void => handleUpdate(id, formData)}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
      </FormWrapper>
      <div className="text-right">
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          - Remove
        </RemoveButton>
      </div>
    </>
  )
}

export default StakeCard
