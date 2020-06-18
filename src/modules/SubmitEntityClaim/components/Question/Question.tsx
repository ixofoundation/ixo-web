import React from 'react'
import Form from '@rjsf/core'
import { QuestionContainer } from './Question.styles'

interface Props {
  questionId: string
  title: string
  description: string
  label: string
  required: boolean
  type: string
  control: string
  placeholder: string
  itemIds: string[]
  itemLabels: string[]
  minItems: number
  maxItems: number
  nextButtonText: string
  showPreviousButton: boolean
  handlePreviousClick: () => void
  handleNextClick: () => void
}

const Question: React.FunctionComponent<Props> = ({
  questionId,
  title,
  description,
  label,
  required,
  type,
  control,
  placeholder,
  nextButtonText,
  showPreviousButton,
  itemIds,
  itemLabels,
  minItems,
  maxItems,
  handlePreviousClick,
  handleNextClick,
}) => {
  const schema = {
    title,
    description,
    type: 'object',
    required: required ? [questionId] : [],
    properties: {
      [questionId]: {
        type,
        title: label,
        items: { type: 'string', enum: itemIds, enumNames: itemLabels },
        uniqueItems: true,
        minItems,
        maxItems,
      },
    },
  } as any

  const uiSchema = {
    [questionId]: {
      ['ui:widget']: control,
      ['ui:placeholder']: placeholder,
    },
  }

  return (
    <QuestionContainer>
      <div>
        <Form
          liveValidate
          noHtml5Validate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
        >
          <div className="buttons">
            {showPreviousButton && (
              <button type="button" onClick={handlePreviousClick}>
                Previous
              </button>
            )}
            <button type="submit" onClick={handleNextClick}>
              {nextButtonText}
            </button>
          </div>
        </Form>
      </div>
    </QuestionContainer>
  )
}

export default Question
