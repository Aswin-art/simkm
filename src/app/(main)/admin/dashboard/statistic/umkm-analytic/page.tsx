"use client";
import { useCallback, useEffect, useState } from "react";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import { toast } from "sonner";
import { getAdminDashboardAnalytics } from "@/actions/admin-analytic";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleFetchAnalyticData = useCallback(async () => {
    const response = await getAdminDashboardAnalytics();

    setData({
      cards: response.cards,
      chart: response.chart,
      table: response.table,
    });
    setIsLoading(false);
  }, []);
  useEffect(() => {
    handleFetchAnalyticData();
  }, []);
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {isLoading ? (
        <div className="text-muted-foreground py-10 text-center text-sm">Memuat data dashboard...</div>
      ) : (
        <>
          <SectionCards data={data.cards} />
          <ChartAreaInteractive data={data.chart} />
          <DataTable lastSales={data.table} />
        </>
      )}
    </div>
  );
}
