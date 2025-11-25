// Shared font licensing configuration

// Debug utility for font licensing
const DEBUG_FONT_LICENSING_FLAG = false; // Set to true to enable debug logging
const DEBUG_FONT_LICENSING = process.env.NODE_ENV === 'development' && DEBUG_FONT_LICENSING_FLAG;

function debugLog(message: string, data?: unknown) {
  if (DEBUG_FONT_LICENSING) {
    console.log(`[Font Licensing Debug] ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }
}

export interface FontConfig {
  domains: string[];
  patterns?: string[]; // For middleware pattern matching
}

export type FontType = 'tt-hoves' | 'google-fonts' | 'helsinki-grotesk';

export const FONT_DOMAIN_CONFIG: Record<FontType, FontConfig> = {
  // TT Hoves font family - restricted license
  'tt-hoves': {
    domains: [
      'localhost',
      'localhost:3000',
      'polis.local',
      'polis.local:3000',
      'polis-test-gke.digifinland.dev',
      'digifinland.fi',
      'polis.digifinland.fi',
    ],
    patterns: [
      // Add specific hash patterns here when you identify them
      // Example: '016342e792ecadc9' - need to inspect the built app to find these
    ]
  },

  // Google Fonts - broader license terms
  'google-fonts': {
    domains: [
      'localhost',
      'localhost:3000',
      'polis.local',
      'polis.local:3000',
      'polis-test-gke.digifinland.dev',
      'digifinland.fi',
      'polis.digifinland.fi',
    ],
    patterns: [
      // Google Fonts patterns (DM Serif Text, Raleway)
      // These will be different hash patterns from TT Hoves
    ]
  },

  // Helsinki Grotesk font family - restricted to hel.fi domains
  'helsinki-grotesk': {
    domains: [
      'localhost',
      'localhost:3000',
      'polis.local',
      'polis.local:3000',
      'hel.fi',
      'voxit.hel.fi',
      // Add more Helsinki-specific domains as needed
    ],
    patterns: [
      // Add specific hash patterns for Helsinki Grotesk when identified
      // These will be unique to Helsinki Grotesk font files
      '565d73a693abe0776c801607ac28f0bf',
      '533af26cf28d7660f24c2884d3c27eac',
    ]
  }
};

export function isDomainAllowedForFont(hostname: string, fontType: FontType): boolean {
  debugLog('Checking domain permission', { hostname, fontType });

  const config = FONT_DOMAIN_CONFIG[fontType];
  if (!config) {
    debugLog('No configuration found for font type', { fontType });
    return false;
  }

  debugLog('Font configuration', { fontType, config });

  const isAllowed = config.domains.some((domain: string) => {
    const exactMatch = hostname === domain;
    const subdomainMatch = hostname.endsWith('.' + domain);
    const matches = exactMatch || subdomainMatch;

    debugLog('Domain check', {
      hostname,
      domain,
      exactMatch,
      subdomainMatch,
      matches
    });

    return matches;
  });

  debugLog('Final domain permission result', { hostname, fontType, isAllowed });
  return isAllowed;
}

export function getFontTypeFromPath(pathname: string): FontType {
  debugLog('Determining font type from path', { pathname });

  // Try to determine font type from file hash or pattern
  for (const [fontType, config] of Object.entries(FONT_DOMAIN_CONFIG) as [FontType, FontConfig][]) {
    debugLog('Checking font type patterns', { fontType, patterns: config.patterns });

    if (config.patterns && config.patterns.length > 0) {
      const matchedPattern = config.patterns.find((pattern: string) => {
        const matches = pathname.includes(pattern);
        debugLog('Pattern match attempt', { pattern, pathname, matches });
        return matches;
      });

      if (matchedPattern) {
        debugLog('Font type matched by pattern', { fontType, matchedPattern, pathname });
        return fontType;
      }
    }
  }

  // Fallback: if we can't identify the specific font, treat as most restrictive (TT Hoves)
  debugLog('No pattern matched, using fallback font type', { pathname, fallback: 'tt-hoves' });
  return 'tt-hoves';
}

// Helper function to debug font configuration
export function debugFontConfiguration() {
  debugLog('Complete font configuration', FONT_DOMAIN_CONFIG);

  Object.entries(FONT_DOMAIN_CONFIG).forEach(([fontType, config]) => {
    debugLog(`Configuration for ${fontType}`, {
      fontType,
      domains: config.domains,
      patterns: config.patterns,
      domainCount: config.domains.length,
      patternCount: config.patterns?.length || 0
    });
  });
}

// Helper function to test domain matching
export function testDomainMatching(hostname: string) {
  debugLog('Testing domain matching for hostname', { hostname });

  Object.keys(FONT_DOMAIN_CONFIG).forEach((fontType) => {
    const isAllowed = isDomainAllowedForFont(hostname, fontType as FontType);
    debugLog(`Domain test result for ${fontType}`, { hostname, fontType, isAllowed });
  });
}