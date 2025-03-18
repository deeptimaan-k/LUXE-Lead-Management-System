import { motion } from 'framer-motion';
import { Package2, Heart, Clock, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const orders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 1299,
    items: ['Diamond Eternity Ring'],
  },
  {
    id: 'ORD002',
    date: '2024-03-10',
    status: 'Processing',
    total: 899,
    items: ['Pearl Necklace'],
  },
];

const wishlist = [
  {
    id: 1,
    name: 'Sapphire Pendant',
    price: 799,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Diamond Bracelet',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80',
  },
];

export default function Dashboard() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">My Account</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Settings className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-foreground" />
        </motion.div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="grid gap-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="rounded-full bg-gold-100 p-3 text-gold-500">
                        <Package2 className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <span className="text-sm text-muted-foreground">
                            {order.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.items.join(', ')}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`text-sm ${
                              order.status === 'Delivered'
                                ? 'text-green-600'
                                : 'text-orange-500'
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="font-semibold">${order.total}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="flex gap-4 p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Added to wishlist
                          </p>
                        </div>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                      <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details and preferences
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Email Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your email notifications and subscriptions
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Password & Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Change your password and security settings
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}