import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { EntityClaimType } from 'modules/EntityClaims/types'
import { entityClaimTypeMap } from 'modules/EntityClaims/strategy-map'

interface Props extends FormCardProps {
  type: EntityClaimType
  title: string
  shortDescription: string
}

const ClaimInfoCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      title,
      shortDescription,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      title,
      shortDescription,
      type,
    }

    const schema = {
      type: 'object',
      required: ['type', 'title'],
      properties: {
        type: {
          type: 'string',
          title: 'Claim Type',
          enum: Object.keys(EntityClaimType).map((key) => EntityClaimType[key]),
          enumNames: Object.keys(EntityClaimType).map(
            (key) => entityClaimTypeMap[EntityClaimType[key]].title,
          ),
        },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
      },
    } as any

    const uiSchema = {
      type: { 'ui:placeholder': 'Select Type' },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Name',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
    }

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default ClaimInfoCard
