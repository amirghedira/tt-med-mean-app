module.exports = ({ date }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
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
          <p class="text-align:left">وزارة تكنولوجيات الاتصال</p>
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
          Date....................${date}...................التاريخ
        </p>
      </div>
      <div>
      <h2 style="text-align: center">وصفــــــــة طبيــــــــــة</h2>
      </div>
      <div>
      <h2 style="text-align: center ">ORDONNANCE MEDICALE</h2>
      </div>
    </div>
  </body>
</html>
`
}