import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, Eye, Download, Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

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

const OrderHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 499.98,
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "2024-01-22",
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
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 349.99,
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "2024-01-17",
      items: [
        {
          id: "3",
          name: "Crossbody Classic",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&q=80",
          brand: "Luxe",
          color: "Tan",
          size: "Medium",
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-01-05",
      status: "processing",
      total: 599.97,
      items: [
        {
          id: "4",
          name: "Designer Shoulder Bag",
          price: 399.99,
          image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=300&q=80",
          brand: "Luxe",
          color: "Black",
          size: "Large",
          quantity: 1,
        },
        {
          id: "5",
          name: "Evening Clutch",
          price: 199.98,
          image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80",
          brand: "Glamour",
          color: "Gold",
          size: "Small",
          quantity: 1,
        },
      ],
    },
    {
      id: "4",
      orderNumber: "ORD-2023-045",
      date: "2023-12-20",
      status: "cancelled",
      total: 279.99,
      items: [
        {
          id: "6",
          name: "Modern Tote",
          price: 279.99,
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80",
          brand: "Trendy",
          color: "Navy",
          size: "Medium",
          quantity: 1,
        },
      ],
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
      case "delivered":
        return <Truck className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    const matchesDate = dateFilter === "all" || (() => {
      const orderDate = new Date(order.date);
      const now = new Date();
      const diffTime = now.getTime() - orderDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case "30days":
          return diffDays <= 30;
        case "90days":
          return diffDays <= 90;
        case "year":
          return diffDays <= 365;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const ordersByStatus = {
    all: orders.length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

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
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-muted-foreground">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders ({ordersByStatus.all})</SelectItem>
                  <SelectItem value="processing">Processing ({ordersByStatus.processing})</SelectItem>
                  <SelectItem value="shipped">Shipped ({ordersByStatus.shipped})</SelectItem>
                  <SelectItem value="delivered">Delivered ({ordersByStatus.delivered})</SelectItem>
                  <SelectItem value="cancelled">Cancelled ({ordersByStatus.cancelled})</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all" || dateFilter !== "all" 
                  ? "Try adjusting your filters to see more results."
                  : "You haven't placed any orders yet."
                }
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order {order.orderNumber}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.brand}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tracking Number:</span>
                        <span className="font-mono">{order.trackingNumber}</span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Estimated Delivery:</span>
                          <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {order.status === "shipped" || order.status === "delivered" ? (
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    ) : null}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Return Items
                      </Button>
                    )}
                    
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/products">
                          Buy Again
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Summary Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{ordersByStatus.all}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{ordersByStatus.delivered}</p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{ordersByStatus.shipped}</p>
                <p className="text-sm text-muted-foreground">In Transit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{ordersByStatus.processing}</p>
                <p className="text-sm text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderHistory;