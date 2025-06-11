import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const coolingSystems = await prisma.structuredDataLiquidCooling.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(coolingSystems);
  } catch (error) {
    console.error('Error fetching liquid cooling systems:', error);
    return NextResponse.json(
      { error: 'Failed to fetch liquid cooling systems' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const coolingSystem = await prisma.structuredDataLiquidCooling.create({
      data,
    });

    return NextResponse.json(coolingSystem);
  } catch (error) {
    console.error('Error creating liquid cooling system:', error);
    return NextResponse.json(
      { error: 'Failed to create liquid cooling system' },
      { status: 500 }
    );
  }
} 