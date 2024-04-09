import express from 'express'
import bodyParser from 'body-parser'
import posts from './posts.js'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index.ejs', { posts })
})

app.get('/add-blog', (req, res) => {
    res.render('add-blog.ejs')
})

app.post('/add-blog', (req, res) => {
    const new_post = { id: Math.floor(Math.random() * 123456789), title: req.body.title, text: req.body.text, author: req.body.author }
    posts.push(new_post)
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    const blog_post = posts.find((post) => {
      return post.id === id
    })
    res.render('edit.ejs', { blog_post })
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, content, author } = req.body;
    const index = posts.findIndex(p => p.id === id);
    posts[index] = { id, title, content, author };
    res.redirect('/');
})

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find((p) => p.id === id)
    posts.splice(posts.indexOf(post), 1)
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})