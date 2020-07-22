import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import {
  CreateEntityPageContentActions,
  UpdateHeaderContentAction,
  UploadHeaderImageAction,
  AddBodySectionAction,
  UpdateBodyContentAction,
  UploadBodyContentImageAction,
  UpdateImageContentAction,
  AddImageSectionAction,
  UploadImageContentImageAction,
  AddVideoSectionAction,
  UpdateVideoContentAction,
  UploadVideoContentVideoAction,
  AddProfileSectionAction,
  UpdateProfileContentAction,
  UploadProfileContentImageAction,
  UpdateSocialContentAction,
  AddEmbeddedSectionAction,
  EmbeddedPageContentType,
  UpdateEmbeddedContentAction,
} from './types'
import { FormData } from 'src/common/components/JsonForm/types'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateHeaderContent = (
  formData: FormData,
): UpdateHeaderContentAction => {
  const {
    title,
    shortDescription,
    imageDescription,
    sdgs,
    company,
    country,
  } = formData

  return {
    type: CreateEntityPageContentActions.UpdateHeaderContent,
    payload: {
      title,
      shortDescription,
      imageDescription,
      sdgs,
      company,
      country,
    },
  }
}

export const uploadHeaderContentImage = (base64ImageData: string) => (
  dispatch: Dispatch,
): UploadHeaderImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadHeaderContentImage,
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ did: response.result })),
  })
}

export const addBodySection = (): AddBodySectionAction => ({
  type: CreateEntityPageContentActions.AddBodySection,
  payload: {
    id: uuidv4(),
    title: null,
    content: null,
    imageDid: null,
  },
})

export const updateBodyContent = (
  id: string,
  formData: FormData,
): UpdateBodyContentAction => {
  const { title, content } = formData
  return {
    type: CreateEntityPageContentActions.UpdateBodyContent,
    payload: {
      id,
      title,
      content,
    },
  }
}

export const uploadBodyContentImage = (id: string, base64ImageData: string) => (
  dispatch: Dispatch,
): UploadBodyContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadBodyContentImage,
    meta: { id },
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addImageSection = (): AddImageSectionAction => ({
  type: CreateEntityPageContentActions.AddImageSection,
  payload: {
    id: uuidv4(),
    title: null,
    content: null,
    imageDid: null,
    imageDescription: null,
  },
})

export const updateImageContent = (
  id: string,
  formData: FormData,
): UpdateImageContentAction => {
  const { title, content, imageDescription } = formData

  return {
    type: CreateEntityPageContentActions.UpdateImageContent,
    payload: {
      id,
      title,
      content,
      imageDescription,
    },
  }
}

export const uploadImageContentImage = (
  id: string,
  base64ImageData: string,
) => (dispatch: Dispatch): UploadImageContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadImageContentImage,
    meta: { id },
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addVideoSection = (): AddVideoSectionAction => ({
  type: CreateEntityPageContentActions.AddVideoSection,
  payload: {
    id: uuidv4(),
    title: null,
    content: null,
    videoDid: null,
  },
})

export const updateVideoContent = (
  id: string,
  formData: FormData,
): UpdateVideoContentAction => {
  const { title, content } = formData

  return {
    type: CreateEntityPageContentActions.UpdateVideoContent,
    payload: {
      id,
      title,
      content,
    },
  }
}

export const uploadVideoContentVideo = (
  id: string,
  base64VideoData: string,
) => (dispatch: Dispatch): UploadVideoContentVideoAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadVideoContentVideo,
    meta: { id },
    payload: blocksyncApi.project
      .createPublic(base64VideoData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const addProfileSection = (): AddProfileSectionAction => ({
  type: CreateEntityPageContentActions.AddProfileSection,
  payload: {
    id: uuidv4(),
    name: null,
    position: null,
    linkedInUrl: null,
    twitterUrl: null,
    imageDid: null,
  },
})

export const updateProfileContent = (
  id: string,
  formData: FormData,
): UpdateProfileContentAction => {
  const { name, position, linkedInUrl, twitterUrl } = formData

  return {
    type: CreateEntityPageContentActions.UpdateProfileContent,
    payload: {
      id,
      name,
      position,
      linkedInUrl,
      twitterUrl,
    },
  }
}

export const uploadProfileContentImage = (
  id: string,
  base64ImageData: string,
) => (dispatch: Dispatch): UploadProfileContentImageAction => {
  return dispatch({
    type: CreateEntityPageContentActions.UploadProfileContentImage,
    meta: { id },
    payload: blocksyncApi.project
      .createPublic(base64ImageData, PDS_URL)
      .then((response: any) => ({ id, did: response.result })),
  })
}

export const updateSocialContent = (
  linkedInUrl: string,
  facebookInUrl: string,
  twitterInUrl: string,
  discourseInUrl: string,
  instagramUrl: string,
  telegramUrl: string,
  githubUrl: string,
  otherUrl: string,
): UpdateSocialContentAction => ({
  type: CreateEntityPageContentActions.UpdateSocialContent,
  payload: {
    linkedInUrl,
    facebookInUrl,
    twitterInUrl,
    discourseInUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  },
})

export const addEmbeddedSection = (): AddEmbeddedSectionAction => ({
  type: CreateEntityPageContentActions.AddEmbeddedSection,
  payload: {
    id: uuidv4(),
    title: null,
    type: null,
    urls: [],
  },
})

export const updateEmbeddedContent = (
  id: string,
  title: string,
  type: EmbeddedPageContentType,
  urls: string[],
): UpdateEmbeddedContentAction => ({
  type: CreateEntityPageContentActions.UpdateEmbeddedContent,
  payload: {
    id,
    title,
    type,
    urls,
  },
})
