import Image from 'next/image';

type Props = {
  title: string;
};
const Card = ({ title }: Props) => {
  return (
    <div className="block rounded-lg bg-white drop-shadow-md">
      <img
        className="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
        alt="blog image"
      />
      <a href="#!" target="_blank">
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
      </a>

      <div className="p-4">
        <p className="mb-2 text-xl">{title}</p>
        <p className="">2023-12-22</p>
      </div>
    </div>
  );
};

export default Card;
