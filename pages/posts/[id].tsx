import {GetServerSideProps} from "next";
import Link from "next/link";
import {useRouter} from "next/router";


export default function User({result}:any){
    const router = useRouter()
    console.log(router.pathname,router.asPath)
    return (
        <div>
            hi
            {result.id}
            <Link href={`/posts/${result.id-1}`}>
                prev
            </Link>
            <Link href={`/posts/${result.id+1}`}>
                next
            </Link>

        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    // context.res.setHeader('Cache-Control',
    //     'public, s-maxage=10, stale-while-revalidate=59')
    const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${context?.params?.id}`)
    const result = await data.json()
    return {
        props: {
            result,
        }
    }
}



// export const getStaticPaths = async () => {
//     const data = await fetch(`https://jsonplaceholder.typicode.com/todos`)
//     const result = await data.json()
//     const paths = await result.map(item => ({params: {id: item.id.toString()}}))
//     return {
//         paths,
//         fallback: false
//     }
// }
//
// export const getStaticProps:GetStaticProps = async (context) => {
//     const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${context.params.id}`)
//     const result = await data.json()
//     return {
//         props: {
//             result
//         }
//     }
// }