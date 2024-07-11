import classnames from "@/app/common/utils/classnames";

type TextPropTypes = {
    text?: string,
    children?: string,
    classname?: string
    type?: "header" | "subHeader" | "body" | "subText"
}

const Text = ({ text, children, classname, type = "body" }: TextPropTypes) => {
    if (type === "header") {
        return (
            <p className={classnames(classname + " text-2xl")}>{text || children}</p>
        );
    }
    if (type === "subHeader") {
        return (
            <p className={classnames(classname + " text-xl")}>{text || children}</p>
        );
    }
    if (type === "subText") {
        return (
            <p className={classnames(classname + " text-xs")}>{text || children}</p>
        );
    }
    return (
        <p className={classnames(classname)}>{text || children}</p>
    );
}


export default Text;