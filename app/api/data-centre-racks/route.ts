import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const racks = await prisma.structuredDataCentreRacks.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(racks);
  } catch (error) {
    console.error('Error fetching data centre racks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data centre racks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const rack = await prisma.structuredDataCentreRacks.create({
      data,
    });

    return NextResponse.json(rack);
  } catch (error) {
    console.error('Error creating data centre rack:', error);
    return NextResponse.json(
      { error: 'Failed to create data centre rack' },
      { status: 500 }
    );
  }
} 