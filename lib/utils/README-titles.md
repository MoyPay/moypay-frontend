# Professional Title System

The application now has a comprehensive, professional title system that automatically changes browser titles based on the current page and context.

## 🎯 **How It Works**

The root layout already includes:
```tsx
title: {
  default: siteConfig.name,
  template: `%s | ${siteConfig.name}`,
}
```

Each page exports metadata that gets automatically formatted using the template.

## 📋 **Current Page Titles**

### Static Pages
| Page | URL | Browser Title |
|------|-----|---------------|
| Homepage | `/home` | `Unlock Passive Earnings from Day One \| MoyPay` |
| Dashboard | `/dashboard` | `Dashboard \| MoyPay` |
| Earn | `/earn` | `Automated Earnings \| MoyPay` |
| 404 Error | `/non-existent` | `Page Not Found \| MoyPay` |

### Dynamic Pages
| Page | URL Pattern | Browser Title |
|------|-------------|---------------|
| Organization Detail | `/dashboard/organizations/[id]` | `Organization Management \| MoyPay` |
| Employee Earnings | `/dashboard/organizations-joined/[id]` | `My Earnings \| MoyPay` |

## 🛠 **Adding Titles to New Pages**

### Simple Static Title
```tsx
// page.tsx
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/utils/page-metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Settings",
  description: "Configure your MoyPay account settings and preferences.",
  keywords: ["settings", "preferences", "account"]
});

export default function SettingsPage() {
  return <div>Settings content</div>;
}
```
**Result**: `Settings | MoyPay`

### Dynamic Title with Data
```tsx
// [id]/page.tsx
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/utils/page-metadata";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // You could fetch data here to get the actual name
  // const organization = await fetchOrganization(id);
  
  return generatePageMetadata({
    title: `Organization ${id}`,
    description: `Manage organization ${id} employees and payroll.`,
    keywords: ["organization", "management", "payroll"]
  });
}

export default function OrganizationPage({ params }: Props) {
  return <div>Organization details</div>;
}
```
**Result**: `Organization abc123 | MoyPay`

### Using Predefined Configurations
```tsx
// page.tsx
import { generatePageMetadata, pageMetadataConfigs } from "@/lib/utils/page-metadata";

export const metadata = generatePageMetadata(pageMetadataConfigs.dashboard);
```

## 🎨 **Advanced Title Generation**

For complex scenarios, use the dynamic title utilities:

```tsx
import { titleGenerators, pageFormats } from "@/lib/utils/dynamic-titles";

// Organization with name
const title1 = titleGenerators.organization("Acme Corp", "Edit");
// Result: "Edit - Acme Corp - Organization | MoyPay"

// Employee management
const title2 = titleGenerators.employee("John Doe", "Profile");
// Result: "Profile - John Doe - Employee | MoyPay"

// Earnings with period
const title3 = titleGenerators.earnings("Q4 2024", "Completed");
// Result: "Q4 2024 - Earnings (Completed) | MoyPay"

// Using page formats
const title4 = pageFormats.detail("Employee", "Jane Smith");
// Result: "Employee: Jane Smith"
```

## 🔍 **SEO Benefits**

Each page includes comprehensive metadata:

```tsx
{
  title: "Dashboard | MoyPay",
  description: "Manage your organizations, employees, and payroll systems...",
  keywords: ["dashboard", "payroll management", "organizations", ...],
  openGraph: {
    title: "Dashboard | MoyPay",
    description: "Manage your organizations...",
    url: "https://moypay.com/dashboard",
    siteName: "MoyPay",
    images: [{ url: "https://moypay.com/og-image.png", ... }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | MoyPay",
    description: "Manage your organizations...",
    images: ["https://moypay.com/og-image.png"],
    creator: "@moypay"
  },
  robots: { index: true, follow: true, ... }
}
```

## 📱 **Browser Tab Examples**

When users navigate through the app:

1. **Homepage**: `🏠 Unlock Passive Earnings from Day One | MoyPay`
2. **Dashboard**: `📊 Dashboard | MoyPay` 
3. **Organization**: `🏢 Organization Management | MoyPay`
4. **Earnings**: `💰 My Earnings | MoyPay`
5. **Settings**: `⚙️ Settings | MoyPay`
6. **404 Error**: `❌ Page Not Found | MoyPay`

## 🎯 **Professional Features**

✅ **Automatic**: Works with Next.js metadata system  
✅ **SEO Optimized**: Full OpenGraph, Twitter, and robot tags  
✅ **Dynamic**: Can fetch data for personalized titles  
✅ **Consistent**: All pages follow the same pattern  
✅ **Accessible**: Clear, descriptive titles for screen readers  
✅ **Brandable**: Always includes site name  

## 🔄 **Easy Maintenance**

- Update site name in one place (`siteConfig.name`)
- Consistent format across all pages
- Easy to add new predefined configurations
- Type-safe with TypeScript
- Automated metadata generation

The title system now provides a professional, consistent experience that helps with SEO, user experience, and brand recognition!
