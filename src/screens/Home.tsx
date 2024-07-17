import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setSearchQuery, setNameFilter, setEpisodeCountFilter, resetFilters, setPage, setCharacters, setAllCharacters } from '../redux/slices/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import { getAllCharacters, getCharacters } from '../api/rickMortyApi';

type Character = {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    location: { name: string };
    episode: string[];
};

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { characters, page, totalPages, searchQuery, nameFilter, episodeCountFilter } = useSelector((state: RootState) => state.characters);

    const [loading, setLoading] = useState(false);

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const allCharactersData = await getAllCharacters();
            const charactersData = await getCharacters(page);
            dispatch(setAllCharacters(allCharactersData));
            if (!searchQuery || !nameFilter || !episodeCountFilter) {
                dispatch(setCharacters(charactersData));
            }
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, [page]);

    const handlePageClick = (p: number) => {
        dispatch(setPage(p));
    };

    const renderItem = ({ item }: { item: Character }) => (
        <CharacterCard
            name={item.name}
            image={item.image}
            species={item.species}
            gender={item.gender}
            location={item.location.name}
            episodeCount={item.episode.length}
        />
    );

    const renderPaginationButtons = () => {
        const maxButtonsToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

        if (endPage - startPage + 1 < maxButtonsToShow) {
            startPage = Math.max(1, endPage - maxButtonsToShow + 1);
        }

        const buttons = [];
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handlePageClick(i)}
                    style={[
                        styles.paginationButton,
                        i === page ? styles.activeButton : null,
                    ]}>
                    <Text style={{ color: 'white' }}>{i}</Text>
                </TouchableOpacity>
            );
        }

        return buttons;
    };

    const handleSearchChange = useCallback((text: string) => {
        dispatch(setSearchQuery(text));
    }, [dispatch]);

    const handleNameFilterChange = useCallback((text: string) => {
        dispatch(setNameFilter(text));
    }, [dispatch]);

    const handleEpisodeCountFilterChange = useCallback((count: string) => {
        const episodeCount = parseInt(count, 10) || 0;
        dispatch(setEpisodeCountFilter(episodeCount));
    }, [dispatch]);

    const handleResetFilters = () => {
        dispatch(resetFilters());
        fetchCharacters();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.filters}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Filter by Name..."
                        value={nameFilter}
                        onChangeText={handleNameFilterChange}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Filter by Episode Count..."
                        keyboardType="numeric"
                        value={episodeCountFilter.toString()}
                        onChangeText={handleEpisodeCountFilterChange}
                    />
                    <Button title="Reset Filters" onPress={handleResetFilters} />
                </View>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <FlatList
                        data={characters}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContainer}
                    />
                )}
            </View>
            <View style={styles.paginationContainer}>
                {renderPaginationButtons()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    filters: {
        marginTop: 15,
        padding: 15,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
    },
    paginationButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 4,
        backgroundColor: 'gray',
    },
    activeButton: {
        backgroundColor: '#22c55d',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    flatListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
});

export default Home;
