import Header from "@/components/Header";
import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default AppLayout;
