// Project 270 — connection config
// Set this up once with your real values, then commit it to your repo.
// You will not need to touch this file again when you get a new index.html.
//
// These are not secrets — the Supabase anon key is safe to be public
// (Supabase's security model relies on Row Level Security policies,
// not on hiding this key). Your actual sensitive credential, the
// Intervals.icu API key, never goes here — it only lives as a secret
// on the Edge Function.

window.SUPABASE_URL = 'YOUR_SUPABASE_URL';         // e.g. https://abcxyz.supabase.co
window.SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // the legacy anon/public key

// Web Push public key — not a secret (that's the point of VAPID's public/private
// split), safe to commit. The matching private key goes server-side only, as an
// Edge Function secret — see SETUP.md for the "push notifications" section.
window.VAPID_PUBLIC_KEY = 'BHLXwpcHiQNXngJlqbIDoIdufkZci3Qln8e6zQbOr8v-xX0RmQBir9c9iHEyGgydeK4se4cbM3mgBeRN7uVE0kU';
