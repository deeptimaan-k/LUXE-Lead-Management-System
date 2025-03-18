import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link to="/products" className="text-lg font-semibold">
                Shop
              </Link>
              <Link to="/contact" className="text-lg font-semibold">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between">
          <Link
            to="/"
            className="hidden lg:block mr-6 text-2xl font-display font-bold text-gold-600"
          >
            LUXE
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link to="/" className="font-medium transition-colors hover:text-gold-600">
              Home
            </Link>
            <Link to="/products" className="font-medium transition-colors hover:text-gold-600">
              Shop
            </Link>
            <Link to="/contact" className="font-medium transition-colors hover:text-gold-600">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle search</span>
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Open cart</span>
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold-500 text-xs font-medium text-white">
                  0
                </span>
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t bg-background p-4"
        >
          <div className="container">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>
        </motion.div>
      )}
    </nav>
  );
}