module.exports = ({ doctorNom, doctorPrenom, patientNom, patientPrenom, patientLieu, patientDate_n }) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF Certificat Mariage</title>
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
      <div style="text-align: right;">
          <h2 style="text-align: center; text-decoration: underline;">-الشهادة الطبيــــــة السابقــــــة للزواج-
        </h2>
        <p style="text-align: right;">اني الممضي اسفله الدكتور</p>
        <p style="text-align: right;">${doctorNom} ${doctorPrenom}:الاسم و اللقب</p>
        <p style="text-align: right;">دكتور في الطب،الاختصاص: طب عام</p>
        <p style="text-align: right;">:رقم التسجيل بمجلس عمادة الاطباء</p>
        <p style="text-align: right;">:المباشر ب</p>
        <p style="text-align: right;">العنوان:العدد</p>
        <p style="text-align: right;">المدينة/المنطقة/الولاية: بنزرت</p>
        <p style="text-align: right;">اشهد باني قمت لغاية الزواج بفحص</p>
        <p style="text-align: right;">${patientNom} ${patientPrenom}:السيد(ة)</p>
        <p style="text-align: right;"> ${patientDate_n} :المولود(ة) في</p>
        <p style="text-align: right;"> ${patientLieu} :القاطن(ة) ب</p>
        <p style="text-align: right;">بطاقة التعريف الوطنية عدد:............. مسلمة</p>
        <p style="text-align: right;">حررت هذه الشهادة بعد استجواب مدقق و فحص سريري كامل و بعد اطلاعي على نتائج الفحوص التكميلية التالية:((وضع علامة × في المربع))</p>
         <p style="text-align: right;">:فصيلة الدم</p>
         <div  style="border: 1px solid black; width: 40px; height: 20px; float: right;"></div> <br>
        <p style="text-align: right;">:التهاب الكبد الفيروسي صنف ب </p>
        <div  style="border: 1px solid black; width: 40px; height: 20px; float: right;"></div> <br>
        <p style="text-align: right;">:و صنف ج</p>
        <div  style="border: 1px solid black; width: 40px; height: 20px; float: right;"></div> <br>
        <p style="text-align: right;">صور بالاشعة السينية للصدر</p>
        <div  style="border: 1px solid black; width: 40px; height: 20px; float: right;"></div> <br>
        <p style="text-align: right;">فحوص اخرى</p>
        <div  style="border: 1px solid black; width: 40px; height: 20px; float: right;"></div> <br>

        <p style="text-align: right;"> اصرح علاوة على ذلك باني</p>
        <p style="text-align: right;">علمت المعني(ة) بالامر بنتائج الفحوص السريرية و التكميلية و بالاعمال التي من شأنها الوقاية او الحد من اخطارها على قرينه(ها) و ابنائه(ها)</p>
        <p style="text-align: right;">لفت نظر الزوجة المفترضة الي امكانية الاصابة بالحميراء خلال فترة الحمل و اعلمتها بوجود تلقيح لذلك</p>
        <p style="text-align: right;">كدت على عوامل الخطر المهنية لبعض الامراض(مرض السكري،ضغط الدم...الخ)</p>
        <p style="text-align: right;">نصحت المعني(ة) بالامر باجراء تلقيح ضد التهاب الكبد من صنف ب</p>
        <p style="text-align: right;">قدمت نصائح تتعلق بالعوامل الوراثية بما في ذلك تلك المرتبطة بالقرابة بين الزوجين المفترضين و نصائح تتعلق بطرق تنظيم الولادات، ضرورة مراقبة الحمل</p>
        <p style="text-align: right;">و بحكم هذا، سلمت هذة الشهادة مباشرة بالمعني(ة) بالامر للاستظهار بها لدى من له النظر</p>
        <p style="text-align:center;">حرر ب....... في</p>
        <p style="text-align:center; margin-bottom: 30px; ">الامضاء و الختم</p>
        <p style="text-align: right;">_________________________</p>
        <footer style="text-align: right;">ملاحظة:يعاقب بالسجن لمدة تتراوح بين سنة و ثلاثة سنوات كل شخص يعلم بانه مصاب بمرض سار و يسعى عمدا، من خلال سلوكه الى نقله الى آخرين (القانون عدد 71 لسنة 1992 المؤرخ في 27 جويلة 1992 المتعلق بالامراض السارية:الفصلين 11 و 18)</footer>
    </div>
  </body>
</html>

    `
}