
<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="150" style="float: right;" src="https://miriadax.net/miriadax-theme/images/custom/logo_miriadax_new.svg">

<br/><br/><br/>

# Módulo 3: Repositorios local y remoto, directorio de trabajo, commit, raw máster (principal), ramas remotas, GitHub y los comandos Git: add, checkout, diff, init, log, mv, reset, rm, status y commit - Entrega P2P: Commit

Versión: 27 de octubre de 2021

## Objetivos
 * Crear repositorios en Github
 * Practicar con repositorios locales y remotos
 * Crear commits en un repositorio

## Descripción de la práctica

En esta práctica crearemos nuestro primer repositorio de Github. Para ello, primero habrá que crear una cuenta en [Github](https://github.com). Crearemos un repositorio de nombre **my_calculator** en dicha cuenta, en el que alojaremos un pequeño desarrollo de software consistente en una calculadora web. 

Para comenzar este desarrollo, iniciamos un repositorio de git local. En la rama main se desarrollará en dos commits una calculadora con 2 botones. En el primer commit  se añade la calculadora con el botón x^3, además de un fichero README.md con un breve texto descriptivo. En el segundo se añade el botón x^4 a la calculadora. 

Para terminar se sube la rama main del repositorio local al repositorio remoto en Github que hemos creado al principio.



## Tareas

### Paso 1: Creación de repositorio remoto
El primer paso a seguir es crear una cuenta en Github, si no se tiene. A continuación, creamos un nuevo repositorio con el nombre "my_calculator".

### Paso 2: Creación de repositorio local
En un terminal de nuestro ordenador iniciamos un repositorio local de git. Si se tiene el sistema operativo Windows, se recomienda emplear [Git Bash](https://gitforwindows.org/) como terminal.
```
$ git init my_calculator
$ cd my_calculator
```
y le asignamos el repositorio remoto que acabamos de crear
```
$ git remote add origin git@github.com/<mi usuario de github>/my_calculator.git
```

Por ejemplo, si tu usuario es `pepe`, el comando sería:
```
$ git remote add origin git@github.com/pepe/my_calculator.git
```

### Paso 3: Añadir ficheros al repositorio

Añadir al directorio de trabajo un fichero con el nombre "index.html". Este fichero contendrá una calculadora web con un botón para calcular el cubo del número introducido:
```
<!DOCTYPE html>
<html>
	<head>
		<title>Calculator</title>
		<meta charset="utf-8">
	</head>
	<body>
		<h1>Calculadora de ……su nombre y apellidos……</h1>
		Number:
		<input type="text" id="n1">
		<p>
			<button onclick="cube()"> x^3 </button>
		</p>
		<script type="text/javascript">
			function cube() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 3);
			}
		</script>
	</body>
</html>
```
En la etiqueta h1 debes modificar el texto para incluir tu nombre y apellidos

### Paso 4: Registrar cambios
A continuación, hay que registrar los ficheros en el índice y crear el primer commit en la rama main. Se recuerda que antes de crear un commit hay que probar siempre que el programa que se va a guardar funciona correctamente (en este caso, abriéndolo en el navegador web y probando que funciona la calculadora).

```
$ git add index.html # Añadir el fichero creado
$ git commit -m "x^3 button" # Congelar los cambios en un commit
$ git log --oneline # Ver la lista de commits
```

## Paso 5: Crear un segundo commit
Debe crear un segundo commit en la rama en la que está trabajando (main). 
El commit debe añadir a la calculadora (fichero index.html) un segundo botón (elemento HTML `<button ..>`) que eleve un número a la cuarta potencia (x^4) invocando una función (power_4 ()) que calcula x^4 al hacer click en él.

```
<!DOCTYPE html>
<html>
	<head>
		<title>Calculator</title>
		<meta charset="utf-8">
	</head>
	<body>
		<h1>Calculadora de ……su nombre y apellidos……</h1>
		Number:
		<input type="text" id="n1">
		<p>
			<button onclick="cube()"> x^3 </button>
			<button onclick="power_4()"> x^4</button>
		</p>
		<script type="text/javascript">
			function cube() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 3);
			}
			function power_4() {
				var num = document.getElementById("n1");
				num.value = Math.pow(num.value, 4);
			}
		</script>
	</body>
</html>
```

Una vez añadido el código del nuevo nuevo botón a la calculadora y después de probar que funciona correctamente, registrar los cambios en el índice y crear el nuevo commit.

```
$ git add index.html
$ git commit -m "x^4 button"
```

### Paso 6: Subir el repositorio a Github

Para finalizar, hay que subir el repositorio local al repositorio remoto creado en Github inicialmente.

```
$ git push origin main
```


## Prueba de la práctica

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado. Para utilizar esta herramienta debes tener node.js (y npm) ([https://nodejs.org/es/](https://nodejs.org/es/)) y Git instalados. Primero ejecute los siguientes comandos **en un directorio diferente al de la práctica**:

```
$ git clone git@github.com:ging-moocs/MOOC_git_mod3-commit_entrega
$ cd MOOC_git_mod3-commit_entrega
$ npm install
```

A continuación guarde en un fichero llamado 'git_account' su nombre de usuario de GitHub
```
echo "mi_nombre_de_usuario_en_github" >> git_account
```

Para instalar y hacer uso de la [herramienta de autocorrección](https://www.npmjs.com/package/autocorector) en el ordenador local, ejecuta los siguientes comandos en el directorio del proyecto:

```
$ sudo npm install -g autocorector     ## Instala el programa de test
$ autocorector                    ## Pasa los tests al fichero a entregar
............................      ## en el directorio de trabajo
... (resultado de los tests)
```
También se puede instalar como paquete local, en el caso de que no se dispongas de permisos en el ordenador desde el que estás trabajando:
```
$ npm install autocorector     ## Instala el programa de test
$ npx autocorector             ## Pasa los tests al fichero a entregar
............................   ## en el directorio de trabajo
... (resultado de los tests)
```

Se puede pasar la herramienta de autoorrección tantas veces como se desee sin ninguna repercusión en la calificación.

## Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a MiriadaX con el siguiente comando:
```
$ autocorector --upload
```
o, si se ha instalado como paquete local:
```
$ npx autocorector --upload
```

La herramienta de autocorrección preguntará por el correo del alumno y el token de MiriadaX. En [este enlace](https://docs.google.com/presentation/d/e/2PACX-1vRYA9npW0Xg_c6_SWg2jAU7L2ti83-GY1VYKTzM1U5AgsW-0BC3xbwi__gsrsZ50Md0ja2HyadNzEPn/pub?start=false&loop=false&delayms=5000) se proveen instrucciones para encontrar dicho token.


**RUBRICA**: La resolución de cada uno de estos puntos dará un el % indicado de la nota total: 
-	**20%:**  Existe el repositorio my_calculator 
-	**40%:**  El primer commit de la rama main es “x^3 button” y contiene lo pedido
-	**40%:**  El segundo commit de la rama main es “x^4 button” y contiene lo pedido