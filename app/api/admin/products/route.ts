import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { Product } from "@/lib/types";
import {
  readProducts,
  writeProducts,
  slugify,
  uniqueSlug,
} from "@/lib/admin/products-data";

const devBypass = process.env.NODE_ENV === "development" && process.env.SKIP_ADMIN_AUTH === "1";

function isAuthorized(session: unknown): boolean {
  if (devBypass) return true;
  const s = session as { user?: { isAdmin?: boolean } } | null;
  return !!s && !!(s.user as { isAdmin?: boolean } | undefined)?.isAdmin;
}

export async function GET() {
  const session = await auth();
  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const price = typeof body.price === "number" ? body.price : Number(body.price);
  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
  }

  let existing: Product[];
  try {
    existing = await readProducts();
  } catch {
    return NextResponse.json({ error: "Failed to read products file" }, { status: 500 });
  }
  const existingSlugs = existing.map((p) => p.slug);
  const baseSlug = slugify(name) || "product";
  const slug = uniqueSlug(baseSlug, existingSlugs);
  const id = slug;

  const product: Product = {
    id,
    slug,
    name,
    shortDescription: typeof body.shortDescription === "string" ? body.shortDescription.trim() : "",
    longDescription: typeof body.longDescription === "string" ? body.longDescription.trim() : "",
    categoryIds: Array.isArray(body.categoryIds) ? body.categoryIds.filter((c): c is string => typeof c === "string") : [],
    price: Math.round(price),
    images: Array.isArray(body.images) && body.images.length > 0
      ? body.images.filter((i): i is string => typeof i === "string")
      : ["/placeholder-product.jpg"],
    type: body.type === "digital" ? "digital" : "physical",
  };

  if (body.compareAtPrice != null && Number.isFinite(Number(body.compareAtPrice)) && Number(body.compareAtPrice) > product.price) {
    product.compareAtPrice = Math.round(Number(body.compareAtPrice));
  }
  if (body.wholesale === true) product.wholesale = true;
  if (typeof body.sourceUrl === "string" && body.sourceUrl.trim()) product.sourceUrl = body.sourceUrl.trim();
  if (typeof body.sourceName === "string" && body.sourceName.trim()) product.sourceName = body.sourceName.trim();

  let current: Product[];
  try {
    current = await readProducts();
  } catch {
    return NextResponse.json(
      { error: "Failed to read products file. Run from project root or add a database." },
      { status: 500 }
    );
  }

  current.push(product);
  try {
    await writeProducts(current);
  } catch {
    return NextResponse.json(
      { error: "Failed to write products file. Check permissions or use a database." },
      { status: 500 }
    );
  }

  return NextResponse.json(product, { status: 201 });
}
