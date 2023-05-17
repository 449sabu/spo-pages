import { Dialog, Transition, Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ConnectWallet from '../atoms/ConnectWallet';
import DelegateStake from '../atoms/DelegateStake';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const StakingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-orange-400 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          ステーキングを始める
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    委任する方法を選んでください
                  </Dialog.Title>
                  <div className="mt-2">
                    <Tab.Group>
                      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                            )
                          }
                        >
                          DApp Connecter を使用する
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected
                                ? 'bg-white shadow'
                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                            )
                          }
                        >
                          Daedalus / Yoroi Wallet を使用する
                        </Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel className="m-4">
                          <p>1, ウォレットを選択</p>
                          <div className="h-20 m-6 ">
                            <ConnectWallet />
                          </div>
                          <p>
                            2. 内容の確認し、「ステーキングする」ボタンを押す
                          </p>
                          <div className="h-20 m-6">
                            <DelegateStake />
                          </div>
                        </Tab.Panel>
                        <Tab.Panel className="m-4">作成中です。</Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default StakingButton;
