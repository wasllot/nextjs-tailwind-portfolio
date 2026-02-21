import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";
import { jwtVerify } from "jose";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;
const JWT_SECRET = new TextEncoder().encode(process.env.MESSAGES_API_KEY || "default-secret");
const MESSAGES_API_KEY = process.env.MESSAGES_API_KEY;

function getClientIP(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
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
        .slice(0, 2000);
}

interface ConsultaBody {
    name?: unknown;
    email?: unknown;
    role?: unknown;
    projectStage?: unknown;
    mainChallenge?: unknown;
    teamSize?: unknown;
    urgency?: unknown;
    recaptchaToken?: unknown;
}

function isValidConsultaBody(body: ConsultaBody): boolean {
    return (
        typeof body.name === "string" &&
        body.name.length > 0 &&
        body.name.length <= 100 &&
        typeof body.email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
        typeof body.role === "string" &&
        body.role.length > 0 &&
        typeof body.projectStage === "string" &&
        body.projectStage.length > 0 &&
        typeof body.mainChallenge === "string" &&
        body.mainChallenge.length > 0 &&
        typeof body.teamSize === "string" &&
        body.teamSize.length > 0 &&
        typeof body.urgency === "string" &&
        body.urgency.length > 0
    );
}

function saveToFile(data: object): void {
    try {
        const dataDir = join(process.cwd(), "data");
        if (!existsSync(dataDir)) {
            mkdirSync(dataDir, { recursive: true });
        }

        const filePath = join(dataDir, "consultations.json");
        let consultations: object[] = [];

        if (existsSync(filePath)) {
            const content = readFileSync(filePath, "utf-8");
            consultations = JSON.parse(content || "[]");
        }

        consultations.push(data);
        writeFileSync(filePath, JSON.stringify(consultations, null, 2));
    } catch (error) {
        console.error("Error saving consultation to file:", error);
    }
}

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

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);
        if (isRateLimited(clientIP)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        const body: ConsultaBody = await request.json();

        if (!isValidConsultaBody(body)) {
            return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
        }

        const consultaData = {
            name: sanitizeInput(body.name as string),
            email: sanitizeInput(body.email as string),
            role: sanitizeInput(body.role as string),
            projectStage: sanitizeInput(body.projectStage as string),
            mainChallenge: sanitizeInput(body.mainChallenge as string),
            teamSize: sanitizeInput(body.teamSize as string),
            urgency: sanitizeInput(body.urgency as string),
            timestamp: new Date().toISOString(),
            source: "consulta-tecnica",
        };

        console.log("New consultation submission:", consultaData);
        saveToFile(consultaData);

        return NextResponse.json({
            success: true,
            message: "¡Consulta recibida! Te contactaré en menos de 24 horas.",
        });
    } catch (error) {
        console.error("Consulta API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const isAuthorized = await verifyAuth(request);

        if (!isAuthorized) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const filePath = join(process.cwd(), "data", "consultations.json");

        if (!existsSync(filePath)) {
            return NextResponse.json({ consultations: [] });
        }

        const content = readFileSync(filePath, "utf-8");
        const consultations = JSON.parse(content || "[]");

        return NextResponse.json({ consultations });
    } catch (error) {
        console.error("Error reading consultations:", error);
        return NextResponse.json({ consultations: [] });
    }
}
