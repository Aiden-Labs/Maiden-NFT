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
  { name: "Blog", href: "https://www.aidenlabs.ai/blog" },
  { name: "Whitepaper", href: "https://aiden-labs.gitbook.io/aiden-labs" },
  { name: "Aiden Quest", href: "/quests" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 mx-auto w-full max-w-4xl px-4 py-4">
      <div className="flex items-center justify-between rounded-md border bg-muted p-2 backdrop-blur-sm dark:bg-black">
        <Link href="https://www.aidenlabs.ai/" className="flex items-center">
          <Image
            src="/logo.avif"
            alt="Aiden"
            width={512}
            height={137}
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Button asChild key={item.name} variant="ghost">
              {item.href.startsWith("/") ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isMenuOpen && (
            <Button asChild>
              <Link href="/">Mint Now</Link>
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
        <div className="absolute left-0 right-0 top-0 z-50 p-4 md:hidden">
          <div className="mx-auto max-w-4xl rounded-md border bg-muted p-2 shadow-lg dark:bg-black">
            <div className="mb-2 flex items-center justify-between pb-2">
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
                  {item.href.startsWith("/") ? (
                    <Link href={item.href}>{item.name}</Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  )}
                </Button>
              ))}
              <Button
                className="mt-2"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/">Mint Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
