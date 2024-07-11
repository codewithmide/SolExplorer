import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import caret from "@/public/icons/caratRightOrange.svg";

const NavLink = ({ item, index, active, setLinks, links }: any) => {
  const router = useRouter();

  const handleLinkClick = () => {
    if (item.sublink) {
      dropLink(item.link);
      router.push(formatUrlString("/" + item.name + "/" + item.sublink[0]));
    } else {
      dropLink(item.link);
      router.push(item.link);
    }
  };

  function formatUrlString(inputString: string) {
    return inputString.toLowerCase().replace(/ /g, "-");
  }

  const handleSubLinkClick = (url: string) => {
    router.push(formatUrlString("/" + item.name + "/" + url));
  };

  useEffect(() => {
    if (item.sublink?.includes(active)) {
      dropLink(item.link);
    }
  }, []);

  const dropLink = (url: string) => {
    const newLink = [...links];

    newLink.forEach((item: any) => {
      if (item.link !== url) {
        item.drop = false;
      } else {
        item.drop = true;
      }
    });
    setLinks(newLink);
  };

  const toggleDropLink = (url: string) => {
    const newLink = [...links];

    newLink.forEach((item: any) => {
      if (item.link !== url) {
        item.drop = false;
      } else {
        item.drop = !item.drop;
      }
    });
    setLinks(newLink);
  };

  return (
    <div>
      <div
        key={index}
        className={`pl-4 py-3 cursor-pointer text-sm mb-2 flex items-start gap-2 rounded-md text-dark ${
          !item.drop && "hover:bg-background"
        } ${
          active === item.name
            ? "bg-background font-semibold"
            : "text-[#979191]  hover:bg-hover"
        }`}
      >
        {item.sublink && (
          <Image
            src={caret}
            onClick={() => toggleDropLink(item.link)}
            className={`h-4 w-4 mt-[6px] ${item.drop && "transform rotate-90"}`}
            alt=""
          />
        )}
        <div className="w-full ">
          <div className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="">{item.icon}</div>
            {item.sublink ? (
              <p className="whitespace-nowrap">{item.name}</p>
            ) : (
              <p className="whitespace-nowrap">{item.name}</p>
            )}
          </div>

          {item.sublink && item.drop && (
            <div className="my-4 p-2 border-l border-brand-secondary">
              {item.sublink.map((navItem: any, id: any) => (
                <div
                  key={id}
                  onClick={() => handleSubLinkClick(navItem)}
                  className={`cursor-pointer text-sm mb-2 px-4 py-3 rounded-md hover:bg-background ${
                    active === navItem
                      ? "bg-background text-brand font-semibold"
                      : "text-[#777373]over:bg-hover"
                  }`}
                >
                  <Link className="whitespace-nowrap" href={navItem}>
                    {navItem}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavLink;
