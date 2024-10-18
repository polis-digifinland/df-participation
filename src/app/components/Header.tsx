import Logo from '../icons/Logo';

export default function Header() {
	return (
		<>
			<div id="Header" className="flex flex-row select-none">
                <Logo  fg="var(--logo-primary)" bg="var(--logo-secondary)" />
			</div>
		</>
	)
}