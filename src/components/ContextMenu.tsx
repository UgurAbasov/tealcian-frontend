const ContextMenu = (props: any) => {
    return (
    <div className=" absolute z-50 w-36 h- bg-black" style={{top: props.position.y, left: props.position.x}}>
        <p>Hello</p>
        <p>Hello</p>
    </div>
    )
}

export default ContextMenu