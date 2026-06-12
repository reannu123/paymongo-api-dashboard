import { NextResponse } from "next/server";
import axios from "axios";
import { createOptions } from "@/lib/paymongo";

export async function POST(req: Request) {
  try {
    const { secretKey } = await req.json();

    if (!secretKey || typeof secretKey !== "string") {
      return NextResponse.json(
        { error: "PayMongo secret key is required." },
        { status: 400 }
      );
    }

    const response = await axios.request(createOptions(secretKey));

    return NextResponse.json(response.data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: "Unable to create PayMongo checkout session.",
          details: error.response?.data ?? error.message,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Unexpected checkout-session error." },
      { status: 500 }
    );
  }
}
