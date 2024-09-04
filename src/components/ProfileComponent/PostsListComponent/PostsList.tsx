import './PostsList.scss';

function PostsList(props: {posts: {id: number, image: string, text: string}[] | undefined}) {
    

    return (
        <div className="PostsList">
            {
                props.posts!.map((post) => {
                    return (
                        <div key={post.id} className="post">
                            <div className="post__image">
                                {post.image ? <img src = {post.image} /> : null}
                            </div>
                            <div className="post__text">{post.text}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default PostsList;
