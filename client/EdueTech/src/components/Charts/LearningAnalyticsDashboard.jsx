import NavBar from "../components/NavBar";


import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function LearningAnalyticsDashboard() {
    const completedTopicsData = [
        { name: "Completed", value: 6 },
        { name: "Remaining", value: 4 },
    ];

    const lastTopicVideosData = [
        {
            topic: "React Hooks",
            Completed: 8,
            Remaining: 4,
        },
    ];

    const completedVideosData = [
        { topic: "HTML", completed: 10 },
        { topic: "CSS", completed: 12 },
        { topic: "JavaScript", completed: 20 },
        { topic: "React", completed: 18 },
        { topic: "Node.js", completed: 15 },
    ];

    const weeklyTimeData = [
        { day: "Mon", minutes: 40 },
        { day: "Tue", minutes: 60 },
        { day: "Wed", minutes: 55 },
        { day: "Thu", minutes: 70 },
        { day: "Fri", minutes: 80 },
        { day: "Sat", minutes: 90 },
        { day: "Sun", minutes: 65 },
    ];

    const totalTimeMinutes = 1450;

    const totalTopics = completedTopicsData.reduce((sum, item) => sum + item.value, 0);



    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Completed Topics
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={completedTopicsData}
                                    innerRadius={70}
                                    outerRadius={100}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell fill="#7c6cf6" />
                                    <Cell fill="#e5e7eb" />
                                </Pie>

                                <text
                                    x="50%"
                                    y="45%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-2xl font-bold fill-gray-800"
                                >
                                    {Math.round(
                                        (completedTopicsData[0].value / totalTopics) * 100
                                    )}%
                                </text>

                                <text
                                    x="50%"
                                    y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-sm fill-gray-500"
                                >
                                    Completed
                                </text>
                            </PieChart>

                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Last Topic – Video Progress
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <BarChart data={lastTopicVideosData}>
                                <XAxis dataKey="topic" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Completed" fill="#7c6cf6" />
                                <Bar dataKey="Remaining" fill="#e5e7eb" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Completed Videos by Topic
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <BarChart layout="vertical" data={completedVideosData}>
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="topic" />
                                <Tooltip />
                                <Bar dataKey="completed" fill="#7c6cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Time Spent – Last 7 Days
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <LineChart data={weeklyTimeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="minutes"
                                    stroke="#7c6cf6"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="mt-6 bg-white rounded-lg border p-6 text-center">
                <h3 className="text-gray-600 mb-2">Total Time Spent on Platform</h3>
                <p className="text-4xl font-bold text-purple-600">
                    {Math.floor(totalTimeMinutes / 60)}h {totalTimeMinutes % 60}m
                </p>
            </div>
        </div>
    );
}
