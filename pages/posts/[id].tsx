import {GetStaticProps} from "next";
import Link from "next/link";
import {forwardRef, useImperativeHandle, useRef} from "react";


export default function User({result}:any){
    const ref = useRef(null)
    return (
        <div>
            hi
            {result.id}
            <button onClick={() => ref.current.focus()}>
                Click
            </button>
            <Input ref={ref}/>
            <Link href={`/posts/${result.id-1}`}>
                prev
            </Link>
            <Link href={`/posts/${result.id+1}`}>
                next
            </Link>

        </div>
    )
}
const Input = forwardRef(function MyInput(props, ref) {
    const inputRef = useRef(null)
    useImperativeHandle(ref, () => {
        return {
            focus(){
                inputRef.current.focus()
            }
        }
    }, [])
    return (
        <div>
            <input ref={inputRef} type="text" placeholder={'value'}/>
        </div>
    )
})





// export const getServerSideProps:GetServerSideProps = async (context:any) => {
//     // context.res.setHeader('Cache-Control',
//     //     'public, s-maxage=10, stale-while-revalidate=59')
//     const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${context?.params?.id}`)
//     const result = await data.json()
//     return {
//         props: {
//             result,
//         }
//     }
// }



export const getStaticPaths = async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    const result = await data.json()
    const paths = await result.map((item:any) => ({params: {id: item.id.toString()}}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps:GetStaticProps = async (context:any) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${context.params.id}`)
    const result = await data.json()
    return {
        props: {
            result
        }
    }
}