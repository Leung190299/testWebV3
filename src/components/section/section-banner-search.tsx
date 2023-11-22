
import {FC, useRef, useState} from 'react';
import SuggestList from "@/components/section/section-search-list";
import InputSearchWithoutStyle from "@/components/input/input-search-banner";
import useBoolean from '@pit-ui/modules/hooks/useBoolean';

interface Props {
    className?: string;
}


const SectionTutorialBanner: FC<Props> = ({ className }) => {
    const [showSuggestList, setShowSuggestList] = useState(false); // Khởi tạo showSuggestList với giá trị false
    const ref = useRef<HTMLInputElement>(null);
    const search = useBoolean();

    function onQuickSearch(v: string) {
        if (ref.current) ref.current.value = v;
        search.setFalse();
    }

    const [inputValue, setInputValue] = useState<string>('');

    const onFocus = () => {
        search.setTrue();
    };

    const onClear = () => {
        onQuickSearch('');
        setShowSuggestList(false); // Cập nhật showSuggestList thành false khi clear
    };

    return (
        <div className="relative banner-support">
            <div className="content-banner">
                <div className="container">
                    <div className="flex flex-row flex-wrap">
                        <div className="w-1/2 relative">
                            <h3 className="text-xl text-neutral-0 md:text-h-md font-itel mb-0">Xin chào Bạn! <br/>Hãy để iTel hỗ trợ bạn nhé</h3>
                            {/*<InputSearchWithoutStyle*/}
                            {/*    placeholder="Tìm giải đáp theo nhu cầu của bạn"*/}
                            {/*    className="h-12 w-full"*/}
                            {/*    ref={ref}*/}
                            {/*    onChange={(e) => {*/}
                            {/*        setInputValue(e.target.value);*/}
                            {/*        setShowSuggestList(true); // Cập nhật showSuggestList thành true khi thay đổi giá trị*/}
                            {/*    }}*/}
                            {/*    onClear={onClear}*/}
                            {/*    autoFocus={false}*/}
                            {/*    onFocus={onFocus}*/}
                            {/*    forceShow={true}*/}
                            {/*    theme="light"*/}
                            {/*/>*/}
                            {/*{showSuggestList && (*/}
                            {/*    <SuggestList inputValue={inputValue} onClick={() => setInputValue('')} />*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default SectionTutorialBanner;
