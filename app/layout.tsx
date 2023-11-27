import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { theme } from "../theme";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/index.css'

export const metadata = {
  title: "ImmerseGT Event Platform",
  description: "Participate in the 2024 XR Hackathon",
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
        <MantineProvider theme={theme} forceColorScheme="dark">
          <Navbar/>
          <div style={contentStyle}>{children}</div>
          <Footer/>
          <Notifications />
          </MantineProvider>
      </body>
    </html>
  );
}
