/**
 * Utility functions for API configuration based on current domain
 */

export interface DomainConfig {
  domain: string;
  apiBaseUrl: string;
}

const DOMAIN_MAPPINGS: DomainConfig[] = [
  {
    domain: 'localhost',
    apiBaseUrl: 'https://polis.local',
  },
  {
    domain: '127.0.0.1',
    apiBaseUrl: 'https://polis.local',
  },
  {
    domain: 'polis.local',
    apiBaseUrl: 'https://polis.local',
  },
  {
    domain: 'polis-test-gke.digifinland.dev',
    apiBaseUrl: 'https://polis-test-gke.digifinland.dev',
  },
  {
    domain: 'polis.digifinland.fi',
    apiBaseUrl: 'https://polis.digifinland.fi',
  },
  {
    domain: 'voxit.hel.fi',
    apiBaseUrl: 'https://voxit.hel.fi',
  },
];

/**
 * Get API base URL based on current domain
 * @param fallback - Fallback URL if no mapping is found
 * @returns API base URL string
 */
export function getApiBaseUrl(fallback?: string): string {
  // Server-side fallback
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || fallback || 'https://polis.local';
  }

  const currentDomain = window.location.hostname;

  // Check for exact domain matches
  const exactMatch = DOMAIN_MAPPINGS.find(config =>
    currentDomain === config.domain || currentDomain.endsWith(`.${config.domain}`)
  );

  if (exactMatch) {
    return exactMatch.apiBaseUrl;
  }
  // Return fallback or default if no match found
  return fallback || 'https://polis.local';
}

