import React, { useEffect, useState } from 'react';
import { getLinks, updateLink, deleteLink } from '../Api';
import { FaEdit, FaTrash } from 'react-icons/fa';     
const Managelink = () => {
  const [links, setLinks] = useState([]);
  
  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await getLinks();
      setLinks(res.data.links);
    } catch (error) {
      alert("Failed to fetch links");
    }
  };

    

  const handleDelete = async (id) => {
    try {
      await deleteLink(id);
      setLinks(links.filter(link => link._id !== id));
      alert("Link deleted");
    } catch {
     alert("Failed to delete link");
    }
  };

  const handleInputChange = (e, index) => {
    const updatedLinks = [...links];
    updatedLinks[index][e.target.name] = e.target.value;
    setLinks(updatedLinks);
  };

  const handleUpdate = async (id, index) => {
    try {
      await updateLink(id, links[index]);
      alert("Link updated!");
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <>
    <div className="table-container">
      <h3>Manage Links</h3>
      <table className="link-table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Title</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={link.title}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="url"
                  value={link.url}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </td>
              <td>
                <button  className="icon-btn update-btn" onClick={() => handleUpdate(link._id, index)} title='Update'><FaEdit /></button>
                <button className="icon-btn delete-btn" onClick={() => handleDelete(link._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     </div>    </>
      );
};

export default Managelink;
