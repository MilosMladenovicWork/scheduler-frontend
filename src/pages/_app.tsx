import { WithAxios } from "@/providers/with-axios";
import "@/styles/globals.css";
import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <WithAxios>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh" }}>
          <Component {...pageProps} />
        </Box>
      </WithAxios>
    </QueryClientProvider>
  );
}
