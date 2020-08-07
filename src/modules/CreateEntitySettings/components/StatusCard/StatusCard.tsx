import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { customControls } from '../../../../common/components/JsonForm/types'
import { EntityStage, EntityStatus } from '../../../../modules/Entities/types'
import {
  entityStageMap,
  entityStatusMap,
} from '../../../../modules/Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  startDate: string
  endDate: string
  stage: EntityStage
  status: EntityStatus
  handleUpdate: (formData: FormData) => void
}

const StatusCard: React.FunctionComponent<Props> = ({
  startDate,
  endDate,
  stage,
  status,
  handleUpdate,
}) => {
  const formData = {
    dates: `${startDate || ''}|${endDate || ''}`,
    stage,
    status,
  }

  const schema = {
    type: 'object',
    required: ['dates', 'stage', 'status'],
    properties: {
      dates: { type: 'string', title: 'Dates' },
      stage: {
        type: 'string',
        title: 'Stage',
        enum: Object.keys(EntityStage).map(key => EntityStage[key]),
        enumNames: Object.keys(EntityStage).map(
          key => entityStageMap[EntityStage[key]].title,
        ),
      },
      status: {
        type: 'string',
        title: 'Status',
        enum: Object.keys(EntityStatus).map(key => EntityStatus[key]),
        enumNames: Object.keys(EntityStatus).map(
          key => entityStatusMap[EntityStatus[key]].title,
        ),
      },
    },
  } as any

  const uiSchema = {
    dates: {
      ['ui:widget']: customControls['daterangeselector'],
    },
    stage: {
      ['ui:placeholder']: 'Select Stage',
    },
    status: {
      ['ui:placeholder']: 'Select Status',
    },
  }

  return (
    <MultiControlForm
      onSubmit={(): void => null}
      onFormDataChange={handleUpdate}
      formData={formData}
      schema={schema}
      uiSchema={uiSchema}
      multiColumn
    >
      &nbsp;
    </MultiControlForm>
  )
}

export default StatusCard
