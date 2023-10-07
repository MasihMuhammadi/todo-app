

export default (req, res) => {
    if (req.method === 'POST') {
      const { name } = req.body;
      console.log(`Received name: ${name}`);
      res.json({ message: `Hello, ${name}!` });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  