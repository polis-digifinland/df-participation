//'use client'

//import Link from "next/link"
//import { usePathname } from 'next/navigation'
import Chevron from '../icons/Chevron';

export default function Conversation() {
  //const pathname = usePathname()
	return (
		<>
			<div id="Conversation" className="text-primary select-none mt-10 ">
                <h1 className="font-primary text-3xl font-bold ">
                    Anna mielipiteesi demokratian toteutumisesta
                </h1>
                <p className="font-secondary mt-5">
                    Haluamme selvittää, kuinka hyvin demokratia, digitalisaatio ja yhdenvertaisuus toteutuu mielestäsi päätöksenteossa.
                </p>
                <div className="flex flex-row items-center">
                    <p className="font-secondary mr-2">
                        Lue lisää
                    </p>
                    <Chevron rotate="270"/>
                </div>
            </div>
		</>
	)
}