export interface EmbedYoutubeProps {
  url: string;
  id: string;
}

const EmbedYoutube: React.FC<EmbedYoutubeProps> = (props) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.id}`}
        title="YouTube video player"
        // frameorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // allowfullscreen
      ></iframe>
    </div>
  );
};

export default EmbedYoutube;
