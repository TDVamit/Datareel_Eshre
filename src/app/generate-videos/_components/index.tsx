"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useMemo, useEffect } from "react";
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
      // Adjust duration to complete in 10 seconds total
      const adjustedDuration = 10000 / generationSteps.length; // 10 seconds divided by number of steps
      const progressIncrement = 100 / (adjustedDuration / 50);

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
      }, adjustedDuration);
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
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Video Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-lg">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
                Video Preview
              </h2>
              
              {/* Avatar Preview */}
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  src={`/Assets/${avatarArray[selectedAvatar || 0]?.name}/${avatarArray[selectedAvatar || 0]?.name}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
                  {avatarArray[selectedAvatar || 0]?.name}
                </div>
              </div>

              {/* Template Info */}
              <div className="mt-6 p-5 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {selectedDisease || selectedVideoType}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedLanguage} • {selectedVideoType}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Progress */}
          <div className="flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Creating Your Personalized Video
            </h2>
              <p className="text-base text-gray-600">
              Generating custom content for {selectedLanguage}{" "}
              {selectedVideoType?.toLowerCase()}
              {selectedDisease && ` about ${selectedDisease}`}
            </p>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-medium text-gray-700">
                  Overall Progress
                </span>
                <span className="text-base font-semibold text-[#4ec48f]">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#4ec48f] to-[#3db37e] h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
          </div>
        </div>

            {/* Current Step */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {currentStepData?.title}
              </h3>
                <p className="text-base text-gray-600">
                {currentStepData?.description}
              </p>
              </div>

              {/* Step Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Step {currentStep + 1} of {generationSteps.length}
                  </span>
                  <span className="text-sm font-semibold text-[#4ec48f]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#4ec48f] h-2 rounded-full transition-all duration-50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Notification Message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl px-8 py-6">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-base font-medium text-blue-900">
                Video will be generated soon
              </p>
              <p className="text-sm text-blue-700">
                We'll notify you via email when your personalized video is ready
              </p>
            </div>
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
    "Investment Basics": "Stimulation", // Map to existing Stimulation video
    "Financial Planning": "Stimulation", // Map to existing Stimulation video
    "Tax Strategies": "Stimulation", // Map to existing Stimulation video
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
  {
    id: 4,
    name: "Custom Avatar",
    path: "custom",
    videoPath: null,
    desc: "Create your own",
    folderName: "custom",
    available: false,
  },
];

// Script generation for templates
const generateTemplateScript = (template: string): string => {
  const scripts = {
    "Investment Basics": "Welcome to Investment Basics! Today we'll explore the fundamental principles of investing. We'll cover key concepts like diversification, risk management, and compound interest. Understanding these basics is crucial for building a solid financial foundation. Whether you're just starting your investment journey or looking to refresh your knowledge, this guide will help you make informed decisions about your financial future.",
    "Financial Planning": "Financial planning is the roadmap to your financial success. In this comprehensive guide, we'll walk through creating a budget, setting financial goals, building emergency funds, and planning for retirement. A well-crafted financial plan considers your current situation, future aspirations, and helps you navigate life's financial challenges with confidence and clarity.",
    "Tax Strategies": "Tax strategies can significantly impact your financial outcomes. We'll explore legal ways to optimize your tax situation, including understanding deductions, credits, and tax-advantaged accounts. From maximizing retirement contributions to strategic timing of income and expenses, these strategies can help you keep more of your hard-earned money while staying compliant with tax laws."
  };
  
  return scripts[template as keyof typeof scripts] || "Template script not available.";
};

// Final Preview Screen Component
const FinalPreviewScreen = ({
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
  const [copied, setCopied] = useState<string | null>(null);
  const videoUrl = `/Assets/${avatarArray[selectedAvatar || 0]?.name}/${avatarArray[selectedAvatar || 0]?.name}.mp4`;
  const embedCode = `<iframe src="${videoUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
  const shareUrl = `${window.location.origin}/generated-videos`;

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Check out my personalized video: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = 'My Personalized Video';
    const body = `I created a personalized video using our platform. Check it out: ${shareUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Video Player */}
          <div className="space-y-6">
            {/* Success Header */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Video Generated Successfully!
                  </h1>
                  <p className="text-gray-600">Your personalized video is ready</p>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full"
                src={videoUrl}
                controls
                autoPlay
                muted
                playsInline
                poster="/play_button.png"
              />
            </div>

            {/* Video Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                Video Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avatar:</span>
                  <span className="font-medium">{avatarArray[selectedAvatar || 0]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{selectedLanguage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedVideoType}</span>
                </div>
                {selectedDisease && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-medium">{selectedDisease}</span>
                  </div>
                )}
              </div>
            </div>


          </div>

          {/* Right Side - Share Options */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Share Your Video
                  </h2>
                  <p className="text-gray-600">Spread the word about your creation</p>
                </div>
              </div>
            </div>

            {/* Share Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Share */}
              <button
                onClick={handleWhatsAppShare}
                className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-sm">WhatsApp</span>
                </div>
              </button>

              {/* Email Share */}
              <button
                onClick={handleEmailShare}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Email</span>
                </div>
              </button>

              {/* Copy Link */}
              <button
                onClick={() => handleCopy(shareUrl, 'link')}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-sm">{copied === 'link' ? 'Copied!' : 'Copy Link'}</span>
                </div>
              </button>

              {/* Copy Embed Code */}
              <button
                onClick={() => handleCopy(embedCode, 'embed')}
                className="group relative overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-sm">{copied === 'embed' ? 'Copied!' : 'Embed Code'}</span>
                </div>
              </button>
            </div>

            {/* Embed Code Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Embed Code</h3>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <code className="text-xs text-gray-700 break-all font-mono bg-gray-50 px-3 py-2 rounded-lg block">
                  {embedCode}
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Copy this code to embed the video on your website
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Template Modal Component
const CustomTemplateModal = ({
  open,
  onClose,
  onSave,
  templateName,
  script,
  onTemplateNameChange,
  onScriptChange,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  templateName: string;
  script: string;
  onTemplateNameChange: (name: string) => void;
  onScriptChange: (script: string) => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Create Custom Template
            </h2>
            <p className="text-sm text-gray-600">
              Enter your custom template name and script for personalized video generation.
            </p>
          </div>

          {/* Template Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Template Name *
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => onTemplateNameChange(e.target.value)}
              placeholder="e.g., Retirement Planning, Estate Planning"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ec48f] focus:border-[#4ec48f] outline-none transition-colors"
            />
          </div>

          {/* Script Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Custom Script *
            </label>
            <textarea
              value={script}
              onChange={(e) => onScriptChange(e.target.value)}
              placeholder="Enter your custom script here. This will be the content that your selected avatar will speak in the generated video."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ec48f] focus:border-[#4ec48f] outline-none transition-colors resize-none"
            />
            <p className="text-xs text-gray-500">
              Write a natural, conversational script that your avatar will deliver.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!templateName.trim() || !script.trim()}
              className="flex-1 px-4 py-2 bg-[#4ec48f] text-white rounded-lg hover:bg-[#3db37e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Template
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Enhanced Video Type Configuration
const createVideoTypeConfig = () => [
  {
    name: "Educational Videos",
    folderName: "Educational",
    child: ["Investment Basics", "Financial Planning", "Tax Strategies"],
    icon: "/embryo.svg",
    desc: "Teach financial procedures and strategies",
    available: {
      English: ["Investment Basics", "Financial Planning", "Tax Strategies"],
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
  const [showFinalPreview, setShowFinalPreview] = useState(false);
  const [video, setVideo] = useState<{
    video_url: string;
    videoType?: string;
    diseaseType?: string;
    language?: string;
  }>({ video_url: "" });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Custom template state
  const [showCustomTemplateModal, setShowCustomTemplateModal] = useState(false);
  const [customTemplateName, setCustomTemplateName] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [isCustomTemplate, setIsCustomTemplate] = useState(false);

  // Detect if user is signed in and force re-render when auth changes
  const [authTrigger, setAuthTrigger] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        setAuthTrigger(prev => prev + 1); // Force re-render
        setAuthChecked(true); // Mark that auth has been checked
      }
    };

    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (when user logs out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkAuthStatus();
      }
    };

    // Listen for custom logout event
    const handleLogout = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  // Get avatars to show - only include custom avatar if signed in
  const avatarsToShow = useMemo(() => {
    const baseAvatars = createAvatarArray().slice(0, 3); // Always show first 3 avatars
    const hasUser = typeof window !== 'undefined' && !!localStorage.getItem('user');
    
    if (hasUser) {
      // Add custom avatar only if signed in
      const customAvatar = createAvatarArray()[3]; // Get the custom avatar
      return [...baseAvatars, customAvatar];
    }
    
    return baseAvatars; // Only show first 3 avatars if not signed in
  }, [authTrigger, renderCount, authChecked]);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Only re-render when auth changes, not on every render
  useEffect(() => {
    const checkAuth = () => {
      const hasUser = typeof window !== 'undefined' && !!localStorage.getItem('user');
      setRenderCount(prev => prev + 1);
    };
    
    // Check on mount
    checkAuth();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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

  // Custom template handlers
  const handleCreateCustomTemplate = () => {
    setShowCustomTemplateModal(true);
  };

  const handleSaveCustomTemplate = () => {
    if (customTemplateName.trim() && customScript.trim()) {
      setIsCustomTemplate(true);
      setSelectedDisease(customTemplateName);
      setShowCustomTemplateModal(false);
    }
  };

  const handleCloseCustomTemplateModal = () => {
    setShowCustomTemplateModal(false);
    setCustomTemplateName("");
    setCustomScript("");
  };

  const handleFinalPreviewComplete = useCallback(async () => {
    setShowFinalPreview(false);
    setLoading(true);

    // Get selected avatar info
    const selectedAvatarInfo = avatarsToShow[selectedAvatar || 0];

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

      if (result?.success) {
        // Enhanced video data with metadata
        const videoData = {
          ...result,
          video_url: result.video_url || videoPath,
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
      } else {
        await Swal.fire({
          icon: "error",
          title: "Video Not Available",
          text: result?.message || "Currently, the video is not available. Please try again later or select a different option.",
          confirmButtonColor: "#4ec48f",
        });
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
    avatarsToShow,
  ]);

  const generateVideo = useCallback(async () => {
    // Show personalized loader first
    setShowPersonalizedLoader(true);
  }, []);

  const handlePersonalizedLoaderComplete = useCallback(async () => {
    setShowPersonalizedLoader(false);
    // Skip the intermediate preview page and go directly to the final video page
    handleFinalPreviewComplete();
  }, [handleFinalPreviewComplete]);

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
      setSelectedLanguage((prev) => (prev === lang ? null : lang));

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
      setSelectedVideoType((prev) => (prev === name ? null : name));

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
          <div className="max-w-4xl mx-auto p-6 space-y-6">
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
          avatarArray={avatarsToShow}
          onComplete={handlePersonalizedLoaderComplete}
        />
      )}

      <div className={`${show ? "block" : "hidden"}`}>
        <GeneratedVideoUI setShow={setShow} video={video} />
      </div>

      <div
        className={`min-h-screen bg-gray-50 pt-24 ${show ? "hidden" : "block"}`}
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
                setRequest(false);
                setCustomModal(false);
                
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
              <HubspotForm id="get_a_quote" />
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

        <div className="max-w-6xl mx-auto p-2 sm:p-3 md:p-4 lg:p-5 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          {/* Enhanced Header */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Link
              href="/"
              className="p-1.5 sm:p-2 lg:p-2.5 hover:bg-white/80 rounded-xl transition-all duration-200 group shadow-sm border border-gray-200"
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={1}
              title="Choose Your Avatar"
              isCompleted={selectedAvatar !== null}
              isActive={selectedAvatar === null}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {avatarsToShow.map((item, index) => (
                <SelectionCard
                  key={index}
                  isSelected={selectedAvatar === index}
                  disabled={loading || showPersonalizedLoader}
                  onClick={() => {
                    if (item.name !== "Custom Avatar") {
                      setSelectedAvatar((prev) => prev === index ? null : index);
                    } else {
                      window.location.href = "/create-avatar";
                    }
                  }}
                >
                  <div className="p-2 sm:p-3 lg:p-4 hover:from-blue-50 hover:to-white transition-all duration-200">
                    <div className="aspect-square relative bg-gray-100 mb-2 sm:mb-3 lg:mb-3 overflow-hidden rounded-lg shadow-sm">
                      {item.name === "Custom Avatar" ? (
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
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </SelectionCard>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={2}
              title="Select Language"
              isCompleted={selectedLanguage !== null}
              isActive={selectedAvatar !== null && selectedLanguage === null}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <div className="text-lg sm:text-2xl lg:text-3xl">
                          {lang.flag}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base mb-0.5 sm:mb-1">
                            {lang.name}
                          </h3>
                          <p className="text-xs text-gray-600 leading-tight">
                            {!isAvailable && selectedVideoType
                              ? `Limited for ${selectedVideoType}`
                              : lang.desc}
                          </p>
                        </div>
                        {selectedLanguage === lang.name && (
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 lg:p-5">
            <StepIndicator
              step={3}
              title="Select Video Type"
              isCompleted={selectedVideoType !== null}
              isActive={selectedLanguage !== null && selectedVideoType === null}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
          </div>

          {/* Template Selection */}
          {diseaseList.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 lg:p-5">
              <StepIndicator
                step={4}
                title="Select Template"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Custom Template Option */}
                  <SelectionCard
                  isSelected={isCustomTemplate}
                    disabled={loading || showPersonalizedLoader}
                  onClick={handleCreateCustomTemplate}
                >
                  <div className="p-4 space-y-4 h-full flex flex-col">
                    {/* Template Title */}
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                        Create Custom Template
                      </h3>
                    </div>

                    {/* Content Area - Fixed Height */}
                    <div className="flex-1 min-h-[200px]">
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-xs">Click to create custom template</p>
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className="flex justify-center">
                      {isCustomTemplate ? (
                        <div className="w-6 h-6 bg-[#4ec48f] rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
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
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-400"
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

                {/* Regular Templates */}
                {diseaseList.map((template) => {
                  const isSelected = selectedDisease === template && !isCustomTemplate;
                  const script = generateTemplateScript(template);
                  
                  return (
                    <SelectionCard
                      key={template}
                      isSelected={isSelected}
                      disabled={loading || showPersonalizedLoader}
                      onClick={() => {
                        setIsCustomTemplate(false);
                      setSelectedDisease((prev) =>
                          prev === template ? null : template
                        );
                      }}
                    >
                                          <div className="p-4 space-y-4 h-full flex flex-col">
                      {/* Template Title */}
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                          {template}
                        </h3>
                      </div>

                                              {/* Content Area - Fixed Height */}
                        <div className="flex-1 min-h-[200px]">
                          {isSelected ? (
                            <div className="space-y-3 h-full">
                              {/* Avatar Video */}
                              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative mx-auto max-w-xs">
                                <video
                                  className="w-full h-full object-cover"
                                  src={`/Assets/${avatarsToShow[selectedAvatar || 0]?.name}/${avatarsToShow[selectedAvatar || 0]?.name}.mp4`}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                />
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {avatarsToShow[selectedAvatar || 0]?.name}
                                </div>
                              </div>

                              {/* Script Preview */}
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h4 className="font-medium text-gray-900 text-xs mb-2">
                                  Script Preview:
                                </h4>
                                <p className="text-xs text-gray-700 leading-relaxed">
                                  {isCustomTemplate ? customScript : script}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <div className="text-center text-gray-400">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs">Click to preview</p>
                              </div>
                            </div>
                          )}
                        </div>

                      {/* Selection Indicator */}
                      <div className="flex justify-center">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-[#4ec48f] rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
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
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-400"
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
                  );
                })}
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
                  <li>• Video generation takes 30-60 seconds</li>
                  <li>• French/Spanish have limited content</li>
                  <li>• Educational videos skip disease selection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Template Modal */}
      <CustomTemplateModal
        open={showCustomTemplateModal}
        onClose={handleCloseCustomTemplateModal}
        onSave={handleSaveCustomTemplate}
        templateName={customTemplateName}
        script={customScript}
        onTemplateNameChange={setCustomTemplateName}
        onScriptChange={setCustomScript}
      />

      {/* Final Preview Screen */}
      {showFinalPreview && (
        <FinalPreviewScreen
          selectedAvatar={selectedAvatar}
          selectedLanguage={selectedLanguage}
          selectedVideoType={selectedVideoType}
          selectedDisease={selectedDisease}
          avatarArray={avatarArray}
          onComplete={handleFinalPreviewComplete}
        />
      )}
    </>
  );
};
