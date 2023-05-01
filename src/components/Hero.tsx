import Image from 'next/image';
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
          <StakingButton />
        </div>
        <div className="m-auto invisible md:visible">
          <Image
            src="/Cardano-Logo-White.png"
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
