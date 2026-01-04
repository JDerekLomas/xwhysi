const API_KEY = "sk-mr-9b9248ed2a6f82314530131862795d69b93f15ba1df54a18fcafeaabe6a69726";
const API_BASE = "https://api.mulerouter.ai";

export interface VideoGenerationResponse {
  task_info?: {
    id: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  task_id?: string;
  id?: string;
  error?: string;
}

export interface StatusCheckResponse {
  task_info: {
    id: string;
    status: "pending" | "processing" | "completed" | "failed";
    created_at: string;
    updated_at: string;
  };
  videos?: string[];
  error?: string;
}

export async function initiateVideoGeneration(
  prompt: string
): Promise<string> {
  const response = await fetch(
    `${API_BASE}/vendors/alibaba/v1/wan2/video/generation`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "wan2.6-t2v",
        duration: 5,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to initiate video generation: ${response.statusText}`
    );
  }

  const data: VideoGenerationResponse = await response.json();
  const taskId = data.task_info?.id || data.task_id || data.id;

  if (!taskId) {
    throw new Error("No task ID returned from API");
  }

  return taskId;
}

export async function checkVideoStatus(taskId: string): Promise<StatusCheckResponse> {
  const response = await fetch(
    `${API_BASE}/vendors/alibaba/v1/wan2/video/generation/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to check video status: ${response.statusText}`);
  }

  return response.json();
}

export async function pollVideoGeneration(
  taskId: string,
  maxAttempts: number = 180,
  initialDelayMs: number = 3000,
  intervalMs: number = 5000
): Promise<string> {
  let attempts = 0;
  let delay = initialDelayMs;

  // Wait before first check
  await new Promise((resolve) => setTimeout(resolve, delay));

  return new Promise((resolve, reject) => {
    const pollInterval = setInterval(async () => {
      attempts++;

      try {
        const status = await checkVideoStatus(taskId);

        if (status.task_info.status === "completed") {
          clearInterval(pollInterval);
          const videoUrl = status.videos?.[0];
          if (!videoUrl) {
            reject(new Error("No video URL in response"));
            return;
          }
          resolve(videoUrl);
        } else if (status.task_info.status === "failed") {
          clearInterval(pollInterval);
          reject(new Error(`Video generation failed for task ${taskId}`));
        } else if (attempts >= maxAttempts) {
          clearInterval(pollInterval);
          reject(
            new Error(
              `Video generation timeout after ${maxAttempts} attempts (${Math.round((maxAttempts * intervalMs) / 1000)}s)`
            )
          );
        }
      } catch (error) {
        clearInterval(pollInterval);
        reject(error);
      }
    }, intervalMs);
  });
}
