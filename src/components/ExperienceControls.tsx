"use client";

import { useEffect, useRef, useState } from "react";
import { ScanEye, Volume2, VolumeX } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function ExperienceControls({ locale }: { locale: Locale }) {
  const [xray, setXray] = useState(false);
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const es = locale === "es";

  useEffect(() => {
    document.documentElement.classList.toggle("xray-mode", xray);
    return () => document.documentElement.classList.remove("xray-mode");
  }, [xray]);

  useEffect(() => {
    if (!sound) return;
    const play = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("a, button") || target.closest(".experience-controls")) return;
      const ctx = audio.current;
      if (!ctx || ctx.state !== "running") return;
      const oscillator = ctx.createOscillator();
      const volume = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(540, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(770, ctx.currentTime + 0.065);
      volume.gain.setValueAtTime(0.0001, ctx.currentTime);
      volume.gain.exponentialRampToValueAtTime(0.012, ctx.currentTime + 0.009);
      volume.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      oscillator.connect(volume);
      volume.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.105);
    };
    document.addEventListener("click", play);
    return () => document.removeEventListener("click", play);
  }, [sound]);

  useEffect(() => {
    return () => {
      if (audio.current) void audio.current.close().catch(() => {});
      audio.current = null;
    };
  }, []);

  const toggleSound = async () => {
    if (sound) {
      setSound(false);
      if (audio.current) {
        const old = audio.current;
        audio.current = null;
        await old.close().catch(() => {});
      }
      return;
    }
    try {
      const ctx = new window.AudioContext();
      audio.current = ctx;
      await ctx.resume();
      setSound(ctx.state === "running");
    } catch {
      setSound(false);
    }
  };

  return (
    <div className="experience-controls" role="group" aria-label={es ? "Controles de experiencia" : "Experience controls"}>
      <button
        type="button"
        className={xray ? "experience-control is-active" : "experience-control"}
        aria-label={es ? "Alternar modo rayos X" : "Toggle X-ray mode"}
        title={es ? "Rayos X: ver la estructura" : "X-ray: reveal the structure"}
        aria-pressed={xray}
        onClick={() => setXray((value) => !value)}
      >
        <ScanEye size={16}/>
      </button>
      <button
        type="button"
        className={sound ? "experience-control is-active" : "experience-control"}
        aria-label={sound ? (es ? "Desactivar sonidos" : "Disable sound") : (es ? "Activar sonidos" : "Enable sound")}
        title={sound ? "SOUND / ON" : "SOUND / OFF"}
        aria-pressed={sound}
        onClick={() => void toggleSound()}
      >
        {sound ? <Volume2 size={16}/> : <VolumeX size={16}/>}
      </button>
    </div>
  );
}
