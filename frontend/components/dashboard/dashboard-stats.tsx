import { MessageCircle, Clock, TrendingUp, Star } from "lucide-react"

type StatChangeType = "positive" | "negative" | "neutral"

interface DashboardStat {
  icon: typeof MessageCircle
  title: string
  value: string
  change: string
  changeType: StatChangeType
}

const stats: DashboardStat[] = [
  {
    icon: MessageCircle,
    title: "Total Conversations",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
  },
  {
    icon: Clock,
    title: "Hours Saved",
    value: "156",
    change: "+8%",
    changeType: "positive",
  },
  {
    icon: TrendingUp,
    title: "Productivity Boost",
    value: "34%",
    change: "+5%",
    changeType: "positive",
  },
  {
    icon: Star,
    title: "Satisfaction Score",
    value: "4.9",
    change: "0%",
    changeType: "neutral",
  },
]

export function DashboardStats() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-sm font-medium ${
                stat.changeType === "positive"
                  ? "text-green-400"
                  : stat.changeType === "negative"
                    ? "text-red-400"
                    : "text-gray-400"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.title}</div>
        </div>
      ))}
    </div>
  )
}
