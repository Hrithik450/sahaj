import { auth } from "@/lib/auth";
import {
  getProfileByUserId,
  profileRowToPrefs,
  upsertProfileForUser,
} from "@/lib/db/profiles";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ profile: null });
    }

    const row = await getProfileByUserId(session.user.id);
    return NextResponse.json({ profile: profileRowToPrefs(row) });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ profile: null });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const body = await request.json();
    const profile = await upsertProfileForUser(session.user.id, body);

    return NextResponse.json({ profile: profileRowToPrefs(profile) });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json(
      { error: "Could not save your profile right now." },
      { status: 500 },
    );
  }
}
