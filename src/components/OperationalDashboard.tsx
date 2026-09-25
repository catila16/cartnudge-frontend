import React, { useEffect, useState } from 'react';
import KPICards from './KPICards';
import LiveCartsTable from './LiveCartsTable';

import Paywall from './Paywall';
import { Loader2 } from 'lucide-react';
import { getAISettings } from '../api/client';

export function OperationalDashboard() {
  const [billingStatus, setBillingStatus] = useState<string | null>('ACTIVE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const settings = await getAISettings();
        if (settings && settings.billingStatus) {
          setBillingStatus(settings.billingStatus);
        }
      } catch (error) {
        console.error("Failed to check billing status", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  const isLocked = billingStatus !== 'ACTIVE';

  return (
    <div className="relative font-sans">
      {isLocked && <Paywall />}
      <main className="max-w-7xl mx-auto space-y-6">
        <KPICards />
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <LiveCartsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
