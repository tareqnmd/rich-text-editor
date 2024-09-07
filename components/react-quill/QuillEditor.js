'use client';
import { useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuillEditor from './ReactQuill';

export const QuillEditor = ({ value, onValueChange }) => {
	const quillRef = useRef(null);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [] }],
					[{ font: [] }, { color: [] }, { background: [] }],
					['bold', 'italic', 'underline', 'strike'],
					['blockquote', 'code-block'],
					[{ script: 'sub' }, { script: 'super' }],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' },
					],
					[{ align: [] }, { direction: 'rtl' }],
					['link', 'image', 'video', 'formula'],
					['clean'],
					['imageLink'],
				],
				handlers: {
					imageLink: imageHandler,
				},
			},
		}),
		[]
	);

	function imageHandler() {
		if (!quillRef.current) return;

		const editor = quillRef.current.getEditor();
		const range = editor.getSelection();
		const value = prompt('Please enter the image URL');

		if (value && range) {
			editor.insertEmbed(range.index, 'image', value, 'user');
		}
	}

	return (
		<ReactQuillEditor
			forwardedRef={quillRef}
			theme="snow"
			defaultValue={value}
			onChange={onValueChange}
			modules={modules}
		/>
	);
};
