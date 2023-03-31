export default function Layout({ children }) {
    return (
        <>
            <div>navbar</div>
            <main>{children}</main>
            <div>footer</div>
        </>
    )
}