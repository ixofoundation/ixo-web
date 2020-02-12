export interface Dictionary<T> {
  [key: string]: T
}

export interface Ping {
  jsonrpc: string
  id: number
  result: string
}

export enum StatType {
  decimal = 'DECIMAL',
  fraction = 'FRACTION',
  ixoAmount = 'IXO',
}

export enum contentType {
  overview = 'OVERVIEW',
  dashboard = 'DASHBOARD',
  evaluators = 'EVALUATORS',
  claims = 'CLAIMS',
  newClaim = 'NEW_CLAIM',
  singleClaim = 'SINGLE_CLAIM',
  investors = 'INVESTORS',
  serviceProviders = 'SERVICE_PROVIDERS',
}

export enum AgentRoles {
  owners = 'PO',
  evaluators = 'EA',
  serviceProviders = 'SA',
  investors = 'IA',
}

export enum MatchType {
  exact = 'EXACT',
  strict = 'STRICT',
}

export interface Statistic {
  title?: string
  type: StatType
  amount: number | number[]
  descriptor?: { class: string; value: string | number }[]
  onClick?: Function
}

export interface DidDoc {
  did: string
  pubKey: string
}
export interface UserInfo {
  didDoc: DidDoc
  name: string
  ledgered: boolean
  loggedInKeysafe: boolean
  hasKYC: boolean
}

export enum ErrorTypes {
  goBack = 'GOBACK',
  message = 'MESSAGE',
}

export enum FormStyles {
  modal = 'MODAL',
  standard = 'STANDARD',
  disabled = 'DISABLED',
}

export enum RenderType {
  widget = 'WIDGET',
  fullPage = 'FULLPAGE',
}

export interface Header {
  title: string
  titleNoCaps?: boolean
  subtitle?: string
  icon?: JSX.Element
  image?: string
  width?: string
}
