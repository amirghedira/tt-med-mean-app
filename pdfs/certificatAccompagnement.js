module.exports = (
    {
        appointmentDate,
        doctorNom,
        doctorPrenom,
        patientNom,
        patientPrenom
    }
) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF Certificat accompagnement</title>
    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        font-size: 18px;
        line-height: 20px;
        color: black;
        text-align: justify;
        font-family: "Times New Roman", Times, serif;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <div style="width: 48%; float: left">
        <p>
          Ministère des Technologie de la Communication <br />_________<br />
          SERVICE MEDICAL
        </p>
      </div>
      <div style="float: right">
        <p style="text-align: right">
          وزارة تكنولوجيات الاتصال <br />_________________
        </p>
        <p style="text-align: right">المصلحة الطبية</p>
      </div>
      <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <p>
          Date.....................${appointmentDate}.......................التاريخ
        </p>
      </div>

      <h2 style="text-align: center">شهــــــــــــــادة طبيــــــــــة</h2>
      <h2 style="text-align: center">CERTIFICAT MEDICAL</h2>
      <p style="text-align: left">
        Je soussigne,
        Dr.........................................${doctorNom} ${doctorPrenom}.............................:اني
        الممضي اسفله الدكتور
      </p>
      <p style="text-align: left">
        certifie avoir examiné ce
        jour...................................${patientNom} ${patientPrenom}..............................اشهد
        بعد فحص هذا اليوم
      </p>
      <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <p>
          et déclare que son état de santé nécessite la présence de son
          Père/Mère/Fils
        </p>
      </div>
      <div
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <p>وأعلن أن حالته الصحية تتطلب حضور أبيه / أمه / ابنه</p>
      </div>
      <p style="text-align: center"></p>

      <p style="text-align: left">
        .................................................................................pendant...............................................................................
      </p>
      <p style="text-align: center">الطبيب</p>
      <p style="text-align: center">Le Médecin</p>
    </div>
  </body>
</html>
`
}