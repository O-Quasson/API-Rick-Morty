import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import api from "../axios/api.js"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default Telainicial = ({navigation}) => {
    const [pag, proxpag] = useState(1);
    const [personagens, setpersonagens] = useState();

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
                    <View style={[{flexDirection: 'row', backgroundColor: '#89b8f5', marginBottom: windowHeight*0.02, padding: 10, width: "100%"}]}>
                        <View style={[{marginRight: 10}]}>
                            //por algum motivo eu preciso usar uri ao invés de url
                            //o que diabos é uma uri?
                            <Image source={{ uri: item.image}} style={{width: windowWidth*0.3, height: windowWidth*0.3, resizeMode: 'contain'}}/>
                        </View>
                        <View style={[{flexDirection: "column", flex: 1}]}>
                            <Text style={[{fontSize: 40}]}>{item.name}</Text>
                            <Text>{item.status} - {item.species}</Text>
                        </View>
                    </View>
                )}
                style={[{marginBottom: windowHeight*0.05}]}
            />
        </View>
    );
};

const style = StyleSheet.create({

})