import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    msg: 'On get /api/openapi',
  });
}
