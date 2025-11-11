import { Poppins } from 'next/font/google'
import SvgSprite from "@/components/Image/SvgSprite"
import { ToastContainer } from 'react-toastify';
// SPEED INSIGHT BY VERCEL
import { SpeedInsights } from '@vercel/speed-insights/next';
// CUSTOM META DATA
import { customMetaData } from "@/services/AdditionalMetaData"
import '@/styles/global.scss'
import './main.css'
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';

const poppinsFont = Poppins({ subsets: ['latin'], weight: ["300", "400", "500", "600"] })
 
export const APP_NAME = "Spotify app";
const APP_DESCRIPTION = "Created with love by who? boh!";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: "/opengraph-image.jpg",
  },
  manifest: "/public/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width, initial-scale=1, maximum-scale=1",
  themeColor: '#111'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light" data-scroll-behavior="smooth">
      <head>
        <meta name="application-name" content="Spotify app" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Spotify app" />
        <meta name="description" content="Created with love by who? boh!" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#111" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {
          customMetaData.map((tag, index) => {
            const Tag = tag.htmltag
            return (<Tag {...tag} key={index} /> )
          })
        }
      </head>
      <body className={`${poppinsFont.className} text-sm!`}>
        <ToastContainer hideProgressBar={true} />
        <SvgSprite />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
