import { publisher } from "@/content/publisher";
import type { institutionalSlugs } from "./routes";

type Info = { title: string; description: string; index: boolean; sections: { heading: string; body: string }[] };
export const info: Record<typeof institutionalSlugs[number], Info> = {
  methode: {
    title: "Notre méthode de vérification", description: "Comment nous établissons l’avantage du filleul, les conditions applicables et le droit de diffuser une invitation.", index: true,
    sections: [
      { heading: "Identifier l’offre, puis vérifier ses conditions", body: "Nous partons des codes et des offres documentés sur BonusFoundry, un site du même éditeur que CodeParrainage.co. Nous consultons ensuite les conditions officielles du fournisseur pour vérifier qui peut en bénéficier, quelles étapes suivre et quand utiliser la récompense." },
      { heading: "Vérifier le pays et le bénéficiaire", body: "Nous distinguons le pays de résidence du pays de départ et de la destination d’un transfert. La fiche précise séparément ce que peut recevoir la personne invitée et ce que peut recevoir le parrain." },
      { heading: "Contrôler chaque invitation", body: "Nous confirmons à qui appartient le code ou le lien et examinons les règles de partage du programme. Chaque fiche précise l’avantage que l’éditeur peut recevoir si vous utilisez son invitation." },
      { heading: "Dater la vérification", body: "Chaque fiche indique les sources consultées. Lorsqu’un avantage a été vérifié, nous précisons à quelle date. Si l’offre a expiré ou si ses conditions restent à confirmer, nous le signalons sur la fiche." },
    ],
  },
  "transparence-commerciale": {
    title: "Transparence commerciale", description: "À qui appartiennent les invitations et comment les avantages éventuels sont indiqués sur CodeParrainage.", index: true,
    sections: [
      { heading: "Les invitations de l’éditeur", body: "Les codes et liens sélectionnés pour ce site appartiennent à l’éditeur. L’utilisation d’une invitation peut lui donner droit à une récompense selon les règles du programme. Ce lien commercial est indiqué à proximité de l’invitation." },
      { heading: "L’avantage de la personne invitée", body: "La fiche décrit l’avantage destiné au filleul et ses conditions. La prime éventuellement versée au parrain est présentée séparément. Les conditions du fournisseur restent la référence avant toute inscription." },
    ],
  },
  confidentialite: {
    title: "Confidentialité", description: "Fonctionnement de la recherche locale, de la préférence de pays et des liens vers les fournisseurs.", index: true,
    sections: [
      { heading: "Recherche et préférence de résidence", body: "La recherche s’effectue dans le navigateur, à partir du catalogue du site. Les mots saisis figurent dans l’adresse de la page de résultats. Le pays choisi est conservé dans le stockage de session de cet onglet. Vous pouvez effacer ce choix en sélectionnant « Tous les pays »." },
      { heading: "Navigation sur le site", body: "CodeParrainage fonctionne sans compte utilisateur, géolocalisation automatique ni traceur publicitaire. Comme pour toute requête web, le serveur d’hébergement reçoit les informations techniques nécessaires à la fourniture de la page." },
      { heading: "Visiter un fournisseur", body: "Lorsque vous ouvrez un lien vers un fournisseur, vous quittez CodeParrainage. Le service de destination applique sa propre politique de confidentialité." },
    ],
  },
  "mentions-legales": {
    title: "Mentions légales", description: "Informations sur l’éditeur de CodeParrainage.co et son hébergement.", index: Boolean(publisher.name && publisher.address && publisher.director && publisher.email && publisher.hostName && publisher.hostAddress && publisher.hostPhone),
    sections: [
      { heading: "Éditeur", body: [publisher.name, publisher.address, publisher.registration, publisher.director && "Responsable de publication · " + publisher.director].filter(Boolean).join(" · ") || "Les coordonnées légales de l’éditeur seront précisées avant l’ouverture publique du site." },
      { heading: "Hébergement", body: [publisher.hostName, publisher.hostAddress, publisher.hostPhone].filter(Boolean).join(" · ") || "Les coordonnées de l’hébergeur seront ajoutées après confirmation de l’hébergement de production." },
    ],
  },
  contact: {
    title: "Contacter la rédaction", description: "Joindre l’éditeur au sujet d’une fiche ou d’une information publiée sur CodeParrainage.co.", index: Boolean(publisher.email),
    sections: [
      { heading: "Une question sur une fiche ?", body: "Indiquez l’adresse de la page, le point à vérifier et, si possible, le lien vers les conditions officielles. Gardez vos identifiants et références de transaction confidentiels." },
      { heading: "Coordonnées", body: publisher.email ? "Écrivez à la rédaction à l’adresse ci-dessous." : "L’adresse de contact sera indiquée avant l’ouverture publique du site." },
    ],
  },
};
export const isInfo = (slug: string): slug is keyof typeof info => Object.hasOwn(info, slug);
