"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  CircularProgress,
  Tooltip,
  Slide,
} from "@mui/material";
import ProgramFeatures from "@/components/ProgramFeatures";
import { TransitionProps } from "@mui/material/transitions";
import HubspotForm from "@/components/HubspotForm";
import ShareVideoDialog from "@/components/ShareVideo";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

type GeneratedVideoUIProps = {
  setShow: (show: boolean) => void;
  video: {
    video_url: string;
    videoType?: string;
    diseaseType?: string;
    language?: string;
  };
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Video Player Component with optimized sizing
const OptimizedVideoPlayer = ({
  src,
  className = "",
  onVideoRef,
}: {
  src: string;
  className?: string;
  onVideoRef?: (ref: HTMLVideoElement | null) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pass video ref to parent component
    if (onVideoRef) {
      onVideoRef(video);
    }

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      // Clean up video ref when component unmounts
      if (onVideoRef) {
        onVideoRef(null);
      }
      // Pause and reset video on cleanup
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [src, onVideoRef]);

  if (videoError) {
    return (
      <div className="flex items-center justify-center bg-gray-100 min-h-[300px]">
        <div className="text-center p-6">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Demo Video Loading
          </h3>
          <p className="text-gray-600">
            Loading demo video. If this persists, please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black ${className}`}>
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <CircularProgress
              size={24}
              style={{ color: "#4ec48f" }}
              className="sm:w-8 sm:h-8 lg:w-10 lg:h-10"
            />
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
              Loading video...
            </p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className={`w-full h-auto max-w-full ${
          !videoLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        src={src}
        controls
        preload="metadata"
        style={{
          aspectRatio:
            videoDimensions.width && videoDimensions.height
              ? `${videoDimensions.width}/${videoDimensions.height}`
              : "16/9",
        }}
      />

      {videoLoaded && (
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/50 backdrop-blur-sm px-1 py-0.5 sm:px-2 sm:py-1 text-xs text-white rounded">
          {videoDimensions.width}x{videoDimensions.height}
        </div>
      )}
    </div>
  );
};

// Action Button Component
const ActionButton = ({
  onClick,
  icon,
  label,
  variant = "secondary",
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: "primary" | "secondary";
}) => (
  <Tooltip title={label}>
    <button
      onClick={onClick}
      className={`p-1.5 sm:p-2 lg:p-3 rounded-xl transition-colors flex items-center justify-center ${
        variant === "primary"
          ? "bg-[#4ec48f] hover:bg-[#3db37f] text-white"
          : label === "Share video"
          ? "bg-[#4ec48f] hover:bg-[#3db37f] text-white shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-200"
          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
      }`}
    >
      {icon}
    </button>
  </Tooltip>
);

export const GeneratedVideoUI = ({ setShow, video }: GeneratedVideoUIProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  // const [downloading, setDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleGenerateAnother = () => {
    if (pathname === "/try") {
      // If already on /try page, refresh the page
      window.location.reload();
    } else {
      // If not on /try page, redirect to /try
      router.push("/try");
    }
  };

  const handleBack = () => {
    // Stop video before going back
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.currentTime = 0;
    }
    setShow(false);
  };

  const handleVideoRef = (ref: HTMLVideoElement | null) => {
    videoElementRef.current = ref;
  };

  console.log(video);

  // const handleDownload = async () => {
  //   if (!video?.video_url) return;

  //   setDownloading(true);
  //   try {
  //     const response = await fetch(video.video_url);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `${video.videoType || "video"}-${
  //       video.diseaseType || "generated"
  //     }.mp4`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

  return (
    <>


      <Dialog
        open={modalOpen}
        slots={{
          transition: Transition,
        }}
        keepMounted
        className="rounded-xl"
        fullWidth
        onClose={() => setModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="left">{"Book Demo"}</DialogTitle>
        <Divider />
        <DialogContent>
          <HubspotForm id="custom_form" />
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
            <button
              onClick={handleBack}
              className="p-1 sm:p-1.5 lg:p-2 bg-white/50 backdrop-blur-lg rounded-xl transition-colors group cursor-pointer"
            >
              <ArrowLeft className="size-6" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium text-gray-900">
                Generated Video
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5 lg:mt-1">
                Your personalized medical video is ready
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-8">
            {/* Video Section - Smaller */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
                {video?.video_url ? (
                  <OptimizedVideoPlayer
                    src={video.video_url}
                    className="w-full max-w-2xl mx-auto"
                    onVideoRef={handleVideoRef}
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-100 h-32 sm:h-48 lg:h-64 rounded-xl">
                    <div className="text-center">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-1 sm:mb-2 lg:mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                        Loading demo video...
                      </p>
                    </div>
        </div>
                )}
        </div>
            </div>

            {/* Expanded Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {/* Share Section */}
              <ShareVideoDialog
                open={open}
                onClose={() => {}} // Disable closing
                videoUrl={
                  new URL(
                    `/generated-videos?video_url=${encodeURIComponent(
                      video?.video_url || ""
                    )}&videoType=${encodeURIComponent(
                      video?.videoType || ""
                    )}&diseaseType=${encodeURIComponent(
                      video?.diseaseType || ""
                    )}&language=${encodeURIComponent(video?.language || "")}`,
                    window.location.origin
                  ).href || ""
                }
              />

              {/* Video Info */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 flex flex-col gap-2">
                <div className="flex justify-between items-center gap-1.5 sm:gap-2 lg:gap-3 mb-1.5 sm:mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-base font-medium rounded-full">
                    {video?.videoType || "Educational Videos"}
                  </span>
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-1.5 sm:gap-2 lg:gap-3">

                  </div>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <div className="ml-2">
                    <p className="text-gray-600 text-sm">
                      Language: {video?.language || "English"}
                    </p>
                    <span className="text-gray-700 text-sm font-medium rounded-full">
                      {video?.diseaseType || "Investment Basics"}
                    </span>
                  </div>
                </div>
          </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
            <button
                    onClick={handleGenerateAnother}
                    className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 text-left hover:bg-blue-50 transition-colors rounded-xl border border-gray-200 hover:border-blue-200"
            >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
              </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Generate Another Video
                      </div>
                      <div className="text-sm text-gray-500">
                        Create a new personalized video
                      </div>
                    </div>
            </button>
                  {/* <button className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 text-left hover:bg-gray-50 transition-colors rounded-xl border border-gray-200">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">
                        View All Videos
                      </div>
                      <div className="text-xs text-gray-500">
                        Browse video library
                      </div>
                    </div>
                  </button> */}
        </div>
          </div>

          {/* Performance Metrics */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
              Performance Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-blue-100 flex flex-col justify-center items-center rounded-xl">
                    <div className="text-lg sm:text-xl font-bold text-blue-600 mb-0.5 sm:mb-1">
                      78%
            </div>
                    <div className="text-xs text-gray-600 font-medium">
                  Engagement Increase
                    </div>
              </div>
                  <div className="text-center p-3 bg-green-100 flex flex-col justify-center items-center rounded-xl">
                    <div className="text-lg sm:text-xl font-bold text-green-600 mb-0.5 sm:mb-1">
                      90%
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Cost Reduction
                    </div>
              </div>
                  <div className="text-center p-3 bg-purple-100 flex flex-col justify-center items-center rounded-xl">
                    <div className="text-lg sm:text-xl font-bold text-purple-600 mb-0.5 sm:mb-1">
                  $0.50
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                  Video Cost Starting From
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Features */}
          <ProgramFeatures />
          {/* <div className="bg-white rounded-xl p-2 sm:p-4 lg:p-6 xl:p-8 mt-4 sm:mt-6 lg:mt-8">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium text-gray-900 mb-1 sm:mb-2">
                Program Features
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Enterprise healthcare video capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
            {[
              {
                title: "Advanced Analytics",
                icon: "/graph-svgrepo-com1.png",
                desc: "Real-time engagement metrics, completion rates, and patient interaction insights",
              },
              {
                title: "Engagement Tracking",
                icon: "/graph-svgrepo-com2.png",
                desc: "Monitor video effectiveness and patient comprehension levels across all touchpoints",
              },
              {
                title: "Approval Workflow",
                icon: "/graph-svgrepo-com3.png",
                desc: "Multi-tier medical content review and compliance validation system",
              },
              {
                title: "Smart Callbacks",
                icon: "/graph-svgrepo-com4.png",
                desc: "Automated follow-up scheduling based on patient engagement and care protocols",
              },
              {
                title: "Feedback Collection",
                icon: "/graph-svgrepo-com6.png",
                desc: "Integrated patient satisfaction surveys and clinical outcome tracking",
              },
              {
                  title: "Enterprise Security",
                icon: "/graph-svgrepo-com5.png",
                  desc: "Zero-trust architecture and healthcare data protection",
              },
            ].map((feature, i) => (
              <div
                key={i}
                  className="p-2 sm:p-3 lg:p-4 xl:p-6 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl"
              >
                  <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                        width={16}
                        height={16}
                        className="sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  />
                </div>
                <div>
                      <h3 className="font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                    {feature.desc}
                  </p>
                    </div>
                </div>
              </div>
            ))}
          </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
