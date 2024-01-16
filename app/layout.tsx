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

export const metadata: Metadata = {
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
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />
      </head>
      <body style={bodyStyle}>
        <Redux>
          <MantineProvider theme={theme} forceColorScheme="dark">
            <Navbar />
            <div style={contentStyle}>{children}</div>
            <Footer />
            <Notifications />
          </MantineProvider>
        </Redux>
      </body>
    </html>
  );
}
