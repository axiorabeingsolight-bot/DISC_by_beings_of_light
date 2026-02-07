import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  least: {
    label: "Least",
    color: "oklch(66.7% 0.295 322.15)",
  },
  most: {
    label: "Most",
    color: "oklch(70.4% 0.14 182.503)",
  },
};

const CustomBarChart = ({ chartData }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="type"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="most" fill="var(--color-most)" radius={4} />
        <Bar dataKey="least" fill="var(--color-least)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default CustomBarChart;
