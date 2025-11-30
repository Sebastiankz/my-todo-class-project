import * as Sentry from '@sentry/react';

export function SentryTestButton() {
  const testSentryError = () => {
    const timestamp = new Date().toISOString();
    const error = new Error(`Test error from Sentry test button - ${timestamp}`);
    
    Sentry.captureException(error, {
      tags: {
        test_button: 'true',
        timestamp: timestamp,
      },
      extra: {
        message: 'This is a test error to verify Sentry integration',
        clicked_at: timestamp,
      },
    });
    
    alert('Error sent to Sentry! Check the dashboard in about 1 minute.');
  };

  return (
    <button
      onClick={testSentryError}
      className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
      type="button"
    >
      Test Sentry Error Tracking
    </button>
  );
}