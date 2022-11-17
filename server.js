const path = require('path');
const express = require('express')
const app = express()
const port = 3000
const multer = require('multer');
const {mergepdfs} = require('./merge');
const upload = multer({ dest: 'uploads/' });
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , 'templates/index.html'))
})
app.post('/merge', upload.array('pdfs', 3), async  (req, res, next) =>{
  console.log(req.files);
  let d = await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/public/${d}.pdf`); 
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
