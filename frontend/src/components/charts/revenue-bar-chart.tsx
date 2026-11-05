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
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3a" />
          <XAxis dataKey={xKey} stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b1321",
              border: "1px solid #324159",
              borderRadius: 8,
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey={yKey} fill="#35b9d6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
