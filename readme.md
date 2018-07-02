# GarbaMap

Simple, utile et performant.

## Pourquoi ?

GarbaMap est cool et fun. Il s'agit d'une application mobile pour Android et iOS qui permet d'afficher tous simplement les garbaromes sur une carte :D. 

## Installation
1. Installer [Node js](http://nodejs.org/)
2. Installer [Ionic Framework](https://ionicframework.com/)
```bash
npm install -g ionic cordova
```
3. Créer un projet sur [Firebase](https://firebase.google.com/)
4. Télécharger ou cloner le repertoire 
```bash
git clone https://github.com/agazinakou/ionFood.git
```
5. Cliquer sur "Ajouter Firebase à votre application Web" dans la console firebase
6. Copier et coller le contenu dans src/app/app.firebase.config.ts
```bash
export const FIREBASE_CONFIG = {
    apiKey: "XXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXX",
    databaseURL: "XXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXX"
};
```
7. Utiliser le terminal et aller dans le repertoire du projet
```bash
npm install
```
8. Installer sur son téléphone :D
```bash
ionic cordova platform add android
ionic cordova build android
```

## Télécharger

 - [Android](https://www.google.com/)
 - [iOS](https://www.google.com/)

## Environment

```bash
Ionic CLI: 3.15.2 or greater
Ionic Framework: ^3.7.1
Angularfire2: ^5.0.0-rc.3
Firebase: ^4.6.0
Cordova CLI: ^7.0.1
```

## Contact me 

If you need technical support or have any questions, please send a message to agazinakou@gmail.com or via skype: aziiin5.

Don't re-invent the wheel, Just re-align It.