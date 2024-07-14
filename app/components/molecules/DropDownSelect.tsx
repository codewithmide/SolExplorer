import Image from "next/image";
import { Button } from "./FormComponents";
import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";

interface propsType {
  cta?: string,
  options: { name: string, action: () => void }[],
  active: string
  classname?: string
  children?: any
}

const DropDownSelect = ({ cta, options, active, classname, children }: propsType) => {
  const [show, setShow] = useState(false);

  function toggleDropDown() {
    setShow(prev => !prev)
  }

  function selectOption(option: { name: string, action: () => void }) {
    option.action();
    toggleDropDown();
  }

  return (
    <div className="relative border-[#E5E7EB] dark:border-[#374151] border rounded-lg">
      <Button link={toggleDropDown} classname={classname + " flex items-center gap-2 mb-0"}>
        <p>{active || cta}</p>
        {children}
      </Button>

      {
        show && <div className='w-40 bg-[#F9FAFB] dark:bg-[#374151] rounded-md absolute right-0 top-[3.5rem] z-30' style={{ boxShadow: "0px 4px 80px 0px rgba(101, 119, 149, 0.20)" }}>
          {
            options.map((option, index) => <div key={index} onClick={() => selectOption(option)} className="p-4 flex gap-2 hover:bg-background cursor-pointer">
              {option.name}
              {option.name === active && <IoCheckmark className="my-auto" />}
            </div>)
          }
        </div>
      }
    </div>
  );
}

export default DropDownSelect;
