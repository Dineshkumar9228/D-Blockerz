const PROTECTION_KEY = 'protectionEnabled'
const WHITELIST_KEY = 'whitelist'

export async function getProtectionState(): Promise<boolean> {
  const result = (await chrome.storage.local.get(
    PROTECTION_KEY,
  )) as Record<string, unknown>

  return typeof result[PROTECTION_KEY] === 'boolean'
    ? result[PROTECTION_KEY]
    : true
}

export async function setProtectionState(
  enabled: boolean,
): Promise<void> {
  await chrome.storage.local.set({
    [PROTECTION_KEY]: enabled,
  })
}

export async function getWhitelist(): Promise<string[]> {
  const result = (await chrome.storage.local.get(
    WHITELIST_KEY,
  )) as Record<string, unknown>

  if (!Array.isArray(result[WHITELIST_KEY])) {
    return []
  }

  return [
    ...new Set(
      result[WHITELIST_KEY]
        .filter(
          (domain): domain is string =>
            typeof domain === 'string',
        )
        .map((domain) => domain.trim().toLowerCase())
        .filter(Boolean),
    ),
  ]
}

export async function setWhitelist(
  whitelist: string[],
): Promise<void> {
  const normalizedWhitelist = [
    ...new Set(
      whitelist
        .filter(
          (domain): domain is string =>
            typeof domain === 'string',
        )
        .map((domain) => domain.trim().toLowerCase())
        .filter(Boolean),
    ),
  ]

  await chrome.storage.local.set({
    [WHITELIST_KEY]: normalizedWhitelist,
  })
}

export async function addToWhitelist(
  domain: string,
): Promise<void> {
  const normalizedDomain = domain.trim().toLowerCase()

  if (!normalizedDomain) {
    return
  }

  const whitelist = await getWhitelist()

  if (!whitelist.includes(normalizedDomain)) {
    await setWhitelist([
      ...whitelist,
      normalizedDomain,
    ])
  }
}

export async function removeFromWhitelist(
  domain: string,
): Promise<void> {
  const normalizedDomain = domain.trim().toLowerCase()

  const whitelist = await getWhitelist()

  await setWhitelist(
    whitelist.filter(
      (item) => item !== normalizedDomain,
    ),
  )
}