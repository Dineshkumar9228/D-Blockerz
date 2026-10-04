export async function getCurrentDomain(): Promise<string> {
  try {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    })

    const url = tabs[0]?.url

    if (!url) {
      return 'Unknown'
    }

    const parsedUrl = new URL(url)

    if (
      parsedUrl.protocol === 'chrome:' ||
      parsedUrl.protocol === 'edge:' ||
      parsedUrl.protocol === 'about:'
    ) {
      return 'Browser page'
    }

    return parsedUrl.hostname
  } catch (error) {
    console.error('Failed to get current domain:', error)
    return 'Unknown'
  }
}