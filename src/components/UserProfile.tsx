import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, X, Package, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  addresses: Address[];
  stats: {
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
  };
}

interface Address {
  id: string;
  type: "shipping" | "billing";
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState<UserData>({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    joinDate: "March 2023",
    addresses: [
      {
        id: "1",
        type: "shipping",
        name: "Sarah Johnson",
        street: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "2",
        type: "billing",
        name: "Sarah Johnson",
        street: "456 Oak Avenue",
        city: "Brooklyn",
        state: "NY",
        zipCode: "11201",
        country: "United States",
        isDefault: false,
      },
    ],
    stats: {
      totalOrders: 12,
      totalSpent: 2847.50,
      wishlistItems: 8,
    },
  });

  const [editForm, setEditForm] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  const handleSave = () => {
    setUserData(prev => ({
      ...prev,
      ...editForm,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });
    setIsEditing(false);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold mb-1">{userData.name}</h2>
                  <p className="text-muted-foreground mb-4">Member since {userData.joinDate}</p>
                  
                  <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{userData.stats.totalOrders}</p>
                      <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">${userData.stats.totalSpent.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground">Spent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{userData.stats.wishlistItems}</p>
                      <p className="text-sm text-muted-foreground">Wishlist</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/orders">
                    <Package className="h-4 w-4 mr-2" />
                    Order History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/wishlist">
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/sell">
                    <Package className="h-4 w-4 mr-2" />
                    Sell Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        ) : (
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button size="sm">
                      Add New Address
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userData.addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                            <Badge variant="outline" className="capitalize">
                              {address.type}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Login Sessions</h3>
                        <p className="text-sm text-muted-foreground">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;