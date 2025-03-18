import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export default function Contact() {
  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">
            We'd love to hear from you. Please fill out this form or use our contact information.
          </p>

          <div className="mt-8 space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-gold-100 p-3 text-gold-500">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-gold-100 p-3 text-gold-500">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">contact@luxejewelry.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-full bg-gold-100 p-3 text-gold-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    123 Luxury Lane
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LeadCaptureForm />
        </motion.div>
      </div>
    </div>
  );
}