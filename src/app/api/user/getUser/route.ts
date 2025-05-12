import { createClient } from "@/utils/supabase/server";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const response = await axios.get(`${BACKEND_URL}/users/get/${user?.id}`);
    const data = response.data;

    return NextResponse.json(data, {
      status: 200,
      statusText: "User fetched successfully!",
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch user" },
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
