interval(() => {
    let users = loadAll("user");
    users.forEach(user => {
        let published = loadAll("article", {"visible": true, "author": user.username});
        let comments = loadAll("comment", {"author": user.username});

        let score = 0;

        let likeSum = 0;
        let dislikeSum = 0;
        let clickSum = 0;

        published.forEach((article) => {
            likeSum += article.likes.length;
            dislikeSum += article.dislikes.length;
            clickSum += article.clicks;

            let r = article.likes.length - article.dislikes.length;
            score += (r < 0) ? -Math.sqrt(Math.abs(r)) : Math.sqrt(r);
        });


        let likeSumComments = 0;
        let dislikeSumComments = 0;

        comments.forEach((comment) => {
            likeSumComments += comment.likes.length;
            dislikeSumComments += comment.dislikes.length;

            let r = comment.likes.length - comment.dislikes.length;
            score += (r < 0) ? -Math.sqrt(Math.abs(r)) : Math.sqrt(r);
        });

        user.score = score;
        
        save(user);
    });
    
}, 6000);