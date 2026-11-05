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
          <CartesianGrid strokeDasharray="3 3" stroke="#e6dfd3" />
          <XAxis dataKey="month" stroke="#667084" />
          <YAxis stroke="#667084" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #d6cfc3",
              borderRadius: 10,
              color: "#25313d",
              boxShadow: "0 10px 24px rgba(33, 38, 46, 0.09)",
            }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#0f6f8c" strokeWidth={2.6} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
