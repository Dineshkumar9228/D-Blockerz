import type { FilterList } from '../types/filterList'

export const builtInFilterLists: FilterList[] = [
  {
    id: 'default-ads',
    name: 'Default Ads',
    description: 'Blocks common advertising domains.',
    enabled: true,
    entries: [
      {
        id: 'ads-example',
        domain: 'ads.example.com',
        type: 'ad',
        enabled: true,
      },
      {
        id: 'doubleclick',
        domain: 'doubleclick.net',
        type: 'ad',
        enabled: true,
      },
      {
        id: 'googlesyndication',
        domain: 'googlesyndication.com',
        type: 'ad',
        enabled: true,
      },
      {
        id: 'adnxs',
        domain: 'adnxs.com',
        type: 'ad',
        enabled: true,
      },
      {
        id: 'advertising-com',
        domain: 'advertising.com',
        type: 'ad',
        enabled: true,
      },
    ],
  },

  {
    id: 'default-trackers',
    name: 'Default Trackers',
    description: 'Blocks common tracking domains.',
    enabled: true,
    entries: [
      {
        id: 'tracker-example',
        domain: 'tracker.example.com',
        type: 'tracker',
        enabled: true,
      },
      {
        id: 'matomo',
        domain: 'matomo.cloud',
        type: 'tracker',
        enabled: true,
      },
      {
        id: 'hotjar',
        domain: 'hotjar.com',
        type: 'tracker',
        enabled: true,
      },
      {
        id: 'scorecardresearch',
        domain: 'scorecardresearch.com',
        type: 'tracker',
        enabled: true,
      },
    ],
  },

  {
    id: 'default-analytics',
    name: 'Default Analytics',
    description: 'Blocks common analytics domains.',
    enabled: true,
    entries: [
      {
        id: 'analytics-example',
        domain: 'analytics.example.com',
        type: 'analytics',
        enabled: true,
      },
      {
        id: 'google-analytics',
        domain: 'google-analytics.com',
        type: 'analytics',
        enabled: true,
      },
      {
        id: 'segment',
        domain: 'segment.io',
        type: 'analytics',
        enabled: true,
      },
      {
        id: 'amplitude',
        domain: 'amplitude.com',
        type: 'analytics',
        enabled: true,
      },
    ],
  },
]