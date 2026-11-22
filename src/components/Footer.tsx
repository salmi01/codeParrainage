import Link from "next/link";
import { Brand } from "./Brand";
export function Footer() {
  return <footer><div className="shell footer-inner"><Brand/><nav aria-label="Pied de page">
    <Link href="/contact">Contact</Link><Link href="/transparence-commerciale">Transparence commerciale</Link>
    <Link href="/confidentialite">Confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link>
  </nav></div></footer>;
}
