import Image from 'next/image';
import StakingButton from '@/components/modecules/StakingButton';

type Props = {
  theme: string;
  pool_information: PoolInformation;
};

const Hero = ({ theme, pool_information }: Props) => {
  return (
    <div className={`${theme}`}>
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
