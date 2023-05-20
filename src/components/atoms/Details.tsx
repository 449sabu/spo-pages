import { Disclosure } from '@headlessui/react';
import ChevronUpIcon from '@/components/atoms/svgs/ChevronUpIcon';

export interface DetailsProps {
  title: string;
  children: React.ReactElement;
}

const Details: React.FC<DetailsProps> = (props) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
            <span>{props.title}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-gray-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            {props.children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Details;
