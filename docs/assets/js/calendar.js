document.addEventListener("DOMContentLoaded", function () {
  const currentMonthYear = document.getElementById("current-month-year");
  const calendarDays = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const prevYearBtn = document.getElementById("prev-year");
  const nextYearBtn = document.getElementById("next-year");
  let selectedDay = null;

  let currentDate = new Date();

  // Événements de démonstration (peuvent être remplacés par vos propres événements)
  const demoEvents = {
    "2023-11-15": "Réunion d'équipe",
    "2023-11-20": "Rendez-vous client",
    "2023-12-05": "Présentation projet",
  };

  // Noms des mois en français
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  // Générer le calendrier
  function generateCalendar() {
    // Effacer les jours précédents
    calendarDays.innerHTML = "";

    // Définir le mois et l'année en cours
    currentMonthYear.textContent = `${
      monthNames[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;

    // Obtenir le premier jour du mois
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startingDay =
      firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Correction pour Lundi=0

    // Obtenir le nombre de jours dans le mois
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Obtenir le nombre de jours du mois précédent
    const daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    // Générer les jours du mois précédent
    for (let i = startingDay; i > 0; i--) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day", "inactive");
      dayElement.textContent = daysInLastMonth - i + 1;
      calendarDays.appendChild(dayElement);
    }

    // Générer les jours du mois actuel
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");

      // Vérifier si c'est aujourd'hui
      if (
        i === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()
      ) {
        dayElement.classList.add("current-day");
      }

      // Vérifier si ce jour a un événement
      const dateStr = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      if (demoEvents[dateStr]) {
        dayElement.classList.add("has-event");
        dayElement.title = demoEvents[dateStr];
      }

      dayElement.textContent = i;
      calendarDays.appendChild(dayElement);
    }

    // Calculer le nombre de jours restants à afficher
    const totalDaysShown = startingDay + daysInMonth;
    const remainingDays =
      totalDaysShown <= 35 ? 35 - totalDaysShown : 42 - totalDaysShown;

    // Générer les jours du mois suivant
    for (let i = 1; i <= remainingDays; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day", "inactive");
      dayElement.textContent = i;
      calendarDays.appendChild(dayElement);
    }
  }

  function bindDayClick() {
    calendarDays.onclick = function (e) {
      const dayDiv = e.target.closest(".calendar-day:not(.inactive)");
      if (!dayDiv) return;
      // Récupère le jour cliqué
      const day = Number(dayDiv.textContent);
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      // Récupère les tâches du jour
      let tasks = [];
      try {
        const allTasks = JSON.parse(localStorage.getItem("MesTaches")) || [];
        tasks = allTasks.filter((t) => {
          if (!t.createdAt) return false;
          const taskDate = new Date(t.createdAt);
          const taskDateStr = `${taskDate.getFullYear()}-${String(
            taskDate.getMonth() + 1
          ).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;
          return taskDateStr === dateStr;
        });
      } catch (e) {}
    if (window.app && window.app.ui && typeof window.app.ui.displayTasks === "function") {
      window.app.ui.displayTasks(tasks);
      if (tasks.length === 0) {
        const container = document.querySelector('.taskList');
        container.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche pour le ${day} ${monthNames[month-1]} ${year}</span></div>`;
      }
    }
    };
  }

  // Écouteurs d'événements pour les boutons de navigation
  prevMonthBtn.addEventListener("click", function () {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    generateCalendar();
    bindDayClick();
  });

  nextMonthBtn.addEventListener("click", function () {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    generateCalendar();
    bindDayClick();
  });

  prevYearBtn.addEventListener("click", function () {
    currentDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      1
    );
    generateCalendar();
    bindDayClick();
  });

  nextYearBtn.addEventListener("click", function () {
    currentDate = new Date(
      currentDate.getFullYear() + 1,
      currentDate.getMonth(),
      1
    );
    generateCalendar();
    bindDayClick();
  });

  // Générer le calendrier initial
  generateCalendar();
  bindDayClick();
});
