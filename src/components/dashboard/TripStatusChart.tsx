
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface TripStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

const TripStatusChart = ({ data, className }: TripStatusChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Trip Status Overview</CardTitle>
        <CardDescription>Distribution of trips by their status</CardDescription>
      </CardHeader>
      <CardContent className="pl-1">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} trips`, 'Count']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconSize={10}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripStatusChart;
