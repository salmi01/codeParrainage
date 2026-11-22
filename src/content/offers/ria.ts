import type { ReferralOffer } from "@/lib/schemas";

const code = "9RMU-ENB7";
const reviewed = "2026-11-22";
const rules = "https://help.riamoneytransfer.com/hc/fr-fr/articles/4416994463633-Programme-de-parrainage-de-Ria";

export const ria = {
  id: "ria", brandId: "ria", slug: "code-parrainage-ria", brandName: "Ria Money Transfer",
  category: "transfert-argent", publication: "published", status: "active",
  title: "Code de parrainage Ria : 20 € pour le filleul",
  description: `Code parrainage Ria ${code} : 20 € de réduction pour le filleul sur un premier transfert éligible depuis la France. Conditions et mode d’emploi.`,
  bonusSummary: "20 € de réduction sur le premier transfert international éligible d’un nouveau client en France.",
  benefitToInvitee: "20 € déduits au paiement du premier transfert international éligible.",
  benefitToReferrer: "L’offre affichée au parrain prévoit 20 € sur un prochain transfert après le premier envoi éligible du filleul, payé et remis au destinataire.",
  eligibilityCountries: ["FR"], sendingCountries: ["FR"], currency: "EUR", minimumTransfer: "50",
  referralCode: code, officialUrl: rules, verifiedAt: reviewed, updatedAt: reviewed,
  ownerConfirmation: "Code personnel confirmé dans le brief Ria et recoupé sur la fiche et l’accueil de BonusFoundry.",
  publicSharingEvidence: "Demande explicite de l’éditeur de diffuser ce code sur CodeParrainage.co dans le brief Ria, §2 et §6. Ria décrit le partage du code dans son programme. Aucun statut de partenaire revendiqué.",
  disclosure: "Ce site peut recevoir un avantage de parrainage si vous utilisez ce code et réalisez un transfert éligible.",
  conditions: [
    "Le filleul doit avoir au moins 18 ans et être nouveau chez Ria, sans compte ni transfert antérieur, y compris en agence. Le parrain doit aussi être majeur et avoir déjà effectué un transfert.",
    "Le paiement doit porter sur un seul transfert international éligible. Plusieurs petits envois ne permettent pas d’atteindre le minimum. Un transfert national est exclu.",
    "Le code doit être enregistré avant la confirmation du premier transfert. Ria exclut le cumul avec un code promotionnel.",
    "Si un transfert auquel la remise a été appliquée est annulé, Ria indique que le crédit revient sur le compte pour un prochain transfert éligible.",
  ],
  editorial: {
    seoTitle: "Code parrainage Ria : 20 € de bonus filleul",
    shortTitle: "Code de parrainage Ria", market: "France · compte en euros", discount: "20 €",
    answer: `Avec le code ${code}, un nouveau client en France peut déduire 20 € de son premier transfert international éligible. Saisissez le code avant de confirmer l’envoi.`,
    minimumNote: "Seuil relevé par l’éditeur sur son compte France/EUR le 22 novembre 2026.",
    observation: "L’éditeur a relevé dans son application Ria en France une remise de 20 € pour le filleul dès 50 € envoyés en une fois le 22 novembre 2026. BonusFoundry, son autre site, documente aussi le montant de 20 € lors d’un constat du 15 novembre. Le centre d’aide de Ria précise les règles du programme et renvoie à l’application pour le montant propre à chaque compte.",
    officialSite: "https://www.riamoneytransfer.com/fr-fr/",
  },
  sources: [
    { label: "Ria · Conditions du programme, cumul et annulation", url: rules, checkedAt: reviewed },
    { label: "Ria · Saisie du code et remise du filleul", url: "https://help.riamoneytransfer.com/hc/fr-fr/articles/4407688298385-On-m-a-recommand%C3%A9-Ria-comment-r%C3%A9clamer-ma-r%C3%A9compense", checkedAt: reviewed },
    { label: "Ria · Emplacement du champ de code dans l’application et sur le site", url: "https://help.riamoneytransfer.com/hc/fr-fr/articles/4406279777169-Comment-utiliser-un-code-promotionnel", checkedAt: reviewed },
    { label: "Ria · Causes de refus d’une réduction", url: "https://help.riamoneytransfer.com/hc/fr-fr/articles/36107077964561-Pourquoi-mon-code-promo-ou-ma-r%C3%A9compense-de-parrainage-n-a-t-il-pas-fonctionn%C3%A9", checkedAt: reviewed },
    { label: "BonusFoundry · Code personnel et constat sur le compte France de l’éditeur", url: "https://bonusfoundry.com/providers/ria/referral-code", checkedAt: reviewed },
  ],
  faq: [
    { question: "Quel est le code de parrainage Ria ?", answer: `Le code personnel partagé par CodeParrainage est ${code}. Copiez-le avec son tiret.` },
    { question: "Quel bonus Ria reçoit un nouveau client en France ?", answer: "L’offre relevée sur le compte France/EUR de l’éditeur le 22 novembre 2026 prévoit 20 € de réduction pour le filleul sur son premier transfert international éligible." },
    { question: "Comment obtenir les 20 € avec le code bonus Ria ?", answer: `Créez votre premier compte Ria, ajoutez ${code} et préparez un envoi international qui atteint le minimum de votre offre. Vérifiez au paiement que la remise France de 20 € figure dans le récapitulatif.` },
    { question: "Quel montant minimum faut-il envoyer ?", answer: "Le seuil observé par l’éditeur en France le 22 novembre 2026 est de 50 € en un seul transfert. Consultez votre application pour connaître le minimum applicable à votre compte." },
    { question: "Où saisir le code de parrainage Ria ?", answer: "Utilisez le champ de parrainage à l’inscription. Si vous avez déjà créé votre compte, ouvrez le champ de code promotionnel pendant la préparation de votre premier envoi." },
    { question: "Puis-je ajouter le code après mon premier transfert ?", answer: "Non. Ria accepte la saisie jusqu’à la confirmation du premier envoi. Une transaction déjà effectuée ne peut pas recevoir la remise rétroactivement." },
    { question: "Le code fonctionne-t-il hors de France ?", answer: "Ria propose le parrainage dans plusieurs pays. Le pays de résidence du filleul détermine l’offre affichée dans son application. Les 20 € décrits ici concernent le compte France/EUR observé." },
    { question: "Pourquoi ma réduction Ria ne s’affiche-t-elle pas ?", answer: "Vérifiez votre historique de compte, votre résidence, le moment de la saisie et le montant envoyé. La destination, le mode de paiement ou de réception et un autre code promo peuvent aussi expliquer le refus. Consultez l’aide de Ria avant de payer." },
    { question: "Les 20 € sont-ils versés en espèces ?", answer: "Non. Ria applique un crédit promotionnel au paiement du transfert éligible. Le filleul ne reçoit ni espèces ni virement de 20 € sur son compte bancaire." },
  ],
} satisfies ReferralOffer;
