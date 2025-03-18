import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
          alt="Luxury Jewelry Collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative flex h-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
              Timeless Elegance, Modern Luxury
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Discover our exquisite collection of handcrafted jewelry, where tradition meets contemporary design.
            </p>
            <Button size="lg" className="mt-8 bg-gold-500 hover:bg-gold-600">
              Explore Collection
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container">
        <h2 className="font-display text-3xl font-bold">Trending Now</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-156805238${item}144-7f86c${item}55b6b6?auto=format&fit=crop&q=80`}
                alt="Jewelry Item"
                className="aspect-square object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">Diamond Eternity Ring</h3>
                <p className="text-sm text-muted-foreground">18k Gold</p>
                <p className="mt-2 font-display text-lg">$1,299</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold">What Our Clients Say</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "Exceptional quality and stunning designs. The customer service was outstanding."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/40?img=${item}`}
                      alt="Customer"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}