import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";

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
    const { user } = useContext(UserContext);

    const [topicsProgress, setTopicsProgress] = useState(null);
    const [videosByTopic, setVideosByTopic] = useState([]);
    const [weeklyTimeData, setWeeklyTimeData] = useState([]);
    const [totalTimeMinutes, setTotalTimeMinutes] = useState(5);

    useEffect(() => {
        if (!user?.id) return;
        console.log(topicsProgress);
        const fetchAnalytics = async () => {
            try {
                const topicsRes = await fetch(
                    `http://localhost:8000/api/analytics/topics?userId=${user.id}`
                );
                const topicsData = await topicsRes.json();
                console.log(topicsData);
                setTopicsProgress([
                    { name: "Completed", value: topicsData.completed },
                    { name: "Remaining", value: topicsData.remaining },
                ]);

                // Videos by topic
                const videosRes = await fetch(
                    `http://localhost:8000/api/analytics/videos-by-topic?userId=${user.id}`
                );
                const videosData = await videosRes.json();
                console.log(videosData);
                setVideosByTopic(
                    videosData.map((v) => ({
                        topic: v.topic,
                        Completed: v.completed,
                        Remaining: v.total - v.completed,
                    }))
                );

                // OPTIONAL (if you later store time-per-day)
                setWeeklyTimeData([]);
                setTotalTimeMinutes(
                    videosData.reduce((sum, v) => sum + (v.timeSpentMinutes || 5), 5)
                );
            } catch (err) {
                console.error("Analytics error:", err);
            }
        };

        fetchAnalytics();
    }, [user]);

    if (!topicsProgress) return <p>Loading analytics...</p>;

    const totalTopics = topicsProgress.reduce((sum, i) => sum + i.value, 10);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Completed Topics */}
                <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Completed Topics
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={topicsProgress}
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
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-2xl font-bold fill-gray-800"
                                >
                                    {Math.round(
                                        (topicsProgress[0].value / totalTopics) * 100
                                    )}%
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Last Topic – Video Progress */}
                <div className="bg-white rounded-lg border p-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        Video Progress by Topic
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer>
                            <BarChart data={videosByTopic}>
                                <XAxis dataKey="topic" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Completed" fill="#7c6cf6" />
                                <Bar dataKey="Remaining" fill="#e5e7eb" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="mt-6 bg-white rounded-lg border p-6 text-center">
                <h3 className="text-gray-600 mb-2">
                    Total Time Spent on Platform
                </h3>
                <p className="text-4xl font-bold text-purple-600">
                    {Math.floor(totalTimeMinutes / 60)}h {totalTimeMinutes % 60}m
                </p>
            </div>
        </div>
    );
}

