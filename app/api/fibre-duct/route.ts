import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const fibreDucts = await prisma.structuredDataFibreDuct.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(fibreDucts);
  } catch (error) {
    console.error('Error fetching Fibre Duct data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Fibre Duct data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fibreDuct = await prisma.structuredDataFibreDuct.create({
      data,
    });

    return NextResponse.json(fibreDuct);
  } catch (error) {
    console.error('Error creating Fibre Duct entry:', error);
    return NextResponse.json(
      { error: 'Failed to create Fibre Duct entry' },
      { status: 500 }
    );
  }
} 