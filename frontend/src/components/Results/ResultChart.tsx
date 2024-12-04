import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { FaRegChartBar } from "react-icons/fa";

const weeklyData = [
	{ name: "Mon", played: 2 },
	{ name: "Tue", played: 4 },
	{ name: "Wed", played: 6 },
	{ name: "Thu", played: 3 },
	{ name: "Fri", played: 7 },
	{ name: "Sat", played: 11 },
	{ name: "Sun", played: 9 }
];

const ResultChart = () => {
    return (
        <motion.div
            className='bg-cyan-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded p-2 border border-cyan-900'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <p className="flex gap-2 items-center text-rose-500 pb-4">
                <FaRegChartBar className="text-slate-400 text-2xl" />
                Game Insights
            </p>

            <div className="h-80">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#155e75' />
						<XAxis dataKey={"name"} stroke='#22d3ee' />
                        <YAxis stroke='#22d3ee' />
                        
                        <Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
                        />
                        
                        <Line
							type='monotone'
							dataKey='played'
							stroke='#749657'
							strokeWidth={2}
							dot={{ fill: "#f43f5e", strokeWidth: 2, r: 4 }}
							activeDot={{ r: 6, strokeWidth: 1 }}
                        />
                        
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </motion.div>
    )
}
export default ResultChart