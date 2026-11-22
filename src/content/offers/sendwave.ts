import type { ReferralOffer } from "@/lib/schemas";

const code = "I4H9G";
const reviewed = "2026-11-22";
const rules = "https://www.sendwave.com/fr/terms-and-conditions/referral-program";

export const sendwave = {
  id: "sendwave", brandId: "sendwave", brandName: "Sendwave", category: "transfert-argent",
  slug: "code-parrainage-sendwave", publication: "published", status: "active",
  title: `Code de parrainage Sendwave : 20 € avec ${code}`,
  description: `Code parrainage Sendwave ${code} : 20 € de crédit pour le filleul dès 50 € de premier transfert éligible selon l’offre France. Conditions et étapes.`,
  referralCode: code, officialUrl: rules,
  eligibilityCountries: ["FR"], sendingCountries: ["FR"], currency: "EUR", minimumTransfer: "50",
  verifiedAt: "2026-11-15", updatedAt: reviewed,
  bonusSummary: "20 € de crédit pour un premier envoi éligible d’au moins 50 €, selon l’offre France/EUR documentée.",
  benefitToInvitee: "20 € de crédit promotionnel à utiliser sur le premier transfert éligible. Ce crédit ne se retire pas en espèces.",
  benefitToReferrer: "20 € de crédit pour un envoi ultérieur après livraison réussie du premier transfert admissible du filleul, selon l’offre observée.",
  ownerConfirmation: "Brief de l’éditeur et fiche BonusFoundry concordants pour I4H9G.",
  publicSharingEvidence: "Diffusion du code personnel demandée par l’éditeur dans le brief Sendwave. Le programme officiel décrit le partage du code ; aucun agrément de Sendwave pour le domaine n’est revendiqué.",
  disclosure: "Ce site peut recevoir un crédit de parrainage si vous utilisez ce code et réalisez un transfert éligible.",
  editorial: {
    seoTitle: `Code parrainage Sendwave ${code} : bonus de 20 €`, shortTitle: "Code parrainage Sendwave",
    market: "France · compte en euros", discount: "20 €", rewardLabel: "de crédit pour le filleul",
    answer: `Sur l’offre France/EUR documentée, le code ${code} donne au nouveau client éligible 20 € de crédit dès 50 € sur son premier transfert international. Saisissez-le dans l’application avant de valider ce premier envoi.`,
    minimumNote: "Seuil de l’offre France/EUR documentée par BonusFoundry le 15 novembre 2026.",
    validationNote: "Vérifiez l’acceptation du code et le crédit affiché pour votre trajet avant de payer.",
    extraFacts: [
      { label: "Public concerné", value: "Nouveaux utilisateurs qui n’ont encore effectué aucune transaction Sendwave." },
      { label: "Preuve de l’offre", value: "15 novembre 2026, selon BonusFoundry. Compte de l’éditeur enregistré en France, en euros. Les destinations admissibles sont à vérifier dans l’application." },
    ],
    observation: "BonusFoundry, site du même éditeur, décrit une capture de son compte France/EUR revue le 15 novembre 2026. Elle documente le code, les deux crédits de 20 € et le minimum de 50 €. Les conditions publiques consultées le 22 novembre précisent les règles générales. Cette vérification documentaire ne comprend aucun test de paiement ni d’attribution du crédit.",
    officialSite: "https://www.sendwave.com/fr",
  },
  conditions: [
    "Le parrainage concerne un nouveau client avant sa première transaction dans l’application. Un code ajouté après cet envoi ne permet pas de récupérer le crédit.",
    "Sendwave peut réserver l’offre à certains pays d’envoi ou de réception, ou à une combinaison des deux. La possibilité d’envoyer de l’argent à une destination ne suffit pas à y établir le droit au bonus.",
    "Le fournisseur peut demander une pièce d’identité pour vérifier le compte avant de traiter l’envoi ou d’accorder le crédit.",
    "Le crédit de parrainage est utilisable pendant 12 mois à compter de son attribution, sauf indication différente de Sendwave. Cette durée concerne le solde crédité ; aucune date de fin du code personnel n’a été établie.",
  ],
  sources: [
    { label: "BonusFoundry · Code et preuve de l’offre France/EUR", url: "https://bonusfoundry.com/providers/sendwave/referral-code", checkedAt: reviewed },
    { label: "Sendwave · Conditions du parrainage", url: rules, checkedAt: reviewed },
    { label: "Sendwave · Conditions distinctes des codes de campagne", url: "https://www.sendwave.com/fr/terms-and-conditions/promo-code-promotion", checkedAt: reviewed },
    { label: "Sendwave · Conditions générales du service", url: "https://www.sendwave.com/fr/terms-and-conditions", checkedAt: reviewed },
    { label: "Sendwave · Assistance, frais et disponibilités", url: "https://www.sendwave.com/fr/support", checkedAt: reviewed },
    { label: "Sendwave · Fonctionnement des crédits de parrainage", url: "https://www.sendwave.com/fr/blog/product/sendwave-referral-program-benefits", checkedAt: reviewed },
  ],
  faq: [
    { question: "Quel est le code de parrainage Sendwave ?", answer: `Le code personnel de l’éditeur est ${code}. Le premier caractère est la lettre I majuscule, suivie du chiffre 4.` },
    { question: "Quel bonus Sendwave reçoit le filleul ?", answer: "L’offre France/EUR documentée par BonusFoundry le 15 novembre 2026 accorde 20 € de crédit de transfert au nouveau client éligible." },
    { question: "Quel montant faut-il envoyer pour obtenir les 20 € en France ?", answer: "Le minimum indiqué sur le compte français de l’éditeur était de 50 € pour le premier transfert. Contrôlez le seuil de votre propre offre avant de valider." },
    { question: `Où saisir le code Sendwave ${code} ?`, answer: "Saisissez le code dans l’application lors de l’inscription. Selon votre version, cherchez le champ de code dans votre profil. Vérifiez son acceptation avant votre première transaction." },
    { question: "Peut-on ajouter le code après le premier transfert ?", answer: "Non. Les conditions de parrainage imposent de saisir le code avant d’effectuer la première transaction." },
    { question: "Les 20 € sont-ils retirables ?", answer: "Non. Le bonus est un crédit promotionnel affecté à un transfert éligible. Il ne donne pas lieu à un versement en espèces ou sur votre compte bancaire." },
    { question: "Le bonus vaut-il pour le Maroc, la Belgique ou le Canada ?", answer: "La preuve concerne un compte ouvert en France. Elle ne confirme ni une offre identique pour les résidents belges ou canadiens, ni l’éligibilité d’un envoi vers le Maroc. Vérifiez dans l’application les deux pays de votre trajet." },
    { question: "Pourquoi le code est-il refusé ?", answer: "Vérifiez la saisie, votre historique de transferts, le minimum et le trajet choisi. Une vérification d’identité en attente peut aussi retarder l’attribution. En cas de doute, demandez à l’assistance de contrôler l’offre avant l’envoi." },
    { question: "Quand le parrain reçoit-il son crédit ?", answer: "Dans l’offre documentée, les 20 € du parrain deviennent attribuables après la livraison réussie du premier envoi admissible du filleul. Ils servent à un transfert ultérieur. Aucun délai précis n’est établi pour ce compte." },
    { question: "Combien de temps le crédit de parrainage reste-t-il valable ?", answer: "Sendwave prévoit 12 mois à partir de la date où le crédit est porté au compte, sauf indication contraire. Vérifiez l’échéance associée à votre crédit dans l’application." },
  ],
} satisfies ReferralOffer;
