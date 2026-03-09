"use client";

import ProductsPage from "@/views/Products";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <ProductsPage />
        </Suspense>
    );
}
