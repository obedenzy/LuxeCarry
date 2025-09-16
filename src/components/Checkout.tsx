import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, Truck, MapPin, User, Mail, Phone, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "apple_pay";
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Mock cart items
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Elegant Leather Tote Bag",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80",
      brand: "Luxe Collection",
      color: "Black",
      size: "Medium",
      quantity: 1,
    },
    {
      id: "2",
      name: "Mini Clutch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80",
      brand: "Elegance",
      color: "Brown",
      size: "Small",
      quantity: 1,
    },
  ];

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "Sarah Johnson",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    name: "Sarah Johnson",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = selectedShipping === "express" ? 24.99 : selectedShipping === "overnight" ? 39.99 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 9.99,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 24.99,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 39.99,
    },
  ];

  const handlePlaceOrder = () => {
    // Process order
    console.log("Processing order...");
    navigate("/order-confirmation", { 
      state: { 
        orderNumber: "ORD-" + Date.now(),
        total: total,
        items: cartItems 
      }
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">LuxeBags</span>
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/cart")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { step: 1, label: "Shipping" },
              { step: 2, label: "Payment" },
              { step: 3, label: "Review" }
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  step <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingAddress.name.split(' ')[0]}
                          onChange={(e) => setShippingAddress(prev => ({
                            ...prev,
                            name: e.target.value + ' ' + (prev.name.split(' ')[1] || '')
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingAddress.name.split(' ')[1] || ''}
                          onChange={(e) => setShippingAddress(prev => ({
                            ...prev,
                            name: (prev.name.split(' ')[0] || '') + ' ' + e.target.value
                          }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress(prev => ({
                          ...prev,
                          street: e.target.value
                        }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress(prev => ({
                            ...prev,
                            city: e.target.value
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress(prev => ({
                            ...prev,
                            state: e.target.value
                          }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress(prev => ({
                            ...prev,
                            zipCode: e.target.value
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                      {shippingOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <span className="font-medium">${option.price}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button onClick={nextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="font-medium cursor-pointer">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="font-medium cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="apple_pay" id="apple_pay" />
                        <Label htmlFor="apple_pay" className="font-medium cursor-pointer">
                          Apple Pay
                        </Label>
                      </div>
                    </RadioGroup>

                    {selectedPayment === "card" && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData(prev => ({
                              ...prev,
                              cardNumber: e.target.value
                            }))}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) => setPaymentData(prev => ({
                                ...prev,
                                expiryDate: e.target.value
                              }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData(prev => ({
                                ...prev,
                                cvv: e.target.value
                              }))}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            placeholder="John Doe"
                            value={paymentData.nameOnCard}
                            onChange={(e) => setPaymentData(prev => ({
                              ...prev,
                              nameOnCard: e.target.value
                            }))}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onCheckedChange={setSameAsBilling}
                      />
                      <Label htmlFor="sameAsBilling">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsBilling && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="billingFirstName">First Name</Label>
                            <Input
                              id="billingFirstName"
                              value={billingAddress.name.split(' ')[0]}
                              onChange={(e) => setBillingAddress(prev => ({
                                ...prev,
                                name: e.target.value + ' ' + (prev.name.split(' ')[1] || '')
                              }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="billingLastName">Last Name</Label>
                            <Input
                              id="billingLastName"
                              value={billingAddress.name.split(' ')[1] || ''}
                              onChange={(e) => setBillingAddress(prev => ({
                                ...prev,
                                name: (prev.name.split(' ')[0] || '') + ' ' + e.target.value
                              }))}
                            />
                          </div>
                        </div>
                        {/* Add more billing address fields as needed */}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back to Shipping
                  </Button>
                  <Button onClick={nextStep}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shipping & Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{shippingAddress.name}</p>
                        <p>{shippingAddress.street}</p>
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Shipping Method</h4>
                      <p className="text-sm text-muted-foreground">
                        {shippingOptions.find(opt => opt.id === selectedShipping)?.name} - 
                        ${shippingOptions.find(opt => opt.id === selectedShipping)?.price}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {selectedPayment === "card" ? "Credit/Debit Card" : selectedPayment.replace('_', ' ')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Back to Payment
                  </Button>
                  <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700">
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Secure 256-bit SSL encryption
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    30-day return policy
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    2-year warranty included
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;