"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GeneratedVideoUI } from "./_components";

function GeneratedVideoContent() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("video_url");
  const videoType = searchParams.get("videoType") || "Educational Videos";
  const diseaseType = searchParams.get("diseaseType") || "Investment Basics";
  const language = searchParams.get("language") || "English";

  // Use default demo video if no video URL is provided
  const defaultVideoUrl = "/videos/eshre_demo2.mp4";

  return (
    <GeneratedVideoUI
      setShow={() => {}}
      video={{
        video_url: videoUrl || defaultVideoUrl,
        videoType,
        diseaseType,
        language,
      }}
    />
  );
}

export default function GeneratedVideos() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratedVideoContent />
    </Suspense>
  );
}
