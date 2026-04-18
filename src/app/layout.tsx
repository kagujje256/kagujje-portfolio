import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAGUJJE — THE BIG BRAND",
  description: "KAGUJJE - Creative Professional & Brand Owner. Website development, software installation, phone MDM services, and trading. Based in Kampala, Uganda.",
  metadataBase: new URL("https://kagujje.com"),
  keywords: ["KAGUJJE", "web development", "software", "Uganda", "Kampala", "digital services", "trading", "MDM"],
  authors: [{ name: "Kasiba Shardick" }],
  creator: "KAGUJJE",
  openGraph: {
    title: "KAGUJJE — THE BIG BRAND",
    description: "Creative Professional & Brand Owner. Website development, software, MDM services, and trading.",
    url: "https://kagujje.com",
    siteName: "KAGUJJE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAGUJJE — THE BIG BRAND",
    description: "Creative Professional & Brand Owner",
    creator: "@kagujje",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://kagujje.com" />
      </head>
      <body className="antialiased bg-black text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#f5f5f5",
              border: "1px solid #2a2a2a",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
