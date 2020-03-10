import * as React from 'react'
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment, { Moment } from 'moment'
import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
} from './Style'

interface Props {
  onChange: (startDate, endDate) => void
  onReset: () => void
  onApply: () => void
}

interface State {
  startDate: any
  endDate: any
  focusedInput: string
  onFocusChange: null
  onDatesChange: null
  renderControls: null
}

class DatePicker extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: 'startDate',
      onFocusChange: null,
      onDatesChange: null,
      renderControls: null,
    }
  }

  onChange = (startDate, endDate): void => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    })
    this.props.onChange(startDate, endDate)
  }

  onReset = (): void => {
    this.setState({
      startDate: null,
      endDate: null,
    })
    this.props.onReset()
  }

  render(): JSX.Element {
    return (
      <DatePickerModal>
        <div className="DatePicker">
          <DayPickerRangeController
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }): void =>
              this.onChange(startDate, endDate)
            }
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput): void =>
              this.setState({ focusedInput })
            }
            initialVisibleMonth={(): Moment => moment().add(2, 'M')}
            numberOfMonths={2}
            hideKeyboardShortcutsPanel
          />
        </div>
        <ResetButtonDatePicker onClick={this.onReset}>
          Reset
        </ResetButtonDatePicker>
        <ApplyButtonDatePicker onClick={this.props.onApply}>
          Apply
        </ApplyButtonDatePicker>
      </DatePickerModal>
    )
  }
}

export default DatePicker
