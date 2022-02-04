import express, {Request, Response} from 'express';
import * as path from 'path';
import config from './config.json';
import {UsersApiService} from './api/users-api.service';
import {PostsApiService} from './api/posts-api.service';
import nocache from 'nocache';

const app = express();

app.use(express.static(path.join(__dirname, config.frontendFolder)));
app.use(nocache());

app.get("/v1/api/users", async (req: Request, res: Response) => {
    const query = req.query.page as string;
    const usersByPage = await UsersApiService.getUsersByPage(query);
    res.send(usersByPage);
});

app.get("/v1/api/posts", async (req: Request, res: Response) => {
    const query = req.query.page as string;
    const postsByPage = await PostsApiService.getPostsByPage(query);
    res.send(postsByPage);
});

app.get('/v1/api/comments', async (req: Request, res: Response) => {
    const query = req.query.post_id as string;
    const commentsOnPost = await PostsApiService.getCommentsOnPost(query);
    res.send(commentsOnPost);
});

app.get('/*', (req, res) => {
    let indexFile = path.join(__dirname, config.frontendFolder, 'index.html');
    res.sendFile(indexFile);
});

app.listen(config.serverPort, () => console.log(`Server listening on port ${config.serverPort}!`));

