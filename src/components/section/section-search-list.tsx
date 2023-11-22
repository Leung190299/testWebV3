import {  useMemo } from 'react';
import tutorials from '@/mock/search-tutorial.json';

type SuggestListProps = {
    inputValue: string;
    onClick: () => void;
};

const SuggestList = ({ inputValue, onClick }: SuggestListProps) => {
    const suggestList = useMemo(() => {
        let data = tutorials.filter((item) => item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));
        return data;
    }, [inputValue]);
    const handleItemClick = (item: any) => {
        // window.location.href = `/details/${item.id}`;
    };
    return (
        <>
            {inputValue.length > 0 && (
                <div className="w-[100%] overflow-auto rounded-xl flex flex-col bg-neutral-700 p-2 absolute h-fit max-h-[19rem] mt-4 right-0 shadow-itel">
                    {suggestList.map((item, index) => (
                        <button key={index} className="w-full p-4 rounded-lg text-start" onClick={() => handleItemClick(item)}>
                            <span className="text-base font-normal"><span className='font-bold'>[{item.category}] </span>{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};
export default SuggestList;
