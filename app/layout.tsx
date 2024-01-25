import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { theme } from "../theme";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/index.css';

import { Metadata } from 'next';
import Redux from './redux';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://immersegt.vercel.app/'),
  title: "ImmerseGT Event Platform",
  description: "Participate in the 2024 XR Hackathon",
  openGraph: {
    title: "ImmerseGT Event Platform",
    description: "Participate in the 2024 XR Hackathon",
    type: "website",
  }
};

const bodyStyle = {
  display: "flex",
  flexDirection: "column" as "column"
}
const contentStyle = {
  flexGrow: 1,
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={bodyStyle}>
        <Redux>
          <MantineProvider theme={theme} forceColorScheme="dark">
            <Navbar />
            <div style={contentStyle}>{children}</div>
            <Footer />
            <Notifications />
            <Analytics />
            <SpeedInsights />
          </MantineProvider>
        </Redux>
      </body>
    </html>
  );
}
