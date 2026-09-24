"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";
import type { TankScene } from "@/lib/three/tank-scene";

const STAGE_DURATION = 2800;

export default function TankExperience({ c }: { c: SiteContent }) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<TankScene | null>(null);
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ui = c.process.interactive;
  const steps = c.technology.steps;
  const running = visible && pageVisible && ready && !failed && !reduced;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const visibility = () => setPageVisible(!document.hidden);
    sync(); visibility();
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => { query.removeEventListener("change", sync); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let disposed = false;
    let loading = false;
    let ownedScene: TankScene | null = null;
    const load = async () => {
      if (loading) return;
      loading = true;
      try {
        const { createTankScene } = await import("@/lib/three/tank-scene");
        if (disposed) return;
        ownedScene = await createTankScene(node, () => { if (!disposed) setFailed(true); });
        if (disposed) { ownedScene.dispose(); return; }
        scene.current = ownedScene;
        setReady(true);
      } catch {
        if (!disposed) setFailed(true);
      }
    };
    // Fetch before the section arrives, but animate only when actually visible.
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { void load(); preload.disconnect(); }
    }, { rootMargin: "450px" });
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      scene.current?.setVisible(entry.isIntersecting);
    }, { threshold: .12 });
    preload.observe(node); observer.observe(node);
    return () => {
      disposed = true; preload.disconnect(); observer.disconnect(); ownedScene?.dispose();
      if (scene.current === ownedScene) scene.current = null;
    };
  }, []);

  useEffect(() => { scene.current?.setStage(stage, reduced); }, [stage, reduced, ready]);
  useEffect(() => { scene.current?.setPlaying(running); }, [running, ready]);
  useEffect(() => { scene.current?.setVisible(visible && pageVisible); }, [visible, pageVisible, ready]);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setStage((value) => (value + 1) % 4), STAGE_DURATION);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className="tank-experience" data-stage={stage} data-running={running}>
      <div className="tank-topline">
        <span className="tank-live-dot" aria-hidden="true" />
        <span>{ui.label}</span>
        <span className="tank-topline-end">{ui.nonEntry}</span>
      </div>
      <div className="tank-viewport" ref={host}>
        {(!ready || failed) && (
          <div className="tank-fallback">
            <Image src="/media/tank-process-poster.webp" alt={c.hero.diagram.title} fill sizes="(min-width: 1024px) 1120px, 100vw" className="object-contain" />
            {failed && <span>{ui.fallback}</span>}
          </div>
        )}
        <div className="tank-view-label" aria-hidden="true">{ui.cutaway}<br /><span>{steps[stage].no} / 04</span></div>
        {!reduced && !failed && <div className="tank-auto-label"><span className="tank-live-dot" aria-hidden="true" />{ui.automatic}</div>}
        <div className="tank-legend">
          <span><i className="tank-swatch-treatment" />{ui.treatment}</span>
          <span><i className="tank-swatch-oil" />{c.hero.diagram.oil}</span>
          <span><i className="tank-swatch-water" />{ui.water}</span>
          <span><i className="tank-swatch-sludge" />{c.hero.diagram.sludge}</span>
        </div>
      </div>
      <ol className="tank-stage-nav" aria-label={c.technology.stepsLabel}>
        {steps.map((step, index) => (
          <li key={step.no} aria-current={stage === index ? "step" : undefined}>
            <span>{step.no}</span>{step.title}
            <i aria-hidden="true">{stage === index && <b key={`${stage}-${running}`} style={{ animationDuration: `${STAGE_DURATION}ms`, animationPlayState: running ? "running" : "paused" }} />}</i>
          </li>
        ))}
      </ol>
      <div className="tank-stage-detail" aria-hidden="true">
        <div className="tank-caption" key={stage}>
          <span className="tank-caption-number">{steps[stage].no}</span>
          <div><p className="tank-stage-title">{steps[stage].title}</p><p>{steps[stage].body}</p></div>
        </div>
      </div>
      {/* Complete, stable text for screen readers and reduced-motion/fallback users. */}
      <ol className={reduced || failed ? "tank-static-steps" : "sr-only"}>
        {steps.map(step => <li key={step.no}><strong>{step.title}</strong><p>{step.body}</p></li>)}
      </ol>
      <p className="tank-note">{c.process.diagramNote}</p>
    </div>
  );
}
