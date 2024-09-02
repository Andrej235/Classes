"use strict";
class Time {
    constructor(startHour, startMinute, endHour, endMinute) {
        Object.defineProperty(this, "startHour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "startMinute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endHour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endMinute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.endHour = endHour;
        this.endMinute = endMinute;
    }
}
const contentWrapper = document.querySelector("#content-wrapper");
const shiftTite = document.querySelector("h1");
let currentSchedule = 0;
const schedules = [];
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
];
let shift = "morning";
document.querySelector("#shift-toggle")?.addEventListener("click", () => {
    shift = shift === "morning" ? "afternoon" : "morning";
    generateTable();
});
document.querySelectorAll(".radio-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        currentSchedule = parseInt(btn.dataset.scheduleId);
        document
            .querySelector(".radio-button.selected")
            ?.classList.remove("selected");
        btn.classList.add("selected");
        generateTable();
    });
});
console.log(timeTable);
let PrefixNumber = (number) => {
    return number >= 0 && number < 10
        ? `0${number}`
        : number > -10 && number < 0
            ? `-0${Math.abs(number)}`
            : `${number}`;
};
// This function generates a table representing a weekly schedule
generateTable();
async function generateTable() {
    const isMorningSelected = shift === "morning";
    contentWrapper.innerHTML = "";
    shiftTite.innerText = isMorningSelected ? "Prepodne" : "Poslepodne";
    const table = document.createElement("table");
    const dayRow = document.createElement("tr");
    dayRow.appendChild(document.createElement("td"));
    dayRow.appendChild(document.createElement("td"));
    schedules[currentSchedule].days.forEach((dayInfo) => {
        // Use currentSchedule to select the schedule
        const dayCell = document.createElement("td");
        dayCell.innerText = dayInfo.name;
        dayRow.appendChild(dayCell);
    });
    table.appendChild(dayRow);
    const rows = [];
    for (var i = 0; i < 14; i++) {
        const newRow = document.createElement("tr");
        table.appendChild(newRow);
        const rowTime = document.createElement("td");
        const time = timeTable[i];
        rowTime.innerText = `${PrefixNumber(time.startHour)}:${PrefixNumber(time.startMinute)} - ${PrefixNumber(time.endHour)}:${PrefixNumber(time.endMinute)}`;
        newRow.appendChild(rowTime);
        const rowNumber = document.createElement("td");
        rowNumber.innerText = (i + (isMorningSelected ? 1 : -6)).toString();
        newRow.appendChild(rowNumber);
        rows.push(newRow);
    }
    if (!isMorningSelected)
        rows.reverse();
    for (var rowId = 0; rowId < rows.length; rowId++) {
        let isRowEmpty = true;
        schedules[currentSchedule].days.forEach((dayInfo) => {
            // Use currentSchedule to select the schedule
            const newCell = document.createElement("td");
            const className = dayInfo.classes[rowId];
            if (className != "") {
                isRowEmpty = false;
                newCell.innerText = className;
            }
            rows[rowId].appendChild(newCell);
        });
        if (isRowEmpty)
            rows[rowId].remove();
    }
    contentWrapper.appendChild(table);
    console.log(schedules);
}
