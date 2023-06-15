"use client";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import QueryClientProviderComponent from "@/providers/QueryClientProvider";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
      setLoading(false);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(30);
      setLoading(true);
    });
    if (
      sessionStorage.getItem("admin") === null ||
      sessionStorage.getItem("admin") === undefined
    ) {
      router.push("/");
    }
  }, []);
  if (loading) return <Spinner message="Loading..." />;
  return (
    <QueryClientProviderComponent>
      <LoadingBar
        color="#d90429"
        style={{ height: "4px" }}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{ duration: 4000 }}
      />
      {router.pathname !== "/" && router.pathname !== "/ForgetPassword" && (
        <>
          <Navbar />
          <Tooltip title="home" placement="left" arrow>
            <IconButton
              color="success"
              className="fixed bottom-3 right-3"
              onClick={() => router.push("/HomePage")}
            >
              <AiOutlineHome />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="logout"
            arrow
            placement="right"
            className="fixed bottom-3 left-3"
          >
            <IconButton
              color="error"
              onClick={() => {
                sessionStorage.clear();
                router.push("/");
              }}
            >
              <BiLogOutCircle />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Component {...pageProps} />
    </QueryClientProviderComponent>
  );
}
