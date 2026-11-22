"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

export function ReferralCodeBox({ code, url, brand, disclosure }: { code?: string; url?: string; brand: string; disclosure?: string }) {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    try {
      if (!code) return;
      await navigator.clipboard.writeText(code);
      setFeedback("Code copié");
    } catch { setFeedback("Sélectionnez le code et copiez-le manuellement."); }
  }
  return <div className="referral-box">
    {code && <div className="code-line"><code>{code}</code><button className="button" onClick={copy}>{feedback === "Code copié" ? <Check size={16}/> : <Copy size={16}/>} Copier le code</button></div>}
    <span role="status">{feedback}</span>
    {url && <a href={url} className="button" rel="sponsored nofollow noopener">Ouvrir l’invitation {brand} <ExternalLink size={15}/></a>}
    <p className="fine-print">{disclosure || "L’éditeur peut recevoir un avantage si vous utilisez cette invitation."}</p>
  </div>;
}
