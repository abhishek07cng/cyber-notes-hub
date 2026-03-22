/**
 * Single source for public nav: URL slugs must match CategoryPage filtering
 * (note.category lowercased, spaces → hyphens).
 */
export const NAV_CATEGORIES = [
  { slug: "web-security", label: "Web Security", apiCategory: "Web Security" },
  {
    slug: "network-security",
    label: "Network Security",
    apiCategory: "Network Security",
  },
  {
    slug: "system-exploitation",
    label: "System Exploitation",
    apiCategory: "System Exploitation",
  },
  {
    slug: "secure-coding",
    label: "Secure Coding",
    apiCategory: "Secure Coding",
  },
];

export function categoryPath(slug) {
  return `/category/${slug}`;
}
