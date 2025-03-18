import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: 'Diamond Eternity Ring',
  price: 1299,
  category: 'Rings',
  metal: '18k Gold',
  image: `https://images.unsplash.com/photo-156805238${i}144-7f86c${i}55b6b6?auto=format&fit=crop&q=80`,
}));

export default function Products() {
  const [priceRange, setPriceRange] = useState([0, 5000]);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Our Collection</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent priceRange={priceRange} setPriceRange={setPriceRange} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <FilterContent priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/products/${product.id}`}>
                  <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.metal}</p>
                      <p className="mt-2 font-display text-lg">${product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterContent({
  priceRange,
  setPriceRange,
}: {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="h-4 w-4" /> Price Range
        </h3>
        <div className="mt-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={100}
            className="w-full"
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Categories</h3>
        <div className="mt-4 space-y-2">
          {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Metal Type</h3>
        <div className="mt-4 space-y-2">
          {['18k Gold', 'Platinum', 'White Gold', 'Rose Gold'].map((metal) => (
            <div key={metal} className="flex items-center space-x-2">
              <Checkbox id={metal} />
              <label htmlFor={metal} className="text-sm">
                {metal}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}