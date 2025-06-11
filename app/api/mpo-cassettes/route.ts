import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const mpoCassettes = await prisma.structuredDataMpoCassettes.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(mpoCassettes);
  } catch (error) {
    console.error('Error fetching MPO Cassettes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MPO Cassettes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const mpoCassette = await prisma.structuredDataMpoCassettes.create({
      data
    });

    return NextResponse.json(mpoCassette);
  } catch (error) {
    console.error('Error creating MPO Cassette:', error);
    return NextResponse.json(
      { error: 'Failed to create MPO Cassette' },
      { status: 500 }
    );
  }
} 