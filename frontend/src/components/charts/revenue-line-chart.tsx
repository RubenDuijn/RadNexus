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
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ed" />
          <XAxis dataKey="month" stroke="#657386" />
          <YAxis stroke="#657386" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #dce3ea",
              borderRadius: 10,
              color: "#172433",
              boxShadow: "0 10px 24px rgba(23, 36, 51, 0.1)",
            }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#245d70" strokeWidth={2.6} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
