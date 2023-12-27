# Git

## Ressources 

Cheat Sheet : 
https://education.github.com/git-cheat-sheet-education.pdf

Petit jeu en ligne pour apprendre à utiliser Git : 
https://learngitbranching.js.org/?locale=fr_FR

## Les merges :

La plupart du temps Git arrive à merge tout seul sans problème
Mais si toi et tes collègues avez touché aux mêmes lignes de code, il se peut que Git n'arrive pas à merge tout seul => on a alors un **conflit** de merge
Il faudra alors corriger les erreurs à la main, c'est à dire, choisir quelles lignes de code on garde ou non (et quelle version de chaque ligne).

Attention : ça peut prendre du temps de faire ça ! Donc évitez de fair eune `gitt pull` le vendredi soir 5 min avant de partir en weekend !!

## 1 règle à retenir :

Quandon veut faire une `git push`, on doit toujours faire un `git pull` juste avant !

En gros : on ne peut pas envoyer nos modif vers le repo distant si on n'a pas récupéré le code du repo distant à jour.