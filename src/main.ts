class Time {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;

  constructor(
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) {
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
  }
}

type DayName = "Ponedeljak" | "Utorak" | "Sreda" | "Cetvrtak" | "Petak";
type ClassName =
  | "Programiranje"
  | "Veb programiranje"
  | "PIT"
  | "Elektronsko poslovanje"
  | "Preduzetnistvo"
  | "Racunarske mreze i sistemi"
  | "Zastita informacionih sistema"
  | "Veronauka"
  | "Matematika"
  | "Engleski"
  | "COS"
  | "Srpski"
  | "Fizicko"
  | "";
type Shift = "morning" | "afternoon";

type Day = {
  name: DayName;
  classes: ClassName[];
};
type Schedule = {
  [shift in Shift]: Day[];
};

const contentWrapper = document.querySelector("#content-wrapper")!;
const shiftTite = document.querySelector("h1")!;
let currentSchedule = 0;

const schedules: Schedule[] = [
  {
    afternoon: [
      {
        name: "Ponedeljak",
        classes: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "Fizicko",
          "Racunarske mreze i sistemi",
          "Racunarske mreze i sistemi",
          "PIT",
          "PIT",
          "Elektronsko poslovanje",
          "Elektronsko poslovanje",
        ],
      },
      {
        name: "Utorak",
        classes: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "Matematika",
          "Matematika",
          "Srpski",
          "Veb programiranje",
          "Veb programiranje",
          "Zastita informacionih sistema",
          "Zastita informacionih sistema",
        ],
      },
      {
        name: "Sreda",
        classes: [
          "",
          "",
          "",
          "",
          "",
          "",
          "Programiranje",
          "Programiranje",
          "Programiranje",
          "Programiranje",
          "Preduzetnistvo",
          "Preduzetnistvo",
          "",
          "",
        ],
      },
      {
        name: "Cetvrtak",
        classes: [
          "",
          "",
          "",
          "",
          "",
          "",
          "Veronauka",
          "COS",
          "Racunarske mreze i sistemi",
          "Engleski",
          "PIT",
          "PIT",
          "PIT",
          "PIT",
        ],
      },
      {
        name: "Petak",
        classes: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "Srpski",
          "Srpski",
          "Matematika",
          "Engleski",
          "Fizicko",
          "Veb programiranje",
          "Veb programiranje",
        ],
      },
    ],
    morning: [
      {
        name: "Ponedeljak",
        classes: [
          "Elektronsko poslovanje",
          "Elektronsko poslovanje",
          "PIT",
          "PIT",
          "Racunarske mreze i sistemi",
          "Racunarske mreze i sistemi",
          "Fizicko",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
      {
        name: "Utorak",
        classes: [
          "Zastita informacionih sistema",
          "Zastita informacionih sistema",
          "Veb programiranje",
          "Veb programiranje",
          "Srpski",
          "Matematika",
          "Matematika",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
      {
        name: "Sreda",
        classes: [
          "",
          "",
          "Preduzetnistvo",
          "Preduzetnistvo",
          "Programiranje",
          "Programiranje",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
      {
        name: "Cetvrtak",
        classes: [
          "PIT",
          "PIT",
          "PIT",
          "PIT",
          "Engleski",
          "Racunarske mreze i sistemi",
          "COS",
          "Veronauka",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
      {
        name: "Petak",
        classes: [
          "",
          "",
          "Fizicko",
          "Engleski",
          "Matematika",
          "Srpski",
          "Srpski",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
    ],
  },
];

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

let shift: Shift = "morning";
document.querySelector("#shift-toggle")?.addEventListener("click", (e) => {
  shift = shift === "morning" ? "afternoon" : "morning";
  const target = e.target as HTMLElement;

  if (target.classList.contains("toggle-wrapper"))
    target.dataset.state = shift === "morning" ? "morning" : "afternoon";
  else
    target.parentElement!.dataset.state =
      shift === "morning" ? "morning" : "afternoon";
  generateTable();
});

document.querySelectorAll(".radio-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSchedule = parseInt((btn as HTMLElement).dataset.scheduleId!);

    document
      .querySelector(".radio-button.selected")
      ?.classList.remove("selected");

    btn.classList.add("selected");
    generateTable();
  });
});

let PrefixNumber = (number: number) => {
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

  schedules[currentSchedule][shift].forEach((dayInfo) => {
    // Use currentSchedule to select the schedule
    const dayCell = document.createElement("td");
    dayCell.innerText = dayInfo.name;
    dayRow.appendChild(dayCell);
  });
  table.appendChild(dayRow);

  const rows: HTMLTableRowElement[] = [];
  for (var i = 0; i < 14; i++) {
    const newRow = document.createElement("tr");
    table.appendChild(newRow);

    const rowTime = document.createElement("td");
    const time = timeTable[i];
    rowTime.innerText = `${PrefixNumber(time.startHour)}:${PrefixNumber(
      time.startMinute
    )} - ${PrefixNumber(time.endHour)}:${PrefixNumber(time.endMinute)}`;
    newRow.appendChild(rowTime);

    const rowNumber = document.createElement("td");
    rowNumber.innerText = (i + (isMorningSelected ? 1 : -6)).toString();
    newRow.appendChild(rowNumber);

    rows.push(newRow);
  }

  for (var rowId = 0; rowId < rows.length; rowId++) {
    let isRowEmpty = true;

    schedules[currentSchedule][shift].forEach((dayInfo) => {
      // Use currentSchedule to select the schedule
      const newCell = document.createElement("td");
      const className = dayInfo.classes[rowId];

      if (className != "") {
        isRowEmpty = false;
        newCell.innerText = className;
      }

      rows[rowId].appendChild(newCell);
    });

    if (isRowEmpty) rows[rowId].remove();
  }

  contentWrapper.appendChild(table);
}
