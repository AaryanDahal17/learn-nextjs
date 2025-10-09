"use client";
import { useEffect, useState } from "react";

export default function TaskStatus() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("idle");

  // Start the task when the component mounts
  useEffect(() => {
    const startTask = async () => {
      try {
        // POST request to start the task
        const res = await fetch("http://localhost:8000/start-task?task_id=12345", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        //   body: JSON.stringify({ task_id: "12345" }), // Example task ID
        });

        const data = await res.json();
        setTaskId(data.task_id);  // Save returned task ID
        setStatus(data.status);   // e.g., "started"
      } catch (err) {
        console.error("Error starting task:", err);
        setStatus("error");
      }
    };

    startTask();
  }, []);

  // Open SSE connection once taskId is set
  useEffect(() => {
    if (!taskId) return;

    const evtSource = new EventSource(`http://localhost:8000/events/${taskId}`);

    evtSource.onmessage = (e) => {
      setStatus(e.data);
      if (e.data === "completed" || e.data === "not_found") {
        evtSource.close();  // Close connection when done
      }
    };

    evtSource.onerror = (e) => {
      console.error("SSE error:", e);
      evtSource.close();
    };

    return () => evtSource.close();  // Clean up on unmount
  }, [taskId]);

  return <div>Task Status: {status}</div>;
}
