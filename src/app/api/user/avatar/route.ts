import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  internalError,
} from "@/lib/api/response";
import { withAuth } from "@/lib/api/middleware";
import { createClient } from "@supabase/supabase-js";

// ============================================
// POST /api/user/avatar - Upload avatar
// ============================================

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const POST = withAuth(async (request, { session }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return validationError("File tidak ditemukan");
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return validationError("Format file harus JPG, PNG, atau WebP");
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return validationError("Ukuran file maksimal 5MB");
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase credentials not configured");
      return internalError("Storage tidak tersedia");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `avatars/${session.user.id}_${Date.now()}.${ext}`;

    // Upload to Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { data, error } = await supabase.storage
      .from("dental-care")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return internalError("Gagal mengupload file");
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("dental-care")
      .getPublicUrl(filename);

    const avatarUrl = urlData.publicUrl;

    // Update user avatar in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: avatarUrl },
    });

    return successResponse(
      { url: avatarUrl },
      "Avatar berhasil diperbarui"
    );
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return internalError("Gagal mengupload avatar");
  }
});

// ============================================
// DELETE /api/user/avatar - Remove avatar
// ============================================

export const DELETE = withAuth(async (request, { session }) => {
  try {
    // Reset avatar to null
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null },
    });

    return successResponse({ removed: true }, "Avatar berhasil dihapus");
  } catch (error) {
    console.error("Error removing avatar:", error);
    return internalError("Gagal menghapus avatar");
  }
});
