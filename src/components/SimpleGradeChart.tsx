import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const gradeData = [
  { grade: "A", count: 45, color: "#22c55e", percentage: 18.4 },
  { grade: "B", count: 78, color: "#3b82f6", percentage: 31.8 },
  { grade: "C", count: 67, color: "#f59e0b", percentage: 27.3 },
  { grade: "D", count: 38, color: "#ef4444", percentage: 15.5 },
  { grade: "E", count: 17, color: "#6b7280", percentage: 6.9 },
];

const subjectPerformance = [
  { subject: "Math", average: 72, passRate: 84 },
  { subject: "English", average: 76, passRate: 89 },
  { subject: "Kiswahili", average: 68, passRate: 78 },
  { subject: "Chemistry", average: 65, passRate: 72 },
  { subject: "Physics", average: 63, passRate: 69 },
  { subject: "Biology", average: 71, passRate: 81 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === 'passRate' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">Grade {data.grade}</p>
        <p style={{ color: data.color }}>
          Students: {data.count} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export function SimpleGradeChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Grade Distribution Pie Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Grade Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gradeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              label={({ percentage }) => `${percentage.toFixed(0)}%`}
            >
              {gradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-2">
          {gradeData.map((entry) => (
            <div key={entry.grade} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                Grade {entry.grade}: {entry.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Performance Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Subject Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="subject" 
              angle={-45}
              textAnchor="end"
              height={60}
              fontSize={12}
              stroke="#64748b"
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="average" 
              fill="#3b82f6" 
              name="Average Score"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="passRate" 
              fill="#22c55e" 
              name="Pass Rate"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}