export default function Button(props) {
    return (
        <button className={props.className}>
            <a href='https://www.beneverman.com'>
                {props.children}
            </a>
        </button>
    )
}