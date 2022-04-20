import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const Edit = ({navigation, route}) => {
  const [username, setUsername] = useState(route?.params?.data?.username);
  const [email, setEmail] = useState(route?.params?.data?.email);
  const [password, setPassword] = useState(route?.params?.data?.password);
  const [gender, setGender] = useState(route?.params?.data?.gender);

  return (
    <SafeAreaView>
      <Text style={styles.editTitle}> USERNAME </Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={value => setUsername(value)}
        placeholder="Username"
        autoCapitalize="none"
      />
      <Text style={styles.editTitle}> EMAIL </Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <Text style={styles.editTitle}> PASSWORD </Text>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={value => setPassword(value)}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <Text style={styles.editTitle}> GENDER </Text>
      <View style={styles.genderContainer}>
        <Pressable style={styles.radioButton} onPress={() => setGender('male')}>
          <View
            style={[
              styles.radio,
              {
                borderColor:
                  gender === 'male' ? 'rgb(30,220,180)' : 'rgb(30,30,30)',
              },
            ]}>
            {gender === 'male' && <View style={styles.selected} />}
          </View>
          <Text>Male</Text>
        </Pressable>
        <Pressable
          style={styles.radioButton}
          onPress={() => setGender('female')}>
          <View
            style={[
              styles.radio,
              {
                borderColor:
                  gender === 'female' ? 'rgb(30,220,180)' : 'rgb(30,30,30)',
              },
            ]}>
            {gender === 'female' && <View style={styles.selected} />}
          </View>
          <Text>Female</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.mainButton}
        onPress={() =>
          axios
            .put('http://localhost:3000/update', {
              id: route?.params?.data?._id,
              username: username,
              email: email,
              password: password,
              gender: gender,
            })
            .then(res => navigation.navigate('Home', {data: res.data}))
            .catch(err => console.log('err', err.response))
        }>
        <Text style={styles.mainButtonText}>UPDATE</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const Home = ({navigation, route}) => {
  console.log('route', route);
  return (
    <SafeAreaView>
      <Text style={styles.title}>Welcome to Profile</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          style={[styles.mainButton, {backgroundColor: 'red'}]}
          onPress={() => {
            console.log('iddddd', route?.params?.data?._id);
            axios
              .delete('http://localhost:3000/delete', {
                data: {id: route?.params?.data?._id},
              })
              .then(res => {
                console.log(res);
                navigation.navigate('Login');
              })
              .catch(err => console.log('err', err.response));
          }}>
          <Text style={styles.mainButtonText}>DELETE</Text>
        </Pressable>
        <Pressable
          style={styles.mainButton}
          onPress={() =>
            navigation.navigate('Edit', {data: route?.params?.data})
          }>
          <Text style={styles.mainButtonText}>EDIT</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Id: </Text>
        <Text style={{fontSize: 16, color: 'rgb(100,100,100)'}}>
          {route?.params?.data?._id}{' '}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Username: </Text>
        <Text style={{fontSize: 16, color: 'rgb(100,100,100)'}}>
          {route?.params?.data?.username}{' '}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Email: </Text>
        <Text style={{fontSize: 16, color: 'rgb(100,100,100)'}}>
          {route?.params?.data?.email}{' '}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 19, fontWeight: 'bold'}}>Gender: </Text>
        <Text style={{fontSize: 16, color: 'rgb(100,100,100)'}}>
          {route?.params?.data?.gender}{' '}
        </Text>
      </View>
      <Pressable
        style={styles.mainButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.mainButtonText}>LOGOUT</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={value => setUsername(value)}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={value => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <Pressable
        style={styles.mainButton}
        onPress={() =>
          axios
            .post('http://localhost:3000/login', {
              username: username,
              password: password,
            })
            .then(res => navigation.navigate('Home', {data: res.data}))
            .catch(err => console.log('err', err.response))
        }>
        <Text style={styles.mainButtonText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.secondaryButtonText}>Already Registered?</Text>
        <Text style={styles.secondaryButtonText}>Login Here !</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');

  return (
    <SafeAreaView>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={value => setUsername(value)}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={value => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={styles.genderContainer}>
        <Pressable style={styles.radioButton} onPress={() => setGender('male')}>
          <View
            style={[
              styles.radio,
              {
                borderColor:
                  gender === 'male' ? 'rgb(30,220,180)' : 'rgb(30,30,30)',
              },
            ]}>
            {gender === 'male' && <View style={styles.selected} />}
          </View>
          <Text>Male</Text>
        </Pressable>
        <Pressable
          style={styles.radioButton}
          onPress={() => setGender('female')}>
          <View
            style={[
              styles.radio,
              {
                borderColor:
                  gender === 'female' ? 'rgb(30,220,180)' : 'rgb(30,30,30)',
              },
            ]}>
            {gender === 'female' && <View style={styles.selected} />}
          </View>
          <Text>Female</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.mainButton}
        onPress={() =>
          axios
            .post('http://localhost:3000/register', {
              username: username,
              email: email,
              password: password,
              gender: gender,
            })
            .then(res => navigation.navigate('Home', {data: res.data}))
            .catch(err => console.log('err', err.response))
        }>
        <Text style={styles.mainButtonText}>Register</Text>
      </Pressable>
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryButtonText}>Already Registered?</Text>
        <Text style={styles.secondaryButtonText}>Login Here !</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {fontSize: 24, textAlign: 'center', marginBottom: 50},
  textInput: {
    borderBottomWidth: 1,
    marginHorizontal: 30,
    fontSize: 17,
    paddingBottom: 4,
    color: 'rgb(30,30,30)',
    borderBottomColor: 'rgb(30,30,30)',
    marginBottom: 30,
  },
  radio: {
    borderWidth: 2,
    width: 25,
    height: 25,
    borderRadius: 15,
    padding: 5,
    marginRight: 7,
    borderColor: 'rgb(30,30,30)',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  selected: {
    flex: 1,
    backgroundColor: 'rgb(30,220,180)',
    borderRadius: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: 30,
    marginBottom: 50,
  },
  mainButton: {
    marginHorizontal: 30,
    backgroundColor: 'purple',
    borderRadius: 10,
    alignItems: 'center',
    padding: 12,
    marginBottom: 20,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginHorizontal: 30,
  },
  editTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
    color: 'purple',
    marginTop: 15,
  },
});
