import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import lastSalesData from "./_components/last-sales.json";
import productListData from "./_components/product-list.json";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable lastSales={lastSalesData} productList={productListData} />
    </div>
  );
}
