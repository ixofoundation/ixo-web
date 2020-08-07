import React from 'react'
import ImageLoader from '../../../DropZone/ImageLoader/ImageLoader'

interface Props {
  value: string
  options: any
  onChange: (value: string) => void
}

const ImageUpload: React.FunctionComponent<Props> = ({
  value,
  options: { uploading, maxDimension, aspect, circularCrop },
  onChange,
}) => {
  return (
    <ImageLoader
      keepCropSelection={true}
      uploadedImageSrc={value}
      uploading={uploading}
      handleSave={(base64EncodedImage): void => onChange(base64EncodedImage)}
      maxDimension={maxDimension || 600}
      aspect={aspect || undefined}
      circularCrop={!!circularCrop}
    />
  )
}

export default ImageUpload
