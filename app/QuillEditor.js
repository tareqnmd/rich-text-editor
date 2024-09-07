/* eslint-disable react/display-name */
'use client';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
	async () => {
		const ReactQuill = (await import('react-quill')).default;

		return ({ forwardedRef, ...rest }) => (
			<ReactQuill
				ref={forwardedRef}
				{...rest}
			/>
		);
	},
	{
		ssr: false,
	}
);

export const Editor = ({ value, onValueChange }) => {
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
		<ReactQuill
			forwardedRef={quillRef}
			theme="snow"
			defaultValue={value}
			onChange={onValueChange}
			modules={modules}
		/>
	);
};
