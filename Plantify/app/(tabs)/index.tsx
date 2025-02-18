import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCurrentTime } from '@/constants/Hello';
import Overlay from '@/components/Overlay';
import HarvestOverlay from '@/components/HarvestOverlay';
import { getRandomTip } from '@/constants/GetTip';
import BigButton from '@/components/BigButton';
import InfoBox from '@/components/InfoBox';
import { useState } from 'react';

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const handleAddNewPlant = () => {
    setIsVisible(true);
  };

  const handleAddNewHarvest = () => {
    setIsVisible2(true);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8BC34A', dark: '#8BC34A' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg.png')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{getCurrentTime()}</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
      <InfoBox
        title="Tipp für Dich"
        text={getRandomTip()}
      />
      </ThemedView>

      <ThemedView style={{ marginTop: 10 }}>
        <BigButton title="+ Neue Pflanze" onPress={handleAddNewPlant} />
        <BigButton title="+ Neue Ernte" onPress={handleAddNewHarvest} />
      </ThemedView>

      <Overlay isVisible={isVisible} setIsVisible={setIsVisible} />
      <HarvestOverlay isVisible={isVisible2} setIsVisible={setIsVisible2} />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});