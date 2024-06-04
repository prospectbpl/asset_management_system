import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComponentDetails = () => {
  // State to hold fetched assets
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch assets based on asset_master_id
  const fetchAssetsByMasterId = async (asset_master_id) => {
    try {
      // Make a GET request to your backend API
      const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/assets/${asset_master_id}`);
      // Update state with fetched assets
      setAssets(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  useEffect(() => {
    // Fetch assets when the component mounts
    fetchAssetsByMasterId('YOUR_ASSET_MASTER_ID'); // Replace 'YOUR_ASSET_MASTER_ID' with the actual asset_master_id
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Assets</h2>
          <ul>
            {assets.map(asset => (
              <li key={asset.id}>
                {/* Display asset details */}
                <p>Asset Name: {asset.name}</p>
                {/* Display other asset details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComponentDetails;
