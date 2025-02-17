// InfoBox.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface InfoBoxProps {
  title: string;
  text: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, text }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/info-icon.png')}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
});

export default InfoBox;