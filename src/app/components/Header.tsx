import Logo from '../icons/Logo';
import LanguageChanger from '@/components/LanguageChanger';
import Helsinki from '@/components/Helsinki';

export default function Header() {
	return (
		<>
			<div id="Header" className="flex flex-row justify-between mx-auto mt-xl px-md max-w-screen-sm select-none w-full">
        <Logo  fg="var(--logo-primary)" bg="var(--logo-secondary)" />
				<LanguageChanger />
			</div>
			<Helsinki />
		</>
	)
}