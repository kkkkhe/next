import {PropsWithChildren} from "react";
export default function Layout({ children }:PropsWithChildren) {
    return (
        <>
            <div>navbar</div>
            <main>{children}</main>
            <div>footer</div>
        </>
    )
}