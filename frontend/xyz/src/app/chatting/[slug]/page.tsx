import { SlugProps } from "@/types/common";
import React from "react";

function ChattingRoomPage({ params: { slug } }: SlugProps) {
  return <div>ChattingRoomPage {slug}</div>;
}

export default ChattingRoomPage;
