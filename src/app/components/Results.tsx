import User from '../icons/User';

interface ResultsProps {
    is_active: boolean;
    vis_type: boolean;
}

export default function Results({ is_active, vis_type }: ResultsProps) {

if (!is_active || !vis_type) {return (<></>)}else{

return (
    <>
<div id="Results" className="text-primary font-primary mt-xl flex flex-col gap-[23px] select-none">
<div className="font-bold text-3xl">Tutustu tuloksiin</div>
<div className="font-bold">“Tämä toiminnallisuus ei ole vielä toimiva.”</div>
<div className="flex"><User/> Vastasit: Samaa mieltä</div>

{/*
<div className="h-9 flex-row justify-end items-end gap-5 inline-flex">
<div className="font-bold">1</div>
<div className="">2</div>
</div>
*/}


<div className="h-[218px] px-4 justify-start items-end gap-6 inline-flex">
    <div className="grow shrink basis-0 flex-col justify-start items-center gap-1.5 inline-flex">
        <div className="w-6 h-6 justify-center items-center inline-flex">
            <User/>
        </div>
        <div className="self-stretch h-[188px] px-5 py-3 bg-[#f1eef9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex">
            <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">XX %</div>
        </div>
    </div>
    <div className="grow shrink basis-0 flex-col justify-start items-center inline-flex">
        <div className="self-stretch h-[188px] px-5 py-3 bg-[#e6f3f9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex">
            <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">XX %</div>
        </div>
    </div>
    <div className="grow shrink basis-0 flex-col justify-start items-center inline-flex">
        <div className="self-stretch h-[188px] px-5 py-3 bg-[#e6f3f9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex">
            <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">XX %</div>
        </div>
    </div>
</div>

<div className="h-[38px] px-4 justify-start items-start gap-6 inline-flex">
    <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">Samaa mieltä</div>
    <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">Eri mieltä</div>
    <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">Ohita</div>
</div>


</div>
    </>
)
}
}
