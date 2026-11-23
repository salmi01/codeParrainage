import type { ReferralOffer } from "@/lib/schemas";
import { ria } from "./ria";
import { sendwave } from "./sendwave";
import { taptapSend } from "./taptap-send";
import { aceMoneyTransfer } from "./ace-money-transfer";

// Ajouter ici chaque fiche après sa revue éditoriale.
export const offers: ReferralOffer[] = [ria, sendwave, taptapSend, aceMoneyTransfer];
