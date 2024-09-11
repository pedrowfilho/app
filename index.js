const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "Tomar 3L de água por dia",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.");
    return;
  }

  metas.push({
    value: meta,
    checked: false,
  });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o enter para finalizar",
    // copia todos os elementos do array metas (spread operator)
    choices: [...metas],
    instructions: false
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada")
    return
  }

  metas.forEach((m) => {
    m.checked = false
  })

  //forEach é "para cada"
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    });

    meta.checked = true
  });

  console.log("Meta(s) marcadas como concluída(s)")
}

const start = async () => {
  while (true) {
    // preciso aguardar (await) o usuário selecionar algo -> promessa
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "listar":
        await listarMetas();
        break;
      case "sair":
        console.log("### tchau! ###");
        return;
    }
  }
};

start();
