import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
  resetTodos,
} from '../store/todoSlice';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo({text: todoText})); // add tasks to list
      setTodoText('');
    }
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo({id}));
  }; // handle task as completed

  const handleRemoveTodo = id => {
    dispatch(removeTodo({id})); // remove task
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id); // edit task
    setEditText(text);
  };

  const handleUpdateTodo = () => {
    if (editText.trim()) {
      dispatch(updateTodo({id: editingId, text: editText}));
      setEditingId(null); // update task
      setEditText('');
    }
  };

  // to render flat list
  const renderTodoItem = ({item}) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => handleToggleTodo(item.id)}>
        <Text style={[styles.todoText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEditTodo(item.id, item.text)}>
          <Icon name="pencil" size={24} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
          <Icon name="delete" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Tasks</Text>

        <TouchableOpacity
          onPress={() => dispatch(resetTodos())}
          style={styles.resetIcon}>
          <Icon name="refresh" size={28} color="#FF5252" />
        </TouchableOpacity>
      </View>

      {editingId === null ? (
        <>
          <TextInput // this code run when a new task added
            style={styles.input}
            placeholder="Add a new task"
            placeholderTextColor="#FFA500"
            value={todoText}
            onChangeText={setTodoText}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput // to edit task
            style={styles.input}
            placeholder="Edit task"
            placeholderTextColor="#FFA500"
            value={editText}
            onChangeText={setEditText}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateTodo}>
            <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
        </>
      )}

      {/*to display tasks list*/}

      {todos.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks to display</Text>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e79b0f',
    textAlign: 'center',
    flex: 1,
  },
  resetIcon: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  input: {
    height: 50,
    borderColor: '#FFA500',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  todoText: {
    fontSize: 19,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: 20,
  },
  noTasksText: {
    fontSize: 17,
    color: '#FF5733',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default TodoApp;
