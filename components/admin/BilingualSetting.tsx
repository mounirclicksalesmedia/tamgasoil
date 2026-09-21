"use client";

import { useState } from "react";
import JsonFields, { type J } from "./JsonFields";
import { LocaleTabs } from "./ui";

/** Two locale editors submitted as one `{ en, ar }` value. */
export default function BilingualSetting({ value }: { value: { en: J; ar: J } }) {
  const [en, setEn] = useState<J>(value.en);
  const [ar, setAr] = useState<J>(value.ar);
  return (
    <div>
      <input type="hidden" name="value" value={JSON.stringify({ en, ar })} readOnly />
      <LocaleTabs
        en={<JsonFields name="__en" value={value.en} onChange={setEn} dir="ltr" />}
        ar={<JsonFields name="__ar" value={value.ar} onChange={setAr} dir="rtl" />}
      />
    </div>
  );
}
