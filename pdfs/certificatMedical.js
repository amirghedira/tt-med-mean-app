module.exports = ({
    appointmentDate,
    doctorNom,
    doctorPrenom,
    patientNom,
    patientPrenom
}) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF Certificat médical</title>
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
          Ministère des Technologie <br />
          de la Communication <br />_________<br />
          SERVICE MEDICAL
        </p>
      </div>
      <div style="float: right">
        <p>وزارة تكنولوجيات الاتصال</p>
        <p style="text-align: right">____________</p>
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
          Date...................${appointmentDate}........................التاريخ
        </p>
      </div>

      <h2 style="text-align: center">شهــــــــــــــادة طبيــــــــــة</h2>
      <h2 style="text-align: center">CERTIFICAT MEDICAL</h2>
      <p style="text-align: center">
        Je soussigne,
        Dr......................................${doctorNom} ${doctorPrenom}...........................................:اني
        الممضي اسفله الدكتور
      </p>
      <p style="text-align: center">
        certifie que
        M:.......................................${patientNom} ${patientPrenom}......................................................................ان
        السيد(ة)
      </p>
      <p style="text-align: center">
        قد حضر(ت) عيادتنا هذا اليوم و ان حالته(ها) الصحية
        تستوجب..........................................................يوم راحة
        مرضية
      </p>

      <p style="text-align: right; margin-right: 40px">
        ابتداء من ................................. و في غياب مضاعفات
      </p>

      <p style="text-align: center">
        s'est présenté(e) ce jour à notre consultation. Son état de santé
        nécessite <br />un repos de ........................ jours à dater du
        ........................... et sauf complications.
      </p>
      <p style="text-align: center">الطبيب</p>
      <p style="text-align: center">Le Médecin</p>
    </div>
  </body>
</html>

`
}