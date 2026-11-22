import Link from "next/link";
import { Tickets } from "lucide-react";

export function Brand() {
  return <Link className="brand" href="/" aria-label="CodeParrainage, accueil">
    <span className="brand-mark"><Tickets size={24} strokeWidth={1.85} aria-hidden /></span>
    <span>Code<span className="brand-green">Parrainage</span><small>.co</small></span>
  </Link>;
}
