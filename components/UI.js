export default function UI() {
    return (
        <div className='grid'>
            <div className='col1'>
                <div className='input-container'>
                    <p>Input Container</p>
                </div>
                <div className='buttons-container'>
                    Button
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