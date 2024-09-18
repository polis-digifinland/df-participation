//import { Tangerine } from 'next/font/google'
//const tangerine = Tangerine({weight: ['700'], subsets: ['latin'] })

export default function Header() {
	return (
		<>
			<div className="flex flex-row pt-10 text-5xl select-none">
                <h1 className="bg-foreground text-background">Pol.is</h1>
			</div>
		</>
	)
}