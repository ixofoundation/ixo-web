import { Dispatch } from 'redux'
import { FormData } from 'common/components/JsonForm/types'
import { ApiListedEntity } from 'common/api/blocksync-api/types/entities'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import { PageContent } from 'common/api/blocksync-api/types/page-content'
import { Attestation } from 'modules/EntityClaims/types'
import { fromBase64 } from 'js-base64'
import {
  UpdateExistingEntityDidAction,
  CreateEntityTemplateActions,
  ValidatedAction
} from './types'
import { importEntityPageContent } from '../CreateEntityPageContent/CreateEntityPageContent.actions'
import { importEntityClaims } from '../CreateEntityClaims/CreateEntityClaims.actions'
import { importEntitySettings } from '../CreateEntitySettings/CreateEntitySettings.actions'
import { importEntityAdvanced } from '../CreateEntityAdvanced/CreateEntityAdvanced.actions'

const PDS_URL = process.env.REACT_APP_PDS_URL

export const updateExistingEntityDid = (formData: FormData): UpdateExistingEntityDidAction => {
  const { existingEntityDid } = formData

  return {
    type: CreateEntityTemplateActions.UpdateExistingEntityDid,
    payload: {
      existingEntityDid
    }
  }
}

export const fetchExistingEntity = (did: string) =>(
  dispatch: Dispatch) => {
  const fetchEntity: Promise<ApiListedEntity> = blocksyncApi.project.getProjectByProjectDid(
    did,
  )

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  fetchEntity.then((apiEntity: ApiListedEntity) => {
    return fetchContent(apiEntity.data.page.cid).then((resourceData: ApiResource) => {
      const content: PageContent | Attestation = JSON.parse(
        fromBase64(resourceData.data),
      )

      dispatch(importEntityPageContent({
        "header": {
          "title": "Enter title",
          "shortDescription": "Enter Description",
          "sdgs": ["2"],
          "brand": "Enter Brand",
          "location": "AI",
          "headerFileSrc": "https://pds_pandora.ixo.world/public/otaq9kelrvkqqml4lf",
          "headerFileUploading": false,
          "logoFileSrc": "https://pds_pandora.ixo.world/public/7hkqhgfv67ckqqmler9",
          "logoFileUploading": false
        },
        "body": {
          "6353af7e-d2e0-423e-ae5f-025485dc995d": {
            "id": "6353af7e-d2e0-423e-ae5f-025485dc995d",
            "title": "First Sectoin",
            "content": "First Section Content",
            "uploading": false,
            "fileSrc": "https://pds_pandora.ixo.world/public/79waz6ae6c3kqqmlvb3"
          },
          "0608dc0a-2d4e-45b2-a18b-8deb7012a1f4": {
            "id": "0608dc0a-2d4e-45b2-a18b-8deb7012a1f4",
            "title": "Second Section",
            "content": "Second section content",
            "uploading": false,
            "fileSrc": "https://pds_pandora.ixo.world/public/xj7u61ccjhkqqmm80w"
          }
        },
        "images": {
          "c780fdc5-691e-4bd5-8b6f-ed86ea6707e3": {
            "id": "c780fdc5-691e-4bd5-8b6f-ed86ea6707e3",
            "title": "First Image",
            "content": "First Image content",
            "uploading": false,
            "fileSrc": "https://pds_pandora.ixo.world/public/ntmw667uyhkkqqmmjm6"
          }
        },
        "profiles": {
          "87b69a24-66b4-4de3-bfeb-d92e12bb40e3": {
            "id": "87b69a24-66b4-4de3-bfeb-d92e12bb40e3",
            "name": "First Profile",
            "position": "first Position",
            "uploading": false,
            "fileSrc": "https://pds_pandora.ixo.world/public/lmmzgtuap8kqqmmqa0"
          }
        },
        "social": {},
        "embedded": {
          "02a90c91-63c0-421f-8a3b-4b12c7945374": {
            "id": "02a90c91-63c0-421f-8a3b-4b12c7945374",
            "title": "Enter Title",
            "urls": ["https://www.youtube.com/watch?v=It33dR1OTZQ"]
          }
        },
        "validation": {
          "header": {
            "identifier": "header",
            "validated": true,
            "errors": []
          },
          "6353af7e-d2e0-423e-ae5f-025485dc995d": {
            "identifier": "6353af7e-d2e0-423e-ae5f-025485dc995d",
            "validated": true,
            "errors": []
          },
          "0608dc0a-2d4e-45b2-a18b-8deb7012a1f4": {
            "identifier": "0608dc0a-2d4e-45b2-a18b-8deb7012a1f4",
            "validated": true,
            "errors": []
          },
          "c780fdc5-691e-4bd5-8b6f-ed86ea6707e3": {
            "identifier": "c780fdc5-691e-4bd5-8b6f-ed86ea6707e3",
            "validated": true,
            "errors": []
          },
          "87b69a24-66b4-4de3-bfeb-d92e12bb40e3": {
            "identifier": "87b69a24-66b4-4de3-bfeb-d92e12bb40e3",
            "validated": true,
            "errors": []
          },
          "social": {
            "identifier": "social",
            "validated": true,
            "errors": []
          },
          "02a90c91-63c0-421f-8a3b-4b12c7945374": {
            "identifier": "02a90c91-63c0-421f-8a3b-4b12c7945374",
            "validated": true,
            "errors": []
          }
        }
      }))

      dispatch(importEntityClaims({
        "entityClaims": {
          "1dd93f19-1161-49e6-8f15-11058fe2bf94": {
            "id": "1dd93f19-1161-49e6-8f15-11058fe2bf94",
            "template": {
              "id": "b6f65390-4e96-4b5b-9c51-4edb0083f1ab",
              "entityClaimId": "1dd93f19-1161-49e6-8f15-11058fe2bf94",
              "templateId": "did:ixo:GKwvquExWzm7JUwzW5nmtH",
              "title": "Claim",
              "description": "1",
              "isPrivate": false,
              "minTargetClaims": 5,
              "maxTargetClaims": 10,
              "goal": "Test Goal",
              "submissionStartDate": "22-Jul-2021",
              "submissionEndDate": "15-Aug-2021"
            },
            "agentRoles": {},
            "evaluations": {},
            "approvalCriteria": {},
            "enrichments": {}
          }
        },
        "validation": {
          "b6f65390-4e96-4b5b-9c51-4edb0083f1ab": {
            "identifier": "b6f65390-4e96-4b5b-9c51-4edb0083f1ab",
            "validated": true,
            "errors": []
          },
          "creator": {
            "identifier": "creator",
            "validated": true,
            "errors": []
          },
          "owner": {
            "identifier": "owner",
            "validated": true,
            "errors": []
          },
          "status": {
            "identifier": "status",
            "validated": true,
            "errors": []
          },
          "headline": {
            "identifier": "headline",
            "validated": true,
            "errors": []
          },
          "version": {
            "identifier": "version",
            "validated": true,
            "errors": []
          },
          "termsofuse": {
            "identifier": "termsofuse",
            "validated": true,
            "errors": []
          },
          "privacy": {
            "identifier": "privacy",
            "validated": true,
            "errors": []
          },
          "filter": {
            "identifier": "filter",
            "validated": true,
            "errors": []
          }
        }
      }))

      dispatch(importEntitySettings({
        "creator": {
          "displayName": "Enter Ttile",
          "location": "AI",
          "email": "test@test.com",
          "website": "https://test.com",
          "mission": "1234",
          "creatorId": "1234",
          "fileSrc": "https://pds_pandora.ixo.world/public/ff7s55prehskqqodwbs",
          "uploading": false
        },
        "owner": {
          "displayName": "Enter Ttile",
          "location": "AI",
          "email": "test@test.com",
          "website": "https://test.com",
          "mission": "1234",
          "ownerId": "1234",
          "fileSrc": "https://pds_pandora.ixo.world/public/ff7s55prehskqqodwbs",
          "uploading": false
        },
        "status": {
          "startDate": "23-Jul-2021",
          "endDate": "19-Aug-2021",
          "stage": "Paused"
        },
        "version": {
          "versionNumber": "11",
          "effectiveDate": "21-Jul-2021"
        },
        "termsOfUse": {
          "type": "OnceOffFee",
          "paymentTemplateId": "1234124214"
        },
        "privacy": {
          "pageView": "Public",
          "entityView": "Visible"
        },
        "requiredCredentials": {},
        "filters": {
          "Project Type": ["Behaviour Change"],
          "SDG": ["SDG4 – Quality Education"],
          "Stage": ["Planning"],
          "Sector": ["Relayer Launchpad"]
        },
        "displayCredentials": {},
        "validation": {
          "b6f65390-4e96-4b5b-9c51-4edb0083f1ab": {
            "identifier": "b6f65390-4e96-4b5b-9c51-4edb0083f1ab",
            "validated": true,
            "errors": []
          },
          "creator": {
            "identifier": "creator",
            "validated": true,
            "errors": []
          },
          "owner": {
            "identifier": "owner",
            "validated": true,
            "errors": []
          },
          "status": {
            "identifier": "status",
            "validated": true,
            "errors": []
          },
          "headline": {
            "identifier": "headline",
            "validated": true,
            "errors": []
          },
          "version": {
            "identifier": "version",
            "validated": true,
            "errors": []
          },
          "termsofuse": {
            "identifier": "termsofuse",
            "validated": true,
            "errors": []
          },
          "privacy": {
            "identifier": "privacy",
            "validated": true,
            "errors": []
          },
          "filter": {
            "identifier": "filter",
            "validated": true,
            "errors": []
          }
        },
        "headlineTemplateId": "did:ixo:GKwvquExWzm7JUwzW5nmtH",
        "embeddedAnalytics": {}
      }))

      dispatch(importEntityAdvanced({
        "linkedEntities": {},
        "payments": {},
        "staking": {},
        "nodes": {
          "1c0c9186-9a02-4c1b-af00-b33962c01459": {
            "id": "1c0c9186-9a02-4c1b-af00-b33962c01459",
            "type": "CellNode",
            "nodeId": "12341234",
            "serviceEndpoint": "https://pds_pandora.ixo.world"
          }
        },
        "funding": {},
        "keys": {},
        "services": {},
        "dataResources": {},
        "validation": {}
      }))
    })
  }).catch((err) => {
    dispatch({
      type: CreateEntityTemplateActions.FetchExistingEntityFailure,
    })
  })
}

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityTemplateActions.Validated,
  payload: {
    identifier,
  },
})