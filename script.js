// Seguridad de los inputs: Prevenir copiar, pegar y arrastrar
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.no-paste');
    
    textareas.forEach(textarea => {
        // Bloquear Pegar
        textarea.addEventListener('paste', (e) => {
            e.preventDefault();
            alert('¡ALERTA DE ESTUDIO! \nPara esta actividad de análisis debes redactar con tus propias palabras. No está permitido pegar contenido externo.');
        });
        
        // Bloquear soltar (arrastrar y soltar texto)
        textarea.addEventListener('drop', (e) => {
            e.preventDefault();
            alert('¡ALERTA DE ESTUDIO! \nNo está permitido arrastrar texto externo a la zona de respuestas.');
        });

        // Bloquear autocompletado en navegadores estrictos
        textarea.setAttribute('autocomplete', 'off');
        textarea.setAttribute('spellcheck', 'false'); // Opcional, pero evita que dependan del autocorrector web
    });
});

// Función para descargar las respuestas como archivo de texto (.txt)
function generateAndDownload() {
    const name = document.getElementById('studentName').value.trim();
    const grade = document.getElementById('studentGrade').value.trim();
    const feedback = document.getElementById('feedback-msg');

    if (!name || !grade) {
        feedback.textContent = 'Por favor, ingresa tu nombre y grado antes de continuar.';
        feedback.className = 'feedback error';
        return;
    }

    const answers = [];
    let allFilled = true;

    for (let i = 1; i <= 5; i++) {
        const answerVal = document.getElementById(`ans${i}`).value.trim();
        if (answerVal === '') {
            allFilled = false;
        }
        answers.push(`--- CASO ${i} --- \n${answerVal}\n`);
    }

    if (!allFilled) {
        feedback.textContent = 'Aún tienes casos sin responder. Por favor analiza todos los casos.';
        feedback.className = 'feedback error';
        return;
    }

    // Construcción del contenido del archivo
    let fileContent = `EVALUACIÓN DE CIENCIAS NATURALES - ÁREAS PROTEGIDAS\n`;
    fileContent += `=====================================================\n`;
    fileContent += `Estudiante: ${name}\n`;
    fileContent += `Grado: ${grade}\n`;
    fileContent += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    fileContent += answers.join('\n');

    // Crear un Blob y forzar la descarga
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Taller_PNN_${name.replace(/\s+/g, '_')}_${grade}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    feedback.textContent = '¡Excelente trabajo! Tus respuestas se han descargado correctamente para enviar al profesor.';
    feedback.className = 'feedback success';
}
