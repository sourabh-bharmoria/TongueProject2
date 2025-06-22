"use client";
import React from "react";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

interface LoadingState {
  text: string;
}

interface LoaderButtonProps {
  loadingStates?: LoadingState[];
  loading?: boolean;
  duration?: number;
  onComplete?: () => void;
  onCancel?: () => void;
  buttonText?: string;
  buttonClass?: string;
  loaderClass?: string;
  buttonIcon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode; // ✅ Added support for custom button text via children
}

export function LoaderButton({
  loadingStates = [
    { text: "Analyzing tongue color" },
    { text: "Checking coating thickness" },
    { text: "Mapping texture patterns" },
    { text: "Assessing shape features" },
    { text: "Comparing with health database" },
    { text: "Generating diagnostic report" },
  ],
  loading = false,
  duration = 2000,
  onComplete,
  onCancel,
  buttonText = "Analyze",
  buttonClass = "bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center",
  loaderClass = "w-full flex items-center justify-center",
  buttonIcon,
  onClick,
  children, // ✅ Used to optionally override buttonText
}: LoaderButtonProps) {
  const handleComplete = () => {
    onComplete?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <div className={loaderClass}>
      {/* Loader animation */}
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        duration={duration}
        loop={true}
      />

      {/* Trigger button */}
      <button
        onClick={() => onClick?.()}
        className={buttonClass}
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
        {children ?? buttonText}
      </button>

      {/* Cancel button during loading */}
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={handleCancel}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
