"use client";

import AgencyWebsite from "@/components/Agency/AgencyWebsite";

export default function HomePage() {
  // The root page always renders the Agency Portfolio Website (Webibi)
  // Client websites are now accessed via /[slug]
  return <AgencyWebsite />;
}
