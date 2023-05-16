import MyTimecapsuleList from "@/components/timecapsule/MyTimecapsuleList";
import ToggleBtn from "@/components/common/ToggleBtn";
import MyMemoryList from "@/components/profile/MyMemoryList";

function ProfileMypage() {
  return (
    <div>
      <MyMemoryList />
      <MyTimecapsuleList />
    </div>
  );
}

export default ProfileMypage;
