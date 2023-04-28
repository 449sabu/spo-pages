import { Dialog, Transition, Tab, Menu } from '@headlessui/react';
import type { AccountInfo } from '@meshsdk/core';
import {
  useRewardAddress,
  useWallet,
  useWalletList,
  useWalletTx,
} from '@meshsdk/react';
import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const wallets = useWalletList();
  const { connect, connecting, connected, name } = useWallet();

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
          className="rounded-full bg-orange-400 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                          <p>2. トランザクション内容の確認</p>
                          <p>3. 「ステーキングする」ボタンを押す</p>
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
}

const WalletList = () => {
  const wallets = useWalletList();
  console.log(wallets);
  return (
    <div className="grid gap-2 grid-cols-3 my-4">
      {wallets.map((e, i) => (
        <div key={i} className="border-4 rounded-md flex justify-center p-2">
          <img src={e.icon} alt={e.name} className="h-8 w-8" />
          <button className="ml-2">{e.name}</button>
        </div>
      ))}
    </div>
  );
};

// const Delegate = ({
//   poolId,
//   onCheck,
//   content,
// }: {
//   poolId: string;
//   onCheck: any;
//   content: Content;
// }) => {
//   const tx = useWalletTx();
//   const { wallet } = useWallet();
//   const rewardAddress = useRewardAddress();
//   const [error, setError] = useState<unknown>();
//   const [checking, setChecking] = useState(false);
//   const [accountInfo, setAccountInfo] = useState<AccountInfo>();
//   const [processing, setProcessing] = useState(false);
//   const [done, setDone] = useState(false);

//   const checkAccountStatus = async () => {
//     try {
//       setChecking(true);

//       if (rewardAddress) {
//         const info = await onCheck(rewardAddress);
//         setAccountInfo(info);
//       }

//       setChecking(false);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   const registerAddress = async () => {
//     setProcessing(true);
//     setDone(false);
//     try {
//       if (rewardAddress) {
//         const unsignedTx = await tx
//           .registerStake(rewardAddress)
//           .delegateStake(rewardAddress, poolId)
//           .build();

//         const signedTx = await wallet.signTx(unsignedTx);
//         const txHash = await wallet.submitTx(signedTx);
//         console.log('txHash', txHash);
//         setDone(true);
//       }
//     } catch (error) {
//       console.error('error', error);
//       setError(error);
//     }
//     setProcessing(false);
//   };

//   const delegateStake = async () => {
//     setProcessing(true);
//     setDone(false);
//     try {
//       if (rewardAddress) {
//         const unsignedTx = await tx
//           .delegateStake(rewardAddress, poolId)
//           .build();

//         const signedTx = await wallet.signTx(unsignedTx);
//         const txHash = await wallet.submitTx(signedTx);
//         setDone(true);
//       }
//     } catch (error) {
//       console.error('error', error);
//       setError(error);
//     }
//     setProcessing(false);
//   };

//   useEffect(() => {
//     checkAccountStatus();
//     console.log(accountInfo?.active);
//   }, [rewardAddress]);

//   if (checking) {
//     return (
//       <Button
//         disabled={true}
//         colorScheme={`${content.theme}`}
//         bg={`${content.theme}.400`}
//         rounded={'md'}
//         px={6}
//         _hover={{
//           bg: `${content.theme}.500`,
//         }}
//       >
//         Checking...
//       </Button>
//     );
//     // return <span>Checking...</span>;
//   }
//   if (processing) {
//     return (
//       <Button
//         disabled={true}
//         colorScheme={`${content.theme}`}
//         bg={`${content.theme}.400`}
//         rounded={'md'}
//         px={6}
//         _hover={{
//           bg: `${content.theme}.500`,
//         }}
//       >
//         Loading...
//       </Button>
//     );
//     // return <span>Loading...</span>;
//   }
//   if (done) {
//     return (
//       <Button
//         disabled={true}
//         colorScheme={`${content.theme}`}
//         bg={`${content.theme}.400`}
//         rounded={'md'}
//         px={6}
//         _hover={{
//           bg: `${content.theme}.500`,
//         }}
//       >
//         委任済み
//       </Button>
//     );
//     // return <span>Stake Delegated</span>;
//   }

//   if (accountInfo?.active) {
//     return accountInfo.poolId === poolId ? (
//       <button
//         disabled={true}
//       >
//         既に委任しています。
//       </button>
//     ) : (
//       // <span>Stake Delegated</span>
//       <Button
//         onClick={delegateStake}
//         colorScheme={`${content.theme}`}
//         bg={`${content.theme}.400`}
//         rounded={'md'}
//         px={6}
//         _hover={{
//           bg: `${content.theme}.500`,
//         }}
//       >
//         委任する
//       </Button>
//     );
//   }

//   return (
//     <Button
//       onClick={registerAddress}
//       colorScheme={`${content.theme}`}
//       bg={`${content.theme}.400`}
//       rounded={'md'}
//       px={6}
//       _hover={{
//         bg: `${content.theme}.500`,
//       }}
//     >
//       新しく委任する
//     </Button>
//   );
//   // return <span onClick={registerAddress}>Register Address</span>;
// };
