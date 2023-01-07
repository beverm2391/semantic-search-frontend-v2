import Button from './Button'

export default function UI() {
    return (
        <div className='grid'>
            <div className='col1'>
                <div className='input-container'>
                    <p>Input Container</p>
                </div>
                <div className='buttons-container'>
                    <Button className='bg-gray-600 text-white dark:bg-gray-400 dark:text-black font-bold py-2 px-8 rounded-xl hover:scale-[1.01] hover:bg-gray-500 mr-4'>
                        Think
                    </Button>
                    <Button className='bg-gray-600 text-white dark:bg-gray-400 dark:text-black font-bold py-2 px-8 rounded-xl hover:scale-[1.01] hover:bg-gray-500 mr-4'>
                        Stop
                    </Button>
                </div>
                <div className='output-container'>
                    <p>Output Container</p>
                </div>
            </div>
            <div className='col2'>
                <div className='settings-container'>
                    <p>Settings Container</p>
                </div>
                <div className='stats-container'>
                    <p>Stats Container</p>
                </div>
            </div>
        </div>
    )
}