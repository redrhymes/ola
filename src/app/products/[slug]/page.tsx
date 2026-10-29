import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { ProductDetailPage } from "@/components/sections/ProductDetailPage";
import { modelsData } from "@/data/vehicles";
import { images } from "@/data/images";
import { site } from "@/data/site";

interface ProductPageProps {
  params: { slug: string };
}

function getProduct(slug: string) {
  return modelsData.find((product) => product.slug === slug);
}

export function generateStaticParams() {
  return modelsData.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };

  const brandName = `${product.brand.charAt(0)}${product.brand.slice(1).toLowerCase()}`;
  const productTitle = `${brandName} ${product.model}${product.generation ? ` ${product.generation}` : ""}`;
  const heroImage =
    Object.entries(images.vehicleHeroes).find(([key]) => key === product.imageKey)?.[1] ??
    images.vehicles[product.imageKey];
  return {
    title: { absolute: `${productTitle} | ${site.name}` },
    description: product.tagline,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${productTitle} | ${site.name}`,
      description: product.tagline,
      url: `/products/${product.slug}`,
      images: [
        {
          url: heroImage,
          alt: `${product.brand} ${product.model} electric ${product.type}`,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header activePath="/#scooters" />
      <ProductDetailPage product={product} />
      <Footer />
    </div>
  );
}
