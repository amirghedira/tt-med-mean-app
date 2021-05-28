const moment = require('moment')
const fs = require('fs')
var Module = require('module');

Module._extensions['.png'] = function (module, fn) {
    var base64 = fs.readFileSync(fn).toString('base64');
    module._compile('module.exports="data:image/jpg;base64,' + base64 + '"', fn);
};
const logo1 = require('./assets/logo.png')
const logo2 = require('./assets/logo-background.png');

module.exports = ({ doctorPrenom, doctorNom, trimestre, annee, workingHours }) => {


    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let months
    const presencesOfTheYear = workingHours.filter(date => new Date(date).getFullYear() == annee)
    let trimestrePresences
    switch (trimestre) {
        case 1:
            months = monthNames.splice(0, 3)
            trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() <= 2)

            break;
        case 2:

            months = monthNames.splice(3, 3)
            trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 2 && new Date(date).getMonth() <= 5)


            break;
        case 3:

            months = monthNames.splice(6, 3)
            trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 5 && new Date(date).getMonth() <= 8)


            break;
        case 4:

            months = months.splice(9, 3)
            trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 8 && new Date(date).getMonth() <= 11)


            break;

        default:
            break;
    }

    const getMonth = (index) => {
        let monthNumber;
        switch (trimestre) {
            case 1:
                monthNumber = index
                break;
            case 2:
                monthNumber = index + 3
                break;
            case 3:
                monthNumber = index + 6

                break;
            case 4:
                monthNumber = index + 9
                break;
            default:
                break;
        }
        monthNumber++;
        return monthNumber
    }

    const getDaysInMonth = (index) => {
        let monthNumber = getMonth(index)
        if (monthNumber < 10)
            monthNumber = `0${monthNumber + 1}`
        const daysInMonth = moment(`${annee}-${monthNumber}`).daysInMonth()
        let monthDays = [];
        let j = 0
        let i;
        for (i = 1; i <= daysInMonth; i++) {
            if (!monthDays[j])
                monthDays[j] = [i]
            else
                monthDays[j].push(i)
            if (i % 7 == 0) {
                j++;
            }
        }
        return monthDays

    }

    const checkWorkedDay = (monthIndex, day) => {
        let monthNumber = getMonth(monthIndex)
        if (monthNumber < 10)
            monthNumber = `0${monthNumber + 1}`
        const date = new Date(`${annee}-${monthNumber}-${day}`)
        return trimestrePresences.findIndex(presence => {
            return moment(new Date(presence)).isSame(moment(date), 'day')
        }) >= 0
    }

    const getMonthTotalWorkingHours = (monthIndex) => {

        const monthNumber = getMonth(monthIndex)
        return trimestrePresences.filter(date => new Date(date).getMonth() == monthNumber).length

    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Consulter Présence</title>
        <style>
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                font-size: 16px;
                line-height: 24px;
                color: black;
                font-family: "Times New Roman", Times, serif;
                /*  background-image: url(${logo2}); */
                background-repeat: no-repeat;
                background-size: 45%;
                background-position-x: right;
                background-position-y: bottom;
            }

            .worked-day{
                background-color:#2474f1;
                color:white;
                border-radius:50%;
                height:40px;
                padding:0;
                width:40px;
            }
    
            .invoice-box table tr td {
                text-align: center;
            }
    
            th,
            td {
                padding: 10px;
                text-align: center;
            }
    
            .presencetable .FirstTd,
            .FirstTh {
                border: 1px solid black;
                border-collapse: collapse;
            }
    
            .left {
                text-align: left;
            }
    
            .logo {
                vertical-align: top;
            }
    
            .total {
                width: 80px;
                height: 50px;
                border: 1px solid black;
            }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table class="container-table" cellpadding='0' cellspacing="0">
                <table>
                    <tr>
                        <td class="logo">
                        <!-- <img src=${logo1} height="150px"> -->
                        </td>
                        <td>
                            <h2 style="font-style: italic;">Note de Présence ${trimestre > 1 ? `${trimestre}eme` : `${trimestre}er`} Trimestre ${annee}</h2>
                            <h2 style="font-style: italic;">Direction Régionale Des Télécommunications</h2>
                            <h2 class="left" style="font-style: italic;">Dr ${doctorNom} ${doctorPrenom}</h2>
                            <table class="presencetable">
                                <tr>
                                    <th class="FirstTh">Mois de <br> consultation</th>
                                    <th class="FirstTh">Jour de consultation</th>
                                    <th class="FirstTh">
                                        Cachet& <br />
                                        Signature<br />
                                        Du médecin
                                    </th>
                                </tr>
                               ${months.map((month, i) => (
        `
                                   <tr>
                                    <td class="FirstTd">${month}</td>
                                    <td class="FirstTd">
                                        <table>
                                            <tr>
                                                <th>Lu</th>
                                                <th>Ma</th>
                                                <th>Me</th>
                                                <th>Je</th>
                                                <th>Ve</th>
                                                <th>Sa</th>
                                                <th>Di</th>
                                            </tr>
                                            ${getDaysInMonth(i).map(week => (`<tr>
                                                ${week.map(day => {
            if (checkWorkedDay(i, day))
                return (`<td class="worked-day">${day}</td>`)
            return (`<td>${day}</td>`)
        }).join('')}</tr>`)).join('')}
                                        </table>
                                    </td>
                                    <td class="FirstTd">
                                        <div class="total">${getMonthTotalWorkingHours(i)}</div>
                                    </td>
                                </tr>`)).join('')}
                            </table>
                        </td>
                    </tr>
                </table>
            </table>
        </div>
    </body>
    
    </html>
`
}