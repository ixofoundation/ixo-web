import React from 'react'
import EmailVerification from '../../../Verification/EmailVerification/EmailVerification'

interface Props {
  value: string
  onChange: (value: string) => void
}

const EmailValidation: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  return (
    <EmailVerification
      email={value}
      handleCompleted={(email): void => onChange(email)}
      handleReset={(): void => onChange('')}
    />
  )
}

export default EmailValidation
