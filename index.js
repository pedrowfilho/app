import { select, input, checkbox } from "@inquirer/prompts";
import { promises as fs } from "fs";

let mensagem = "Bem-vindo ao App de Metas!";

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    // converte os dados (dados) para um array (metas)
    metas = JSON.parse(dados);
  } catch (erro) {
    metas = []
  }
}

const salvarMetas = async () => {
  // converte as metas em JSON para salvar no arquivo
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return;
  }

  metas.push({
    value: meta,
    checked: false,
  });

  mensagem = "Meta cadastrada com sucesso!";
};

const listarMetas = async () => {
  if(metas.length == 0){
    mensagem = "Não existem metas!"
    return
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar/desmarcar e o enter para finalizar",
    // copia todos os elementos do array metas (spread operator)
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada";
    return;
  }

  //forEach é "para cada"
  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  mensagem = "Meta(s) marcada(s) como concluída(s)";
};

const metasRealizadas = async () => {
  if(metas.length == 0){
    mensagem = "Não existem metas!"
    return
  }

  // lista de metas realizadas
  const realizadas = metas.filter((meta) => {
    // se o checked estiver marcado, ele passa do filtro
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas! :/";
    return;
  }

  await select({
    message: "Metas Realizadas: " + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if(metas.length == 0){
    mensagem = "Não existem metas!"
    return
  }

  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas! :)";
    return;
  }

  await select({
    message: "Metas Abertas: " + abertas.length,
    choices: [...abertas],
  });
};

const excluirMetas = async () => {
  if(metas.length == 0){
    mensagem = "Não existem metas!"
    return
  }
  
  // map() devolve um novo array modificado
  const metasDesmarcadas = metas.map((meta) => {
    // desmarca todos os itens, pois é importante entender que o usuário irá marcar o que ele deseja excluir
    return { value: meta.value, checked: false };
  });

  const itensAExcluir = await checkbox({
    message: "Selecione o item para excluir",
    // copia todos os elementos do array metas (spread operator)
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensAExcluir.length == 0) {
    mensagem = "Nenhum item para excluir!";
    return;
  }

  itensAExcluir.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem = "Meta(s) excluída(s) com sucesso!";
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != "") {
    console.log(mensagem);
    console.log("");
    mensagem = "";
  }
};

const start = async () => {
  
  await carregarMetas()

  while (true) {
    mostrarMensagem()
    await salvarMetas()

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
          name: "Excluir metas",
          value: "excluir",
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
        break;
      case "listar":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "excluir":
        await excluirMetas()
        break
      case "sair":
        console.log("### tchau! ###")
        return
    }
  }
};

start();
