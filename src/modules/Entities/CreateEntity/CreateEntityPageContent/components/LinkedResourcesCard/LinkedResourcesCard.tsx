import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls, ControlType } from 'common/components/JsonForm/types'
import { FormCardProps } from '../../../types'
import { LinkedResourcesContent } from '../../types'

interface Props extends FormCardProps {
  linkedResource: LinkedResourcesContent
}

const LinkedResourcesCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      linkedResource,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = linkedResource

    const schema = {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        type: {
          type: 'string',
          title: 'Type of Resource',
          enum: ['Document', 'Video', 'Image'],
          enumNames: ['Document', 'Video', 'Image'],
        },
        displayName: { type: 'string', title: 'Resource Display Name' },
        displayDescription: { type: 'string', title: 'Resource Description' },
        endpoint: { type: 'string', title: 'Resource Link (or upload a file)' },
        encrypted: { type: 'boolean', title: 'Image Description' },
        fileSrc: { type: 'string', title: 'Image' },
      },
    } as any

    const uiSchema = {
      endpoint: {
        'ui:widget': customControls['embeddedtextbox'],
        'ui:placeholder': 'https://...',
        'ui:socialIcon': 'URL Links',
      },
      displayName: {
        'ui:placeholder': 'Descriptive name',
      },
      fileSrc: {
        'ui:widget': customControls[ControlType.ResourceUpload],
        'ui:uploading': false,
        'ui:maxDimension': 960,
      },
      displayDescription: {
        'ui:placeholder': 'Start Typing Here',
      },
      type: {
        'ui:placeholder': 'Resource Type',
      },
    }

    return (
      <>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default LinkedResourcesCard
