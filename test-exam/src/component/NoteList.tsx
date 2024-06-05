import React, { useState } from 'react';
import useNoteStore from '../store/store';
import { Note } from '../type/Note';
import NoteForm from './NoteForm';
import Modal from './Modal';

const NoteList: React.FC = () => {
    const notes = useNoteStore((state) => state.notes);
    const deleteNote = useNoteStore((state) => state.deleteNote);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [viewingNote, setViewingNote] = useState<Note | null>(null);

    const handleEdit = (note: Note) => {
        setEditingNote(note);
    };

    const handleDelete = (id: number) => {
            deleteNote(id);
            setViewingNote(null); // Close the modal after deletion
    };

    const handleView = (note: Note) => {
        setViewingNote(note);
    };

    return (
        <div>
            {editingNote && (
                <NoteForm
                    editingNote={editingNote}
                    onFinishEditing={() => setEditingNote(null)}
                />
            )}
            {notes.map((note) => (
                <div key={note.id} className={`note ${getNoteColor(note.score)}`} onClick={() => handleView(note)}>
                    <h2>{note.title}</h2>
                    <p>{note.date}</p>
                    <p>{note.comment.substring(0, 20)}...</p>
                </div>
            ))}
            {viewingNote && (
                <Modal isOpen={!!viewingNote} onClose={() => setViewingNote(null)}>
                    <h2>{viewingNote.title}</h2>
                    <p>{viewingNote.date}</p>
                    <p>{viewingNote.comment}</p>
                    <p>{viewingNote.score}</p> {/* Ajoutez ce score pour le rendre visible dans le test */}
                    <button onClick={() => handleEdit(viewingNote)}>Edit</button>
                    <button onClick={() => handleDelete(viewingNote.id)}>Delete</button>
                </Modal>
            )}
        </div>
    );
};

const getNoteColor = (score: number) => {
    if (score < 8) return 'red';
    if (score < 10) return 'orange';
    if (score < 13) return 'yellow';
    return 'green';
};

export default NoteList;
