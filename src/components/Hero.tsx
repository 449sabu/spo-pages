import Image from 'next/image';
import CardanoLogo from '../../public/Cardano-RGB_Logo-Icon-White.png';
import StakingButton from '@/components/StakingButton';
type Props = {
  bgColor: string;
  pool_information: PoolInformation;
};

const Hero = ({ bgColor, pool_information }: Props) => {
  return (
    <div className={`${bgColor}`}>
      <div className="h-80 md:h-96 max-w-4xl m-auto md:grid md:grid-cols-2">
        <div className="m-4 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold pb-4">
            {pool_information.meta_json.name}
          </h1>
          <p className="pb-4">{pool_information.meta_json.description}</p>
          <button className="bg-orange-300 py-2 px-4 rounded-full w-44">
            Start Staking
          </button>
          <StakingButton />
        </div>
        <div className="m-auto invisible md:visible">
          <Image
            src={CardanoLogo}
            width={260}
            height={260}
            alt="logo"
            className="opacity-60 m-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
