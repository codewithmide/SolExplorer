import { Button } from "./FormComponents";
import Image from "next/image";
import Text from "../atoms/Text";
import arrow from "@/assets/common/icons/dropDownBlue.svg"

type propsType = {
    currentPage: number,
    lastPage: number,
    setCurrentPage: (page: number) => void
}

const Pagination = ({ currentPage, lastPage, setCurrentPage }: propsType) => {
    function paginator(current: number, length: number) {
        const sequence = [];
        let start = current - Math.floor(length / 2);
        start = Math.max(start, 1);
        let end = start + length - 1;
        end = Math.min(end, lastPage);

        // Adjust the start if we've adjusted the end
        if (end - start < length - 1) {
            start = Math.max(end - length + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            sequence.push(i);
        }
        return sequence;
    }

    return (
        <div className='mt-4 flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                {paginator(currentPage, 3).map((page, index) => (
                    <Button key={index} link={() => setCurrentPage(page)} classname={`flex items-center gap-2 px-4 ${currentPage === page ? "bg-background text-brand " : "bg-white text-[#667085]"}`}>
                        <Text>{page.toString()}</Text>
                    </Button>
                ))}
            </div>

            <div className='flex gap-4 items-center'>
                <Button validation={currentPage <= 1} link={() => setCurrentPage(currentPage - 1)} classname="flex items-center gap-2 text-brand">
                    <Image src={arrow} alt="" className='transform rotate-180' />
                    <Text>Previous</Text>
                </Button>
                <Button validation={currentPage >= lastPage} link={() => setCurrentPage(currentPage + 1)} classname="flex items-center gap-2 text-brand">
                    <Text>Next</Text>
                    <Image src={arrow} alt="" />
                </Button>
            </div>
        </div>
    );
}


export default Pagination;