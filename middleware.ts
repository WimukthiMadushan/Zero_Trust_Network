// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = [
    '/PeakTimeAnalysis',
    '/BehaviouralAnalysis',
    '/NetworkPacketAnalysis',
    '/PatientHealthAnalysis',
    '/RiskAssesment'
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('firebaseToken')?.value;
    const { pathname } = request.nextUrl;

    const isProtected = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    if (isProtected && !token) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/PeakTimeAnalysis',
        '/BehaviouralAnalysis',
        '/NetworkPacketAnalysis',
        '/PatientHealthAnalysis',
        '/RiskAssesment'
    ],
};