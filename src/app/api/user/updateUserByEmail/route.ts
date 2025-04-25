import { CreateUserResponse, UpdateUser } from "@/utils/types/user/user";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

type ApiResponse = CreateUserResponse | { message: string };

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json();

    const response = await axios.post<CreateUserResponse>(
      `${BACKEND_URL}/users/update-by-email/${body.email}`,
      body.user
    );
    const data = response.data;
    return NextResponse.json(data, {
      status: 200,
      statusText: "User updated successfully!",
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to update user" },
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
