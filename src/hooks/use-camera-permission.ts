import { useCallback, useState } from "react";

export type CameraPermission = "idle" | "requesting" | "granted" | "denied" | "unavailable";

export function useCameraPermission() {
  const [permission, setPermission] = useState<CameraPermission>("idle");

  const requestCameraPermission = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission("unavailable");
      return;
    }
    setPermission("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      stream.getTracks().forEach((track) => track.stop());
      setPermission("granted");
    } catch (err) {
      if (err instanceof DOMException && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
        setPermission("denied");
      } else {
        setPermission("unavailable");
      }
    }
  }, []);

  return { permission, requestCameraPermission };
}
