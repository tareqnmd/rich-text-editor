'use client';
import { useMemo, useRef } from 'react';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactQuillEditor from './ReactQuill';

const fontSizeArr = [
	'8px',
	'9px',
	'10px',
	'12px',
	'14px',
	'16px',
	'20px',
	'24px',
	'32px',
	'42px',
	'54px',
	'68px',
	'84px',
	'98px',
];

var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

export const QuillEditor = ({ value, onValueChange }) => {
	const quillRef = useRef(null);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [] }],
					[
						{ font: [] },
						{ color: [] },
						{ background: [] },
						{ size: fontSizeArr },
					],
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
