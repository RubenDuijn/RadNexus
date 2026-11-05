"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Item = {
  [key: string]: string | number;
};

type RevenueBarChartProps = {
  data: Item[];
  xKey: string;
  yKey: string;
};

export function RevenueBarChart({ data, xKey, yKey }: RevenueBarChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ed" />
          <XAxis dataKey={xKey} stroke="#657386" />
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
          <Bar dataKey={yKey} fill="#245d70" radius={[7, 7, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
