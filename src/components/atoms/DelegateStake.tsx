import type { AccountInfo } from '@meshsdk/core';
import { KoiosProvider, Transaction } from '@meshsdk/core';
import { useRewardAddress, useWallet } from '@meshsdk/react';
import { useState, useEffect } from 'react';

const DelegateStake = () => {
  const { wallet, connected } = useWallet();
  const rewardAddress = useRewardAddress();
  // const [error, setError] = useState<unknown>();
  const [checking, setChecking] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [walletStatus, setWalletStatus] = useState('Delegate');

  const Koios = new KoiosProvider('api');
  const tx = new Transaction({ initiator: wallet });

  const onCheck = (reword_address: string) =>
    Koios.fetchAccountInfo(reword_address);

  // Accountをチェックする
  const checkAccountStatus = async () => {
    try {
      setChecking(true);
      // setWalletStatus("Checking ...");

      if (rewardAddress) {
        const info = await onCheck(rewardAddress);
        setAccountInfo(info);
      }

      setChecking(false);
    } catch (error) {
      // setError(error)
      console.log(error);
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
      // setError(error);
      console.log(error);
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
        console.log('txHash', txHash);
        setDone(true);
      }
    } catch (error) {
      console.error('error', error);
      // setError(error);
      console.log(error);
    }
    setProcessing(false);
    setWalletStatus('Register Addresses');
  };

  useEffect(() => {
    checkAccountStatus();
  }, [rewardAddress]);

  // if (checking) {
  // 	setWalletStatus('Checking ...')
  // 	// return (
  // 	// 	<button
  // 	// 		className="border-4 rounded-md flex justify-center p-2 basis-1/2"
  // 	// 		disabled={true}
  // 	// 	>
  // 	// 		Checking...
  // 	// 	</button>
  // 	// );
  // }

  if (checking || processing) {
    return (
      <button className="border rounded-md p-2 w-40" disabled={true}>
        <span>Loading...</span>
      </button>
    );
  }
  if (done) {
    return (
      <button className="border rounded-md p-2 w-40" disabled={true}>
        <span>委任済み</span>
      </button>
    );
  }

  if (accountInfo?.active) {
    return (
      <button className="border rounded-md p-2 w-40" onClick={delegateStake}>
        <span>Delegate Stake</span>
      </button>
    );
  }

  return (
    <button
      className="border rounded-md p-2 w-40 disabled:cursor-not-allowed"
      onClick={registerAddress}
      disabled={!connected}
    >
      <span>{walletStatus}</span>
    </button>
  );
};

export default DelegateStake;
