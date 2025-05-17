import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.flexView}>
      <Text>HelloT </Text>
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={toggleModal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },

});
