"use client";

import { useCountry } from "./Country";
import { countryName } from "@/lib/countries";

export function OfferResidenceNote({ eligible }: { eligible: string[] }) {
  const { code } = useCountry();
  if (!code || eligible.includes(code)) return null;
  return <p className="residence-note" role="status">Résidence sélectionnée · {countryName(code)}. Pour cette résidence, vérifiez le montant et le minimum dans votre application. Les conditions de cette fiche concernent {eligible.map(countryName).join(", ")}.</p>;
}
