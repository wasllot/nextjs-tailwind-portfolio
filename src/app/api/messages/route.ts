import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const MESSAGES_API_KEY = process.env.MESSAGES_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key");
    
    if (!apiKey || apiKey !== MESSAGES_API_KEY) {
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
