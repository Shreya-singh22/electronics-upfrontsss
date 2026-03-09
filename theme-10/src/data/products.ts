import { StaticImageData } from "next/image";
import productHeadphones from "@/assets/product-headphones.png";
import productPhone from "@/assets/product-phone.png";
import productWatch from "@/assets/product-watch.png";
import productLaptop from "@/assets/product-laptop.png";
import productEarbuds from "@/assets/product-earbuds.png";
import productSpeaker from "@/assets/product-speaker.png";
import productTablet from "@/assets/product-tablet.png";
import type { Product } from "@/context/StoreContext";

export interface ProductDetail extends Product {
  rating: number;
  reviewCount: number;
  highlights: string[];
  variants?: { label: string; options: string[] }[];
  features: { title: string; description: string; icon: string }[];
  specs: { label: string; value: string }[];
  reviews: { name: string; rating: number; comment: string; date: string }[];
  gallery: (string | StaticImageData)[];
}

export const products: Product[] = [
  { id: "1", name: "ProBook Air 15\"", price: 79999, image: productLaptop, category: "Laptops", badge: "New" },
  { id: "2", name: "Sony WH-1000XM5", price: 24999, image: productHeadphones, category: "Audio" },
  { id: "3", name: "Galaxy Ultra S25", price: 134999, image: productPhone, category: "Phones", badge: "Bestseller" },
  { id: "4", name: "Pulse Watch SE", price: 12999, image: productWatch, category: "Wearables" },
  { id: "5", name: "AirPods Pro 3", price: 24900, image: productEarbuds, category: "Audio", badge: "New" },
  { id: "6", name: "SoundCore Glow", price: 4999, image: productSpeaker, category: "Audio" },
  { id: "7", name: "iPad Air M3", price: 59900, image: productTablet, category: "Tablets" },
  { id: "8", name: "Pixel Watch 3", price: 32999, image: productWatch, category: "Wearables", badge: "Trending" },
];

export const newArrivals: Product[] = [
  { id: "9", name: "MacBook Pro M4", price: 199900, image: productLaptop, category: "Laptops", badge: "Just Launched" },
  { id: "10", name: "Galaxy Buds FE", price: 6999, image: productEarbuds, category: "Audio", badge: "New" },
  { id: "11", name: "iPhone 16 Pro", price: 119900, image: productPhone, category: "Phones", badge: "New" },
  { id: "12", name: "Tab S10 Ultra", price: 108999, image: productTablet, category: "Tablets" },
];

export const allProducts = [...products, ...newArrivals];

export const productDetails: Record<string, ProductDetail> = {
  "1": {
    ...products[0],
    rating: 4.6,
    reviewCount: 128,
    highlights: ["M3 chip for blazing performance", "15.3\" Liquid Retina display", "18-hour battery life", "Fanless, silent design"],
    variants: [{ label: "Color", options: ["Silver", "Space Gray", "Midnight"] }, { label: "Storage", options: ["256GB", "512GB", "1TB"] }],
    features: [
      { title: "M3 Chip", description: "Next-gen performance for demanding workflows.", icon: "cpu" },
      { title: "All-Day Battery", description: "Up to 18 hours of battery life.", icon: "battery" },
      { title: "Liquid Retina", description: "15.3-inch display with 500 nits brightness.", icon: "monitor" },
      { title: "Silent Design", description: "Fanless architecture for zero noise.", icon: "wind" },
    ],
    specs: [
      { label: "Brand", value: "ProBook" }, { label: "Processor", value: "M3 8-core" }, { label: "RAM", value: "8GB Unified" },
      { label: "Display", value: "15.3\" Liquid Retina" }, { label: "Battery", value: "Up to 18 hours" },
      { label: "Weight", value: "1.51 kg" }, { label: "Ports", value: "2x USB-C, MagSafe, 3.5mm" }, { label: "OS", value: "macOS Sonoma" },
    ],
    reviews: [
      { name: "Vikram P.", rating: 5, comment: "Best laptop I've ever owned. The display is stunning and battery lasts forever.", date: "Feb 2026" },
      { name: "Sneha M.", rating: 4, comment: "Great for productivity. Wish it had more ports though.", date: "Jan 2026" },
      { name: "Arjun K.", rating: 5, comment: "Silent, fast, and the build quality is premium. Worth every penny.", date: "Dec 2025" },
    ],
    gallery: [productLaptop, productLaptop, productLaptop],
  },
  "2": {
    ...products[1],
    rating: 4.7,
    reviewCount: 342,
    highlights: ["Industry-leading noise cancellation", "30-hour battery life", "Multipoint connection", "Speak-to-Chat technology"],
    variants: [{ label: "Color", options: ["Black", "Silver", "Midnight Blue"] }],
    features: [
      { title: "Active Noise Cancellation", description: "Block unwanted sound everywhere you go.", icon: "volume-x" },
      { title: "30 Hour Battery", description: "Listen all day without charging.", icon: "battery-full" },
      { title: "Touch Controls", description: "Control music with intuitive gestures.", icon: "hand" },
      { title: "Multipoint", description: "Connect to two devices simultaneously.", icon: "bluetooth" },
    ],
    specs: [
      { label: "Brand", value: "Sony" }, { label: "Battery Life", value: "30 Hours" }, { label: "Bluetooth", value: "5.2" },
      { label: "Weight", value: "250g" }, { label: "Charging", value: "USB-C" }, { label: "Driver Size", value: "30mm" },
      { label: "ANC", value: "Yes, Adaptive" }, { label: "Codec", value: "LDAC, AAC, SBC" },
    ],
    reviews: [
      { name: "Rahul S.", rating: 5, comment: "Best noise cancelling headphones I've ever used. The ANC is on another level.", date: "Mar 2026" },
      { name: "Ananya K.", rating: 5, comment: "Battery life is amazing. I charge once a week with daily use.", date: "Feb 2026" },
      { name: "Priya D.", rating: 4, comment: "Sound quality is excellent. Slightly tight fit initially but breaks in nicely.", date: "Jan 2026" },
      { name: "Karthik R.", rating: 5, comment: "Multipoint connection is a game changer for work calls + music.", date: "Jan 2026" },
    ],
    gallery: [productHeadphones, productHeadphones, productHeadphones],
  },
  "3": {
    ...products[2],
    rating: 4.5,
    reviewCount: 567,
    highlights: ["200MP camera system", "Snapdragon 8 Elite", "6.9\" Dynamic AMOLED", "5000mAh battery"],
    variants: [{ label: "Color", options: ["Titanium Black", "Titanium Silver", "Titanium Blue"] }, { label: "Storage", options: ["256GB", "512GB", "1TB"] }],
    features: [
      { title: "200MP Camera", description: "Capture every detail with studio-quality photos.", icon: "camera" },
      { title: "S Pen Built-in", description: "Write, sketch, and navigate with precision.", icon: "pen-tool" },
      { title: "All-Day Battery", description: "5000mAh battery that lasts beyond a full day.", icon: "battery-full" },
      { title: "AI Features", description: "Smart features powered by Galaxy AI.", icon: "sparkles" },
    ],
    specs: [
      { label: "Brand", value: "Samsung" }, { label: "Processor", value: "Snapdragon 8 Elite" }, { label: "Display", value: "6.9\" QHD+ AMOLED" },
      { label: "Camera", value: "200MP + 50MP + 10MP + 12MP" }, { label: "Battery", value: "5000mAh" },
      { label: "RAM", value: "12GB" }, { label: "OS", value: "Android 15 / One UI 7" }, { label: "5G", value: "Yes" },
    ],
    reviews: [
      { name: "Amit T.", rating: 5, comment: "The camera is absolutely insane. Night mode photos look professional.", date: "Mar 2026" },
      { name: "Deepa L.", rating: 4, comment: "Great phone but a bit heavy. Display is gorgeous though.", date: "Feb 2026" },
      { name: "Rohan M.", rating: 5, comment: "Best Android phone money can buy. S Pen is super useful.", date: "Jan 2026" },
    ],
    gallery: [productPhone, productPhone, productPhone],
  },
  "4": {
    ...products[3],
    rating: 4.3,
    reviewCount: 89,
    highlights: ["Heart rate & SpO2 monitoring", "GPS tracking", "5ATM water resistance", "7-day battery life"],
    variants: [{ label: "Size", options: ["40mm", "44mm"] }, { label: "Band", options: ["Silicone", "Nylon", "Leather"] }],
    features: [
      { title: "Health Monitoring", description: "Track heart rate, SpO2, and stress levels 24/7.", icon: "heart-pulse" },
      { title: "GPS Built-in", description: "Accurate route tracking for runs and rides.", icon: "map-pin" },
      { title: "Water Resistant", description: "Swim-proof with 5ATM water resistance.", icon: "droplets" },
      { title: "7-Day Battery", description: "Go a full week on a single charge.", icon: "battery-full" },
    ],
    specs: [
      { label: "Brand", value: "Pulse" }, { label: "Display", value: "1.4\" AMOLED" }, { label: "Battery", value: "7 days" },
      { label: "Water Resistance", value: "5ATM" }, { label: "Sensors", value: "HR, SpO2, Accelerometer, Gyro" },
      { label: "GPS", value: "Yes" }, { label: "Weight", value: "33g" }, { label: "Compatibility", value: "iOS & Android" },
    ],
    reviews: [
      { name: "Meera J.", rating: 4, comment: "Great value smartwatch. Battery life is impressive.", date: "Feb 2026" },
      { name: "Suresh N.", rating: 5, comment: "Perfect for fitness tracking. GPS accuracy is solid.", date: "Jan 2026" },
    ],
    gallery: [productWatch, productWatch, productWatch],
  },
  "5": {
    ...products[4],
    rating: 4.8,
    reviewCount: 234,
    highlights: ["Adaptive Audio", "Personalized Spatial Audio", "USB-C charging case", "IP54 dust & water resistance"],
    variants: [{ label: "Color", options: ["White", "Black"] }],
    features: [
      { title: "Adaptive Audio", description: "Automatically adjusts noise control based on your environment.", icon: "headphones" },
      { title: "Spatial Audio", description: "Immersive sound that surrounds you.", icon: "surround-sound" },
      { title: "6Hr Playback", description: "Up to 6 hours with ANC, 30 hours with case.", icon: "battery-full" },
      { title: "IP54 Rated", description: "Dust and water resistant for active lifestyles.", icon: "shield" },
    ],
    specs: [
      { label: "Brand", value: "Apple" }, { label: "Chip", value: "H2" }, { label: "ANC", value: "Yes, Adaptive" },
      { label: "Battery (Buds)", value: "6 hours" }, { label: "Battery (Case)", value: "30 hours total" },
      { label: "Charging", value: "USB-C, MagSafe, Qi" }, { label: "Water Resistance", value: "IP54" }, { label: "Weight", value: "5.3g per bud" },
    ],
    reviews: [
      { name: "Kavya R.", rating: 5, comment: "Best earbuds I've ever used. Spatial audio is mind-blowing.", date: "Mar 2026" },
      { name: "Nikhil G.", rating: 5, comment: "ANC is incredible for the size. USB-C charging is a welcome change.", date: "Feb 2026" },
      { name: "Ishaan P.", rating: 4, comment: "Sound quality is top tier. Wish they were a bit cheaper.", date: "Jan 2026" },
    ],
    gallery: [productEarbuds, productEarbuds, productEarbuds],
  },
  "6": {
    ...products[5],
    rating: 4.2,
    reviewCount: 156,
    highlights: ["RGB ambient lighting", "20W output", "IPX7 waterproof", "15-hour battery"],
    variants: [{ label: "Color", options: ["White", "Black", "Blue"] }],
    features: [
      { title: "RGB Lighting", description: "Customizable ambient light effects to match your mood.", icon: "lightbulb" },
      { title: "20W Sound", description: "Powerful bass and clear mids in a compact form.", icon: "volume-2" },
      { title: "Waterproof", description: "IPX7 rated — take it to the pool or shower.", icon: "droplets" },
      { title: "15Hr Battery", description: "All-day playback on a single charge.", icon: "battery-full" },
    ],
    specs: [
      { label: "Brand", value: "SoundCore" }, { label: "Output", value: "20W" }, { label: "Battery", value: "15 hours" },
      { label: "Water Resistance", value: "IPX7" }, { label: "Bluetooth", value: "5.3" },
      { label: "Weight", value: "580g" }, { label: "Charging", value: "USB-C" }, { label: "Aux Input", value: "No" },
    ],
    reviews: [
      { name: "Sahil B.", rating: 4, comment: "Great little speaker. The RGB lights are a nice touch.", date: "Feb 2026" },
      { name: "Tanya S.", rating: 5, comment: "Impressive bass for the size. Love the waterproof feature.", date: "Jan 2026" },
    ],
    gallery: [productSpeaker, productSpeaker, productSpeaker],
  },
  "7": {
    ...products[6],
    rating: 4.6,
    reviewCount: 198,
    highlights: ["M3 chip performance", "11\" Liquid Retina display", "Touch ID", "All-day battery life"],
    variants: [{ label: "Color", options: ["Space Gray", "Starlight", "Blue", "Purple"] }, { label: "Storage", options: ["128GB", "256GB", "512GB"] }],
    features: [
      { title: "M3 Power", description: "Desktop-class performance in a tablet.", icon: "cpu" },
      { title: "Liquid Retina", description: "11-inch display with True Tone and P3 color.", icon: "monitor" },
      { title: "Apple Pencil", description: "Create, sketch, and take notes with precision.", icon: "pen-tool" },
      { title: "All-Day Battery", description: "Up to 10 hours of battery life.", icon: "battery-full" },
    ],
    specs: [
      { label: "Brand", value: "Apple" }, { label: "Chip", value: "M3" }, { label: "Display", value: "11\" Liquid Retina" },
      { label: "Camera", value: "12MP Wide + 12MP Ultra Wide" }, { label: "Battery", value: "Up to 10 hours" },
      { label: "Weight", value: "462g" }, { label: "Connectivity", value: "Wi-Fi 6E, Bluetooth 5.3" }, { label: "OS", value: "iPadOS 18" },
    ],
    reviews: [
      { name: "Divya N.", rating: 5, comment: "Perfect for students. Fast, light, and the display is beautiful.", date: "Mar 2026" },
      { name: "Ravi K.", rating: 4, comment: "Great tablet but wish it had the ProMotion display.", date: "Feb 2026" },
      { name: "Preethi S.", rating: 5, comment: "Apple Pencil support makes this a dream for note-taking.", date: "Jan 2026" },
    ],
    gallery: [productTablet, productTablet, productTablet],
  },
  "8": {
    ...products[7],
    rating: 4.4,
    reviewCount: 112,
    highlights: ["Wear OS by Google", "Fitbit health tracking", "AMOLED display", "Fast charging"],
    variants: [{ label: "Size", options: ["41mm", "45mm"] }, { label: "Band", options: ["Active", "Woven", "Metal"] }],
    features: [
      { title: "Fitbit Integration", description: "Advanced health and fitness metrics built in.", icon: "heart-pulse" },
      { title: "Wear OS", description: "Full Google ecosystem — Maps, Wallet, Assistant.", icon: "smartphone" },
      { title: "AMOLED Display", description: "Vivid, always-on display with customizable faces.", icon: "monitor" },
      { title: "Fast Charging", description: "50% charge in just 30 minutes.", icon: "zap" },
    ],
    specs: [
      { label: "Brand", value: "Google" }, { label: "Display", value: "1.4\" AMOLED" }, { label: "Battery", value: "24 hours" },
      { label: "Water Resistance", value: "5ATM + IP68" }, { label: "Sensors", value: "HR, SpO2, EDA, Skin Temp" },
      { label: "GPS", value: "Multi-band GPS" }, { label: "Weight", value: "37g" }, { label: "OS", value: "Wear OS 5" },
    ],
    reviews: [
      { name: "Anand V.", rating: 4, comment: "Best Wear OS watch yet. Fitbit integration is seamless.", date: "Feb 2026" },
      { name: "Lakshmi P.", rating: 5, comment: "Love the design and the health tracking features.", date: "Jan 2026" },
      { name: "Rajesh T.", rating: 4, comment: "Battery could be better but fast charging helps.", date: "Dec 2025" },
    ],
    gallery: [productWatch, productWatch, productWatch],
  },
};

// Generate details for new arrivals too
productDetails["9"] = {
  ...newArrivals[0], rating: 4.9, reviewCount: 45,
  highlights: ["M4 Pro chip", "Space Black finish", "Up to 22hr battery", "Liquid Retina XDR"],
  variants: [{ label: "Chip", options: ["M4 Pro", "M4 Max"] }, { label: "Storage", options: ["512GB", "1TB", "2TB"] }],
  features: [
    { title: "M4 Pro Chip", description: "Unmatched performance for pro workflows.", icon: "cpu" },
    { title: "XDR Display", description: "Extreme Dynamic Range with ProMotion.", icon: "monitor" },
    { title: "22Hr Battery", description: "Longest battery ever in a MacBook.", icon: "battery-full" },
    { title: "Thunderbolt 5", description: "Blazing fast connectivity for everything.", icon: "zap" },
  ],
  specs: [
    { label: "Brand", value: "Apple" }, { label: "Chip", value: "M4 Pro 14-core" }, { label: "RAM", value: "24GB" },
    { label: "Display", value: "16\" Liquid Retina XDR" }, { label: "Battery", value: "22 hours" },
    { label: "Weight", value: "2.14 kg" }, { label: "Ports", value: "3x TB5, HDMI, SD, MagSafe" }, { label: "OS", value: "macOS Sequoia" },
  ],
  reviews: [
    { name: "Aditya S.", rating: 5, comment: "Absolute beast of a machine. Worth the upgrade from M2.", date: "Mar 2026" },
  ],
  gallery: [productLaptop, productLaptop, productLaptop],
};

productDetails["10"] = {
  ...newArrivals[1], rating: 4.3, reviewCount: 78,
  highlights: ["Active Noise Cancellation", "6hr battery", "IPX2 water resistance", "Galaxy AI features"],
  variants: [{ label: "Color", options: ["Graphite", "White", "Lavender"] }],
  features: [
    { title: "ANC", description: "Block distractions with adaptive noise cancellation.", icon: "volume-x" },
    { title: "Galaxy AI", description: "Live translate and smart features built in.", icon: "sparkles" },
    { title: "Comfortable Fit", description: "Ergonomic wing tips for secure, comfy wear.", icon: "heart" },
    { title: "Quick Charge", description: "5 minutes of charging = 1 hour of playback.", icon: "zap" },
  ],
  specs: [
    { label: "Brand", value: "Samsung" }, { label: "Battery", value: "6 hours (buds), 21 hours (case)" },
    { label: "ANC", value: "Yes" }, { label: "Bluetooth", value: "5.3" }, { label: "Water Resistance", value: "IPX2" },
    { label: "Weight", value: "5.6g per bud" }, { label: "Charging", value: "USB-C, Wireless" }, { label: "Codec", value: "Samsung Scalable, AAC, SBC" },
  ],
  reviews: [
    { name: "Manish D.", rating: 4, comment: "Great value for the price. ANC is surprisingly good.", date: "Mar 2026" },
    { name: "Pooja A.", rating: 5, comment: "Comfortable for long listening sessions. Love the Galaxy AI features.", date: "Feb 2026" },
  ],
  gallery: [productEarbuds, productEarbuds, productEarbuds],
};

productDetails["11"] = {
  ...newArrivals[2], rating: 4.7, reviewCount: 423,
  highlights: ["A18 Pro chip", "48MP camera system", "Titanium design", "Action button"],
  variants: [{ label: "Color", options: ["Natural Titanium", "Black Titanium", "White Titanium", "Desert Titanium"] }, { label: "Storage", options: ["256GB", "512GB", "1TB"] }],
  features: [
    { title: "A18 Pro", description: "Fastest chip ever in a smartphone.", icon: "cpu" },
    { title: "Pro Camera", description: "48MP Fusion camera with 5x optical zoom.", icon: "camera" },
    { title: "Titanium Build", description: "Aerospace-grade titanium for durability.", icon: "shield" },
    { title: "USB 3 Speed", description: "Lightning-fast data transfer with USB-C.", icon: "zap" },
  ],
  specs: [
    { label: "Brand", value: "Apple" }, { label: "Chip", value: "A18 Pro" }, { label: "Display", value: "6.3\" Super Retina XDR" },
    { label: "Camera", value: "48MP + 12MP + 12MP" }, { label: "Battery", value: "Up to 33 hours video" },
    { label: "RAM", value: "8GB" }, { label: "5G", value: "Yes" }, { label: "Material", value: "Grade 5 Titanium" },
  ],
  reviews: [
    { name: "Siddharth M.", rating: 5, comment: "The camera system is leagues ahead. Night mode is incredible.", date: "Mar 2026" },
    { name: "Nisha R.", rating: 4, comment: "Titanium feels premium but it's heavy. Love the action button.", date: "Feb 2026" },
    { name: "Varun K.", rating: 5, comment: "Best iPhone yet. Performance is buttery smooth.", date: "Jan 2026" },
  ],
  gallery: [productPhone, productPhone, productPhone],
};

productDetails["12"] = {
  ...newArrivals[3], rating: 4.5, reviewCount: 67,
  highlights: ["14.6\" Dynamic AMOLED 2X", "Snapdragon 8 Gen 3", "S Pen included", "11,200mAh battery"],
  variants: [{ label: "Color", options: ["Graphite", "Beige"] }, { label: "Storage", options: ["256GB", "512GB", "1TB"] }],
  features: [
    { title: "Massive Display", description: "14.6-inch cinema-grade AMOLED screen.", icon: "monitor" },
    { title: "S Pen Included", description: "Create and take notes with zero latency.", icon: "pen-tool" },
    { title: "11,200mAh", description: "Massive battery for all-day productivity.", icon: "battery-full" },
    { title: "DeX Mode", description: "Desktop experience when connected to a monitor.", icon: "monitor" },
  ],
  specs: [
    { label: "Brand", value: "Samsung" }, { label: "Processor", value: "Snapdragon 8 Gen 3" }, { label: "Display", value: "14.6\" AMOLED 2X" },
    { label: "Battery", value: "11,200mAh" }, { label: "RAM", value: "12GB" },
    { label: "Camera", value: "13MP + 8MP + 12MP" }, { label: "Weight", value: "718g" }, { label: "OS", value: "Android 14 / One UI 6.1" },
  ],
  reviews: [
    { name: "Harsh P.", rating: 5, comment: "This is basically a laptop replacement. The screen is enormous and beautiful.", date: "Mar 2026" },
    { name: "Simran L.", rating: 4, comment: "Great for content creation. A bit too large to use as a regular tablet.", date: "Feb 2026" },
  ],
  gallery: [productTablet, productTablet, productTablet],
};
