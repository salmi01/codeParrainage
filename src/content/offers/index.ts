import type { ReferralOffer } from "@/lib/schemas";
import { ria } from "./ria";
import { sendwave } from "./sendwave";

// Ajouter ici chaque fiche après sa revue éditoriale.
export const offers: ReferralOffer[] = [ria, sendwave];
