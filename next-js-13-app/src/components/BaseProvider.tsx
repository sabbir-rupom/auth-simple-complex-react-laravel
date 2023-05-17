"use client";

import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import createEmotionCache from "@/config/createEmotionCache";
import theme from "@/config/theme";

type Props = {
  children: React.ReactNode;
  emotionCache?: EmotionCache;
  session: any;
};

const clientSideEmotionCache = createEmotionCache();

const BaseProvider = ({
  children,
  session,
  emotionCache = clientSideEmotionCache,
}: Props) => {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default BaseProvider;
