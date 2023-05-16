interface Props {
  text: string;
}

const Badge = ({ text }: Props) => {
  return (
    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
      {text}
    </span>
  );
};

export default Badge;
