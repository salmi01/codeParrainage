# CodeParrainage.co · Favicon et accès aux contenus

Audit du 24 novembre 2026. Les résultats ci-dessous distinguent le domaine public avant déploiement du build de production exécuté localement.

## Constats sur le site public

L’accueil répondait en HTTP 200 aux requêtes envoyées avec les noms de robots Googlebot, Bingbot et OAI-SearchBot. La fiche Ria répondait aussi en 200 à la requête OAI-SearchBot. L’accueil déclarait uniquement un SVG avec une empreinte dans la chaîne de requête. Le SVG répondait en 200 avec Googlebot-Image. Les URL `/favicon.ico` et `/llms.txt` répondaient en 404. Google cite le PNG et l’ICO parmi ses formats de favicon pris en charge. [Documentation Google sur les favicons](https://developers.google.com/search/docs/appearance/favicon-in-search)

Le domaine servait le sitemap et un fichier robots autorisant l’exploration de `/` pour `*`. Les réponses 200 sondées ne comportaient pas d’en-tête `X-Robots-Tag`. Ces requêtes provenaient du poste de test. Seuls les outils des moteurs et les journaux d’hébergement peuvent confirmer le passage de leurs robots authentifiés. Le dépôt ne contient ni middleware d’authentification ni configuration de pare-feu CDN.

## Fichiers livrés

| Fichier | Rôle |
| --- | --- |
| `public/icon.svg` | Remplace `src/app/icon.svg`. Reprend les deux tickets blancs et le vert du logo de l’en-tête. L’adresse existante du logo utilisé dans les données structurées reste accessible. |
| `public/favicon-96x96.png` | Favicon principal carré, servi à une URL fixe. |
| `public/favicon.ico` | Icône de compatibilité contenant les tailles 16, 32 et 48 px. |
| `public/apple-touch-icon.png` | Icône tactile de 180 × 180 px. |
| `src/app/layout.tsx` | Déclare dans toutes les pages un seul favicon principal et une icône tactile distincte. |
| `src/app/llms.txt/route.ts` | Produit un index Markdown français en UTF-8. Les fiches et leurs résumés proviennent du catalogue publié, avec le même critère de statut actif et le même intervalle de revalidation que le sitemap. |
| `scripts/check-discovery.mjs` et `package.json` | Ajoutent la commande `audit:discovery` pour répéter les contrôles HTTP, d’icônes, de liens, de métadonnées et de HTML sans JavaScript sur une origine donnée. |

L’index éditorial donne accès à l’accueil, à la catégorie transfert d’argent, aux quatre fiches, aux guides et à la méthode. Il reprend les limites géographiques des résumés publiés. Le projet conserve ses règles de crawl, dont le traitement de GPTBot par le groupe générique. OAI-SearchBot sert la recherche et GPTBot concerne l’entraînement. [Documentation des robots OpenAI](https://developers.openai.com/api/docs/bots)

## Contrôles du build local

| Commande | Résultat |
| --- | --- |
| `npm run typecheck` et `npm run lint` | Réussite des deux commandes. |
| `npm test` | 8 tests réussis. |
| `npm run build` | Catalogue validé, compilation et génération des 22 pages statiques réussies. |
| `npm run test:browser` | 11 tests Chrome réussis sur le build de production local. |
| `npm run audit:discovery -- http://127.0.0.1:3125` | Réussite sur le serveur lancé avec le build final. |

- Les ressources d’icônes, `robots.txt`, `sitemap.xml` et `llms.txt` répondent en 200 aux adresses prévues. Le PNG principal mesure 96 × 96 px. Vérification visuelle du pictogramme à 96 et 16 px.
- Les 13 pages du sitemap répondent en 200 avec un H1, un document en français, un titre et une description uniques, une URL canonique et une URL Open Graph concordantes. Les 8 liens de l’index éditorial appartiennent au sitemap. Les 17 chemins internes relevés sont accessibles.
- Les tests des fiches vérifient leurs données dans le HTML initial, leurs liens, la copie du code et le rendu mobile. Les articles conservent leurs dates éditoriales. Les schémas JSON-LD restent lisibles sans exécution JavaScript. La recherche et les rubriques en attente de contenu restent exclues de l’indexation selon les règles du site.
- Le diff des contenus commerciaux, du design, de `robots.ts` et de `sitemap.ts` est vide. Aucun nouveau paquet ni script côté client.
- Les 25 liens externes distincts des quatre fiches ont été sondés. Quinze ont répondu en 200. Cinq liens Ria (site et quatre pages d’aide) et cinq liens ACE (site, barème, deux pages de conditions et destination de l’invitation) ont répondu en 403 à la requête automatisée. Leur fonctionnement pour un visiteur reste à confirmer manuellement.

## Contrôles après déploiement

1. Depuis le dépôt, exécuter `npm run audit:discovery -- https://codeparrainage.co` avec Chrome disponible. Vérifier aussi directement le [PNG principal](https://codeparrainage.co/favicon-96x96.png), le [favicon ICO](https://codeparrainage.co/favicon.ico), l’[icône tactile](https://codeparrainage.co/apple-touch-icon.png), l’[index éditorial](https://codeparrainage.co/llms.txt), les [règles d’exploration](https://codeparrainage.co/robots.txt) et le [sitemap](https://codeparrainage.co/sitemap.xml).
2. Ouvrir le code source de l’accueil et d’une fiche. Le lien `rel="icon"` doit viser `/favicon-96x96.png` sans paramètre. En cas d’écart, vérifier la version déployée et le cache CDN.
3. Dans Google Search Console, inspecter l’URL de l’accueil, tester la version en ligne puis demander une nouvelle exploration si nécessaire. Contrôler le traitement du sitemap et suivre le favicon après le prochain passage de Google. L’affichage dans les résultats relève de Google.
4. Vérifier les journaux du CDN ou de l’hébergeur pour les requêtes réelles à l’accueil, au PNG et aux fiches. Si elles échouent, examiner le chemin, le statut et la règle concernée. Identifier les robots à partir des méthodes ou plages IP publiées par leurs opérateurs avant d’ajuster une règle. [Vérification de Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot) · [Robots OpenAI](https://developers.openai.com/api/docs/bots)
5. Ouvrir les liens Ria et ACE signalés ci-dessus dans un navigateur ordinaire. Pour le lien personnel ACE, vérifier que l’inscription conserve le code de la fiche.

`llms.txt` est une proposition d’index de découverte. La présence dans les réponses des assistants et les résultats de recherche dépend de leurs propres systèmes. [Proposition llms.txt](https://llmstxt.org/) · [Fonctionnalités IA de Google Search](https://developers.google.com/search/docs/appearance/ai-features)
