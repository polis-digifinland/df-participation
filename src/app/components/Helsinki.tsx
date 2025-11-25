import Image from 'next/image';
import { headers } from 'next/headers';
import HelsinkiLogo from '@/icons/Helsinki.svg';
import HelsinkiBackground from '@/icons/Helsinki_coatofarms.svg';
import HelsinkiTramBackground from '@/icons/Helsinki_tram.svg';
import HelsingforsLogo from '@/icons/Helsingfors.svg';

export default function Helsinki() {
	const headersList = headers();
	const pathname = headersList.get('x-pathname') || '';

	// Only render if path contains "helsinki"
	if (!pathname.includes('/helsinki')) {
		return null;
	}

	return (
		<>
			<div className="px-md sm:px-0">
				<div
					className="bg-ping min-h-[150px] max-h-[150px] mx-auto mt-lg max-w-screen-sm select-none w-full relative overflow-hidden"
					style={{
						backgroundImage: `url(${pathname.includes('/helsinki_tram') ? HelsinkiTramBackground.src : HelsinkiBackground.src})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'top left'
					}}
				>
					<Image
						src={pathname.includes('/sv/') ? HelsingforsLogo : HelsinkiLogo}
						alt={pathname.includes('/sv/') ? "Helsingfors Logo" : "Helsinki Logo"}
						className={`mt-[33px] ml-[33px] mb-[33px] sm:mt-[30px] sm:ml-[30px] sm:mb-[30px]  ${
							pathname.includes('/sv/')
								? 'w-[171px] h-[60px] sm:w-[200px] sm:h-[70px]'
								: 'w-[129px] h-[60px] sm:w-[151px] sm:h-[70px]'
						}`}
						width={pathname.includes('/sv/') ? 200 : 151}
						height={70}
					/>
				</div>
			</div>
		</>
	)
}

