import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [taskItemsCompleted, setTaskItemsCompleted] = useState([]);
  const [defaultTheme, setDefaultTheme] = useState(true);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    setTaskItemsCompleted([...taskItemsCompleted, itemsCopy.splice(index, 1)]);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={defaultTheme ? styles.container : styles.container_dark}>

      {/* controls for app */}
      <TouchableOpacity onPress={() => {setDefaultTheme(!defaultTheme)}}>
        <View style={defaultTheme ? styles.themeWrapper : styles.themeWrapper_dark}>
          <Text style={defaultTheme ? styles.themeText : styles.themeText_dark}>Change Theme</Text>
        </View>
      </TouchableOpacity>

      {/* Today's Tasks */}

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.tasksWrapper}>
            <Text style={defaultTheme ? styles.sectionTitle : styles.sectionTitle_dark}>Today's Tasks</Text>
            <View style={styles.items}>
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item} theme={defaultTheme} completed={false}></Task>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
            <View style={styles.items}>
              {/* This is where the tasks will go */}
              {
                taskItemsCompleted.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item} theme={defaultTheme} completed={true}></Task>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>
        </ScrollView>

      {/* Create a new task section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.createTaskWrapper}
      >
        <TextInput style={defaultTheme ? styles.input : styles.input_dark} placeholder={'Create a new task...'} placeholderTextColor={defaultTheme ? "black" : "white"} value={task} onChangeText={text => setTask(text)}></TextInput>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={defaultTheme ? styles.addWrapper : styles.addWrapper_dark}>
            <Text style={defaultTheme ? styles.addText : styles.addText_dark}>+</Text>
          </View>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  container_dark: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
  },
  themeWrapper: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white"
  },
  themeWrapper_dark: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#444"
  },
  themeText_dark: {
    color: "white"
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 24 
  },
  sectionTitle_dark: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 24,
    color: "white"
  },
  items: {
    display: "flex",
    flexDirection: "column",
  },
  createTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15
  },
  input: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
    width: 250
  },
  input_dark: {
    padding: 15,
    backgroundColor: "#555",
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#444",
    width: 250,
    color: "white"
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  addWrapper_dark: {
    width: 60,
    height: 60,
    backgroundColor: "#444",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  addText_dark: {
    color: "white"
  },
});
