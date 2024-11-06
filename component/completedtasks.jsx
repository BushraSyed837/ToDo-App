import React from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeTodo} from '../store/todoSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  const completedTasks = todos.filter(todo => todo.completed);

  const handleRemoveTodo = id => {
    dispatch(removeTodo({id}));
  };

  const renderItem = ({item}) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, styles.completedText]}>{item.text}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
          <Icon name="delete" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {completedTasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks to display</Text>
      ) : (
        <FlatList
          data={completedTasks}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskItem: {
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
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  noTasksText: {
    fontSize: 17,
    color: '#FF5733',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CompletedTasks;
