import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    // yang di body cuma name aja, karena sisanya otomatis ter generate (id, userId, createdAt, updatedAt)
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Nama toko perlu diinput", {
        status: 401,
      });
    }

    // jika sudah tervalidasi semua, baru kirim ke database
    const store = await db.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
