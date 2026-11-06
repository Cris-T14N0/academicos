"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { progressBySemester } from "@/lib/data/portal";

export function ProgressChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={progressBySemester} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
          <defs>
            <linearGradient id="mediaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f8cf5" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2f8cf5" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="semester"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            domain={[10, 20]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 12,
              color: "var(--foreground)",
            }}
            formatter={(value) => [`${value} valores`, "Média"]}
          />
          <Area
            type="monotone"
            dataKey="media"
            stroke="#2f8cf5"
            strokeWidth={2.5}
            fill="url(#mediaFill)"
            dot={{ r: 3, fill: "#2f8cf5", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
