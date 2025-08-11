"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Catalogue = () => {
  const videoArray = [
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "PCOD",
      tumbnail: "/Asian_Female_thumbnail.webp",
      video: "/videos/demo_video3.mp4",
      language: "French",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Teratozoospermia",
      tumbnail: "/US_Female_thumbnail.webp",
      video: "/videos/demo_video.mp4",
      language: "Spanish",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "PCOD",
      tumbnail: "/Asian_Female_thumbnail.webp",
      video: "/videos/demo_video3.mp4",
      language: "French",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Teratozoospermia",
      tumbnail: "/US_Female_thumbnail.webp",
      video: "/videos/demo_video.mp4",
      language: "Spanish",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "PCOD",
      tumbnail: "/Asian_Female_thumbnail.webp",
      video: "/videos/demo_video3.mp4",
      language: "French",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/US_Female_thumbnail.webp",
      video: "/videos/demo_video.mp4",
      language: "Spanish",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Teratozoospermia",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Teratozoospermia",
      tumbnail: "/Asian_Female_thumbnail.webp",
      video: "/videos/demo_video3.mp4",
      language: "French",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/US_Female_thumbnail.webp",
      video: "/videos/demo_video.mp4",
      language: "Spanish",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "PCOD",
      tumbnail: "/Asian_Female_thumbnail.webp",
      video: "/videos/demo_video3.mp4",
      language: "French",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "PCOD",
      tumbnail: "/US_Female_thumbnail.webp",
      video: "/videos/demo_video.mp4",
      language: "Spanish",
    },
    {
      videoType: "Disease Explainer",
      diseaseType: "Tubal Block",
      tumbnail: "/British_Male_thumbnail.webp",
      video: "/videos/eshre_demo2.mp4",
      language: "English",
    },
  ];
  const [selectedVideo, setSelectedVideo] = useState({
    video: videoArray[0]?.video || "",
    index: 0,
    data: { ...videoArray[0] },
  });
  const [videoList, setVideoList] = useState(videoArray.slice(0, 8));
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="bg-[#EEF2FE] p-4 md:p-6 relative z-50">
        <div className="flex gap-1  md:mb-10 mb-14">
          <div className="mt-1.5">
            <Link href="/" className="cursor-pointer md:block hidden">
              <Image
                src="/back_arrow_desktop.png"
                width={25}
                height={25}
                alt="back-button"
              />
            </Link>
            <Link href="/" className="cursor-pointer md:hidden block">
              <Image
                src="/back_arrow_desktop.png"
                width={18}
                height={18}
                alt="back-button"
              />
            </Link>
          </div>
          <div className="lg:text-[24px] text-[18px]  sm:text-[20px] font-bold  fbg text-left">
            AI Video Library
          </div>
        </div>
        {/* Generate Button on top-right of the main image */}
        <div className="">
          <div className="md:block  hidden absolute md:top-[2rem] md:right-5 top-[.8rem] right-[.5rem]  height-30">
            <Link href="/try">
              <span className="underline inline-flex cursor-pointer gap-3 text-[#4ec48f] text-[16px] font-medium px-3 py-1 justify-center rounded-[8px]  hover:opacity-90">
                Generate AI Video
              </span>
            </Link>
          </div>
        </div>

        {/* Main video with Generate Button */}
        <div className="relative rounded-lg overflow-hidden shadow-md mb-3">
          <video
            className="w-full md:h-[515px] h-44"
            src={selectedVideo?.video}
            controls
          ></video>
          {/* <img src="/Group.png" className="md:h-[515px] h-44 w-full" /> */}
        </div>

        <div className="text-left mb-8 relative">
          <div className="flex gap-2">
                          <p className="text-[13px] md:text-[14px] font-bold text-[#4ec48f]">
              {selectedVideo?.data?.videoType || "Disease Explainer"}
            </p>
            <p className="text-[13px] md:text-[14px] font-bold text-[#747474]">
              |&nbsp; {selectedVideo?.data?.diseaseType || "Tubal Block"}
            </p>
          </div>
          <p className="text-[13px] md:text-[14px] font-medium text-[#747474]">
            {selectedVideo?.data?.language || "English"}
          </p>

          {/* <div className=" absolute right-0 -top-1 mb-2">
                   <Image
                     src="/download_button.png"
                     alt="Download"
                     width={25}
                     height={25}
                     className="hover:opacity-80 cursor-pointer md:block hidden"
                   />
                   <Image
                     src="/download_button.png"
                     alt="Download"
                     width={22}
                     height={22}
                     className="hover:opacity-80 cursor-pointer md:hidden block"
                   />
                 </div> */}

          {/* <div className="absolute right-0 -top-1 mb-2">

            <a
              href={selectedVideo.video}
              download={`video_${selectedVideo.index + 1}.mp4`}
            >
              <Image
                src="/download_button.png"
                alt="Download"
                width={32}
                height={32}
                className="hover:opacity-80  cursor-pointer md:block hidden"
              />
            </a>
            <a
              href={selectedVideo.video}
              download={`video_${selectedVideo.index + 1}.mp4`}
            >
              <Image
                src="/download_button.png"
                alt="Download"
                width={22}
                height={22}
                className="hover:opacity-80 cursor-pointer md:hidden block"
              />
            </a>
          </div> */}
        </div>

        {/* Thumbnail grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 relative mb-10 md:px-4">
          {videoList.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedVideo({ video: item?.video, index: i, data: item });
              }}
              className={`${
                selectedVideo?.index === i
                  ? "shadow-md md:p-2 p-1 border-2 rounded-lg border-[#4ec48f] cursor-pointer"
                  : "cursor-pointer"
              }`}
            >
              <div className="rounded-lg overflow-hidden shadow relative">
                {/* <video
                  className="w-full h-auto"
                  src="/videos/thumb.mp4"
                  controls
                ></video> */}
                <Image
                  src={item?.tumbnail}
                  alt={`${item?.videoType} - ${item?.diseaseType} thumbnail`}
                  width={300}
                  height={200}
                  className="object-contain w-full "
                />
                <div
                  style={{
                    background: "url(/play_button.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "10% 15%",
                    backgroundColor: "#00000080",
                    backgroundPosition: "center",
                  }}
                  className=" absolute  top-0 left-0  right-0 bottom-0"
                ></div>
              </div>
              <div className="text-left mt-2 ml-1">
                <div className="md:flex block gap-2">
                  <p className="text-[13px] font-bold text-[#2C2C2C]">
                    {item.videoType}
                  </p>
                  <p className="text-[13px] font-bold flex text-[#747474]">
                    <span className="md:block hidden">|&nbsp;</span>
                    {item.diseaseType}
                  </p>
                </div>
                <p className="text-[11px] font-medium text-[#747474]">
                  {item.language}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center ">
          <button
            onClick={() => {
              setShow(!show);
              if (show) {
                setVideoList(videoArray.slice(0, 8));
              } else {
                setVideoList([
                  ...videoList,
                  ...videoArray.slice(8, videoArray.length - 4),
                ]);
              }
            }}
            className="inline-flex gap-3 text-white text-[14px] font-medium cursor-pointer px-4 py-2 justify-center rounded-[8px] shadow hover:opacity-90"
          >
            {show ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </>
  );
};
