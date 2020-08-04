import React from 'react'

interface Props {
  value: string
  iconAssetPath: string
  placeholder: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
  onFocus: (value: string) => void
}

const IconInput: React.FunctionComponent<Props> = ({
  value,
  iconAssetPath,
  placeholder,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <img src={require(`../../../../assets${iconAssetPath}`)} height={40} />
      </div>
      <input
        value={value}
        onChange={(e): void => onChange(e.target.value)}
        onBlur={(): void => onBlur(value)}
        onFocus={(): void => onFocus(value)}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  )
}

export default IconInput
