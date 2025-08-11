"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Upload, 
  Video, 
  Mic, 
  Camera, 
  ArrowLeft, 
  Play, 
  Pause, 
  Square,
  Check,
  X,
  AlertCircle
} from "lucide-react";

export const CreateAvatarUI = () => {
  const [step, setStep] = useState<'upload' | 'record'>('upload');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const script = [
    "Hello, I'm excited to be your new AI avatar.",
    "I can help you create personalized medical content.",
    "Let me demonstrate my speaking capabilities.",
    "I can explain complex medical concepts clearly.",
    "Thank you for choosing me as your avatar."
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    // Handle avatar creation submission
    console.log('Creating avatar with video:', uploadedVideo || recordedVideo);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/generate-videos"
            className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200 group shadow-sm border border-gray-200"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Custom Avatar</h1>
            <p className="text-gray-600">Upload or record a video to create your personalized avatar</p>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setStep('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              step === 'upload' 
                ? 'bg-[#4ec48f] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Upload size={20} />
            Upload Video
          </button>
          <button
            onClick={() => setStep('record')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              step === 'record' 
                ? 'bg-[#4ec48f] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Video size={20} />
            Record Video
          </button>
        </div>

        {/* Upload Video Step */}
        {step === 'upload' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4ec48f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Video</h2>
              <p className="text-gray-600">Upload a video file to create your custom avatar</p>
            </div>

            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Click to upload video
                  </p>
                  <p className="text-gray-500">MP4, WebM, or MOV files up to 100MB</p>
                </label>
              </div>

              {/* Uploaded Video Preview */}
              {uploadedVideo && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Uploaded Video</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Video size={24} className="text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{uploadedVideo.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedVideo.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setUploadedVideo(null)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Record Video Step */}
        {step === 'record' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4ec48f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Video size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Record Your Video</h2>
              <p className="text-gray-600">Record a video using your camera and microphone</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Camera Preview */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Camera Preview</h3>
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  {!isRecording && !recordedVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Camera size={48} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-400">Camera preview will appear here</p>
                      </div>
                    </div>
                  )}
                  {isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Recording...
                      </div>
                    </div>
                  )}
                  {recordedVideo && (
                    <video
                      ref={videoRef}
                      src={recordedVideo}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleVideoTimeUpdate}
                      onLoadedMetadata={handleVideoTimeUpdate}
                    />
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center gap-4">
                  {!isRecording && !recordedVideo && (
                    <button
                      onClick={startRecording}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Video size={20} />
                      Start Recording
                    </button>
                  )}
                  {isRecording && (
                    <button
                      onClick={stopRecording}
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Square size={20} />
                      Stop Recording
                    </button>
                  )}
                  {recordedVideo && (
                    <button
                      onClick={togglePlayPause}
                      className="flex items-center gap-2 bg-[#4ec48f] hover:bg-[#3db37f] text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  )}
                </div>

                {/* Video Progress */}
                {recordedVideo && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#4ec48f] h-2 rounded-full transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Script */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Recording Script</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle size={16} />
                    <span>Follow this script for best results</span>
                  </div>
                  <div className="space-y-3">
                    {script.map((line, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#4ec48f] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Sources */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Device Sources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Camera size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Camera</p>
                        <p className="text-sm text-gray-600">HD Webcam (Connected)</p>
                      </div>
                      <Check size={20} className="text-green-600 ml-auto" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Mic size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Microphone</p>
                        <p className="text-sm text-gray-600">Built-in Microphone (Connected)</p>
                      </div>
                      <Check size={20} className="text-green-600 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {(uploadedVideo || recordedVideo) && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#4ec48f] hover:bg-[#3db37f] text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Check size={20} />
              Create Avatar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 