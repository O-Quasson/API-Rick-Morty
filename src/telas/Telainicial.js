import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';
import api from "../axios/api.js"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Telainicial = ({navigation}) => {
    let [pag, setpag] = useState(1);
    const [personagens, setpersonagens] = useState([]);
    let [filtro, setfiltro] = useState("")

    const IrDetalhes = (id) => {
        navigation.navigate("Detalhes", { id: id });
    }

    const proxPag = () => {
        personagens.length=0;
        setpag(pag + 1);
    }

    const pagAnt = () => { 
        if(pag!=1){
            personagens.length=0;
            setpag(pag - 1);
        }
    }

    const filtrar = (texto) => {
        if((isNaN(texto))&&(texto.length>0)){
            setfiltro(`&name=${encodeURIComponent(texto)}`);
        }
    }

    useEffect(() => {
        // if(isNaN(pag)){
        //     setfiltro("/?name=");
        // }

        api.get(`/?page=${pag}${filtro}`)
            .then((resposta) => {if(resposta.data.results){
                setpersonagens(resposta.data.results); 
                console.log(`https://rickandmortyapi.com/api/character/?page=${pag}${filtro}`)
            }})
            .catch((erro) => {
                console.log("Deu erro nisso aqui ó: " + erro);
                console.log(`https://rickandmortyapi.com/api/character/?page=${pag}${filtro}`);
            })
        }, [pag, filtro]);

    while(personagens.length===0){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Carregando dados, espere</Text>
            </View>
        );
    }

    return (
        <View style={[{flexDirection: 'column', flex: 1, padding: 20, gap: 15}]}>
            <Text style={[{fontSize: 40}]}>Personagens</Text>
            <TextInput placeholder="Pesquisar por nome" onSubmitEditing={(texto) => filtrar(texto.nativeEvent.text)} style={[{backgroundColor: "#e6e6e6", padding: 5}]}></TextInput>
            <FlatList
                data={personagens}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => IrDetalhes(item.id)}>
                        <View style={[{flexDirection: 'row', backgroundColor: '#5CAD4A', marginBottom: windowHeight*0.02, padding: 10, width: "100%"}]}>
                            <View style={[{marginRight: 10}]}>
                                <Image source={{ uri: item.image}} style={{width: windowWidth*0.3, height: windowWidth*0.3, resizeMode: 'contain', borderRadius:windowWidth*0.1}}/>
                            </View>
                            <View style={[{flexDirection: "column", flex: 1}]}>
                                <Text style={[{fontSize: 30}]}>{item.name}</Text>
                                <Text>{item.status} - {item.species}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                style={[{marginBottom: windowHeight*0.01, maxHeight: windowHeight*0.6}]}
                onEndReached={proxPag}
                onEndReachedThreshold={0.001}
            />
            <View style={[{flexDirection: 'row', justifyContent:"center", width: windowWidth, alignContent:"center", marginLeft: -50, gap: 100}]}>
                <TouchableOpacity onPress={pagAnt} style={[{width: windowWidth*0.1}]}>
                    <Image source={{ uri: 'https://cdn-icons-png.freepik.com/512/800/800058.png'}} 
                        style={[{width: 100, height: 100, transform: [{ scaleX: -1 }] }]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={proxPag} style={[{width: windowWidth*0.1}]}>
                    <Image source={{ uri: 'https://cdn-icons-png.freepik.com/512/800/800058.png'}} 
                        style={[{width: 100, height: 100}]}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const style = StyleSheet.create({

})

export { Telainicial };