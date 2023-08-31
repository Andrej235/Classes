const contentWrapper = document.querySelector("#content-wrapper");
const daysInfo = [
    {
        "name": "Monday",
        "classIds": [
            15,
            15,
            7,
            7,
            4,
            13,
            11,
            11,
            15,
            15,
            15,
            15,
            15,
            15
        ]
    },
    {
        "name": "Tuesday",
        "classIds": [
            15,
            6,
            6,
            6,
            2,
            5,
            1,
            14,
            13,
            15,
            15,
            15,
            15,
            15
        ]
    },
    {
        "name": "Wednesday",
        "classIds": [
            15,
            1,
            1,
            2,
            3,
            8,
            8,
            8,
            15,
            15,
            15,
            15,
            15,
            15
        ]
    },
    {
        "name": "Thursday",
        "classIds": [
            3,
            12,
            5,
            11,
            11,
            4,
            4,
            15,
            15,
            15,
            15,
            15,
            15,
            15
        ]
    },
    {
        "name": "Friday",
        "classIds": [
            9,
            9,
            9,
            11,
            11,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15,
            15
        ]
    }
];

const ClassNames = [
    "Srpski",
    "Engleski",
    "Fizicko",
    "Matematika",
    "Sociologija",
    "Programiranje",
    "Baze podataka",
    "Računarski sistemi",
    "Veb programiranje",
    "Računari u sistemima upravljanja",
    "PIT",
    "Veronauka",
    "Poslovne komunikacije",
    "COS",
    "Empty"
]

const classTimes = [
    Time(7, 45, 8, 30),
    Time(8, 35, 9, 20),
    Time(9, 40, 10, 25),
    Time(10, 30, 11, 15),
    Time(11, 25, 12, 10),
    Time(12, 15, 13, 0),
    Time(13, 5, 13, 50),
    Time(14, 0, 14, 45),
    Time(14, 50, 15, 35),
    Time(15, 55, 16, 40),
    Time(16, 45, 17, 30),
    Time(17, 40, 18, 25),
    Time(18, 30, 19, 15),
    Time(19, 20, 20, 5),
]
console.log(classTimes);

function Time(startHour, startMinute, endHour, endMinute) {
    return {
        StartHour: startHour,
        StartMinute: startMinute,
        EndHour: endHour,
        EndMinute: endMinute
    }
}

let PrefixNumber = (number) => number < 10 && number > -10 ? `0${number}` : `${number}`;

GenerateTable();

async function GenerateTable(isMorningSelected = true) {
    contentWrapper.innerHTML = "";
    const table = document.createElement('table');

    const rows = [];
    for (var i = 0; i < 14; i++) {
        const newRow = document.createElement('tr');
        table.appendChild(newRow);

        const rowTime = document.createElement('td');
        const time = classTimes[i];
        rowTime.innerText = `${PrefixNumber(time.StartHour)}:${PrefixNumber(time.StartMinute)} - ${PrefixNumber(time.EndHour)}:${PrefixNumber(time.EndMinute)}`;
        newRow.appendChild(rowTime);

        const rowNumber = document.createElement('td');
        rowNumber.innerText = i + (isMorningSelected ? 1 : (-6));
        newRow.appendChild(rowNumber);

        rows.push(newRow);
    }

    if (!isMorningSelected)
        rows.reverse();

    for (var rowId = 0; rowId < rows.length; rowId++) {
        let isRowEmpty = true;

        daysInfo.forEach(dayInfo => {
            const newCell = document.createElement('td');
            const classId = dayInfo.classIds[rowId];

            if (classId != 15) {
                isRowEmpty = false;

                newCell.innerText = ClassNames[classId - 1];
                // fetch(`https://localhost:7116/api/${classId}`, {
                //     method: 'GET'
                // })
                //     .then(className => className.json())
                //     .then(className => newCell.innerText = className.value)
                //     .catch(err => console.error(err));
            }

            rows[rowId].appendChild(newCell);
        });

        if (isRowEmpty)
            rows[rowId].remove();
    }

    contentWrapper.appendChild(table);
    console.log(daysInfo)
}

const toggle = document.querySelector("#shift-toggle");
toggle.addEventListener("click", () => {
    toggle.dataset.state = toggle.dataset.state == 0 ? 1 : 0;
    GenerateTable(toggle.dataset.state == 0);
});