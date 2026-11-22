# CODEX GOAL — CodeParrainage.co (V1)

> **Statut : spécification exécutable pour Codex**  
> **Projet :** `codeparrainage.co`  
> **Langue éditoriale :** français  
> **Audience :** pays francophones, sans limiter le site à la France  
> **Priorité :** SEO technique + qualité éditoriale + performance + conversion éthique  
> **Périmètre :** V1 légère, sans base de données ni communauté  
> **Stratégie éditoriale :** lancement du socle, puis publication contrôlée des fiches une par une  
> **Source de départ autorisée :** `https://bonusfoundry.com` (site du même propriétaire ; validation obligatoire des informations)

## 1. Mission

Concevoir et implémenter un site web éditorial de référence pour trouver des **codes de parrainage**, **codes bonus** et **offres de bienvenue** vérifiés, d'abord dans les applications de transfert d'argent, puis les banques et d'autres services éligibles.

Le site doit :

1. Être indexable, rapide, mobile-first, accessible et facile à explorer par Google et Bing.
2. Répondre immédiatement à l'intention de recherche sur chaque page d'offre : *quel avantage, pour qui, avec quel code, sous quelles conditions, vérifié quand ?*
3. Mettre en valeur **uniquement les codes et liens d'affiliation du propriétaire** dans cette V1.
4. Permettre de publier et mettre à jour des offres **une par une**, sans base de données : contenu versionné en Markdown/MDX et données structurées en TypeScript/JSON.
5. Conserver une structure de données suffisamment propre pour importer les offres vers une base de données plus tard, **sans développer cette migration maintenant**.
6. Servir une audience francophone internationale en distinguant les offres éligibles selon le pays de résidence, le pays d'envoi et, si nécessaire, la destination.

### Définition du succès V1

Un visiteur peut trouver une marque, consulter une offre fiable, comprendre son éligibilité, copier un code utilisable, suivre un lien autorisé et consulter la source officielle. Les moteurs de recherche peuvent découvrir toutes les pages éditoriales utiles depuis la navigation et le sitemap.

**Ne pas promettre une position Google, un volume de trafic ou des revenus.** Ces résultats seront mesurés après lancement.

## 2. Périmètre non négociable

### À développer maintenant

- Site public responsive en français.
- Accueil, catégories, fiches d'offres, hubs pays, comparatifs, guides, recherche locale côté client.
- Codes et liens de parrainage personnels, gestion par fichiers.
- Interface de sélection du pays, sans exiger de géolocalisation.
- Métadonnées SEO, sitemap, robots.txt, canonical, Open Graph, données structurées appropriées.
- Navigation, breadcrumbs, liens internes contextuels, pages institutionnelles/légales.
- Tests essentiels, validation des données d'offre, documentation de contribution.
- Mise en place compatible avec un déploiement sur Vercel.

### Explicitement hors périmètre V1 — NE PAS construire

- PostgreSQL, Supabase, Prisma, Drizzle ou toute autre base de données.
- Schémas SQL, migrations ou scripts d'import vers DB.
- Comptes utilisateurs, connexion, inscription, authentification ou profils.
- Tableau de bord d'administration / CMS nécessitant un backend.
- Publication de codes par les visiteurs, commentaires, avis, votes et signalements.
- Paiements, Premium, Boost, places de marché et facturation.
- API applicative, serveur de redirection affiliée, tracking maison avec stockage de données personnelles.
- Pages vides, offres fictives présentées comme réelles, bonus inventés ou fausses dates de vérification.

L'extensibilité future doit venir **de la séparation du contenu, de la logique métier et du rendu**, pas d'une infrastructure construite prématurément.

## 3. Stack technique souhaitée

- **Next.js** (App Router, version stable maintenue), **TypeScript** en mode strict.
- **Tailwind CSS** pour le style, composants réutilisables, pas de framework UI lourd par défaut.
- Contenus éditoriaux : **Markdown/MDX** ; données : modules TypeScript typés ou JSON validé.
- Génération statique / pré-rendu pour les pages publiques chaque fois que possible ; éviter les appels réseau à l'exécution sans nécessité.
- Images locales optimisées et `next/image` quand pertinent.
- Hébergement cible : **Vercel**.
- Lint, typecheck, tests et build reproductibles.

Si le dépôt existe déjà, **auditer l'existant avant toute modification** et réutiliser ce qui est pertinent. Ne pas réinitialiser ni supprimer du travail sans justification. Ne pas figer des versions de dépendances sans vérification.

## 4. Architecture URL — DÉCISION FIGÉE

Ne pas modifier ces modèles sans demande explicite :

| Type de contenu | Format public | Exemple |
|---|---|---|
| Accueil | `/` | `/` |
| Offre d'application | `/code-parrainage-[marque]` | `/code-parrainage-ria` |
| Parrainage bancaire | `/parrainage-[banque]` | `/parrainage-boursobank` |
| Catégorie transfert | `/transfert-argent` | `/transfert-argent` |
| Catégorie banques | `/banques` | `/banques` |
| Autres catégories | `/{categorie}` | `/cashback` uniquement si contenu réel |
| Hub pays | `/pays/[pays]` | `/pays/maroc` |
| Comparatif | `/comparatifs/[sujet]` | `/comparatifs/meilleurs-codes-parrainage` |
| Guide | `/guides/[sujet]` | `/guides/comment-utiliser-code-parrainage` |
| Futures annonces membres | `/annonces/[identifiant]` | **RÉSERVÉ POUR PLUS TARD, ne pas créer en V1** |

**Règles :** slugs en minuscules, sans accents, séparés par des tirets ; une seule URL canonique par page ; pas de duplications de fiches marque dans `/transfert-argent/` ou `/banques/` ; pas de variantes nationales automatiques des pages d'offre. Les pages `/pays/...` sont des hubs éditoriaux utiles, pas des copies de pages marque. Ajouter des variantes régionales seulement si elles ont une valeur propre et une justification SEO.

## 5. Arborescence cible du code

Adapter aux conventions de la version retenue de Next.js :

```text
src/
  app/
    layout.tsx
    page.tsx
    [slug]/page.tsx               # fiches d'offres principales
    transfert-argent/page.tsx
    banques/page.tsx
    pays/[pays]/page.tsx
    comparatifs/[sujet]/page.tsx
    guides/[sujet]/page.tsx
    recherche/page.tsx            # si utile ; noindex
    mentions-legales/page.tsx
    confidentialite/page.tsx
    transparence-commerciale/page.tsx
    contact/page.tsx
    sitemap.ts
    robots.ts
    not-found.tsx
  components/
    Header.tsx
    Footer.tsx
    SearchBox.tsx
    CountrySelector.tsx
    OfferCard.tsx
    ReferralCodeBox.tsx
    OfferConditions.tsx
    Breadcrumbs.tsx
    RelatedOffers.tsx
    FAQSection.tsx
  content/
    offers/                        # données des offres vérifiées
    guides/                        # Markdown/MDX
    comparisons/                   # Markdown/MDX
  lib/
    content.ts
    offers.ts                     # interface de lecture isolée
    countries.ts
    seo.ts
    schemas.ts                    # validation des données
    routes.ts
  types/
    offer.ts
public/
  logos/
  images/
```

Ne pas créer de sous-dossiers ou d'abstractions sans usage réel. Si `[slug]` entre en conflit avec des routes connues, employer une résolution déterministe et tester les collisions.

## 6. Modèle de données fichier (sans DB)

Définir un schéma typé et validé à la compilation pour chaque marque et offre. Champs conseillés :

```ts
type ReferralOffer = {
  id: string;                       // identifiant stable, indépendant de l'URL
  brandId: string;
  brandName: string;
  category: 'transfert-argent' | 'banques' | 'autre';
  slug: string;                     // slug URL publique
  title: string;
  description: string;
  referralCode?: string;            // absent si lien seul
  referralUrl?: string;             // URL autorisée et validée
  officialUrl: string;              // source officielle accessible
  bonusSummary: string;             // pas de montant fictif
  benefitToInvitee?: string;
  eligibilityCountries: string[];   // codes ISO 3166-1 alpha-2
  sendingCountries?: string[];
  receivingCountries?: string[];
  currency?: string;
  minimumTransfer?: string;
  conditions: string[];
  status: 'active' | 'unconfirmed' | 'expired';
  verifiedAt?: string;              // date ISO d'une vérification réelle
  expiresAt?: string;
  disclosure?: string;
  sources: { label: string; url: string; checkedAt?: string }[];
  faq?: { question: string; answer: string }[];
  updatedAt: string;
};
```

Adapter les champs au type d'offre ; ne jamais laisser entendre que `eligibilityCountries` décrit les destinations de transfert. Séparer clairement la récompense du filleul de celle du parrain. Interdire à la validation de build les doublons d'ID/slug, URL invalides, pays non reconnus, offres `active` sans source ou avec date de vérification absente, et dates incohérentes.

Prévoir une **interface de lecture unique** (`getOffers`, `getOfferBySlug`, `getOffersByCountry`, etc.) : en V2, cette interface pourra être alimentée par une base de données sans modifier les composants de pages. **Ne pas coder d'adaptateur DB maintenant.**

## 7. Design et expérience utilisateur

Direction : identité sobre, crédible, professionnelle, mobile-first. Fond clair, textes foncés, accent vert modéré, typographie lisible, espaces généreux, contraste WCAG AA, états de focus visibles. Ne pas ressembler à un site de coupons surchargé.

### Page d'accueil

1. Header : logo/nom `CodeParrainage`, navigation catégories, recherche, sélection pays.
2. Hero : proposition de valeur claire, par exemple « Codes de parrainage et bonus vérifiés » ; ne pas promettre « meilleurs » sans critère.
3. Recherche rapide par application et banque.
4. Offres à découvrir **réellement disponibles**, sans montants fictifs.
5. Entrées de catégories et pages pays pertinentes.
6. Liens vers comparatifs, guides et méthode de vérification.
7. Footer : contact, transparence commerciale, confidentialité, mentions légales.

### Fiche d'offre (modèle prioritaire)

Ordre recommandé :

1. Breadcrumbs + logo/nom de l'application.
2. H1 ciblé sur l'intention (« Code de parrainage Ria : offre et conditions »).
3. **Bloc de réponse directe** au-dessus de la ligne de flottaison : avantage du filleul, pays éligibles, statut, dernière vérification effective.
4. Code copiable et CTA vers le lien autorisé ; si aucune offre active vérifiée, montrer un état honnête, **sans CTA trompeur**.
5. Conditions : minimum, étapes, restrictions, disponibilité pays/corridor, expiration si connue.
6. Sources officielles et méthode de vérification.
7. FAQ utile et spécifique, puis offres similaires et guides liés.
8. Mention de lien commercial clairement visible quand applicable.

Le bouton Copier doit réellement copier, avec retour accessible. Les liens externes doivent être sûrs (`https`, `rel="sponsored nofollow noopener"` selon le contexte pour les liens rémunérés, `target` seulement si pertinent). Les liens officiels non commerciaux ne doivent pas être artificiellement marqués `sponsored`.

### Pays

Le choix du pays filtre **seulement les offres dont l'éligibilité est documentée** ; si le pays est absent ou non vérifié, le signaler clairement plutôt que supposer que l'offre s'applique. Ne pas bloquer la découverte des autres offres. Ne pas imposer de géolocalisation automatique. Conserver éventuellement le filtre dans la query string pour le partage, sans générer une explosion d'URL indexables.

## 8. SEO technique — exigences de publication

- Pages de contenu pré-rendues, HTML lisible sans JavaScript lorsque possible.
- `metadata` / `generateMetadata` propres à chaque page : `title`, description, canonical, Open Graph, Twitter cards ; pas de titres dupliqués.
- H1 unique logique ; hiérarchie H2/H3 ; textes descriptifs ; pas de bourrage de mots-clés.
- URLs stables, `404` pour ressources inexistantes, pas de pages « soft 404 ».
- Sitemap XML limité aux pages canoniques, utiles, publiées et indexables ; `lastmod` basé sur une modification réelle, jamais mis à jour artificiellement à chaque build.
- `robots.txt` approprié ; ne pas indexer recherche interne, filtres infinis, pages techniques ou brouillons ; ne pas compter sur `robots.txt` pour protéger des données sensibles.
- Liens internes HTML explorables : catégories → offres, pays → offres vérifiées, guides/comparatifs → offres, offres → alternatives.
- Schémas JSON-LD **valides et justifiés** : `Organization`, `WebSite`, `BreadcrumbList`, `Article` si applicable ; ne pas inventer avis, notes, `AggregateRating`, prix ou données marchandes. Ne pas dépendre de résultats enrichis FAQ.
- `hreflang` seulement si de véritables variantes linguistiques/régionales équivalentes existent ; pas automatique pour des hubs pays différents.
- Images optimisées avec `alt` utile, dimensions explicites, chargement intelligent ; pas de CLS inutile.
- Cibles de performance : viser des Core Web Vitals satisfaisants sur mobile (LCP ≤ 2,5 s ; INP ≤ 200 ms ; CLS ≤ 0,1 au 75e percentile), à mesurer après déploiement avec données de terrain quand disponibles.
- Préparer les balises et processus de vérification Search Console / Bing Webmaster Tools ; ne pas prétendre les connecter sans accès ni créer de faux identifiants.
- SEO/AEO/GEO : offrir des réponses claires, sourcées, actualisées réellement et utiles à la citation ; ne jamais prétendre garantir l'apparition dans les moteurs ou réponses IA.

## 9. Fiabilité, affiliation et conformité

- **Aucune invention** : code, lien, bonus, seuil, pays, date, témoignage, statut de vérification.
- Ne publier que les codes dont la diffusion publique est autorisée par les conditions applicables. Si la preuve d'autorisation manque, conserver l'offre comme brouillon/non confirmée.
- Conditions officielles et captures autorisées : citer la source sans copier intégralement ses textes ; ne pas exploiter des captures privées sans autorisation de publication.
- Afficher les conditions significatives et les limitations de l'offre de façon compréhensible.
- Indiquer clairement les liens d'affiliation / avantages éventuels pour l'éditeur.
- Ajouter une page de transparence commerciale et les pages légales nécessaires ; laisser les informations d'identité juridique à compléter par le propriétaire, ne pas les inventer.
- Si des mesures d'audience nécessitant le consentement sont ajoutées, prévoir une solution conforme ; par défaut, **ne pas intégrer de pixels publicitaires ou traceurs non nécessaires**.
- Garder les paramètres de liens d'affiliation en configuration, jamais en secrets exposés. Les codes destinés à être copiés sont par nature publics.
- Prévoir des textes pour les offres expirées ou impossibles à confirmer sans les présenter comme actives.

## 10. Source BonusFoundry et publication séquentielle — RÈGLES OBLIGATOIRES

### 10.1. Réutilisation de BonusFoundry (même propriétaire)

Le propriétaire de CodeParrainage.co exploite aussi **`https://bonusfoundry.com`**. Codex est autorisé à consulter les pages publiques de BonusFoundry comme **source de travail initiale** pour identifier les codes personnels, les URL de parrainage, les preuves et les références officielles, particulièrement pour **Ria, Sendwave, Taptap Send**.

**Ne pas considérer BonusFoundry comme la preuve officielle d'une offre toujours active.** Les informations peuvent dater, diverger entre pages ou varier selon le pays, la devise et le corridor. Appliquer le processus suivant, pour **chaque fiche** :

1. Identifier sur BonusFoundry les pages pertinentes de la marque, le code ou lien présumé du propriétaire, les conditions déclarées et les URL des sources officielles. Consigner leurs URL dans une courte fiche de recherche interne.
2. **Vérifier les codes, les liens d'invitation et leur attribution auprès du propriétaire** avant publication ; leur présence sur BonusFoundry ne garantit pas qu'ils sont encore actifs, qu'ils lui appartiennent ou qu'ils sont utilisables sur tous les marchés. Ne pas utiliser un lien générique comme s'il s'agissait d'un lien personnel.
3. Contrôler les **conditions actuelles auprès du fournisseur officiel** : avantage du filleul (prioritaire), prime du parrain distincte, pays de résidence/d'envoi, destinations éligibles si nécessaires, minimum, devise, nouveaux utilisateurs, mode de transfert, délai, expiration et restrictions.
4. Vérifier que le programme autorise la **publication publique** du code ou du lien sur ce nouveau domaine. Si ce droit n'est pas établi, placer l'offre en brouillon et signaler la vérification nécessaire.
5. En cas de divergence entre BonusFoundry, les pages officielles et l'application, **ne pas arbitrer arbitrairement** : rendre le champ non confirmé, documenter le conflit et demander une preuve actuelle du propriétaire si indispensable.
6. Rédiger un **contenu original en français**, adapté aux intentions des francophones et aux offres effectivement disponibles ; ne pas traduire mot à mot ni dupliquer l'ensemble du texte, des titres, FAQ et paragraphes de BonusFoundry. Réutiliser uniquement les faits vérifiés, les codes et les références pertinents.
7. Renseigner `sources`, `verifiedAt`, `updatedAt` et la portée géographique avec des dates réelles ; éviter toute fausse mention « vérifié aujourd'hui » et toute mise à jour automatique artificielle.
8. Ne pas copier de contenus tiers protégés, logos ou captures sans droit d'utilisation approprié ; ne pas réutiliser des captures anciennes pour prouver une offre actuelle.

Conserver, dans les fichiers du projet ou dans la documentation de recherche de chaque fiche, la **traçabilité** : URL BonusFoundry utilisée, documents officiels consultés, points confirmés/non confirmés et éléments à fournir par le propriétaire. Ne pas présenter les notes de recherche internes comme des pages publiques indexables.

### 10.2. Développement en deux temps : socle puis fiches successives

**Ne PAS générer en masse les pages Ria, Sendwave, Taptap Send, autres transferts et banques.** Le développement suit ces étapes :

**Étape A — Socle technique et design**
- Construire l'accueil, header, footer, navigation, recherche, sélecteur de pays, catégories, design system, composants d'offre, modèle de données par fichiers, pages légales et SEO technique.
- Préparer des **gabarits réutilisables**, pas des pages marketing remplies d'un contenu générique.
- Les pages sans offre réelle suffisante restent en brouillon, `noindex`, ou sont indisponibles avec une vraie 404 selon leur usage ; ne pas les placer dans le sitemap ou les liens de navigation comme si elles étaient publiées.
- Les catégories affichent uniquement les offres réellement publiées ; prévoir des états vides utiles dans les prévisualisations mais ne pas indexer des catégories sans contenu pertinent.

**Étape B — Première fiche exemplaire : Ria**
- Après le socle, sélectionner **Ria** comme première fiche à travailler (ou une autre application si le propriétaire change explicitement la priorité).
- Réaliser une recherche spécifique : intentions/variantes des requêtes, concurrence, conditions officielles, variantes par pays, code et lien du propriétaire, sources et mentions commerciales.
- Proposer l'angle de page, le title/meta, le H1, la réponse courte en tête, les conditions, les instructions, la FAQ véritablement utile et les liens internes ; puis produire le contenu intégral et le tester.
- Faire valider les informations manquantes avant de présenter l'offre comme active. Le déploiement public du site peut se faire lorsque l'accueil, la catégorie concernée et **au moins une fiche complète, exacte et vérifiée** sont prêts.

**Étape C — Ajouter les fiches une par une après validation**
- Ordre éditorial indicatif : **Sendwave → Taptap Send **, puis les autres applications, et plus tard les banques. Cet ordre peut changer selon la valeur des mots-clés, la disponibilité des preuves et les conditions des programmes.
- Pour chaque nouvelle fiche : nouvelle recherche dédiée, sources officielles, rédaction française originale, validation des informations, tests SEO et UX, publication, puis seulement la suivante.
- Ne pas déduire l'éligibilité pour plusieurs pays à partir d'une offre constatée sur un seul compte en France.
- Ne pas créer automatiquement des variantes de pages par pays ou des comparatifs pauvres ; publier ces pages seulement si les informations sont suffisamment différenciées et documentées.

**Étape D — Optimisation continue**
- Après l'indexation, suivre impressions, clics, CTR et requêtes dans Google Search Console et Bing Webmaster Tools ; utiliser ces données pour prioriser les améliorations et les prochaines fiches.
- Mesurer les conversions d'affiliation seulement avec des mécanismes autorisés, respectueux de la vie privée et réellement disponibles ; ne pas inventer de résultats.
- Aucune promesse de classement ni de calendrier de revenus.

### 10.3. Definition of Done par fiche

Une nouvelle fiche ne peut être signalée comme « prête à publier » que si :

- [ ] Son code ou lien personnel a été confirmé par le propriétaire.
- [ ] La publication du code est permise par le programme ou sa validation reste explicitement bloquante.
- [ ] Les avantages et les conditions sont corroborés par des preuves actuelles et pertinentes.
- [ ] La distinction filleul/parrain et les pays/corridors sont exacts.
- [ ] La page contient une réponse directe originale, des sections utiles, une FAQ non artificielle et les sources.
- [ ] L'URL canonique, le title, la meta description, les liens internes et le statut d'indexation sont corrects.
- [ ] L'interface mobile, les liens externes et la copie du code ont été testés.
- [ ] Le site n'affiche aucune date de vérification fictive ou récompense non confirmée.

## 11. Gestion du développement avec Codex

Travailler par étapes petites et vérifiables :

1. **Audit** : inspecter le dépôt, expliquer l'état actuel et proposer un plan de fichiers à modifier.
2. **Fondations** : config, styles, layout, navigation, routage.
3. **Données** : types, validation, lecture des offres depuis fichiers.
4. **Pages publiques** : accueil, catégories et gabarits réutilisables ; ne pas publier en masse des fiches non vérifiées. La première fiche Ria est un chantier éditorial individuel, après le socle.
5. **SEO & confiance** : métadonnées, canonical, sitemap, JSON-LD, pages légales et gestion des statuts.
6. **Qualité** : lint, typecheck, tests ciblés, build de production, tests navigation et responsive.
7. **Documentation** : comment ajouter/mettre à jour une offre, publier, invalider un bonus, tester et déployer.

À chaque étape : donner un résumé des changements, les fichiers modifiés, les commandes exécutées, les erreurs éventuelles et les points bloquants. Ne pas installer une dépendance sans nécessité précise. Ne pas déployer ni modifier des configurations externes sans accès approprié et accord du propriétaire.

## 12. Critères d'acceptation obligatoires

- [ ] Le projet démarre localement et le build production réussit.
- [ ] TypeScript strict, lint et contrôles de validation passent.
- [ ] Aucune base de données, migration, compte ou fonction communautaire installée.
- [ ] La structure URL figée est respectée ; aucune duplication canonique.
- [ ] Les pages publiques sont lisibles et navigables sur mobile et desktop.
- [ ] Une offre avec données fiables affiche code, CTA, conditions, pays, statut et sources de manière correcte.
- [ ] Les informations de BonusFoundry sont traitées comme source de départ, jamais comme preuve suffisante de conditions actuelles.
- [ ] Les fiches sont ajoutées individuellement après recherche, vérification, rédaction originale et validation ; aucune publication de masse.
- [ ] Une offre sans données fiables n'affiche pas de fausse promotion active.
- [ ] Pays de résidence, origine et destination de transfert ne sont jamais confondus.
- [ ] Les liens internes, canonical, sitemap et robots sont cohérents.
- [ ] Les données structurées correspondent à ce qui est visible à l'écran.
- [ ] Recherche et filtres ne génèrent pas de pages indexables inutiles.
- [ ] Les CTA, la copie du code, les 404 et les états vides fonctionnent.
- [ ] Le site est accessible au clavier et présente une navigation sémantique.
- [ ] `README.md` documente les commandes et l'ajout d'une nouvelle offre.
- [ ] Aucun bonus, code, date ou résultat SEO fictif n'est présenté comme réel.

## 13. Livrables attendus

1. Code source V1 fonctionnel, propre et modulaire.
2. Pages et composants publics décrits ci-dessus.
3. Schéma de données fichier et validation.
4. SEO technique complet, adapté à un site francophone international.
5. Tests et documentation d'exploitation.
6. Liste explicite des informations réelles à fournir (codes, URLs, conditions, sources, identité légale) avant mise en production.
7. Méthode documentée pour transformer une fiche BonusFoundry en **nouvelle fiche française originale et vérifiée**, sans duplication automatique.
8. Checklist par fiche et workflow de publication **une application à la fois**.

---

## Instruction immédiate à Codex

**Commence par inspecter le dépôt.** S'il est vide, initialise la V1 avec la stack définie. Présente brièvement le plan d'implémentation, puis implémente **d’abord le socle**, les composants et les gabarits fonctionnels. **Ne crée pas en masse les fiches de parrainage** : BonusFoundry sert de base de recherche, et chaque fiche est vérifiée et rédigée séparément. Commence la première fiche Ria seulement après stabilisation du socle. Respecte strictement l'architecture URL figée et l'exclusion de toute DB/communauté. Ne publie jamais une offre inventée. À la fin, exécute les contrôles disponibles et fournis un bilan factuel des tâches terminées, de ce qui reste à renseigner et de ce qui n'a pas pu être vérifié.
