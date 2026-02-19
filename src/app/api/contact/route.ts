import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;

function getClientIP(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
    || request.headers.get("x-real-ip") 
    || "unknown";
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, 5000);
}

interface ContactBody {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
}

function isValidContactBody(body: ContactBody): boolean {
  return (
    typeof body.name === "string" &&
    body.name.length > 0 &&
    body.name.length <= 100 &&
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.message === "string" &&
    body.message.length > 0 &&
    body.message.length <= 5000
  );
}

function saveToFile(data: object): void {
  try {
    const dataDir = join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = join(dataDir, "messages.json");
    let messages: object[] = [];
    
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8");
      messages = JSON.parse(content || "[]");
    }
    
    messages.push(data);
    writeFileSync(filePath, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error("Error saving to file:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!isValidContactBody(body)) {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    const { name, email, projectType, message } = body;

    const contactData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      projectType: sanitizeInput(projectType || "not specified"),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
    };

    console.log("New contact form submission:", contactData);

    saveToFile(contactData);
    
    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
