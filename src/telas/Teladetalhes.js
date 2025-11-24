import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from 'react-native';
import api from "../axios/api.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Teladetalhes = ((navigation) => {

    const personagemId = useState(1);
    const [detalhes, setdetalhes] = useState();

    useEffect(() => {
        api.get(`/${personagemId}`)
            .then((resposta) => setdetalhes(resposta.data.results))
            .catch((erro) => console.log("Deu erro nisso aqui: " + erro))
        });

    console.log(detalhes)
})

export default Teladetalhes;