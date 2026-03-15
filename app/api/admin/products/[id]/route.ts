import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { Product } from "@/lib/types";
import { readProducts, writeProducts } from "@/lib/admin/products-data";

const devBypass = process.env.NODE_ENV === "development" && process.env.SKIP_ADMIN_AUTH === "1";

function isAuthorized(session: unknown): boolean {
  if (devBypass) return true;
  const s = session as { user?: { isAdmin?: boolean } } | null;
  return !!s && !!(s.user as { isAdmin?: boolean } | undefined)?.isAdmin;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const products = await readProducts();
  const product = products.find((p) => p.id === id || p.slug === id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const current = products[index];

  const name = typeof body.name === "string" ? body.name.trim() : current.name;
  const price =
    body.price != null
      ? Math.round(Number(body.price))
      : current.price;
  if (!Number.isFinite(price) || price < 0) {
    return NextResponse.json({ error: "Valid price required" }, { status: 400 });
  }

  const updated: Product = {
    ...current,
    name: name || current.name,
    shortDescription: typeof body.shortDescription === "string" ? body.shortDescription.trim() : current.shortDescription,
    longDescription: typeof body.longDescription === "string" ? body.longDescription.trim() : current.longDescription,
    categoryIds: Array.isArray(body.categoryIds)
      ? body.categoryIds.filter((c): c is string => typeof c === "string")
      : current.categoryIds,
    price,
    images: Array.isArray(body.images) && body.images.length > 0
      ? body.images.filter((i): i is string => typeof i === "string")
      : current.images,
    type: body.type === "digital" ? "digital" : "physical",
  };
  if (body.compareAtPrice != null) {
    const compareAt = Math.round(Number(body.compareAtPrice));
    updated.compareAtPrice = Number.isFinite(compareAt) && compareAt > updated.price ? compareAt : undefined;
  }
  updated.wholesale = body.wholesale === true;
  updated.sourceUrl = typeof body.sourceUrl === "string" && body.sourceUrl.trim() ? body.sourceUrl.trim() : undefined;
  updated.sourceName = typeof body.sourceName === "string" && body.sourceName.trim() ? body.sourceName.trim() : undefined;

  products[index] = updated;
  await writeProducts(products);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAuthorized(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  products.splice(index, 1);
  await writeProducts(products);
  return NextResponse.json({ ok: true });
}
