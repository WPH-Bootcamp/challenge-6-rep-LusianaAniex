import { getImageUrl } from '../../services/movies/services';

interface CastCardProps {
  name: string;
  role: string;
  profilePath: string | null;
}

const CastCard: React.FC<CastCardProps> = ({ name, role, profilePath }) => {
  return (
    <div className='flex rounded-xl overflow-hidden w-full md:w-[360px] h-[104px]'>
      {profilePath ? (
        <img
          src={getImageUrl(profilePath)}
          alt={name}
          className='w-[69px] h-[104px] object-contain rounded-lg flex-shrink-0'
        />
      ) : (
        <img
          src='/icon-photo-blank.svg'
          alt='No photo available'
          className='w-[69px] h-[104px] object-contain rounded-lg flex-shrink-0'
        />
      )}
      <div className='flex flex-col justify-center p-4'>
        <div className='font-semibold text-base text-white'>{name}</div>
        <div className='text-sm text-neutral-400 mt-1'>{role}</div>
      </div>
    </div>
  );
};

export default CastCard;
