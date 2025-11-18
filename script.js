const CATALOG_ITEMS = [
    {
        id: 1,
        titulo:"Percy Jacksson e os Olimpianos 1",
        categoria: ["Romance", "Literatura fantástica", "Ficção juvenil", "Alta fantasia"],
        detalhes:"O ladrão de Raios é o primeiro livro da série Percy Jackson & os Olimpianos baseado na mitologia grega, escrito por Rick Riordan, que narra a vida do adolescente Percy Jackson que descobre ser um semideus, filho de Poseidon com uma humana",
        preco: "R$39,92",
        estoque:"1.000",
        autor:"Rick Riordan",
        lancamento:"26 de setembro de 2023",
    },
    {
        id: 2,
        titulo:"Haikyuu 1",
        categoria:["Mangá", "Romance gráfico"],
        detalhes:"Shoyo Hinata e Tobio Kageyama, dois garotos fascinados pelo vôlei. A diferença é que Kageyama é um levantador talentoso, e Hinata, um atacante de baixa estatura para um jogador. Os dois se encontram durante a primeira rodada da etapa de classificação para o torneio Nacional, e acabam se tornando grande rivais. Por coincidência do destino, eles terão que unir forças para entrar no clube de vôlei do colégio Karasuno e manter o sonho de continuar jogando vôlei. Leia o início dessa emocionante história em Haikyu!! volume 1.",
        preco:"R$44,70",
        estoque:"500",
        autor:"Haruichi Furudate",
        lancamento:"4 de junho de 2012",
    },
    {
        id: 3,
        titulo:"Hobbit",
        categoria:["Romance", "Literatura fantástica", "Alta fantasia", "Literatura infantil", "Épico"],
        detalhes:"Bilbo Bolseiro é um hobbit que leva uma vida confortável e sem ambições. Mas seu contentamento é perturbado quando Gandalf, o mago, e uma companhia de anões batem à sua porta e levam-no para uma expedição. Eles têm um plano para roubar o tesouro guardado por Smaug, o Magnífico, um grande e perigoso dragão.",
        preco:"R$45,48",
        estoque:"40",
        autor:"J. R. R. Tolkien",
        lancamento:"15 julho 2019",
    },
    {
        id: 4,
        titulo:"Alice no País das Maravilhas",
        categoria:["Literatura infantil","Literatura fantástica", "Ficção Absurdista", "Literatura nonsense", "Fantástico"],
        detalhes:"As Aventuras de Alice no País das Maravilhas, frequentemente abreviado para Alice no País das Maravilhas é a obra infantil mais conhecida de Charles Lutwidge Dodgson, publicada a 4 de julho de 1865 sob o pseudônimo de Lewis Carroll. É uma das obras mais célebres do gênero literário nonsense.",
        preco:"R$39,64",
        estoque:"40",
        autor:"Lewis Carroll(classic edition)",
        lancamento:"4 outubro 2019",
    },
    
];
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido
modalElement.addEventListener('show.bs.modal', function (event) {
    // Lê o atributo "data-item-id" que contém o ID do item clickado
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    // Procura pelo ID do item clickado no vetor "CATALOG_ITEMS"
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    // Se o item foi encontrado no vetor "CATALOG_ITEMS"
    if (item) {
        // Atualiza o Título do Modal
        modalTitle.textContent = item.titulo;
        
        // Cria o HTML de detalhes
        let detailsHTML = `
            <p class="mb-1"><strong>Categoria:</strong>`;
        item.categoria.forEach(function (categoria) {
            detailsHTML += ` <span class="badge bg-secondary text-wrap">${categoria}</span>`;
        });
        detailsHTML += `
                </p>
                <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
                <hr>
                <p>${item.detalhes}</p>
            `;
        
        // adiciona campos especificos por categoria
        // if (item.categoria === 'Livros') {
        detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
        detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
        detailsHTML += `<p class="text-info"><strong>Estoque Disponivel:</strong> ${item.estoque} unidades</p>`;
        // }
        
        modalBody.innerHTML = detailsHTML;
        
        modalAction.onclick = () => {
            adicionarItemCarrinho(item.id);
            console.log(`Ação: Item '$(item.titulo)' (ID: ${item.id}) adicionado ao carrinho.`);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        };
        
    }
});

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const items = document.querySelectorAll('.item-catalogo');

function executarPesquisa(event) {
    
    event.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    items.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const category = item.getAttribute('data-categorias').toLowerCase();
        
        if (title.includes(query) || category.includes(query) || query === "") {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

searchButton.addEventListener('click', executarPesquisa);
searchInput.addEventListener('keyup', (event) => {
    
    if (event.key === 'Enter') {
        executarPesquisa(event);
    } else if (searchInput.value.trim() === "") {
        
        executarPesquisa(event);
    }
});

items.forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('.card-title');
    const category = card.querySelectorAll('.card-text')[0];
    const description = card.querySelectorAll('.card-text')[1];

    const item = CATALOG_ITEMS.find(i => i.id === (index + 1));

    if (item) {
        img.src = img.src.replace(/\?text=(.*)/, "?text=" + item.categoria[0].toUpperCase());

        title.textContent = item.titulo;

        category.textContent = "categoria: " + item.categoria.join(", ");

        description.textContent = item.detalhes;
    }
});

const CART_STORAGE_KEY = 'shopping_cart';

function obterCarrinhoNavegador() {

    try {
        const cookie = localStorage.getItem(CART_STORAGE_KEY);
        if (cookie) {
            return JSON.parse(cookie);
        }
    } catch (e) {
        console.error("Falha ao ler o cookie do armazenamento local.");
    }

    return [];
}

function salvarCookieCarrinho(itensCarrinho) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itensCarrinho));
    } catch (a) {
        console.error("ERRO: Falha ao salvar carrinho no navegador. Erro: ", e);
    }
}
 function atualizaContadorCarrinho() {
    const carrinho = obterCarrinhoNavegador();
    const carrinhoBadge = document.getElementById("cart-count");

    if (carrinhoBadge) {
        carrinhoBadge.textContent = carrinho.length;

        if (carrinho.length > 0 ) {
            carrinhoBadge.classList.remove('d-none');
        } else {
            carrinhoBadge.classList.add('d-none');
        }
    }
 }

function adicionarItemCarrinho(itemId) {
    const carrinho = obterCarrinhoNavegador();
    carrinho.push(itemId);
    salvarCookieCarrinho(carrinho);
    atualizaContadorCarrinho();
}
atualizaContadorCarrinho();

const carrinho_btn = document.getElementById("cart-button");

carrinho_btn.addEventListener("click", function() {
const carrinho_secao = document.getElementById("cart-section");
carrinho_secao.classList.toggle("d-none");
if (carrinho_secao.classList.contains("d-none")) {
    return;
}

const carrinho_recibo = document.getElementById("cart-list");
carrinho_recibo.innerHTML = "";

const itensCarrinho = obterCarrinhoNavegador();
itensCarrinho.forEach(itensCarrinho =>  {
    const li = document.createElement("li");
    li.innerHTML = itensCarrinho;
    carrinho_recibo.appendChild(li);
});

});

