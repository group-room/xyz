import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: number;
  };
};

import React from "react";

function MemoryDetailPage({ params: { slug } }: Props) {
  // TODO: 없는 memorySeq라면 not found
  // if () {
  //   notFound()
  // }
  return <div>MemoryDetailPage</div>;
}

export default MemoryDetailPage;
