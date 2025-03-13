"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Services", href: "https://www.aidenlabs.ai/#service" },
  { name: "Products", href: "https://www.aidenlabs.ai/#products" },
  { name: "FAQs", href: "https://www.aidenlabs.ai/#faqs" },
  { name: "Contact Us", href: "https://www.aidenlabs.ai/#contact" },
  { name: "Blog", href: "https://www.aidenlabs.ai/blog" },
  { name: "Whitepaper", href: "https://aiden-labs.gitbook.io/aiden-labs" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full max-w-4xl mx-auto px-4 py-4 fixed z-40 top-0 left-0 right-0">
      <div className="flex items-center justify-between bg-muted dark:bg-black rounded-md p-2 backdrop-blur-sm border">
        <Link href="https://www.aidenlabs.ai/" className="flex items-center">
          <Image
            src="/logo.avif"
            alt="Aiden"
            width={512}
            height={137}
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button asChild key={item.name} variant="ghost">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isMenuOpen && (
            <Button asChild>
              <Link href="/quests">Join Quest</Link>
            </Button>
          )}

          <Button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            variant="ghost"
            size="icon"
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile menu - Extension of current menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 p-4 z-50">
          <div className="bg-muted dark:bg-black border rounded-md shadow-lg p-2 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 mb-2">
              <Link
                href="https://www.aidenlabs.ai/"
                className="flex items-center"
              >
                <Image
                  src="/logo.avif"
                  alt="Aiden"
                  width={512}
                  height={137}
                  className="h-7 w-auto"
                />
              </Link>

              <Button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                variant="ghost"
                size="icon"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="flex flex-col">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-center"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </Button>
              ))}
              <Button
                className="mt-2"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/quests">Join Quest</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
