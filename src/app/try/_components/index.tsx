"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useMemo } from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Tooltip,
  Skeleton,
  Typography,
  IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import HubspotForm from "@/components/HubspotForm";
import Swal from "sweetalert2";
import { GeneratedVideoUI } from "@/app/generated-videos/_components";
import {
  ArrowLeft,
  ChevronRightIcon,
  FilmIcon,
  LanguagesIcon,
  X,
} from "lucide-react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Enhanced Personalized Video Generation Loader
const PersonalizedVideoLoader = ({
  selectedAvatar,
  selectedLanguage,
  selectedVideoType,
  selectedDisease,
  avatarArray,
  onComplete,
}: {
  selectedAvatar: number | null;
  selectedLanguage: string | null;
  selectedVideoType: string | null;
  selectedDisease: string | null;
  avatarArray: Array<{
    name: string;
    path: string;
    videoPath: string | null;
    desc: string;
    folderName?: string;
  }>;
  onComplete: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const generationSteps = useMemo(() => {
    const avatar = avatarArray[selectedAvatar || 0];
    return [
      {
        title: "Analyzing Your Selections",
        description: "Processing your personalized requirements",
        duration: 1200,
      },
      {
        title: `Setting Up ${avatar?.name || "Avatar"} Avatar`,
        description: `Configuring ${
          avatar?.desc || "voice and appearance"
        } for optimal delivery`,
        duration: 1500,
      },
      {
        title: `Preparing ${selectedLanguage} Language Model`,
        description: `Loading ${selectedLanguage} speech synthesis and pronunciation rules`,
        duration: 1300,
      },
      {
        title: `Generating ${selectedVideoType} Content`,
        description: `Creating medical content for ${
          selectedDisease || selectedVideoType
        }`,
        duration: 1800,
      },
      {
        title: "Rendering Video Components",
        description: "Combining avatar, audio, and visual elements",
        duration: 1400,
      },
      {
        title: "Applying Medical Accuracy Checks",
        description: "Validating content against medical guidelines",
        duration: 1200,
      },
      {
        title: "Optimizing Video Quality",
        description: "Enhancing audio clarity and visual presentation",
        duration: 1100,
      },
      {
        title: "Finalizing Your Personalized Video",
        description: "Preparing for delivery and quality assurance",
        duration: 1500,
      },
    ];
  }, [
    selectedAvatar,
    selectedLanguage,
    selectedVideoType,
    selectedDisease,
    avatarArray,
  ]);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= generationSteps.length) {
        setTimeout(onComplete, 1000);
        return;
      }

      setCurrentStep(stepIndex);
      setProgress(0);

      const step = generationSteps[stepIndex];
      const progressIncrement = 100 / (step.duration / 50);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + progressIncrement;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      timeoutId = setTimeout(() => {
        clearInterval(progressInterval);
        runStep(stepIndex + 1);
      }, step.duration);
    };

    runStep(0);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [generationSteps, onComplete]);

  const currentStepData = generationSteps[currentStep];
  const overallProgress =
    ((currentStep + progress / 100) / generationSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          {/* Animated Logo/Icon */}
          <div className="relative mb-3 sm:mb-4 md:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto relative">
              <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-[#4ec48f]/20 rounded-full animate-spin"></div>
              <div
                className="absolute inset-1 sm:inset-2 border-2 sm:border-3 md:border-4 border-[#4ec48f] border-t-transparent rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#4ec48f] animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
              Creating Your Personalized Video
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4 leading-tight">
              Generating custom content for {selectedLanguage}{" "}
              {selectedVideoType?.toLowerCase()}
              {selectedDisease && ` about ${selectedDisease}`}
            </p>

            {/* Overall Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-1 sm:mb-2">
              <div
                className="bg-gradient-to-r from-[#4ec48f] to-[#3db37f] h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              Step {currentStep + 1} of {generationSteps.length} •{" "}
              {Math.round(overallProgress)}% complete
            </div>
          </div>
        </div>

        {/* Current Step Details */}
        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#4ec48f] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-xs sm:text-sm md:text-base">
                {currentStepData?.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 sm:mb-3 leading-tight">
                {currentStepData?.description}
              </p>

              {/* Step Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5">
                <div
                  className="bg-[#4ec48f] h-1 sm:h-1.5 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Selections Summary */}
        <div className="mt-3 sm:mt-4 md:mt-6 bg-gray-50 rounded-xl p-2 sm:p-3 md:p-4">
          <h4 className="font-medium text-gray-900 mb-1.5 sm:mb-2 md:mb-3 text-xs sm:text-sm">
            Your Selections:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white rounded border overflow-hidden flex-shrink-0">
                {selectedAvatar !== null &&
                  (avatarArray[selectedAvatar]?.path !== "custom" &&
                  avatarArray[selectedAvatar]?.videoPath ? (
                    <video
                      className="w-full h-full object-cover"
                      src={avatarArray[selectedAvatar].videoPath}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={
                        avatarArray[selectedAvatar]?.path !== "custom"
                          ? avatarArray[selectedAvatar]?.path
                          : "/create_own.png"
                      }
                      alt="avatar"
                      width={16}
                      height={16}
                      className="object-cover sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  ))}
              </div>
              <span className="text-gray-700 truncate">
                {avatarArray[selectedAvatar || 0]?.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#4ec48f] rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 truncate">{selectedLanguage}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 truncate">
                {selectedVideoType}
              </span>
            </div>
            {selectedDisease && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700 truncate">
                  {selectedDisease}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Technical Details (for authenticity) */}
        <div className="mt-2 sm:mt-3 md:mt-4 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 bg-white px-2 sm:px-3 py-1 rounded-full border">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs">AI Processing Engine Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimal Skeleton Loading Component
const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/50 backdrop-blur-sm p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <Skeleton variant="circular" width={28} height={28} />
      <Skeleton variant="text" width={140} height={20} />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton variant="rectangular" width="100%" height={100} />
          <Skeleton variant="text" width="60%" height={14} />
        </div>
      ))}
    </div>
  </div>
);

// Minimal Step Indicator Component
const StepIndicator = ({
  step,
  title,
  isCompleted,
  isActive,
}: {
  step: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}) => (
  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-4">
    <div
      className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 ${
        isCompleted
          ? "bg-green-500 text-white"
          : isActive
          ? "bg-[#4ec48f] text-white"
          : "bg-gray-200 text-gray-500"
      }`}
    >
      {isCompleted ? (
        <svg
          className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        step
      )}
    </div>
    <h2
      className={`text-base sm:text-lg lg:text-lg font-medium transition-colors duration-300 ${
        isActive ? "text-gray-900" : "text-gray-500"
      }`}
    >
      {title}
    </h2>
  </div>
);

// Minimal Selection Card Component
const SelectionCard = ({
  isSelected,
  onClick,
  children,
  disabled = false,
  className = "",
}: {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => (
  <div
    onClick={disabled ? undefined : onClick}
    className={`
      cursor-pointer transition-all duration-200 transform border hover:scale-[1.01] active:scale-[0.99] rounded-xl
      ${
        isSelected
          ? "border-[#4ec48f] shadow-sm"
          : "border-gray-300 hover:shadow-sm"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `}
  >
    {children}
  </div>
);

// Video Path Mapping Utility
const createVideoPath = (
  avatar: string,
  language: string,
  videoType: string,
  disease?: string
): string => {
  // Map UI selections to actual folder structure
  const avatarFolderMap: { [key: string]: string } = {
    Alex: "Alex", // Alex has his own video folder
    Emily: "Emily",
    Sophia: "Sophia",
  };

  const videoTypeFolderMap: { [key: string]: string } = {
    "Disease Explainer": "Disease",
    "Report Explainer": "Report",
    "Educational Videos": "Educational",
  };

  const diseaseFolderMap: { [key: string]: string } = {
    "Tubal Block": "Tubal Block",
    PCOD: "PCOD",
    Teratozoospermia: "Teratoozoospermia", // Note: folder has extra 'o'
    Stimulation: "Stimulation",
  };

  // Special case for Alex's Tubal Block Disease Explainer
  if (avatar === "Alex" && videoType === "Disease Explainer" && disease === "Tubal Block") {
    return `/Assets/Alex/${language}/Disease/Tubal Block.mp4`;
  }

  const avatarFolder = avatarFolderMap[avatar] || "Sophia";
  const typeFolder = videoTypeFolderMap[videoType];
  const diseaseFile = disease ? diseaseFolderMap[disease] : "Stimulation";

  // Construct the path: /Assets/{Avatar}/{Language}/{Type}/{Disease}.mp4
  return `/Assets/${avatarFolder}/${language}/${typeFolder}/${diseaseFile}.mp4`;
};

// Avatar Array with enhanced mapping
const createAvatarArray = () => [
  {
    id: 1,
    name: "Alex",
    path: "/British_Male_thumbnail.webp",
    videoPath: "/Assets/Alex/Alex.mp4",
    desc: "Professional British accent",
    folderName: "Alex",
    available: true,
  },
  {
    id: 2,
    name: "Emily",
    path: "/Asian_Female_thumbnail.webp",
    videoPath: "/Assets/Emily/Emily.mp4",
    desc: "Clear Asian accent",
    folderName: "Emily",
    available: true,
  },
  {
    id: 3,
    name: "Sophia",
    path: "/US_Female_thumbnail.webp",
    videoPath: "/Assets/Sophia/Sophia.mp4",
    desc: "Warm American voice",
    folderName: "Sophia",
    available: true,
  },

];

// Enhanced Video Type Configuration
const createVideoTypeConfig = () => [
  {
    name: "Educational Videos",
    folderName: "Educational",
    child: ["Stimulation"],
    icon: "/embryo.svg",
    desc: "Teach medical procedures",
    available: {
      English: ["Stimulation"],
      // French and Spanish educational videos are not available
    },
  },
];

// Language Configuration
const createLanguageConfig = () => [
  {
    name: "English",
    flag: "🇺🇸",
    desc: "Most popular",
    folderName: "English",
    available: true,
  },
  {
    name: "French",
    flag: "🇫🇷",
    desc: "Professional",
    folderName: "French",
    available: true,
  },
  {
    name: "Spanish",
    flag: "🇪🇸",
    desc: "Widely used",
    folderName: "Spanish",
    available: true,
  },
];

export const GenerateVideoUI = () => {
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVideoType, setSelectedVideoType] = useState<string | null>(
    null
  );
  const [diseaseList, setSelectDisease] = useState<string[]>([]);
  const [openCustom, setCustomModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [request, setRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPersonalizedLoader, setShowPersonalizedLoader] = useState(false);
  const [video, setVideo] = useState<{
    video_url: string;
    videoType?: string;
    diseaseType?: string;
    language?: string;
  }>({ video_url: "" });
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Refs for auto-scrolling
  const avatarSectionRef = React.useRef<HTMLDivElement>(null);
  const languageSectionRef = React.useRef<HTMLDivElement>(null);
  const videoTypeSectionRef = React.useRef<HTMLDivElement>(null);
  const diseaseSectionRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      if (ref.current) {
        const yOffset = -100; // Offset to account for header
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const avatarArray = useMemo(() => createAvatarArray(), []);
  const videoTypeConfig = useMemo(() => createVideoTypeConfig(), []);
  const languageConfig = useMemo(() => createLanguageConfig(), []);

  // Legacy support for existing code with language filtering
  const videoType = useMemo(
    () =>
      videoTypeConfig
        .filter((config) => {
          // If no language selected, show all video types
          if (!selectedLanguage) return true;
          
          // Check if this video type is available for the selected language
          const languageKey = selectedLanguage as keyof typeof config.available;
          const availableForLanguage = config.available[languageKey];
          
          // Only show if videos are available for this language
          return availableForLanguage && availableForLanguage.length > 0;
        })
        .map((config) => ({
          name: config.name,
          child: config.child,
          icon: config.icon,
          desc: config.desc,
        })),
    [videoTypeConfig, selectedLanguage]
  );

  const languages = useMemo(
    () =>
      languageConfig.map((config) => ({
        name: config.name,
        flag: config.flag,
        desc: config.desc,
      })),
    [languageConfig]
  );

  const generateVideo = useCallback(async () => {
    // Show personalized loader first
    setShowPersonalizedLoader(true);
  }, []);

  const handlePersonalizedLoaderComplete = useCallback(async () => {
    setShowPersonalizedLoader(false);
    setLoading(true);

    // Get selected avatar info
    const selectedAvatarInfo = avatarArray[selectedAvatar || 0];

    // Create the actual video path
    const videoPath = createVideoPath(
      selectedAvatarInfo.name,
      selectedLanguage || "English",
      selectedVideoType || "Disease Explainer",
      selectedDisease || undefined
    );

    // Enhanced params with actual file paths
    const params = {
      avatar_id: selectedAvatar ? selectedAvatar + 1 : 1,
      avatar_name: selectedAvatarInfo.name,
      language: selectedLanguage,
      video_type: selectedVideoType,
      disease: selectedDisease,
      video_path: videoPath,
      // Additional metadata
      avatar_folder: selectedAvatarInfo.folderName,
      selections: {
        avatar: selectedAvatarInfo,
        language: selectedLanguage,
        videoType: selectedVideoType,
        disease: selectedDisease,
      },
    };

    try {
      const response = await fetch(`/api/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (result?.message) {
        await Swal.fire({
          icon: "error",
          title: "Video Not Available",
          text: "Currently, the video is not available. Please try again later or select a different option.",
          confirmButtonColor: "#4ec48f",
        });
      } else {
        // Enhanced video data with metadata
        const videoData = {
          ...result,
          video_url: videoPath,
          videoType: selectedVideoType,
          diseaseType: selectedDisease,
          language: selectedLanguage,
          avatar: selectedAvatarInfo.name,
          generated_at: new Date().toISOString(),
          selections: params.selections,
        };

        setVideo(videoData);
        sessionStorage.setItem("videoData", JSON.stringify(videoData));
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShow(true);
      }
    } catch (error) {
      console.error("Video generation error:", error);
      await Swal.fire({
        icon: "error",
        title: "Generation Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#4ec48f",
      });
    } finally {
      setLoading(false);
    }
  }, [
    selectedAvatar,
    selectedLanguage,
    selectedVideoType,
    selectedDisease,
    avatarArray,
  ]);

  const isFormValid = useMemo(() => {
    return (
      selectedAvatar !== null &&
      selectedLanguage !== null &&
      selectedVideoType !== null &&
      (selectedVideoType === "Educational Videos" || selectedDisease !== null)
    );
  }, [selectedAvatar, selectedLanguage, selectedVideoType, selectedDisease]);

  const progressData = useMemo(() => {
    const steps = {
      avatar: selectedAvatar !== null,
      language: selectedLanguage !== null,
      videoType: selectedVideoType !== null,
      disease:
        selectedVideoType === "Educational Videos" || selectedDisease !== null,
    };
    const completed = Object.values(steps).filter(Boolean).length;
    const percentage = Math.round((completed / 4) * 100);
    return { steps, completed, percentage };
  }, [selectedAvatar, selectedLanguage, selectedVideoType, selectedDisease]);

  const handleLanguageSelect = useCallback(
    (lang: string) => {
      setSelectedLanguage((prev) => {
        const newValue = prev === lang ? null : lang;
        
        // Auto-scroll to video type section when language is selected
        if (newValue !== null) {
          scrollToSection(videoTypeSectionRef);
        }
        
        return newValue;
      });

      // Check if the currently selected video type is available for the new language
      if (selectedVideoType) {
        const typeConfig = videoTypeConfig.find(
          (vt) => vt.name === selectedVideoType
        );
        const availableForLang = typeConfig?.available[lang as keyof typeof typeConfig.available];
        
        if (!availableForLang || availableForLang.length === 0) {
          // Reset video type if it's not available for the selected language
          setSelectedVideoType(null);
          setSelectDisease([]);
          setSelectedDisease(null);
          return;
        }

        // Update disease list for the available video type
        setSelectDisease(availableForLang || []);
      } else {
        setSelectDisease([]);
      }
      setSelectedDisease(null);
    },
    [selectedVideoType, videoTypeConfig]
  );

  const handleVideoTypeSelect = useCallback(
    (name: string, child: string[]) => {
      setSelectedVideoType((prev) => {
        const newValue = prev === name ? null : name;
        
        // Auto-scroll to disease section when video type is selected (if not Educational Videos)
        if (newValue !== null && newValue !== "Educational Videos") {
          scrollToSection(diseaseSectionRef);
        }
        
        return newValue;
      });

      // Smart disease list based on selected language and video type availability
      if (selectedLanguage) {
        const typeConfig = videoTypeConfig.find((vt) => vt.name === name);
        if (
          typeConfig &&
          typeConfig.available[
            selectedLanguage as keyof typeof typeConfig.available
          ]
        ) {
          const availableForLang =
            typeConfig.available[
              selectedLanguage as keyof typeof typeConfig.available
            ];
          setSelectDisease(availableForLang || []);
        } else {
          // Fallback to English availability if language not available for this type
          const englishAvailable = typeConfig?.available.English || [];
          setSelectDisease(englishAvailable);
        }
      } else {
        // If no language selected, show all available for this type (English default)
        const typeConfig = videoTypeConfig.find((vt) => vt.name === name);
        setSelectDisease(typeConfig?.available.English || child);
      }
      setSelectedDisease(null);
    },
    [selectedLanguage, videoTypeConfig]
  );

  if (isInitialLoading) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={180} height={28} />
            </div>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <CircularProgress size={40} style={{ color: "#4ec48f" }} />
            <p className="text-sm text-gray-600 mt-4">
              Finalizing your video...
            </p>
          </div>
        </div>
      )}

      {showPersonalizedLoader && (
        <PersonalizedVideoLoader
          selectedAvatar={selectedAvatar}
          selectedLanguage={selectedLanguage}
          selectedVideoType={selectedVideoType}
          selectedDisease={selectedDisease}
          avatarArray={avatarArray}
          onComplete={handlePersonalizedLoaderComplete}
        />
      )}

      <div className={`${show ? "block" : "hidden"}`}>
        <GeneratedVideoUI setShow={setShow} video={video} />
      </div>

      <div
        className={`min-h-screen bg-gray-50 pt-20 ${show ? "hidden" : "block"}`}
      >
        {/* Minimal Custom Modal */}
        <Dialog
          open={openCustom}
          slots={{ transition: Transition }}
          keepMounted
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: "1rem",
            },
          }}
          onClose={() => {
            setCustomModal(false);
            setRequest(false);
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight="bold" // <-- This will reliably make it bold
              textAlign="center"
            >
              Design Your Own Video Story
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => {
                setCustomModal(false);
                setRequest(false);
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <X />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className={`${request ? "block" : "hidden"}`}>
              <HubspotForm id="get_a_quotes" />
            </div>
            <div className={`py-6 ${request ? "hidden" : "block"}`}>
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-[#4ec48f] mx-auto flex items-center justify-center rounded-full">
                  <FilmIcon className="text-white size-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">
                  Your Video, Your Way
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Create a completely custom video experience tailored to your
                  specific needs.
                </p>
                <button
                  onClick={() => setRequest(true)}
                  className="mt-6 bg-[#4ec48f] hover:bg-[#3db37f] text-white px-6 py-3 font-medium transition-colors rounded-xl cursor-pointer"
                >
                  Request Custom Video Demo
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-4 lg:p-5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {/* Enhanced Header */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Link
              href="/"
              className="p-1.5 sm:p-2 lg:p-2.5 bg-white/50 backdrop-blur-lg rounded-xl transition-all duration-200 group shadow-sm border border-gray-200"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1 lg:mb-1">
                Generate Video
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-sm leading-tight sm:leading-relaxed">
                Create personalized medical video content with AI-powered
                avatars
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-2 sm:px-3 lg:px-3 py-1 sm:py-1.5 lg:py-1.5 rounded-xl">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-blue-700 text-xs sm:text-sm font-medium">
                AI Powered
              </span>
            </div>
          </div>



          {/* Avatar Selection */}
          <div ref={avatarSectionRef} className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={1}
              title="Choose Your Avatar"
              isCompleted={selectedAvatar !== null}
              isActive={selectedAvatar === null}
            />

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {avatarArray.map((item, index) => (
                <SelectionCard
                  key={index}
                  isSelected={selectedAvatar === index}
                  disabled={loading || showPersonalizedLoader}
                  onClick={() => {
                    if (index !== 3) {
                      setSelectedAvatar((prev) => {
                        const newValue = prev === index ? null : index;
                        // Auto-scroll to language section when avatar is selected
                        if (newValue !== null) {
                          scrollToSection(languageSectionRef);
                        }
                        return newValue;
                      });
                    } else {
                      setCustomModal(true);
                    }
                  }}
                >
                  <div className="p-2 sm:p-3 lg:p-4 hover:from-blue-50 hover:to-white transition-all duration-200">
                    <div className="aspect-square relative bg-gray-100 mb-2 sm:mb-3 lg:mb-3 overflow-hidden rounded-lg shadow-sm">
                      {index === 3 ? (
                        // Custom avatar placeholder without image
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
                          <div className="text-center">
                            <svg
                              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-1 sm:mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <div className="text-xs font-medium text-purple-700">
                              Create a Custom Avatar
                            </div>
                          </div>
                          {selectedAvatar === index && (
                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Regular avatar with video or image
                        <>
                          {item.videoPath ? (
                            <video
                              className="w-full h-full object-cover"
                              src={item.videoPath}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <Image
                              src={item.path}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          )}
                          {selectedAvatar === index && (
                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">
                        {item.name}
                      </h3>
                      {/* <p className="text-xs text-gray-600 leading-tight">
                        {item.desc}
                      </p> */}
                    </div>
                  </div>
                </SelectionCard>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div ref={languageSectionRef} className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={2}
              title="Select Language"
              isCompleted={selectedLanguage !== null}
              isActive={selectedAvatar !== null && selectedLanguage === null}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {languages.map((lang) => {
                // Check availability for current video type
                const isAvailable = selectedVideoType
                  ? videoTypeConfig.find((vt) => vt.name === selectedVideoType)
                      ?.available[
                      lang.name as keyof (typeof videoTypeConfig)[0]["available"]
                    ]
                  : true;

                return (
                  <SelectionCard
                    key={lang.name}
                    isSelected={selectedLanguage === lang.name}
                    disabled={loading || showPersonalizedLoader || !isAvailable}
                    onClick={() => handleLanguageSelect(lang.name)}
                  >
                    <div
                      className={`p-2 sm:p-3 lg:p-4 transition-all duration-200 ${
                        !isAvailable ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
                        <div className="flex justify-center items-center gap-4">
                          <div className="text-lg sm:text-2xl lg:text-3xl">
                            {lang.flag}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">
                            {lang.name}
                          </h3>
                          {/* <p className="text-xs text-gray-600 leading-tight">
                            {!isAvailable && selectedVideoType
                              ? `Limited for ${selectedVideoType}`
                              : lang.desc}
                          </p> */}
                        </div>
                        {selectedLanguage === lang.name ? (
                          <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center shadow-sm">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        {!isAvailable && selectedVideoType && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-orange-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </SelectionCard>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCustomModal(true)}
                disabled={loading || showPersonalizedLoader}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-xs sm:text-sm text-gray-600 disabled:opacity-50 cursor-pointer"
              >
                <LanguagesIcon className="size-4" />
                <span>Need a custom language?</span>
              </button>
            </div>
          </div>

          {/* Video Type Selection */}
          <div ref={videoTypeSectionRef} className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={3}
              title="Select Video Type"
              isCompleted={selectedVideoType !== null}
              isActive={selectedLanguage !== null && selectedVideoType === null}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {videoType.map(({ name, child, icon, desc }) => (
                <SelectionCard
                  key={name}
                  isSelected={selectedVideoType === name}
                  disabled={loading || showPersonalizedLoader}
                  onClick={() => handleVideoTypeSelect(name, child)}
                >
                  <div className="p-2 sm:p-3 lg:p-4 transition-all duration-200 h-full">
                    <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 lg:space-y-3 h-full">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                        <Image
                          src={icon}
                          alt={name}
                          width={16}
                          height={16}
                          className="object-contain sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1 lg:mb-1">
                          {name}
                        </h3>
                        <p className="text-xs text-gray-600 leading-tight">
                          {desc}
                        </p>
                      </div>
                      {selectedVideoType === name && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                          <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </SelectionCard>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCustomModal(true)}
                disabled={loading || showPersonalizedLoader}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-xs sm:text-sm text-gray-600 disabled:opacity-50 cursor-pointer"
              >
                <FilmIcon className="size-4" />
                <span>Need another video type?</span>
              </button>
            </div>
          </div>

          {/* Disease Selection */}
          {diseaseList.length > 0 && (
            <div ref={diseaseSectionRef} className="bg-white/70 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
              <StepIndicator
                step={4}
                title="Select Category"
                isCompleted={
                  selectedDisease !== null ||
                  selectedVideoType === "Educational Videos"
                }
                isActive={
                  selectedVideoType !== null &&
                  selectedDisease === null &&
                  selectedVideoType !== "Educational Videos"
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-3">
                {diseaseList.map((disease) => (
                  <SelectionCard
                    key={disease}
                    isSelected={selectedDisease === disease}
                    disabled={loading || showPersonalizedLoader}
                    onClick={() =>
                      setSelectedDisease((prev) =>
                        prev === disease ? null : disease
                      )
                    }
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 text-xs sm:text-sm">
                          {disease}
                        </h3>
                        {selectedDisease === disease ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#4ec48f] rounded flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-foreground/20 rounded flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </SelectionCard>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Generate Button */}
          <div className="flex justify-center pt-4">
            {isFormValid ? (
              <div className="text-center w-full sm:w-fit flex flex-col justify-center items-center">
                <button
                  onClick={generateVideo}
                  disabled={loading || showPersonalizedLoader}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 sm:gap-4 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none cursor-pointer"
                >
                  {showPersonalizedLoader ? (
                    <>
                      <CircularProgress
                        size={20}
                        style={{ color: "white" }}
                        className="sm:w-6 sm:h-6"
                      />
                      <span className="text-sm sm:text-base">
                        Creating Your Video...
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l7-5-7-5z" />
                      </svg>
                      <span className="text-sm sm:text-base">
                        Generate Video
                      </span>
                      <ChevronRightIcon className="size-5" />
                    </>
                  )}
                </button>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                  Your personalized video will be ready in 30-60 seconds
                </p>
              </div>
            ) : (
              <Tooltip title="Please complete all required selections to generate your video">
                <div className="text-center w-full sm:w-fit flex flex-col justify-center items-center">
                  <button
                    disabled
                    className="w-full sm:w-auto bg-gray-300 text-gray-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl cursor-not-allowed flex items-center justify-center gap-3 sm:gap-4"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm sm:text-base">
                      Complete Selection
                    </span>
                    <ChevronRightIcon className="size-5" />
                  </button>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                    Please select avatar, language, video type, and category
                  </p>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Enhanced Tips Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 sm:p-3 md:p-4 lg:p-4 border border-blue-100">
            <div className="flex items-start gap-2 sm:gap-3 lg:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                  Quick Tips
                </h4>
                <ul className="space-y-0.5 sm:space-y-1 text-xs text-blue-800 leading-tight">
                  <li>• Demo Video generation may take 10-20 seconds.</li>
                  <li>• Only English/French/Spanish enabled with limited content for demo purposes.</li>
                  <li>• For custom avatar, language and/or another custom video type, &ldquo;Schedule a Demo&rdquo;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
