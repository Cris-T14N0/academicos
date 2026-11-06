import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Toaster } from "sonner";

import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Académicos UPSantarém",
    template: "%s · Académicos UPSantarém",
  },
  description:
    "Portal académico da Universidade Politécnica de Santarém. Cursos, candidaturas, exames, matrículas, documentos e área do estudante.",
  keywords: [
    "UPSantarém",
    "Universidade Politécnica de Santarém",
    "portal académico",
    "cursos",
    "candidaturas",
    "matrículas",
  ],
  authors: [{ name: "Universidade Politécnica de Santarém" }],
  openGraph: {
    title: "Académicos UPSantarém",
    description:
      "Tudo o que precisas para a tua vida académica, num só lugar.",
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fbfe" },
    { media: "(prefers-color-scheme: dark)", color: "#071522" },
  ],
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('ups-academicos-theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = !stored || stored === 'system' ? system : stored;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
