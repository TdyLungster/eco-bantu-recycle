import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, User, Upload } from 'lucide-react';
const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deviceType: '',
    quantity: '',
    description: '',
    pickupDate: '',
    donationType: 'individual'
  });
  const deviceTypes = ["Laptops & Computers", "Mobile Phones & Tablets", "Monitors & TVs", "Printers & Scanners", "Gaming Consoles", "Audio Equipment", "Kitchen Appliances", "Other Electronics"];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation form submitted:', formData);
    // Here we would typically send the data to a backend service
    alert('Thank you for your donation! We will contact you to arrange pickup.');
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <section id="donation-form" className="section-padding bg-gradient-to-br from-eco-primary/5 to-eco-blue/5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 eco-gradient-text">
            Donate Your E-Waste
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to make an environmental impact? Fill out the form below and we'll arrange 
            a convenient pickup time for your electronic devices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Upload className="mr-3 h-6 w-6 text-eco-primary" />
                Donation Details
              </CardTitle>
              <CardDescription>
                Tell us about the electronics you'd like to donate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <Label htmlFor="donationType" className="text-base font-semibold mb-3 block">
                    Donation Type
                  </Label>
                  <Select value={formData.donationType} onValueChange={value => handleInputChange('donationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Donation</SelectItem>
                      <SelectItem value="corporate">Corporate Donation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold">Name</Label>
                    <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="your@email.com" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                  <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+27 XX XXX XXXX" required />
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-semibold">Pickup Address</Label>
                  <Textarea id="address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} placeholder="Full address where we should collect the items" required />
                </div>

                {/* Device Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deviceType" className="text-base font-semibold">Device Type</Label>
                    <Select value={formData.deviceType} onValueChange={value => handleInputChange('deviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        {deviceTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-base font-semibold">Quantity</Label>
                    <Input id="quantity" value={formData.quantity} onChange={e => handleInputChange('quantity', e.target.value)} placeholder="Number of devices" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base font-semibold">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="Brief description of the devices (condition, brand, etc.)" />
                </div>

                <div>
                  <Label htmlFor="pickupDate" className="text-base font-semibold">Preferred Pickup Date</Label>
                  <Input id="pickupDate" type="date" value={formData.pickupDate} onChange={e => handleInputChange('pickupDate', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>

                <Button type="submit" className="w-full btn-eco text-lg py-6">
                  <Calendar className="mr-3 h-5 w-5" />
                  Schedule Pickup
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Impact Preview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-eco-primary">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>CO2 Reduction</span>
                    <span className="font-bold text-eco-primary">~25kg per device</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Material Recovery</span>
                    <span className="font-bold text-eco-primary">85% efficiency</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Processing Time</span>
                    <span className="font-bold text-eco-primary">24-48 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Accept */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-eco-primary">What We Accept</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deviceTypes.slice(0, 6).map((type, index) => <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-eco-primary rounded-full mr-3" />
                      <span>{type}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl text-eco-primary">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-eco-primary mr-3" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-eco-primary mr-3" />
                  <span>+27 10 065 4785</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default DonationForm;