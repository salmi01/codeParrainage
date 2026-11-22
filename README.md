# CodeParrainage.co

Socle éditorial francophone en Next.js App Router, TypeScript strict et Tailwind CSS. Le catalogue initial contient zéro offre. Deux guides originaux permettent de vérifier la navigation, la recherche et le rendu Markdown avant la première fiche. Les polices et l’illustration sont servies localement.

## Lancer et vérifier le projet

Utiliser Node.js 22.14 ou supérieur et npm. Depuis la racine du projet, installer les versions du fichier de verrouillage puis lancer le serveur.

```sh
npm ci
npm run dev
```

Ouvrir <http://localhost:3000>. Les contrôles reproductibles sont les suivants.

| Commande | Fonction |
| --- | --- |
| `npm run validate` | Valide le catalogue et les références éditoriales |
| `npm run lint` | Analyse le code avec ESLint |
| `npm run typecheck` | Génère les types de routes et contrôle TypeScript strict |
| `npm test` | Teste le schéma, la recherche, le rendu des offres et le sitemap |
| `npm run build` | Valide les données puis génère le site de production |
| `npm run start` | Sert le dernier build |
| `npm run test:browser` | Après le build, lance et arrête un serveur de test local, puis vérifie les parcours avec Playwright |

Les tests navigateur utilisent Chrome installé. Pour Edge, définir `BROWSER_CHANNEL=msedge`. Pour Chrome for Testing géré par Playwright, installer Chromium avec `npx playwright install chromium` et définir `BROWSER_CHANNEL=chromium`. Le port de test par défaut est 3109, modifiable via `QA_PORT`. Les données de test vivent exclusivement dans `tests/`.

## Organisation et routes

- `src/app/` contient les routes et les métadonnées. Les catégories sont `/transfert-argent` et `/banques`. Les fiches ont une seule adresse, `/code-parrainage-marque` ou `/parrainage-banque`.
- `src/lib/schemas.ts` définit le modèle et ses contraintes. `src/lib/offers.ts` constitue l’interface de lecture. Les composants reçoivent uniquement les données nécessaires à leur rendu.
- `src/content/offers/` accueille les modules TypeScript des fiches. La liste explicite dans `index.ts` est lue par tous les parcours.
- Les articles sont enregistrés dans `src/content/editorial.ts`, avec un Markdown correspondant dans `src/content/{guides,comparatifs,pays}/`. Leur URL est `/guides/sujet`, `/comparatifs/sujet` ou `/pays/pays`. Un hub pays demande un texte propre à sa résidence et son code ISO. Créer un dossier de contenu à la première publication de ce type.
- `src/components/` regroupe notamment le gabarit de fiche, les conditions, FAQ, cartes, fil d’Ariane, sélection de résidence et copie de code. Le socle utilise DM Sans et DM Serif Text, avec les couleurs et règles de mise en page dans `src/app/globals.css`.

Le sélecteur filtre les offres actives avec une résidence documentée. Une destination de transfert ne rend pas le résident de ce pays éligible. Le filtre reste dans l’onglet et se réinitialise avec « Tous les pays ». Les rubriques et guides restent accessibles. Les hubs pays gardent le périmètre annoncé par leur propre URL.

## Publier une application à la fois

Commencer par Ria après validation du socle, sauf nouvelle priorité du propriétaire. Le code source de BonusFoundry est facultatif. Sa page publique sert à repérer le programme et les documents à contrôler.

1. Préparer une note de recherche interne hors de `public/` et du registre d’articles. Consigner l’URL BonusFoundry, la date, le code ou le lien présumé, les questions des lecteurs, les conditions déclarées et les références officielles. Noter les divergences.
2. Demander au propriétaire la confirmation que le code ou l’URL lui appartient et reste utilisable. Établir le droit de diffusion sur CodeParrainage.co. Conserver une référence aux preuves dans la note. Ne jamais verser d’identifiant privé ou de pièce personnelle au projet.
3. Vérifier les documents officiels du fournisseur pour chaque marché. Relever séparément avantage du filleul, récompense du parrain, résidence, pays d’envoi, destinations, seuil et devise, étapes, frais, délai et expiration éventuelle. Documenter chaque inconnue et chaque conflit. Si nécessaire, demander une preuve actuelle au propriétaire.
4. Proposer l’angle éditorial, le plan, le titre et la description. Rédiger en français un résumé original et une FAQ spécifique lorsque les questions sont réellement utiles. Les conditions officielles et les pages concurrentes servent à la recherche.
5. Ajouter `src/content/offers/<marque>.ts` avec un objet satisfaisant `ReferralOffer`. Importer cet objet dans le tableau de `index.ts`. Choisir un identifiant stable, un slug figé et des codes pays ISO 3166-1 alpha-2. Utiliser `publication: "draft"` pendant la revue. Les brouillons sont absents des routes, de la recherche et du sitemap.
6. Renseigner les références de confirmation dans `ownerConfirmation` et `publicSharingEvidence`, les sources dans `sources`, et le document principal dans `officialUrl`. Conserver la date de la preuve de l’offre dans `verifiedAt`. Pour une offre active, une source doit reprendre l’URL officielle avec un `checkedAt` égal ou postérieur à cette date. Utiliser les dates réelles au format AAAA-MM-JJ.
7. Passer la checklist, obtenir la validation éditoriale puis définir `publication: "published"`. Le code personnel est copiable et le lien d’invitation est consultable dès lors qu’ils sont renseignés et autorisés à la diffusion. Le statut affiché précise si l’avantage est actif, expiré ou non confirmé. Les liens de parrainage sont signalés commercialement.
8. Exécuter les contrôles, reconstruire et vérifier la fiche sur mobile et ordinateur. Commencer la prochaine marque après validation de cette fiche.

### Checklist de revue

- [ ] Attribution, droit de diffusion et portée du programme établis.
- [ ] Avantages, critères, pays, devise et dates corroborés par des sources actuelles.
- [ ] Code et URL contrôlés avec le propriétaire, paramètres du lien conservés.
- [ ] Résumé, conditions, sources et information commerciale relus.
- [ ] Liens contextuels, titre, canonical et indexation contrôlés.
- [ ] Copie, navigation clavier, affichage mobile et CTA testés.

Pour corriger une offre, modifier le module concerné, dater le changement réel, relancer les contrôles et reconstruire. Si la preuve devient insuffisante, passer en `unconfirmed`. À expiration, passer en `expired`. Pour retirer entièrement la page, repasser en brouillon et reconstruire. Le calcul de statut traite une date de fin dépassée comme expirée. Les pages dépendantes des offres sont régénérables au bout d’une heure. Planifier une reconstruction au changement d’état pour que toutes les pages prennent en compte la décision éditoriale.

## Indexation et exploitation

Les pages éditoriales sont prérendues. Le sitemap utilise des URL absolues stables, les dates éditoriales disponibles et les seules pages indexables. Les catalogues vides, la recherche et les pages institutionnelles incomplètes sont en `noindex`. Les filtres de résidence ne créent pas d’URL supplémentaire. Les ressources inconnues retournent HTTP 404. Le fichier robots autorise l’exploration pour que les moteurs puissent lire les directives de chaque page.

Le lancement public intervient après validation de l’accueil, de la catégorie concernée et d’une première fiche complète et vérifiée. Pour déployer après accord, sélectionner la racine du projet dans Vercel, le preset Next.js et une version de Node compatible. Utiliser `npm ci` puis `npm run build`. Configurer le domaine canonique `https://codeparrainage.co` et la redirection de ses alias lors du lancement. Garder la préproduction derrière la protection de déploiement de l’hébergeur.

Pour Search Console et Bing Webmaster Tools, saisir les valeurs réelles de vérification dans les variables facultatives de `.env.example`, reconstruire, valider la propriété dans chaque console puis soumettre `https://codeparrainage.co/sitemap.xml`. L’activation des consoles relève du propriétaire. Mesurer ensuite les Core Web Vitals de terrain au 75e percentile mobile, avec des cibles de LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1. Le socle ne collecte aucune mesure d’audience.

## Informations à fournir avant la mise en ligne

- Identité juridique, adresse, immatriculation le cas échéant, responsable de publication, adresse de contact publique et coordonnées confirmées de l’hébergeur. Renseigner `src/content/publisher.ts`, adapter les mentions et la confidentialité aux modalités réelles d’hébergement, puis les faire relire.
- Pour la première fiche, page BonusFoundry de départ, code ou URL personnels, confirmation d’attribution, autorisation de diffusion publique, conditions et références officielles datées, portée géographique et détail de l’avantage.
- Pour le déploiement, accord du propriétaire, configuration du domaine et accès à l’hébergement. Les accès aux consoles et jetons de vérification ne sont nécessaires que pour les connecter.
