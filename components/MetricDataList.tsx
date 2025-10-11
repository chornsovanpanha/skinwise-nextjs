import React from "react";
import MetricCard from "./MetricCard";

type SaleTotal = {
  amount: string;
  percentage: string;
};

export type MetricData = {
  key: string;
  title: string;
  value: string;
  saleTotal?: SaleTotal;
  prefix: string;
  trend?: string;
  btnDropDown?: {
    show: boolean;
    id: string;
    label: string;
    placeholder: string;
  };
  comparisonText: string;
};

type MetricDataListProps = {
  metrics: MetricData[];
  className?: string;
};

const MetricDataList: React.FC<MetricDataListProps> = ({
  metrics,
  className,
}) => {
  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 ${className}`}
    >
      {metrics.map((metric) => (
        <MetricCard
          prefix={metric.prefix}
          key={metric.key}
          title={metric.title}
          btnDropDown={metric.btnDropDown}
          value={metric.value}
          saleTotal={metric.saleTotal}
          comparisonText={metric.comparisonText}
          trend={metric.trend}
        />
      ))}
    </section>
  );
};

export default MetricDataList;
