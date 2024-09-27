import Thumb from '../icons/Thumb';
import Thumb_hover from '../icons/Thumb_hover';

export default function Cards() {
  return (
    <>
<div id="cards" className="text-primary font-secondary mt-5 p-8 pt-12 bg-theme-surface-card-1 rounded-[40px] flex-col justify-center items-center gap-4 inline-flex">

<div className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui turpis, vestibulum dapibus semper nec, tincidunt sit amet nisi sodales sed.</div>

<div className="w-full flex flex-wrap justify-around font-semibold">
    <div className="flex flex-col items-center gap-3.5">
      <Thumb rotate="180"/>
      <p>Eri mieltä</p>
    </div>
    <div className="flex flex-col items-center gap-3.5">
      <Thumb/>
      <p>Samaa mieltä</p>
    </div>
</div>
</div>
    </>
  )
}