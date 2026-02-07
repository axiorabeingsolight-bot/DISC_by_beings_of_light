import { Pie, PieChart, Sector } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const CustomPieChart = ({ chartData, activeFunction }) => {
  const getActiveIndex = () => {
    let index = 0;
    for (let i = 0; i < 4; i++) {
      if (activeFunction(chartData[i].value, chartData[index].value)) index = i;
    }

    return index;
  };

  return (
    <ChartContainer
      config={{}}
      className="mx-auto aspect-square max-h-62.5"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="type"
          innerRadius={60}
          strokeWidth={5}
          activeIndex={getActiveIndex()}
          activeShape={({ outerRadius = 0, ...props }) => (
            <Sector {...props} outerRadius={outerRadius + 10} />
          )}
        />
      </PieChart>
    </ChartContainer>
  );
};

export default CustomPieChart;
