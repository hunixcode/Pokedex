# Important

## Implement game

Les utilisateurs devront cliquer sur un boutton les faisant rejoindre un matchmaking si ils ont
bien sélectionné en amont les 6 pokemons de leurs choix pour leur combat.
    Le matchmaking durera 30s maximum avant de quitter si aucun joueur n'est trouvé, pour l'instant
faire juste un objet matchmaking qui prends une liste d'id d'objet Player ( à créer, aura l'id du user et ses 6 pokemons ), si tu entres dans le matchmaking et qu'il y a un joueur alors celui là
seras ton ennemi, si il y en a plusieurs alors prendre un au hasard.

Je crois que pour l'instant un seul objet de type matchmaking doit se créer, plus tard je verrais si il faudras implémenter plusieurs autres matchmaking, avec un système d'elo.
donc un seul matchmaking.

Ensuite, il faudra aussi utiliser un nouvelle objet de type Game qui aura les 2 ids des deux joueurs qui s'affronte ou qui se sont affronter, il y aura le nombre de tours,
le résultat de la game et évidemment un état: in progress, completed, aborted(si un des deux quitte la partie). 

Pour l'instant le jeu consistera à utiliser les attaques que l'on a du pokemon, pas de systèmes d'esquive ou quoi que ce soit, pas de faiblesse, fais vraiment, si l'attaque fais 2 points de dégâts alors elle fera 2 points de dégâts.


# Medium

- Implémenter les opérations de calculs de stats des users pour le profile

# Low

- Implémenter le système de combat, les users devront avoir un profile avec un historique de combat.
à voir si il ne serait pas mieux de faire une table qui contiendra des Objets "Log" qui feront office
d'historique, avec le nom de l'autre user, son équipe et le résultat de la partie ( Won / Loose )

- Implement simple unit tests ( optional )