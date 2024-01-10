import { UserInfoHeader } from "./UserInfoHeader";
import UserConversetion from "./UserConversetion";

const UserReview = () => {
  return (
    <div className=" bg-white rounded-lg mt-5 ">
      <div className="p-2 pl-5">
        <UserInfoHeader />
        <div className="mb-10 px-3">
          <p className="text-justify pr-5">
            Laboris non ad et aute sint aliquip mollit voluptate velit dolore
            magna fugiat ex. Commodo amet veniam nostrud mollit quis sint qui
            nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in
            mollit irure enim tempor in. Laboris non ad et aute sint aliquip
            mollit voluptate velit dolore magna fugiat ex. Commodo amet veniam
            nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse
            magna. Nisi duis aute est in mollit irure enim tempor in.
          </p>
        </div>
        <UserConversetion />
      </div>
    </div>
  );
};

export default UserReview;
