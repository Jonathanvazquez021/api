import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BarraSuperior from './components/ui/Barra';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper'
// Inicio de importaciones necesarias para la navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
///Fin de importaciones
import Inicio from './Views/Inicio';
import NuevoCliente from './Views/NuevoCliente';
import DetallesCliente from './Views/DetallesCliente';


const Stack = createStackNavigator();

//Definir tema

const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'#1774F2',
    accent:'#0655BF',
  }
}


export default function App() {
  return (
    <>
    <PaperProvider>

   
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle:{
              backgroundColor:theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle:{
              fontWeight:'bold'
            }
          }}
        >
          <Stack.Screen name="Inicio" component={Inicio} 
          options={({navigation,route}) => ({
            headerTitleAlign:'center',
            headerLeft:(props) => <BarraSuperior {...props}
                                    navigation={navigation}
                                    route={route}
                                    />
          })} 
          
          />
          <Stack.Screen 
          name="NuevoCliente" 
          component={NuevoCliente}
          options={{
            title:"Nuevo Cliente"
          }}
           />
          <Stack.Screen 
          name="DetallesCliente" 
          component={DetallesCliente}
          options={{
            title:"Detalles Cliente"
          }} 
           />

        </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
