import { ConnectDB } from "@/lib/config/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await ConnectDB();
    await mongoose.connection.db.admin().ping(); // real DB check

    return Response.json({
      success: true,
      message: "DB Connected ✅"
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "DB Not Connected ❌",
        error: error.message
      },
      { status: 500 }
    );
  }
}
