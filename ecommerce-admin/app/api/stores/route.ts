import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized(no userID)", { status: 403 });
    }

    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      }
    });
  
    return NextResponse.json(store);

  } catch (error) {

    console.log('[STORESPOST]', error);
    return new NextResponse("Internal error", { status: 500 });
    
  }
};