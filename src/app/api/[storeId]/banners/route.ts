import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, 
    {params} : {params: {storeId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    

    // yang di body cuma name aja, karena sisanya otomatis ter generate (id, userId, createdAt, updatedAt)
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Nama banner perlu diinput", {
        status: 401,
      });
    }

    if (!imageUrl) {
        return new NextResponse("Image banner perlu diinput", {
          status: 401,
        });
    }

    if (!params.storeId) {
        return new NextResponse("Store id url dibutuhkan")
    }

    const storeByUserId = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    })

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403})
    }

    // jika sudah tervalidasi semua, baru kirim ke database
    const banner = await db.banner.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNERS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, 
    {params} : {params: {storeId: string}}
) {
  try {
    if (!params.storeId) {
        return new NextResponse("Store id url dibutuhkan")
    }

    const banner = await db.banner.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNERS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}