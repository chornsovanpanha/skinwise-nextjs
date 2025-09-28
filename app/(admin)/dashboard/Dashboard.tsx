"use client";
import MetricDataList from "@/components/MetricDataList";
import { overviewDashboard, recentProductsListing } from "@/utils/mock";
import { ProductDataTable } from "./products/(tables)/ProductTable";
import { productColumns } from "./products/(tables)/column";
import { Typography } from "@/components/Typography";
import Section from "@/components/Section";
const Dashboard = () => {
  return (
    <main className="py-2 space-y-6">
      <MetricDataList metrics={overviewDashboard} />
      <Section name="recent-subscription">
        <Typography variant="h6">Recent Subscription</Typography>
        <ProductDataTable
          columns={productColumns}
          data={recentProductsListing}
        />
      </Section>
      <Section name="recent-users">
        <Typography variant="h6">Recent Users</Typography>
        <ProductDataTable
          columns={productColumns}
          data={recentProductsListing}
        />
      </Section>
    </main>
  );
};

export default Dashboard;
