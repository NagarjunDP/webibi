import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path') || '/';
    const secret = request.nextUrl.searchParams.get('secret');

    // Basic security check (you should set this env var)
    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        revalidatePath(path);
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
