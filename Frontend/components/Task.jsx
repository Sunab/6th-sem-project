import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { deleteTask, loadUser, updateTask } from "../Redux/Action";

const Task = ({
  title,
  description,
  hospital_name,
  blood_group,
  longitude,
  latitude,
  status,
  taskId,
}) => {
  const [completed, setCompleted] = useState(status);
  const dispatch = useDispatch();

  const handleCheckedBox = () => {
    setCompleted(!completed);
    console.log("my task id is: ", taskId);
    dispatch(updateTask(taskId));
  };

  // console.log("is handle checkbox,", handleCheckedBox;
  const deleteHandler = async () => {
    console.log("deleting task");
    dispatch(deleteTask(taskId));
    dispatch(loadUser());
  };
  return (
    <View style={taskStyle.taskContainer}>
      <View style={{ width: "70%" }}>
        <Text style={taskStyle.tasksTitle}>{title}</Text>
        <Text style={taskStyle.tasksTitle}>{description}</Text>
        <Text style={taskStyle.tasksTitle}>{hospital_name}</Text>
        <Text style={taskStyle.tasksTitle}>{blood_group}</Text>
        <Text style={taskStyle.tasksTitle}>{longitude}</Text>
        <Text style={taskStyle.tasksTitle}>{latitude}</Text>
      </View>

      <Checkbox
        status={completed ? "checked" : "unchecked"}
        color="#474747"
        onPress={handleCheckedBox}
      />
      <Icon
        style={taskStyle.deleteIcon}
        name="delete"
        color="#ffff"
        size={20}
        onPress={deleteHandler}
      />
    </View>
  );
};

const taskStyle = StyleSheet.create({
  taskContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tasksTitle: {
    fontSize: 20,
    marginVertical: 7,
    color: "#900",
  },
  tasksDesc: {
    color: "#4a4a4a",
  },
  deleteIcon: {
    backgroundColor: "#900",
    padding: 10,
    borderRadius: 100,
  },
});

export default Task;
