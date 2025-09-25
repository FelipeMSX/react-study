import React from "react";
import { useState } from "react";

import fs from "fs";
import path from "path";

// Função de exemplo que usa todos os imports acima
export function exemploImportOrder() {
    console.log("haheh");
    const teste = "hehe";
    // Usando o useState do React
    const [valor, setValor] = useState(0);
    // Usando path para resolver um caminho
    const caminho = path.resolve("./algum-arquivo.txt");
    // Usando fs para checar se o arquivo existe
    const existe = fs.existsSync(caminho);
    // Usando React para criar um elemento
    const elemento = React.createElement("div", null, `Arquivo existe: ${existe}`);
    return { valor, setValor, caminho, existe, elemento };
}
