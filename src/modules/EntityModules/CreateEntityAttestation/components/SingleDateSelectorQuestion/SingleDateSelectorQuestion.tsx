import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'
import { QuestionCardBaseProps } from '../../types'
import { questionSchema, questionUiSchema } from '../../constants'

interface Props extends FormCardProps, QuestionCardBaseProps {}

const SingleDateSelectorQuestion: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      description,
      label,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      title,
      description,
      label,
    }

    const schema = { ...questionSchema } as any

    const uiSchema = { ...questionUiSchema }

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

export default SingleDateSelectorQuestion
