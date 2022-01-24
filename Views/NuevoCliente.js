import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native'
import {TextInput,Headline,Button,Paragraph,Dialog,Portal} from 'react-native-paper'
//Hoja de estilos Global
import globalStyles from '../styles/Global';
import axios from 'axios';

const NuevoCliente = ({navigation}) => {

  //Campos del Formulario
  const [nombre,guardarNombre] = useState('')
  const [telefono,guardarTelefono] = useState('')
  const [correo,guardarCorreo] = useState('')
  const [empresa,guardarEmpresa] = useState('')
  const [alerta,guardarAlerta] = useState(false)


  //Almacena el cliente en una base de datos
  const guardarCliente = async () => {
   //VALIDACION

   if(nombre === '' || telefono === '' || correo==='' || empresa===''){
     guardarAlerta(true)
     return;
   }
   
   console.log('Guardando')

   //Generar el cliente

   const cliente = {nombre,telefono,correo,empresa}

   //Guardar el cliente en la Api
    try {
        await axios.post('http://10.0.2.2:3000/clientes',cliente)
    } catch(error){
        console.log(error);
    }


   //Redireccionar
    navigation.navigate('Inicio');
   //Limpiar el Formulario
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');
    guardarAlerta('');
  }
  
  

  return (
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

        <TextInput
            label="Nombre"
            placeholder='Juan'
            onChangeText={texto => guardarNombre(texto)}
            value={nombre}
            style={styles.input}
        />

        <TextInput
            label="Telefono"
            placeholder='1234567890'
             onChangeText={texto => guardarTelefono(texto)}
            value={telefono}
            style={styles.input}
        />
        <TextInput
            label="Correo"
            placeholder='correo@gmail.com'
             onChangeText={texto => guardarCorreo(texto)}
            value={correo}
            style={styles.input}
        />
        <TextInput
            label="Empresa"
            placeholder='Nombre Empresa'
             onChangeText={texto => guardarEmpresa(texto)}
            value={empresa}
            style={styles.input}
        />

        <Button
          icon="pencil-circle"
          mode="contained"
          onPress={() => guardarCliente()}>
          Guardar Cliente</Button>

          <Portal>
            <Dialog
              visible={alerta}
              onDismiss={()=> guardarAlerta(false)}
            >
                <Dialog.Title>ERROR</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Todos los campos son obligatorios</Paragraph>
                </Dialog.Content>

                <Dialog.Actions>
                  <Button onPress={()=>guardarAlerta(false)}>OK</Button>
                </Dialog.Actions>

            </Dialog>
          </Portal>
        
      </View>
  );
};

const styles = StyleSheet.create({
  input:{
    marginBottom:20,
    backgroundColor:'transparent'
  }
})

export default NuevoCliente;
