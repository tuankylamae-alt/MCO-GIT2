
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my_notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // READ: Load saved notes when the app starts
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load notes.');
    } finally {
      setLoading(false);
    }
  };

  // SAVE: Store notes using JSON.stringify()
  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedNotes)
      );

      setNotes(updatedNotes);
    } catch (error) {
      Alert.alert('Error', 'Failed to save notes.');
    }
  };

  // CREATE: Add a new note
  const addNote = async () => {
    if (noteText.trim() === '') {
      Alert.alert('Empty Note', 'Please enter a note first.');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      text: noteText.trim()
    };

    const updatedNotes = [...notes, newNote];

    await saveNotes(updatedNotes);
    setNoteText('');
  };

  // UPDATE: Edit an existing note
  const updateNote = async () => {
    if (editText.trim() === '') {
      Alert.alert('Empty Note', 'Please enter some text.');
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editingId
        ? { ...note, text: editText.trim() }
        : note
    );

    await saveNotes(updatedNotes);

    setEditingId(null);
    setEditText('');
  };

  // DELETE: Remove a note
  const deleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedNotes = notes.filter(
              (note) => note.id !== id
            );

            await saveNotes(updatedNotes);
          }
        }
      ]
    );
  };

  // Start editing a note
  const startEditing = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>
      <Text style={styles.subtitle}>
        Your personal notes, saved locally.
      </Text>

      {/* CREATE NOTE */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a new note..."
          value={noteText}
          onChangeText={setNoteText}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addNote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* READ NOTES */}
      <Text style={styles.sectionTitle}>
        My Saved Notes ({notes.length})
      </Text>

      {loading ? (
        <Text style={styles.emptyText}>Loading notes...</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No notes yet. Add your first note!
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              {editingId === item.id ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                  />

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={updateNote}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setEditingId(null);
                        setEditText('');
                      }}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.noteText}>
                    {item.text}
                  </Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => startEditing(item)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteNote(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 20,
    paddingTop: 60
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 25
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25
  },

  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 15
  },

  addButton: {
    backgroundColor: '#2878E5',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 8
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },

  noteCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2
  },

  noteText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15
  },

  editInput: {
    borderWidth: 1,
    borderColor: '#2878E5',
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
    marginBottom: 12
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  editButton: {
    backgroundColor: '#2878E5',
    padding: 9,
    borderRadius: 6,
    marginRight: 8
  },

  deleteButton: {
    backgroundColor: '#E53935',
    padding: 9,
    borderRadius: 6
  },

  saveButton: {
    backgroundColor: '#2E9D59',
    padding: 9,
    borderRadius: 6,
    marginRight: 8
  },

  cancelButton: {
    backgroundColor: '#777',
    padding: 9,
    borderRadius: 6
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 14
  }
});