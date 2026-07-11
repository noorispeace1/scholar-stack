import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`);
    if (!res.ok) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
