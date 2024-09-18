//'use client'

//import Link from "next/link"
//import { usePathname } from 'next/navigation'

export default function Conversation() {
  //const pathname = usePathname()
	return (
		<>
			<div className="select-none mt-10">
                <h1 className="text-2xl font-semibold">
                    Anna mielipiteesi demokratian toteutumisesta
                </h1>
                <p className="text-sm mt-5">
                    Haluamme selvittää, kuinka hyvin demokratia, digitalisaatio ja yhdenvertaisuus toteutuu mielestäsi päätöksenteossa.
                </p>
                <p>Lue lisää</p>
            </div>
		</>
	)
}