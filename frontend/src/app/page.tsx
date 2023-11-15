'use client'

import BarChart from '@/components/Charts';
import DashboardLayout from './dashboard/layout';

export default function Home() {
  return (
    <DashboardLayout>
      <BarChart />
    </DashboardLayout>
  );
}
