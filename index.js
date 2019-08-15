const express = require('express');
const cors = require('cors');

const postsRoutes = require('./posts/postsRoutes');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRoutes);

server.use('/', (req, res) => res.send('API up and running'));

server.listen(4000, () => console.log('API running on port 4000'));
