const handleLike = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('like', 1)
  	.returning('like')
  	.then(like => {
  		res.json(like[0]);
  	})
  	.catch(err => res.status(400).json('Unable to get likes'))
}

module.exports = {
	handleLike
}