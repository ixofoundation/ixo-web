import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { NodeType } from '../../../Entities/types'
import { nodeTypeMap } from '../../../Entities/strategy-map'
import { FormWrapper } from '../../../CreateEntityPageContent/components/PageContent.styles'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'
import { RemoveButton } from '../../../..//common/components/JsonForm/CustomWidgets/SDGSelector/SDGSelector.styles'

interface Props {
  id: string
  type: NodeType
  nodeId: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const NodeCard: React.FunctionComponent<Props> = ({
  id,
  type,
  nodeId,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    type,
    nodeId,
  }

  const schema = {
    type: 'object',
    required: ['type', 'nodeId'],
    properties: {
      type: {
        type: 'string',
        title: 'Node Type',
        enum: Object.keys(NodeType).map(key => NodeType[key]),
        enumNames: Object.keys(NodeType).map(
          key => nodeTypeMap[NodeType[key]].title,
        ),
      },
      nodeId: { type: 'string', title: 'Node ID' },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Node Type',
    },
    nodeId: { ['ui:placeholder']: 'Enter !Name or DID' },
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

export default NodeCard
