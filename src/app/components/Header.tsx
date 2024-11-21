import Logo from '../icons/Logo';

export default function Header() {
	return (
		<>
			<div id="Header" className="flex flex-row mx-auto mt-xl px-md max-w-screen-sm select-none w-full">
                <Logo  fg="var(--logo-primary)" bg="var(--logo-secondary)" />
			</div>
		</>
	)
}