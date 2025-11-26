import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
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

    while(!detalhes){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Carregando dados, espere</Text>
            </View>
        );
    }

    return(
        <View style={[{justifyContent: 'center', alignItems: 'center', gap: 25, flexDirection: 'column', flex: 1}]}>
            <View>
                <Image source={{ uri: detalhes.image }} style={[{width: windowWidth*0.7, height: windowWidth*0.7,borderRadius: windowWidth*0.2, resizeMode: 'contain'}]} />
            </View>
            <View>
                <Text>Nome: {detalhes.name}</Text>
                <Text>Status: {detalhes.status}</Text>
                <Text>Espécie: {detalhes.species}</Text>
                <Text>Gênero: {detalhes.gender}</Text>
            </View>
            <View>
                <Text>Local de origem: {detalhes.origin.name}</Text>
                <Text>Local atual: {detalhes.location.name}</Text>
            </View>

        </View>
    )
})

export default Teladetalhes;