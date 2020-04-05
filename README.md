# APNOTPAN
APP for Movies in JS on Vuejs

Application qui renvoie une liste de film trier par popularité depuis l'api https://www.themoviedb.org/?language=fr-FR
Pour chaque film , l'utilisateur peut envoyer une critique pour chaque film avec un formulaire qui lui est lié ( via l'id du film ) 
Chaque formulaire dispose d'une critique , d'une note , du nom de l'utilisateur ainsi que son mail , ces infos sont push dans une BDD firebase : https://firebase.google.com

( Firebase est un ensemble de service dont une BDD en temps reel qui est en l'occurence le service utilisé ici ) 

Un utilisateur est identifié par son mail dans la BDD est ne peut donc donner qu'une seule critique pour un meme film , ( si le meme mail est entrée bien evidement ) 

a Implementer pour la suite :

Barre de recherche pour obtenir un film recherché 
mise en place des autres pages ( 50 pages disponible , 1 seule a été implementé pour l'instant ) 
page dedié a l'affichage des critiques ( trié par film ? )
refonte graphique generale ( aspect pour le moment tres basique ) 

