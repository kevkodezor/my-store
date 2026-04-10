export const Footer = () => {

    const currentYear = new Date().getFullYear();
    const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
    const copyrightName = 'Agunisex';

    return (
        <footer className='sticky w-full p-4 flex justify-between items-center bottom-0 z-40 bg-black text-white'>
            <small>By Kevin Torres</small>
            <small>
                &copy;{copyrightDate} <b>{copyrightName}</b>
                {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
            </small>
            <small>Deployed with ▲ Vercel</small>
        </footer>
    );
};