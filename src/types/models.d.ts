/** TodoMVC model definitions **/

export interface Dictionary<T> {
    [key: string]: T
}

export interface IPingResult {
    jsonrpc: string,
    id: number,
    result: string
}

export interface ICredentialProviderResult {
    provider: any,
    credentialProviderInstance: any,
}

export interface ICustomButton {
    headerLabel: string,
    buttonLabel: string,
    callback: (row, selectedOption?) => void
}