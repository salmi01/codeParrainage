import type { ReferralOffer } from "@/lib/schemas";

const code = "4262293";
const reviewed = "2026-11-23";
const rules = "https://acemoneytransfer.com/terms-and-conditions-wallet";
const frenchRules = "https://acemoneytransfer.com/fr/terms-and-conditions-wallet";
const invitation = "https://acemoneytransfer.eu.go.link/acemoneytransfer.com/referral-link/?referral_code=4262293&adj_t=1fbed427&adj_deep_link=https%3A%2F%2Facemoneytransfer.com%2Freferral-link%3Freferral_code%3D4262293&adj_fallback=https%3A%2F%2Facemoneytransfer.com%2Fsign-up%3Freferral_code%3D4262293&adj_redirect_macos=https%3A%2F%2Facemoneytransfer.com%2Fsign-up%3Freferral_code%3D4262293";

export const aceMoneyTransfer = {
  id: "ace-money-transfer", brandId: "ace-money-transfer", brandName: "ACE Money Transfer",
  slug: "code-parrainage-ace-money-transfer", category: "transfert-argent", publication: "published", status: "active",
  title: `Code parrainage ACE Money Transfer : 10 € avec le code ${code}`,
  description: `Code parrainage ACE Money Transfer ${code} : obtenez 10 € en crédits ACE Wallet après un transfert éligible d’au moins 100 €. Conditions et mode d’emploi.`,
  referralCode: code, referralUrl: invitation, officialUrl: rules,
  eligibilityCountries: [], currency: "EUR", minimumTransfer: "100",
  geographicScopeNote: "Vérifiez le pays d’envoi et la devise de départ dans ACE. Les envois vers le Nigeria, le Brésil ou la Corée du Sud sont exclus de l’offre de 10 € pour le filleul.",
  bonusSummary: "10 € en crédits ACE Wallet pour le filleul après un premier transfert payé d’au moins 100 € en EUR, sur un trajet admissible et après les contrôles ACE.",
  benefitToInvitee: "10 € de crédit dans le portefeuille ACE du nouveau client, utilisables sur de futurs transferts.",
  benefitToReferrer: "10 € en crédits ACE Wallet dans le programme bilatéral pour un parrainage EUR admissible.",
  verifiedAt: reviewed, updatedAt: reviewed,
  ownerConfirmation: "Le code du brief concorde avec le bouton d’invitation publié sur BonusFoundry et avec le code transmis à la page d’inscription ACE.",
  publicSharingEvidence: "L’éditeur demande la réutilisation de son invitation BonusFoundry. Les règles Invite a Friend prévoient le partage du lien ou du code personnel.",
  disclosure: "L’éditeur peut recevoir un crédit de parrainage si vous utilisez son invitation et réalisez un transfert éligible.",
  editorial: {
    seoTitle: `Code parrainage ACE Money Transfer ${code} : 10 € de bonus`, shortTitle: "ACE Money Transfer",
    market: "Offre en euros · nouveau client", discount: "10 €", rewardLabel: "de crédits ACE Wallet pour le filleul",
    answer: `Utilisez le code ${code} à l’inscription. Pour un premier transfert payé d’au moins 100 € vers une destination éligible, vous pouvez recevoir 10 € en crédits ACE Wallet. Après vérification de votre identité et de l’opération, ACE ajoute le crédit à votre portefeuille pour vos prochains envois.`,
    minimumNote: "Si vous payez dans une autre devise, vérifiez le seuil correspondant dans ACE.",
    validationNote: "ACE attribue les crédits après acceptation du transfert payé et validation des contrôles d’identité, de lutte contre le blanchiment et de fraude.",
    extraFacts: [
      { label: "Attribution du code", value: "À la création du compte, par le lien personnel ou par saisie du code." },
      { label: "Règles officielles", value: "Consulter les conditions ACE et les exclusions par destination", url: rules },
    ],
    showVerificationDate: true,
    observation: "BonusFoundry, site du même éditeur, fournit le code et le lien personnel. Le 23 novembre 2026, la rédaction a vérifié le code transmis à l’adresse d’inscription et comparé les deux versions des conditions ACE. Le guide ACE du 21 novembre 2025 détaille les montants en euros pour le filleul et le parrain.",
    officialSite: "https://acemoneytransfer.com/fr",
  },
  conditions: [
    "L’invitation doit être associée à un nouveau compte dès l’inscription. En présence de plusieurs codes, ACE retient celui utilisé lors de la création du compte.",
    "Les règles anglaises, en vigueur depuis le 20 novembre 2025, excluent les transferts vers le Nigeria, le Brésil et la Corée du Sud du programme qui récompense le parrain et le filleul. La page française ne cite que le Nigeria. Pour ces trois destinations, ne comptez pas sur les 10 €.",
    "Le régime propre au Nigeria réserve la récompense au parrain sous conditions. Le filleul qui envoie au Nigeria ne reçoit aucun crédit de ce programme.",
    "ACE peut refuser le bonus pour un client déjà inscrit, des comptes multiples ou fictifs, un parrainage au sein du même foyer ou un autre abus du programme.",
    "Une annulation, un remboursement, une contestation de paiement ou une fraude peuvent entraîner la reprise des crédits déjà accordés.",
  ],
  sources: [
    { label: "ACE Money Transfer · Conditions du portefeuille et du parrainage (EN)", url: rules, checkedAt: reviewed },
    { label: "ACE Money Transfer · Conditions sur le site français (FR)", url: frenchRules, checkedAt: reviewed },
    { label: "ACE Money Transfer · Barème des récompenses par devise, dont l’euro", url: "https://acemoneytransfer.com/blog/how-to-earn-big-with-the-ace-invite-a-friend-program-instant-rewards-wallet-credits-monthly-prizes", checkedAt: reviewed },
    { label: "BonusFoundry · Code personnel et invitation de l’éditeur", url: "https://bonusfoundry.com/providers/ace-money-transfer/referral-code", checkedAt: reviewed },
  ],
  faq: [
    { question: "Quel est le code de parrainage ACE Money Transfer ?", answer: `Le code personnel est ${code}. Utilisez-le en créant votre compte ACE.` },
    { question: "Comment obtenir les 10 € de bonus ACE Money Transfer ?", answer: "Inscrivez-vous avec l’invitation puis effectuez un premier transfert payé et admissible d’au moins 100 €. ACE crédite le portefeuille du filleul une fois les vérifications terminées." },
    { question: "Quel est le montant minimum du premier transfert ?", answer: "Pour l’offre EUR, le seuil est de 100 € sur une seule opération payée. Avec une autre devise de départ, consultez le minimum correspondant dans ACE." },
    { question: "Puis-je retirer le bonus ACE de 10 € en espèces ?", answer: "Non. Les crédits restent dans ACE Wallet et servent à réduire le coût de futurs envois." },
    { question: "Quand les crédits sont-ils disponibles dans ACE Wallet ?", answer: "ACE les inscrit au portefeuille dès que le transfert éligible est approuvé et que les contrôles sont terminés. La durée de ces vérifications peut varier." },
    { question: "Puis-je saisir le code après l’inscription ?", answer: "Les conditions rattachent le parrainage au code utilisé à l’inscription. Si le code manque sur un compte déjà créé, contactez ACE avant d’engager un transfert en comptant sur le bonus." },
    { question: "Que reçoit le filleul pour un transfert vers le Nigeria ?", answer: "Aucun bonus filleul. Le régime applicable aux transferts vers le Nigeria prévoit uniquement une récompense pour le parrain, sous conditions." },
    { question: "L’offre de 10 € fonctionne-t-elle dans tous les pays ?", answer: "Non. Elle dépend du marché d’envoi, de la devise et de la destination. Les conditions anglaises excluent le Nigeria, le Brésil et la Corée du Sud du programme bilatéral." },
    { question: "Quelle est la différence avec un code promo ACE ?", answer: `${code} rattache votre inscription à un parrain dans le programme Invite a Friend. Un code promo relève d’une campagne dont les règles et la période de validité peuvent différer.` },
  ],
} satisfies ReferralOffer;
