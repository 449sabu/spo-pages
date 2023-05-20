export interface MessageProps {
  type: string;
  children: React.ReactElement;
}

const MessageAlert: React.FC<MessageProps> = (props) => {
  if (props.type === 'alert') {
    return (
      <div
        role="alert"
        className="rounded border-s-4 border-red-500 bg-red-50 p-4"
      >
        <strong className="block font-medium text-red-800">
          {' '}
          Something went wrong
        </strong>

        <span className="mt-2 text-sm text-red-700">{props.children}</span>
      </div>
    );
  }
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-yellow-500 bg-yellow-50 p-4"
    >
      <strong className="block font-medium text-yellow-800">
        {' '}
        Something went wrong
      </strong>

      <span className="mt-2 text-sm text-yellow-700">{props.children}</span>
    </div>
  );
};

export default MessageAlert;
