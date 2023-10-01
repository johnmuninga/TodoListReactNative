import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import DatePicker from 'react-native-datepicker';

export default function Home() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

  

  const handleSubmit= (e) => {
    e.preventDefault();
    setText("")
    setSelectedDate("")
    addDoc(collection(db, "todos"), {
        text: text ,
        completed: false,
        date: selectedDate
        });
        
  }
  //delete from firebase
    const handleDelete = (id) => {
        const todoRef = doc(db, "todos", id);
        deleteDoc(todoRef);
    };

//  handleCompleted task
const handleCompleted = (id) => {
    const todoRef = doc(db, "todos", id);
    updateDoc(todoRef, {
        completed: true,
    });
}

// display completed task
useEffect(() => {
    const q = query(collection(db, "todos"), where("completed", "==", true)); // Use the `query` function to specify the collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const completed = [];
        querySnapshot.forEach((doc) => {
            completed.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        setCompleted(completed);
    });
    return () => {
        unsubscribe();
    };
}
, []);

//   display data
useEffect(() => {
    const q = query(collection(db, "todos")); // Use the `query` function to specify the collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        setTodos(todos);
        
    });
    return () => {
        unsubscribe();
    };
}, []);

  // display current date 
  
  return (
    <SafeAreaView>
    <ScrollView>
    
    {/* Form todo list */}
    <View style={{
        marginTop: 20,
        marginBottom: 20,
        width: 340,
        alignItems: 'center',
        justifyContent: 'center',
        
    }}>
        <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        }}>Create a Task</Text>
    </View>
    <View style={styles.container}>
    <View style={{
      flex: 1,
     
      alignItems: 'center',
      justifyContent: 'center',
    
    }}>
      
      <View style={{
        display: "flex",
        justifyContent: 'center',
        flexDirection: "row",
        gap: 10

      }}>
      <TextInput style={{
        borderWidth: 1,
        borderColor: '#000',
        width: 230,
        height: 40,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
      }} placeholder="Input todo list"
        value={text}
      onChangeText={text => setText(text)}
      />
      {/* display current date */}
      <TextInput
        style={{
            borderWidth: 1,
            borderColor: '#000',
            width: 110,
            height: 40,
            padding: 10,
            marginBottom: 10,
            borderRadius: 5
        }}
        placeholder="yyy/mm/dd"
        value={selectedDate}
        onChangeText={selectedDate => setSelectedDate(selectedDate)}
       />
     
      </View>
      
      {/* button touchableOpacity */}
      <TouchableOpacity style={styles.button}
      onPress={handleSubmit}
      >
        <Text style={{
          color: '#fff',
        }}>Add Task</Text>
      </TouchableOpacity>
    {/* Dispaly Todos */}
    <View style={{
      marginTop: 20,
      width: 340,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      }}>Task Lists</Text>
      <View style={{
        display: "flex",
        justifyContent: 'center',
        flexDirection: "row",
        gap: 10
      }}>
      <ScrollView>
      {todos.map((todo) => (
        <View style={{
            display: "flex",
            justifyContent: 'space-between',
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            width: 300,
            marginBottom: 10,
        }} key={todo.id}>
            <View style={{
           
            height: 60,
            padding: 10,
            marginBottom: 10,
            
          }}>
            <Text >{todo.text}
          {/* completed by */}
        
          </Text>
            <Text style={{
                fontSize: 10,
                color: 'gray'
                
            }}>Completed by: {todo.date}</Text>
            </View>
          
          <TouchableOpacity style={{backgroundColor: 'green',
            padding: 10,
            borderRadius: 5,
            width: 40,
            height: 40,
            alignItems: 'center',}}
            onPress={()=>handleCompleted(todo.id)}
            >
           
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
            width: 40,
            height: 40,
            alignItems: 'center',
          
          }}
          onPress={()=>handleDelete(todo.id)}
          >
            <Text style={{
                color: '#fff',
            }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
      </View>

        </View>
        {/* Display Completed */}
        <View style={{
        marginTop: 20,
        width: 340,
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            }}>Completed Task</Text>
        <View style={{
            display: "flex",
            justifyContent: 'center',
            flexDirection: "row",
            gap: 10
        }}>
        <ScrollView>
        {completed.map((todo) => (
            <View key={todo.id}>
            <Text style={{
                borderWidth: 1,
                borderColor: '#000',
                width: 230,
                height: 40,
                padding: 10,
                marginBottom: 10,
                borderRadius: 5
            }}>{todo.text}</Text>
            
            </View>
        ))}
        </ScrollView>
        </View>
        </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    button:{
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      width: 350,
      alignItems: 'center',
    }
  });
  