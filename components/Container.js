import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import React from 'react';
import NavMenu from './NavMenu';
import DarkModeButton from './DarkModeButton';
import { BsCloudyFill } from 'react-icons/bs';
import Link from 'next/link';

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
            <div className="topbar">
                <div className='logocontainer'>
                    <Link href="/">
                        <div className='border-2 flex justify-center items-center px-4 py-1 border-gray-300 dark:border-gray-700 rounded-xl'>
                            <h3 className='text-2xl font-medium text-gray-800 dark:text-gray-200 font-merry'>semantics. </h3>
                            <BsCloudyFill className='h-6 w-6 ml-3 text-gray-800 dark:text-gray-200' />
                        </div>
                    </Link>
                </div>
                <div className="navmenucontainer">
                    <NavMenu mounted={mounted} handleClick={handleClick} resolvedTheme={resolvedTheme} />
                </div>
                <div className="darkmodecontainer">
                    <DarkModeButton mounted={mounted} handleClick={handleClick} resolvedTheme={resolvedTheme} />
                </div>
            </div>
            <main className="flex flex-col items-center px-8 pb-16 bg-gray-100 dark:bg-gray-900 w-full">
                {children}
            </main >
        </div >
    );
}