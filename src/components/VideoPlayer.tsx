import { useEffect, useRef } from 'react';
import cloudinary from 'cloudinary-video-player';

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  id?: string;
  publicId: string;
  playerConfig?: object;
  sourceConfig?: object;
}

const VideoPlayer = ({
  id,
  publicId,
  playerConfig = {},
  sourceConfig = {},
  ...props
}: VideoPlayerProps) => {
  const cloudinaryRef = useRef<typeof cloudinary | null>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    const videoId = id || 'cld-video-player-' + publicId;
    const player = cloudinaryRef.current.videoPlayer(videoId, {
      cloud_name: 'demo',
      secure: true,
      controls: false,
      ...playerConfig,
    });
    player.source(publicId, sourceConfig);
  }, [publicId, playerConfig, sourceConfig]);
  const videoId = id || 'cld-video-player-' + publicId;
  return (
    <video
      ref={playerRef}
      id={videoId}
      className="cld-video-player cld-fluid"
      {...props}
    />
  );
};

export default VideoPlayer;
