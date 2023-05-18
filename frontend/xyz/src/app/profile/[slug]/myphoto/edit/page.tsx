import MyPhotoEdit from "@/components/profile/MyPhotoEdit";
import { SlugProps } from "@/types/common";

function MyPhotoEditPage({ params: { slug } }: SlugProps) {
  return (
    <div>
      <MyPhotoEdit userSeq={slug} />
    </div>
  );
}

export default MyPhotoEditPage;
