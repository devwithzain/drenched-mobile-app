import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import Colors from '@/constants/colors';
import { useAudio } from '@/context/AudioContext';

interface MiniPlayerProps {
  visible: boolean;
  onPress: () => void;
  onClose: () => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ visible, onPress, onClose }) => {
  const { currentTrack, isPlaying, togglePlay, closeTrack, skip } = useAudio();

  if (!visible || !currentTrack) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <Image
        source={{ uri: currentTrack.image }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {currentTrack.narrator || currentTrack.subtitle || 'Drenched Live Worship'}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn} onPress={(e) => { e.stopPropagation(); togglePlay(); }}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={15} color={Colors.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={(e) => { e.stopPropagation(); skip(5); }}>
          <Icon name="step-forward" size={15} color={Colors.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={(e) => { e.stopPropagation(); onClose(); closeTrack(); }}>
          <Icon name="times" size={15} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Positioned hover above tab bar nicely
    left: 16,
    right: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 1000,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: Colors.textMedium,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlBtn: {
    padding: 6,
  },
});

export default MiniPlayer;
