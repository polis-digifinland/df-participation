import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
    "https://polis.local",
    "https://polis.local:3000",
    "https://beta.polis.local",
    "https://beta.polis-test-gke.digifinland.dev",
    "https://beta.polis.digifinland.fi",
    "https://polis-test-gke.digifinland.dev",
    "https://polis.digifinland.fi",
];

export async function GET(request: NextRequest) {
    let origin = request.headers.get("origin");

    // Log all request headers for debugging
    //console.log("Request Headers:", JSON.stringify(Array.from(request.headers.entries())));

    // If the Origin header is not present, fall back to Referer or Host
    if (!origin) {
        const referer = request.headers.get("referer");
        const host = request.headers.get("host");

        if (referer) {
            const url = new URL(referer);
            origin = `${url.protocol}//${url.hostname}`;
        } else if (host) {
            origin = `https://${host}`;
        }
    }

    // Check that request comes from an allowed origin
    if (!origin || !allowedOrigins.includes(origin)) {
        return NextResponse.json({ message: "Forbidden from", origin: origin || "unknown" }, { status: 403 });
    }

    // Check if the origin starts with the subdomain "beta" and strip it
    if (origin && origin.startsWith("https://beta.")) {
        const url = new URL(origin);
        origin = `https://${url.hostname.replace(/^beta\./, "")}`;
    }

    // Log the determined origin for debugging
    //console.log("Cookie Origin:", origin);

    const CookieTest = request.cookies.get("ct");

    if (CookieTest?.value === "1") {
        return NextResponse.json({ message: "Cookies already tested" }, {
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credentials': "true",
            },
        });
    }
    return NextResponse.json({ message: `Cookies tested for Domain=.${new URL(origin).hostname}`}, {
        headers: {
            'Set-Cookie': `ct=1; Path=/; Domain=.${new URL(origin).hostname}; SameSite=None; Secure`,
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': "true",
        },
    });
}