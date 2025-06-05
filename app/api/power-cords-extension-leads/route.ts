import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const powerCords = await prisma.structuredPowerCords.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(powerCords);
  } catch (error) {
    console.error('Error fetching power cords:', error);
    return NextResponse.json(
      { error: 'Failed to fetch power cords' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const powerCord = await prisma.structuredPowerCords.create({
      data
    });

    return NextResponse.json(powerCord);
  } catch (error) {
    console.error('Error creating power cord:', error);
    return NextResponse.json(
      { error: 'Failed to create power cord' },
      { status: 500 }
    );
  }
} 