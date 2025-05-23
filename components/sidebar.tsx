"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, ChevronLeft, ChevronRight, User, Sprout } from "lucide-react"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-[#003344] h-screen transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 border-b border-[#004455] flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center">
              <img src="/Logo.png" alt="Logo"/>
            </div>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-md flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-white hover:bg-[#004455]"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start ${collapsed ? "px-2" : ""} text-white hover:bg-[#004455]`}
              >
                <div className="h-5 w-5 rounded-full bg-[#FFB347] flex items-center justify-center mr-2">
                  <LayoutDashboard className="h-3 w-3 text-[#003344]" />
                </div>
                {!collapsed && <span>Dashboard</span>}
              </Button>
            </Link>
            <Link href="/plantaciones" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start ${collapsed ? "px-2" : ""} text-white hover:bg-[#004455]`}
              >
                <div className="h-5 w-5 rounded-full bg-[#4CAF50] flex items-center justify-center mr-2">
                  <Sprout className="h-3 w-3 text-[#003344]" />
                </div>
                {!collapsed && <span>Plantaciones</span>}
              </Button>
            </Link>
            <Link href="/configuracion" passHref>
              <Button
                variant="ghost"
                className={`w-full justify-start ${collapsed ? "px-2" : ""} text-white hover:bg-[#004455]`}
              >
                <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center mr-2">
                  <Settings className="h-3 w-3 text-[#003344]" />
                </div>
                {!collapsed && <span>Configuración</span>}
              </Button>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-[#004455]">
          <div className={`flex ${collapsed ? "justify-center" : "items-center"}`}>
            {collapsed ? (
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <User className="h-4 w-4 text-[#003344]" />
              </div>
            ) : (
              <>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  <User className="h-4 w-4 text-[#003344]" />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-300">Administrador</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
