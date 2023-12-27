# Droits et rôles :

Liste des roles : 
`visiteur` = tout le monde (les user dans la db et toutes les autres personnes pas dans la db)
`membre`
`admin`


Protéger les pages selon les roles :

| Pages | Rôles autorisés | Commentaire | 
| -- | -- | -- |
Page d'accueil | `visiteurs` | Accessibles à tous les users, logués ou non |
Page d'un quiz | `membre` et `admin` | être logué suffit |
Page de profil | `membre` et `admin` | on pourrait aussi dire qu'un utilisateur loggué ne peut pas accéder au profil d'un autre utilisateur (sauf si il est admin) |
Page de gestion des `levels` | `admin` | page à créer elle n'existe pas encore dans le projet |
Toutes les pages de gestion (`quiz`, `tags`...) | `admin` | pages à créer |
| Autre pages | `visiteurs` | Toutes les autres pages (mentions légales par exemple) sont accessibles à tous.


## Modifier la table "user"

On modifie la table "user" de notre db pour y ajouter une colonne "role".

2 méthodes possibles :
- on modifie le fichier `create_tables.sql` pour ajouter la colonne dans la table "user"
- on écrit une requête SQL dans le terminal pour modifier la talble dirrectement :
`ALTER TABLE "user" ADD COLUMN "role" TEXT DEFAULT 'membre';`

## Transformer un user en admin

`UPDATE "user" SET role = 'admin' WHERE email = 'flore@oclock.io';`

Pour vérifier : `SELECT * FROM "user";`