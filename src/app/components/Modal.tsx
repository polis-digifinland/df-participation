import { ReactElement, FC, useEffect, useRef } from 'react';
import Close from '@/icons/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  header: string;
  children: ReactElement;
}

export default function Modal({ open, onClose, header, children }: ModalProps): ReturnType<FC> {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || (event.key === 'Tab')) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
      //closeButtonRef.current?.classList.add('focus-visible');
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div onClick={onClose} className={`${"fixed z-40 inset-0 w-full h-full bg-black/25 dark:bg-black/75"} ${open ? "block" : "hidden"}`}>
      <div role="dialog" aria-modal="true" className="fixed z-50 p-lg bg-theme-modal-background lg:w-[35rem] h-auto top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center rounded-[20px]">
        <div className="flex flex-row w-full justify-between select-none">
          <h2 className="text-primary text-2xl font-primary font-bold ">{header}</h2>
            <button ref={closeButtonRef} onClick={onClose} className='rounded-md hover:lg:scale-110 active:scale-110' aria-label="Sulje"><Close fg="var(--text-primary)" /></button>
        </div>
        <div className='mt-sm font-secondary'>{children}</div>
      </div>
    </div>
  );
}

