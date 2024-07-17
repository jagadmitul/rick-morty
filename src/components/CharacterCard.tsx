import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CharacterCardProps {
    name: string;
    image: string;
    species: string;
    gender: string;
    location: string;
    episodeCount: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
    name,
    image,
    species,
    gender,
    location,
    episodeCount,
}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.info}>Species: {species}</Text>
            <Text style={styles.info}>Gender: {gender}</Text>
            <Text style={styles.info}>Location: {location}</Text>
            <Text style={styles.info}>Episodes: {episodeCount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        width: 160,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
    },
    info: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default CharacterCard;
