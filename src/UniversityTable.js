import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UniversityTable = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios
      .get('https://university-app-wv67.onrender.com/api/universities')
      .then(res => {
        setUniversities(res.data);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((uni, idx) => (
          <tr key={idx}>
            <td>{uni.name}</td>
            <td>{uni.country}</td>
            <td>
              <a href={uni.web_pages[0]} target="_blank" rel="noreferrer">
                {uni.web_pages[0]}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UniversityTable;
