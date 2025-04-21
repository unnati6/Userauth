import React, { useEffect, useState } from 'react';
import { getLinks } from '../Api';
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

    

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteLink(id);
  //     setLinks(links.filter(link => link._id !== id));
  //     alert("Link deleted");
  //   } catch {
  //    alert("Failed to delete link");
  //   }
  // };

  // const handleInputChange = (e, index) => {
  //   const updatedLinks = [...links];
  //   updatedLinks[index][e.target.name] = e.target.value;
  //   setLinks(updatedLinks);
  // };

  // const handleUpdate = async (id, index) => {
  //   try {
  //     await updateLink(id, links[index]);
  //     alert("Link updated!");
  //   } catch (error) {
  //     alert("Update failed");
  //   }
  // };

  return (
    <>
  <div className="link-list-container">
      {links.map((link, index) => (
        <div className="link-input-group" key={link._id}>
          <label className="link-label">{link.title}</label>
          <div className="link-input-wrapper">
            <input
              type="text"
              className="link-input"
              value={link.url}
              readOnly
              placeholder={`www.${link.title.toLowerCase()}.com`}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
  <rect width="34" height="34" rx="6" fill="#155DFC"/>
  <path d="M26.3173 8.75932C26.4693 8.86663 26.5987 9.00285 26.6981 9.16019C26.7974 9.31753 26.8648 9.4929 26.8964 9.6763C26.928 9.85969 26.9231 10.0475 26.8821 10.229C26.8411 10.4105 26.7647 10.5822 26.6573 10.7341L18.6305 22.0958C18.1205 22.8155 17.6884 23.4275 17.2988 23.8936C16.8922 24.3752 16.4346 24.8257 15.8283 25.1119C14.9299 25.539 13.9047 25.6163 12.9525 25.3286C12.3065 25.1346 11.7908 24.7535 11.3247 24.3341C10.8785 23.9304 10.3727 23.3878 9.78054 22.7531L7.46429 20.2697C7.33244 20.1347 7.2289 19.9746 7.15976 19.799C7.09061 19.6234 7.05726 19.4357 7.06166 19.247C7.06606 19.0583 7.10813 18.8724 7.18538 18.7002C7.26263 18.528 7.37352 18.373 7.51153 18.2442C7.64954 18.1155 7.81188 18.0156 7.98903 17.9504C8.16618 17.8853 8.35456 17.8562 8.54311 17.8649C8.73165 17.8736 8.91656 17.9198 9.08697 18.001C9.25739 18.0821 9.40987 18.1965 9.53546 18.3374L11.8106 20.7769C12.4552 21.4668 12.8788 21.9187 13.2245 22.2318C13.5645 22.5378 13.7118 22.5987 13.7699 22.6157C14.0475 22.7007 14.3436 22.6795 14.617 22.5506C14.6822 22.5194 14.8281 22.4301 15.127 22.0717C15.433 21.7076 15.7971 21.1934 16.3496 20.4128L24.3425 9.09932C24.4498 8.94729 24.586 8.8179 24.7433 8.71853C24.9007 8.61916 25.076 8.55177 25.2594 8.52019C25.4428 8.48862 25.6306 8.49349 25.8122 8.53452C25.9937 8.57554 26.1653 8.65193 26.3173 8.75932Z" fill="white"/>
</svg>
      
          </div>
        </div>
      ))}
    </div>   </>
      );
};

export default Managelink;
