import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, DollarSign, Package, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  condition: string;
  color: string;
  size: string;
  material: string;
  images: string[];
  features: string[];
  isNegotiable: boolean;
}

const SellProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [newFeature, setNewFeature] = useState("");
  
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    condition: "",
    color: "",
    size: "",
    material: "",
    images: [],
    features: [],
    isNegotiable: false,
  });

  const categories = [
    "Totes",
    "Clutches", 
    "Crossbody",
    "Shoulder Bags",
    "Backpacks",
    "Evening Bags",
    "Travel Bags",
  ];

  const conditions = [
    "New with tags",
    "New without tags", 
    "Excellent",
    "Very good",
    "Good",
    "Fair",
  ];

  const colors = [
    "Black", "Brown", "Tan", "Navy", "Red", "Pink", "White", "Gray", "Green", "Blue", "Other"
  ];

  const sizes = ["Mini", "Small", "Medium", "Large", "Extra Large"];

  const handleInputChange = (field: keyof ProductForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    // In real app, this would open file picker
    const mockImage = `https://images.unsplash.com/photo-${Date.now()}?w=400&q=80`;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, mockImage],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting product:", formData);
    // In real app, submit to API
    navigate("/account");
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
          <h1 className="text-3xl font-bold mb-2">Sell Your Product</h1>
          <p className="text-muted-foreground">
            List your handbag on our marketplace and reach thousands of buyers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Vintage Leather Tote Bag"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Coach, Gucci, etc."
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition.toLowerCase()}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color.toLowerCase()}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size.toLowerCase()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    placeholder="e.g., Genuine Leather, Canvas, etc."
                    value={formData.material}
                    onChange={(e) => handleInputChange("material", e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} disabled={!formData.name || !formData.description || !formData.category || !formData.condition}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Images and Features */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Images and Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Images */}
                <div>
                  <Label>Product Images *</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add up to 8 high-quality images. First image will be the main photo.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                        <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 text-xs">Main</Badge>
                        )}
                      </div>
                    ))}
                    
                    {formData.images.length < 8 && (
                      <button
                        onClick={addImage}
                        className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center hover:border-muted-foreground/50 transition-colors"
                      >
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Image</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label>Product Features</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add key features that make your product special
                  </p>
                  
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="e.g., Multiple compartments"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button onClick={addFeature} disabled={!newFeature.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button onClick={() => removeFeature(index)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={nextStep} disabled={formData.images.length === 0}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Pricing and Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Pricing and Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing */}
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="pl-10"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      id="negotiable"
                      checked={formData.isNegotiable}
                      onCheckedChange={(checked) => handleInputChange("isNegotiable", checked as boolean)}
                    />
                    <Label htmlFor="negotiable" className="text-sm">
                      Price is negotiable
                    </Label>
                  </div>
                </div>

                {/* Review */}
                <div>
                  <h3 className="font-medium mb-4">Review Your Listing</h3>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="capitalize">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="capitalize">{formData.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">
                        ${formData.price} {formData.isNegotiable && "(Negotiable)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Images:</span>
                      <span>{formData.images.length} photos</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Listing Guidelines</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All listings are subject to review before going live</li>
                    <li>• Ensure your photos are clear and show the actual item</li>
                    <li>• Be honest about the condition and any flaws</li>
                    <li>• Respond to buyer inquiries promptly</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmit} disabled={!formData.price}>
                    <Package className="h-4 w-4 mr-2" />
                    Submit Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProduct;