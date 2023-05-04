"use client";

import React from "react";
import { SlugProps } from "@/types/common";
import { useMemoryList } from "@/hooks/queries/memory";

function AzitDetailPage({ params: { slug } }: SlugProps) {
  const { data: aztMemoryData, isLoading: isAztMemoryLoading } = useMemoryList({
    date: null,
    aztSeq: slug,
  });
  return <div>AzitDetailPage</div>;
}

export default AzitDetailPage;
