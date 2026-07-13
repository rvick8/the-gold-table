"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Illustrative MVP data. Replace with a verified data source before launch.
const chartData = [
  { year: "2016", value: 18 },
  { year: "2017", value: 20 },
  { year: "2018", value: 22 },
  { year: "2019", value: 28 },
  { year: "2020", value: 34 },
  { year: "2021", value: 43 },
  { year: "2022", value: 38 },
  { year: "2023", value: 45 },
  { year: "2024", value: 48 },
  { year: "2025", value: 62 },
  { year: "2026", value: 78 },
];

const chartConfig = {
  value: {
    label: "Illustrative gold price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function GoldPriceChart() {
  return <figure className="gold-chart">
    <div className="gold-chart__heading">
      <span>Illustrative gold-price movement</span>
      <span>2016–2026</span>
    </div>
    <ChartContainer config={chartConfig} className="h-[270px] w-full" initialDimension={{ width: 760, height: 270 }}>
      <LineChart accessibilityLayer data={chartData} margin={{ top: 12, right: 10, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="0" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={12} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={48} tickFormatter={(value) => `£${value}`} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Line dataKey="value" type="natural" stroke="var(--color-value)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ChartContainer>
    <figcaption>Illustrative trend only · Not live market data</figcaption>
  </figure>;
}
