# ENGLISH TRANSLATION INCOMING

# Deploiement des jar sur Artifactory 

Tous les chapitres se font les uns à la suite des autres.

## Sommaire 
1. Configuration d'Artifactory
2. Configuration du settings.xml
3. Configuration du pom.xml
4. Script de déploiement

## Configuration d'Artifactory

Pour déployer sur Artifactory, nous allons créer deux dépôts. Un pour les Release et un pour les Snapshots.

1. Connectez-vous sur Artifactory en tant qu'admin.  
2. Aller dans **Admin** -> **Repositories Local** puis **New**
3. Créer les dépots **myproject_release** et **myproject_snapshots**.
4. Aller dans **Admin** -> **Repositories Virtual** et ajouter les dépots **myproject_release** et **myproject_snapshots** au dépot virtuel **myproject**

**Note :** Il est impossible de déployer sur un dépot virtuel.

## Configuration du settings.xml

Le fichier se décompose en deux parties : 
**une partie pour deployer**    
**une partie pour tirer les librairies**  
Vous trouverez directement le fichier `settings.xml` final dans les sources.  

1. Ajouter la partie pour déployer dans votre settings.xml (`~/.m2/settings.xml`) :

    ```xml
      <servers>
        <server>
          <username>USERNAME</username>
          <password>ENCRYPTED_PASSWORD</password>
          <id>release</id>
        </server>
        <server>
          <username>USERNAME</username>
          <password>ENCRYPTED_PASSWORD</password>
          <id>central</id>
        </server>
        <server>
          <username>USERNAME</username>
          <password>ENCRYPTED_PASSWORD</password>
          <id>snapshots</id>
        </server>
      </servers>
    ```
On peut ainsi déployer sur **release** et **snapshots**.  
**Note 1 :** Les **id** : **release** et **snapshots** peuvent être renommées en d'autres noms si on le souhaite, il faudra juste veiller à la cohérence avec le `pom.xml` *(cf. Configuration du pom.xml)*.

**Note 2 :** Pour obtenir votre mot de passe encrypté, connecter vous sur Artifactory avec votre compte (ici **username**), puis aller dans **User Profile** en cliquant que votre nom à côte de **Welcome, user**.  
Rentrer votre mot de passe et vous pourrez l'afficher dans le champ **Encrypted Password**

2. Ajouter la partie pour tirer les dépendences : 
   
   Lorsque nous déploierons nos projets, il serait utile de pouvoir les tirer depuis l'artifactory par la suite.
   Ajouter comme ci dessous les lignes nécessaires pour tirer aussi les librairies des dépots **snapshots et release**.  

    ```xml
    <profiles>
    <profile>
      <repositories>
        <repository>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
          <id>central</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </repository>
        <repository>
          <snapshots />
          <id>snapshots</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </repository>
        <repository>
          <snapshots />
          <id>release</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
          <id>central</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </pluginRepository>
        <pluginRepository>
          <snapshots />
          <id>snapshots</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </pluginRepository>
        <pluginRepository>
          <snapshots />
          <id>release</id>
          <name>USERNAME</name>
          <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject</url>
        </pluginRepository>
      </pluginRepositories>
      <id>artifactory</id>
        </profile>
      </profiles> 
      <activeProfiles>
        <activeProfile>artifactory</activeProfile>
      </activeProfiles>
    ```

    En effet comme tous les dépots appartiennent au dépot **myproject**, il suffit simplement de demander de tirer ce dernier.

## Configuration du pom.xml

Les commandes de release vont effectuer certaines opérations sur Gitlab et Artifactory que nous détaillerons par la suite.

### Connexion à git
 
1. Rajouter dans votre `pom.xml` les balises suivantes :

    ```xml
    <scm>
        <connection>scm:git:ADRESSE_SSH_PROJET_GIT</connection>
        <developerConnection>scm:git:ADRESSE_SSH_PROJET_GIT</developerConnection>
        <tag>HEAD</tag>
    </scm>
    ```

   La balide scm permet d'établir la connexion avec Gitlab (ou autre serveur git)  
   La sous balise tag est utilisée par `mvn release:prepare`, il sert à spécifier le tag qui a été créé lors de la release. En dehors d'une release il sert de placeholder et HEAD est une valeur par défaut. *(cf. original stackoverflow 23718601)*     

### Déploiement sur artifactory 

1. Rajouter dans votre `pom.xml` les balises suivantes :

    ```xml
    <distributionManagement>
        <repository>
            <id>release</id>
            <name>username</name>
            <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject_release</url>
        </repository>
        <snapshotRepository>
            <id>snapshots</id>
            <name>username</name>
            <url>http://ARTIFACTORY_IP:PORT/artifactory/myproject_snapshots</url>
        </snapshotRepository>
    </distributionManagement>    
    ```
    
    Il faut veillez à la cohérence entre les **id** mis ici et ceux présents dans les balises `servers` du `settings.xml`. 

    Lorsque nous effectuerons les commandes de release, maven va faire la correspondance entre l'utilisateur définit ici (balise **name**) et celui présent dans le `settings.xml`.
    Puis il va chercher celui que a le même **id** (d'où l'importance de la cohérence), pour ensuite se connecter avec le mot de passe définit dans le `settings.xml` et publier sur l'url ci-dessus.

    **Note :** Nous détaillerons plus en détail à quelles étapes maven va déployer sur le dépot pharos_release et le dépot pharos_snapshots

### Déploiement    

#### `mvn release:prepare`

1. Vérifie qu'il n'y a aucune modification dans le dossier git.
2. Vérifie que le projet est en version **X.X.X-SNAPSHOT**
3. Compile le projet en remplaçant **X.X.X-SNAPSHOT** en **X.X.X**
4. Met un tag git de la forme **NOMDUPROJET-X.X.X**
5. Remplace **X.X.X** dans le pom par **Y.Y.Y-SNAPSHOT** qui pourra être passé en paramètre
6. Compile avec la nouvelle version **Y.Y.Y-SNAPSHOT**
7. Push sur git

**Note :** la commande est intéractive et demande de rentrer au fur et à mesure diverse information (version release, version snapshot, tag). Pour éviter cela on mettra en argument `--batch-mode`.

#### `mvn release:perform`

Doit être lancée après le `prepare`.

1. Checkout sur le tag créé lors de `mvn release:prepare`
2. Compile
3. Déploie le jar sur le dépot release précisé dans le pom.xml *(cf. Déploiement sur artifactory )*

**Note :** pour un projet contenant des modules qui sont explicités dans le pom.xml la commande sera `mvn release:perform -Dgoal=nom_du_dossier_parent/pom.xml`

#### `mvn deploy`

1. Compile
2. Déploie sur votre dépot snapshot la version **Y.Y.Y-SNAPSHOT**

#### `mvn versions:update-parent`

1. Vérifie que le parent actuel est bien présent sur Artifactory
2. Vérifie si un parent plus récent est sur Artifactory (ou sinon peut récupérer un parent définit explicitement `-DparentVersion=[UNE_VERSION]` si elle est sur Artifactory)
3. Change le pom avec le nouveau parent

