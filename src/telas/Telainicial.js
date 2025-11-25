import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import api from "../axios/api.js"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Telainicial = ({navigation}) => {
    let [pag, setpag] = useState(1);
    const [personagens, setpersonagens] = useState([]);

    const IrDetalhes = (id) => {
        navigation.navigate("Detalhes", { id: id });
    }

    const proxPag = () => {
        setpag(pag + 1);
    }

    const pagAnt = () => {
        if(pag!=1){
            setpag(pag - 1);
        }
    }

    useEffect(() => {
        api.get(`/?page=${pag}`)
            .then((resposta) => setpersonagens(resposta.data.results))
            .catch((erro) => console.log("Deu erro nisso aqui: " + erro))
        }, [pag]);

    return (
        <View style={[{flexDirection: 'column', flex: 1, padding: 20}]}>
            <Text style={[{fontSize: 40}]}>Babacas</Text>
            <FlatList
                data={personagens}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => IrDetalhes(item.id)}>
                        <View style={[{flexDirection: 'row', backgroundColor: '#89b8f5', marginBottom: windowHeight*0.02, padding: 10, width: "100%"}]}>
                            <View style={[{marginRight: 10}]}>
                                <Image source={{ uri: item.image}} style={{width: windowWidth*0.3, height: windowWidth*0.3, resizeMode: 'contain'}}/>
                            </View>
                            <View style={[{flexDirection: "column", flex: 1}]}>
                                <Text style={[{fontSize: 30}]}>{item.name}</Text>
                                <Text>{item.status} - {item.species}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                style={[{marginBottom: windowHeight*0.01, maxHeight: windowHeight*0.6}]}
            />
            <View style={[{flexDirection: 'row', justifyContent:"center", width: windowWidth, alignContent:"center", marginLeft: -50, gap: 100}]}>
                <TouchableOpacity onPress={pagAnt} style={[{width: windowWidth*0.1}]}>
                    <Image source={{ uri: 'https://i1.sndcdn.com/artworks-Ezn5WMlxVoGDrSoy-l3qN8g-t500x500.jpg'}} 
                        style={[{width: 100, height: 100}]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={proxPag} style={[{width: windowWidth*0.1}]}>
                    <Image source={{ uri: 'https://i.scdn.co/image/ab67616100005174e1408498d7f528e3671616b1'}} 
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