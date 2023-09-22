function createTooltip(canvas, x, y, aluno, questao, resultado) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;

  const content = document.createElement("div");
  content.textContent = `Aluno: ${aluno}, Questão: ${questao}, Resultado: ${resultado}`;
  tooltip.appendChild(content);

  canvas.parentElement.appendChild(tooltip);

  return tooltip;
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("heatmapCanvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 600;
  canvas.height = 600;

  const data = {
    x: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Bob Johnson" },
      { id: 4, name: "Alice Brown" },
      { id: 5, name: "Michael Davis" },
    ],
    y: [
      {
        id: 101,
        statement: "What is the capital of France?",
        skill: "Geography",
        knowledge_area: "World Capitals",
      },
      {
        id: 102,
        statement: "Solve for x: 2x + 3 = 7",
        skill: "Mathematics",
        knowledge_area: "Algebra",
      },
      {
        id: 103,
        statement: "Who wrote 'Romeo and Juliet'?",
        skill: "Literature",
        knowledge_area: "English Literature",
      },
      {
        id: 104,
        statement: "What is photosynthesis?",
        skill: "Biology",
        knowledge_area: "Botany",
      },
      {
        id: 105,
        statement: "Who painted the Mona Lisa?",
        skill: "Art",
        knowledge_area: "Renaissance Art",
      },
    ],
    x_y: [
      { id_aluno: 1, id_questao: 101, result: 0 },
      { id_aluno: 1, id_questao: 102, result: 1 },
      { id_aluno: 1, id_questao: 103, result: 2 },
      { id_aluno: 1, id_questao: 104, result: 1 },
      { id_aluno: 1, id_questao: 105, result: 0 },
      { id_aluno: 2, id_questao: 101, result: 0 },
      { id_aluno: 2, id_questao: 102, result: 1 },
      { id_aluno: 2, id_questao: 103, result: 1 },
      { id_aluno: 2, id_questao: 104, result: 2 },
      { id_aluno: 2, id_questao: 105, result: 2 },
      { id_aluno: 3, id_questao: 101, result: 2 },
      { id_aluno: 3, id_questao: 102, result: 1 },
      { id_aluno: 3, id_questao: 103, result: 2 },
      { id_aluno: 3, id_questao: 104, result: 0 },
      { id_aluno: 3, id_questao: 105, result: 1 },
      { id_aluno: 4, id_questao: 101, result: 1 },
      { id_aluno: 4, id_questao: 102, result: 2 },
      { id_aluno: 4, id_questao: 103, result: 0 },
      { id_aluno: 4, id_questao: 104, result: 1 },
      { id_aluno: 4, id_questao: 105, result: 2 },
      { id_aluno: 5, id_questao: 101, result: 0 },
      { id_aluno: 5, id_questao: 102, result: 1 },
      { id_aluno: 5, id_questao: 103, result: 2 },
      { id_aluno: 5, id_questao: 104, result: 0 },
      { id_aluno: 5, id_questao: 105, result: 1 },
    ],
  };

  const xQtd = data.x.length;
  const yQtd = data.y.length;

  // Loop para preencher o heatmap com valores do JSON
  for (let x = 0; x < xQtd; x++) {
    for (let y = 0; y < yQtd; y++) {
      const value = data.x_y.find(
        (item) =>
          item.id_aluno === data.x[x].id && item.id_questao === data.y[y].id
      ).result;
      drawHeatPoint(x, y, 500 / xQtd, 500 / yQtd, value);
    }
  }

  // Adicionando rótulos no eixo x
  for (let i = 0; i < xQtd; i++) {
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    const text = data.x[i].name;
    const textWidth = ctx.measureText(text).width;
    const squareWidth = 500 / xQtd;
    const xPosition = 50 + i * squareWidth + (squareWidth - textWidth) / 2;
    ctx.fillText(text, xPosition, 30);
  }

  // Adicionando rótulos no eixo y
  for (let i = 0; i < yQtd; i++) {
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    const textHeight = 12;
    const squareHeight = 500 / yQtd;
    const yPosition = 50 + i * squareHeight + (squareHeight + textHeight) / 2;

    ctx.fillText(data.y[i].id, 10, yPosition);
  }

  // Função para desenhar um ponto do heatmap
  function drawHeatPoint(x, y, w, h, value) {
    let color;

    if (value === 0) {
      color = "#A50026";
    } else if (value === 1) {
      color = "#FEFFBE";
    } else if (value === 2) {
      color = "#006837";
    }

    ctx.fillStyle = color;
    ctx.fillRect(x * w + 50, y * h + 50, w, h); // Adicionei 50 pixels para afastar do espaço da borda
  }
});
