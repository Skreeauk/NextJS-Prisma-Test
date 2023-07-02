import { NextResponse } from "next/server";

export async function GET(request) {
    let res = NextResponse.json({
        id: 1,
        txt: 'Hello'
    });

    return res;
}

export async function POST(request) {

    let userParam = request.nextUrl.searchParams.get('txt');

    let userBody = await request.json()


    let res = NextResponse.json({
        txt: userParam
    });

    return res;
}