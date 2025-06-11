import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const mpoChassis = await prisma.structuredDataMpoChassis.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(mpoChassis);
  } catch (error) {
    console.error('Error fetching MPO Chassis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MPO Chassis data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const mpoChassis = await prisma.structuredDataMpoChassis.create({
      data,
    });

    return NextResponse.json(mpoChassis);
  } catch (error) {
    console.error('Error creating MPO Chassis:', error);
    return NextResponse.json(
      { error: 'Failed to create MPO Chassis' },
      { status: 500 }
    );
  }
} 