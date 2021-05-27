const moment = require('moment')
const trimestre = 4;
const year = 2021
dates = [
    "2021-10-25",
    "2021-01-10",
    "2021-03-28",
    "2021-06-13",
    "2021-08-29",
    "2021-10-24",
    "2021-01-16",
    "2021-07-21",
    "2021-11-11",
    "2021-03-12",
    "2021-06-25",
    "2021-02-24",
    "2021-08-14",
    "2021-07-21"
]

const presencesOfTheYear = dates.filter(date => new Date(date).getFullYear() === year)
let trimestrePresences
switch (trimestre) {
    case 1:
        trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() <= 2)

        break;
    case 2:
        trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 2 && new Date(date).getMonth() <= 5)

        break;
    case 3:
        trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 5 && new Date(date).getMonth() <= 8)

        break;
    case 4:
        trimestrePresences = presencesOfTheYear.filter(date => new Date(date).getMonth() > 8 && new Date(date).getMonth() <= 11)

        break;

    default:
        break;
}
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];
// console.log(trimestrePresences.map(date => {
//     return monthNames[new Date(date).getMonth()]
// }))

const daysInMonth = moment("2021-05").daysInMonth()
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
console.log(monthDays)
monthNames.splice(0, 3)
monthNames.splice(3, 3)
monthNames.splice(6, 3)
monthNames.splice(9, 3)