import Image from 'next/image'
import dflogo from '../dflogo.png'

export default function Footer() {
	return (
		<>
			<footer className="flex justify-center select-none mt-10 mb-14">
                  <Image
                    src={dflogo}
                    alt="DigiFinland logo"
                    width={129}
                    height={41}
                    //layout="responsive"
                    priority
                   />
			</footer> 
		</>
	)
}