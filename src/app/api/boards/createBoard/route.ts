import { createClient } from "@/utils/supabase/server";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    console.log(body);
    const response = await axios.post(`${BACKEND_URL}/boards/create`, {
      ...body,
    });
    const data = response.data[0];

    console.log(data);
    return NextResponse.json(data, {
      status: 201,
      statusText: "Board created successfully",
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to create board" },
        {
          status: error.response?.status || 500,
          statusText: error.response?.statusText || "Internal Server Error",
        }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
