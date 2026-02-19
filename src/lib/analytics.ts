type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

/**
 * Fire a tracking event to any connected analytics provider.
 * Safe to call even when no provider is loaded — silently no-ops.
 */
export function trackEvent(event: string, params?: EventParams) {
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* gtag not available */
  }
}
