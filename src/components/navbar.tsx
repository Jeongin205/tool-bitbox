"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Github, Menu, X, ChevronRight } from "lucide-react"; // X(닫기), 화살표 아이콘 추가
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { SITE_MENU } from "@/config/nav";

export function Navbar() {
  // 메뉴 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // 메뉴 토글 함수
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const tools = SITE_MENU.filter((item) => item.id !== "quiz");
  const quiz = SITE_MENU.find((item) => item.id === "quiz");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 1. 로고 */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            onClick={() => setIsMenuOpen(false)} // 로고 클릭 시 메뉴 닫기
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-blue-200">
              <Box size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              ToolBit<span className="text-blue-600">Box</span>
            </span>
          </Link>

          {/* 2. 데스크탑 메뉴 (기존 유지) */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>도구 모음</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {tools.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {quiz && (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href={quiz.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {quiz.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={navigationMenuTriggerStyle()}
                    >
                      소개 (About)
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* 3. 우측 아이콘 & 모바일 햄버거 */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden md:flex"
          >
            <a
              href="https://github.com/Jeongin205/toolbitbox"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>

          {/* 햄버거 버튼 (클릭 시 토글) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" /> // 열려있으면 X 아이콘
            ) : (
              <Menu className="h-5 w-5" /> // 닫혀있으면 햄버거 아이콘
            )}
            <span className="sr-only">메뉴 토글</span>
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 
        헤더 바로 아래에 위치하며, isMenuOpen일 때만 렌더링됨 
      */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full border-b bg-white shadow-lg animate-in slide-in-from-top-5 duration-200 md:hidden">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {/* 메뉴 그룹 1: 도구들 */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tools
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {tools.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)} // 클릭 시 닫기
                    className="flex items-center justify-between rounded-md p-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">{item.title}</div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 퀴즈 메뉴 추가 */}
            {quiz && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Learning
                </h4>
                <Link
                  href={quiz.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-md p-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">{quiz.title}</div>
                  <ChevronRight className="h-4 w-4 text-blue-400" />
                </Link>
              </div>
            )}

            {/* 메뉴 그룹 2: 일반 링크 */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                General
              </h4>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-md p-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                소개 (About)
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
              <a
                href="https://github.com/Jeongin205/toolbitbox"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-md p-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                GitHub 저장소
                <Github className="h-4 w-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ListItem 컴포넌트
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
