import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount?: number;
  brand?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Luxury Tote Bag",
  price = 299.99,
  image = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
  rating = 4.5,
  reviewCount = 12,
  brand = "Luxe",
  isNew = false,
  isSale = false,
  discount = 0,
  onAddToCart = () => {},
  onAddToWishlist = () => {},
  onQuickView = () => {},
}: ProductCardProps) => {
  const originalPrice =
    isSale && discount ? price / (1 - discount / 100) : price;

  return (
    <Card className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      {/* Badge indicators */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {isNew && (
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">
            New
          </Badge>
        )}
        {isSale && (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            {discount}% Off
          </Badge>
        )}
      </div>

      {/* Wishlist button */}
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white"
          onClick={() => onAddToWishlist(id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product image - clickable to product detail */}
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Product info */}
        <div className="mb-2">
          <Link to={`/product/${id}`} className="block hover:underline">
            <h3 className="line-clamp-1 text-sm font-medium">{name}</h3>
          </Link>
          {brand && (
            <p className="text-xs text-gray-500 mt-1">{brand}</p>
          )}
          <div className="mt-1 flex items-center gap-1">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs font-medium">{rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-medium">${price.toFixed(2)}</span>
            {isSale && discount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quick add button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onAddToCart(id)}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;