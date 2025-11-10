const CATALOG_ITEMS = [
    {
        id: 1,
        titulo:"Percy Jacksson e os Olimpianos 1",
        categoria:"Livro,Romance, Literatura fantástica, Ficção juvenil, Alta fantasia",
        detalhes:"O ladrão de Raios é o primeiro livro da série Percy Jackson & os Olimpianos baseado na mitologia grega, escrito por Rick Riordan, que narra a vida do adolescente Percy Jackson que descobre ser um semideus, filho de Poseidon com uma humana",
        preco: "R$39,92",
        estoque:"1.000",
        autor:"Rick Riordan",
        lancamento:"26 de setembro de 2023",
    },
    {
        id: 2,
        titulo:"Haikyuu 1",
        categoria:"Mangá, Romance gráfico",
        detalhes:"Shoyo Hinata e Tobio Kageyama, dois garotos fascinados pelo vôlei. A diferença é que Kageyama é um levantador talentoso, e Hinata, um atacante de baixa estatura para um jogador. Os dois se encontram durante a primeira rodada da etapa de classificação para o torneio Nacional, e acabam se tornando grande rivais. Por coincidência do destino, eles terão que unir forças para entrar no clube de vôlei do colégio Karasuno e manter o sonho de continuar jogando vôlei. Leia o início dessa emocionante história em Haikyu!! volume 1.",
        preco:"R$44,70",
        estoque:"500",
        autor:"Haruichi Furudate",
        lancamento:"4 de junho de 2012",
    },
    {
        id: 3,
        titulo:"Hobbit",
        categoria:" Romance, Literatura fantástica, Alta fantasia, Literatura infantil, Épico",
        detalhes:"Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Mas seu contentamento é perturbado quando Gandalf, o mago, e uma companhia de anões batem à sua porta e levam-no para uma expedição. Eles têm um plano para roubar o tesouro guardado por Smaug, o Magnífico, um grande e perigoso dragão.",
        preco:"R$45,48",
        estoque:"40",
        autor:"J. R. R. Tolkien",
        lancamento:"15 julho 2019",
    },
    {
        id: 4,
        titulo:"Alice no País das Maravilhas",
        categoria:"Literatura infantil, Literatura fantástica, Ficção Absurdista, Literatura nonsense, Fantástico",
        detalhes:"As Aventuras de Alice no País das Maravilhas, frequentemente abreviado para Alice no País das Maravilhas é a obra infantil mais conhecida de Charles Lutwidge Dodgson, publicada a 4 de julho de 1865 sob o pseudônimo de Lewis Carroll. É uma das obras mais célebres do gênero literário nonsense.",
        preco:"R$39,64",
        estoque:"40",
        autor:"Lewis Carroll(classic edition)",
        lancamento:"4 outubro 2019",
    },

];

const modalElement = document.querySelector('#detalheModal');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');

modalElement.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const itemId = perseInt(button.getAttribute('data-item-id'));
    const item = CATALOG_ITEMS.find(i => i.id === itemId).
});