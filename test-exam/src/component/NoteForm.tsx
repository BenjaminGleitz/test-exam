import React, { useState, useEffect } from 'react';
import useNoteStore from '../store/store';
import { Note } from '../type/Note';

interface NoteFormProps {
    editingNote?: Note;
    onFinishEditing?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ editingNote, onFinishEditing }) => {
    const addNote = useNoteStore((state) => state.addNote);
    const updateNote = useNoteStore((state) => state.updateNote);
    const [title, setTitle] = useState(editingNote ? editingNote.title : '');
    const [score, setScore] = useState(editingNote ? editingNote.score.toString() : '');
    const [comment, setComment] = useState(editingNote ? editingNote.comment : '');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setScore(editingNote.score.toString());
            setComment(editingNote.comment);
        }
    }, [editingNote]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingNote) {
            updateNote(editingNote.id, {
                title,
                score: parseInt(score),
                comment,
            });
            if (onFinishEditing) onFinishEditing();
        } else {
            const newNote = {
                id: Date.now(),
                title,
                score: parseInt(score),
                comment,
                date: new Date().toLocaleDateString(),
            };
            addNote(newNote);
        }
        setTitle('');
        setScore('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input name={'title'} id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="score">Score</label>
                <input name={'score'} id="score" value={score} onChange={(e) => setScore(e.target.value)} />
            </div>
            <div>
                <label htmlFor="comment">Comment</label>
                <textarea name={'comment'} id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit">{editingNote ? 'Update' : 'Submit'}</button>
        </form>
    );
};

export default NoteForm;
