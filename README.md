# bring-it-app


BIENVENIDOS AL REPO DE BRING-IT-APP



PASOS PARA CREADO DE BRANCH 



//CREADO

>> GIT BRANCH nombreDeLaBranch




//PARARSE EN LA BRANCH

>> GIT CHECKOUT nombreDeLaBranch




//VER EN QUE BRANCH ESTAMOS PARADOS

>>GIT BRANCH
*(EN ESTA)


Pasos:
Creo mi nueva branch: nombreDeLaNuevaBranch
Chequeo que se haya creado: git branch
Me sitúo en mi nueva branch: git branch checkout nombreDeLaNuevaBranch
Chequeo estar en mi branch: git branch
Subo mis cambios:
  git add
  git commit 
  git push --set-upstream origin nombreDeLaNuevaBranch (1ra vez)
  git push (el resto de las veces)
Hago un pull request
Espero los approval
Hago merge a main
Borro la nueva branch desde GitHub
Borro la nueva branch localmente: 
  Me sitúo en main: git checkout main
  Borro la nueva branch: git branch -d nombreDeLaNuevaBranch
  Me traigo el main actualizado: git pull
  
Festejo y vuelvo a empezar ;)


