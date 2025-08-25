/**
 * Generate a fallback email for social login if email is missing.
 * Example: uid -> uid@social.example.com
 */
export function generateFallbackEmail(uid: string, provider: string) {
  // provider can be 'facebook', 'apple', 'google', etc.
  return `${uid}@${provider}.example.com`;
}
