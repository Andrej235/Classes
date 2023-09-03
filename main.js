const contentWrapper = document.querySelector("#content-wrapper");

const shiftTite = document.querySelector("h1");

const daysInfo = [
    {
        "name": "Ponedeljak",
        "classIds": [
            15,
            6,
            6,
            6,
            4,
            13,
            15,
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
        "name": "Utorak",
        "classIds": [
            15,
            9,
            9,
            9,
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
        "name": "Sreda",
        "classIds": [
            15,
            1,
            1,
            2,
            3,
            8,
            7,
            7,
            15,
            15,
            15,
            15,
            15,
            15
        ]
    },
    {
        "name": "Cetvrtak",
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
        "name": "Petak",
        "classIds": [
            15,
            8,
            8,
            11,
            11,
            11,
            11,
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
    /*1*/"Srpski",
    /*2*/"Engleski",
    /*3*/"Fizicko",
    /*4*/"Matematika",
    /*5*/"Sociologija",
    /*6*/"Programiranje",
    /*7*/"Baze podataka",
    /*8*/"Računarski sistemi",
    /*9*/"Veb programiranje",
    /*10*/"Računari u sistemima upravljanja",
    /*11*/"PIT",
    /*12*/"Veronauka",
    /*13*/"Poslovne komunikacije",
    /*14*/"COS",
    /*15*/"Empty"
]

const classTimes = [
    Time(-7, 45, 8, 30),
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

let PrefixNumber = (number) => {
    return (number >= 0 && number < 10) ? `0${number}` :
           (number > -10 && number < 0) ? `-0${Math.abs(number)}` :
           `${number}`;
};

// Call the GenerateTable function with the default parameter (isMorningSelected = true)
// This function generates a table representing a weekly schedule
// If isMorningSelected is true, the table represents a morning schedule
// If isMorningSelected is false, the table represents an afternoon schedule
GenerateTable();

async function GenerateTable(isMorningSelected = true) {
    contentWrapper.innerHTML = "";

    shiftTite.innerText = isMorningSelected ? "Prepodne" : "Poslepodne";

    const table = document.createElement('table');
    const dayRow = document.createElement("tr");
    dayRow.appendChild(document.createElement("td"));
    dayRow.appendChild(document.createElement("td"));
    daysInfo.forEach((dayInfo, i) =>{
        const dayCell = document.createElement("td");
        dayCell.innerText = dayInfo.name
        dayRow.appendChild(dayCell);
    });
    table.appendChild(dayRow);

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