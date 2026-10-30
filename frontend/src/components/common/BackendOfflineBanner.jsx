import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, ServerOff, CheckCircle2 } from 'lucide-react';
import { apiClient, subscribeBackendStatus } from '../../api/client';

export const BackendOfflineBanner = () => {
  const [status, setStatus] = useState({ isOnline: true, error: null });
  const [isRetrying, setIsRetrying] = useState(false);
  const [devOfflineOverride, setDevOfflineOverride] = useState(() => {
    return localStorage.getItem('fixmycity_dev_offline_mode') === 'true';
  });

  useEffect(() => {
    // Initial health check
    apiClient.checkHealth();

    // Subscribe to client status changes
    const unsubscribe = subscribeBackendStatus((newStatus) => {
      setStatus(newStatus);
    });

    // Heartbeat check every 6 seconds
    const interval = setInterval(() => {
      apiClient.checkHealth();
    }, 6000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    await apiClient.checkHealth();
    setTimeout(() => setIsRetrying(false), 500);
  };

  const toggleOverride = () => {
    const nextVal = !devOfflineOverride;
    setDevOfflineOverride(nextVal);
    localStorage.setItem('fixmycity_dev_offline_mode', nextVal.toString());
    window.location.reload();
  };

  if (status.isOnline && !devOfflineOverride) {
    return null; // All good, hide banner
  }

  return (
    <div className="bg-red-600 text-white text-xs py-2 px-4 shadow-md sticky top-0 z-50 border-b border-red-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ServerOff className="w-4 h-4 text-white shrink-0 animate-pulse" />
          <span className="font-bold">Backend Offline:</span>
          <span>
            API unreachable at <code className="bg-red-800/80 px-1.5 py-0.5 rounded font-mono">http://127.0.0.1:8000</code>.
          </span>
          <span className="hidden md:inline text-red-200">
            Start backend with <code className="bg-red-800/80 px-1.5 py-0.5 rounded font-mono">python -m uvicorn main:app</code>.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-1 bg-white text-red-700 font-bold px-2.5 py-1 rounded hover:bg-red-50 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
            <span>{isRetrying ? 'Checking...' : 'Retry Connection'}</span>
          </button>

          <button
            type="button"
            onClick={toggleOverride}
            className="text-[11px] bg-red-800 hover:bg-red-900 px-2 py-1 rounded border border-red-500 font-medium transition-colors"
            title="Toggle client-side mock fallback"
          >
            Dev Mock Fallback: {devOfflineOverride ? 'ENABLED' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
