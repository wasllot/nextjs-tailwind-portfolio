import { NextResponse } from "next/server";

const EXTERNAL_API_URL = "https://api.reinaldotineo.online/app/api/system-status";

export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API_URL);
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch system status" },
      { status: 500 }
    );
  }
}
