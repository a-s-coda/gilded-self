const dadosMapa = [
    { id: "goth", nome: "Goth", x: 50, y: 50, conexoes: ["vitoriano", "dark-academia", "cybergoth", "social-goth"] },

    { id: "vitoriano", nome: "Vitoriano", x: 50, y: 15, conexoes: ["grunge", "dark-academia"] },
    { id: "grunge", nome: "Grunge", x: 32, y: 35, conexoes: ["soft-grunge", "punk"] },
    { id: "punk", nome: "Punk", x: 25, y: 58, conexoes: ["social-goth"] },
    { id: "social-goth", nome: "Social Goth", x: 35, y: 78, conexoes: ["cybergoth"] },
    { id: "cybergoth", nome: "Cybergoth", x: 68, y: 72, conexoes: ["y2k", "dark-academia"] },
    { id: "dark-academia", nome: "Dark Academia", x: 68, y: 45, conexoes: ["old-money"] },

    { id: "soft-grunge", nome: "Soft Grunge", x: 22, y: 15, conexoes: [] },
    { id: "old-money", nome: "Old Money", x: 78, y: 25, conexoes: [] },
    { id: "y2k", nome: "Y2K", x: 80, y: 88, conexoes: [] }
];

const container = document.getElementById('nosContainer');
const canvas = document.getElementById('canvasLinhas');
const ctx = canvas.getContext('2d');

function redimensionarCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    desenharLinhas();
}

dadosMapa.forEach(no => {
    const el = document.createElement('a');

    const nosGrandes = ["goth", "grunge", "vitoriano", "old-money"];
    const deveSerGrande = nosGrandes.includes(no.id) || no.eCentral;

    el.className = `no-mapa ${deveSerGrande ? 'central' : ''}`;
    el.style.left = `${no.x}%`;
    el.style.top = `${no.y}%`;
    el.dataset.id = no.id;
    
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const alvo = document.getElementById(no.id);
        if (alvo) {
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    el.innerHTML = `
        <div class="no-circulo">${deveSerGrande ? no.nome : ''}</div>
        <div class="no-texto" style="${deveSerGrande ? 'display: none;' : ''}">${no.nome}</div>
    `;
    container.appendChild(el);
});


function desenharLinhas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 204, 0, 0.25)"; 
    ctx.lineWidth = 1.5;

    dadosMapa.forEach(no => {
        if (!no.conexoes || no.conexoes.length === 0) return;

        const startX = (no.x / 100) * canvas.width;
        const startY = (no.y / 100) * canvas.height;

        no.conexoes.forEach(idDestino => {
            const noDestino = dadosMapa.find(p => p.id === idDestino);
            if (!noDestino) return;

            const endX = (noDestino.x / 100) * canvas.width;
            const endY = (noDestino.y / 100) * canvas.height;

            ctx.beginPath();
            ctx.moveTo(startX, startY);

            const cpX = (startX + endX) / 2;
            const cpY = (startY + endY) / 2 - 20;
            
            ctx.quadraticCurveTo(cpX, cpY, endX, endY);
            ctx.stroke();
        });
    });
}

window.addEventListener('resize', redimensionarCanvas);

document.addEventListener('DOMContentLoaded', () => {
    redimensionarCanvas();
});

const modal = document.getElementById('modalLogin');
const btnParticipar = document.getElementById('btnParticipar');
const btnFecharModal = document.getElementById('btnFecharModal');

btnParticipar.addEventListener('click', () => {
    modal.classList.add('active');
});

btnFecharModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});