import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAGUJJE — THE BIG BRAND",
  description: "Portfolio & Creative Works by KAGUJJE - Creative Professional & Brand Owner",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kagujje.com"),
  openGraph: {
    title: "KAGUJJE — THE BIG BRAND",
    description: "Portfolio & Creative Works by KAGUJJE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('kagujje-theme') || 'dark';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
