import groq from 'groq'
import Tag from '../../components/Tag'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import Map from '../../components/Map'

const PostComponents = {
    types: {
        image: ({ value }) => {
            return (
                <img
                    className="post-image"
                    alt={value.alt || ' '}
                    src={urlFor(value)}
                />
            )
        }
    }
}

const Post = ({ post }) => {
    const { title, categories, body, authorImage, username, about, postedAt, mainImage } = post
    return (
        <>
            { post && <article className="post-container">
                <h1>{title}</h1>
                
                <div className="info-container">
                    <img
                        className="main-image-post-view"
                        alt={title + ' image'}
                        src={urlFor(mainImage)}
                    />
                    <div className="author-map-container">
                        <div className='map-container'>
                            <Map longitude={postedAt.lng} latitude={postedAt.lat}/>
                        </div>
                        <div className='author-container'>
                            <img
                                className='avatar'
                                src={urlFor(authorImage).url()}
                                alt={username + ' avatar'}
                            />
                            <h3>Author: <strong>{username}</strong></h3>
                            
                        </div>
                        <hr/>
                        <div className="author-bio">
                                <p>About Author</p>
                                <p>{about}</p>
                            </div>
                    </div>
                </div>
                <hr/>
                <div className="tag-container">
                    {categories?.map((category) => (
                        <>
                        { category && <Tag key={category.id} title={category.title}/> }  
                        </>
                    ))}
                </div>

                <PortableText value={body} components={PostComponents}/>
            </article>}
        </>
    )
}

const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    "username": author->username,
    "about": author->bio,
    "categories": categories[]->{id, title},
    "authorImage": author->avatar,
    body,
    publishedAt,
    mainImage,
    postedAt
}`

export async function getStaticPaths() {
    const paths = await getClient().fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug) => ({params: { slug }})),
        fallback: false,
    }
}

export async function getStaticProps({params, preview = false}){
    const post = await getClient(preview).fetch(query, {slug: params.slug, })

    return {
        props: {
            post,
        },
    }
}

export default Post