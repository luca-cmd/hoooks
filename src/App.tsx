import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
	const [started, setStarted] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleControl = () => {
		if (!videoRef.current) return;
		if (!audioRef.current) return;

		if (!started) {
			videoRef.current.play();
			audioRef.current.play();
			setStarted(true);
		} else {
			videoRef.current.pause();
			audioRef.current.pause();
			setStarted(false);
		}
	};

	const handleVisibilityChange = () => {
		if (!videoRef.current) return;

		if (!started) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	};

	useEffect(() => {
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});

	return (
		<div className='App'>
			<div className='videoContainer'>
				<video ref={videoRef} loop>
					<source
						src='https://preview.redd.it/7kgkoysahpw31.gif?format=mp4&s=bcf8ef72a530d08d2448db7d146fe88215e72b20'
						type='video/mp4'
					/>
				</video>
				<audio ref={audioRef}>
					<source src='./audio/audio1.mp3' type='audio/mp3' />
				</audio>
			</div>

			<button onClick={() => handleControl()}>
				{started ? 'stop' : 'start'}
			</button>
		</div>
	);
}

export default App;
