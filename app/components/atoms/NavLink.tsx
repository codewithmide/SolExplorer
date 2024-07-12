import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="flex flex-col">
      <div
        key={index}
        className={`pl-4 py-3 cursor-pointer mb-1 text-sm flex items-start gap-2 rounded-md text-dark ${
          !item.drop && "hover:bg-background"
        } ${
          active === item.name
            ? "bg-[#EDFAFA] dark:bg-[#05505C] border border-[#D5F5F6] dark:border-[#036672] text-[#047481] dark:text-white font-semibold"
            : "text-[#111928] dark:text-white hover:bg-[#D5F5F6] dark:hover:bg-[#036672]"
        }`}
      >
        <div className="w-full ">
          <div className="flex items-center gap-2" onClick={handleLinkClick}>
            <Image
              src={item.icon}
              alt="icon"
              className={`${active === item.name ? 'svg-active' : ''}`}
              width={20}
              height={20}
            />
            {item.sublink ? (
              <p className="whitespace-nowrap">{item.name}</p>
            ) : (
              <p className="whitespace-nowrap">{item.name}</p>
            )}
          </div>

          {item.sublink && item.drop && (
            <div className="my-2 p-2 border-l border-brand-secondary">
              {item.sublink.map((navItem: any, id: any) => (
                <div
                  key={id}
                  onClick={() => handleSubLinkClick(navItem)}
                  className={`cursor-pointer text-sm mb-2 px-4 py-3 rounded-md hover:bg-background ${
                    active === navItem
                      ? "bg-background text-brand font-semibold"
                      : "text-[#777373] hover:bg-hover"
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
