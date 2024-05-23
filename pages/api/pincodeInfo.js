import cors, { runMiddleware } from '../../middleware/cors';

const handler = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    const { pincode } = req.query;
    const url = `http://www.postalpincode.in/api/pincode/${pincode}`;
    
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching pincode data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
