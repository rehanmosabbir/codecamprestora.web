import UserReview from "@/components/UserReview/UserReview";
const UserReviewRoute = () => {
  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="bg-white font-[500] text-lg p-5 rounded-lg">
        Users Review
      </div>
      <UserReview />
    </div>
  );
};

export default UserReviewRoute;
