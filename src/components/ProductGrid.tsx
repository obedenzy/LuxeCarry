import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

const ProductGrid = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock products data
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Elegant Tote",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
      rating: 4.5,
      reviewCount: 24,
      brand: "Luxe",
      category: "totes",
      isNew: true,
    },
    {
      id: "2",
      name: "Mini Clutch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80",
      rating: 4.2,
      reviewCount: 18,
      brand: "Elegance",
      category: "clutches",
      isSale: true,
      discount: 20,
    },
    {
      id: "3",
      name: "Crossbody Classic",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
      rating: 4.7,
      reviewCount: 32,
      brand: "Luxe",
      category: "crossbody",
    },
    {
      id: "4",
      name: "Leather Shoulder Bag",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
      rating: 4.8,
      reviewCount: 45,
      brand: "Elegance",
      category: "shoulder",
    },
    {
      id: "5",
      name: "Modern Tote",
      price: 279.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
      rating: 4.3,
      reviewCount: 21,
      brand: "Trendy",
      category: "totes",
      isNew: true,
    },
    {
      id: "6",
      name: "Evening Clutch",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80",
      rating: 4.1,
      reviewCount: 15,
      brand: "Glamour",
      category: "clutches",
    },
    {
      id: "7",
      name: "Casual Crossbody",
      price: 229.99,
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
      rating: 4.6,
      reviewCount: 28,
      brand: "Everyday",
      category: "crossbody",
      isSale: true,
      discount: 15,
    },
    {
      id: "8",
      name: "Designer Shoulder Bag",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
      rating: 4.9,
      reviewCount: 52,
      brand: "Luxe",
      category: "shoulder",
    },
  ];

  // Filter products based on category and search
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = !categoryId || product.category === categoryId;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const getCategoryName = (id: string) => {
    const categories: Record<string, string> = {
      'totes': 'Totes',
      'clutches': 'Clutches', 
      'crossbody': 'Crossbody Bags',
      'shoulder': 'Shoulder Bags',
    };
    return categories[id] || 'All Products';
  };

  const pageTitle = categoryId ? getCategoryName(categoryId) : 'All Products';

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
            <Link to="/categories" className="text-sm font-medium hover:underline">
              Categories
            </Link>
          </nav>
          <Link to="/cart" className="relative">
            <Button variant="outline" size="sm">
              Cart (0)
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          {categoryId && (
            <>
              <span>/</span>
              <span className="text-foreground">{getCategoryName(categoryId)}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">
              {sortedProducts.length} products found
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link to="/products">
            <Badge variant={!categoryId ? "default" : "secondary"} className="cursor-pointer">
              All Products
            </Badge>
          </Link>
          <Link to="/category/totes">
            <Badge variant={categoryId === 'totes' ? "default" : "secondary"} className="cursor-pointer">
              Totes
            </Badge>
          </Link>
          <Link to="/category/clutches">
            <Badge variant={categoryId === 'clutches' ? "default" : "secondary"} className="cursor-pointer">
              Clutches
            </Badge>
          </Link>
          <Link to="/category/crossbody">
            <Badge variant={categoryId === 'crossbody' ? "default" : "secondary"} className="cursor-pointer">
              Crossbody
            </Badge>
          </Link>
          <Link to="/category/shoulder">
            <Badge variant={categoryId === 'shoulder' ? "default" : "secondary"} className="cursor-pointer">
              Shoulder Bags
            </Badge>
          </Link>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
            <Button asChild className="mt-4">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                brand={product.brand}
                isNew={product.isNew}
                isSale={product.isSale}
                discount={product.discount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;