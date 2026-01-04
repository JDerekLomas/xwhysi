"use client";

import { useState, useCallback, useEffect } from "react";
import { initiateVideoGeneration, pollVideoGeneration } from "./muleRouterClient";

export interface VideoState {
  url?: string;
  status: "idle" | "pending" | "processing" | "completed" | "error";
  error?: string;
  taskId?: string;
  progress?: number;
}

export function useVideoGeneration(
  prompt: string,
  autoStart: boolean = true
) {
  const [state, setState] = useState<VideoState>({
    status: "idle",
  });

  const generate = useCallback(async () => {
    setState({
      status: "pending",
    });

    try {
      // Initiate video generation
      const taskId = await initiateVideoGeneration(prompt);

      setState((prev) => ({
        ...prev,
        status: "processing",
        taskId,
      }));

      // Poll for completion
      const videoUrl = await pollVideoGeneration(taskId);

      setState({
        status: "completed",
        url: videoUrl,
        taskId,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      setState({
        status: "error",
        error: errorMessage,
      });
    }
  }, [prompt]);

  // Auto-start generation if enabled
  useEffect(() => {
    if (autoStart && state.status === "idle") {
      generate();
    }
  }, [autoStart, state.status, generate]);

  const retry = useCallback(() => {
    generate();
  }, [generate]);

  return {
    ...state,
    generate,
    retry,
  };
}
