class BlogPost {
    constructor(id, title, content, author_id, created_at) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author_id = author_id;
        this.created_at = created_at;
    }
}


module.exports = BlogPost;