import React, { useState } from 'react';
import {useModal} from "@/libs/modal";
import Svg from '../icon/svg';
import tutorials from '@/mock/tutorial.json';
import {useRouter} from "next/router";
import Routers from '@/routes';
import {CustomProps} from "@/types/element-type";
import clsx from "clsx";

type Props = {
    onInputChange: any;
    goBack?: () => void;
};
const ModalSearchTutorial = ({ onInputChange, goBack }: CustomProps<Props, 'nav'>) => {
    const { close } = useModal();
    const [inputValue, setInputValue] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const router = useRouter();
    const onGoBack = () => {
        if (goBack) goBack();
        else router.back();
    };

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setInputValue(value);
        onInputChange(value, true);
        if(value){
            setIsSearch(true);
        }else{
            setIsSearch(false);
        }
    };
    const handleSubmit = () => {
        onInputChange(inputValue, false);
    };
    function onClear() {
        setIsSearch(false);
        setInputValue('');
    }

    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            onInputChange(inputValue, false);
        }
    };

    // const filteredData = tutorials[activeTab].data.filter(item =>
    //     item.name.toLowerCase().includes(inputValue.toLowerCase())
    // );
    function normalizeString(string:string) {
        return string.toLocaleLowerCase().normalize("NFC");
    }

    const filteredData = tutorials.flatMap(item =>
        item.data
            .filter(dataItem =>
                normalizeString(dataItem.name).includes(normalizeString(inputValue))
            )
            .map(dataItem => ({
                name: item.name,
                category: dataItem.category,
                title: dataItem.name,
                slug: dataItem.slug
            }))
    );
    return (
        <div>
            <div className="sticky-top-mobile">
                <div className="close-detail">
                    <button  onClick={onGoBack}><img src="/tutorial/close.png" alt=""/></button>
                </div>
                <div className="title-detail-mobile opacity-100">Tìm kiếm</div>
            </div>
            <div className="flex items-center">
                <button
                    className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
                    type="button"
                    onClick={close}
                >
                    <Svg src="/icons/line/close.svg" width={24} height={24} />
                </button>
            </div>
            <div className="search-page-top">
                <div className="icon"><img src="tutorial/search.svg" alt=""/></div>
                <input type="text" value={inputValue} onChange={handleInputChange}  onKeyDown={handleKeyDown} placeholder="Tìm kiếm hướng dẫn" />
                <button type="button" onClick={handleSubmit}>search</button>
                <button
                    type="button"
                    onClick={onClear}
                    className={clsx(
                        'absolute inset-0 left-auto flex items-center pr-3',
                        isSearch ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 hidden'
                    )}
                >
                    <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6" />
                </button>
            </div>
            <div className={`list-search-head ${isSearch ? '' : 'hidden'}`}>
                <div className="result-search">GỢI Ý TỪ KHÓA</div>
                <ul>
                    {isSearch && filteredData.map((data, dataIndex) => (
                        <li key={dataIndex}><a href={`${Routers.SUPPORT_TUTORIAL}/${data.slug}`}><span>[{data.category}]</span>{data.title}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ModalSearchTutorial;
