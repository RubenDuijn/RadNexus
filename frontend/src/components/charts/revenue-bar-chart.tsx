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
          <CartesianGrid strokeDasharray="3 3" stroke="#e6dfd3" />
          <XAxis dataKey={xKey} stroke="#667084" />
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
          <Bar dataKey={yKey} fill="#0f6f8c" radius={[7, 7, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
