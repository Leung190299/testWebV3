import Svg from '@/components/icon/svg'
import clsx from 'clsx'
import React from 'react'

const HeaderProfileModal =({onClose,title}:{onClose?(): void,title: string})=> {
    return (
        <nav className="sticky md:hidden w-full top-0 z-40 bg-transparent" data-theme="light">
            <div className="relative flex items-center">
                <div className="bg-neutral-0 border-neutral-200 transition-default w-full">
                    <div className="container h-16 flex items-center w-full">
                        <div
                            className="text-base-content flex-1 flex justify-center text-[1.125rem] font-bold truncate overflow-hidden">
                            <h1 className="truncate max-w-xs">{title}</h1></div>
                    </div>
                </div>
                <div className="absolute left-2 top-3 bg-transparent">
                    <button
                        type="button"
                        className={clsx(
                            'center-by-grid btn-sm btn-circle text-base-content transition-default',

                        )}
                        onClick={onClose}
                    >
                        <Svg src="/icons/line/close.svg" width={24} height={24} />
                    </button>
                </div>
                <div className="absolute right-4 top-3"></div>
            </div>
        </nav>

    )
}
export default HeaderProfileModal;
