document.addEventListener("DOMContentLoaded", function () {
    const teamSelect = document.getElementById("teamSelect");
    const chartContainer = document.getElementById("chartContainer");
    const toggleBallButton = document.getElementById("toggleBallButton");

    let ballAnimationActive = true;

    // Datos de los equipos
    const data = [
        {
            equip: "FC Barcelona",
            escut: "img/barcelona/barcelona.png",
            entrenador: { nomPersona: "Hansi Flick", foto: "img/barcelona/hansi_flick.png" },
            jugadors: [
                { nomPersona: "Marc-André ter Stegen", qualitat: 90, foto: "img/barcelona/ter_stegen.png", dorsal: 1, posicio: "Porter" },
                { nomPersona: "Lamine Yamal", qualitat: 95, foto: "img/barcelona/lamine_yamal.png", dorsal: 10, posicio: "Davanter" },
                { nomPersona: "Pau Cubarsí", qualitat: 85, foto: "img/barcelona/cubarsi.png", dorsal: 3, posicio: "Defensa" },
                { nomPersona: "Robert Lewandowski", qualitat: 94, foto: "img/barcelona/lewandowski.png", dorsal: 7, posicio: "Davanter" },
                { nomPersona: "Dani Olmo", qualitat: 88, foto: "img/barcelona/dani_olmo.png", dorsal: 5, posicio: "Migcampista" }
            ]
        },
        {
            equip: "Real Madrid CF",
            escut: "img/real_madrid/real_madrid_CF.png",
            entrenador: { nomPersona: "Carlo Ancelotti", foto: "img/real_madrid/carlo_ancelotti.png" },
            jugadors: [
                { nomPersona: "Vinicius Junior", qualitat: 89, foto: "img/real_madrid/vinicius_junior.png", dorsal: 9, posicio: "Davanter" },
                { nomPersona: "Luka Modric", qualitat: 87, foto: "img/real_madrid/luka_modric.png", dorsal: 19, posicio: "Migcampista" },
                { nomPersona: "Antonio Rüdiger", qualitat: 88, foto: "img/real_madrid/antonio_rudiger.png", dorsal: 4, posicio: "Defensa" },
                { nomPersona: "Dani Carvajal", qualitat: 85, foto: "img/real_madrid/dani_carvajal.png", dorsal: 17, posicio: "Defensa" },
                { nomPersona: "Jude Bellingham", qualitat: 86, foto: "img/real_madrid/jude_bellingham.png", dorsal: 8, posicio: "Migcampista" }
            ]
        }
    ];

    // Llenar el select de equipos
    data.forEach(team => {
        const option = document.createElement("option");
        option.value = team.equip;
        option.textContent = team.equip;
        teamSelect.appendChild(option);
    });

    // Función para renderizar el equipo seleccionado
    function renderChart(team) {
        chartContainer.innerHTML = ""; 

        const shield = document.createElement("img");
        shield.src = team.escut;
        shield.alt = `Escudo de ${team.equip}`;
        shield.className = "teamShield"; 
        chartContainer.appendChild(shield); 

        const coachContainer = document.createElement("div");
        coachContainer.className = "coachContainer"; 

        const coachImg = document.createElement("img");
        coachImg.src = team.entrenador.foto;
        coachImg.alt = `Foto de ${team.entrenador.nomPersona}`;
        coachImg.className = "coachImage"; 

        const coachName = document.createElement("p");
        coachName.textContent = `Entrenador: ${team.entrenador.nomPersona}`;

        coachContainer.appendChild(coachImg);
        coachContainer.appendChild(coachName);
        chartContainer.appendChild(coachContainer);

        team.jugadors.forEach(player => {
            const barContainer = document.createElement("div");
            barContainer.className = "barContainer";

            const playerImg = document.createElement("img");
            playerImg.src = player.foto;
            playerImg.alt = `Foto de ${player.nomPersona}`;
            playerImg.className = "playerImage"; 

            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.width = player.qualitat + "%";
            bar.textContent = `${player.nomPersona} (${player.qualitat}) - Dorsal: ${player.dorsal}, Posición: ${player.posicio}`;

            barContainer.appendChild(playerImg);
            barContainer.appendChild(bar);
            chartContainer.appendChild(barContainer);
        });
    }

    renderChart(data[0]);

    teamSelect.addEventListener("change", (e) => {
        const selectedTeam = data.find(team => team.equip === e.target.value);
        renderChart(selectedTeam);
    });

    // Animación de la pelota
    const canvas = document.getElementById("ballCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ball = { x: 50, y: 50, radius: 30, dx: 4, dy: 3, emoji: "⚽" };

    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.font = "50px Arial"; 
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 
        ctx.fillText(ball.emoji, ball.x, ball.y); 

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

        if (ballAnimationActive) requestAnimationFrame(drawBall);
    }

    drawBall(); 

    toggleBallButton.addEventListener("click", () => {
        ballAnimationActive = !ballAnimationActive;
        toggleBallButton.textContent = ballAnimationActive ? "Parar la pelota" : "Iniciar la pelota";
        if (ballAnimationActive) drawBall();
    });
});
