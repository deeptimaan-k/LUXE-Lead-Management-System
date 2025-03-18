import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: 'Added to cart',
      description: 'Check your cart to complete your purchase',
    });
  };

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
              alt="Diamond Ring"
              className="aspect-square w-full object-cover"
            />
          </Card>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-156805238${i}144-7f86c${i}55b6b6?auto=format&fit=crop&q=80`}
                  alt={`Product view ${i}`}
                  className="aspect-square w-full cursor-pointer object-cover transition-opacity hover:opacity-80"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold">Diamond Eternity Ring</h1>
            <p className="mt-2 text-2xl font-semibold text-gold-500">$1,299</p>
            <div className="mt-6 space-y-6">
              <p className="text-muted-foreground">
                This stunning eternity ring features brilliant-cut diamonds set in 18k gold,
                symbolizing endless love and timeless elegance.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold">Quantity</h3>
                <div className="flex w-fit items-center gap-4 rounded-md border p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gold-500 hover:bg-gold-600"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="details" className="mt-8">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div>
                  <h4 className="font-semibold">Specifications</h4>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li>Metal: 18k Gold</li>
                    <li>Diamond Weight: 1.5 carats</li>
                    <li>Clarity: VS1</li>
                    <li>Color: F</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="shipping">
                <p className="text-muted-foreground">
                  Free shipping worldwide. Delivery within 3-5 business days.
                </p>
              </TabsContent>
              <TabsContent value="reviews">
                <p className="text-muted-foreground">No reviews yet.</p>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}