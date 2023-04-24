import React from "react";
import SearchBar from './../../components/searchbar/SearchBar'
import ProfileImgRegister from './../../components/profileImg/ProfileImgRegister'
import ProfileImg from './../../components/profileImg/ProfileImg'

function CapsulePage() {
  return <div>
    <h1>CapsulePage</h1>
    <div>
      <SearchBar />
      <ProfileImgRegister />
      <ProfileImg />
    </div>
  </div>;
}

export default CapsulePage;
