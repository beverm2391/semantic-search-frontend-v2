import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import React from 'react';
import NavMenu from './NavMenu';
import DarkModeButton from './DarkModeButton';
import { BsCloudy } from 'react-icons/bs';
import Link from 'next/link';
import Animate from './Animate';

export default function Container(props) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    const { children, ...customMeta } = props;
    const router = useRouter();
    const meta = {
        title: 'Semantics.cloud - Semantic QA',
        description: `Use artificial intelligence to query and summarize large documents with natural language.`,
        image: 'https://beneverman.com/static/images/banner.png',
        type: 'website',
        ...customMeta
    };

    function handleClick() {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:url" content={`https://beneverman.com${router.asPath}`} />
                <link rel="canonical" href={`https://beneverman.com${router.asPath}`} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Ben Everman" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@beneverman" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
            </Head>
            <div className="topbar w-full relative py-[12px] bg-white dark:bg-piano-black px-10 text-black dark:text-gray-300 border-gray-200 border-b-2 dark:border-gray-800 h-[70px]">
                <div className='logocontainer justify-center items-center'>
                    <Link href="/">
                        <BsCloudy className='h-6 w-6 mr-8' />
                    </Link>
                    <Link
                        className={`font-medium px-8 text-black dark:text-white`}
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="navmenucontainer">
                    {/* <NavMenu mounted={mounted} handleClick={handleClick} resolvedTheme={resolvedTheme} /> */}
                </div>
                <div className="darkmodecontainer font-medium">
                    <button className='w-24 mr-4 py-[8px] px-[10px] rounded-lg'>Sign Up</button>
                    <button className='w-24 mr-8 bg-gray-200 dark:bg-gray-700 border-gray-300 py-[8px] px-[10px] rounded-full hover:bg-gray-100 transition-all'>Login</button>
                    <DarkModeButton mounted={mounted} handleClick={handleClick} resolvedTheme={resolvedTheme} />
                </div>
            </div>
            <main className="w-full h-full">
                {children}
            </main >
        </div >
    );
}
