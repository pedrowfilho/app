const { select } = require("@inquirer/prompts");

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
        console.log("vamos cadastrar!");
        break;
      case "listar":
        console.log("vamos listar!");
        break;
      case "sair":
        console.log("tchau!");
        return;
    }
  }
};

start();
