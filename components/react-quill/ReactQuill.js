import dynamic from 'next/dynamic';

const ReactQuillEditor = dynamic(
	async () => {
		const ReactQuill = (await import('react-quill')).default;
		const Editor = ({ forwardedRef, ...rest }) => (
			<ReactQuill
				ref={forwardedRef}
				{...rest}
			/>
		);
		return Editor;
	},
	{
		ssr: false,
	}
);
export default ReactQuillEditor;
