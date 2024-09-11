/*
// hello world
const mensagem = "Hello World";

{
    const mensagem = "Olá, Mundo!"
    console.log(mensagem);
}

console.log(mensagem);
*/

//arrays, objetos
let metas = {
	value: "ler um livro por mês",
	checked: false,
    isChecked: (info) => {
        console.log(info);
    }
}
metas.isChecked(metas.value);
metas.value = "não é mais ler um livro por mês"
metas.isChecked(metas.value);

// function // arrow function
function criarMeta() {}

//const criarMeta = () => {}
