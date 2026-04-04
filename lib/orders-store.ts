import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface StoredLineItem {
  name: string;
  quantity: number;
  amountTotal: number;
}

export interface StoredShippingAddress {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface StoredOrder {
  sessionId: string;
  createdAt: string;
  email: string | null;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  shippingName: string | null;
  shippingPhone: string | null;
  shippingAddress: StoredShippingAddress | null;
  lineItems: StoredLineItem[];
}

function getOrdersFilePath(): string {
  const override = process.env.ORDERS_JSON_PATH?.trim();
  if (override) return override;
  return path.join(process.cwd(), "data", "orders.json");
}

async function ensureDir(filePath: string) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

export async function readOrders(): Promise<StoredOrder[]> {
  const filePath = getOrdersFilePath();
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredOrder[];
  } catch (e: unknown) {
    const code = (e as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") return [];
    throw e;
  }
}

export async function appendOrder(order: StoredOrder): Promise<void> {
  const filePath = getOrdersFilePath();
  await ensureDir(filePath);
  const existing = await readOrders();
  const next = [order, ...existing.filter((o) => o.sessionId !== order.sessionId)];
  await writeFile(filePath, JSON.stringify(next, null, 2), "utf8");
}
