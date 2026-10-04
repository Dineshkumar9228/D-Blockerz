export type FilterEntry = {
  id: string
  domain: string
  type: 'ad' | 'tracker' | 'analytics'
  enabled: boolean
}

export type FilterList = {
  id: string
  name: string
  description: string
  enabled: boolean
  entries: FilterEntry[]
}