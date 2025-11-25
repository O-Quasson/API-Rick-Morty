import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from 'react-native';
import api from "../axios/api.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Teladetalhes = (({route, navigation}) => {

    const id = route.params;
    const [detalhes, setdetalhes] = useState();

    useEffect(() => {
        api.get(`/${id.id}`)
            .then((resposta) => setdetalhes(resposta.data))
            .catch((erro) => console.log("Deu erro nisso aqui: " + erro))
        }, []);

    return(
        console.log(detalhes)
    )
})

export default Teladetalhes;