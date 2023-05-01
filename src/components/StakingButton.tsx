import { Dialog, Transition, Tab } from '@headlessui/react';
import type { AccountInfo } from '@meshsdk/core';
import { KoiosProvider, Transaction } from '@meshsdk/core';
import {
  useRewardAddress,
  useWallet,
  useWalletList,
  useWalletTx,
} from '@meshsdk/react';
import { Fragment, useState, useEffect } from 'react';

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
                          <WalletList />
                          <p>
                            2. 内容の確認し、「ステーキングする」ボタンを押す
                          </p>
                          <Delegate />
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

const WalletList = () => {
  const wallets = useWalletList();
  const { connect } = useWallet();

  return (
    <div className="grid gap-2 grid-cols-3 my-4">
      {wallets.map((e, i) => (
        <div
          key={i}
          className="border-4 rounded-md flex justify-center p-2"
          onClick={() => {
            connect(e.name);
          }}
        >
          <img src={e.icon} alt={e.name} className="h-8 w-8" />
          <button className="ml-2">{e.name}</button>
        </div>
      ))}
    </div>
  );
};

const Delegate = () => {
  // const tx = useWalletTx();
  const { wallet } = useWallet();
  const rewardAddress = useRewardAddress();
  const [error, setError] = useState<unknown>();
  const [checking, setChecking] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const Koios = new KoiosProvider('api');
  const tx = new Transaction({ initiator: wallet });

  const onCheck = (reword_address: string) =>
    Koios.fetchAccountInfo(reword_address);

  // Accountをチェックする
  const checkAccountStatus = async () => {
    try {
      setChecking(true);

      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }

      setChecking(false);
    } catch (error) {
      setError(error);
    }
  };

  // 委任先変更
  const delegateStake = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .delegateStake(rewardAddress, process.env.NEXT_PUBLIC_POOL_ID!)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  // 委任登録
  const registerAddress = async () => {
    setProcessing(true);
    setDone(false);
    try {
      if (rewardAddress) {
        const unsignedTx = await tx
          .registerStake(rewardAddress)
          .delegateStake(rewardAddress, process.env.NEXT_PUBLIC_POOL_ID!)
          .build();

        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        // console.log('txHash', txHash);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
    setProcessing(false);
  };

  useEffect(() => {
    checkAccountStatus();
  }, [rewardAddress]);

  if (checking) {
    return (
      <button
        className="border-4 rounded-md flex justify-center p-2 basis-1/2"
        disabled={true}
      >
        Checking...
      </button>
    );
  }
  if (processing) {
    return (
      <button
        className="border-4 rounded-md flex justify-center p-2 basis-1/2"
        disabled={true}
      >
        Loading...
      </button>
    );
  }
  if (done) {
    return (
      <button
        className="border-4 rounded-md flex justify-center p-2 basis-1/2"
        disabled={true}
      >
        委任済み
      </button>
    );
  }
  if (accountInfo?.active) {
    return (
      <button
        className="border-4 rounded-md flex justify-center p-2 basis-1/2"
        onClick={delegateStake}
      >
        委任する
      </button>
    );
  }

  return (
    <button
      className="border-4 rounded-md flex justify-center p-2"
      onClick={registerAddress}
    >
      新しく委任する
    </button>
  );
};
