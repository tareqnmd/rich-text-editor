import LexicalEditor from '@/components/lexical/LexicalEditor';
import { QuillEditor } from '@/components/react-quill/QuillEditor';

const page = () => {
	return (
		<>
			<h3>Editors</h3>
			<QuillEditor />
			<LexicalEditor />
		</>
	);
};

export default page;
