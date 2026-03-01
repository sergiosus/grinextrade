import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getProducts, saveProducts, generateId } from '@/lib/products';
import type { Product } from '@/types/product';
import { locales } from '@/lib/i18n/config';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, name, description, category } = body;
    if (!name || typeof name !== 'object' || !description || typeof description !== 'object' || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name (object), description (object), category' },
        { status: 400 }
      );
    }
    const nameObj: Record<string, string> = {};
    const descObj: Record<string, string> = {};
    for (const loc of locales) {
      nameObj[loc] = String(name[loc] ?? name.en ?? '');
      descObj[loc] = String(description[loc] ?? description.en ?? '');
    }
    if (!nameObj.en || !descObj.en) {
      return NextResponse.json(
        { error: 'At least name.en and description.en are required' },
        { status: 400 }
      );
    }
    const products = await getProducts();
    const now = new Date().toISOString();
    const product: Product = {
      id: generateId(),
      image: image ? String(image) : '/images/textile.jpg',
      name: nameObj as Product['name'],
      description: descObj as Product['description'],
      category: String(category),
      createdAt: now,
      updatedAt: now,
    };
    products.push(product);
    await saveProducts(products);
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
