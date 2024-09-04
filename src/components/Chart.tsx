"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ month: "Monday", present: 186, absent: 80 },
	{ month: "Tuesday", present: 305, absent: 200 },
	{ month: "Wednesday", present: 237, absent: 120 },
	{ month: "Thursday", present: 73, absent: 190 },
	{ month: "Friday", present: 209, absent: 130 },
	{ month: "Saturday", present: 214, absent: 140 },
];

const chartConfig = {
	present: {
		label: "Present",
		color: "#2563eb",
	},
	absent: {
		label: "Absent",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export function Chart() {
	return (
		<ChartContainer
			config={chartConfig}
			className='min-h-[200px] border border-lms-100 p-6 rounded-sm'
		>
			<BarChart
				accessibilityLayer
				data={chartData}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='month'
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent className="rounded"/>} />
				<Bar
					dataKey='present'
					fill='var(--color-present)'
					radius={4}
				/>
				<Bar
					dataKey='absent'
					fill='var(--color-absent)'
					radius={4}
				/>
			</BarChart>
		</ChartContainer>
	);
}
