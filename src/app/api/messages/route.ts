import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { jwtVerify } from "jose";

const MESSAGES_API_KEY = process.env.MESSAGES_API_KEY;
const JWT_SECRET = new TextEncoder().encode(process.env.MESSAGES_API_KEY || "default-secret");

async function verifyAuth(request: NextRequest): Promise<boolean> {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey && apiKey === MESSAGES_API_KEY) {
    return true;
  }

  const token = request.cookies.get("auth_token")?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await verifyAuth(request);
    
    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const filePath = join(process.cwd(), "data", "messages.json");
    
    if (!existsSync(filePath)) {
      return NextResponse.json({ messages: [] });
    }
    
    const content = readFileSync(filePath, "utf-8");
    const messages = JSON.parse(content || "[]");
    
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json({ messages: [] });
  }
}
