import * as Sentry from '@sentry/react';
import { useState } from 'react';

export function SentryTestButton() {
  const [showNotification, setShowNotification] = useState(false);

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
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <button
        onClick={testSentryError}
        className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
        type="button"
      >
        Test Sentry Error Tracking
      </button>

      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Error sent to Sentry!</p>
              <p className="text-sm text-green-100">Check the dashboard in about 1 minute.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}