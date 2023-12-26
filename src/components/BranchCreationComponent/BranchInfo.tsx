import React, { useState } from "react";
import { BranchInfoEdit } from "./BranchInfoEdit";
import { Button, Card } from "antd";

export const BranchInfo = () => {
  const [editInfo, setEditInfo] = useState(true);
  const handeleditInfo = () => {
    setEditInfo(false);
  };

  return editInfo ? (
    <div className=" bg-slate-100 rounded-lg flex justify-center min-h-[calc(100vh-130px)]">
      <div className="flex justify-center items-center">
        <div className="w-full m-10">
          <Card
            title="Branch Information"
            extra={
              <div>
                <Button
                  onClick={() => setEditInfo(false)}
                  className="bg-purple-700 font-medium hover:bg-purple-600 text-white"
                  type="primary"
                >
                  Edit
                </Button>
              </div>
            }
            style={{ width: 900, height: 320 }}
          >
            <div className="grid gap-3 col-span-4">
              <label>Branch Name:</label>
              <label>Contact Number:</label>
              <label>Branch Address:</label>
              <label>Opening Hours:</label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-slate-100 rounded-lg flex justify-center items-center)]">
      <div>
        <div className="w-full m-10">
          <BranchInfoEdit editInfoOff={setEditInfo} />
        </div>
      </div>
    </div>
  );
};
export default BranchInfo;
