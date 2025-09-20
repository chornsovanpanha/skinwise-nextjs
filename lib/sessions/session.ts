import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

type SessionPayload = {
  userId: string;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}

export const setUserSessionCookie = async (
  userId: string,
  maxAgeSeconds?: number
) => {
  const token = await encrypt({ userId });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "user_session",
    value: token,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: maxAgeSeconds ?? 60 * 60 * 24 * 7, // default 7 days if not provided
  });
};

export const getUserIdFromSession = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_session")?.value;
  const payload = await decrypt(token);
  return payload?.userId ?? null;
};

export const clearUserCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "user_session",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
};
