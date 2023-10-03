 import React, { useEffect } from "react";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import ChangePassword from "./screens/ChangePassword";
import Verify from "./screens/Verify";
import Add from "./screens/Add";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import UpdateProfile from "./screens/updateProfile";
import CameraComponent from "./screens/CameraComponents";
import { useDispatch, useSelector } from "react-redux";
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';


const BACKGROUND_LOCATION = 'BACKGROUND_LOCATION';
const GEOFENCE_BOUNDARY = 'GEOFENCE_BOUNDARY';
const FETCH_API = 'API_BACKGROUND_TASK';

TaskManager.defineTask(FETCH_API, async ({ data, error }) => {
  if (error) {
    console.error("Error in background task:", error);
    return;
  }

  // Your API call logic goes here
  try {
    const apiResponse = await sendApiRequest();
    console.log("API Response:", apiResponse);
  } catch (error) {
    console.error("API Error:", error);
  }

  // Set the next execution time (e.g., 1 hour from now)
  const nextExecutionTime = Date.now() + 60 * 60 * 1000; // 1 hour
  await setAsync('nextExecutionTime', nextExecutionTime.toString());
});

export async function scheduleBackgroundTask() {
  const nextExecutionTime = await getAsync('nextExecutionTime');
  if (!nextExecutionTime || Date.now() >= parseInt(nextExecutionTime)) {
    await TaskManager.unregisterAllTasksAsync(); // Unregister all previous instances
    await setAsync('nextExecutionTime', (Date.now() + 60 * 60 * 1000).toString()); // Schedule next execution
    await TaskManager.scheduleTaskAsync(TASK_NAME, { interval: 3600 }); // Repeat every 1 hour
  }
}

const geofence = {
  latitude: 27.7057352,
  longitude: 85.3847555,
  radius: 500, // 500 meters
  // 27.7057352,85.3847555 NMS
};

TaskManager.defineTask(
  GEOFENCE_BOUNDARY,
  ({data: {eventType, region}, error}) => {
    if (error) {
      console.log(error.message, 'geofence error');
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  },
);

TaskManager.defineTask(BACKGROUND_LOCATION, async ({data, error}) => {
  if (error) {
    console.error(error.message, 'background location error');
    return;
  }
  if (data) {
    const {locations} = data;
    const location = locations[0];
    if (location) {
      console.log('Location in background', location.coords);
      const isTaskDefined = TaskManager.isTaskDefined(GEOFENCE_BOUNDARY);
      if (!isTaskDefined) {
        console.log('Task is not defined');
        return;
      }
      await Location.startGeofencingAsync(GEOFENCE_BOUNDARY, [
        {
          identifier: 'my-geofence',
          latitude: geofence.latitude,
          longitude: geofence.longitude,
          radius: geofence.radius,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
      ]);
    }
  }
});

const Main = () => {
  // const dispatch = useDispatch();

  // const  allTasks = useSelector((state) => state.task);
  // useEffect(() => {
  //   dispatch(getTasks());
  // }, [dispatch]);

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
  }, []);
  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const {granted} = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log('location tracking denied');
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = TaskManager.isTaskDefined(BACKGROUND_LOCATION);
    if (!isTaskDefined) {
      console.log('Task is not defined');
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKGROUND_LOCATION,
    );
    if (hasStarted) {
      console.log('Already started');
      return;
    }

    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 20000,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff',
      },
    });
  };

  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKGROUND_LOCATION,
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION);
      console.log('Location tacking stopped');
    }
    if (Location.hasStartedGeofencingAsync) {
      Location.stopGeofencingAsync(GEOFENCE_BOUNDARY);
    }
  };

  useEffect(() => {
    startBackgroundUpdate()
  
    return () => {
      stopBackgroundUpdate()
    }
  }, [])

  // console.log(allTasks,'taskssssssss')
  


  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const [initializing, setInitializing] = React.useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (initializing) setInitializing(false);
  if (initializing) return null;

  // Before Login Routes

  const AuthScreens = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{ title: "Verify" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    );
  };

  const BottomTab = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        shifting={true}
        inactiveColor="#3e2465"
        barStyle={{
          backgroundColor: "#694fad",
          height: 70,
          overflow: "hidden",
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          borderColor: "#694fad",
          elevation: 10,
          shadowOffset: {
            width: 5,
            height: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color={"blue"} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={"blue"}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => (
              <MaterialCommunityIcons name="account" color={"blue"} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  const AppScreens = () => {
    return (
      <Stack.Navigator
        initialRouteName="bottom-tab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="bottom-tab" component={BottomTab} />
        <Stack.Screen name="resetPassword" component={ResetPassword} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="updateProfile" component={UpdateProfile} />
        <Stack.Screen name="Camera" component={CameraComponent} />
      </Stack.Navigator>
    );
  };
  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <AppScreens />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthScreens />
    </NavigationContainer>
  );
};

export default Main;

// 3 : 43 : 13
