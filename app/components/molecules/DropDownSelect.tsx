import Image from "next/image";
import { Button } from "./FormComponents";
import tickIcon from "@/assets/common/icons/tick.svg"
import { useState } from "react";

interface propsType {
    cta?: string,
    options: string[],
    onClick: (option: string) => void,
    active: string
    classname?: string
    children?: any
}

const DropDownSelect = ({ cta, options, onClick, active, classname, children }: propsType) => {
    const [show, setShow] = useState(false);

    function toggleDropDown() {
        setShow(prev => !prev)
    }

    function selectOPtion(option: string) {
        onClick(option)
        toggleDropDown()
    }
    return (
        <div className="relative">
            <Button link={toggleDropDown} classname={classname + " flex items-center gap-2 mb-0"}>
                <p>{active || cta}</p>
                {children}
            </Button>

            {
                show && <div className='w-40 bg-white rounded-md absolute right-0 top-13 z-30' style={{ boxShadow: "0px 4px 80px 0px rgba(101, 119, 149, 0.20)" }}>
                    {
                        options.map((option, index) => <div key={index} onClick={() => selectOPtion(option)} className="p-4 flex gap-2 hover:bg-background cursor-pointer">
                            {option}
                            {option === active && <Image src={tickIcon} alt="" />}
                        </div>)
                    }
                </div>
            }
        </div >
    );
}

export default DropDownSelect;