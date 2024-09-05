const Video = ({ url, autoplay = 0 }: { url: string; autoplay?: 0 | 1 }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={`${url}&high_quality=1&as_wide=1&autoplay=${autoplay}`}
        title="video player"
        allowFullScreen={true}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
      ></iframe>
    </div>
  );
};

export default Video;
