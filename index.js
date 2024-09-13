import { select, input, checkbox } from "@inquirer/prompts"

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

  metas.forEach((m) => {
    m.checked = false
  })

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada")
    return
  }

  //forEach é "para cada"
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    });

    meta.checked = true
  });

  console.log("Meta(s) marcadas como concluída(s)")
}

const metasRealizadas = async () => {
  // lista de metas realizadas
  const realizadas = metas.filter((meta) => {
    // se o checked estiver marcado, ele passa do filtro
    return meta.checked
  })

  if(realizadas.length == 0){
    console.log("Não existem metas realizadas! :/")
    return 
  }

  await select({
    message: "Metas Realizadas: " + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked
  })

  if(abertas.length ==0){
    console.log("Não existem metas abertas! :)")
    return
  }

  await select({
    message: "Metas Abertas: " + abertas.length,
    choices: [...abertas]
  })
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
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "sair":
        console.log("### tchau! ###")
        return
    }
  }
};

start();
