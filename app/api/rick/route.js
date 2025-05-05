import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch("https://rickandmortyapi.com/api/character/?page=1");
    let data = await response.json();
    data = {
        consultedDate: new Date().toISOString(),
        ...data
    }
    return NextResponse.json(data);
}