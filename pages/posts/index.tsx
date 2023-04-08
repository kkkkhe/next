import Link from "next/link";
import Head from "next/head";
import Layout from "@/pages/components/layout";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import {NextPageWithLayout} from "@/pages/_app";


const Posts:NextPageWithLayout = ({result}:any) => {
    return (
            <div>
                <Head>
                    <title>posts</title>
                </Head>
                <h1>Posts</h1>
                <Link href={'/'}>
                    Link
                </Link>
                {result?.map((todo:any, id:any) => {
                    return (
                        <div key={id}>
                            {id}
                        </div>
                    )
                })}
            </div>
    )
}

Posts.getLayout = function getLayout(page: ReactElement){
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Posts
// Posts.getInitialProps = async (context:any) => {
//     const data = await fetch('https://jsonplaceholder.typicode.com/todos')
//     const result = await data.json()
//     console.log(context)
//     return {
//         result
//     }
// }

export async function getStaticProps(){
    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    const result = await data.json()

    return {
        props: {result}
    }
}