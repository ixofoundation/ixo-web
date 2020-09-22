import React from 'react'
import { debounce } from 'debounce'
import SingleControlForm from 'common/components/JsonForm/SingleControlForm/SingleControlForm'
import { ButtonGroup } from 'common/components/JsonForm/JsonForm.styles'
import { QuestionForm } from '../../types'

interface Props {
  question: QuestionForm
  answer: {}
  savingAnswer: boolean
  currentQuestionNo: number
  questionCount: number
  answersComplete: boolean
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleFormDataChange: (formData: any) => void
}

const Question: React.FunctionComponent<Props> = ({
  question,
  currentQuestionNo,
  questionCount,
  answer,
  savingAnswer,
  answersComplete,
  handlePreviousClick,
  handleNextClick,
  handleFormDataChange,
}) => {
  const handleFormDataChangeDebounce = debounce(handleFormDataChange, 500)

  return (
    <SingleControlForm
      formData={answer}
      uploading={savingAnswer}
      handleFormDataChange={(formData): void =>
        handleFormDataChangeDebounce(formData)
      }
      handleSubmit={handleNextClick}
      formControl={question}
    >
      <ButtonGroup>
        {currentQuestionNo > 1 && !answersComplete && (
          <button type="button" onClick={handlePreviousClick}>
            Previous
          </button>
        )}
        <button type="submit" className="submitForm">
          {answersComplete
            ? 'Update'
            : questionCount === currentQuestionNo
            ? 'Finalise'
            : 'Next'}
        </button>
      </ButtonGroup>
    </SingleControlForm>
  )
}

export default Question
