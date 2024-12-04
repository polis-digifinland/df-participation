import { ReactElement, FC } from 'react';
import Close from '@/icons/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  header: string;
  children: ReactElement;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  return (
    <div onClick={props.onClose} className={`${"fixed z-40 inset-0 w-full h-full bg-black/25"} ${props.open ? "block" : "hidden"}`}>
      <div className="fixed z-50 p-lg bg-theme-modal-background w-[35rem] h-auto top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center rounded-[20px]">
        <div className="flex flex-row w-full justify-between select-none">
          <h2 className="text-primary text-2xl font-primary font-bold ">{props.header}</h2>
          <button onClick={props.onClose}><Close fg="var(--text-primary)" /></button>
        </div>
        <div className='mt-sm font-secondary'>{props.children}</div>
      </div>
    </div>
  );
}

