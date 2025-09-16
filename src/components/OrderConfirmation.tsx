import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Mail, Phone, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order data from navigation state or use defaults
  const orderData = location.state || {
    orderNumber: "ORD-" + Date.now(),
    total: 499.98,
    items: [
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
    ]
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">LuxeBags</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:underline">
              Shop
            </Link>
          </nav>
          <Link to="/cart">
            <Button variant="outline" size="sm">
              Cart (0)
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="font-mono font-medium">{orderData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-semibold text-lg">${orderData.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order Status:</span>
                    <Badge variant="secondary">Processing</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Items Ordered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item: OrderItem) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Sarah Johnson</p>
                      <p>123 Main Street, Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Shipping Method</h4>
                    <p className="text-sm text-muted-foreground">Standard Shipping (5-7 business days)</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Estimated Delivery</h4>
                    <p className="text-sm font-medium text-primary">
                      {estimatedDelivery.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/orders">
                      <Package className="h-4 w-4 mr-2" />
                      Track Your Order
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/products">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Order Placed</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Processing</p>
                        <p className="text-xs text-muted-foreground">
                          We're preparing your items
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Shipped</p>
                        <p className="text-xs text-muted-foreground">
                          Estimated in 1-2 days
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Delivered</p>
                        <p className="text-xs text-muted-foreground">
                          {estimatedDelivery.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>support@luxebags.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>1-800-LUXE-BAG</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Customer service available 24/7
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Confirmation Email Sent</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email to your registered email address with your order details 
                    and tracking information. If you don't see it in your inbox, please check your spam folder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;