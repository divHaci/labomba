function creaPorta(immagineSrc) {
    const porta = document.createElement("div");
    porta.className = "porta";
  
    // Creazione di un elemento immagine e impostazione del percorso src
    const immagine = document.createElement("img");
    immagine.src = immagineSrc;
    immagine.alt = "Descrizione dell'immagine"; // Aggiungi una descrizione appropriata
    immagine.style.borderColor = "white"
    // Aggiungi l'elemento immagine come figlio della porta
    porta.appendChild(immagine);
  
    // Aggiungi la porta al body del documento
    document.body.appendChild(porta);
  
    return porta;
  }
  
  // Esempio di utilizzo
  const percorsoImmagine = "../../img/porta/portaParalle.png";
  
  const porta1 = creaPorta(percorsoImmagine);

  // ... continua a creare più porte se necessario
  