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
    <title>PDF Certificat Présence</title>
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
      .right {
        text-align: right;
        font-family: "Helvetica Neue", "Helvetica";
      }
      td {
        width: 200px;
      }
      .header-left {
        text-align: left;
      }
      .header-right {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <div style="width: 50%; float: left">
        <p>
          Ministère des Technologie <br />
          de la Communication <br />_________<br />
          SERVICE MEDICAL
        </p>
      </div>
      <div style="float: right; margin-bottom: 50px">
        <p class="header-right">وزارة تكنولوجيات الاتصال</p>
        <p class="header-right">المصلحة الطبية</p>
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
          Date......................${appointmentDate}.......................التاريخ
        </p>
      </div>

      <h2 style="text-align: center">شهــــــــادة الحضــــــــور</h2>
      <h2 style="text-align: center">CERTIFICAT DE PRESENCE</h2>
      <p style="text-align: center">
        Je soussigne,
        Dr...........................${doctorNom} ${doctorPrenom}..............................................:اني
        الممضي اسفله الدكتور
      </p>
      <p style="text-align: center">
        certifie que
        M:............................${patientNom} ${patientPrenom}.....................................ان
        السيد(ة)
      </p>
      <p style="text-align: right; margin-right: 40px">
        s'est présenté(e) ce jour à notre consultation. قد حضر(ت) عيادتنا هذا
        اليوم
        <br />
      </p>
      <p style="text-align: center">الطبيب</p>
      <p style="text-align: center">Le Médecin</p>
    </div>
  </body>
</html>

`
}