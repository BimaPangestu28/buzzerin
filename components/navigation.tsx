"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white shadow-md py-4" 
        : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <span className={cn(
              "transition-colors",
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              Buzzerin
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about" isScrolled={isScrolled}>About</NavLink>
            <NavLink href="#services" isScrolled={isScrolled}>Services</NavLink>
            <NavLink href="#clients" isScrolled={isScrolled}>Clients</NavLink>
            <NavLink href="#packages" isScrolled={isScrolled}>Packages</NavLink>
            <NavLink href="#testimonials" isScrolled={isScrolled}>Testimonials</NavLink>
            <Button variant={isScrolled ? "default" : "secondary"}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  children, 
  isScrolled 
}: { 
  href: string; 
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link 
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isScrolled ? "text-gray-600" : "text-gray-200"
      )}
    >
      {children}
    </Link>
  )
}