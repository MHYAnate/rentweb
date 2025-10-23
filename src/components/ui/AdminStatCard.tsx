import { cn } from "@/lib/utils"; // if you have a className merge util
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Home,
  ShieldAlert,
  MessageSquare,
  Star,
  Eye,
  TrendingUp,
  CheckCircle,
  XCircle,
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  trend: "up" | "down" | "neutral";
  alert?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  alert = false,
}) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  const bgColors = {
    up: "bg-gradient-to-tr from-green-50 to-green-100",
    down: "bg-gradient-to-tr from-red-50 to-red-100",
    neutral: "bg-gradient-to-tr from-gray-50 to-gray-100",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-100 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5",
        alert && "border-red-300"
      )}
    >
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-transparent opacity-70 pointer-events-none" />

      <CardContent className="relative p-6">
        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
              {title}
            </p>
            <p className="text-3xl font-extrabold mt-2 text-gray-900">
              {value}
            </p>
            {description && (
              <p
                className={cn(
                  "text-sm mt-2",
                  alert ? "text-red-600 font-medium" : "text-gray-500"
                )}
              >
                {description}
              </p>
            )}
          </div>

          <div
            className={cn(
              "p-4 rounded-xl shadow-inner",
              bgColors[trend]
            )}
          >
            <Icon
              className={cn(
                "h-7 w-7 transition-transform duration-300",
                alert ? "text-red-600" : trendColors[trend],
                trend === "up" && "group-hover:scale-110",
                trend === "down" && "group-hover:scale-90"
              )}
            />
          </div>
        </div>

        {alert && (
          <span className="absolute top-3 right-3 text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            Alert
          </span>
        )}
      </CardContent>
    </Card>
  );
};
