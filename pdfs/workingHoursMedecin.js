const fs = require('fs')
var Module = require('module');

Module._extensions['.png'] = function (module, fn) {
    var base64 = fs.readFileSync(fn).toString('base64');
    module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};
const logo1 = require('./assets/logo.png')
const logo2 = require('./assets/logo-background.png');

module.exports = ({ doctorNom, doctorPrenom, workingHours, annee, mois }) => {


    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const totalWorkingHours = workingHours.filter(date =>
        new Date(date).getMonth() + 1 == +mois
        && new Date(date).getFullYear() == +annee).length
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Honoraire Médecin</title>
    <style>
      .container-table {
        width: 100%;
      }
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        font-size: 18px;
        line-height: 20px;
        color: black;
        text-align: justify;
        font-family: "Times New Roman", Times, serif;
        background-image: url(images/logo2.jpg);
        background-repeat: no-repeat;
        background-size: 50%;
        background-position-x: right;
        background-position-y: bottom;
      }
      .bordure {
        border: 2px solid black;
        width: 80%;
      }
      .visa {
        border: 2px solid black;
        width: 30%;
        height: 100px;
      }
      .visa p {
        text-align: left;
      }
      .right {
        margin-right: 50px;
        text-align: right;
        font-family: "Helvetica Neue", "Helvetica";
      }
      .title {
        text-align: center;
        text-decoration: underline;
      }
      .objet {
        text-decoration: underline;
        width: 13%;
      }
      .periode {
        text-align: center;
      }
      .bottom {
        letter-spacing: 4px;
      }
      .remarque {
        font-weight: bold;
      }
      .signature {
        text-align: right;
        font-weight: bold;
      }
      .remarque2 {
        text-align: center;
        border-bottom: 1px solid rgb(167, 212, 186);
        padding: 0;
      }
      .contenu {
        width: 50%;
        margin: 0;
      }
      .footer {
        color: grey;
        word-spacing: 8px;
        font-weight: 3px;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <h2 class="right">Tunis le ../../....</h2>
      <table class="container-table" cellpadding="0" cellspacing="0">
        <tr>
          <td class="logo" style="width: 30px">
            <img src="images/logo.PNG" />
          </td>
          <td>
            <h2 style="font-style: italic">Facture N° ......</h2>
            <h2 style="font-style: italic">Docteur:${doctorNom} ${doctorPrenom}</h2>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: center">
            <h2 style="font-style: italic">
              Unité Médicale Régionale des Télécommunications de........
            </h2>
          </td>
        </tr>
      </table>

      <h2 class="title">Note Honoraires</h2>
      <table style="width: 100%; padding: 0">
        <tr>
          <td>
            <h3 class="objet">Objet:</h3>
          </td>
          <td>
            <p
              class="contenu"
              style="width: 100%; vertical-align: bottom; padding: 0"
            >
              note Honoraire du mois de (${monthNames[mois - 1]} ${annee})
            </p>
          </td>
        </tr>
        <tr style="padding: 0">
          <td style="width: 8%; padding: 0">
            <h3 class="objet">Référence:</h3>
          </td>
          <td>
            <p
              class="contenu"
              style="width: 100%; vertical-align: bottom; padding: 0"
            >
              Contrat conclu, avec la mutuelle des PTT,date du
            </p>
          </td>
        </tr>
      </table>
      <h3 class="bordure">
        Banque&Agence: (*) <br />
        Rib bancaire:...........................
      </h3>
      <h3
        class="periode"
        style="word-spacing: 10px; letter-spacing: 3px; font-style: italic"
      >
        Période du ../../.... au ../../....
      </h3>
      <p>Honoraire par heure:.........</p>
      <p>Nombre heure total par mois: ${totalWorkingHours}</p>
      <p>Honoraire du mois de (${monthNames[mois - 1]} ${annee})</p>
      <p>Montant des retenues à la source (3%) / (10%)</p>
      <p class="remarque">
        (En cas de régime fiscal réel: Merci de noter votre matricule fiscal)
      </p>
      <p>
        ..........................................................................................................
      </p>
      <p class="remarque">La présente note est arrêtée à la somme de :</p>
      <div style="height: 100px">
        <p class="signature">Signature du médecin</p>
      </div>
      <div class="visa" style="height: 150px">
        <p>
          Visa de la Direction Régionale <br />
          Des Télécommunications
        </p>
      </div>

      <p class="remarque2">
        (*)A remplir seulement en cas de changement de cordonnées bancaires
      </p>
      <p class="footer">
        Adresse: 1 rue ibnou charef 1007 Errabta - TEL:
        71573213-71572971-71560127- FAX: 17573813
      </p>
    </div>
  </body>
</html>

    `
}