class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savanna', tamanhoTotal: 10, criaturas: ['MACACO','MACACO','MACACO'] }, 
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, criaturas: [] },
            { numero: 3, bioma: ['savanna', 'rio'], tamanhoTotal: 7, criaturas: ['GAZELA'] }, 
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, criaturas: [] },     
            { numero: 5, bioma: 'savanna', tamanhoTotal: 9, criaturas: ['LEAO'] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savanna', tipo: 'carnivoro' },
            LEOPARDO: { tamanho: 2, bioma: 'savanna', tipo: 'carnivoro' },
            CROCODILO: { tamanho: 3, bioma: 'rio', tipo: 'carnivoro' },
            MACACO: { tamanho: 1, bioma: ['savanna', 'floresta'], tipo: 'herbivoro' },
            GAZELA: { tamanho: 2, bioma: 'savanna', tipo: 'herbivoro' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savanna', 'rio'], tipo: 'herbivoro' }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        const { tamanho, bioma, tipo } = this.animais[animal];

        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaCompativel = Array.isArray(recinto.bioma)
                ? recinto.bioma.some(b => bioma.includes(b))  
                : bioma.includes(recinto.bioma);           

            const espacoLivre = recinto.tamanhoTotal - this.getOcupacaoAtual(recinto); 

            const compatibilidadeAnimais = recinto.criaturas.every(c => this.animais[c].tipo === tipo);

            const espacoSuficiente = espacoLivre >= (tamanho * quantidade);
            return biomaCompativel && espacoSuficiente && compatibilidadeAnimais;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        recintosViaveis.forEach(recinto => {
            for (let i = 0; i < quantidade; i++) {
                recinto.criaturas.push(animal);
            }
        });

        const resultado = recintosViaveis.map(recinto => 
            `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - this.getOcupacaoAtual(recinto)} total: ${recinto.tamanhoTotal})`
        );

        return { erro: null, recintosViaveis: resultado };
    }

    getOcupacaoAtual(recinto) {
        return recinto.criaturas.reduce((ocupacao, criatura) => ocupacao + this.animais[criatura].tamanho, 0);
    }
}

export { RecintosZoo as RecintosZoo };
