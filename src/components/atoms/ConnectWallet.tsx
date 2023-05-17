import { Menu, Transition } from '@headlessui/react';
import { useWallet, useWalletList } from '@meshsdk/react';
import { Fragment } from 'react';
import Spinner from './Spinner';

const ConnectWallet = () => {
  const wallets = useWalletList();
  const { connect, connected } = useWallet();

  return (
    <div className="fixed text-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-40">
            {connected ? <Spinner /> : 'Connect Wallet'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-2 -mr-1 h-5 w-5  text-white hover:text-violet-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* Wallet List */}
            {wallets.map((element, index) => (
              <div className="px-1 py-1" key={index}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        connect(element.name);
                      }}
                    >
                      <img
                        src={element.icon}
                        alt={element.name}
                        className="h-8 w-8"
                      />
                      <span className="pl-4">
                        {element.name === 'eternl' ? 'Eternl' : element.name}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ConnectWallet;
