"use client";

import { useMemoryDetail } from "@/hooks/queries/memory";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: number;
  };
};

import React from "react";

function MemoryDetailPage({ params: { slug } }: Props) {
  // TODO: 없는 memorySeq라면 not found
  const { data: memory, isLoading } = useMemoryDetail(slug);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!memory) {
    notFound();
  }

  if (memory) {
    console.log(memory);
    return <div>MemoryDetailPage</div>;
  }
}

export default MemoryDetailPage;
