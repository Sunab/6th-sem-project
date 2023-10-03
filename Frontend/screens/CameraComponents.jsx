import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation, route }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Please grant access to storage first");
      return;
    }

    let data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!data.canceled) {
    } else {
      alert("Please select a image.");
    }
    if (route.params.updateProfile) {
      return navigation.navigate("Profile", { image: data.assets[0].uri });
    } else {
      return navigation.navigate("Register", { image: data.assets[0].uri });
    }
  };
  const capturePicture = async () => {
    const data = await camera.takePictureAsync();
    if (route.params.updateProfile) {
      return navigation.navigate("Profile", { image: data.assets[0].uri });
    } else {
      return navigation.navigate("Register", { image: data.assets[0].uri });
    }
    //
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <Text>Please grant access to camera first</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1, aspectRatio: 1 }}
        type={type}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 10,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Icon
          name="picture"
          size={40}
          color="#fff"
          onPress={openImagePickerAsync}
        ></Icon>
        <Icon
          name="camera"
          size={40}
          color="#fff"
          onPress={capturePicture}
        ></Icon>
        <Icon
          name="sync"
          size={40}
          color="#fff"
          onPress={toggleCameraType}
        ></Icon>
      </View>
    </View>
  );
};

export default CameraComponent;
