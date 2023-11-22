import { useState } from 'react';
import OTPInput from '../otpInput';

type props = {
  onSearch?(velue: string): void;
};

const SimSearch = ({ onSearch }: props) => {
	const [query, setQuery] = useState<string>('');
	const handleSearch = () => {
		let newQuery = query.trim();
		let length = 7 - query.trim().length;
		if (newQuery.length <= 7) {
		  for (let index = 0; index < length; index++) {
			newQuery += '*';
		  }
		}
		onSearch?.(newQuery);
		// focusInput.setFalse();
	  };
  return (
    <div className='flex flex-col w-full justify-center items-center gap-1'>
      <div className='font-medium text-neutral-0 text-[14px] tracking-[0] leading-[20px] whitespace-nowrap'>Nhập số thuê bao mong muốn</div>
      <div className='flex items-center justify-between w-full md:w-auto  md:justify-center md:text-[32px] text-3xl font-itel  md:gap-4 '>
        <span className="font-bold text-center text-neutral-0">087</span>
        <OTPInput
          value={query}
          onChange={setQuery}
          valueLength={7}
          onSubmit={()=>handleSearch()}
          containerStyle={'flex-1 truncate bg-transparent outline-none [&>*:nth-child(5)]:ml-4 '}
          inputStyle=" w-[30px] h-[36px] md:w-[33px] md:h-[38px] flex font-bold justify-center text-center ml-1 text-[18px] md:text-lg items-center  flex bg-neutral-100 rounded-[10px] border border-solid border-[#861121]  shadow-[inset_0px_4px_4px_#00000040]  "
        />
        <button onClick={()=>handleSearch()} type="button" className="w-11 h-11 rounded-[10px] border-2 border-solid border-neutral-0 flex justify-center items-center" >
          <img className=" w-[22px] h-[22px]" alt="Fa search" src="/icons/search.svg" />
        </button>
		  </div>
		  <p className=" font-medium text-neutral-0 text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
        Điền vào ô trống chữ số mong muốn
      </p>
    </div>
  );
};

export default SimSearch;
