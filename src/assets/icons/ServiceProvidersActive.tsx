import React from 'react'

const ServiceProvidersActive = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.1 9.45a4.27 4.27 0 00-4.3 4.3h8.6a4.47 4.47 0 00-4.3-4.3zm4.8 0a2.11 2.11 0 002.1-2.1 2.18 2.18 0 00-2.1-2.1 2.18 2.18 0 00-2.1 2.1 2.11 2.11 0 002.1 2.1zm.3.6a2.41 2.41 0 00-1.5.4 4.76 4.76 0 011.4 3.4h3.4v-.5a3.33 3.33 0 00-3.3-3.3zm-10.4 0a3.33 3.33 0 00-3.3 3.3v.5h3.4a4.76 4.76 0 011.4-3.4 2.6 2.6 0 00-1.5-.4zm2.6-3.5a2.4 2.4 0 104.8 0 2.4 2.4 0 10-4.8 0zm-2.7-1.3a2.05 2.05 0 00-2.1 2.1 2.11 2.11 0 002.1 2.1 2.18 2.18 0 002.1-2.1 2.11 2.11 0 00-2.1-2.1z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ServiceProvidersActive
