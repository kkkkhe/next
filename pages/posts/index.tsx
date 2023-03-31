import Link from "next/link";
import Head from "next/head";
import {useEffect, useState} from "react";
import Layout from "@/pages/components/layout";
import {initializeStore} from "@/src/app";
import {actions} from "@/src/entities/entity";
import {useRouter} from "next/router";

export default function Posts(){
    // const [state, setState] = useState<any[]>()
    // const data = fetch('https://jsonplaceholder.typicode.com/todos')
    // const router = useRouter()
    // console.log(router.pathname,router.asPath)
    return (
        <Layout>
            {/*<div>*/}
            {/*    <Head>*/}
            {/*        <title>posts</title>*/}
            {/*    </Head>*/}
            {/*    <h1>Posts</h1>*/}
            {/*    <Link href={'/'}>*/}
            {/*        Link*/}
            {/*    </Link>*/}
            {/*    {state?.map((todo, id) => {*/}
            {/*        return (*/}
            {/*            <div key={id}>*/}
            {/*                {id}*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
        </Layout>
    )
}

// export async function getStaticProps(){
//     const data = await fetch('https://jsonplaceholder.typicode.com/todos')
//     const result = await data.json()
//
//     return {
//         props: {result}
//     }
// }