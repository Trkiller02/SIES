'use client'

import BarChart from '@/components/Charts2';
import DashboardLayout from './dashboard/layout';

export default function Home() {
  return (
    <DashboardLayout>
      <section className='w-1/2 block'>
        <BarChart />
        <BarChart />
      </section>

    </DashboardLayout>
  );
}