# SpaceX Frontend Exercice

## Installation
Pour tester le travail :
- Faire un clone de ce repo :
- Exécuter la commande : **npm install**  pour avoir les packages nécessaires
- Exécuter la commande : **npm run dev**
## ✅ Ce qui j'ai pu faire 
- ### La page d'accueil avec :
  - Titre principal
  - Décompte en secondes (temps-réel) et informations du prochain lancement (nom et date formattée)
  - Menu avec 3 options (Tous les lancements, lancements réussis et lancements échoués)
  - Affichage en fonction du choix selectionné en menu des :
    - Si le résultat du fetch >= 10 : Des 10 derniers lancements
    - Sinon des résultats retournés par l'API
- ### La page des détails d'un lancement :
  - Affichage des détails du lancement(nom,date formattée,image,texte détails,liens associés,les noms des chargements et des clients) [NB: Je n'ai pas affiché le nom du lieu de lancement car je n'ai pas pu le détecter parmi les résultats retournés ! ]
  - Pour le lien de l'article, la redirection se fait vers un nouvel onglet
  - Pour le lien de la vidéo Youtube, l'affichage se fait au niveau d'un popup
- ### La navigation entre pages en utilisant vue-router
- ### En plus de l'ajout d'une barre de navigation pour faciliter le retour à la page d'accueil
## ⏰ Ce qui m'a pris plus du temps 
- L'usage des nouveaux outils (C'est la permière fois que j'utilise Vite,Vuetify,SpaceX API et Youtube API iFrame) m'a pris un peu de temps surtout qu'il fallait se documenter avant de les utiliser
- Le traitement et le formattage des dates et du temps car il fallait se documenter sur les timezones,etc
- L'affichage de la vidéo en popup, car je n'étais pas à l'aise avec l'usage de v-slot:activator avec {on,attrs} du composant Dialog en Vuetify
- Aussi les styles
## 😩 Ce qui m'a bloqué (Difficultés)
- Le tout premier problème que j'ai c'est au niveau de l'accés aux objets imbriqués (Nested Objects). En effet, à chaque fois que j'actualise la page je remarque que je n'ai plus accés au champs imbriqués en m'indiquant que c'est undefined.Une solution que j'ai utilisé pour me débrouiller c'est de stocker ces valeurs dans Data Properties au lieu de les accéder direcetement
- J'avais un problème au niveau de la portée (scope) de "this", il s'est avéré que c'est à cause de la syntaxe du coup je l'ai changé en Arrow Synatax, c'est ce qui m'a bloqué plusieurs fois avec v-select et v-dialog
- Je n'avais pas assez de visibilité sur ce qui passe derrière ( surtout avec Event Handling) en utilisant les composants Vuetify

## Outils 
- Vite
- Vuetify
- SpaceX API
- Youtube API iFrame
- Vue-Router
- Fetch
