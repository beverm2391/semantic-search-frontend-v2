import Container from "../components/Container";
import Link from "next/link";

export default function Page() {
    return (
        <Container>
            <div className='flex mx-auto flex-col max-w-5xl justify-center items-center py-16 px-8 mb-8'>
                <h1 className='text-2xl md:text-5xl font-bold text-black dark:text-white mb-12'>This is <span className='text-purple-500 underline'>semantics cloud</span>.</h1>
                <div className='text-gray-800 dark:text-gray-200 text-left w-full mb-12'>
                    <p className='text-xl md:text-2xl mb-8'>
                        A semantic search engine that lets you dynamically interact with large amounts of text, using natural language.
                    </p>
                    <p className='text-xl md:text-2xl mb-8'>
                        I built this so that I could pull relevant information from long documents 
                        <span className='font-bold'>without having to read them</span>.
                    </p>
                    <p className='text-xl md:text-2xl'>
                        Now, I&apos;m hosting an <span className='text-purple-500 font-medim'>invite only beta</span>{' '}to either validate or invalidate its usefullness and hear feedback.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center w-full'>
                    <Link className='bg-purple-500 text-white font-medium py-3 px-4 rounded-xl hover:scale-[1.01] hover:bg-purple-400 mr-3 dark:bg-purple-800 dark:hover:bg-purple-700 shadow-lg'
                        href='/dashboard'
                    >
                        Visit the Dashboard
                    </Link>
                </div>
            </div>
        </Container>
    )
}