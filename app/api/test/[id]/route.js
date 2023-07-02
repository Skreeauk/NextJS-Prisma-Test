import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    let res = NextResponse.json({
        id: params.id
    });

    return res;
}