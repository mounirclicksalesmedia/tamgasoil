"use client";

import { useState } from "react";
import { fieldCls, labelCls } from "./ui";

export type J = string | number | boolean | null | J[] | { [k: string]: J };

/**
 * Edits any JSON shape as nested form fields and submits it as one hidden
 * JSON value under `name`. Strings become inputs (textarea when long),
 * arrays of strings become one-per-line textareas, arrays of objects become
 * repeatable groups, objects become fieldsets. Shape is preserved, so a
 * block's renderer always gets what it expects.
 */
export default function JsonFields({ name, value, dir, onChange }: { name: string; value: J; dir?: "ltr" | "rtl"; onChange?: (v: J) => void }) {
  const [state, setState] = useState<J>(value);
  const update = (v: J) => { setState(v); onChange?.(v); };
  return (
    <div dir={dir}>
      <input type="hidden" name={name} value={JSON.stringify(state)} readOnly />
      <Node value={state} path={[]} onChange={update} />
    </div>
  );
}

const humanize = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function setAt(root: J, path: (string | number)[], v: J): J {
  if (path.length === 0) return v;
  const [head, ...rest] = path;
  if (Array.isArray(root)) { const copy = [...root]; copy[head as number] = setAt(copy[head as number], rest, v); return copy; }
  const obj = { ...(root as { [k: string]: J }) }; obj[head as string] = setAt(obj[head as string], rest, v); return obj;
}

function Node({ value, path, onChange, label }: { value: J; path: (string | number)[]; onChange: (v: J) => void; label?: string }) {
  const set = (p: (string | number)[], v: J) => onChange(setAt(value, p, v));

  if (typeof value === "string") {
    const long = value.length > 90 || value.includes("\n");
    return (
      <label className="block">
        {label && <span className={labelCls}>{label}</span>}
        {long
          ? <textarea rows={Math.min(8, Math.max(2, Math.ceil(value.length / 80)))} value={value} onChange={(e) => onChange(e.target.value)} className={fieldCls} />
          : <input value={value} onChange={(e) => onChange(e.target.value)} className={fieldCls} />}
      </label>
    );
  }
  if (typeof value === "number") return <label className="block">{label && <span className={labelCls}>{label}</span>}<input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={fieldCls} /></label>;
  if (typeof value === "boolean") return <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
  if (value === null) return null;

  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === "string")) {
      return (
        <label className="block">
          {label && <span className={labelCls}>{label} <span className="normal-case tracking-normal text-ink-3">· one per line</span></span>}
          <textarea rows={Math.min(10, Math.max(2, value.length + 1))} value={(value as string[]).join("\n")} onChange={(e) => onChange(e.target.value.split("\n"))} className={`${fieldCls} font-mono text-[13px]`} />
        </label>
      );
    }
    return (
      <fieldset className="rounded-xl border border-line p-4">
        {label && <legend className={`${labelCls} px-1`}>{label}</legend>}
        <div className="space-y-3">
          {value.map((item, i) => (
            <div key={i} className="rounded-lg border border-line-2 bg-paper p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] text-ink-3">#{i + 1}</span>
                <div className="flex gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                  {i > 0 && <button type="button" onClick={() => { const c = [...value]; [c[i - 1], c[i]] = [c[i], c[i - 1]]; onChange(c); }} className="text-ink-3 hover:text-ink">↑</button>}
                  {i < value.length - 1 && <button type="button" onClick={() => { const c = [...value]; [c[i + 1], c[i]] = [c[i], c[i + 1]]; onChange(c); }} className="text-ink-3 hover:text-ink">↓</button>}
                  <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-wine-700 hover:underline">Remove</button>
                </div>
              </div>
              <Node value={item} path={[...path, i]} onChange={(v) => set([i], v)} />
            </div>
          ))}
          <button type="button" onClick={() => onChange([...value, blank(value[0])])} className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-green-700 hover:underline">+ Add item</button>
        </div>
      </fieldset>
    );
  }

  const entries = Object.entries(value as { [k: string]: J });
  const inner = (
    <div className="space-y-4">
      {entries.map(([k, v]) => <Node key={k} value={v} path={[...path, k]} onChange={(nv) => set([k], nv)} label={humanize(k)} />)}
    </div>
  );
  return label ? <fieldset className="rounded-xl border border-line p-4"><legend className={`${labelCls} px-1`}>{label}</legend>{inner}</fieldset> : inner;
}

/** A new array item shaped like the first one, with every string emptied. */
function blank(sample: J | undefined): J {
  if (sample === undefined || typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (sample === null) return null;
  if (Array.isArray(sample)) return [];
  return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blank(v)]));
}
