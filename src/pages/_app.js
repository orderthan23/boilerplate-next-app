import '../styles/globals.css';
import IndexWrapper from '@component/wrapper/IndexWrapper';

export default function App({ Component, pageProps }) {
	return (
		<IndexWrapper>
			<Component {...pageProps} />
		</IndexWrapper>
	);
}
