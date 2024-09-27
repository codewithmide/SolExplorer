import classnames from "@/app/common/utils/classnames";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

type ButtonPropsType = {
  link: (e?: any) => void;
  cta?: string;
  children?: React.ReactNode;
  loading?: boolean;
  classname?: string;
  validation?: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({
  link,
  cta,
  loading = false,
  children,
  classname,
  validation,
}) => {
  return (
    <button
      onClick={link}
      type="submit"
      className={classnames(
        "p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed",
        classname
      )}
      disabled={loading || validation}
    >
      {loading ? (
        <span className="loading-indicator">...</span>
      ) : (
        <>
          {cta}
          {children}
        </>
      )}
    </button>
  );
};
interface InputProps {
  onChange: (e: any) => void;
  classname?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  preIcon?: any;
  postIcon?: any;
  postIconAction?: (e: any) => void;
  buttonClassnames?: any;
  isChecked?: boolean;
  imageClassname?: string;
  dropdownList?: string[];
  selected?: string[];
  selectItem?: (item: string) => void;
  showSearch?: boolean;
}

export const Input = ({
  classname,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  postIcon = false,
  postIconAction,
  preIcon = false,
  isChecked,
  imageClassname,
  buttonClassnames,
  dropdownList,
  selected,
  selectItem,
  showSearch = true,
}: InputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilterData] = useState(
    dropdownList ? dropdownList : []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setFilterData(dropdownList ? dropdownList : []);
  }, [dropdownList]);

  const toggleModal = () => {
    setIsModalVisible(isModalVisible ? false : true);
  };

  const onSearch = (e: any) => {
    setSearchQuery(e.target.value);
    if (dropdownList) {
      setFilterData(
        dropdownList?.filter((item: string) =>
          item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
        )
      );
    }
  };

  if (type === "checkbox") {
    return (
      <div className="flex items-center ">
        <input
          type={"checkbox"}
          id="myCheckbox"
          className="form-checkbox checked:bg-brand text-[#BFBEBE]"
          onChange={onChange}
          checked={isChecked}
        />

        {label && <small className="ml-2 text-sm font-medium">{label}</small>}
      </div>
    );
  }

  return (
    <div className={classnames("flex flex-col gap-2 ", classname)}>
      {label && (
        <small className="text-sm font-medium text-dark">{label}</small>
      )}

      <div className="flex items-center input-wrapper outline-none text-sm bg-[#F9FAFB] dark:bg-[#374151]  rounded-lg focus:outline-none ">
        {preIcon && <Image className="h-4 w-4 ml-3" src={preIcon} alt="" />}
        <input
          type={type}
          id={label}
          className="focus:outline-none focus:bg-none p-3 placeholder-text-secondary bg-transparent w-full rounded-lg text-dark"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {postIcon && (
          <button
            className={classnames("", buttonClassnames)}
            onClick={postIconAction}
          >
            <Image
              className={classnames("h-4 w-4 mr-3", imageClassname)}
              src={postIcon}
              alt=""
            />
          </button>
        )}
      </div>
    </div>
  );
};

interface TextareaProps {
    onChange: (e: any) => void;
    classname?: string;
    label?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    rows?: number;
    maxRows?: number;
  }
  
  export const Textarea = ({
    classname,
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 1,
    maxRows = 4,
  }: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    const handleInput = (e: any) => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
  
        // Set height based on scrollHeight (content) but limit to maxRows
        const newHeight = Math.min(textarea.scrollHeight, maxRows * 24);
  
        textarea.style.height = `${newHeight}px`;
      }
  
      onChange(e);
    };
  
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea && !value) {
        textarea.style.height = `${rows * 24}px`;
      }
    }, [value, rows]);
  
    return (
      <div className={classnames("flex flex-col gap-2", classname)}>
        {label && (
          <small className="text-sm font-medium text-dark">{label}</small>
        )}
        <textarea
          ref={textareaRef}
          id={label}
          className="focus:outline-none resize-none placeholder-text-secondary bg-[#F9FAFB] dark:bg-[#374151] w-full rounded-lg text-dark"
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
          name={name}
          rows={rows}
          style={{ lineHeight: "24px" }}
        />
      </div>
    );
  };
