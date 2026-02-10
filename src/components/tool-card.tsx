import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavItem } from "@/config/nav"; // Assuming NavItem is defined in nav.ts

interface ToolCardProps {
  tool: NavItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link key={tool.id} href={tool.href}>
      <Card
        className={`group relative h-full transition-all hover:shadow-lg hover:-translate-y-1 hover:border-blue-200`}
      >
        <CardHeader>
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-lg p-2 transition-colorsbg-blue-50">
              {/* 아이콘 색상도 상태에 따라 자동 변경 */}
              <tool.icon className="text-blue-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
          </div>
          <CardTitle className="text-xl">{tool.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {tool.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
