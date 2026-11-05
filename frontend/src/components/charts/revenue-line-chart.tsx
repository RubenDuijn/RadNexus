"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Item = {
  month: string;
  revenue: number;
};

type RevenueLineChartProps = {
  data: Item[];
};

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3a" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1321",
              border: "1px solid #324159",
              borderRadius: 8,
              color: "#e2e8f0",
            }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#35b9d6" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
