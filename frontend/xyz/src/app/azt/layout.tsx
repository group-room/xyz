import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <TabBar />
    </>
  );
}

export default AppLayout;
