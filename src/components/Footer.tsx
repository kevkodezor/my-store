import Link from 'next/link';

export const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-brand-primary text-white px-8 py-8'>
            <div className='grid justify-center lg:flex lg:justify-between font-bold'>
                <span>© {currentYear} Agüita Store By Kevin Torres</span>
                <div className='flex gap-4'>
                    {/* <Link href='#' className='text-sm font-medium hover:text-gray-400'>
                        Privacy Policy
                    </Link>
                    <Link href='#' className='text-sm font-medium hover:text-gray-400'>
                        Terms of Service
                    </Link> */}
                </div>
            </div>
        </footer>
    );
};