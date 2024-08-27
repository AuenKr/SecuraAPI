import { NextResponse } from 'next/server';

export function GET() {
  console.log('On GET /api/');
  return NextResponse.json({
    status: 'health check point',
  });
}
