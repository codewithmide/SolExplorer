import classnames from "@/app/common/utils/classnames";

const Card = ({ classname, children, onClick }: any) => {
    return (
        <div className={classnames("bg-whiteBg dark:bg-darkBg text-white-text dark:text-dark-text", classname)} style={{
            boxShadow: "4px 4px 24px 0px rgba(1, 36, 221, 0.06)", 
            minHeight: "calc(100vh - 80px"
        }} onClick={onClick} >
            {children}
        </div >
    );
}

export default Card;