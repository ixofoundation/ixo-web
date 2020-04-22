import * as React from 'react'
import DatePicker from '../../../../../common/components/DatePicker'

import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  ButtonWrapper,
} from '../ProjectsFilter.style'

interface Props {
  startDate: any
  endDate: any
  showDatePicker: boolean
  onGetDesktopDateButton: () => JSX.Element
  onHandleDateChange: (startDate: any, endDate: any) => void
  onToggleShowDatePicker: () => void
  onResetDateFilter: () => void
}

class DesktopDateFilterView extends React.Component<Props, {}> {
  constructor(props) {
    super(props)
  }

  getDatePicker = (): JSX.Element => {
    const datePickerOpen = this.props.showDatePicker
    return (
      <>
        {datePickerOpen && (
          <DatePickerModal>
            <DatePicker
              initialStartDate={this.props.startDate}
              initialEndDate={this.props.endDate}
              initialOrientation="horizontal"
              onApply={this.props.onToggleShowDatePicker}
              onChange={this.props.onHandleDateChange}
              onReset={this.props.onResetDateFilter}
            />

            <ResetButtonDatePicker onClick={this.props.onResetDateFilter}>
              Reset
            </ResetButtonDatePicker>
            <ApplyButtonDatePicker
              onClick={(): void => this.props.onToggleShowDatePicker()}
            >
              Done
            </ApplyButtonDatePicker>
          </DatePickerModal>
        )}
      </>
    )
  }

  render(): JSX.Element {
    return (
      <>
        <ButtonWrapper>
          {this.props.onGetDesktopDateButton()}
          {this.getDatePicker()}
        </ButtonWrapper>
      </>
    )
  }
}

export default DesktopDateFilterView
