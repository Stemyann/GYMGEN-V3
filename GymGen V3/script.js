document.getElementById("generer").addEventListener("click", function () {
    let jour = document.getElementById("jour").value;
    let groupe = document.getElementById("groupe").value;

    // Récupérer les valeurs de l'utilisateur
    let userSeries = document.getElementById("series").value;
    let userReps = document.getElementById("reps").value;
    let userTemps = document.getElementById("temps").value;
    let userRepos = document.getElementById("repos").value;

    // Liste des exercices
    let exercices = {
        "pecs": [
            { nom: "Pompes militaires" },
            { nom: "Pompes surélevées" },
            { nom: "Pompes sur tabouret" },
            { nom: "Pompes main sur haltères" },
            { nom: "Pompes explosives" }
        ],
        "epaules": [
            { nom: "Soulevé d'haltères vers le haut debout" },
            { nom: "Élévations frontales" },
            { nom: "Pompes hindoues" },
            { nom: "Soulevé d'haltères vers le haut assis" },
            { nom: "Pompes piquées" },
            { nom: "Gainage + Touché d'épaules", type: "temps" }
        ],
        "biceps": [
            { nom: "Curl" },
            { nom: "Curl assis" },
            { nom: "Curl marteau" },
            { nom: "Curl avant-bras" },
            { nom: "Curl Zootman" }
        ],
        "abdos": [
            { nom: "Crunchs" },
            { nom: "Cross crunchs" },
            { nom: "3,2,1 crunchs hold" },
            { nom: "Crunchs hug" },
            { nom: "Crunchs obliques" },
            { nom: "Crunchs kicks" },
            { nom: "Leg raises" },
            { nom: "Russian twists" },
            { nom: "Flutter kicks" },
            { nom: "Planche latérale", type: "temps" },
            { nom: "Planche", type: "temps" }
        ],
        "dos": [
            { nom: "Work upper back" },
            { nom: "Work middle back" },
            { nom: "Work lower back" },
            { nom: "Dumbbel pull" },
            { nom: "Superman" },
            { nom: "Tractions avec serviette" },
            { nom: "Trapeze work" }
        ],
        "triceps": [
            { nom: "Triceps pont" },
            { nom: "Dips sur lit" },
            { nom: "Triceps derrière la tête" },
            { nom: "Pompes diamant" }
        ]
    };

    let resultatHTML = `<h3>Exercices pour ${groupe.toUpperCase()} (${jour})</h3>`;

    if (groupe === "All") {
        Object.keys(exercices).forEach(muscle => {
            let exoList = exercices[muscle];
            let exo = exoList[Math.floor(Math.random() * exoList.length)];
            let typeAffichage = (exo.type === "temps") ? "secondes" : "reps";
            let valeur = (exo.type === "temps") ? userTemps : userReps;
            resultatHTML += `<p><b>${exo.nom} (${muscle})</b> - ${userSeries} séries de ${valeur} ${typeAffichage} <br><small style="color:gray;">Repos : ${userRepos} sec</small></p>`;

        });
    } else if (exercices[groupe]) {
        let exoList = exercices[groupe];
        let selection = [];
        while (selection.length < 2) {
            let exo = exoList[Math.floor(Math.random() * exoList.length)];
            if (!selection.includes(exo)) {
                selection.push(exo);
            }
        }

        selection.forEach(exo => {
            let typeAffichage = (exo.type === "temps") ? "secondes" : "reps";
            let valeur = (exo.type === "temps") ? userTemps : userReps;
            resultatHTML += `<p><b>${exo.nom}</b> - ${userSeries} séries de ${valeur} ${typeAffichage} <br><small style="color:gray;">Repos : ${userRepos} sec</small></p>`;

        });
    } else {
        resultatHTML = "<p style='color:red;'>Veuillez choisir un groupe musculaire valide.</p>";
    }

    document.getElementById("resultat").innerHTML = resultatHTML;
});


document.getElementById("exporter").addEventListener("click", function () {
    let resultatDiv = document.getElementById("resultat");

    if (resultatDiv.innerHTML.trim() === "") {
        alert("Veuillez générer des exercices avant d'exporter !");
        return;
    }

    html2canvas(resultatDiv).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let count = 1;

        let a = document.createElement("a");
        a.href = image;
        a.download = `exercices_de_la_semaine_${count + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert("Image enregistrée !");
    });
});
