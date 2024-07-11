import Image from "next/image";
import { Button } from "./FormComponents";
import checkIcon from "@/assets/Icon/Check Container.svg"
import { useState } from "react";
import classnames from "@/app/common/utils/classnames";

interface propsType {
    options: { option: string, action: () => void, color?: string }[],
    classname?: string
    children?: any
}

const DropDownButton = ({ options, classname, children }: propsType) => {
    const [show, setShow] = useState(false);

    function toggleDropDown() {
        setShow(prev => !prev)
    }

    function selectOPtion(option: any) {
        if (typeof option.action === 'function') {
            option.action();
        } else {
            console.error('Invalid action function:', option.action);
        }
        toggleDropDown();
    }
    
    return (
        <>
            {show && <div onClick={() => setShow(false)} className="bg-overlay absolute top-0 left-0 w-full h-full z-10"></div>}
            <div className="relative">
                <Button link={toggleDropDown} classname={classname + ""}>
                    {children}
                </Button>

                {
                    show && <div className='min-w-[10rem] z-30 bg-white rounded-md absolute top-14 right-0 border-outline float' style={{ boxShadow: "0px 4px 80px 0px rgba(101, 119, 149, 0.20)" }}>
                        {
                            options.map((option, id) => <div key={id} onClick={() => selectOPtion(option)} className="p-4 pr-8 flex gap-2 hover:bg-background rounded-md cursor-pointer whitespace-nowrap" style={{ color: option.color }}>
                                {option.option}
                            </div>)
                        }
                    </div>
                }
            </div >
        </>
    );
}

export default DropDownButton;