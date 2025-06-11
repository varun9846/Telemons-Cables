import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const mpoFibreAssemblies = await prisma.structuredDataMpoFibreAssemblies.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(mpoFibreAssemblies);
  } catch (error) {
    console.error('Error fetching MPO Fibre Assemblies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MPO Fibre Assemblies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const mpoFibreAssembly = await prisma.structuredDataMpoFibreAssemblies.create({
      data
    });

    return NextResponse.json(mpoFibreAssembly);
  } catch (error) {
    console.error('Error creating MPO Fibre Assembly:', error);
    return NextResponse.json(
      { error: 'Failed to create MPO Fibre Assembly' },
      { status: 500 }
    );
  }
} 