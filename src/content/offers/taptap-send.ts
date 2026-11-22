import type { ReferralOffer } from "@/lib/schemas";

const code = "SALAHEDD1933";
const reviewed = "2026-11-22";
const rules = "https://www.taptapsend.com/fr/referrals-terms/referral-v4/referrals-fr4";
const help = "https://support.taptapsend.com/fr/bonus-and-referrals/how-do-referral-codes-and-promo-codes-work";
const provider = "https://bonusfoundry.com/providers/taptap-send";

export const taptapSend = {
  id: "taptap-send", brandId: "taptap-send", brandName: "Taptap Send", category: "transfert-argent",
  slug: "code-parrainage-taptap-send", publication: "published", status: "active",
  title: `Code parrainage Taptap Send : ${code} et bonus de 5 €`,
  description: `Code parrainage Taptap Send ${code} : 5 € observés pour le filleul éligible. Où saisir le code avant le premier transfert et comment utiliser le crédit.`,
  bonusSummary: "5 € pour le filleul sur l’offre observée. Vérifiez le montant et le minimum pour votre pays d’envoi et votre destination.",
  benefitToInvitee: "5 € de crédit sur l’offre constatée dans l’application du parrain.",
  benefitToReferrer: "10 € de crédit observés pour le parrain après le premier envoi admissible réussi du filleul.",
  referralCode: code, officialUrl: rules, eligibilityCountries: [],
  geographicScopeNote: "L’offre dépend du pays d’envoi et de la destination. La preuve disponible ne précise pas les trajets admissibles.",
  verifiedAt: "2026-10-03", updatedAt: reviewed,
  ownerConfirmation: "Le brief du propriétaire et sa fiche de vérification BonusFoundry identifient le même code et les deux montants.",
  publicSharingEvidence: "Publication demandée par le propriétaire du code. Les conditions du 28 mars 2025 et l’assistance du 16 novembre 2026 décrivent le parrainage personnel. L’accord de Taptap Send pour la diffusion en annuaire reste à confirmer.",
  disclosure: "L’éditeur peut recevoir un crédit si vous utilisez son code et réalisez un premier transfert admissible.",
  editorial: {
    seoTitle: `Code parrainage Taptap Send ${code} : bonus 5 €`, shortTitle: "Taptap Send",
    market: "Offre personnelle observée", discount: "5 €", rewardLabel: "pour le filleul",
    answer: `Avec ${code}, le compte du parrain affichait 5 € pour le filleul. Saisissez ce code avant de confirmer votre premier transfert. L’offre dépend du pays d’envoi et de la destination.`,
    minimumNote: "La preuve mentionne un seuil sans en indiquer le montant. Consultez l’offre de votre trajet dans l’application.",
    validationNote: "Entrez le code avant de confirmer le premier envoi. Le transfert vers un tiers autre que le parrain doit aboutir et ne pas être annulé.",
    extraFacts: [
      { label: "Qui peut en bénéficier ?", value: "Une personne qui n’a encore jamais été inscrite chez Taptap Send." },
      { label: "Utilisation du crédit", value: "Sur un envoi admissible, le crédit augmente la somme reçue par le destinataire pour le même montant payé." },
      { label: "Expiration du crédit", value: "90 jours après son attribution au compte, selon l’assistance du 16 novembre 2026." },
      { label: "Preuve de l’offre personnelle", value: "3 octobre 2026, selon la fiche de vérification BonusFoundry." },
      { label: "Revue des règles par BonusFoundry", value: "15 novembre 2026." },
    ],
    observation: "BonusFoundry, publié par le même éditeur, date la preuve du compte du 3 octobre 2026 et sa revue des règles du 15 novembre. Les conditions Taptap Send sont datées du 28 mars 2025 et l’article d’assistance du 16 novembre 2026. Le 22 novembre, la rédaction a consulté ces documents. Le montant de 5 € provient de l’observation du compte en octobre.",
    officialSite: "https://www.taptapsend.com/fr",
  },
  conditions: [
    "Un ancien client qui se réinscrit ne remplit pas la condition de première inscription. Taptap Send peut annuler une récompense en cas d’inscriptions multiples, de fraude présumée ou de non-respect du programme.",
    "Un code promo de campagne est fourni par Taptap Send. Le premier transfert accepte un seul code. Utilisez soit ce code de campagne, soit le code de parrainage personnel.",
    "Le solde de récompenses s’applique en totalité sur un transfert admissible. L’assistance exclut les transferts vers un portefeuille. Si le destinataire choisit un service de mobile money, faites confirmer le mode de réception précis dans l’application.",
    "Après un échec de transfert, Taptap Send recrédite le bonus utilisé. Si vous recommencez aussitôt, le solde peut encore être en cours de rétablissement. Contactez l’assistance dans l’application s’il manque toujours.",
    "Un parrain peut être récompensé pour 20 amis au maximum sur une période glissante de 30 jours.",
  ],
  faq: [
    { question: "Quel est le code de parrainage Taptap Send ?", answer: `Le code personnel du parrain est ${code}. Saisissez-le dans l’application avant de valider votre premier envoi.` },
    { question: `Quel bonus reçoit le filleul avec ${code} ?`, answer: "Le compte du parrain affichait 5 € pour le filleul le 3 octobre 2026. Vérifiez l’offre proposée pour vos pays de départ et d’arrivée." },
    { question: "Où saisir le code de parrainage Taptap Send ?", answer: "Sur l’écran où vous indiquez le montant du premier envoi, ouvrez « Vous avez un code de parrainage ? » pour saisir le code." },
    { question: "Peut-on ajouter le code après le premier transfert ?", answer: "Non. La saisie doit avoir lieu avant la confirmation du premier transfert." },
    { question: "Peut-on cumuler un code promo et un code de parrainage ?", answer: "Non. Taptap Send accepte un seul code pour la première transaction." },
    { question: "Quel est le montant minimum pour obtenir le bonus ?", answer: "Le seuil chiffré reste à vérifier dans l’application pour le trajet choisi. La preuve du compte mentionne un minimum sans en donner le montant." },
    { question: "Le bonus Taptap Send est-il versé en espèces ?", answer: "Non. Le crédit s’utilise dans Taptap Send pour augmenter le montant reçu par le destinataire sur un envoi admissible." },
    { question: "Quand le crédit bonus expire-t-il ?", answer: "Le crédit expire 90 jours après son attribution au compte. La date de fin du code personnel reste inconnue." },
    { question: "Le code fonctionne-t-il dans tous les pays francophones ?", answer: "Aucune liste de pays ne confirme une telle couverture. Consultez la rubrique Parrainages pour le pays d’envoi et la destination de votre transfert." },
  ],
  sources: [
    { label: "BonusFoundry · Code personnel et preuve des montants", url: provider + "/referral-code", checkedAt: reviewed },
    { label: "Taptap Send · Assistance sur les codes, les portefeuilles et l’expiration", url: help, checkedAt: reviewed },
    { label: "Taptap Send · Conditions du programme de parrainage", url: rules, checkedAt: reviewed },
    { label: "BonusFoundry · Présentation de Taptap Send", url: provider, checkedAt: reviewed },
    { label: "BonusFoundry · Guide du solde de récompenses", url: "https://bonusfoundry.com/guides/how-to-use-taptap-send-bonus-credit", checkedAt: reviewed },
  ],
} satisfies ReferralOffer;
