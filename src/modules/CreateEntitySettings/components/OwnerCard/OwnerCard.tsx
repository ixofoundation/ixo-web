import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'
import { customControls } from '../../../../common/components/JsonForm/types'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  name: string
  country: string
  email: string
  website: string
  mission: string
  identifier: string
  matrixId: string
  imageSrc: string
  uploadingImage: boolean
  handleUpdate: (formData: FormData) => void
  handleUploadImage: (base64EncodedImage: string) => void
}

const OwnerCard: React.FunctionComponent<Props> = ({
  name,
  country,
  email,
  website,
  mission,
  identifier,
  matrixId,
  imageSrc,
  uploadingImage,
  handleUpdate,
  handleUploadImage,
}) => {
  const formData = {
    name,
    country,
    email,
    website,
    mission,
    identifier,
    matrixId,
  }

  const schema = {
    type: 'object',
    required: ['identifier'],
    properties: {
      name: { type: 'string', title: 'Display Name' },
      country: { type: 'string', title: 'Country of Origin' },
      email: { type: 'string', title: 'Public Email', format: 'email' },
      website: { type: 'string', title: 'Public Website', format: 'uri' },
      mission: { type: 'string', title: 'Mission' },
      identifier: { type: 'string', title: 'Identifier' },
      matrixId: { type: 'string', title: 'Public MatrixID' },
    },
  } as any

  const uiSchema = {
    name: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    country: {
      ['ui:widget']: customControls['countryselector'],
    },
    email: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Email',
    },
    website: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter /Paste URL',
    },
    mission: {
      ['ui:widget']: 'textarea',
      ['ui:placeholder']: 'Short Description',
    },
    identifier: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter ID or !name',
    },
    matrixId: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter MatrixID',
    },
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label className="control-label">Logo or Profile Pic</label>
          <ImageLoader
            keepCropSelection={true}
            circularCrop={false}
            uploadedImageSrc={
              imageSrc
                ? `${process.env.REACT_APP_PDS_URL}public/${imageSrc}`
                : null
            }
            uploading={uploadingImage}
            handleSave={(base64EncodedImage): void =>
              handleUploadImage(base64EncodedImage)
            }
            maxDimension={150}
            previewWidth={150}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <MultiControlForm
          onSubmit={(): void => null}
          onFormDataChange={handleUpdate}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
        >
          &nbsp;
        </MultiControlForm>
      </div>
    </div>
  )
}

export default OwnerCard
