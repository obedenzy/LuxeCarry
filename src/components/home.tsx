import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import ProductCard from "./ProductCard";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  brand: string;
}

const HomePage = () => {
  // Mock data for categories
  const categories: Category[] = [
    {
      id: "1",
      name: "Totes",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
    },
    {
      id: "2",
      name: "Clutches",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
    },
    {
      id: "3",
      name: "Crossbody",
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80",
    },
    {
      id: "4",
      name: "Shoulder Bags",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
    },
  ];

  // Mock data for featured products
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Elegant Tote",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
      rating: 4.5,
      brand: "Luxe",
    },
    {
      id: "2",
      name: "Mini Clutch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80",
      rating: 4.2,
      brand: "Elegance",
    },
    {
      id: "3",
      name: "Crossbody Classic",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
      rating: 4.7,
      brand: "Luxe",
    },
    {
      id: "4",
      name: "Leather Shoulder Bag",
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
      rating: 4.8,
      brand: "Elegance",
    },
  ];

  // Mock data for latest arrivals
  const latestArrivals: Product[] = [
    {
      id: "5",
      name: "Modern Tote",
      price: 279.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
      rating: 4.3,
      brand: "Trendy",
    },
    {
      id: "6",
      name: "Evening Clutch",
      price: 189.99,
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=80",
      rating: 4.1,
      brand: "Glamour",
    },
    {
      id: "7",
      name: "Casual Crossbody",
      price: 229.99,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80",
      rating: 4.6,
      brand: "Everyday",
    },
    {
      id: "8",
      name: "Designer Shoulder Bag",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
      rating: 4.9,
      brand: "Luxe",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">LuxeBags</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium hover:underline"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium hover:underline"
              >
                Categories
              </Link>
              <Link to="/about" className="text-sm font-medium hover:underline">
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:underline"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 rounded-md bg-background"
              />
            </div>
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Link>
            <Link to="/account">
              <User className="h-6 w-6" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">LuxeBags</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="container flex flex-col gap-4 px-4 py-8">
            <Link
              to="/"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="relative w-full items-center mt-4">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 rounded-md bg-background"
              />
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
              alt="Luxury Handbags Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Luxury Handbags Collection
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
                Discover our exclusive selection of premium designer handbags
              </p>
              <Button size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link
                  to={`/category/${category.id}`}
                  key={category.id}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  brand={product.brand}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container">
            <div className="relative overflow-hidden rounded-lg">
              <div className="h-[300px] md:h-[400px] bg-primary/10">
                <div className="flex h-full flex-col items-center justify-center text-center px-4 md:px-8">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Summer Collection
                  </h2>
                  <p className="text-lg mb-6 max-w-2xl">
                    Discover our new summer collection with exclusive designs
                    and limited editions
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/products?collection=summer">
                      View Collection
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Arrivals */}
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Latest Arrivals
            </h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {latestArrivals.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                      brand={product.brand}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex">
                <CarouselPrevious className="-left-12" />
                <CarouselNext className="-right-12" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-muted-foreground mb-6">
                Stay updated with our latest collections and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LuxeBags</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Luxury handbags for every occasion. Quality craftsmanship and
                timeless designs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/totes"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Totes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/clutches"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clutches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/crossbody"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Crossbody
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-sm text-muted-foreground space-y-2">
                <p>123 Fashion Street</p>
                <p>New York, NY 10001</p>
                <p>Email: info@luxebags.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} LuxeBags. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
