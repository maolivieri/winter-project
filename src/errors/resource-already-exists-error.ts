export class ResourceAlreadyExistsError extends Error {
  constructor (resource: string, property: string) {
    super(`A ${resource} with same ${property} already exists.`)
  }
}
