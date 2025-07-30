export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MoyPay",
  description:
    "MoyPay is payroll management app that helps you manage your employees' payroll, taxes, and benefits with ease.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://moypay.vercel.app"
      : "http://localhost:3000",
  links: {
    github: "https://github.com/MoyPay",
  },
  navItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Withdraw",
      href: "/withdraw",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
};
