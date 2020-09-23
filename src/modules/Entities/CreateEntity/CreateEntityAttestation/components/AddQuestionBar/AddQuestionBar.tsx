import * as React from 'react'
import { ControlType } from 'common/components/JsonForm/types'
import { QuestionBarWrapper } from './AddQuestionBar.styles'
import Tooltip from 'common/components/Tooltip/Tooltip'
import { questionTypeMap } from '../../strategy-map'

interface Props {
  addQuestion(controlType: ControlType): void
}

const AddQuestionBar: React.FunctionComponent<Props> = ({ addQuestion }) => {
  return (
    <QuestionBarWrapper>
      {Object.values(questionTypeMap).map(
        (questionType): JSX.Element => {
          return (
            <Tooltip
              text={`Add ${questionType.title}`}
              key={questionType.title}
            >
              <button
                key={questionType.controlType}
                onClick={(): void => addQuestion(questionType.controlType)}
              >
                {React.createElement(questionType.icon, {
                  fill: '#C3D0E5',
                  width: '28',
                })}
              </button>
            </Tooltip>
          )
        },
      )}
    </QuestionBarWrapper>
  )
}

export default AddQuestionBar
