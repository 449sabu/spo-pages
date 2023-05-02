type Props = {
  social_link: string;
  children: React.ReactNode;
};

const SocialButton = ({ social_link, children }: Props) => {
  return (
    <a
      href={social_link}
      rel="noreferrer"
      target="_blank"
      className="text-gray-700 transition hover:opacity-75"
    >
      {children}
    </a>
  );
};

export default SocialButton;
