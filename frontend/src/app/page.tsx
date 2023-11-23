"use client";

import BarChart from "@/components/Charts2";
import DashboardLayout from "./dashboard/layout";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <DashboardLayout>
      <div className='flex flex-col gap-4 justify-center items-center w-2/4 p-4 border border-gray-300 shadow-inner rounded-xl scale-125 m-7'>
        <img src="img/image1.svg" width={150} height={150} />
        <p className='font-light'>
          Con la única convicción de servir y ofrecer una educación de calidad.
        </p>
      </div>
    </DashboardLayout>
  );
}
