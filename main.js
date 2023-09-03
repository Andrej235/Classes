class Time {
    constructor(startHour, startMinute, endHour, endMinute) {
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
    }
}

class Day {
    constructor(name, classIds) {
        this.name = name;
        this.classIds = classIds;
    }
}

class Schedule {
    constructor(days = []) {
        this.days = days
    }
}

const contentWrapper = document.querySelector("#content-wrapper");
const shiftTite = document.querySelector("h1");
let currentSchedule = 0;

const schedules = [
    new Schedule([
        new Day("Ponedeljak", [15, 6, 6, 6, 4, 13, 15, 15, 15, 15, 15, 15, 15, 15]),
        new Day("Utorak", [15, 9, 9, 9, 2, 5, 1, 14, 13, 15, 15, 15, 15, 15]),
        new Day("Sreda", [15, 1, 1, 2, 3, 8, 7, 7, 15, 15, 15, 15, 15, 15]),
        new Day("Cetvrtak", [3, 12, 5, 11, 11, 4, 4, 15, 15, 15, 15, 15, 15, 15]),
        new Day("Petak", [15, 8, 8, 11, 11, 11, 11, 15, 15, 15, 15, 15, 15, 15])
    ]),
    new Schedule([
        new Day("Ponedeljak", [15, 15, 7, 7, 4, 13, 11, 11, 15, 15, 15, 15, 15, 15]),
        new Day("Utorak", [15, 6, 6, 6, 2, 5, 1, 14, 13, 15, 15, 15, 15, 15]),
        new Day("Sreda", [15, 1, 1, 2, 3, 8, 8, 8, 15, 15, 15, 15, 15, 15]),
        new Day("Cetvrtak", [3, 12, 5, 11, 11, 4, 4, 15, 15, 15, 15, 15, 15, 15]),
        new Day("Petak", [9, 9, 9, 11, 11, 15, 15, 15, 15, 15, 15, 15, 15, 15])
    ]),
    new Schedule([
        new Day("Ponedeljak", [15, 9, 9, 9, 4, 13, 15, 15, 15, 15, 15, 15, 15, 15]),
        new Day("Utorak", [15, 15, 7, 7, 2, 5, 1, 14, 13, 15, 15, 15, 15, 15]),
        new Day("Sreda", [15, 1, 1, 2, 3, 8, 11, 11, 8, 8, 15, 15, 15, 15]),
        new Day("Cetvrtak", [3, 12, 5, 11, 11, 4, 4, 15, 15, 15, 15, 15, 15, 15]),
        new Day("Petak", [6, 6, 6, 11, 11, 15, 15, 15, 15, 15, 15, 15, 15, 15])
    ])
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

const timeTable = [
    new Time(7, 45, 8, 30),
    new Time(8, 35, 9, 20),
    new Time(9, 40, 10, 25),
    new Time(10, 30, 11, 15),
    new Time(11, 25, 12, 10),
    new Time(12, 15, 13, 0),
    new Time(13, 5, 13, 50),
    new Time(14, 0, 14, 45),
    new Time(14, 50, 15, 35),
    new Time(15, 55, 16, 40),
    new Time(16, 45, 17, 30),
    new Time(17, 40, 18, 25),
    new Time(18, 30, 19, 15),
    new Time(19, 20, 20, 5),
]

const toggle = document.querySelector("#shift-toggle");
toggle.addEventListener("click", () => {
    toggle.dataset.state = toggle.dataset.state == 0 ? 1 : 0;
    GenerateTable(toggle.dataset.state == 0);
});

document.querySelectorAll('.radio-button').forEach(btn => {
    btn.addEventListener("click", () => {
        currentSchedule = parseInt(btn.dataset.scheduleId);
        GenerateTable(toggle.dataset.state == 0);
        document.querySelector('.radio-button.selected').classList.remove('selected');
        btn.classList.add('selected');
    })
});

console.log(timeTable);

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
    schedules[currentSchedule].days.forEach((dayInfo, i) => { // Use currentSchedule to select the schedule
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
        const time = timeTable[i];
        rowTime.innerText = `${PrefixNumber(time.startHour)}:${PrefixNumber(time.startMinute)} - ${PrefixNumber(time.endHour)}:${PrefixNumber(time.endMinute)}`;
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

        schedules[currentSchedule].days.forEach(dayInfo => { // Use currentSchedule to select the schedule
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
    console.log(schedules)
}