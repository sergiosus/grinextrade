import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/products';
import type { Product } from '@/types/product';
import { locales } from '@/lib/i18n/config';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { image, name, description, category } = body;
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const now = new Date().toISOString();
    const current = products[index];
    const updated: Product = {
      ...current,
      image: image !== undefined ? String(image) : current.image,
      name: name !== undefined ? { ...current.name, ...name } : current.name,
      description: description !== undefined ? { ...current.description, ...description } : current.description,
      category: category !== undefined ? String(category) : current.category,
      updatedAt: now,
    };
    products[index] = updated;
    await saveProducts(products);
    return NextResponse.json(products[index]);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await saveProducts(filtered);
  return NextResponse.json({ success: true });
}
